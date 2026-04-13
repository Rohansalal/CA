// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   ArrowLeft, Upload, X, Plus, FileText, Image as ImageIcon,
//   CheckCircle2, Loader2, AlertCircle, Zap,
//   Phone, Mail, StickyNote, Paperclip,
//   Building2, Hash, ChevronDown, ChevronUp, Trash2,
// } from 'lucide-react';
// import { toast } from 'sonner';
// import { useAuth } from '../contexts/AuthContext';

// const API = import.meta.env.VITE_API_BASE_URL || '/api';

// // ─── Types ────────────────────────────────────────────────────────────────────
// interface OrderItem {
//   id: number; orderId: number; serviceName: string;
//   planType: string; price: number; orderNumber: string; orderStatus: string;
// }
// interface UploadFile { file: File | null; preview: string | null; }
// interface Attachment { file: File; remark: string; }
// interface DirectorshipEntry {
//   companyName: string; companyPan: string;
//   companyType: 'Domestic' | 'Foreign' | '';
//   isListed: boolean; din: string;
//   openingNoOfShares: string; openingCostOfAcquisition: string;
//   acquiredNoOfShares: string; acquiredDate: string;
//   acquiredFaceValue: string; acquiredIssuePrice: string;
//   acquiredPurchasePrice: string; transferredNoOfShares: string;
//   transferredSaleConsideration: string; closingNoOfShares: string;
//   closingCostOfAcquisition: string;
// }

// const emptyDirectorship = (): DirectorshipEntry => ({
//   companyName: '', companyPan: '', companyType: '', isListed: true, din: '',
//   openingNoOfShares: '', openingCostOfAcquisition: '',
//   acquiredNoOfShares: '', acquiredDate: '', acquiredFaceValue: '',
//   acquiredIssuePrice: '', acquiredPurchasePrice: '',
//   transferredNoOfShares: '', transferredSaleConsideration: '',
//   closingNoOfShares: '', closingCostOfAcquisition: '',
// });

// // ─── Step Badge ───────────────────────────────────────────────────────────────
// const StepBadge: React.FC<{ n: number }> = ({ n }) => (
//   <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
//     <span className="text-xs font-bold text-white">{n}</span>
//   </div>
// );

// // ─── File Upload Zone ─────────────────────────────────────────────────────────
// const FileUploadZone: React.FC<{
//   label: string; sub: string; value: UploadFile; onChange: (v: UploadFile) => void; required?: boolean;
// }> = ({ label, sub, value, onChange, required = true }) => {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [dragging, setDragging] = useState(false);

//   const handleFile = (file: File) => {
//     if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
//       toast.error('Only JPG, PNG, or PDF allowed'); return;
//     }
//     if (file.size > 2 * 1024 * 1024) { toast.error('Max 2 MB'); return; }
//     onChange({ file, preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null });
//   };

//   return (
//     <div className="flex flex-col gap-1.5">
//       <label className="text-xs font-semibold text-slate-700">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <p className="text-[11px] text-slate-400 -mt-1">{sub}</p>
//       {value.file ? (
//         <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
//           <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white border border-emerald-200 flex items-center justify-center">
//             {value.preview
//               ? <img src={value.preview} alt="" className="w-full h-full object-cover" />
//               : <FileText className="w-5 h-5 text-emerald-600" />}
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-xs font-semibold text-emerald-800 truncate">{value.file.name}</p>
//             <p className="text-[11px] text-emerald-500">{(value.file.size / 1024).toFixed(0)} KB &nbsp;·&nbsp; {value.file.type === 'application/pdf' ? 'PDF' : 'Image'}</p>
//           </div>
//           <button type="button" onClick={() => onChange({ file: null, preview: null })}
//             className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-500 transition-colors">
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//       ) : (
//         <div
//           onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
//           onDragLeave={() => setDragging(false)}
//           onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
//           onClick={() => inputRef.current?.click()}
//           className={`cursor-pointer flex flex-col items-center gap-2 py-7 px-4 rounded-xl border-2 border-dashed transition-all
//             ${dragging ? 'border-indigo-400 bg-indigo-50' : 'border-slate-200 bg-slate-50/50 hover:border-indigo-300 hover:bg-indigo-50/30'}`}
//         >
//           <div className="w-9 h-9 bg-white rounded-full border border-slate-200 flex items-center justify-center shadow-sm">
//             <Upload className="w-4 h-4 text-slate-400" />
//           </div>
//           <p className="text-xs text-slate-500 text-center">
//             <span className="font-semibold text-indigo-600">Click to upload</span> or drag & drop
//           </p>
//           <p className="text-[11px] text-slate-400">JPG, PNG, PDF · Max 2 MB</p>
//         </div>
//       )}
//       <input ref={inputRef} type="file" accept="image/jpeg,image/png,application/pdf" className="hidden"
//         onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} />
//     </div>
//   );
// };

// // ─── Number Input ─────────────────────────────────────────────────────────────
// const NumInput: React.FC<{
//   label: string; value: string; onChange: (v: string) => void;
//   placeholder?: string; isDate?: boolean;
// }> = ({ label, value, onChange, placeholder, isDate }) => (
//   <div>
//     <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">{label}</label>
//     <input
//       type={isDate ? 'date' : 'text'}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder || '0'}
//       className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-slate-300 bg-white"
//     />
//   </div>
// );

// // ─── Section Card ─────────────────────────────────────────────────────────────
// const SectionCard: React.FC<{
//   step: number; icon: React.ReactNode; title: string; subtitle?: string;
//   badge?: React.ReactNode; action?: React.ReactNode; children: React.ReactNode;
// }> = ({ step, icon, title, subtitle, badge, action, children }) => (
//   <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//     <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
//       <StepBadge n={step} />
//       <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
//         {icon}
//       </div>
//       <div className="flex-1 min-w-0">
//         <h2 className="text-sm font-bold text-slate-800">{title}
//           {badge && <span className="ml-2">{badge}</span>}
//         </h2>
//         {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
//       </div>
//       {action}
//     </div>
//     {children}
//   </div>
// );

// // ─── Directorship Card ────────────────────────────────────────────────────────
// const DirectorshipCard: React.FC<{
//   idx: number; entry: DirectorshipEntry;
//   onChange: (idx: number, field: keyof DirectorshipEntry, value: any) => void;
//   onRemove: (idx: number) => void;
// }> = ({ idx, entry, onChange, onRemove }) => {
//   const [expanded, setExpanded] = useState(true);
//   const set = (field: keyof DirectorshipEntry) => (value: any) => onChange(idx, field, value);

