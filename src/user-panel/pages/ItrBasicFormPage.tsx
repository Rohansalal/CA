// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   ArrowLeft, Upload, X, Plus, FileText, Image as ImageIcon,
//   CheckCircle2, Loader2, AlertCircle, Shield,
//   Phone, Mail, StickyNote, Paperclip, ChevronRight,
// } from 'lucide-react';
// import { toast } from 'sonner';
// import { useAuth } from '../contexts/AuthContext';

// const API = import.meta.env.VITE_API_BASE_URL || '/api';

// // ─── Types ────────────────────────────────────────────────────────────────────
// interface OrderItem {
//   id: number;
//   orderId: number;
//   serviceName: string;
//   planType: string;
//   price: number;
//   orderNumber: string;
//   orderStatus: string;
// }

// interface UploadFile {
//   file: File | null;
//   preview: string | null;
// }

// interface Attachment {
//   file: File;
//   remark: string;
// }

// // ─── File Upload Zone ─────────────────────────────────────────────────────────
// const FileUploadZone: React.FC<{
//   label: string;
//   sub: string;
//   value: UploadFile;
//   onChange: (v: UploadFile) => void;
// }> = ({ label, sub, value, onChange }) => {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [dragging, setDragging] = useState(false);

//   const handleFile = (file: File) => {
//     if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
//       toast.error('Only JPG, PNG, or PDF files are allowed');
//       return;
//     }
//     if (file.size > 10 * 1024 * 1024) {
//       toast.error('File must be under 10 MB');
//       return;
//     }
//     const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
//     onChange({ file, preview });
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setDragging(false);
//     const f = e.dataTransfer.files[0];
//     if (f) handleFile(f);
//   };

//   const isPdf = value.file?.type === 'application/pdf';

//   return (
//     <div className="flex flex-col gap-1.5">
//       <label className="text-xs font-semibold text-neutral-600 flex items-center gap-1">
//         {label} <span className="text-red-500">*</span>
//       </label>
//       <p className="text-[11px] text-neutral-400 -mt-1">{sub}</p>

//       {value.file ? (
//         <div className="relative flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
//           <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white border border-emerald-200 flex items-center justify-center">
//             {value.preview ? (
//               <img src={value.preview} alt={label} className="w-full h-full object-cover" />
//             ) : (
//               <FileText className="w-5 h-5 text-emerald-600" />
//             )}
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-xs font-semibold text-emerald-800 truncate">{value.file.name}</p>
//             <p className="text-[11px] text-emerald-600">{(value.file.size / 1024).toFixed(0)} KB &nbsp;·&nbsp; {isPdf ? 'PDF' : 'Image'}</p>
//           </div>
//           <button
//             type="button"
//             onClick={() => onChange({ file: null, preview: null })}
//             className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-600 hover:text-emerald-900 transition-colors"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//       ) : (
//         <div
//           onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
//           onDragLeave={() => setDragging(false)}
//           onDrop={handleDrop}
//           onClick={() => inputRef.current?.click()}
//           className={`cursor-pointer flex flex-col items-center justify-center gap-2 py-6 px-4 rounded-xl border-2 border-dashed transition-all
//             ${dragging ? 'border-blue-400 bg-blue-50' : 'border-neutral-200 bg-neutral-50 hover:border-blue-300 hover:bg-blue-50/40'}`}
//         >
//           <div className="w-9 h-9 bg-white rounded-full border border-neutral-200 flex items-center justify-center shadow-sm">
//             <Upload className="w-4 h-4 text-neutral-400" />
//           </div>
//           <p className="text-xs text-neutral-500 text-center">
//             <span className="font-semibold text-blue-600">Click to upload</span> or drag & drop
//           </p>
//           <p className="text-[11px] text-neutral-400">JPG, PNG, PDF · Max 2 MB</p>
//         </div>
//       )}
//       <input
//         ref={inputRef}
//         type="file"
//         accept="image/jpeg,image/png,application/pdf"
//         className="hidden"
//         onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
//       />
//     </div>
//   );
// };

// // ─── Main Page ────────────────────────────────────────────────────────────────
// export const ItrBasicFormPage: React.FC = () => {
//   const { orderItemId } = useParams<{ orderItemId: string }>();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [orderItem, setOrderItem] = useState<OrderItem | null>(null);
//   const [loadingOrder, setLoadingOrder] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   // Form state
//   const [mobileNo, setMobileNo] = useState('');
//   const [emailId, setEmailId] = useState('');
//   const [otherNotes, setOtherNotes] = useState('');

//   const [aadhaarFront, setAadhaarFront] = useState<UploadFile>({ file: null, preview: null });
//   const [aadhaarBack, setAadhaarBack] = useState<UploadFile>({ file: null, preview: null });
//   const [panFront, setPanFront] = useState<UploadFile>({ file: null, preview: null });
//   const [panBack, setPanBack] = useState<UploadFile>({ file: null, preview: null });

//   const [attachments, setAttachments] = useState<Attachment[]>([]);
//   const attachInputRef = useRef<HTMLInputElement>(null);

//   // Pre-fill from user profile
//   useEffect(() => {
//     if (user) {
//       if ((user as any).phone) setMobileNo((user as any).phone.replace(/\D/g, '').slice(-10));
//       if (user.email) setEmailId(user.email);
//     }
//   }, [user]);

//   // Fetch order item details
//   useEffect(() => {
//     if (!orderItemId) return;
//     const fetchItem = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const headers: Record<string, string> = {};
//         if (token) headers['Authorization'] = `Bearer ${token}`;
//         const res = await fetch(`${API}/orders/items/${orderItemId}`, { headers, credentials: 'include' });
//         if (!res.ok) throw new Error('Could not load order details');
//         const data = await res.json();
//         setOrderItem(data.orderItem);
//       } catch {
//         toast.error('Could not load order details.');
//       } finally {
//         setLoadingOrder(false);
//       }
//     };
//     fetchItem();
//   }, [orderItemId]);