//   return (
//     <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
//       {/* Header */}
//       <div className="flex items-center gap-3 px-4 py-3.5 bg-slate-50 border-b border-slate-100">
//         <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
//           <Building2 className="w-3.5 h-3.5 text-white" />
//         </div>
//         <div className="flex-1 min-w-0">
//           <p className="text-sm font-bold text-slate-800 truncate">
//             {entry.companyName || `Company ${idx + 1}`}
//           </p>
//           <p className="text-[11px] text-slate-400">
//             {entry.companyPan || 'PAN not entered'} &nbsp;·&nbsp;
//             <span className={`font-semibold ${entry.isListed ? 'text-emerald-600' : 'text-amber-600'}`}>
//               {entry.isListed ? 'Listed' : 'Unlisted'}
//             </span>
//           </p>
//         </div>
//         <div className="flex items-center gap-1.5 shrink-0">
//           <button type="button" onClick={() => setExpanded(v => !v)}
//             className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 transition-colors">
//             {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//           </button>
//           <button type="button" onClick={() => onRemove(idx)}
//             className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {expanded && (
//         <div className="p-5 space-y-5">
//           {/* Basic Info */}
//           <div className="grid sm:grid-cols-2 gap-4">
//             <div>
//               <label className="text-xs font-semibold text-slate-600 block mb-1.5">
//                 Company Name <span className="text-red-500">*</span>
//               </label>
//               <input type="text" value={entry.companyName} onChange={(e) => set('companyName')(e.target.value)}
//                 placeholder="Full legal name of company"
//                 className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
//             </div>
//             <div>
//               <label className="text-xs font-semibold text-slate-600 block mb-1.5">
//                 Company PAN <span className="text-red-500">*</span>
//               </label>
//               <input type="text" value={entry.companyPan}
//                 onChange={(e) => set('companyPan')(e.target.value.toUpperCase())}
//                 maxLength={10} placeholder="AABCD1234E"
//                 className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm uppercase placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
//             </div>
//             <div>
//               <label className="text-xs font-semibold text-slate-600 block mb-1.5">Company Type</label>
//               <div className="grid grid-cols-2 gap-2">
//                 {(['Domestic', 'Foreign'] as const).map((t) => (
//                   <button key={t} type="button" onClick={() => set('companyType')(t)}
//                     className={`py-2.5 rounded-xl text-xs font-bold border-2 transition-all
//                       ${entry.companyType === t ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:border-indigo-300'}`}>
//                     {t}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <label className="text-xs font-semibold text-slate-600 block mb-1.5">DIN (Director Identification No.)</label>
//               <div className="relative">
//                 <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                 <input type="text" value={entry.din} onChange={(e) => set('din')(e.target.value)}
//                   placeholder="12345678"
//                   className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
//               </div>
//             </div>
//           </div>

//           {/* Listed / Unlisted */}
//           <div>
//             <label className="text-xs font-semibold text-slate-600 block mb-2">
//               Share Listing Status <span className="text-red-500">*</span>
//             </label>
//             <div className="grid grid-cols-2 gap-3">
//               {[
//                 { val: true, label: 'Listed', sub: 'Traded on stock exchange', color: 'emerald' },
//                 { val: false, label: 'Unlisted', sub: 'Not on exchange — share details required', color: 'amber' },
//               ].map(({ val, label, sub, color }) => (
//                 <button key={label} type="button" onClick={() => set('isListed')(val)}
//                   className={`flex flex-col gap-1 px-4 py-3.5 rounded-xl border-2 text-left transition-all
//                     ${entry.isListed === val
//                       ? color === 'emerald' ? 'border-emerald-500 bg-emerald-50' : 'border-amber-500 bg-amber-50'
//                       : 'border-slate-200 hover:border-slate-300'}`}>
//                   <span className={`text-sm font-bold ${entry.isListed === val
//                     ? color === 'emerald' ? 'text-emerald-700' : 'text-amber-700'
//                     : 'text-slate-600'}`}>{label}</span>
//                   <span className="text-[11px] text-slate-400 leading-tight">{sub}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Unlisted Share Balance */}
//           {!entry.isListed && (
//             <div className="border border-amber-200 rounded-2xl overflow-hidden">
//               <div className="px-5 py-3.5 bg-amber-50 border-b border-amber-200 flex items-center gap-2.5">
//                 <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center">
//                   <Building2 className="w-3 h-3 text-white" />
//                 </div>
//                 <div>
//                   <p className="text-xs font-bold text-amber-800">Unlisted Share Details (Schedule AL)</p>
//                   <p className="text-[11px] text-amber-600">Mandatory for unlisted company shareholdings</p>
//                 </div>
//               </div>
//               <div className="p-5 space-y-5 bg-amber-50/20">

//                 {/* A: Opening */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center font-bold">A</span>
//                     <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Opening Balance</span>
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <NumInput label="No. of Shares (Col 4)" value={entry.openingNoOfShares} onChange={set('openingNoOfShares')} placeholder="e.g. 7000" />
//                     <NumInput label="Cost of Acquisition ₹ (Col 5)" value={entry.openingCostOfAcquisition} onChange={set('openingCostOfAcquisition')} placeholder="e.g. 70000" />
//                   </div>
//                 </div>

//                 {/* B: Acquired */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center font-bold">B</span>
//                     <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Shares Acquired During the Year</span>
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <NumInput label="No. of Shares (Col 6)" value={entry.acquiredNoOfShares} onChange={set('acquiredNoOfShares')} placeholder="e.g. 500" />
//                     <NumInput label="Date of Purchase (Col 7)" value={entry.acquiredDate} onChange={set('acquiredDate')} isDate />
//                     <NumInput label="Face Value per Share ₹ (Col 8)" value={entry.acquiredFaceValue} onChange={set('acquiredFaceValue')} placeholder="e.g. 10" />
//                     <NumInput label="Issue Price per Share ₹ (Col 9)" value={entry.acquiredIssuePrice} onChange={set('acquiredIssuePrice')} placeholder="e.g. 100" />
//                     <NumInput label="Purchase Price per Share ₹ (Col 10)" value={entry.acquiredPurchasePrice} onChange={set('acquiredPurchasePrice')} placeholder="e.g. 0" />
//                   </div>
//                 </div>

//                 {/* C: Transferred */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center font-bold">C</span>
//                     <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Shares Transferred</span>
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <NumInput label="No. of Shares Transferred (Col 11)" value={entry.transferredNoOfShares} onChange={set('transferredNoOfShares')} placeholder="e.g. 0" />
//                     <NumInput label="Sale Consideration ₹ (Col 12)" value={entry.transferredSaleConsideration} onChange={set('transferredSaleConsideration')} placeholder="e.g. 0" />
//                   </div>
//                 </div>

//                 {/* D: Closing */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center font-bold">D</span>
//                     <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Closing Balance</span>
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <NumInput label="No. of Shares (Col 13)" value={entry.closingNoOfShares} onChange={set('closingNoOfShares')} placeholder="e.g. 7000" />
//                     <NumInput label="Cost of Acquisition ₹ (Col 14)" value={entry.closingCostOfAcquisition} onChange={set('closingCostOfAcquisition')} placeholder="e.g. 70000" />
//                   </div>
//                 </div>

//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── Progress Steps ───────────────────────────────────────────────────────────
// const STEPS = ['Contact', 'KYC Docs', 'Directorships', 'Submit'];
// const ProgressBar: React.FC<{ active: number }> = ({ active }) => (
//   <div className="flex items-center gap-0">
//     {STEPS.map((label, i) => (
//       <React.Fragment key={label}>
//         <div className="flex flex-col items-center gap-1">
//           <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
//             ${i <= active ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200' : 'bg-slate-200 text-slate-400'}`}>
//             {i < active ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
//           </div>
//           <span className={`text-[10px] font-semibold hidden sm:block ${i <= active ? 'text-indigo-600' : 'text-slate-400'}`}>{label}</span>
//         </div>
//         {i < STEPS.length - 1 && (
//           <div className={`h-0.5 flex-1 mx-1 mb-4 rounded-full transition-all ${i < active ? 'bg-indigo-500' : 'bg-slate-200'}`} />
//         )}
//       </React.Fragment>
//     ))}
//   </div>
// );

// // ─── Main Page ────────────────────────────────────────────────────────────────
// export const ItrStandardFormPage: React.FC = () => {
//   const { orderItemId } = useParams<{ orderItemId: string }>();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [orderItem, setOrderItem] = useState<OrderItem | null>(null);
//   const [loadingOrder, setLoadingOrder] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const [mobileNo, setMobileNo] = useState('');
//   const [emailId, setEmailId] = useState('');
//   const [otherNotes, setOtherNotes] = useState('');

//   const [aadhaarFront, setAadhaarFront] = useState<UploadFile>({ file: null, preview: null });
//   const [aadhaarBack, setAadhaarBack] = useState<UploadFile>({ file: null, preview: null });
//   const [panFront, setPanFront] = useState<UploadFile>({ file: null, preview: null });
//   const [panBack, setPanBack] = useState<UploadFile>({ file: null, preview: null });

//   const [attachments, setAttachments] = useState<Attachment[]>([]);
//   const [directorships, setDirectorships] = useState<DirectorshipEntry[]>([]);
//   const attachInputRef = useRef<HTMLInputElement>(null);

//   // Derive active step for progress bar
//   const activeStep = (() => {
//     if (!mobileNo || !emailId) return 0;
//     if (!aadhaarFront.file || !aadhaarBack.file || !panFront.file || !panBack.file) return 1;
//     return 2;
//   })();

//   useEffect(() => {
//     if (user) {
//       if ((user as any).phone) setMobileNo((user as any).phone.replace(/\D/g, '').slice(-10));
//       if (user.email) setEmailId(user.email);
//     }
//   }, [user]);

//   useEffect(() => {
//     if (!orderItemId) return;
//     (async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const headers: Record<string, string> = {};
//         if (token) headers['Authorization'] = `Bearer ${token}`;
//         const res = await fetch(`${API}/orders/items/${orderItemId}`, { headers, credentials: 'include' });
//         if (!res.ok) throw new Error();
//         const data = await res.json();
//         setOrderItem(data.orderItem);
//       } catch { toast.error('Could not load order details.'); }
//       finally { setLoadingOrder(false); }
//     })();
//   }, [orderItemId]);

//   const updateDirectorship = (idx: number, field: keyof DirectorshipEntry, value: any) =>
//     setDirectorships(prev => prev.map((d, i) => i === idx ? { ...d, [field]: value } : d));

//   const addAttachment = (file: File) => {
//     if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
//       toast.error('Only JPG, PNG, or PDF allowed'); return;
//     }
//     if (file.size > 5 * 1024 * 1024) { toast.error('Max 5 MB per attachment'); return; }
//     setAttachments(prev => [...prev, { file, remark: '' }]);
//   };

//   const validate = (): string | null => {
//     if (!/^[6-9]\d{9}$/.test(mobileNo)) return 'Enter a valid 10-digit mobile number';
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId)) return 'Enter a valid email address';
//     if (!aadhaarFront.file) return 'Aadhaar Front is required';
//     if (!aadhaarBack.file) return 'Aadhaar Back is required';
//     if (!panFront.file) return 'PAN Card Front is required';
//     if (!panBack.file) return 'PAN Card Back is required';
//     for (let i = 0; i < directorships.length; i++) {
//       const d = directorships[i];
//       if (!d.companyName.trim()) return `Company ${i + 1}: Name is required`;
//       if (!d.companyPan.trim()) return `Company ${i + 1}: PAN is required`;
//       if (!d.isListed && !d.openingNoOfShares && !d.closingNoOfShares)
//         return `Company ${i + 1} (Unlisted): Enter opening or closing share balance`;
//     }
//     return null;
//   };

//   const handleSubmit = async () => {
//     const err = validate();
//     if (err) { toast.error(err); return; }
//     setSubmitting(true);
//     try {
//       const fd = new FormData();
//       fd.append('orderItemId', orderItemId!);
//       fd.append('mobileNo', mobileNo);
//       fd.append('emailId', emailId);
//       if (otherNotes.trim()) fd.append('otherNotes', otherNotes.trim());
//       fd.append('aadhaarFront', aadhaarFront.file!);
//       fd.append('aadhaarBack', aadhaarBack.file!);
//       fd.append('panFront', panFront.file!);
//       fd.append('panBack', panBack.file!);

//       if (directorships.length > 0) {
//         fd.append('directorships', JSON.stringify(directorships.map(d => ({
//           companyName: d.companyName, companyPan: d.companyPan,
//           companyType: d.companyType || null, isListed: d.isListed, din: d.din || null,
//           openingNoOfShares: d.openingNoOfShares ? Number(d.openingNoOfShares) : null,
//           openingCostOfAcquisition: d.openingCostOfAcquisition ? Number(d.openingCostOfAcquisition) : null,
//           acquiredNoOfShares: d.acquiredNoOfShares ? Number(d.acquiredNoOfShares) : null,
//           acquiredDate: d.acquiredDate || null,
//           acquiredFaceValue: d.acquiredFaceValue ? Number(d.acquiredFaceValue) : null,
//           acquiredIssuePrice: d.acquiredIssuePrice ? Number(d.acquiredIssuePrice) : null,
//           acquiredPurchasePrice: d.acquiredPurchasePrice ? Number(d.acquiredPurchasePrice) : null,
//           transferredNoOfShares: d.transferredNoOfShares ? Number(d.transferredNoOfShares) : null,
//           transferredSaleConsideration: d.transferredSaleConsideration ? Number(d.transferredSaleConsideration) : null,
//           closingNoOfShares: d.closingNoOfShares ? Number(d.closingNoOfShares) : null,
//           closingCostOfAcquisition: d.closingCostOfAcquisition ? Number(d.closingCostOfAcquisition) : null,
//         }))));
//       }

//       const remarks: string[] = [];
//       attachments.forEach(a => { fd.append('attachments', a.file); remarks.push(a.remark || ''); });
//       if (remarks.length) fd.append('attachmentRemarks', JSON.stringify(remarks));

//       const token = localStorage.getItem('token');
//       const headers: Record<string, string> = {};
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       const res = await fetch(`${API}/itr/standard`, { method: 'POST', headers, credentials: 'include', body: fd });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || 'Submission failed');
//       setSubmitted(true);
//       toast.success('Details submitted successfully!');
//     } catch (err: any) {
//       toast.error(err.message || 'Something went wrong.');
//     } finally { setSubmitting(false); }
//   };

//   // ── Success ──
//   if (submitted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 max-w-md w-full text-center">
//           <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
//             <CheckCircle2 className="w-10 h-10 text-emerald-600" />
//           </div>
//           <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold uppercase tracking-wider border border-indigo-200 mb-4">
//             <Zap className="w-3 h-3" /> Standard Plan
//           </div>
//           <h2 className="text-xl font-bold text-slate-900 mb-2">Submitted Successfully!</h2>
//           <p className="text-sm text-slate-500 mb-8 leading-relaxed">
//             Your ITR Standard details have been received. Our CA team will review your information and reach out within 1–2 business days.
//           </p>
//           <button onClick={() => navigate('/dashboard', { state: { triggerPaymentForOrder: orderItem?.orderId } })}
//             className="w-full py-3.5 rounded-2xl font-bold text-sm text-white shadow-lg transition-opacity hover:opacity-90"
//             style={{ background: 'linear-gradient(135deg,#4F46E5,#4338CA)', boxShadow: '0 4px 20px rgba(79,70,229,0.3)' }}>
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (loadingOrder) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
//         <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
//       </div>
//     );
//   }