//   const addAttachment = (file: File) => {
//     if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
//       toast.error('Only JPG, PNG, or PDF files are allowed');
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('Attachment must be under 5 MB');
//       return;
//     }
//     setAttachments(prev => [...prev, { file, remark: '' }]);
//   };

//   const validate = (): string | null => {
//     if (!/^[6-9]\d{9}$/.test(mobileNo)) return 'Enter a valid 10-digit mobile number';
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId)) return 'Enter a valid email address';
//     if (!aadhaarFront.file) return 'Aadhaar Front is required';
//     if (!aadhaarBack.file) return 'Aadhaar Back is required';
//     if (!panFront.file) return 'PAN Card Front is required';
//     if (!panBack.file) return 'PAN Card Back is required';
//     return null;
//   };

//   const handleSubmit = async (e: React.MouseEvent | React.FormEvent) => {
//     e.preventDefault();
//     const err = validate();
//     if (err) { toast.error(err); return; }

//     setSubmitting(true);
//     try {
//       const formData = new FormData();
//       formData.append('orderItemId', orderItemId!);
//       formData.append('mobileNo', mobileNo);
//       formData.append('emailId', emailId);
//       if (otherNotes.trim()) formData.append('otherNotes', otherNotes.trim());

//       formData.append('aadhaarFront', aadhaarFront.file!);
//       formData.append('aadhaarBack', aadhaarBack.file!);
//       formData.append('panFront', panFront.file!);
//       formData.append('panBack', panBack.file!);

//       const remarks: string[] = [];
//       attachments.forEach((a) => {
//         formData.append('attachments', a.file);
//         remarks.push(a.remark || '');
//       });
//       if (remarks.length) formData.append('attachmentRemarks', JSON.stringify(remarks));

//       const token = localStorage.getItem('token');
//       const headers: Record<string, string> = {};
//       if (token) headers['Authorization'] = `Bearer ${token}`;

//       const res = await fetch(`${API}/itr/basic`, {
//         method: 'POST',
//         headers,
//         credentials: 'include',
//         body: formData,
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || 'Submission failed');

//       setSubmitted(true);
//       toast.success('Details submitted successfully!');
//     } catch (err: any) {
//       toast.error(err.message || 'Something went wrong. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ── Success screen ──
//   if (submitted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
//           <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
//             <CheckCircle2 className="w-8 h-8 text-emerald-600" />
//           </div>
//           <h2 className="text-xl font-bold text-neutral-900 mb-2">Submitted Successfully!</h2>
//           <p className="text-sm text-neutral-500 mb-7 leading-relaxed">
//             Your ITR Basic details have been received. Our team will review your documents and get back to you shortly.
//           </p>
//           <button
//             onClick={() => navigate('/dashboard')}
//             className="w-full py-3 rounded-xl font-semibold text-sm text-white"
//             style={{ background: 'linear-gradient(135deg,#2563EB,#1D4ED8)' }}
//           >
//             Go to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ── Loading ──
//   if (loadingOrder) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
//         <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
//       </div>
//     );
//   }

//   const planPrice = orderItem?.price ? `₹${Number(orderItem.price).toLocaleString('en-IN')}` : '';

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

//       {/* ── Top bar ── */}
//       <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-neutral-200">
//         <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
//           <button
//             onClick={() => navigate('/dashboard')}
//             className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" />
//           </button>
//           <div className="flex items-center gap-2.5 flex-1 min-w-0">
//             <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
//               <Shield className="w-4 h-4 text-white" />
//             </div>
//             <div className="min-w-0">
//               <p className="text-sm font-bold text-neutral-900 truncate">
//                 {orderItem?.serviceName || 'ITR Filing'} — Basic Plan
//               </p>
//               {planPrice && (
//                 <p className="text-[11px] text-neutral-400">
//                   {orderItem?.orderNumber} &nbsp;·&nbsp; {planPrice}
//                 </p>
//               )}
//             </div>
//           </div>
//           <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider border border-blue-200">
//             <Shield className="w-3 h-3" /> Basic
//           </span>
//         </div>
//       </div>

//       {/* ── Progress steps ── */}
//       <div className="max-w-3xl mx-auto px-4 py-4">
//         <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-400">
//           <span className="text-blue-600">Contact Info</span>
//           <ChevronRight className="w-3 h-3" />
//           <span>KYC Documents</span>
//           <ChevronRight className="w-3 h-3" />
//           <span>Attachments</span>
//           <ChevronRight className="w-3 h-3" />
//           <span>Submit</span>
//         </div>
//       </div>

//       <div className="max-w-3xl mx-auto px-4 pb-36 space-y-5">

//         {/* ── Contact Info card ── */}
//         <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
//           <div className="px-5 py-4 border-b border-neutral-100 flex items-center gap-2.5">
//             <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
//               <Phone className="w-3.5 h-3.5 text-blue-600" />
//             </div>
//             <h2 className="text-sm font-bold text-neutral-800">Contact Information</h2>
//           </div>
//           <div className="p-5 grid sm:grid-cols-2 gap-4">
//             <div>
//               <label className="text-xs font-semibold text-neutral-600 block mb-1.5">
//                 Mobile Number <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400 font-medium">+91</span>
//                 <input
//                   type="tel"
//                   value={mobileNo}
//                   onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, '').slice(0, 10))}
//                   placeholder="98XXXXXXXX"
//                   className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-neutral-200 text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   maxLength={10}
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="text-xs font-semibold text-neutral-600 block mb-1.5">
//                 Email Address <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
//                 <input
//                   type="email"
//                   value={emailId}
//                   onChange={(e) => setEmailId(e.target.value)}
//                   placeholder="you@email.com"
//                   className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Aadhaar Card ── */}
//         <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
//           <div className="px-5 py-4 border-b border-neutral-100 flex items-center gap-2.5">
//             <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
//               <ImageIcon className="w-3.5 h-3.5 text-orange-600" />
//             </div>
//             <div>
//               <h2 className="text-sm font-bold text-neutral-800">Aadhaar Card</h2>
//               <p className="text-[11px] text-neutral-400">Upload both sides clearly</p>
//             </div>
//           </div>
//           <div className="p-5 grid sm:grid-cols-2 gap-5">
//             <FileUploadZone
//               label="Aadhaar — Front Side"
//               sub="Side with your photo & name"
//               value={aadhaarFront}
//               onChange={setAadhaarFront}
//             />
//             <FileUploadZone
//               label="Aadhaar — Back Side"
//               sub="Side with address"
//               value={aadhaarBack}
//               onChange={setAadhaarBack}
//             />
//           </div>
//         </div>

//         {/* ── PAN Card ── */}
//         <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
//           <div className="px-5 py-4 border-b border-neutral-100 flex items-center gap-2.5">
//             <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
//               <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
//             </div>
//             <div>
//               <h2 className="text-sm font-bold text-neutral-800">PAN Card</h2>
//               <p className="text-[11px] text-neutral-400">Upload both sides clearly</p>
//             </div>
//           </div>
//           <div className="p-5 grid sm:grid-cols-2 gap-5">
//             <FileUploadZone
//               label="PAN Card — Front Side"
//               sub="Side with name & PAN number"
//               value={panFront}
//               onChange={setPanFront}
//             />
//             <FileUploadZone
//               label="PAN Card — Back Side"
//               sub="Back of the PAN card"
//               value={panBack}
//               onChange={setPanBack}
//             />
//           </div>
//         </div>

//         {/* ── Additional Attachments ── */}
//         <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
//           <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
//             <div className="flex items-center gap-2.5">
//               <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center">
//                 <Paperclip className="w-3.5 h-3.5 text-teal-600" />
//               </div>
//               <div>
//                 <h2 className="text-sm font-bold text-neutral-800">Additional Attachments</h2>
//                 <p className="text-[11px] text-neutral-400">Optional — Form 16, salary slips, etc.</p>
//               </div>
//             </div>
//             {attachments.length < 10 && (
//               <button
//                 type="button"
//                 onClick={() => attachInputRef.current?.click()}
//                 className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
//               >
//                 <Plus className="w-3.5 h-3.5" /> Add File
//               </button>
//             )}
//           </div>
//           <input
//             ref={attachInputRef}
//             type="file"
//             accept="image/jpeg,image/png,application/pdf"
//             className="hidden"
//             onChange={(e) => { const f = e.target.files?.[0]; if (f) addAttachment(f); e.target.value = ''; }}
//           />
//           <div className="p-5">
//             {attachments.length === 0 ? (
//               <button
//                 type="button"
//                 onClick={() => attachInputRef.current?.click()}
//                 className="w-full flex flex-col items-center gap-2 py-8 rounded-xl border-2 border-dashed border-neutral-200 hover:border-teal-300 hover:bg-teal-50/40 transition-all text-neutral-400 hover:text-teal-600"
//               >
//                 <Paperclip className="w-6 h-6" />
//                 <span className="text-xs font-medium">Click to attach supporting documents</span>
//               </button>
//             ) : (
//               <div className="space-y-3">
//                 {attachments.map((att, idx) => (
//                   <div key={idx} className="flex items-start gap-3 bg-neutral-50 border border-neutral-200 rounded-xl p-3">
//                     <div className="w-9 h-9 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shrink-0">
//                       {att.file.type.startsWith('image/') ? (
//                         <ImageIcon className="w-4 h-4 text-neutral-500" />
//                       ) : (
//                         <FileText className="w-4 h-4 text-neutral-500" />
//                       )}
//                     </div>
//                     <div className="flex-1 min-w-0 space-y-1.5">
//                       <p className="text-xs font-semibold text-neutral-700 truncate">{att.file.name}</p>
//                       <input
//                         type="text"
//                         value={att.remark}
//                         onChange={(e) => setAttachments(prev => prev.map((a, i) => i === idx ? { ...a, remark: e.target.value } : a))}
//                         placeholder="Add a remark (optional)"
//                         className="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-neutral-400"
//                       />
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
//                       className="p-1.5 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-500 transition-colors shrink-0"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//                 {attachments.length < 10 && (
//                   <button
//                     type="button"
//                     onClick={() => attachInputRef.current?.click()}
//                     className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-neutral-300 hover:border-teal-400 text-neutral-400 hover:text-teal-600 text-xs font-medium transition-all"
//                   >
//                     <Plus className="w-3.5 h-3.5" /> Add another file
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ── Other Notes ── */}
//         <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
//           <div className="px-5 py-4 border-b border-neutral-100 flex items-center gap-2.5">
//             <div className="w-7 h-7 rounded-lg bg-yellow-100 flex items-center justify-center">
//               <StickyNote className="w-3.5 h-3.5 text-yellow-600" />
//             </div>
//             <div>
//               <h2 className="text-sm font-bold text-neutral-800">Other Notes</h2>
//               <p className="text-[11px] text-neutral-400">Optional — any extra info for our CA team</p>
//             </div>
//           </div>
//           <div className="p-5">
//             <textarea
//               value={otherNotes}
//               onChange={(e) => setOtherNotes(e.target.value)}
//               rows={3}
//               placeholder="e.g. I have multiple Form 16s, please check the attached salary slips…"
//               className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none leading-relaxed"
//             />
//           </div>
//         </div>