//   const planPrice = orderItem?.price ? `₹${Number(orderItem.price).toLocaleString('en-IN')}` : '';
//   const unlistedCount = directorships.filter(d => !d.isListed).length;

//   return (
//     <div className="min-h-screen bg-[#F7F8FC]">

//       {/* ── Top Bar ── */}
//       <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-200">
//         <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
//           <button onClick={() => navigate('/dashboard')}
//             className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
//             <ArrowLeft className="w-4 h-4" />
//           </button>
//           <div className="flex items-center gap-3 flex-1 min-w-0">
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center shrink-0 shadow-sm">
//               <Zap className="w-4.5 h-4.5 text-white" />
//             </div>
//             <div className="min-w-0">
//               <p className="text-sm font-bold text-slate-900 truncate">
//                 {orderItem?.serviceName || 'Income Tax Return'}
//               </p>
//               <p className="text-[11px] text-slate-400">
//                 {orderItem?.orderNumber && <span>{orderItem.orderNumber} &nbsp;·&nbsp;</span>}
//                 {planPrice && <span>{planPrice} &nbsp;·&nbsp;</span>}
//                 Standard Plan
//               </p>
//             </div>
//           </div>
//           <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
//             <Zap className="w-3 h-3" /> Standard
//           </span>
//         </div>
//       </div>

//       {/* ── Progress ── */}
//       <div className="max-w-3xl mx-auto px-4 pt-5 pb-2">
//         <ProgressBar active={activeStep} />
//       </div>

//       <div className="max-w-3xl mx-auto px-4 pb-10 pt-3 space-y-4">

//         {/* ── 1. Contact Information ── */}
//         <SectionCard
//           step={1}
//           icon={<Phone className="w-4 h-4 text-slate-500" />}
//           title="Contact Information"
//           subtitle="We'll use this to send updates about your filing"
//         >
//           <div className="p-5 grid sm:grid-cols-2 gap-4">
//             <div>
//               <label className="text-xs font-semibold text-slate-600 block mb-1.5">
//                 Mobile Number <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold select-none">+91</span>
//                 <input type="tel" value={mobileNo}
//                   onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, '').slice(0, 10))}
//                   placeholder="98XXXXXXXX" maxLength={10}
//                   className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50 focus:bg-white transition-colors" />
//               </div>
//             </div>
//             <div>
//               <label className="text-xs font-semibold text-slate-600 block mb-1.5">
//                 Email Address <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                 <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)}
//                   placeholder="you@email.com"
//                   className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50 focus:bg-white transition-colors" />
//               </div>
//             </div>
//           </div>
//         </SectionCard>

//         {/* ── 2. Aadhaar Card ── */}
//         <SectionCard
//           step={2}
//           icon={<ImageIcon className="w-4 h-4 text-orange-500" />}
//           title="Aadhaar Card"
//           subtitle="Upload front & back — must be clearly legible"
//         >
//           <div className="p-5 grid sm:grid-cols-2 gap-5">
//             <FileUploadZone label="Front Side" sub="Photo, name & Aadhaar number" value={aadhaarFront} onChange={setAadhaarFront} />
//             <FileUploadZone label="Back Side" sub="Address & barcode side" value={aadhaarBack} onChange={setAadhaarBack} />
//           </div>
//         </SectionCard>

//         {/* ── 3. PAN Card ── */}
//         <SectionCard
//           step={3}
//           icon={<ImageIcon className="w-4 h-4 text-emerald-500" />}
//           title="PAN Card"
//           subtitle="Upload front & back of your PAN card"
//         >
//           <div className="p-5 grid sm:grid-cols-2 gap-5">
//             <FileUploadZone label="Front Side" sub="Name, DOB & PAN number" value={panFront} onChange={setPanFront} />
//             <FileUploadZone label="Back Side" sub="Back of the PAN card" value={panBack} onChange={setPanBack} />
//           </div>
//         </SectionCard>

//         {/* ── 4. Attachments ── */}
//         <SectionCard
//           step={4}
//           icon={<Paperclip className="w-4 h-4 text-teal-500" />}
//           title="Supporting Documents"
//           subtitle="Form 16, salary slips, investment proofs — optional"
//           action={attachments.length < 10 ? (
//             <button type="button" onClick={() => attachInputRef.current?.click()}
//               className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors border border-teal-200">
//               <Plus className="w-3.5 h-3.5" /> Add File
//             </button>
//           ) : undefined}
//         >
//           <input ref={attachInputRef} type="file" accept="image/jpeg,image/png,application/pdf" className="hidden"
//             onChange={(e) => { const f = e.target.files?.[0]; if (f) addAttachment(f); e.target.value = ''; }} />
//           <div className="p-5">
//             {attachments.length === 0 ? (
//               <button type="button" onClick={() => attachInputRef.current?.click()}
//                 className="w-full flex flex-col items-center gap-2 py-8 rounded-xl border-2 border-dashed border-slate-200 hover:border-teal-300 hover:bg-teal-50/30 transition-all text-slate-400 hover:text-teal-600">
//                 <Paperclip className="w-6 h-6" />
//                 <span className="text-xs font-semibold">Click to attach documents</span>
//                 <span className="text-[11px] text-slate-400">Form 16, bank statements, investment proofs, etc.</span>
//               </button>
//             ) : (
//               <div className="space-y-2.5">
//                 {attachments.map((att, idx) => (
//                   <div key={idx} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
//                     <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
//                       {att.file.type.startsWith('image/')
//                         ? <ImageIcon className="w-4 h-4 text-slate-500" />
//                         : <FileText className="w-4 h-4 text-slate-500" />}
//                     </div>
//                     <div className="flex-1 min-w-0 space-y-1.5">
//                       <p className="text-xs font-semibold text-slate-700 truncate">{att.file.name}</p>
//                       <input type="text" value={att.remark}
//                         onChange={(e) => setAttachments(prev => prev.map((a, i) => i === idx ? { ...a, remark: e.target.value } : a))}
//                         placeholder="Remark (e.g. Form 16 - Employer 1)"
//                         className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-slate-400 bg-white" />
//                     </div>
//                     <button type="button" onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
//                       className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors shrink-0">
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//                 {attachments.length < 10 && (
//                   <button type="button" onClick={() => attachInputRef.current?.click()}
//                     className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-teal-400 text-slate-400 hover:text-teal-600 text-xs font-medium transition-all">
//                     <Plus className="w-3.5 h-3.5" /> Add another file
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </SectionCard>