//         {/* ── Disclaimer ── */}
//         <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
//           <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
//           <p className="text-xs text-amber-800 leading-relaxed">
//             Ensure your documents are <strong>clear, legible, and not expired</strong>. Files are encrypted and stored securely.
//           </p>
//         </div>

//         {/* ── Submit button (inline, always visible) ── */}
//         <button
//           type="button"
//           onClick={handleSubmit}
//           disabled={submitting}
//           className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base text-white transition-opacity disabled:opacity-60 shadow-lg"
//           style={{ background: 'linear-gradient(135deg,#2563EB,#1D4ED8)', boxShadow: '0 4px 20px rgba(37,99,235,0.35)' }}
//         >
//           {submitting
//             ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting…</>
//             : <><CheckCircle2 className="w-5 h-5" /> Submit Details</>}
//         </button>

//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Upload, X, Plus, FileText, Image as ImageIcon,
  CheckCircle2, Loader2, AlertCircle, Shield,
  Phone, Mail, StickyNote, Paperclip, ChevronRight, User,
  CreditCard, FolderOpen, Send, Check,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

const API = import.meta.env.VITE_API_BASE_URL || '/api';

// ─── Types ────────────────────────────────────────────────────────────────────
interface OrderItem {
  id: number;
  orderId: number;
  serviceName: string;
  planType: string;
  price: number;
  orderNumber: string;
  orderStatus: string;
}

interface UploadFile {
  file: File | null;
  preview: string | null;
}

interface Attachment {
  file: File;
  remark: string;
}