//         {/* ── 5. Directorships ── */}
//         <SectionCard
//           step={5}
//           icon={<Building2 className="w-4 h-4 text-indigo-500" />}
//           title="Directorship / Unlisted Shares"
//           subtitle={`Add companies where you hold directorship or unlisted shares${unlistedCount > 0 ? ` · ${unlistedCount} unlisted` : ''}`}
//           badge={directorships.length > 0 ? (
//             <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[11px] rounded-full font-bold">
//               {directorships.length}
//             </span>
//           ) : undefined}
//           action={
//             <button type="button" onClick={() => setDirectorships(prev => [...prev, emptyDirectorship()])}
//               className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors border border-indigo-200">
//               <Plus className="w-3.5 h-3.5" /> Add Company
//             </button>
//           }
//         >
//           <div className="p-5">
//             {directorships.length === 0 ? (
//               <button type="button" onClick={() => setDirectorships([emptyDirectorship()])}
//                 className="w-full flex flex-col items-center gap-2 py-10 rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 transition-all text-slate-400 hover:text-indigo-600">
//                 <Building2 className="w-7 h-7" />
//                 <span className="text-sm font-semibold">Add Directorship or Unlisted Company</span>
//                 <span className="text-xs text-slate-400 max-w-xs text-center leading-relaxed">
//                   Skip if you have no directorship or unlisted shareholding
//                 </span>
//               </button>
//             ) : (
//               <div className="space-y-4">
//                 {directorships.map((entry, idx) => (
//                   <DirectorshipCard
//                     key={idx} idx={idx} entry={entry}
//                     onChange={updateDirectorship}
//                     onRemove={(i) => setDirectorships(prev => prev.filter((_, j) => j !== i))}
//                   />
//                 ))}
//                 <button type="button" onClick={() => setDirectorships(prev => [...prev, emptyDirectorship()])}
//                   className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-slate-300 hover:border-indigo-400 text-slate-400 hover:text-indigo-600 text-xs font-semibold transition-all">
//                   <Plus className="w-3.5 h-3.5" /> Add Another Company
//                 </button>
//               </div>
//             )}
//           </div>
//         </SectionCard>

//         {/* ── 6. Other Notes ── */}
//         <SectionCard
//           step={6}
//           icon={<StickyNote className="w-4 h-4 text-amber-500" />}
//           title="Additional Notes"
//           subtitle="Optional — share any extra information with our CA team"
//         >
//           <div className="p-5">
//             <textarea value={otherNotes} onChange={(e) => setOtherNotes(e.target.value)} rows={3}
//               placeholder="e.g. I have salary from 2 employers, rental income, or capital gains — mention anything relevant…"
//               className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none leading-relaxed bg-slate-50/50 focus:bg-white transition-colors" />
//           </div>
//         </SectionCard>

//         {/* ── Compliance Notice ── */}
//         <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
//           <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
//           <p className="text-xs text-amber-800 leading-relaxed">
//             Ensure all documents are <strong>clear and legible</strong>. For unlisted companies, share balance details (Schedule AL) are mandatory as per Income Tax Act. All files are encrypted and stored securely.
//           </p>
//         </div>

//         {/* ── Submit ── */}
//         <button type="button" onClick={handleSubmit} disabled={submitting}
//           className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-base text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
//           style={{ background: 'linear-gradient(135deg,#4F46E5,#4338CA)', boxShadow: '0 4px 24px rgba(79,70,229,0.35)' }}>
//           {submitting
//             ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting…</>
//             : <><CheckCircle2 className="w-5 h-5" /> Submit ITR Standard Details</>}
//         </button>

//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Upload, X, Plus, FileText, Image as ImageIcon,
  CheckCircle2, Loader2, AlertCircle, Zap,
  Phone, Mail, StickyNote, Paperclip,
  Building2, Hash, ChevronDown, ChevronUp, Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

const API = import.meta.env.VITE_API_BASE_URL || '/api';

// ─── Types ────────────────────────────────────────────────────────────────────
interface OrderItem {
  id: number; orderId: number; serviceName: string;
  planType: string; price: number; orderNumber: string; orderStatus: string;
}
interface UploadFile { file: File | null; preview: string | null; }
interface Attachment { file: File; remark: string; }
interface DirectorshipEntry {
  companyName: string; companyPan: string;
  companyType: 'Domestic' | 'Foreign' | '';
  isListed: boolean; din: string;
  openingNoOfShares: string; openingCostOfAcquisition: string;
  acquiredNoOfShares: string; acquiredDate: string;
  acquiredFaceValue: string; acquiredIssuePrice: string;
  acquiredPurchasePrice: string; transferredNoOfShares: string;
  transferredSaleConsideration: string; closingNoOfShares: string;
  closingCostOfAcquisition: string;
}

// ─── FIX: default isListed to false so no form shows on initial add ───────────
const emptyDirectorship = (): DirectorshipEntry => ({
  companyName: '', companyPan: '', companyType: '', isListed: false, din: '',
  openingNoOfShares: '', openingCostOfAcquisition: '',
  acquiredNoOfShares: '', acquiredDate: '', acquiredFaceValue: '',
  acquiredIssuePrice: '', acquiredPurchasePrice: '',
  transferredNoOfShares: '', transferredSaleConsideration: '',
  closingNoOfShares: '', closingCostOfAcquisition: '',
});

// ─── Step Badge ───────────────────────────────────────────────────────────────
const StepBadge: React.FC<{ n: number }> = ({ n }) => (
  <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
    <span className="text-xs font-bold text-white">{n}</span>
  </div>
);

// ─── File Upload Zone ─────────────────────────────────────────────────────────
const FileUploadZone: React.FC<{
  label: string; sub: string; value: UploadFile; onChange: (v: UploadFile) => void; required?: boolean;
}> = ({ label, sub, value, onChange, required = true }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      toast.error('Only JPG, PNG, or PDF allowed'); return;
    }
    if (file.size > 2 * 1024 * 1024) { toast.error('Max 2 MB'); return; }
    onChange({ file, preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null });
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <p className="text-[11px] text-slate-400 -mt-1">{sub}</p>
      {value.file ? (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white border border-emerald-200 flex items-center justify-center">
            {value.preview
              ? <img src={value.preview} alt="" className="w-full h-full object-cover" />
              : <FileText className="w-5 h-5 text-emerald-600" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-emerald-800 truncate">{value.file.name}</p>
            <p className="text-[11px] text-emerald-500">{(value.file.size / 1024).toFixed(0)} KB &nbsp;·&nbsp; {value.file.type === 'application/pdf' ? 'PDF' : 'Image'}</p>
          </div>
          <button type="button" onClick={() => onChange({ file: null, preview: null })}
            className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer flex flex-col items-center gap-2 py-7 px-4 rounded-xl border-2 border-dashed transition-all
            ${dragging ? 'border-indigo-400 bg-indigo-50' : 'border-slate-200 bg-slate-50/50 hover:border-indigo-300 hover:bg-indigo-50/30'}`}
        >
          <div className="w-9 h-9 bg-white rounded-full border border-slate-200 flex items-center justify-center shadow-sm">
            <Upload className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-xs text-slate-500 text-center">
            <span className="font-semibold text-indigo-600">Click to upload</span> or drag & drop
          </p>
          <p className="text-[11px] text-slate-400">JPG, PNG, PDF · Max 2 MB</p>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,application/pdf" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} />
    </div>
  );
};

// ─── Number Input ─────────────────────────────────────────────────────────────
const NumInput: React.FC<{
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; isDate?: boolean;
}> = ({ label, value, onChange, placeholder, isDate }) => (
  <div>
    <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">{label}</label>
    <input
      type={isDate ? 'date' : 'text'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || '0'}
      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-slate-300 bg-white"
    />
  </div>
);

// ─── Section Card ─────────────────────────────────────────────────────────────
const SectionCard: React.FC<{
  step: number; icon: React.ReactNode; title: string; subtitle?: string;
  badge?: React.ReactNode; action?: React.ReactNode; children: React.ReactNode;
}> = ({ step, icon, title, subtitle, badge, action, children }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
      <StepBadge n={step} />
      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-bold text-slate-800">{title}
          {badge && <span className="ml-2">{badge}</span>}
        </h2>
        {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
    {children}
  </div>
);

// ─── Directorship Card ────────────────────────────────────────────────────────
const DirectorshipCard: React.FC<{
  idx: number; entry: DirectorshipEntry;
  onChange: (idx: number, field: keyof DirectorshipEntry, value: any) => void;
  onRemove: (idx: number) => void;
}> = ({ idx, entry, onChange, onRemove }) => {
  const [expanded, setExpanded] = useState(true);
  const set = (field: keyof DirectorshipEntry) => (value: any) => onChange(idx, field, value);

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3.5 bg-slate-50 border-b border-slate-100">
        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
          <Building2 className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800 truncate">
            {entry.companyName || `Company ${idx + 1}`}
          </p>
          <p className="text-[11px] text-slate-400">
            {entry.companyPan || 'PAN not entered'} &nbsp;·&nbsp;
            <span className={`font-semibold ${entry.isListed ? 'text-emerald-600' : 'text-amber-600'}`}>
              {entry.isListed ? 'Listed' : 'Unlisted'}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button type="button" onClick={() => setExpanded(v => !v)}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 transition-colors">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button type="button" onClick={() => onRemove(idx)}
            className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="p-5 space-y-5">
          {/* Basic Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input type="text" value={entry.companyName} onChange={(e) => set('companyName')(e.target.value)}
                placeholder="Full legal name of company"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                Company PAN <span className="text-red-500">*</span>
              </label>
              <input type="text" value={entry.companyPan}
                onChange={(e) => set('companyPan')(e.target.value.toUpperCase())}
                maxLength={10} placeholder="AABCD1234E"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm uppercase placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5">Company Type</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Domestic', 'Foreign'] as const).map((t) => (
                  <button key={t} type="button" onClick={() => set('companyType')(t)}
                    className={`py-2.5 rounded-xl text-xs font-bold border-2 transition-all
                      ${entry.companyType === t ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:border-indigo-300'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5">DIN (Director Identification No.)</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" value={entry.din} onChange={(e) => set('din')(e.target.value)}
                  placeholder="12345678"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
            </div>
          </div>

          {/* Listed / Unlisted */}
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-2">
              Share Listing Status <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: true,  label: 'Listed',   sub: 'Traded on stock exchange — share details required', color: 'emerald' },
                { val: false, label: 'Unlisted',  sub: 'Not on stock exchange', color: 'amber' },
              ].map(({ val, label, sub, color }) => (
                <button key={label} type="button" onClick={() => set('isListed')(val)}
                  className={`flex flex-col gap-1 px-4 py-3.5 rounded-xl border-2 text-left transition-all
                    ${entry.isListed === val
                      ? color === 'emerald' ? 'border-emerald-500 bg-emerald-50' : 'border-amber-500 bg-amber-50'
                      : 'border-slate-200 hover:border-slate-300'}`}>
                  <span className={`text-sm font-bold ${entry.isListed === val
                    ? color === 'emerald' ? 'text-emerald-700' : 'text-amber-700'
                    : 'text-slate-600'}`}>{label}</span>
                  <span className="text-[11px] text-slate-400 leading-tight">{sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ─── FIX: Show Schedule AL form ONLY when isListed is TRUE (Listed) ─── */}
          {entry.isListed && (
            <div className="border border-emerald-200 rounded-2xl overflow-hidden">
              <div className="px-5 py-3.5 bg-emerald-50 border-b border-emerald-200 flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <Building2 className="w-3 h-3 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-800">Listed Share Details (Schedule AL)</p>
                  <p className="text-[11px] text-emerald-600">Mandatory for listed company shareholdings</p>
                </div>
              </div>
              <div className="p-5 space-y-5 bg-emerald-50/20">

                {/* A: Opening */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] flex items-center justify-center font-bold">A</span>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Opening Balance</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <NumInput label="No. of Shares (Col 4)" value={entry.openingNoOfShares} onChange={set('openingNoOfShares')} placeholder="e.g. 7000" />
                    <NumInput label="Cost of Acquisition ₹ (Col 5)" value={entry.openingCostOfAcquisition} onChange={set('openingCostOfAcquisition')} placeholder="e.g. 70000" />
                  </div>
                </div>

                {/* B: Acquired */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] flex items-center justify-center font-bold">B</span>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Shares Acquired During the Year</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <NumInput label="No. of Shares (Col 6)" value={entry.acquiredNoOfShares} onChange={set('acquiredNoOfShares')} placeholder="e.g. 500" />
                    <NumInput label="Date of Purchase (Col 7)" value={entry.acquiredDate} onChange={set('acquiredDate')} isDate />
                    <NumInput label="Face Value per Share ₹ (Col 8)" value={entry.acquiredFaceValue} onChange={set('acquiredFaceValue')} placeholder="e.g. 10" />
                    <NumInput label="Issue Price per Share ₹ (Col 9)" value={entry.acquiredIssuePrice} onChange={set('acquiredIssuePrice')} placeholder="e.g. 100" />
                    <NumInput label="Purchase Price per Share ₹ (Col 10)" value={entry.acquiredPurchasePrice} onChange={set('acquiredPurchasePrice')} placeholder="e.g. 0" />
                  </div>
                </div>

                {/* C: Transferred */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] flex items-center justify-center font-bold">C</span>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Shares Transferred</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <NumInput label="No. of Shares Transferred (Col 11)" value={entry.transferredNoOfShares} onChange={set('transferredNoOfShares')} placeholder="e.g. 0" />
                    <NumInput label="Sale Consideration ₹ (Col 12)" value={entry.transferredSaleConsideration} onChange={set('transferredSaleConsideration')} placeholder="e.g. 0" />
                  </div>
                </div>

                {/* D: Closing */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] flex items-center justify-center font-bold">D</span>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Closing Balance</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <NumInput label="No. of Shares (Col 13)" value={entry.closingNoOfShares} onChange={set('closingNoOfShares')} placeholder="e.g. 7000" />
                    <NumInput label="Cost of Acquisition ₹ (Col 14)" value={entry.closingCostOfAcquisition} onChange={set('closingCostOfAcquisition')} placeholder="e.g. 70000" />
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Progress Steps ───────────────────────────────────────────────────────────
const STEPS = ['Contact', 'KYC Docs', 'Directorships', 'Submit'];
const ProgressBar: React.FC<{ active: number }> = ({ active }) => (
  <div className="flex items-center gap-0">
    {STEPS.map((label, i) => (
      <React.Fragment key={label}>
        <div className="flex flex-col items-center gap-1">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
            ${i <= active ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200' : 'bg-slate-200 text-slate-400'}`}>
            {i < active ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
          </div>
          <span className={`text-[10px] font-semibold hidden sm:block ${i <= active ? 'text-indigo-600' : 'text-slate-400'}`}>{label}</span>
        </div>
        {i < STEPS.length - 1 && (
          <div className={`h-0.5 flex-1 mx-1 mb-4 rounded-full transition-all ${i < active ? 'bg-indigo-500' : 'bg-slate-200'}`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export const ItrStandardFormPage: React.FC = () => {
  const { orderItemId } = useParams<{ orderItemId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [orderItem, setOrderItem] = useState<OrderItem | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [mobileNo, setMobileNo] = useState('');
  const [emailId, setEmailId] = useState('');
  const [otherNotes, setOtherNotes] = useState('');

  const [aadhaarFront, setAadhaarFront] = useState<UploadFile>({ file: null, preview: null });
  const [aadhaarBack, setAadhaarBack] = useState<UploadFile>({ file: null, preview: null });
  const [panFront, setPanFront] = useState<UploadFile>({ file: null, preview: null });
  const [panBack, setPanBack] = useState<UploadFile>({ file: null, preview: null });

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [directorships, setDirectorships] = useState<DirectorshipEntry[]>([]);
  const attachInputRef = useRef<HTMLInputElement>(null);

  // Derive active step for progress bar
  const activeStep = (() => {
    if (!mobileNo || !emailId) return 0;
    if (!aadhaarFront.file || !aadhaarBack.file || !panFront.file || !panBack.file) return 1;
    return 2;
  })();

  useEffect(() => {
    if (user) {
      if ((user as any).phone) setMobileNo((user as any).phone.replace(/\D/g, '').slice(-10));
      if (user.email) setEmailId(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (!orderItemId) return;
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        const res = await fetch(`${API}/orders/items/${orderItemId}`, { headers, credentials: 'include' });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setOrderItem(data.orderItem);
      } catch { toast.error('Could not load order details.'); }
      finally { setLoadingOrder(false); }
    })();
  }, [orderItemId]);

  const updateDirectorship = (idx: number, field: keyof DirectorshipEntry, value: any) =>
    setDirectorships(prev => prev.map((d, i) => i === idx ? { ...d, [field]: value } : d));

  const addAttachment = (file: File) => {
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      toast.error('Only JPG, PNG, or PDF allowed'); return;
    }
    if (file.size > 5 * 1024 * 1024) { toast.error('Max 5 MB per attachment'); return; }
    setAttachments(prev => [...prev, { file, remark: '' }]);
  };

  const validate = (): string | null => {
    if (!/^[6-9]\d{9}$/.test(mobileNo)) return 'Enter a valid 10-digit mobile number';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId)) return 'Enter a valid email address';
    if (!aadhaarFront.file) return 'Aadhaar Front is required';
    if (!aadhaarBack.file) return 'Aadhaar Back is required';
    if (!panFront.file) return 'PAN Card Front is required';
    if (!panBack.file) return 'PAN Card Back is required';
    for (let i = 0; i < directorships.length; i++) {
      const d = directorships[i];
      if (!d.companyName.trim()) return `Company ${i + 1}: Name is required`;
      if (!d.companyPan.trim()) return `Company ${i + 1}: PAN is required`;
      // Validate share details only when listed
      if (d.isListed && !d.openingNoOfShares && !d.closingNoOfShares)
        return `Company ${i + 1} (Listed): Enter opening or closing share balance`;
    }
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) { toast.error(err); return; }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('orderItemId', orderItemId!);
      fd.append('mobileNo', mobileNo);
      fd.append('emailId', emailId);
      if (otherNotes.trim()) fd.append('otherNotes', otherNotes.trim());
      fd.append('aadhaarFront', aadhaarFront.file!);
      fd.append('aadhaarBack', aadhaarBack.file!);
      fd.append('panFront', panFront.file!);
      fd.append('panBack', panBack.file!);

      if (directorships.length > 0) {
        fd.append('directorships', JSON.stringify(directorships.map(d => ({
          companyName: d.companyName, companyPan: d.companyPan,
          companyType: d.companyType || null, isListed: d.isListed, din: d.din || null,
          openingNoOfShares: d.openingNoOfShares ? Number(d.openingNoOfShares) : null,
          openingCostOfAcquisition: d.openingCostOfAcquisition ? Number(d.openingCostOfAcquisition) : null,
          acquiredNoOfShares: d.acquiredNoOfShares ? Number(d.acquiredNoOfShares) : null,
          acquiredDate: d.acquiredDate || null,
          acquiredFaceValue: d.acquiredFaceValue ? Number(d.acquiredFaceValue) : null,
          acquiredIssuePrice: d.acquiredIssuePrice ? Number(d.acquiredIssuePrice) : null,
          acquiredPurchasePrice: d.acquiredPurchasePrice ? Number(d.acquiredPurchasePrice) : null,
          transferredNoOfShares: d.transferredNoOfShares ? Number(d.transferredNoOfShares) : null,
          transferredSaleConsideration: d.transferredSaleConsideration ? Number(d.transferredSaleConsideration) : null,
          closingNoOfShares: d.closingNoOfShares ? Number(d.closingNoOfShares) : null,
          closingCostOfAcquisition: d.closingCostOfAcquisition ? Number(d.closingCostOfAcquisition) : null,
        }))));
      }

      const remarks: string[] = [];
      attachments.forEach(a => { fd.append('attachments', a.file); remarks.push(a.remark || ''); });
      if (remarks.length) fd.append('attachmentRemarks', JSON.stringify(remarks));

      const token = localStorage.getItem('token');
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${API}/itr/standard`, { method: 'POST', headers, credentials: 'include', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setSubmitted(true);
      toast.success('Details submitted successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong.');
    } finally { setSubmitting(false); }
  };

  // ── Success ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold uppercase tracking-wider border border-indigo-200 mb-4">
            <Zap className="w-3 h-3" /> Standard Plan
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Submitted Successfully!</h2>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">
            Your ITR Standard details have been received. Our CA team will review your information and reach out within 1–2 business days.
          </p>
          <button onClick={() => navigate('/dashboard', { state: { triggerPaymentForOrder: orderItem?.orderId } })}
            className="w-full py-3.5 rounded-2xl font-bold text-sm text-white shadow-lg transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#4F46E5,#4338CA)', boxShadow: '0 4px 20px rgba(79,70,229,0.3)' }}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (loadingOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  const planPrice = orderItem?.price ? `₹${Number(orderItem.price).toLocaleString('en-IN')}` : '';
  const listedCount = directorships.filter(d => d.isListed).length;

  return (
    <div className="min-h-screen bg-[#F7F8FC]">

      {/* ── Top Bar ── */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center shrink-0 shadow-sm">
              <Zap className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">
                {orderItem?.serviceName || 'Income Tax Return'}
              </p>
              <p className="text-[11px] text-slate-400">
                {orderItem?.orderNumber && <span>{orderItem.orderNumber} &nbsp;·&nbsp;</span>}
                {planPrice && <span>{planPrice} &nbsp;·&nbsp;</span>}
                Standard Plan
              </p>
            </div>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
            <Zap className="w-3 h-3" /> Standard
          </span>
        </div>
      </div>

      {/* ── Progress ── */}
      <div className="max-w-3xl mx-auto px-4 pt-5 pb-2">
        <ProgressBar active={activeStep} />
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-10 pt-3 space-y-4">

        {/* ── 1. Contact Information ── */}
        <SectionCard
          step={1}
          icon={<Phone className="w-4 h-4 text-slate-500" />}
          title="Contact Information"
          subtitle="We'll use this to send updates about your filing"
        >
          <div className="p-5 grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold select-none">+91</span>
                <input type="tel" value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="98XXXXXXXX" maxLength={10}
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50 focus:bg-white transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50 focus:bg-white transition-colors" />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ── 2. Aadhaar Card ── */}
        <SectionCard
          step={2}
          icon={<ImageIcon className="w-4 h-4 text-orange-500" />}
          title="Aadhaar Card"
          subtitle="Upload front & back — must be clearly legible"
        >
          <div className="p-5 grid sm:grid-cols-2 gap-5">
            <FileUploadZone label="Front Side" sub="Photo, name & Aadhaar number" value={aadhaarFront} onChange={setAadhaarFront} />
            <FileUploadZone label="Back Side" sub="Address & barcode side" value={aadhaarBack} onChange={setAadhaarBack} />
          </div>
        </SectionCard>

        {/* ── 3. PAN Card ── */}
        <SectionCard
          step={3}
          icon={<ImageIcon className="w-4 h-4 text-emerald-500" />}
          title="PAN Card"
          subtitle="Upload front & back of your PAN card"
        >
          <div className="p-5 grid sm:grid-cols-2 gap-5">
            <FileUploadZone label="Front Side" sub="Name, DOB & PAN number" value={panFront} onChange={setPanFront} />
            <FileUploadZone label="Back Side" sub="Back of the PAN card" value={panBack} onChange={setPanBack} />
          </div>
        </SectionCard>

        {/* ── 4. Attachments ── */}
        <SectionCard
          step={4}
          icon={<Paperclip className="w-4 h-4 text-teal-500" />}
          title="Supporting Documents"
          subtitle="Form 16, salary slips, investment proofs — optional"
          action={attachments.length < 10 ? (
            <button type="button" onClick={() => attachInputRef.current?.click()}
              className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors border border-teal-200">
              <Plus className="w-3.5 h-3.5" /> Add File
            </button>
          ) : undefined}
        >
          <input ref={attachInputRef} type="file" accept="image/jpeg,image/png,application/pdf" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) addAttachment(f); e.target.value = ''; }} />
          <div className="p-5">
            {attachments.length === 0 ? (
              <button type="button" onClick={() => attachInputRef.current?.click()}
                className="w-full flex flex-col items-center gap-2 py-8 rounded-xl border-2 border-dashed border-slate-200 hover:border-teal-300 hover:bg-teal-50/30 transition-all text-slate-400 hover:text-teal-600">
                <Paperclip className="w-6 h-6" />
                <span className="text-xs font-semibold">Click to attach documents</span>
                <span className="text-[11px] text-slate-400">Form 16, bank statements, investment proofs, etc.</span>
              </button>
            ) : (
              <div className="space-y-2.5">
                {attachments.map((att, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                      {att.file.type.startsWith('image/')
                        ? <ImageIcon className="w-4 h-4 text-slate-500" />
                        : <FileText className="w-4 h-4 text-slate-500" />}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <p className="text-xs font-semibold text-slate-700 truncate">{att.file.name}</p>
                      <input type="text" value={att.remark}
                        onChange={(e) => setAttachments(prev => prev.map((a, i) => i === idx ? { ...a, remark: e.target.value } : a))}
                        placeholder="Remark (e.g. Form 16 - Employer 1)"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-slate-400 bg-white" />
                    </div>
                    <button type="button" onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors shrink-0">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {attachments.length < 10 && (
                  <button type="button" onClick={() => attachInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-teal-400 text-slate-400 hover:text-teal-600 text-xs font-medium transition-all">
                    <Plus className="w-3.5 h-3.5" /> Add another file
                  </button>
                )}
              </div>
            )}
          </div>
        </SectionCard>

        {/* ── 5. Directorships ── */}
        <SectionCard
          step={5}
          icon={<Building2 className="w-4 h-4 text-indigo-500" />}
          title="Directorship / Listed Shares"
          subtitle={`Add companies where you hold directorship or listed shares${listedCount > 0 ? ` · ${listedCount} listed` : ''}`}
          badge={directorships.length > 0 ? (
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[11px] rounded-full font-bold">
              {directorships.length}
            </span>
          ) : undefined}
          action={
            <button type="button" onClick={() => setDirectorships(prev => [...prev, emptyDirectorship()])}
              className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors border border-indigo-200">
              <Plus className="w-3.5 h-3.5" /> Add Company
            </button>
          }
        >
          <div className="p-5">
            {directorships.length === 0 ? (
              <button type="button" onClick={() => setDirectorships([emptyDirectorship()])}
                className="w-full flex flex-col items-center gap-2 py-10 rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 transition-all text-slate-400 hover:text-indigo-600">
                <Building2 className="w-7 h-7" />
                <span className="text-sm font-semibold">Add Directorship or Listed Company</span>
                <span className="text-xs text-slate-400 max-w-xs text-center leading-relaxed">
                  Skip if you have no directorship or listed shareholding
                </span>
              </button>
            ) : (
              <div className="space-y-4">
                {directorships.map((entry, idx) => (
                  <DirectorshipCard
                    key={idx} idx={idx} entry={entry}
                    onChange={updateDirectorship}
                    onRemove={(i) => setDirectorships(prev => prev.filter((_, j) => j !== i))}
                  />
                ))}
                <button type="button" onClick={() => setDirectorships(prev => [...prev, emptyDirectorship()])}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-slate-300 hover:border-indigo-400 text-slate-400 hover:text-indigo-600 text-xs font-semibold transition-all">
                  <Plus className="w-3.5 h-3.5" /> Add Another Company
                </button>
              </div>
            )}
          </div>
        </SectionCard>

        {/* ── 6. Other Notes ── */}
        <SectionCard
          step={6}
          icon={<StickyNote className="w-4 h-4 text-amber-500" />}
          title="Additional Notes"
          subtitle="Optional — share any extra information with our CA team"
        >
          <div className="p-5">
            <textarea value={otherNotes} onChange={(e) => setOtherNotes(e.target.value)} rows={3}
              placeholder="e.g. I have salary from 2 employers, rental income, or capital gains — mention anything relevant…"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none leading-relaxed bg-slate-50/50 focus:bg-white transition-colors" />
          </div>
        </SectionCard>

        {/* ── Compliance Notice ── */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            Ensure all documents are <strong>clear and legible</strong>. For listed companies, share balance details (Schedule AL) are mandatory as per Income Tax Act. All files are encrypted and stored securely.
          </p>
        </div>

        {/* ── Submit ── */}
        <button type="button" onClick={handleSubmit} disabled={submitting}
          className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-base text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg,#4F46E5,#4338CA)', boxShadow: '0 4px 24px rgba(79,70,229,0.35)' }}>
          {submitting
            ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting…</>
            : <><CheckCircle2 className="w-5 h-5" /> Submit ITR Standard Details</>}
        </button>

      </div>
    </div>
  );
};