// ─── Injected Styles ──────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,300&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

    .itr-root { font-family: 'Plus Jakarta Sans', sans-serif; }
    .itr-display { font-family: 'Fraunces', Georgia, serif; }

    .itr-card {
      background: #ffffff;
      border: 1px solid #E4E4E0;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03);
    }

    .itr-input {
      width: 100%;
      padding: 11px 14px;
      border: 1.5px solid #E4E4E0;
      border-radius: 10px;
      font-size: 14px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #111827;
      background: #FAFAF8;
      transition: all 0.18s ease;
      outline: none;
    }
    .itr-input::placeholder { color: #AEAAA6; }
    .itr-input:focus {
      border-color: #4338CA;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(67,56,202,0.10);
    }

    .upload-zone {
      border: 1.5px dashed #D4D0CA;
      border-radius: 12px;
      background: #FAFAF8;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .upload-zone:hover, .upload-zone.dragging {
      border-color: #4338CA;
      background: rgba(67,56,202,0.03);
    }

    .upload-filled {
      background: #F0FDF4;
      border: 1.5px solid #86EFAC;
      border-radius: 12px;
    }

    .step-line {
      position: absolute;
      left: 19px;
      top: 44px;
      bottom: -8px;
      width: 2px;
      background: linear-gradient(to bottom, #E4E4E0, transparent);
    }
    .step-line.done { background: linear-gradient(to bottom, #4338CA, #818CF8); }

    .progress-step.active .step-icon {
      background: #4338CA;
      border-color: #4338CA;
      color: white;
      box-shadow: 0 0 0 4px rgba(67,56,202,0.15);
    }
    .progress-step.done .step-icon {
      background: #059669;
      border-color: #059669;
      color: white;
    }
    .progress-step .step-icon {
      width: 40px; height: 40px;
      border-radius: 50%;
      border: 2px solid #D4D0CA;
      background: #F5F5F2;
      color: #AEAAA6;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700;
      transition: all 0.3s ease;
      position: relative; z-index: 1;
      flex-shrink: 0;
    }

    .submit-btn {
      background: linear-gradient(135deg, #4338CA 0%, #3730A3 100%);
      border-radius: 14px;
      padding: 16px 32px;
      font-weight: 700;
      font-size: 15px;
      color: white;
      border: none;
      cursor: pointer;
      width: 100%;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      box-shadow: 0 4px 24px rgba(67,56,202,0.35), 0 1px 4px rgba(67,56,202,0.2);
      transition: all 0.2s ease;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .submit-btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 8px 32px rgba(67,56,202,0.42), 0 2px 8px rgba(67,56,202,0.25);
    }
    .submit-btn:active:not(:disabled) { transform: translateY(0); }
    .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

    .section-header {
      padding: 18px 24px;
      border-bottom: 1px solid #F0EFEB;
      display: flex; align-items: center; gap: 12px;
    }
    .section-icon {
      width: 36px; height: 36px;
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .section-body { padding: 24px; }

    .attachment-row {
      display: flex; align-items: flex-start; gap: 12px;
      padding: 14px;
      background: #FAFAF8;
      border: 1px solid #E4E4E0;
      border-radius: 12px;
      margin-bottom: 10px;
    }
    .attachment-icon {
      width: 38px; height: 38px; border-radius: 9px;
      background: #fff; border: 1px solid #E4E4E0;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeUp 0.45s ease both; }
    .fade-up-1 { animation-delay: 0.05s; }
    .fade-up-2 { animation-delay: 0.12s; }
    .fade-up-3 { animation-delay: 0.19s; }
    .fade-up-4 { animation-delay: 0.26s; }
    .fade-up-5 { animation-delay: 0.33s; }
    .fade-up-6 { animation-delay: 0.40s; }

    @keyframes spin { to { transform: rotate(360deg); } }
    .spin { animation: spin 0.9s linear infinite; }

    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.85); }
      to { opacity: 1; transform: scale(1); }
    }
    .scale-in { animation: scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }

    .badge {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 10px; border-radius: 100px;
      font-size: 11px; font-weight: 600; letter-spacing: 0.03em;
    }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #D4D0CA; border-radius: 10px; }
  `}</style>
);

// ─── Step Configuration ───────────────────────────────────────────────────────
const STEPS = [
  { id: 0, label: 'Contact Info', sub: 'Mobile & email', icon: User },
  { id: 1, label: 'Aadhaar Card', sub: 'Front & back upload', icon: ImageIcon },
  { id: 2, label: 'PAN Card', sub: 'Front & back upload', icon: CreditCard },
  { id: 3, label: 'Attachments', sub: 'Supporting documents', icon: FolderOpen },
  { id: 4, label: 'Notes & Submit', sub: 'Review & confirm', icon: Send },
];

// ─── Sidebar Progress ─────────────────────────────────────────────────────────
const SidebarProgress: React.FC<{ activeStep: number }> = ({ activeStep }) => (
  <aside style={{
    width: 260,
    flexShrink: 0,
    position: 'sticky',
    top: 72,
    alignSelf: 'flex-start',
    padding: '0 0 40px',
  }}>
    <div style={{ marginBottom: 28 }}>
      <p style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: '#AEAAA6', marginBottom: 4,
      }}>Filing Progress</p>
      <div style={{
        height: 4, background: '#F0EFEB', borderRadius: 99, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${Math.round(((activeStep + 1) / STEPS.length) * 100)}%`,
          background: 'linear-gradient(90deg, #4338CA, #818CF8)',
          borderRadius: 99,
          transition: 'width 0.4s ease',
        }} />
      </div>
      <p style={{ fontSize: 12, color: '#6B7280', marginTop: 8 }}>
        Step {activeStep + 1} of {STEPS.length}
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {STEPS.map((step, i) => {
        const isDone = i < activeStep;
        const isActive = i === activeStep;
        const Icon = step.icon;
        return (
          <div
            key={step.id}
            className={`progress-step ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}
            style={{ display: 'flex', gap: 14, position: 'relative', paddingBottom: i < STEPS.length - 1 ? 28 : 0 }}
          >
            {i < STEPS.length - 1 && (
              <div className={`step-line ${isDone ? 'done' : ''}`} />
            )}
            <div className="step-icon">
              {isDone ? <Check size={16} /> : <Icon size={16} />}
            </div>
            <div style={{ paddingTop: 9 }}>
              <p style={{
                fontSize: 13, fontWeight: isActive ? 700 : 500,
                color: isActive ? '#111827' : isDone ? '#4338CA' : '#9CA3AF',
                lineHeight: 1,
              }}>{step.label}</p>
              <p style={{ fontSize: 11, color: '#AEAAA6', marginTop: 3 }}>{step.sub}</p>
            </div>
          </div>
        );
      })}
    </div>

    {/* Trust badge */}
    <div style={{
      marginTop: 36, padding: '14px 16px',
      background: 'linear-gradient(135deg, #EEF2FF, #F5F3FF)',
      border: '1px solid #C7D2FE',
      borderRadius: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <Shield size={14} color="#4338CA" />
        <span style={{ fontSize: 12, fontWeight: 700, color: '#4338CA' }}>Bank-level Security</span>
      </div>
      <p style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.6 }}>
        Your documents are encrypted with AES-256 and processed by certified CAs.
      </p>
    </div>
  </aside>
);

// ─── File Upload Zone ─────────────────────────────────────────────────────────
const FileUploadZone: React.FC<{
  label: string;
  sub: string;
  value: UploadFile;
  onChange: (v: UploadFile) => void;
}> = ({ label, sub, value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      toast.error('Only JPG, PNG, or PDF files are allowed');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File must be under 10 MB');
      return;
    }
    const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
    onChange({ file, preview });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const isPdf = value.file?.type === 'application/pdf';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 4 }}>
        {label} <span style={{ color: '#EF4444' }}>*</span>
      </label>
      <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: -2 }}>{sub}</p>

      {value.file ? (
        <div className="upload-filled" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10, overflow: 'hidden',
            background: '#fff', border: '1px solid #86EFAC',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {value.preview
              ? <img src={value.preview} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <FileText size={18} color="#16A34A" />
            }
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#15803D', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {value.file.name}
            </p>
            <p style={{ fontSize: 11, color: '#22C55E', marginTop: 2 }}>
              {(value.file.size / 1024).toFixed(0)} KB · {isPdf ? 'PDF Document' : 'Image'}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '3px 8px', background: '#DCFCE7', borderRadius: 99,
            }}>
              <Check size={10} color="#16A34A" />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#16A34A' }}>Uploaded</span>
            </div>
            <button
              type="button"
              onClick={() => onChange({ file: null, preview: null })}
              style={{
                padding: 6, borderRadius: 8, border: 'none', cursor: 'pointer',
                background: 'rgba(220,252,231,0.5)', color: '#16A34A', display: 'flex',
                transition: 'all 0.15s',
              }}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`upload-zone ${dragging ? 'dragging' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 10, padding: '28px 16px',
          }}
        >
          <div style={{
            width: 42, height: 42, borderRadius: '50%',
            background: '#fff', border: '1px solid #E4E4E0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            <Upload size={16} color={dragging ? '#4338CA' : '#9CA3AF'} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: '#4338CA', fontWeight: 600, marginBottom: 2 }}>
              Click to upload <span style={{ color: '#6B7280', fontWeight: 400 }}>or drag & drop</span>
            </p>
            <p style={{ fontSize: 11, color: '#AEAAA6' }}>JPG, PNG, PDF · Max 10 MB</p>
          </div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,application/pdf"
        style={{ display: 'none' }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
      />
    </div>
  );
};

// ─── Section Card ─────────────────────────────────────────────────────────────
const SectionCard: React.FC<{
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ icon, iconBg, title, subtitle, rightAction, children, className }) => (
  <div className={`itr-card fade-up ${className || ''}`}>
    <div className="section-header">
      <div className="section-icon" style={{ background: iconBg }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{subtitle}</p>}
      </div>
      {rightAction}
    </div>
    <div className="section-body">{children}</div>
  </div>
);

// ─── Field Label ──────────────────────────────────────────────────────────────
const FieldLabel: React.FC<{ children: React.ReactNode; required?: boolean }> = ({ children, required }) => (
  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
    {children} {required && <span style={{ color: '#EF4444' }}>*</span>}
  </label>
);

// ─── Input with prefix icon ───────────────────────────────────────────────────
const InputWithIcon: React.FC<{
  icon?: React.ReactNode;
  prefix?: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
}> = ({ icon, prefix, type = 'text', value, onChange, placeholder, maxLength }) => (
  <div style={{ position: 'relative' }}>
    {(icon || prefix) && (
      <div style={{
        position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
        display: 'flex', alignItems: 'center', gap: 4,
        color: '#9CA3AF', pointerEvents: 'none',
        fontSize: 13, fontWeight: 500,
      }}>
        {icon}
        {prefix && <span style={{ borderRight: '1px solid #E4E4E0', paddingRight: 8 }}>{prefix}</span>}
      </div>
    )}
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className="itr-input"
      style={{ paddingLeft: prefix ? 60 : icon ? 40 : 14 }}
    />
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export const ItrBasicFormPage: React.FC = () => {
  const { orderItemId } = useParams<{ orderItemId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [orderItem, setOrderItem] = useState<OrderItem | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [mobileNo, setMobileNo] = useState('');
  const [emailId, setEmailId] = useState('');
  const [otherNotes, setOtherNotes] = useState('');

  const [aadhaarFront, setAadhaarFront] = useState<UploadFile>({ file: null, preview: null });
  const [aadhaarBack, setAadhaarBack] = useState<UploadFile>({ file: null, preview: null });
  const [panFront, setPanFront] = useState<UploadFile>({ file: null, preview: null });
  const [panBack, setPanBack] = useState<UploadFile>({ file: null, preview: null });

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const attachInputRef = useRef<HTMLInputElement>(null);

  // Compute current active step for sidebar
  const getActiveStep = () => {
    if (!mobileNo || !emailId) return 0;
    if (!aadhaarFront.file || !aadhaarBack.file) return 1;
    if (!panFront.file || !panBack.file) return 2;
    if (attachments.length === 0) return 3;
    return 4;
  };

  // Pre-fill from user profile
  useEffect(() => {
    if (user) {
      if ((user as any).phone) setMobileNo((user as any).phone.replace(/\D/g, '').slice(-10));
      if (user.email) setEmailId(user.email);
    }
  }, [user]);

  // Fetch order item details
  useEffect(() => {
    if (!orderItemId) return;
    const fetchItem = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        const res = await fetch(`${API}/orders/items/${orderItemId}`, { headers, credentials: 'include' });
        if (!res.ok) throw new Error('Could not load order details');
        const data = await res.json();
        setOrderItem(data.orderItem);
      } catch {
        toast.error('Could not load order details.');
      } finally {
        setLoadingOrder(false);
      }
    };
    fetchItem();
  }, [orderItemId]);

  const addAttachment = (file: File) => {
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      toast.error('Only JPG, PNG, or PDF files are allowed');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Attachment must be under 5 MB');
      return;
    }
    setAttachments(prev => [...prev, { file, remark: '' }]);
  };

  const validate = (): string | null => {
    if (!/^[6-9]\d{9}$/.test(mobileNo)) return 'Enter a valid 10-digit mobile number';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId)) return 'Enter a valid email address';
    if (!aadhaarFront.file) return 'Aadhaar Front is required';
    if (!aadhaarBack.file) return 'Aadhaar Back is required';
    if (!panFront.file) return 'PAN Card Front is required';
    if (!panBack.file) return 'PAN Card Back is required';
    return null;
  };

  const handleSubmit = async (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { toast.error(err); return; }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('orderItemId', orderItemId!);
      formData.append('mobileNo', mobileNo);
      formData.append('emailId', emailId);
      if (otherNotes.trim()) formData.append('otherNotes', otherNotes.trim());

      formData.append('aadhaarFront', aadhaarFront.file!);
      formData.append('aadhaarBack', aadhaarBack.file!);
      formData.append('panFront', panFront.file!);
      formData.append('panBack', panBack.file!);

      const remarks: string[] = [];
      attachments.forEach((a) => {
        formData.append('attachments', a.file);
        remarks.push(a.remark || '');
      });
      if (remarks.length) formData.append('attachmentRemarks', JSON.stringify(remarks));

      const token = localStorage.getItem('token');
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API}/itr/basic`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      setSubmitted(true);
      toast.success('Details submitted successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const planPrice = orderItem?.price ? `₹${Number(orderItem.price).toLocaleString('en-IN')}` : '';

  // ── Loading ──
  if (loadingOrder) {
    return (
      <>
        <GlobalStyles />
        <div className="itr-root" style={{
          minHeight: '100vh',
          background: '#F7F7F5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 16,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            border: '3px solid #E4E4E0',
            borderTopColor: '#4338CA',
            animation: 'spin 0.8s linear infinite',
          }} />
          <p style={{ fontSize: 13, color: '#9CA3AF', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Loading your order…
          </p>
        </div>
      </>
    );
  }

  // ── Success screen ──
  if (submitted) {
    return (
      <>
        <GlobalStyles />
        <div className="itr-root" style={{
          minHeight: '100vh', background: '#F7F7F5',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        }}>
          <div className="itr-card scale-in" style={{ maxWidth: 460, width: '100%', textAlign: 'center', padding: 48 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, #DCFCE7, #BBF7D0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 0 0 8px rgba(34,197,94,0.1)',
            }}>
              <CheckCircle2 size={32} color="#16A34A" />
            </div>
            <h2 className="itr-display" style={{
              fontSize: 28, fontWeight: 600, color: '#111827',
              marginBottom: 10, lineHeight: 1.2,
            }}>
              All done!
            </h2>
            <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
              Your ITR filing details have been received. Our CA team will review your documents and reach out within <strong style={{ color: '#374151' }}>1–2 business days</strong>.
            </p>

            {orderItem && (
              <div style={{
                background: '#F7F7F5', border: '1px solid #E4E4E0', borderRadius: 12,
                padding: '14px 18px', marginBottom: 28, textAlign: 'left',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: '#9CA3AF' }}>Order Number</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{orderItem.orderNumber}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: '#9CA3AF' }}>Service</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{orderItem.serviceName}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => navigate('/dashboard', { state: { triggerPaymentForOrder: orderItem?.orderId } })}
              className="submit-btn"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </>
    );
  }

  const activeStep = getActiveStep();

  return (
    <>
      <GlobalStyles />
      <div className="itr-root" style={{ minHeight: '100vh', background: '#F7F7F5' }}>

        {/* ── Top Navigation Bar ── */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #E4E4E0',
        }}>
          <div style={{
            maxWidth: 1100, margin: '0 auto',
            padding: '0 24px', height: 64,
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 12px', borderRadius: 8, border: 'none',
                background: 'transparent', cursor: 'pointer',
                color: '#6B7280', fontSize: 13, fontWeight: 500,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#F5F5F2';
                (e.currentTarget as HTMLElement).style.color = '#111827';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = '#6B7280';
              }}
            >
              <ArrowLeft size={15} />
              Dashboard
            </button>

            <div style={{ width: 1, height: 20, background: '#E4E4E0' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9,
                background: 'linear-gradient(135deg, #4338CA, #6366F1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Shield size={15} color="white" />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', lineHeight: 1 }}>
                  {orderItem?.serviceName || 'ITR Filing'}
                </p>
                {planPrice && (
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                    {orderItem?.orderNumber} &nbsp;·&nbsp; {planPrice}
                  </p>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge" style={{ background: '#EEF2FF', color: '#4338CA', border: '1px solid #C7D2FE' }}>
                <Shield size={10} /> Basic Plan
              </span>
            </div>
          </div>
        </nav>

        {/* ── Page Body ── */}
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          padding: '40px 24px 80px',
          display: 'flex', gap: 40, alignItems: 'flex-start',
        }}>

          {/* ── Sidebar (hidden on mobile) ── */}
          <div style={{ display: 'none' }} className="sidebar-desktop">
            <SidebarProgress activeStep={activeStep} />
          </div>
          {/* Sidebar visible on md+ */}
          <style>{`
            @media (min-width: 860px) {
              .sidebar-desktop { display: block !important; }
            }
          `}</style>
          <div className="sidebar-desktop">
            <SidebarProgress activeStep={activeStep} />
          </div>

          {/* ── Form Sections ── */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Page title */}
            <div className="fade-up">
              <h1 className="itr-display" style={{
                fontSize: 32, fontWeight: 600, color: '#111827',
                lineHeight: 1.15, marginBottom: 6,
              }}>
                File your ITR
              </h1>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6 }}>
                Complete the sections below. Our CA team handles the rest — typically within 2 business days.
              </p>
            </div>

            {/* ── § 1 Contact Information ── */}
            <SectionCard
              className="fade-up-1"
              icon={<Phone size={16} color="#4338CA" />}
              iconBg="#EEF2FF"
              title="Contact Information"
              subtitle="We'll use these to send updates on your filing"
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                <div>
                  <FieldLabel required>Mobile Number</FieldLabel>
                  <InputWithIcon
                    prefix="+91"
                    type="tel"
                    value={mobileNo}
                    onChange={(v) => setMobileNo(v.replace(/\D/g, '').slice(0, 10))}
                    placeholder="98XXXXXXXX"
                    maxLength={10}
                  />
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 5 }}>Indian mobile number only</p>
                </div>
                <div>
                  <FieldLabel required>Email Address</FieldLabel>
                  <InputWithIcon
                    icon={<Mail size={15} />}
                    type="email"
                    value={emailId}
                    onChange={setEmailId}
                    placeholder="you@example.com"
                  />
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 5 }}>Filing receipts are sent here</p>
                </div>
              </div>
            </SectionCard>

            {/* ── § 2 Aadhaar Card ── */}
            <SectionCard
              className="fade-up-2"
              icon={<ImageIcon size={16} color="#EA580C" />}
              iconBg="#FFF7ED"
              title="Aadhaar Card"
              subtitle="Upload front & back — must be clearly legible"
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 20,
              }}>
                <FileUploadZone
                  label="Aadhaar — Front Side"
                  sub="Side with your photo & name"
                  value={aadhaarFront}
                  onChange={setAadhaarFront}
                />
                <FileUploadZone
                  label="Aadhaar — Back Side"
                  sub="Side with your address"
                  value={aadhaarBack}
                  onChange={setAadhaarBack}
                />
              </div>
            </SectionCard>

            {/* ── § 3 PAN Card ── */}
            <SectionCard
              className="fade-up-3"
              icon={<CreditCard size={16} color="#059669" />}
              iconBg="#ECFDF5"
              title="PAN Card"
              subtitle="Upload front & back — PAN number must be visible"
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 20,
              }}>
                <FileUploadZone
                  label="PAN Card — Front Side"
                  sub="Side with name & PAN number"
                  value={panFront}
                  onChange={setPanFront}
                />
                <FileUploadZone
                  label="PAN Card — Back Side"
                  sub="Back of the PAN card"
                  value={panBack}
                  onChange={setPanBack}
                />
              </div>
            </SectionCard>

            {/* ── § 4 Additional Attachments ── */}
            <SectionCard
              className="fade-up-4"
              icon={<Paperclip size={16} color="#0891B2" />}
              iconBg="#ECFEFF"
              title="Supporting Documents"
              subtitle="Optional — Form 16, salary slips, interest certificates, etc."
              rightAction={
                attachments.length > 0 && attachments.length < 10 ? (
                  <button
                    type="button"
                    onClick={() => attachInputRef.current?.click()}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '7px 14px', borderRadius: 8,
                      border: '1.5px solid #A5F3FC',
                      background: '#ECFEFF', color: '#0891B2',
                      fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}
                  >
                    <Plus size={13} /> Add File
                  </button>
                ) : undefined
              }
            >
              <input
                ref={attachInputRef}
                type="file"
                accept="image/jpeg,image/png,application/pdf"
                style={{ display: 'none' }}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) addAttachment(f); e.target.value = ''; }}
              />

              {attachments.length === 0 ? (
                <div
                  className="upload-zone"
                  onClick={() => attachInputRef.current?.click()}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: 12, padding: '36px 24px',
                  }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: '#ECFEFF', border: '1px solid #A5F3FC',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <FolderOpen size={22} color="#0891B2" />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>
                      Attach supporting documents
                    </p>
                    <p style={{ fontSize: 12, color: '#9CA3AF' }}>
                      Form 16, salary slips, bank statements, etc. (JPG, PNG, PDF · 5 MB each)
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {attachments.map((att, idx) => (
                    <div key={idx} className="attachment-row">
                      <div className="attachment-icon">
                        {att.file.type.startsWith('image/')
                          ? <ImageIcon size={16} color="#6B7280" />
                          : <FileText size={16} color="#6B7280" />
                        }
                      </div>
                      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <p style={{ fontSize: 12, fontWeight: 600, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {att.file.name}
                          </p>
                          <span style={{ fontSize: 11, color: '#9CA3AF', flexShrink: 0, marginLeft: 8 }}>
                            {(att.file.size / 1024).toFixed(0)} KB
                          </span>
                        </div>
                        <input
                          type="text"
                          value={att.remark}
                          onChange={(e) => setAttachments(prev => prev.map((a, i) => i === idx ? { ...a, remark: e.target.value } : a))}
                          placeholder="Add a label or note (optional)"
                          className="itr-input"
                          style={{ fontSize: 12, padding: '8px 12px' }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
                        style={{
                          width: 30, height: 30, borderRadius: 8, border: 'none',
                          background: 'transparent', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#9CA3AF', flexShrink: 0,
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.background = '#FEF2F2';
                          (e.currentTarget as HTMLElement).style.color = '#EF4444';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                          (e.currentTarget as HTMLElement).style.color = '#9CA3AF';
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {attachments.length < 10 && (
                    <button
                      type="button"
                      onClick={() => attachInputRef.current?.click()}
                      style={{
                        marginTop: 4, width: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        padding: '10px', borderRadius: 10,
                        border: '1.5px dashed #D4D0CA', background: 'transparent',
                        cursor: 'pointer', color: '#9CA3AF',
                        fontSize: 12, fontWeight: 500,
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = '#0891B2';
                        (e.currentTarget as HTMLElement).style.color = '#0891B2';
                        (e.currentTarget as HTMLElement).style.background = '#ECFEFF';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = '#D4D0CA';
                        (e.currentTarget as HTMLElement).style.color = '#9CA3AF';
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }}
                    >
                      <Plus size={13} /> Add another document
                    </button>
                  )}
                </div>
              )}
            </SectionCard>

            {/* ── § 5 Notes ── */}
            <SectionCard
              className="fade-up-5"
              icon={<StickyNote size={16} color="#D97706" />}
              iconBg="#FFFBEB"
              title="Additional Notes"
              subtitle="Optional — anything else our CA team should know"
            >
              <textarea
                value={otherNotes}
                onChange={(e) => setOtherNotes(e.target.value)}
                rows={4}
                placeholder="e.g. I have two Form 16s from different employers this year. The salary slips are attached. Please check the bank interest certificate too…"
                className="itr-input"
                style={{ resize: 'vertical', lineHeight: 1.7, minHeight: 100 }}
              />
              <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 6 }}>
                {otherNotes.length}/500 characters
              </p>
            </SectionCard>

            {/* ── Disclaimer ── */}
            <div className="fade-up-6" style={{
              display: 'flex', gap: 12, alignItems: 'flex-start',
              padding: '14px 16px',
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: 12,
            }}>
              <AlertCircle size={15} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: '#92400E', lineHeight: 1.65 }}>
                <strong>Before submitting:</strong> Ensure all documents are clear, legible, and not expired.
                Blurry or cropped files will delay processing. All files are AES-256 encrypted and
                handled only by verified CAs.
              </p>
            </div>

            {/* ── Submit Button ── */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="submit-btn fade-up-6"
            >
              {submitting ? (
                <>
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  Submitting your details…
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit to CA Team
                </>
              )}
            </button>

          </div>
        </div>
      </div>
    </>
  );
};