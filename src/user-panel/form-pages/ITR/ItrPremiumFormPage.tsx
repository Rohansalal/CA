// // import React, { useState, useEffect, useRef } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import {
// //   ArrowLeft, Upload, X, Plus, FileText, Image as ImageIcon,
// //   CheckCircle2, Loader2, AlertCircle, Crown, Globe,
// //   Phone, Mail, StickyNote, Paperclip,
// //   Building2, Hash, ChevronDown, ChevronUp, Trash2,
// //   Edit2, Check, DollarSign,
// // } from 'lucide-react';
// // import { toast } from 'sonner';
// // import { useAuth } from '../contexts/AuthContext';

// // const API = import.meta.env.VITE_API_BASE_URL || '/api';

// // // ─── Types ────────────────────────────────────────────────────────────────────
// // interface OrderItem {
// //   id: number; orderId: number; serviceName: string;
// //   planType: string; price: number; orderNumber: string; orderStatus: string;
// // }
// // interface UploadFile { file: File | null; preview: string | null; }
// // interface Attachment { file: File; remark: string; }

// // interface DirectorshipEntry {
// //   companyName: string; companyPan: string;
// //   companyType: 'Domestic' | 'Foreign' | '';
// //   isListed: boolean; din: string;
// //   openingNoOfShares: string; openingCostOfAcquisition: string;
// //   acquiredNoOfShares: string; acquiredDate: string;
// //   acquiredFaceValue: string; acquiredIssuePrice: string;
// //   acquiredPurchasePrice: string; transferredNoOfShares: string;
// //   transferredSaleConsideration: string; closingNoOfShares: string;
// //   closingCostOfAcquisition: string;
// // }

// // interface ForeignAsset {
// //   assetType: string; countryName: string;
// //   incomeSource: string; amount: string; remark: string;
// // }

// // const emptyDirectorship = (): DirectorshipEntry => ({
// //   companyName: '', companyPan: '', companyType: '', isListed: true, din: '',
// //   openingNoOfShares: '', openingCostOfAcquisition: '',
// //   acquiredNoOfShares: '', acquiredDate: '', acquiredFaceValue: '',
// //   acquiredIssuePrice: '', acquiredPurchasePrice: '',
// //   transferredNoOfShares: '', transferredSaleConsideration: '',
// //   closingNoOfShares: '', closingCostOfAcquisition: '',
// // });

// // const emptyForeignAsset = (): ForeignAsset => ({
// //   assetType: 'Foreign Asset', countryName: '', incomeSource: '', amount: '', remark: '',
// // });

// // // ─── Step Badge ───────────────────────────────────────────────────────────────
// // const StepBadge: React.FC<{ n: number; isPremium: boolean }> = ({ n, isPremium }) => (
// //   <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm
// //     ${isPremium ? 'bg-purple-600' : 'bg-emerald-600'}`}>
// //     <span className="text-xs font-bold text-white">{n}</span>
// //   </div>
// // );

// // // ─── File Upload Zone ─────────────────────────────────────────────────────────
// // const FileUploadZone: React.FC<{
// //   label: string; sub: string; value: UploadFile;
// //   onChange: (v: UploadFile) => void; accentColor: string;
// // }> = ({ label, sub, value, onChange, accentColor }) => {
// //   const inputRef = useRef<HTMLInputElement>(null);
// //   const [dragging, setDragging] = useState(false);

// //   const handleFile = (file: File) => {
// //     if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
// //       toast.error('Only JPG, PNG, or PDF allowed'); return;
// //     }
// //     if (file.size > 2 * 1024 * 1024) { toast.error('Max 2 MB'); return; }
// //     onChange({ file, preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null });
// //   };

// //   return (
// //     <div className="flex flex-col gap-1.5">
// //       <label className="text-xs font-semibold text-slate-700">
// //         {label} <span className="text-red-500">*</span>
// //       </label>
// //       <p className="text-[11px] text-slate-400 -mt-1">{sub}</p>
// //       {value.file ? (
// //         <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
// //           <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white border border-emerald-200 flex items-center justify-center">
// //             {value.preview
// //               ? <img src={value.preview} alt="" className="w-full h-full object-cover" />
// //               : <FileText className="w-5 h-5 text-emerald-600" />}
// //           </div>
// //           <div className="flex-1 min-w-0">
// //             <p className="text-xs font-semibold text-emerald-800 truncate">{value.file.name}</p>
// //             <p className="text-[11px] text-emerald-500">
// //               {(value.file.size / 1024).toFixed(0)} KB · {value.file.type === 'application/pdf' ? 'PDF' : 'Image'}
// //             </p>
// //           </div>
// //           <button type="button" onClick={() => onChange({ file: null, preview: null })}
// //             className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-500 transition-colors">
// //             <X className="w-4 h-4" />
// //           </button>
// //         </div>
// //       ) : (
// //         <div
// //           onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
// //           onDragLeave={() => setDragging(false)}
// //           onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
// //           onClick={() => inputRef.current?.click()}
// //           className={`cursor-pointer flex flex-col items-center gap-2 py-7 px-4 rounded-xl border-2 border-dashed transition-all
// //             ${dragging
// //               ? `border-${accentColor}-400 bg-${accentColor}-50`
// //               : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50'}`}
// //         >
// //           <div className="w-9 h-9 bg-white rounded-full border border-slate-200 flex items-center justify-center shadow-sm">
// //             <Upload className="w-4 h-4 text-slate-400" />
// //           </div>
// //           <p className="text-xs text-slate-500 text-center">
// //             <span className={`font-semibold text-${accentColor}-600`}>Click to upload</span> or drag & drop
// //           </p>
// //           <p className="text-[11px] text-slate-400">JPG, PNG, PDF · Max 2 MB</p>
// //         </div>
// //       )}
// //       <input ref={inputRef} type="file" accept="image/jpeg,image/png,application/pdf" className="hidden"
// //         onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} />
// //     </div>
// //   );
// // };

// // // ─── Number Input ─────────────────────────────────────────────────────────────
// // const NumInput: React.FC<{
// //   label: string; value: string; onChange: (v: string) => void;
// //   placeholder?: string; isDate?: boolean;
// // }> = ({ label, value, onChange, placeholder, isDate }) => (
// //   <div>
// //     <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">{label}</label>
// //     <input
// //       type={isDate ? 'date' : 'text'}
// //       value={value}
// //       onChange={(e) => onChange(e.target.value)}
// //       placeholder={placeholder || '0'}
// //       className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder-slate-300 bg-white"
// //     />
// //   </div>
// // );

// // // ─── Section Card ─────────────────────────────────────────────────────────────
// // const SectionCard: React.FC<{
// //   step: number; icon: React.ReactNode; title: string; subtitle?: string;
// //   badge?: React.ReactNode; action?: React.ReactNode;
// //   children: React.ReactNode; isPremium: boolean;
// // }> = ({ step, icon, title, subtitle, badge, action, children, isPremium }) => (
// //   <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
// //     <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
// //       <StepBadge n={step} isPremium={isPremium} />
// //       <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
// //         {icon}
// //       </div>
// //       <div className="flex-1 min-w-0">
// //         <h2 className="text-sm font-bold text-slate-800">
// //           {title}{badge && <span className="ml-2">{badge}</span>}
// //         </h2>
// //         {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
// //       </div>
// //       {action}
// //     </div>
// //     {children}
// //   </div>
// // );

// // // ─── Directorship Card ────────────────────────────────────────────────────────
// // const DirectorshipCard: React.FC<{
// //   idx: number; entry: DirectorshipEntry;
// //   onChange: (idx: number, field: keyof DirectorshipEntry, value: any) => void;
// //   onRemove: (idx: number) => void;
// // }> = ({ idx, entry, onChange, onRemove }) => {
// //   const [expanded, setExpanded] = useState(true);
// //   const set = (field: keyof DirectorshipEntry) => (value: any) => onChange(idx, field, value);

// //   return (
// //     <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
// //       <div className="flex items-center gap-3 px-4 py-3.5 bg-slate-50 border-b border-slate-100">
// //         <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center shrink-0">
// //           <Building2 className="w-3.5 h-3.5 text-white" />
// //         </div>
// //         <div className="flex-1 min-w-0">
// //           <p className="text-sm font-bold text-slate-800 truncate">{entry.companyName || `Company ${idx + 1}`}</p>
// //           <p className="text-[11px] text-slate-400">
// //             {entry.companyPan || 'PAN not entered'} &nbsp;·&nbsp;
// //             <span className={`font-semibold ${entry.isListed ? 'text-emerald-600' : 'text-amber-600'}`}>
// //               {entry.isListed ? 'Listed' : 'Unlisted'}
// //             </span>
// //           </p>
// //         </div>
// //         <div className="flex items-center gap-1.5 shrink-0">
// //           <button type="button" onClick={() => setExpanded(v => !v)}
// //             className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 transition-colors">
// //             {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
// //           </button>
// //           <button type="button" onClick={() => onRemove(idx)}
// //             className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
// //             <Trash2 className="w-4 h-4" />
// //           </button>
// //         </div>
// //       </div>

// //       {expanded && (
// //         <div className="p-5 space-y-5">
// //           <div className="grid sm:grid-cols-2 gap-4">
// //             <div>
// //               <label className="text-xs font-semibold text-slate-600 block mb-1.5">Company Name <span className="text-red-500">*</span></label>
// //               <input type="text" value={entry.companyName} onChange={(e) => set('companyName')(e.target.value)}
// //                 placeholder="Full legal name"
// //                 className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
// //             </div>
// //             <div>
// //               <label className="text-xs font-semibold text-slate-600 block mb-1.5">Company PAN <span className="text-red-500">*</span></label>
// //               <input type="text" value={entry.companyPan}
// //                 onChange={(e) => set('companyPan')(e.target.value.toUpperCase())} maxLength={10} placeholder="AABCD1234E"
// //                 className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm uppercase placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
// //             </div>
// //             <div>
// //               <label className="text-xs font-semibold text-slate-600 block mb-1.5">Company Type</label>
// //               <div className="grid grid-cols-2 gap-2">
// //                 {(['Domestic', 'Foreign'] as const).map((t) => (
// //                   <button key={t} type="button" onClick={() => set('companyType')(t)}
// //                     className={`py-2.5 rounded-xl text-xs font-bold border-2 transition-all
// //                       ${entry.companyType === t ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-200 text-slate-500 hover:border-purple-300'}`}>
// //                     {t}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //             <div>
// //               <label className="text-xs font-semibold text-slate-600 block mb-1.5">DIN</label>
// //               <div className="relative">
// //                 <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
// //                 <input type="text" value={entry.din} onChange={(e) => set('din')(e.target.value)} placeholder="12345678"
// //                   className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
// //               </div>
// //             </div>
// //           </div>

// //           <div>
// //             <label className="text-xs font-semibold text-slate-600 block mb-2">Share Listing Status <span className="text-red-500">*</span></label>
// //             <div className="grid grid-cols-2 gap-3">
// //               {[{ val: true, label: 'Listed', sub: 'Traded on stock exchange', color: 'emerald' },
// //                 { val: false, label: 'Unlisted', sub: 'Not on exchange — share details required', color: 'amber' }]
// //                 .map(({ val, label, sub, color }) => (
// //                   <button key={label} type="button" onClick={() => set('isListed')(val)}
// //                     className={`flex flex-col gap-1 px-4 py-3.5 rounded-xl border-2 text-left transition-all
// //                       ${entry.isListed === val
// //                         ? color === 'emerald' ? 'border-emerald-500 bg-emerald-50' : 'border-amber-500 bg-amber-50'
// //                         : 'border-slate-200 hover:border-slate-300'}`}>
// //                     <span className={`text-sm font-bold ${entry.isListed === val
// //                       ? color === 'emerald' ? 'text-emerald-700' : 'text-amber-700' : 'text-slate-600'}`}>{label}</span>
// //                     <span className="text-[11px] text-slate-400 leading-tight">{sub}</span>
// //                   </button>
// //                 ))}
// //             </div>
// //           </div>

// //           {!entry.isListed && (
// //             <div className="border border-amber-200 rounded-2xl overflow-hidden">
// //               <div className="px-5 py-3.5 bg-amber-50 border-b border-amber-200 flex items-center gap-2.5">
// //                 <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center">
// //                   <Building2 className="w-3 h-3 text-white" />
// //                 </div>
// //                 <div>
// //                   <p className="text-xs font-bold text-amber-800">Unlisted Share Details (Schedule AL)</p>
// //                   <p className="text-[11px] text-amber-600">Mandatory for unlisted shareholdings</p>
// //                 </div>
// //               </div>
// //               <div className="p-5 space-y-5 bg-amber-50/20">
// //                 <div>
// //                   <div className="flex items-center gap-2 mb-3">
// //                     <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center font-bold">A</span>
// //                     <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Opening Balance</span>
// //                   </div>
// //                   <div className="grid grid-cols-2 gap-3">
// //                     <NumInput label="No. of Shares (Col 4)" value={entry.openingNoOfShares} onChange={set('openingNoOfShares')} placeholder="e.g. 7000" />
// //                     <NumInput label="Cost of Acquisition ₹ (Col 5)" value={entry.openingCostOfAcquisition} onChange={set('openingCostOfAcquisition')} placeholder="e.g. 70000" />
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <div className="flex items-center gap-2 mb-3">
// //                     <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center font-bold">B</span>
// //                     <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Shares Acquired During the Year</span>
// //                   </div>
// //                   <div className="grid grid-cols-2 gap-3">
// //                     <NumInput label="No. of Shares (Col 6)" value={entry.acquiredNoOfShares} onChange={set('acquiredNoOfShares')} placeholder="e.g. 500" />
// //                     <NumInput label="Date of Purchase (Col 7)" value={entry.acquiredDate} onChange={set('acquiredDate')} isDate />
// //                     <NumInput label="Face Value per Share ₹ (Col 8)" value={entry.acquiredFaceValue} onChange={set('acquiredFaceValue')} placeholder="e.g. 10" />
// //                     <NumInput label="Issue Price per Share ₹ (Col 9)" value={entry.acquiredIssuePrice} onChange={set('acquiredIssuePrice')} placeholder="e.g. 100" />
// //                     <NumInput label="Purchase Price per Share ₹ (Col 10)" value={entry.acquiredPurchasePrice} onChange={set('acquiredPurchasePrice')} placeholder="e.g. 0" />
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <div className="flex items-center gap-2 mb-3">
// //                     <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center font-bold">C</span>
// //                     <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Shares Transferred</span>
// //                   </div>
// //                   <div className="grid grid-cols-2 gap-3">
// //                     <NumInput label="No. of Shares Transferred (Col 11)" value={entry.transferredNoOfShares} onChange={set('transferredNoOfShares')} placeholder="e.g. 0" />
// //                     <NumInput label="Sale Consideration ₹ (Col 12)" value={entry.transferredSaleConsideration} onChange={set('transferredSaleConsideration')} placeholder="e.g. 0" />
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <div className="flex items-center gap-2 mb-3">
// //                     <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center font-bold">D</span>
// //                     <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Closing Balance</span>
// //                   </div>
// //                   <div className="grid grid-cols-2 gap-3">
// //                     <NumInput label="No. of Shares (Col 13)" value={entry.closingNoOfShares} onChange={set('closingNoOfShares')} placeholder="e.g. 7000" />
// //                     <NumInput label="Cost of Acquisition ₹ (Col 14)" value={entry.closingCostOfAcquisition} onChange={set('closingCostOfAcquisition')} placeholder="e.g. 70000" />
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // // ─── Foreign Asset Entry Form ─────────────────────────────────────────────────
// // const ForeignAssetForm: React.FC<{
// //   entry: ForeignAsset; onSave: (e: ForeignAsset) => void; onCancel: () => void; isEdit: boolean;
// // }> = ({ entry: initialEntry, onSave, onCancel, isEdit }) => {
// //   const [entry, setEntry] = useState<ForeignAsset>(initialEntry);
// //   const [errors, setErrors] = useState<Record<string, string>>({});
// //   const set = (k: keyof ForeignAsset) => (v: string) => { setEntry(p => ({ ...p, [k]: v })); setErrors(p => { const n = { ...p }; delete n[k]; return n; }); };

// //   const save = () => {
// //     const errs: Record<string, string> = {};
// //     if (!entry.countryName.trim()) errs.countryName = 'Country is required';
// //     if (!entry.incomeSource.trim()) errs.incomeSource = 'Income source is required';
// //     if (Object.keys(errs).length) { setErrors(errs); return; }
// //     onSave(entry);
// //   };

// //   return (
// //     <div className="bg-teal-50/40 rounded-2xl p-5 border border-teal-200 space-y-4">
// //       <div className="flex items-center justify-between">
// //         <p className="text-xs font-bold text-teal-800 uppercase tracking-widest">
// //           {isEdit ? 'Edit Entry' : 'New Foreign Income / Asset'}
// //         </p>
// //         <button type="button" onClick={onCancel} className="p-1.5 rounded-lg hover:bg-teal-100 text-teal-500 transition-colors"><X className="w-4 h-4" /></button>
// //       </div>
// //       <div className="grid sm:grid-cols-2 gap-4">
// //         <div>
// //           <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">Asset / Income Type</label>
// //           <select value={entry.assetType} onChange={(e) => set('assetType')(e.target.value)}
// //             className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-400">
// //             <option>Foreign Asset</option>
// //             <option>Foreign Income</option>
// //             <option>Foreign Bank Account</option>
// //             <option>Foreign Immovable Property</option>
// //             <option>Foreign Stocks / Equity</option>
// //             <option>Other</option>
// //           </select>
// //         </div>
// //         <div>
// //           <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">Country Name <span className="text-red-500">*</span></label>
// //           <input type="text" value={entry.countryName} onChange={(e) => set('countryName')(e.target.value)} placeholder="USA, UK, UAE…"
// //             className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 ${errors.countryName ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`} />
// //           {errors.countryName && <p className="text-[11px] text-red-500 mt-1">{errors.countryName}</p>}
// //         </div>
// //         <div>
// //           <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">Source of Income <span className="text-red-500">*</span></label>
// //           <input type="text" value={entry.incomeSource} onChange={(e) => set('incomeSource')(e.target.value)} placeholder="Salary, Dividends, Rent…"
// //             className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 ${errors.incomeSource ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`} />
// //           {errors.incomeSource && <p className="text-[11px] text-red-500 mt-1">{errors.incomeSource}</p>}
// //         </div>
// //         <div>
// //           <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">Amount (₹ Equivalent)</label>
// //           <div className="relative">
// //             <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
// //             <input type="text" value={entry.amount} onChange={(e) => set('amount')(e.target.value)} placeholder="INR equivalent"
// //               className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-400" />
// //           </div>
// //         </div>
// //         <div className="sm:col-span-2">
// //           <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">Remarks</label>
// //           <textarea value={entry.remark} onChange={(e) => set('remark')(e.target.value)} rows={2}
// //             placeholder="Acquisition date, account details, specific context…"
// //             className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none" />
// //         </div>
// //       </div>
// //       <div className="flex justify-end gap-2.5 pt-1 border-t border-teal-200">
// //         <button type="button" onClick={onCancel}
// //           className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition">Cancel</button>
// //         <button type="button" onClick={save}
// //           className="flex items-center gap-1.5 px-5 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700 transition shadow-sm">
// //           <Check className="w-3.5 h-3.5" /> {isEdit ? 'Update Entry' : 'Add Entry'}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // // ─── Progress Bar ─────────────────────────────────────────────────────────────
// // const STEPS = ['Contact', 'KYC Docs', 'Directorships', 'Foreign', 'Submit'];
// // const ProgressBar: React.FC<{ active: number; isPremium: boolean }> = ({ active, isPremium }) => (
// //   <div className="flex items-center gap-0">
// //     {STEPS.map((label, i) => (
// //       <React.Fragment key={label}>
// //         <div className="flex flex-col items-center gap-1">
// //           <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
// //             ${i <= active
// //               ? isPremium ? 'bg-purple-600 text-white shadow-sm shadow-purple-200' : 'bg-emerald-600 text-white shadow-sm shadow-emerald-200'
// //               : 'bg-slate-200 text-slate-400'}`}>
// //             {i < active ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
// //           </div>
// //           <span className={`text-[10px] font-semibold hidden sm:block ${i <= active
// //             ? isPremium ? 'text-purple-600' : 'text-emerald-600'
// //             : 'text-slate-400'}`}>{label}</span>
// //         </div>
// //         {i < STEPS.length - 1 && (
// //           <div className={`h-0.5 flex-1 mx-1 mb-4 rounded-full transition-all
// //             ${i < active
// //               ? isPremium ? 'bg-purple-500' : 'bg-emerald-500'
// //               : 'bg-slate-200'}`} />
// //         )}
// //       </React.Fragment>
// //     ))}
// //   </div>
// // );

// // // ─── Main Page ────────────────────────────────────────────────────────────────
// // export const ItrPremiumFormPage: React.FC = () => {
// //   const { orderItemId } = useParams<{ orderItemId: string }>();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();

// //   const [orderItem, setOrderItem]       = useState<OrderItem | null>(null);
// //   const [loadingOrder, setLoadingOrder] = useState(true);
// //   const [submitting, setSubmitting]     = useState(false);
// //   const [submitted, setSubmitted]       = useState(false);

// //   const [mobileNo,   setMobileNo]   = useState('');
// //   const [emailId,    setEmailId]    = useState('');
// //   const [otherNotes, setOtherNotes] = useState('');

// //   const [aadhaarFront, setAadhaarFront] = useState<UploadFile>({ file: null, preview: null });
// //   const [aadhaarBack,  setAadhaarBack]  = useState<UploadFile>({ file: null, preview: null });
// //   const [panFront,     setPanFront]     = useState<UploadFile>({ file: null, preview: null });
// //   const [panBack,      setPanBack]      = useState<UploadFile>({ file: null, preview: null });

// //   const [attachments,   setAttachments]   = useState<Attachment[]>([]);
// //   const [directorships, setDirectorships] = useState<DirectorshipEntry[]>([]);
// //   const [foreignAssets, setForeignAssets] = useState<ForeignAsset[]>([]);
// //   const [addingForeign, setAddingForeign] = useState(false);
// //   const [editForeignIdx, setEditForeignIdx] = useState<number | null>(null);
// //   const attachInputRef = useRef<HTMLInputElement>(null);

// //   // Determine plan: Premium or Elite
// //   const planType = (orderItem?.planType || '').toUpperCase();
// //   const isElite = planType.includes('ELITE');
// //   const isPremium = !isElite; // true = purple theme, false = emerald theme
// //   const planLabel = isElite ? 'Elite' : 'Premium';
// //   const apiEndpoint = isElite ? 'elite' : 'premium';
// //   const accentColor = isPremium ? 'purple' : 'emerald';

// //   const activeStep = (() => {
// //     if (!mobileNo || !emailId) return 0;
// //     if (!aadhaarFront.file || !aadhaarBack.file || !panFront.file || !panBack.file) return 1;
// //     if (directorships.length === 0) return 2;
// //     return 3;
// //   })();

// //   useEffect(() => {
// //     if (user) {
// //       if ((user as any).phone) setMobileNo((user as any).phone.replace(/\D/g, '').slice(-10));
// //       if (user.email) setEmailId(user.email);
// //     }
// //   }, [user]);

// //   useEffect(() => {
// //     if (!orderItemId) return;
// //     (async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         const headers: Record<string, string> = {};
// //         if (token) headers['Authorization'] = `Bearer ${token}`;
// //         const res = await fetch(`${API}/orders/items/${orderItemId}`, { headers, credentials: 'include' });
// //         if (!res.ok) throw new Error();
// //         const data = await res.json();
// //         setOrderItem(data.orderItem);
// //       } catch { toast.error('Could not load order details.'); }
// //       finally { setLoadingOrder(false); }
// //     })();
// //   }, [orderItemId]);

// //   const updateDirectorship = (idx: number, field: keyof DirectorshipEntry, value: any) =>
// //     setDirectorships(prev => prev.map((d, i) => i === idx ? { ...d, [field]: value } : d));

// //   const addAttachment = (file: File) => {
// //     if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
// //       toast.error('Only JPG, PNG, or PDF allowed'); return;
// //     }
// //     if (file.size > 5 * 1024 * 1024) { toast.error('Max 5 MB'); return; }
// //     setAttachments(prev => [...prev, { file, remark: '' }]);
// //   };

// //   const validate = (): string | null => {
// //     if (!/^[6-9]\d{9}$/.test(mobileNo)) return 'Enter a valid 10-digit mobile number';
// //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId)) return 'Enter a valid email address';
// //     if (!aadhaarFront.file) return 'Aadhaar Front is required';
// //     if (!aadhaarBack.file)  return 'Aadhaar Back is required';
// //     if (!panFront.file)     return 'PAN Card Front is required';
// //     if (!panBack.file)      return 'PAN Card Back is required';
// //     for (let i = 0; i < directorships.length; i++) {
// //       const d = directorships[i];
// //       if (!d.companyName.trim()) return `Company ${i + 1}: Name is required`;
// //       if (!d.companyPan.trim())  return `Company ${i + 1}: PAN is required`;
// //       if (!d.isListed && !d.openingNoOfShares && !d.closingNoOfShares)
// //         return `Company ${i + 1} (Unlisted): Enter opening or closing share balance`;
// //     }
// //     return null;
// //   };

// //   const handleSubmit = async () => {
// //     const err = validate();
// //     if (err) { toast.error(err); return; }
// //     setSubmitting(true);
// //     try {
// //       const fd = new FormData();
// //       fd.append('orderItemId', orderItemId!);
// //       fd.append('mobileNo', mobileNo);
// //       fd.append('emailId', emailId);
// //       if (otherNotes.trim()) fd.append('otherNotes', otherNotes.trim());
// //       fd.append('aadhaarFront', aadhaarFront.file!);
// //       fd.append('aadhaarBack',  aadhaarBack.file!);
// //       fd.append('panFront',     panFront.file!);
// //       fd.append('panBack',      panBack.file!);

// //       if (directorships.length > 0) {
// //         fd.append('directorships', JSON.stringify(directorships.map(d => ({
// //           companyName: d.companyName, companyPan: d.companyPan,
// //           companyType: d.companyType || null, isListed: d.isListed, din: d.din || null,
// //           openingNoOfShares:         d.openingNoOfShares         ? Number(d.openingNoOfShares)         : null,
// //           openingCostOfAcquisition:  d.openingCostOfAcquisition  ? Number(d.openingCostOfAcquisition)  : null,
// //           acquiredNoOfShares:        d.acquiredNoOfShares        ? Number(d.acquiredNoOfShares)        : null,
// //           acquiredDate:              d.acquiredDate              || null,
// //           acquiredFaceValue:         d.acquiredFaceValue         ? Number(d.acquiredFaceValue)         : null,
// //           acquiredIssuePrice:        d.acquiredIssuePrice        ? Number(d.acquiredIssuePrice)        : null,
// //           acquiredPurchasePrice:     d.acquiredPurchasePrice     ? Number(d.acquiredPurchasePrice)     : null,
// //           transferredNoOfShares:     d.transferredNoOfShares     ? Number(d.transferredNoOfShares)     : null,
// //           transferredSaleConsideration: d.transferredSaleConsideration ? Number(d.transferredSaleConsideration) : null,
// //           closingNoOfShares:         d.closingNoOfShares         ? Number(d.closingNoOfShares)         : null,
// //           closingCostOfAcquisition:  d.closingCostOfAcquisition  ? Number(d.closingCostOfAcquisition)  : null,
// //         }))));
// //       }

// //       if (foreignAssets.length > 0) {
// //         fd.append('foreignAssets', JSON.stringify(foreignAssets.map(a => ({
// //           assetType: a.assetType, countryName: a.countryName,
// //           incomeSource: a.incomeSource,
// //           amount: a.amount ? Number(a.amount) : 0,
// //           remark: a.remark || null,
// //         }))));
// //       }

// //       const remarks: string[] = [];
// //       attachments.forEach(a => { fd.append('attachments', a.file); remarks.push(a.remark || ''); });
// //       if (remarks.length) fd.append('attachmentRemarks', JSON.stringify(remarks));

// //       const token = localStorage.getItem('token');
// //       const headers: Record<string, string> = {};
// //       if (token) headers['Authorization'] = `Bearer ${token}`;
// //       const res = await fetch(`${API}/itr/${apiEndpoint}`, { method: 'POST', headers, credentials: 'include', body: fd });
// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.error || 'Submission failed');
// //       setSubmitted(true);
// //       toast.success('Details submitted successfully!');
// //     } catch (err: any) {
// //       toast.error(err.message || 'Something went wrong.');
// //     } finally { setSubmitting(false); }
// //   };

// //   // ── Success ──
// //   if (submitted) {
// //     const gradFrom = isPremium ? '#7C3AED' : '#059669';
// //     const gradTo   = isPremium ? '#6D28D9' : '#047857';
// //     return (
// //       <div className="min-h-screen bg-[#F7F8FC] flex items-center justify-center p-4">
// //         <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 max-w-md w-full text-center">
// //           <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm
// //             ${isPremium ? 'bg-purple-100' : 'bg-emerald-100'}`}>
// //             <CheckCircle2 className={`w-10 h-10 ${isPremium ? 'text-purple-600' : 'text-emerald-600'}`} />
// //           </div>
// //           <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border mb-4
// //             ${isPremium ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
// //             <Crown className="w-3 h-3" /> {planLabel} Plan
// //           </div>
// //           <h2 className="text-xl font-bold text-slate-900 mb-2">Submitted Successfully!</h2>
// //           <p className="text-sm text-slate-500 mb-8 leading-relaxed">
// //             Your ITR {planLabel} details have been received. Our CA team will review and reach out within 1–2 business days.
// //           </p>
// //           <button onClick={() => navigate('/dashboard')}
// //             className="w-full py-3.5 rounded-2xl font-bold text-sm text-white shadow-lg hover:opacity-90 transition-opacity"
// //             style={{ background: `linear-gradient(135deg,${gradFrom},${gradTo})` }}>
// //             Back to Dashboard
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (loadingOrder) {
// //     return (
// //       <div className={`min-h-screen bg-[#F7F8FC] flex items-center justify-center`}>
// //         <Loader2 className={`w-8 h-8 animate-spin ${isPremium ? 'text-purple-600' : 'text-emerald-600'}`} />
// //       </div>
// //     );
// //   }

// //   const planPrice = orderItem?.price ? `₹${Number(orderItem.price).toLocaleString('en-IN')}` : '';
// //   const unlistedCount = directorships.filter(d => !d.isListed).length;
// //   const gradFrom = isPremium ? '#7C3AED' : '#059669';
// //   const gradTo   = isPremium ? '#6D28D9' : '#047857';

// //   return (
// //     <div className="min-h-screen bg-[#F7F8FC]">

// //       {/* ── Top Bar ── */}
// //       <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-200">
// //         <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
// //           <button onClick={() => navigate('/dashboard')}
// //             className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
// //             <ArrowLeft className="w-4 h-4" />
// //           </button>
// //           <div className="flex items-center gap-3 flex-1 min-w-0">
// //             <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
// //               style={{ background: `linear-gradient(135deg,${gradFrom},${gradTo})` }}>
// //               <Crown className="w-4 h-4 text-white" />
// //             </div>
// //             <div className="min-w-0">
// //               <p className="text-sm font-bold text-slate-900 truncate">
// //                 {orderItem?.serviceName || 'Income Tax Return'}
// //               </p>
// //               <p className="text-[11px] text-slate-400">
// //                 {orderItem?.orderNumber && <span>{orderItem.orderNumber} &nbsp;·&nbsp;</span>}
// //                 {planPrice && <span>{planPrice} &nbsp;·&nbsp;</span>}
// //                 {planLabel} Plan
// //               </p>
// //             </div>
// //           </div>
// //           <span className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-[11px] font-bold uppercase tracking-wider shadow-sm`}
// //             style={{ background: `linear-gradient(135deg,${gradFrom},${gradTo})` }}>
// //             <Crown className="w-3 h-3" /> {planLabel}
// //           </span>
// //         </div>
// //       </div>

// //       {/* ── Progress ── */}
// //       <div className="max-w-3xl mx-auto px-4 pt-5 pb-2">
// //         <ProgressBar active={activeStep} isPremium={isPremium} />
// //       </div>

// //       <div className="max-w-3xl mx-auto px-4 pb-10 pt-3 space-y-4">

// //         {/* ── 1. Contact ── */}
// //         <SectionCard step={1} icon={<Phone className="w-4 h-4 text-slate-500" />}
// //           title="Contact Information" subtitle="We'll send updates about your filing to these details"
// //           isPremium={isPremium}>
// //           <div className="p-5 grid sm:grid-cols-2 gap-4">
// //             <div>
// //               <label className="text-xs font-semibold text-slate-600 block mb-1.5">
// //                 Mobile Number <span className="text-red-500">*</span>
// //               </label>
// //               <div className="relative">
// //                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold select-none">+91</span>
// //                 <input type="tel" value={mobileNo}
// //                   onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, '').slice(0, 10))}
// //                   placeholder="98XXXXXXXX" maxLength={10}
// //                   className={`w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-${accentColor}-500 focus:border-transparent bg-slate-50/50 focus:bg-white transition-colors`} />
// //               </div>
// //             </div>
// //             <div>
// //               <label className="text-xs font-semibold text-slate-600 block mb-1.5">
// //                 Email Address <span className="text-red-500">*</span>
// //               </label>
// //               <div className="relative">
// //                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
// //                 <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)}
// //                   placeholder="you@email.com"
// //                   className={`w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-${accentColor}-500 focus:border-transparent bg-slate-50/50 focus:bg-white transition-colors`} />
// //               </div>
// //             </div>
// //           </div>
// //         </SectionCard>

// //         {/* ── 2. Aadhaar ── */}
// //         <SectionCard step={2} icon={<ImageIcon className="w-4 h-4 text-orange-500" />}
// //           title="Aadhaar Card" subtitle="Upload front & back — must be clearly legible"
// //           isPremium={isPremium}>
// //           <div className="p-5 grid sm:grid-cols-2 gap-5">
// //             <FileUploadZone label="Front Side" sub="Photo, name & Aadhaar number" value={aadhaarFront} onChange={setAadhaarFront} accentColor={accentColor} />
// //             <FileUploadZone label="Back Side" sub="Address & barcode side" value={aadhaarBack} onChange={setAadhaarBack} accentColor={accentColor} />
// //           </div>
// //         </SectionCard>

// //         {/* ── 3. PAN ── */}
// //         <SectionCard step={3} icon={<ImageIcon className="w-4 h-4 text-emerald-500" />}
// //           title="PAN Card" subtitle="Upload front & back of your PAN card"
// //           isPremium={isPremium}>
// //           <div className="p-5 grid sm:grid-cols-2 gap-5">
// //             <FileUploadZone label="Front Side" sub="Name, DOB & PAN number" value={panFront} onChange={setPanFront} accentColor={accentColor} />
// //             <FileUploadZone label="Back Side" sub="Back of the PAN card" value={panBack} onChange={setPanBack} accentColor={accentColor} />
// //           </div>
// //         </SectionCard>

// //         {/* ── 4. Attachments ── */}
// //         <SectionCard step={4} icon={<Paperclip className="w-4 h-4 text-teal-500" />}
// //           title="Supporting Documents" subtitle="Form 16, salary slips, bank statements — optional"
// //           isPremium={isPremium}
// //           action={attachments.length < 10 ? (
// //             <button type="button" onClick={() => attachInputRef.current?.click()}
// //               className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors border border-teal-200">
// //               <Plus className="w-3.5 h-3.5" /> Add File
// //             </button>
// //           ) : undefined}>
// //           <input ref={attachInputRef} type="file" accept="image/jpeg,image/png,application/pdf" className="hidden"
// //             onChange={(e) => { const f = e.target.files?.[0]; if (f) addAttachment(f); e.target.value = ''; }} />
// //           <div className="p-5">
// //             {attachments.length === 0 ? (
// //               <button type="button" onClick={() => attachInputRef.current?.click()}
// //                 className="w-full flex flex-col items-center gap-2 py-8 rounded-xl border-2 border-dashed border-slate-200 hover:border-teal-300 hover:bg-teal-50/30 transition-all text-slate-400 hover:text-teal-600">
// //                 <Paperclip className="w-6 h-6" />
// //                 <span className="text-xs font-semibold">Click to attach documents</span>
// //               </button>
// //             ) : (
// //               <div className="space-y-2.5">
// //                 {attachments.map((att, idx) => (
// //                   <div key={idx} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
// //                     <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
// //                       {att.file.type.startsWith('image/') ? <ImageIcon className="w-4 h-4 text-slate-500" /> : <FileText className="w-4 h-4 text-slate-500" />}
// //                     </div>
// //                     <div className="flex-1 min-w-0 space-y-1.5">
// //                       <p className="text-xs font-semibold text-slate-700 truncate">{att.file.name}</p>
// //                       <input type="text" value={att.remark}
// //                         onChange={(e) => setAttachments(prev => prev.map((a, i) => i === idx ? { ...a, remark: e.target.value } : a))}
// //                         placeholder="Remark (e.g. Form 16 - Employer 1)"
// //                         className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-slate-400 bg-white" />
// //                     </div>
// //                     <button type="button" onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
// //                       className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors shrink-0">
// //                       <X className="w-4 h-4" />
// //                     </button>
// //                   </div>
// //                 ))}
// //                 {attachments.length < 10 && (
// //                   <button type="button" onClick={() => attachInputRef.current?.click()}
// //                     className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-teal-400 text-slate-400 hover:text-teal-600 text-xs font-medium transition-all">
// //                     <Plus className="w-3.5 h-3.5" /> Add another file
// //                   </button>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         </SectionCard>

// //         {/* ── 5. Directorships ── */}
// //         <SectionCard step={5} icon={<Building2 className="w-4 h-4 text-purple-500" />}
// //           title="Directorship / Unlisted Shares"
// //           subtitle={`Add companies where you hold directorship or unlisted shares${unlistedCount > 0 ? ` · ${unlistedCount} unlisted` : ''}`}
// //           isPremium={isPremium}
// //           badge={directorships.length > 0 ? (
// //             <span className={`px-2 py-0.5 text-[11px] rounded-full font-bold ${isPremium ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}`}>
// //               {directorships.length}
// //             </span>
// //           ) : undefined}
// //           action={
// //             <button type="button" onClick={() => setDirectorships(prev => [...prev, emptyDirectorship()])}
// //               className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors border
// //                 ${isPremium ? 'text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 border-purple-200' : 'text-emerald-600 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border-emerald-200'}`}>
// //               <Plus className="w-3.5 h-3.5" /> Add Company
// //             </button>
// //           }>
// //           <div className="p-5">
// //             {directorships.length === 0 ? (
// //               <button type="button" onClick={() => setDirectorships([emptyDirectorship()])}
// //                 className="w-full flex flex-col items-center gap-2 py-10 rounded-xl border-2 border-dashed border-slate-200 hover:border-purple-300 hover:bg-purple-50/20 transition-all text-slate-400 hover:text-purple-600">
// //                 <Building2 className="w-7 h-7" />
// //                 <span className="text-sm font-semibold">Add Directorship or Unlisted Company</span>
// //                 <span className="text-xs text-slate-400 max-w-xs text-center leading-relaxed">Skip if you have no directorship or unlisted shareholding</span>
// //               </button>
// //             ) : (
// //               <div className="space-y-4">
// //                 {directorships.map((entry, idx) => (
// //                   <DirectorshipCard key={idx} idx={idx} entry={entry}
// //                     onChange={updateDirectorship}
// //                     onRemove={(i) => setDirectorships(prev => prev.filter((_, j) => j !== i))} />
// //                 ))}
// //                 <button type="button" onClick={() => setDirectorships(prev => [...prev, emptyDirectorship()])}
// //                   className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-slate-300 hover:border-purple-400 text-slate-400 hover:text-purple-600 text-xs font-semibold transition-all">
// //                   <Plus className="w-3.5 h-3.5" /> Add Another Company
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </SectionCard>

// //         {/* ── 6. Foreign Income / Assets ── */}
// //         <SectionCard step={6} icon={<Globe className="w-4 h-4 text-teal-500" />}
// //           title="Foreign Income / Foreign Assets"
// //           subtitle="Holdings and income outside India — bank accounts, securities, property, salary"
// //           isPremium={isPremium}
// //           badge={foreignAssets.length > 0 ? (
// //             <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-[11px] rounded-full font-bold">{foreignAssets.length}</span>
// //           ) : undefined}
// //           action={!addingForeign && editForeignIdx === null ? (
// //             <button type="button" onClick={() => setAddingForeign(true)}
// //               className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors border border-teal-200">
// //               <Plus className="w-3.5 h-3.5" /> Add Entry
// //             </button>
// //           ) : undefined}>
// //           <div className="p-5 space-y-4">

// //             {/* Add/Edit form */}
// //             {(addingForeign || editForeignIdx !== null) && (
// //               <ForeignAssetForm
// //                 entry={editForeignIdx !== null ? foreignAssets[editForeignIdx] : emptyForeignAsset()}
// //                 isEdit={editForeignIdx !== null}
// //                 onSave={(entry) => {
// //                   if (editForeignIdx !== null) {
// //                     setForeignAssets(prev => prev.map((a, i) => i === editForeignIdx ? entry : a));
// //                     setEditForeignIdx(null);
// //                   } else {
// //                     setForeignAssets(prev => [...prev, entry]);
// //                     setAddingForeign(false);
// //                   }
// //                 }}
// //                 onCancel={() => { setAddingForeign(false); setEditForeignIdx(null); }}
// //               />
// //             )}

// //             {/* List */}
// //             {foreignAssets.length === 0 && !addingForeign ? (
// //               <button type="button" onClick={() => setAddingForeign(true)}
// //                 className="w-full flex flex-col items-center gap-2 py-10 rounded-xl border-2 border-dashed border-slate-200 hover:border-teal-300 hover:bg-teal-50/20 transition-all text-slate-400 hover:text-teal-600">
// //                 <Globe className="w-7 h-7" />
// //                 <span className="text-sm font-semibold">Add Foreign Income / Asset</span>
// //                 <span className="text-xs text-slate-400 max-w-xs text-center leading-relaxed">Skip if you have no foreign income or assets</span>
// //               </button>
// //             ) : foreignAssets.length > 0 ? (
// //               <div className="space-y-2.5">
// //                 {foreignAssets.map((asset, idx) => (
// //                   <div key={idx} className="flex items-center gap-3 bg-teal-50/50 border border-teal-200 rounded-xl px-4 py-3">
// //                     <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
// //                       <Globe className="w-4 h-4 text-teal-600" />
// //                     </div>
// //                     <div className="flex-1 min-w-0">
// //                       <p className="text-xs font-bold text-slate-800 truncate">{asset.countryName} — {asset.incomeSource}</p>
// //                       <p className="text-[11px] text-slate-400">{asset.assetType}{asset.amount ? ` · ₹${Number(asset.amount).toLocaleString('en-IN')}` : ''}</p>
// //                     </div>
// //                     <div className="flex items-center gap-1 shrink-0">
// //                       <button type="button" onClick={() => { setEditForeignIdx(idx); setAddingForeign(false); }}
// //                         className="p-1.5 rounded-lg hover:bg-teal-100 text-teal-500 transition-colors">
// //                         <Edit2 className="w-3.5 h-3.5" />
// //                       </button>
// //                       <button type="button" onClick={() => setForeignAssets(prev => prev.filter((_, i) => i !== idx))}
// //                         className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
// //                         <Trash2 className="w-3.5 h-3.5" />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))}
// //                 {!addingForeign && editForeignIdx === null && (
// //                   <button type="button" onClick={() => setAddingForeign(true)}
// //                     className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-teal-400 text-slate-400 hover:text-teal-600 text-xs font-medium transition-all">
// //                     <Plus className="w-3.5 h-3.5" /> Add another entry
// //                   </button>
// //                 )}
// //               </div>
// //             ) : null}
// //           </div>
// //         </SectionCard>

// //         {/* ── 7. Notes ── */}
// //         <SectionCard step={7} icon={<StickyNote className="w-4 h-4 text-amber-500" />}
// //           title="Additional Notes" subtitle="Optional — share any extra information with our CA team"
// //           isPremium={isPremium}>
// //           <div className="p-5">
// //             <textarea value={otherNotes} onChange={(e) => setOtherNotes(e.target.value)} rows={3}
// //               placeholder="e.g. I have capital gains from US stocks, ESOP vesting, overseas salary — mention anything relevant…"
// //               className={`w-full px-4 py-3 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-${accentColor}-400 focus:border-transparent resize-none leading-relaxed bg-slate-50/50 focus:bg-white transition-colors`} />
// //           </div>
// //         </SectionCard>

// //         {/* ── Compliance Notice ── */}
// //         <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
// //           <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
// //           <p className="text-xs text-amber-800 leading-relaxed">
// //             Ensure all documents are <strong>clear and legible</strong>. Foreign assets and income must be disclosed as per FEMA and Schedule FA/FSI requirements. All files are encrypted and stored securely.
// //           </p>
// //         </div>

// //         {/* ── Submit ── */}
// //         <button type="button" onClick={handleSubmit} disabled={submitting}
// //           className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-base text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
// //           style={{ background: `linear-gradient(135deg,${gradFrom},${gradTo})`, boxShadow: `0 4px 24px ${isPremium ? 'rgba(124,58,237,0.35)' : 'rgba(5,150,105,0.35)'}` }}>
// //           {submitting
// //             ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting…</>
// //             : <><CheckCircle2 className="w-5 h-5" /> Submit ITR {planLabel} Details</>}
// //         </button>

// //       </div>
// //     </div>
// //   );
// // };

// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   ArrowLeft, Upload, X, Plus, FileText, Image as ImageIcon,
//   CheckCircle2, AlertCircle, Crown, Globe,
//   Phone, Mail, StickyNote, Paperclip,
//   Building2, Hash, ChevronDown, ChevronUp, Trash2,
//   Edit2, Check, DollarSign, CreditCard, FolderOpen, Send, User,
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

// interface ForeignAsset {
//   assetType: string; countryName: string;
//   incomeSource: string; amount: string; remark: string;
// }

// const emptyDirectorship = (): DirectorshipEntry => ({
//   companyName: '', companyPan: '', companyType: '', isListed: true, din: '',
//   openingNoOfShares: '', openingCostOfAcquisition: '',
//   acquiredNoOfShares: '', acquiredDate: '', acquiredFaceValue: '',
//   acquiredIssuePrice: '', acquiredPurchasePrice: '',
//   transferredNoOfShares: '', transferredSaleConsideration: '',
//   closingNoOfShares: '', closingCostOfAcquisition: '',
// });

// const emptyForeignAsset = (): ForeignAsset => ({
//   assetType: 'Foreign Asset', countryName: '', incomeSource: '', amount: '', remark: '',
// });

// // ─── Injected Styles ──────────────────────────────────────────────────────────
// const GlobalStyles: React.FC<{ isPremium: boolean }> = ({ isPremium }) => {
//   const accent = isPremium ? '#7C3AED' : '#059669';
//   const accentLight = isPremium ? 'rgba(124,58,237,0.10)' : 'rgba(5,150,105,0.10)';
//   const accentBorder = isPremium ? '#C4B5FD' : '#6EE7B7';

//   return (
//     <style>{`
//       @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,300&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

//       .itr-root { font-family: 'Plus Jakarta Sans', sans-serif; }
//       .itr-display { font-family: 'Fraunces', Georgia, serif; }

//       .itr-card {
//         background: #ffffff;
//         border: 1px solid #E4E4E0;
//         border-radius: 16px;
//         box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03);
//       }

//       .itr-input {
//         width: 100%;
//         padding: 11px 14px;
//         border: 1.5px solid #E4E4E0;
//         border-radius: 10px;
//         font-size: 14px;
//         font-family: 'Plus Jakarta Sans', sans-serif;
//         color: #111827;
//         background: #FAFAF8;
//         transition: all 0.18s ease;
//         outline: none;
//       }
//       .itr-input::placeholder { color: #AEAAA6; }
//       .itr-input:focus {
//         border-color: ${accent};
//         background: #fff;
//         box-shadow: 0 0 0 3px ${accentLight};
//       }

//       .itr-input-sm {
//         width: 100%;
//         padding: 8px 12px;
//         border: 1.5px solid #E4E4E0;
//         border-radius: 9px;
//         font-size: 13px;
//         font-family: 'Plus Jakarta Sans', sans-serif;
//         color: #111827;
//         background: #fff;
//         transition: all 0.18s ease;
//         outline: none;
//       }
//       .itr-input-sm::placeholder { color: #AEAAA6; }
//       .itr-input-sm:focus {
//         border-color: ${accent};
//         background: #fff;
//         box-shadow: 0 0 0 3px ${accentLight};
//       }

//       .upload-zone {
//         border: 1.5px dashed #D4D0CA;
//         border-radius: 12px;
//         background: #FAFAF8;
//         transition: all 0.2s ease;
//         cursor: pointer;
//       }
//       .upload-zone:hover, .upload-zone.dragging {
//         border-color: ${accent};
//         background: ${accentLight};
//       }
//       .upload-filled {
//         background: #F0FDF4;
//         border: 1.5px solid #86EFAC;
//         border-radius: 12px;
//       }

//       .section-header {
//         padding: 18px 24px;
//         border-bottom: 1px solid #F0EFEB;
//         display: flex; align-items: center; gap: 12px;
//       }
//       .section-icon {
//         width: 36px; height: 36px;
//         border-radius: 10px;
//         display: flex; align-items: center; justify-content: center;
//         flex-shrink: 0;
//       }
//       .section-body { padding: 24px; }

//       .step-line {
//         position: absolute;
//         left: 19px; top: 44px; bottom: -8px;
//         width: 2px;
//         background: linear-gradient(to bottom, #E4E4E0, transparent);
//       }
//       .step-line.done { background: linear-gradient(to bottom, ${accent}, ${accentBorder}); }

//       .progress-step .step-icon {
//         width: 40px; height: 40px; border-radius: 50%;
//         border: 2px solid #D4D0CA;
//         background: #F5F5F2; color: #AEAAA6;
//         display: flex; align-items: center; justify-content: center;
//         font-size: 13px; font-weight: 700;
//         transition: all 0.3s ease;
//         position: relative; z-index: 1; flex-shrink: 0;
//       }
//       .progress-step.active .step-icon {
//         background: ${accent}; border-color: ${accent};
//         color: white;
//         box-shadow: 0 0 0 4px ${accentLight};
//       }
//       .progress-step.done .step-icon {
//         background: #059669; border-color: #059669; color: white;
//       }

//       .submit-btn {
//         border-radius: 14px; padding: 16px 32px;
//         font-weight: 700; font-size: 15px; color: white;
//         border: none; cursor: pointer;
//         width: 100%; display: flex; align-items: center;
//         justify-content: center; gap: 10px;
//         transition: all 0.2s ease;
//         font-family: 'Plus Jakarta Sans', sans-serif;
//       }
//       .submit-btn:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.05); }
//       .submit-btn:active:not(:disabled) { transform: translateY(0); }
//       .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

//       .toggle-btn {
//         padding: 10px 16px; border-radius: 10px;
//         border: 2px solid #E4E4E0; background: transparent;
//         font-size: 13px; font-weight: 600;
//         cursor: pointer; transition: all 0.18s ease;
//         font-family: 'Plus Jakarta Sans', sans-serif;
//         color: #6B7280;
//       }
//       .toggle-btn.selected-accent {
//         border-color: ${accent}; background: ${accentLight}; color: ${accent};
//       }
//       .toggle-btn.selected-emerald {
//         border-color: #059669; background: #ECFDF5; color: #059669;
//       }
//       .toggle-btn.selected-amber {
//         border-color: #D97706; background: #FFFBEB; color: #D97706;
//       }
//       .toggle-btn:not(.selected-accent):not(.selected-emerald):not(.selected-amber):hover {
//         border-color: #9CA3AF;
//       }

//       .dir-section-tag {
//         display: inline-flex; align-items: center; gap: 5px;
//         padding: 2px 8px; border-radius: 4px;
//         font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
//         text-transform: uppercase; background: #F0EFEB; color: #6B7280;
//       }

//       .foreign-form-bg {
//         background: #F0FDFA;
//         border: 1px solid #99F6E4;
//         border-radius: 14px; padding: 20px;
//       }

//       .badge-sm {
//         display: inline-flex; align-items: center; gap: 4px;
//         padding: 3px 8px; border-radius: 99px;
//         font-size: 11px; font-weight: 700;
//       }

//       @keyframes fadeUp {
//         from { opacity: 0; transform: translateY(16px); }
//         to   { opacity: 1; transform: translateY(0); }
//       }
//       .fade-up   { animation: fadeUp 0.45s ease both; }
//       .fade-up-1 { animation-delay: 0.04s; }
//       .fade-up-2 { animation-delay: 0.10s; }
//       .fade-up-3 { animation-delay: 0.16s; }
//       .fade-up-4 { animation-delay: 0.22s; }
//       .fade-up-5 { animation-delay: 0.28s; }
//       .fade-up-6 { animation-delay: 0.34s; }
//       .fade-up-7 { animation-delay: 0.40s; }
//       .fade-up-8 { animation-delay: 0.46s; }

//       @keyframes spin { to { transform: rotate(360deg); } }
//       @keyframes scaleIn {
//         from { opacity: 0; transform: scale(0.85); }
//         to   { opacity: 1; transform: scale(1); }
//       }
//       .scale-in { animation: scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
//       .spin-anim { animation: spin 0.8s linear infinite; }

//       ::-webkit-scrollbar { width: 5px; }
//       ::-webkit-scrollbar-track { background: transparent; }
//       ::-webkit-scrollbar-thumb { background: #D4D0CA; border-radius: 10px; }

//       @media (min-width: 860px) { .sidebar-block { display: block !important; } }
//     `}</style>
//   );
// };

// // ─── Theme helper ─────────────────────────────────────────────────────────────
// const useTheme = (isPremium: boolean) => ({
//   accent: isPremium ? '#7C3AED' : '#059669',
//   accentLight: isPremium ? 'rgba(124,58,237,0.08)' : 'rgba(5,150,105,0.08)',
//   gradFrom: isPremium ? '#7C3AED' : '#059669',
//   gradTo: isPremium ? '#6D28D9' : '#047857',
//   shadow: isPremium ? 'rgba(124,58,237,0.35)' : 'rgba(5,150,105,0.35)',
//   badgeBg: isPremium ? '#EDE9FE' : '#D1FAE5',
//   badgeColor: isPremium ? '#7C3AED' : '#059669',
//   badgeBorder: isPremium ? '#C4B5FD' : '#6EE7B7',
//   label: isPremium ? 'Premium' : 'Elite',
// });

// // ─── Sidebar step config ──────────────────────────────────────────────────────
// const mkSteps = (isPremium: boolean) => [
//   { label: 'Contact', sub: 'Mobile & email', icon: User },
//   { label: 'Aadhaar', sub: 'Front & back', icon: ImageIcon },
//   { label: 'PAN Card', sub: 'Front & back', icon: CreditCard },
//   { label: 'Documents', sub: 'Supporting files', icon: FolderOpen },
//   { label: 'Directorships', sub: 'Companies & shares', icon: Building2 },
//   { label: 'Foreign Assets', sub: 'Overseas income', icon: Globe },
//   { label: 'Notes & Submit', sub: 'Review & confirm', icon: Send },
// ];

// // ─── Sidebar Progress ─────────────────────────────────────────────────────────
// const SidebarProgress: React.FC<{ activeStep: number; isPremium: boolean }> = ({ activeStep, isPremium }) => {
//   const theme = useTheme(isPremium);
//   const STEPS = mkSteps(isPremium);

//   return (
//     <aside style={{ width: 260, flexShrink: 0, position: 'sticky', top: 72, alignSelf: 'flex-start', paddingBottom: 40 }}>
//       <div style={{ marginBottom: 28 }}>
//         <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#AEAAA6', marginBottom: 4 }}>
//           Filing Progress
//         </p>
//         <div style={{ height: 4, background: '#F0EFEB', borderRadius: 99, overflow: 'hidden' }}>
//           <div style={{
//             height: '100%',
//             width: `${Math.round(((activeStep + 1) / STEPS.length) * 100)}%`,
//             background: `linear-gradient(90deg, ${theme.gradFrom}, ${theme.accent})`,
//             borderRadius: 99, transition: 'width 0.4s ease',
//           }} />
//         </div>
//         <p style={{ fontSize: 12, color: '#6B7280', marginTop: 8 }}>
//           Step {activeStep + 1} of {STEPS.length}
//         </p>
//       </div>

//       <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
//         {STEPS.map((step, i) => {
//           const isDone = i < activeStep;
//           const isActive = i === activeStep;
//           const Icon = step.icon;
//           return (
//             <div key={i} className={`progress-step ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}
//               style={{ display: 'flex', gap: 14, position: 'relative', paddingBottom: i < STEPS.length - 1 ? 24 : 0 }}>
//               {i < STEPS.length - 1 && <div className={`step-line ${isDone ? 'done' : ''}`} />}
//               <div className="step-icon">
//                 {isDone ? <Check size={16} /> : <Icon size={16} />}
//               </div>
//               <div style={{ paddingTop: 9 }}>
//                 <p style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? '#111827' : isDone ? theme.accent : '#9CA3AF', lineHeight: 1 }}>
//                   {step.label}
//                 </p>
//                 <p style={{ fontSize: 11, color: '#AEAAA6', marginTop: 3 }}>{step.sub}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Trust badge */}
//       <div style={{
//         marginTop: 32, padding: '14px 16px',
//         background: isPremium ? 'linear-gradient(135deg,#EDE9FE,#F5F3FF)' : 'linear-gradient(135deg,#D1FAE5,#ECFDF5)',
//         border: `1px solid ${theme.badgeBorder}`, borderRadius: 12,
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
//           <Crown size={14} color={theme.accent} />
//           <span style={{ fontSize: 12, fontWeight: 700, color: theme.accent }}>{theme.label} Plan Benefits</span>
//         </div>
//         <p style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.6 }}>
//           Dedicated CA, directorship disclosures, foreign asset reporting & priority support.
//         </p>
//       </div>
//     </aside>
//   );
// };

// // ─── Section Card ─────────────────────────────────────────────────────────────
// const SectionCard: React.FC<{
//   icon: React.ReactNode; iconBg: string;
//   title: string; subtitle?: string;
//   rightAction?: React.ReactNode;
//   children: React.ReactNode;
//   badge?: React.ReactNode;
//   className?: string;
// }> = ({ icon, iconBg, title, subtitle, rightAction, children, badge, className }) => (
//   <div className={`itr-card fade-up ${className || ''}`}>
//     <div className="section-header">
//       <div className="section-icon" style={{ background: iconBg }}>{icon}</div>
//       <div style={{ flex: 1 }}>
//         <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: 8 }}>
//           {title}{badge}
//         </h2>
//         {subtitle && <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{subtitle}</p>}
//       </div>
//       {rightAction}
//     </div>
//     <div className="section-body">{children}</div>
//   </div>
// );

// // ─── Field Label ──────────────────────────────────────────────────────────────
// const FieldLabel: React.FC<{ children: React.ReactNode; required?: boolean }> = ({ children, required }) => (
//   <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
//     {children}{required && <span style={{ color: '#EF4444', marginLeft: 2 }}>*</span>}
//   </label>
// );

// const MiniLabel: React.FC<{ children: React.ReactNode; required?: boolean }> = ({ children, required }) => (
//   <label style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: 5 }}>
//     {children}{required && <span style={{ color: '#EF4444', marginLeft: 2 }}>*</span>}
//   </label>
// );

// // ─── File Upload Zone ─────────────────────────────────────────────────────────
// const FileUploadZone: React.FC<{
//   label: string; sub: string; value: UploadFile; onChange: (v: UploadFile) => void;
// }> = ({ label, sub, value, onChange }) => {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [dragging, setDragging] = useState(false);

//   const handleFile = (file: File) => {
//     if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) { toast.error('Only JPG, PNG, or PDF allowed'); return; }
//     if (file.size > 2 * 1024 * 1024) { toast.error('Max 2 MB'); return; }
//     onChange({ file, preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null });
//   };

//   const isPdf = value.file?.type === 'application/pdf';

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
//       <FieldLabel required>{label}</FieldLabel>
//       <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: -4 }}>{sub}</p>

//       {value.file ? (
//         <div className="upload-filled" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
//           <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', background: '#fff', border: '1px solid #86EFAC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//             {value.preview ? <img src={value.preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <FileText size={18} color="#16A34A" />}
//           </div>
//           <div style={{ flex: 1, minWidth: 0 }}>
//             <p style={{ fontSize: 13, fontWeight: 600, color: '#15803D', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value.file.name}</p>
//             <p style={{ fontSize: 11, color: '#22C55E', marginTop: 2 }}>{(value.file.size / 1024).toFixed(0)} KB · {isPdf ? 'PDF' : 'Image'}</p>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
//             <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', background: '#DCFCE7', borderRadius: 99, fontSize: 10, fontWeight: 700, color: '#16A34A' }}>
//               <Check size={10} /> Uploaded
//             </span>
//             <button type="button" onClick={() => onChange({ file: null, preview: null })}
//               style={{ padding: 6, borderRadius: 8, border: 'none', cursor: 'pointer', background: 'rgba(220,252,231,0.5)', color: '#16A34A', display: 'flex' }}>
//               <X size={14} />
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className={`upload-zone ${dragging ? 'dragging' : ''}`}
//           onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
//           onDragLeave={() => setDragging(false)}
//           onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
//           onClick={() => inputRef.current?.click()}
//           style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '28px 16px' }}>
//           <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#fff', border: '1px solid #E4E4E0', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
//             <Upload size={16} color={dragging ? '#7C3AED' : '#9CA3AF'} />
//           </div>
//           <div style={{ textAlign: 'center' }}>
//             <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>
//               <span style={{ color: '#7C3AED' }}>Click to upload</span>
//               <span style={{ color: '#6B7280', fontWeight: 400 }}> or drag & drop</span>
//             </p>
//             <p style={{ fontSize: 11, color: '#AEAAA6' }}>JPG, PNG, PDF · Max 2 MB</p>
//           </div>
//         </div>
//       )}
//       <input ref={inputRef} type="file" accept="image/jpeg,image/png,application/pdf" style={{ display: 'none' }}
//         onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} />
//     </div>
//   );
// };

// // ─── Num Input ────────────────────────────────────────────────────────────────
// const NumInput: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder?: string; isDate?: boolean }> =
//   ({ label, value, onChange, placeholder, isDate }) => (
//     <div>
//       <MiniLabel>{label}</MiniLabel>
//       <input type={isDate ? 'date' : 'text'} value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder || '0'}
//         className="itr-input-sm" />
//     </div>
//   );

// // ─── Directorship Card ────────────────────────────────────────────────────────
// const DirectorshipCard: React.FC<{
//   idx: number; entry: DirectorshipEntry; isPremium: boolean;
//   onChange: (idx: number, field: keyof DirectorshipEntry, value: any) => void;
//   onRemove: (idx: number) => void;
// }> = ({ idx, entry, isPremium, onChange, onRemove }) => {
//   const [expanded, setExpanded] = useState(true);
//   const theme = useTheme(isPremium);
//   const set = (field: keyof DirectorshipEntry) => (value: any) => onChange(idx, field, value);

//   return (
//     <div style={{ border: '1px solid #E4E4E0', borderRadius: 14, overflow: 'hidden', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
//       {/* Header */}
//       <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: '#F7F7F5', borderBottom: '1px solid #F0EFEB' }}>
//         <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg,${theme.gradFrom},${theme.gradTo})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//           <Building2 size={15} color="white" />
//         </div>
//         <div style={{ flex: 1, minWidth: 0 }}>
//           <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//             {entry.companyName || `Company ${idx + 1}`}
//           </p>
//           <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
//             {entry.companyPan || 'PAN not entered'}
//             {' · '}
//             <span style={{ fontWeight: 600, color: entry.isListed ? '#059669' : '#D97706' }}>
//               {entry.isListed ? 'Listed' : 'Unlisted'}
//             </span>
//           </p>
//         </div>
//         <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
//           <button type="button" onClick={() => setExpanded(v => !v)}
//             style={{ padding: 7, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}>
//             {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
//           </button>
//           <button type="button" onClick={() => onRemove(idx)}
//             style={{ padding: 7, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}
//             onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#EF4444'; (e.currentTarget as HTMLElement).style.background = '#FEF2F2'; }}
//             onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
//             <Trash2 size={15} />
//           </button>
//         </div>
//       </div>

//       {expanded && (
//         <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
//           {/* Company basic info */}
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 16 }}>
//             <div>
//               <FieldLabel required>Company Name</FieldLabel>
//               <input type="text" value={entry.companyName} onChange={(e) => set('companyName')(e.target.value)}
//                 placeholder="Full legal name" className="itr-input" />
//             </div>
//             <div>
//               <FieldLabel required>Company PAN</FieldLabel>
//               <input type="text" value={entry.companyPan}
//                 onChange={(e) => set('companyPan')(e.target.value.toUpperCase())} maxLength={10}
//                 placeholder="AABCD1234E" className="itr-input"
//                 style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }} />
//             </div>
//             <div>
//               <FieldLabel>DIN Number</FieldLabel>
//               <div style={{ position: 'relative' }}>
//                 <Hash size={14} color="#9CA3AF" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
//                 <input type="text" value={entry.din} onChange={(e) => set('din')(e.target.value)}
//                   placeholder="12345678" className="itr-input" style={{ paddingLeft: 34 }} />
//               </div>
//             </div>
//             <div>
//               <FieldLabel>Company Type</FieldLabel>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
//                 {(['Domestic', 'Foreign'] as const).map(t => (
//                   <button key={t} type="button" onClick={() => set('companyType')(t)}
//                     className={`toggle-btn ${entry.companyType === t ? 'selected-accent' : ''}`}
//                     style={{ padding: '9px 0', textAlign: 'center', fontSize: 13 }}>
//                     {t}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Listing status */}
//           <div>
//             <FieldLabel required>Share Listing Status</FieldLabel>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
//               {[
//                 { val: true, label: 'Listed', desc: 'Traded on stock exchange', cls: 'selected-emerald' },
//                 { val: false, label: 'Unlisted', desc: 'Not on exchange — details required', cls: 'selected-amber' },
//               ].map(({ val, label, desc, cls }) => (
//                 <button key={label} type="button" onClick={() => set('isListed')(val)}
//                   className={`toggle-btn ${entry.isListed === val ? cls : ''}`}
//                   style={{ textAlign: 'left', padding: '12px 14px', height: 'auto' }}>
//                   <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{label}</p>
//                   <p style={{ fontSize: 11, fontWeight: 400, color: '#9CA3AF', lineHeight: 1.4 }}>{desc}</p>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Unlisted share details */}
//           {!entry.isListed && (
//             <div style={{ border: '1px solid #FDE68A', borderRadius: 12, overflow: 'hidden' }}>
//               <div style={{ padding: '12px 18px', background: '#FFFBEB', borderBottom: '1px solid #FDE68A', display: 'flex', alignItems: 'center', gap: 10 }}>
//                 <div style={{ width: 28, height: 28, borderRadius: 8, background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                   <Building2 size={13} color="white" />
//                 </div>
//                 <div>
//                   <p style={{ fontSize: 12, fontWeight: 700, color: '#92400E' }}>Unlisted Share Details — Schedule AL</p>
//                   <p style={{ fontSize: 11, color: '#B45309', marginTop: 1 }}>Mandatory disclosure for unlisted shareholdings</p>
//                 </div>
//               </div>

//               <div style={{ padding: 18, background: 'rgba(255,251,235,0.4)', display: 'flex', flexDirection: 'column', gap: 18 }}>
//                 {[
//                   {
//                     letter: 'A', label: 'Opening Balance', fields: [
//                       { key: 'openingNoOfShares', label: 'No. of Shares (Col 4)', placeholder: '7000' },
//                       { key: 'openingCostOfAcquisition', label: 'Cost of Acquisition ₹ (Col 5)', placeholder: '70000' },
//                     ]
//                   },
//                   {
//                     letter: 'B', label: 'Shares Acquired During Year', fields: [
//                       { key: 'acquiredNoOfShares', label: 'No. of Shares (Col 6)', placeholder: '500' },
//                       { key: 'acquiredDate', label: 'Date of Purchase (Col 7)', isDate: true },
//                       { key: 'acquiredFaceValue', label: 'Face Value/Share ₹ (Col 8)', placeholder: '10' },
//                       { key: 'acquiredIssuePrice', label: 'Issue Price/Share ₹ (Col 9)', placeholder: '100' },
//                       { key: 'acquiredPurchasePrice', label: 'Purchase Price/Share ₹ (Col 10)', placeholder: '0' },
//                     ]
//                   },
//                   {
//                     letter: 'C', label: 'Shares Transferred', fields: [
//                       { key: 'transferredNoOfShares', label: 'No. of Shares Transferred (Col 11)', placeholder: '0' },
//                       { key: 'transferredSaleConsideration', label: 'Sale Consideration ₹ (Col 12)', placeholder: '0' },
//                     ]
//                   },
//                   {
//                     letter: 'D', label: 'Closing Balance', fields: [
//                       { key: 'closingNoOfShares', label: 'No. of Shares (Col 13)', placeholder: '7000' },
//                       { key: 'closingCostOfAcquisition', label: 'Cost of Acquisition ₹ (Col 14)', placeholder: '70000' },
//                     ]
//                   },
//                 ].map(({ letter, label, fields }) => (
//                   <div key={letter}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
//                       <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#6B7280', flexShrink: 0 }}>
//                         {letter}
//                       </span>
//                       <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
//                     </div>
//                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
//                       {fields.map((f: any) => (
//                         <NumInput key={f.key} label={f.label} value={(entry as any)[f.key]}
//                           onChange={set(f.key as keyof DirectorshipEntry)}
//                           placeholder={f.placeholder} isDate={f.isDate} />
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── Foreign Asset Form ───────────────────────────────────────────────────────
// const ForeignAssetForm: React.FC<{
//   entry: ForeignAsset; onSave: (e: ForeignAsset) => void; onCancel: () => void; isEdit: boolean;
// }> = ({ entry: initialEntry, onSave, onCancel, isEdit }) => {
//   const [entry, setEntry] = useState<ForeignAsset>(initialEntry);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const set = (k: keyof ForeignAsset) => (v: string) => {
//     setEntry(p => ({ ...p, [k]: v }));
//     setErrors(p => { const n = { ...p }; delete n[k]; return n; });
//   };

//   const save = () => {
//     const errs: Record<string, string> = {};
//     if (!entry.countryName.trim()) errs.countryName = 'Country is required';
//     if (!entry.incomeSource.trim()) errs.incomeSource = 'Income source is required';
//     if (Object.keys(errs).length) { setErrors(errs); return; }
//     onSave(entry);
//   };

//   return (
//     <div className="foreign-form-bg">
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
//         <p style={{ fontSize: 12, fontWeight: 700, color: '#0F766E', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
//           {isEdit ? 'Edit Entry' : 'New Foreign Income / Asset'}
//         </p>
//         <button type="button" onClick={onCancel}
//           style={{ padding: 6, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#0F766E', display: 'flex' }}>
//           <X size={14} />
//         </button>
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 14 }}>
//         <div>
//           <MiniLabel>Asset / Income Type</MiniLabel>
//           <select value={entry.assetType} onChange={(e) => set('assetType')(e.target.value)}
//             className="itr-input-sm" style={{ background: '#fff' }}>
//             <option>Foreign Asset</option>
//             <option>Foreign Income</option>
//             <option>Foreign Bank Account</option>
//             <option>Foreign Immovable Property</option>
//             <option>Foreign Stocks / Equity</option>
//             <option>Other</option>
//           </select>
//         </div>
//         <div>
//           <MiniLabel required>Country Name</MiniLabel>
//           <input type="text" value={entry.countryName} onChange={(e) => set('countryName')(e.target.value)}
//             placeholder="USA, UK, UAE…"
//             className="itr-input-sm"
//             style={{ borderColor: errors.countryName ? '#EF4444' : undefined, background: errors.countryName ? '#FEF2F2' : '#fff' }} />
//           {errors.countryName && <p style={{ fontSize: 11, color: '#EF4444', marginTop: 4 }}>{errors.countryName}</p>}
//         </div>
//         <div>
//           <MiniLabel required>Source of Income</MiniLabel>
//           <input type="text" value={entry.incomeSource} onChange={(e) => set('incomeSource')(e.target.value)}
//             placeholder="Salary, Dividends, Rent…"
//             className="itr-input-sm"
//             style={{ borderColor: errors.incomeSource ? '#EF4444' : undefined, background: errors.incomeSource ? '#FEF2F2' : '#fff' }} />
//           {errors.incomeSource && <p style={{ fontSize: 11, color: '#EF4444', marginTop: 4 }}>{errors.incomeSource}</p>}
//         </div>
//         <div>
//           <MiniLabel>Amount (₹ Equivalent)</MiniLabel>
//           <div style={{ position: 'relative' }}>
//             <DollarSign size={13} color="#9CA3AF" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
//             <input type="text" value={entry.amount} onChange={(e) => set('amount')(e.target.value)}
//               placeholder="INR equivalent" className="itr-input-sm" style={{ paddingLeft: 28, background: '#fff' }} />
//           </div>
//         </div>
//         <div style={{ gridColumn: '1 / -1' }}>
//           <MiniLabel>Remarks / Additional Details</MiniLabel>
//           <textarea value={entry.remark} onChange={(e) => set('remark')(e.target.value)} rows={2}
//             placeholder="Acquisition date, account number, specific context…"
//             className="itr-input-sm" style={{ resize: 'vertical', lineHeight: 1.6 }} />
//         </div>
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16, paddingTop: 14, borderTop: '1px solid #99F6E4' }}>
//         <button type="button" onClick={onCancel}
//           style={{ padding: '8px 16px', borderRadius: 9, border: '1px solid #D4D0CA', background: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#6B7280', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
//           Cancel
//         </button>
//         <button type="button" onClick={save}
//           style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 20px', borderRadius: 9, border: 'none', background: '#0D9488', color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 2px 8px rgba(13,148,136,0.3)' }}>
//           <Check size={13} /> {isEdit ? 'Update Entry' : 'Add Entry'}
//         </button>
//       </div>
//     </div>
//   );
// };

// // ─── Main Page ────────────────────────────────────────────────────────────────
// export const ItrPremiumFormPage: React.FC = () => {
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
//   const [foreignAssets, setForeignAssets] = useState<ForeignAsset[]>([]);
//   const [addingForeign, setAddingForeign] = useState(false);
//   const [editForeignIdx, setEditForeignIdx] = useState<number | null>(null);
//   const attachInputRef = useRef<HTMLInputElement>(null);

//   const planType = (orderItem?.planType || '').toUpperCase();
//   const isElite = planType.includes('ELITE');
//   const isPremium = !isElite;
//   const theme = useTheme(isPremium);
//   const apiEndpoint = isElite ? 'elite' : 'premium';

//   const getActiveStep = () => {
//     if (!mobileNo || !emailId) return 0;
//     if (!aadhaarFront.file || !aadhaarBack.file) return 1;
//     if (!panFront.file || !panBack.file) return 2;
//     if (attachments.length === 0) return 3;
//     if (directorships.length === 0) return 4;
//     if (foreignAssets.length === 0) return 5;
//     return 6;
//   };

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
//     if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) { toast.error('Only JPG, PNG, or PDF allowed'); return; }
//     if (file.size > 5 * 1024 * 1024) { toast.error('Max 5 MB'); return; }
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
//       if (foreignAssets.length > 0) {
//         fd.append('foreignAssets', JSON.stringify(foreignAssets.map(a => ({
//           assetType: a.assetType, countryName: a.countryName,
//           incomeSource: a.incomeSource,
//           amount: a.amount ? Number(a.amount) : 0,
//           remark: a.remark || null,
//         }))));
//       }

//       const remarks: string[] = [];
//       attachments.forEach(a => { fd.append('attachments', a.file); remarks.push(a.remark || ''); });
//       if (remarks.length) fd.append('attachmentRemarks', JSON.stringify(remarks));

//       const token = localStorage.getItem('token');
//       const headers: Record<string, string> = {};
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       const res = await fetch(`${API}/itr/${apiEndpoint}`, { method: 'POST', headers, credentials: 'include', body: fd });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || 'Submission failed');
//       setSubmitted(true);
//       toast.success('Details submitted successfully!');
//     } catch (err: any) {
//       toast.error(err.message || 'Something went wrong.');
//     } finally { setSubmitting(false); }
//   };

//   const planPrice = orderItem?.price ? `₹${Number(orderItem.price).toLocaleString('en-IN')}` : '';
//   const unlistedCnt = directorships.filter(d => !d.isListed).length;
//   const activeStep = getActiveStep();

//   // ── Loading ──
//   if (loadingOrder) {
//     return (
//       <>
//         <GlobalStyles isPremium={true} />
//         <div className="itr-root" style={{ minHeight: '100vh', background: '#F7F7F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
//           <div className="spin-anim" style={{ width: 52, height: 52, borderRadius: '50%', border: '3px solid #E4E4E0', borderTopColor: '#7C3AED' }} />
//           <p style={{ fontSize: 13, color: '#9CA3AF', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Loading your order…</p>
//         </div>
//       </>
//     );
//   }

//   // ── Success ──
//   if (submitted) {
//     return (
//       <>
//         <GlobalStyles isPremium={isPremium} />
//         <div className="itr-root" style={{ minHeight: '100vh', background: '#F7F7F5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
//           <div className="itr-card scale-in" style={{ maxWidth: 460, width: '100%', textAlign: 'center', padding: 48 }}>
//             <div style={{
//               width: 72, height: 72, borderRadius: '50%',
//               background: `linear-gradient(135deg,${theme.badgeBg},${theme.badgeBg})`,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               margin: '0 auto 20px',
//               boxShadow: `0 0 0 8px ${theme.accentLight}`,
//             }}>
//               <CheckCircle2 size={32} color={theme.accent} />
//             </div>
//             <span className="badge-sm" style={{ background: theme.badgeBg, color: theme.accent, border: `1px solid ${theme.badgeBorder}`, marginBottom: 16, display: 'inline-flex' }}>
//               <Crown size={10} /> {theme.label} Plan
//             </span>
//             <h2 className="itr-display" style={{ fontSize: 28, fontWeight: 600, color: '#111827', marginBottom: 10 }}>
//               All done!
//             </h2>
//             <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, marginBottom: 28 }}>
//               Your ITR {theme.label} details have been received. Our dedicated CA will review your documents
//               and reach out within <strong style={{ color: '#374151' }}>1–2 business days</strong>.
//             </p>
//             {orderItem && (
//               <div style={{ background: '#F7F7F5', border: '1px solid #E4E4E0', borderRadius: 12, padding: '14px 18px', marginBottom: 28, textAlign: 'left' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//                   <span style={{ fontSize: 12, color: '#9CA3AF' }}>Order Number</span>
//                   <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{orderItem.orderNumber}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <span style={{ fontSize: 12, color: '#9CA3AF' }}>Service</span>
//                   <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{orderItem.serviceName}</span>
//                 </div>
//               </div>
//             )}
//             <button onClick={() => navigate('/dashboard')} className="submit-btn"
//               style={{ background: `linear-gradient(135deg,${theme.gradFrom},${theme.gradTo})`, boxShadow: `0 4px 24px ${theme.shadow}` }}>
//               Back to Dashboard
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <GlobalStyles isPremium={isPremium} />
//       <div className="itr-root" style={{ minHeight: '100vh', background: '#F7F7F5' }}>

//         {/* ── Top Nav ── */}
//         <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E4E4E0' }}>
//           <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', gap: 16 }}>
//             <button onClick={() => navigate('/dashboard')}
//               style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#6B7280', fontSize: 13, fontWeight: 500, fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s' }}
//               onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F5F5F2'; (e.currentTarget as HTMLElement).style.color = '#111827'; }}
//               onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#6B7280'; }}>
//               <ArrowLeft size={15} /> Dashboard
//             </button>

//             <div style={{ width: 1, height: 20, background: '#E4E4E0' }} />

//             <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
//               <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg,${theme.gradFrom},${theme.gradTo})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <Crown size={15} color="white" />
//               </div>
//               <div>
//                 <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', lineHeight: 1 }}>
//                   {orderItem?.serviceName || 'Income Tax Return'}
//                 </p>
//                 {(planPrice || orderItem?.orderNumber) && (
//                   <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
//                     {orderItem?.orderNumber}{planPrice ? ` · ${planPrice}` : ''}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <span className="badge-sm" style={{ background: theme.badgeBg, color: theme.accent, border: `1px solid ${theme.badgeBorder}` }}>
//               <Crown size={10} /> {theme.label} Plan
//             </span>
//           </div>
//         </nav>

//         {/* ── Page body ── */}
//         <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px', display: 'flex', gap: 40, alignItems: 'flex-start' }}>

//           {/* Sidebar */}
//           <div className="sidebar-block" style={{ display: 'none' }}>
//             <SidebarProgress activeStep={activeStep} isPremium={isPremium} />
//           </div>

//           {/* Form column */}
//           <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>

//             {/* Title */}
//             <div className="fade-up">
//               <h1 className="itr-display" style={{ fontSize: 32, fontWeight: 600, color: '#111827', lineHeight: 1.15, marginBottom: 6 }}>
//                 File your ITR
//               </h1>
//               <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6 }}>
//                 Complete each section below. Your dedicated CA handles filing, disclosures, and foreign asset reporting.
//               </p>
//             </div>

//             {/* ── § 1 Contact ── */}
//             <SectionCard className="fade-up-1"
//               icon={<Phone size={16} color={theme.accent} />} iconBg={theme.badgeBg}
//               title="Contact Information" subtitle="We'll send filing updates and CA queries here">
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 20 }}>
//                 <div>
//                   <FieldLabel required>Mobile Number</FieldLabel>
//                   <div style={{ position: 'relative' }}>
//                     <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 13, fontWeight: 500, color: '#9CA3AF', borderRight: '1px solid #E4E4E0', paddingRight: 8, pointerEvents: 'none' }}>+91</span>
//                     <input type="tel" value={mobileNo} onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, '').slice(0, 10))}
//                       placeholder="98XXXXXXXX" maxLength={10} className="itr-input" style={{ paddingLeft: 56 }} />
//                   </div>
//                   <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 5 }}>Indian mobile number only</p>
//                 </div>
//                 <div>
//                   <FieldLabel required>Email Address</FieldLabel>
//                   <div style={{ position: 'relative' }}>
//                     <Mail size={15} color="#9CA3AF" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
//                     <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)}
//                       placeholder="you@example.com" className="itr-input" style={{ paddingLeft: 36 }} />
//                   </div>
//                   <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 5 }}>Filing receipts sent here</p>
//                 </div>
//               </div>
//             </SectionCard>

//             {/* ── § 2 Aadhaar ── */}
//             <SectionCard className="fade-up-2"
//               icon={<ImageIcon size={16} color="#EA580C" />} iconBg="#FFF7ED"
//               title="Aadhaar Card" subtitle="Upload front & back — must be clearly legible">
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 20 }}>
//                 <FileUploadZone label="Aadhaar — Front Side" sub="Side with your photo & name" value={aadhaarFront} onChange={setAadhaarFront} />
//                 <FileUploadZone label="Aadhaar — Back Side" sub="Side with your address" value={aadhaarBack} onChange={setAadhaarBack} />
//               </div>
//             </SectionCard>

//             {/* ── § 3 PAN ── */}
//             <SectionCard className="fade-up-3"
//               icon={<CreditCard size={16} color="#059669" />} iconBg="#ECFDF5"
//               title="PAN Card" subtitle="Upload front & back — PAN number must be visible">
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 20 }}>
//                 <FileUploadZone label="PAN Card — Front Side" sub="Name, DOB & PAN number" value={panFront} onChange={setPanFront} />
//                 <FileUploadZone label="PAN Card — Back Side" sub="Back of the PAN card" value={panBack} onChange={setPanBack} />
//               </div>
//             </SectionCard>

//             {/* ── § 4 Attachments ── */}
//             <SectionCard className="fade-up-4"
//               icon={<Paperclip size={16} color="#0891B2" />} iconBg="#ECFEFF"
//               title="Supporting Documents" subtitle="Optional — Form 16, salary slips, bank statements"
//               rightAction={attachments.length > 0 && attachments.length < 10 ? (
//                 <button type="button" onClick={() => attachInputRef.current?.click()}
//                   style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: '1.5px solid #A5F3FC', background: '#ECFEFF', color: '#0891B2', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
//                   <Plus size={13} /> Add File
//                 </button>
//               ) : undefined}>
//               <input ref={attachInputRef} type="file" accept="image/jpeg,image/png,application/pdf" style={{ display: 'none' }}
//                 onChange={(e) => { const f = e.target.files?.[0]; if (f) addAttachment(f); e.target.value = ''; }} />
//               {attachments.length === 0 ? (
//                 <div className="upload-zone" onClick={() => attachInputRef.current?.click()}
//                   style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '36px 24px' }}>
//                   <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#ECFEFF', border: '1px solid #A5F3FC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     <FolderOpen size={22} color="#0891B2" />
//                   </div>
//                   <div style={{ textAlign: 'center' }}>
//                     <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Attach supporting documents</p>
//                     <p style={{ fontSize: 12, color: '#9CA3AF' }}>Form 16, salary slips, bank statements, etc. · JPG, PNG, PDF · 5 MB each</p>
//                   </div>
//                 </div>
//               ) : (
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
//                   {attachments.map((att, idx) => (
//                     <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14, background: '#FAFAF8', border: '1px solid #E4E4E0', borderRadius: 12, marginBottom: 10 }}>
//                       <div style={{ width: 38, height: 38, borderRadius: 9, background: '#fff', border: '1px solid #E4E4E0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                         {att.file.type.startsWith('image/') ? <ImageIcon size={16} color="#6B7280" /> : <FileText size={16} color="#6B7280" />}
//                       </div>
//                       <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
//                         <p style={{ fontSize: 12, fontWeight: 600, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{att.file.name}</p>
//                         <input type="text" value={att.remark}
//                           onChange={(e) => setAttachments(prev => prev.map((a, i) => i === idx ? { ...a, remark: e.target.value } : a))}
//                           placeholder="Add a label or note (optional)"
//                           className="itr-input-sm" style={{ background: '#fff' }} />
//                       </div>
//                       <button type="button" onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
//                         style={{ width: 30, height: 30, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', flexShrink: 0 }}
//                         onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FEF2F2'; (e.currentTarget as HTMLElement).style.color = '#EF4444'; }}
//                         onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; }}>
//                         <X size={14} />
//                       </button>
//                     </div>
//                   ))}
//                   {attachments.length < 10 && (
//                     <button type="button" onClick={() => attachInputRef.current?.click()}
//                       style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 10, borderRadius: 10, border: '1.5px dashed #D4D0CA', background: 'transparent', cursor: 'pointer', color: '#9CA3AF', fontSize: 12, fontWeight: 500, fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s' }}
//                       onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#0891B2'; (e.currentTarget as HTMLElement).style.color = '#0891B2'; (e.currentTarget as HTMLElement).style.background = '#ECFEFF'; }}
//                       onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#D4D0CA'; (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
//                       <Plus size={13} /> Add another document
//                     </button>
//                   )}
//                 </div>
//               )}
//             </SectionCard>

//             {/* ── § 5 Directorships ── */}
//             <SectionCard className="fade-up-5"
//               icon={<Building2 size={16} color={theme.accent} />} iconBg={theme.badgeBg}
//               title="Directorship / Unlisted Shares"
//               subtitle={`Companies where you hold directorship or unlisted shares${unlistedCnt > 0 ? ` · ${unlistedCnt} unlisted` : ''}`}
//               badge={directorships.length > 0 ? (
//                 <span className="badge-sm" style={{ background: theme.badgeBg, color: theme.accent, border: `1px solid ${theme.badgeBorder}`, fontSize: 11, marginLeft: 6 }}>
//                   {directorships.length}
//                 </span>
//               ) : undefined}
//               rightAction={
//                 <button type="button" onClick={() => setDirectorships(prev => [...prev, emptyDirectorship()])}
//                   style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: `1.5px solid ${theme.badgeBorder}`, background: theme.badgeBg, color: theme.accent, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
//                   <Plus size={13} /> Add Company
//                 </button>
//               }>
//               {directorships.length === 0 ? (
//                 <div className="upload-zone" onClick={() => setDirectorships([emptyDirectorship()])}
//                   style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '40px 24px' }}>
//                   <div style={{ width: 56, height: 56, borderRadius: '50%', background: theme.badgeBg, border: `1px solid ${theme.badgeBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     <Building2 size={24} color={theme.accent} />
//                   </div>
//                   <div style={{ textAlign: 'center' }}>
//                     <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Add Directorship or Unlisted Company</p>
//                     <p style={{ fontSize: 12, color: '#9CA3AF' }}>Skip if you have no directorship or unlisted shareholdings</p>
//                   </div>
//                 </div>
//               ) : (
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
//                   {directorships.map((entry, idx) => (
//                     <DirectorshipCard key={idx} idx={idx} entry={entry} isPremium={isPremium}
//                       onChange={updateDirectorship}
//                       onRemove={(i) => setDirectorships(prev => prev.filter((_, j) => j !== i))} />
//                   ))}
//                   <button type="button" onClick={() => setDirectorships(prev => [...prev, emptyDirectorship()])}
//                     style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 12, borderRadius: 10, border: '1.5px dashed #D4D0CA', background: 'transparent', cursor: 'pointer', color: '#9CA3AF', fontSize: 12, fontWeight: 500, fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s' }}
//                     onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = theme.accent; (e.currentTarget as HTMLElement).style.color = theme.accent; (e.currentTarget as HTMLElement).style.background = theme.badgeBg; }}
//                     onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#D4D0CA'; (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
//                     <Plus size={13} /> Add Another Company
//                   </button>
//                 </div>
//               )}
//             </SectionCard>

//             {/* ── § 6 Foreign Assets ── */}
//             <SectionCard className="fade-up-6"
//               icon={<Globe size={16} color="#0D9488" />} iconBg="#F0FDFA"
//               title="Foreign Income / Assets"
//               subtitle="Bank accounts, securities, property, salary earned outside India"
//               badge={foreignAssets.length > 0 ? (
//                 <span className="badge-sm" style={{ background: '#CCFBF1', color: '#0D9488', border: '1px solid #99F6E4', fontSize: 11, marginLeft: 6 }}>
//                   {foreignAssets.length}
//                 </span>
//               ) : undefined}
//               rightAction={!addingForeign && editForeignIdx === null ? (
//                 <button type="button" onClick={() => setAddingForeign(true)}
//                   style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: '1.5px solid #99F6E4', background: '#F0FDFA', color: '#0D9488', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
//                   <Plus size={13} /> Add Entry
//                 </button>
//               ) : undefined}>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//                 {(addingForeign || editForeignIdx !== null) && (
//                   <ForeignAssetForm
//                     entry={editForeignIdx !== null ? foreignAssets[editForeignIdx] : emptyForeignAsset()}
//                     isEdit={editForeignIdx !== null}
//                     onSave={(entry) => {
//                       if (editForeignIdx !== null) {
//                         setForeignAssets(prev => prev.map((a, i) => i === editForeignIdx ? entry : a));
//                         setEditForeignIdx(null);
//                       } else {
//                         setForeignAssets(prev => [...prev, entry]);
//                         setAddingForeign(false);
//                       }
//                     }}
//                     onCancel={() => { setAddingForeign(false); setEditForeignIdx(null); }}
//                   />
//                 )}

//                 {foreignAssets.length === 0 && !addingForeign ? (
//                   <div className="upload-zone" onClick={() => setAddingForeign(true)}
//                     style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '40px 24px' }}>
//                     <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#F0FDFA', border: '1px solid #99F6E4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                       <Globe size={24} color="#0D9488" />
//                     </div>
//                     <div style={{ textAlign: 'center' }}>
//                       <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Add Foreign Income / Asset</p>
//                       <p style={{ fontSize: 12, color: '#9CA3AF' }}>Skip if you have no foreign income or assets abroad</p>
//                     </div>
//                   </div>
//                 ) : foreignAssets.length > 0 ? (
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
//                     {foreignAssets.map((asset, idx) => (
//                       <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: '#F0FDFA', border: '1px solid #99F6E4', borderRadius: 12, marginBottom: 8 }}>
//                         <div style={{ width: 36, height: 36, borderRadius: 9, background: '#CCFBF1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                           <Globe size={16} color="#0D9488" />
//                         </div>
//                         <div style={{ flex: 1, minWidth: 0 }}>
//                           <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                             {asset.countryName} — {asset.incomeSource}
//                           </p>
//                           <p style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
//                             {asset.assetType}{asset.amount ? ` · ₹${Number(asset.amount).toLocaleString('en-IN')}` : ''}
//                           </p>
//                         </div>
//                         <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
//                           <button type="button" onClick={() => { setEditForeignIdx(idx); setAddingForeign(false); }}
//                             style={{ padding: 7, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#0D9488', display: 'flex' }}>
//                             <Edit2 size={14} />
//                           </button>
//                           <button type="button" onClick={() => setForeignAssets(prev => prev.filter((_, i) => i !== idx))}
//                             style={{ padding: 7, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}
//                             onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#EF4444'; (e.currentTarget as HTMLElement).style.background = '#FEF2F2'; }}
//                             onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                     {!addingForeign && editForeignIdx === null && (
//                       <button type="button" onClick={() => setAddingForeign(true)}
//                         style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 10, borderRadius: 10, border: '1.5px dashed #D4D0CA', background: 'transparent', cursor: 'pointer', color: '#9CA3AF', fontSize: 12, fontWeight: 500, fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s' }}
//                         onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#0D9488'; (e.currentTarget as HTMLElement).style.color = '#0D9488'; (e.currentTarget as HTMLElement).style.background = '#F0FDFA'; }}
//                         onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#D4D0CA'; (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
//                         <Plus size={13} /> Add another entry
//                       </button>
//                     )}
//                   </div>
//                 ) : null}
//               </div>
//             </SectionCard>

//             {/* ── § 7 Notes ── */}
//             <SectionCard className="fade-up-7"
//               icon={<StickyNote size={16} color="#D97706" />} iconBg="#FFFBEB"
//               title="Additional Notes" subtitle="Optional — anything else our CA team should know">
//               <textarea value={otherNotes} onChange={(e) => setOtherNotes(e.target.value)} rows={4}
//                 placeholder="e.g. I have capital gains from US stocks, ESOP vesting from previous employer, rental income from Dubai — please check attached bank interest certificate too…"
//                 className="itr-input" style={{ resize: 'vertical', lineHeight: 1.7, minHeight: 100 }} />
//               <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 6 }}>{otherNotes.length}/800 characters</p>
//             </SectionCard>

//             {/* ── Disclaimer ── */}
//             <div className="fade-up-8" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 16px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12 }}>
//               <AlertCircle size={15} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }} />
//               <p style={{ fontSize: 12, color: '#92400E', lineHeight: 1.65 }}>
//                 <strong>Before submitting:</strong> Ensure documents are clear and legible. Foreign assets and income
//                 must be disclosed per FEMA and Schedule FA/FSI requirements. All files are AES-256 encrypted and handled by verified CAs only.
//               </p>
//             </div>

//             {/* ── Submit ── */}
//             <button type="button" onClick={handleSubmit} disabled={submitting}
//               className="submit-btn fade-up-8"
//               style={{ background: `linear-gradient(135deg,${theme.gradFrom},${theme.gradTo})`, boxShadow: `0 4px 24px ${theme.shadow}` }}>
//               {submitting ? (
//                 <>
//                   <div className="spin-anim" style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white' }} />
//                   Submitting your details…
//                 </>
//               ) : (
//                 <>
//                   <Send size={16} />
//                   Submit to CA Team
//                 </>
//               )}
//             </button>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Upload, X, Plus, FileText, Image as ImageIcon,
  CheckCircle2, AlertCircle, Crown, Globe,
  Phone, Mail, StickyNote, Paperclip,
  Building2, Hash, ChevronDown, ChevronUp, Trash2,
  Edit2, Check, DollarSign, CreditCard, FolderOpen, Send, User,
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

interface ForeignAsset {
  assetType: string; countryName: string;
  incomeSource: string; amount: string; remark: string;
}

// ─── isListed defaults to false so no form shows on initial add ───
const emptyDirectorship = (): DirectorshipEntry => ({
  companyName: '', companyPan: '', companyType: '', isListed: false, din: '',
  openingNoOfShares: '', openingCostOfAcquisition: '',
  acquiredNoOfShares: '', acquiredDate: '', acquiredFaceValue: '',
  acquiredIssuePrice: '', acquiredPurchasePrice: '',
  transferredNoOfShares: '', transferredSaleConsideration: '',
  closingNoOfShares: '', closingCostOfAcquisition: '',
});

const emptyForeignAsset = (): ForeignAsset => ({
  assetType: 'Foreign Asset', countryName: '', incomeSource: '', amount: '', remark: '',
});

// ─── Injected Styles ──────────────────────────────────────────────────────────
const GlobalStyles: React.FC<{ isPremium: boolean }> = ({ isPremium }) => {
  const accent = isPremium ? '#7C3AED' : '#059669';
  const accentLight = isPremium ? 'rgba(124,58,237,0.10)' : 'rgba(5,150,105,0.10)';
  const accentBorder = isPremium ? '#C4B5FD' : '#6EE7B7';

  return (
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
        border-color: ${accent};
        background: #fff;
        box-shadow: 0 0 0 3px ${accentLight};
      }

      .itr-input-sm {
        width: 100%;
        padding: 8px 12px;
        border: 1.5px solid #E4E4E0;
        border-radius: 9px;
        font-size: 13px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: #111827;
        background: #fff;
        transition: all 0.18s ease;
        outline: none;
      }
      .itr-input-sm::placeholder { color: #AEAAA6; }
      .itr-input-sm:focus {
        border-color: ${accent};
        background: #fff;
        box-shadow: 0 0 0 3px ${accentLight};
      }

      .upload-zone {
        border: 1.5px dashed #D4D0CA;
        border-radius: 12px;
        background: #FAFAF8;
        transition: all 0.2s ease;
        cursor: pointer;
      }
      .upload-zone:hover, .upload-zone.dragging {
        border-color: ${accent};
        background: ${accentLight};
      }
      .upload-filled {
        background: #F0FDF4;
        border: 1.5px solid #86EFAC;
        border-radius: 12px;
      }

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

      .step-line {
        position: absolute;
        left: 19px; top: 44px; bottom: -8px;
        width: 2px;
        background: linear-gradient(to bottom, #E4E4E0, transparent);
      }
      .step-line.done { background: linear-gradient(to bottom, ${accent}, ${accentBorder}); }

      .progress-step .step-icon {
        width: 40px; height: 40px; border-radius: 50%;
        border: 2px solid #D4D0CA;
        background: #F5F5F2; color: #AEAAA6;
        display: flex; align-items: center; justify-content: center;
        font-size: 13px; font-weight: 700;
        transition: all 0.3s ease;
        position: relative; z-index: 1; flex-shrink: 0;
      }
      .progress-step.active .step-icon {
        background: ${accent}; border-color: ${accent};
        color: white;
        box-shadow: 0 0 0 4px ${accentLight};
      }
      .progress-step.done .step-icon {
        background: #059669; border-color: #059669; color: white;
      }

      .submit-btn {
        border-radius: 14px; padding: 16px 32px;
        font-weight: 700; font-size: 15px; color: white;
        border: none; cursor: pointer;
        width: 100%; display: flex; align-items: center;
        justify-content: center; gap: 10px;
        transition: all 0.2s ease;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      .submit-btn:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.05); }
      .submit-btn:active:not(:disabled) { transform: translateY(0); }
      .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

      .toggle-btn {
        padding: 10px 16px; border-radius: 10px;
        border: 2px solid #E4E4E0; background: transparent;
        font-size: 13px; font-weight: 600;
        cursor: pointer; transition: all 0.18s ease;
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: #6B7280;
      }
      .toggle-btn.selected-accent {
        border-color: ${accent}; background: ${accentLight}; color: ${accent};
      }
      .toggle-btn.selected-emerald {
        border-color: #059669; background: #ECFDF5; color: #059669;
      }
      .toggle-btn.selected-amber {
        border-color: #D97706; background: #FFFBEB; color: #D97706;
      }
      .toggle-btn:not(.selected-accent):not(.selected-emerald):not(.selected-amber):hover {
        border-color: #9CA3AF;
      }

      .dir-section-tag {
        display: inline-flex; align-items: center; gap: 5px;
        padding: 2px 8px; border-radius: 4px;
        font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
        text-transform: uppercase; background: #F0EFEB; color: #6B7280;
      }

      .foreign-form-bg {
        background: #F0FDFA;
        border: 1px solid #99F6E4;
        border-radius: 14px; padding: 20px;
      }

      .badge-sm {
        display: inline-flex; align-items: center; gap: 4px;
        padding: 3px 8px; border-radius: 99px;
        font-size: 11px; font-weight: 700;
      }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .fade-up   { animation: fadeUp 0.45s ease both; }
      .fade-up-1 { animation-delay: 0.04s; }
      .fade-up-2 { animation-delay: 0.10s; }
      .fade-up-3 { animation-delay: 0.16s; }
      .fade-up-4 { animation-delay: 0.22s; }
      .fade-up-5 { animation-delay: 0.28s; }
      .fade-up-6 { animation-delay: 0.34s; }
      .fade-up-7 { animation-delay: 0.40s; }
      .fade-up-8 { animation-delay: 0.46s; }

      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.85); }
        to   { opacity: 1; transform: scale(1); }
      }
      .scale-in { animation: scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
      .spin-anim { animation: spin 0.8s linear infinite; }

      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #D4D0CA; border-radius: 10px; }

      @media (min-width: 860px) { .sidebar-block { display: block !important; } }
    `}</style>
  );
};

// ─── Theme helper ─────────────────────────────────────────────────────────────
const useTheme = (isPremium: boolean) => ({
  accent: isPremium ? '#7C3AED' : '#059669',
  accentLight: isPremium ? 'rgba(124,58,237,0.08)' : 'rgba(5,150,105,0.08)',
  gradFrom: isPremium ? '#7C3AED' : '#059669',
  gradTo: isPremium ? '#6D28D9' : '#047857',
  shadow: isPremium ? 'rgba(124,58,237,0.35)' : 'rgba(5,150,105,0.35)',
  badgeBg: isPremium ? '#EDE9FE' : '#D1FAE5',
  badgeColor: isPremium ? '#7C3AED' : '#059669',
  badgeBorder: isPremium ? '#C4B5FD' : '#6EE7B7',
  label: isPremium ? 'Premium' : 'Elite',
});

// ─── Sidebar step config ──────────────────────────────────────────────────────
const mkSteps = (isPremium: boolean) => [
  { label: 'Contact', sub: 'Mobile & email', icon: User },
  { label: 'Aadhaar', sub: 'Front & back', icon: ImageIcon },
  { label: 'PAN Card', sub: 'Front & back', icon: CreditCard },
  { label: 'Documents', sub: 'Supporting files', icon: FolderOpen },
  { label: 'Directorships', sub: 'Companies & shares', icon: Building2 },
  { label: 'Foreign Assets', sub: 'Overseas income', icon: Globe },
  { label: 'Notes & Submit', sub: 'Review & confirm', icon: Send },
];

// ─── Sidebar Progress ─────────────────────────────────────────────────────────
const SidebarProgress: React.FC<{ activeStep: number; isPremium: boolean }> = ({ activeStep, isPremium }) => {
  const theme = useTheme(isPremium);
  const STEPS = mkSteps(isPremium);

  return (
    <aside style={{ width: 260, flexShrink: 0, position: 'sticky', top: 72, alignSelf: 'flex-start', paddingBottom: 40 }}>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#AEAAA6', marginBottom: 4 }}>
          Filing Progress
        </p>
        <div style={{ height: 4, background: '#F0EFEB', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${Math.round(((activeStep + 1) / STEPS.length) * 100)}%`,
            background: `linear-gradient(90deg, ${theme.gradFrom}, ${theme.accent})`,
            borderRadius: 99, transition: 'width 0.4s ease',
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
            <div key={i} className={`progress-step ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}
              style={{ display: 'flex', gap: 14, position: 'relative', paddingBottom: i < STEPS.length - 1 ? 24 : 0 }}>
              {i < STEPS.length - 1 && <div className={`step-line ${isDone ? 'done' : ''}`} />}
              <div className="step-icon">
                {isDone ? <Check size={16} /> : <Icon size={16} />}
              </div>
              <div style={{ paddingTop: 9 }}>
                <p style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? '#111827' : isDone ? theme.accent : '#9CA3AF', lineHeight: 1 }}>
                  {step.label}
                </p>
                <p style={{ fontSize: 11, color: '#AEAAA6', marginTop: 3 }}>{step.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust badge */}
      <div style={{
        marginTop: 32, padding: '14px 16px',
        background: isPremium ? 'linear-gradient(135deg,#EDE9FE,#F5F3FF)' : 'linear-gradient(135deg,#D1FAE5,#ECFDF5)',
        border: `1px solid ${theme.badgeBorder}`, borderRadius: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Crown size={14} color={theme.accent} />
          <span style={{ fontSize: 12, fontWeight: 700, color: theme.accent }}>{theme.label} Plan Benefits</span>
        </div>
        <p style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.6 }}>
          Dedicated CA, directorship disclosures, foreign asset reporting & priority support.
        </p>
      </div>
    </aside>
  );
};

// ─── Section Card ─────────────────────────────────────────────────────────────
const SectionCard: React.FC<{
  icon: React.ReactNode; iconBg: string;
  title: string; subtitle?: string;
  rightAction?: React.ReactNode;
  children: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}> = ({ icon, iconBg, title, subtitle, rightAction, children, badge, className }) => (
  <div className={`itr-card fade-up ${className || ''}`}>
    <div className="section-header">
      <div className="section-icon" style={{ background: iconBg }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: 8 }}>
          {title}{badge}
        </h2>
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
    {children}{required && <span style={{ color: '#EF4444', marginLeft: 2 }}>*</span>}
  </label>
);

const MiniLabel: React.FC<{ children: React.ReactNode; required?: boolean }> = ({ children, required }) => (
  <label style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: 5 }}>
    {children}{required && <span style={{ color: '#EF4444', marginLeft: 2 }}>*</span>}
  </label>
);

// ─── File Upload Zone ─────────────────────────────────────────────────────────
const FileUploadZone: React.FC<{
  label: string; sub: string; value: UploadFile; onChange: (v: UploadFile) => void;
}> = ({ label, sub, value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) { toast.error('Only JPG, PNG, or PDF allowed'); return; }
    if (file.size > 2 * 1024 * 1024) { toast.error('Max 2 MB'); return; }
    onChange({ file, preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null });
  };

  const isPdf = value.file?.type === 'application/pdf';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <FieldLabel required>{label}</FieldLabel>
      <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: -4 }}>{sub}</p>

      {value.file ? (
        <div className="upload-filled" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', background: '#fff', border: '1px solid #86EFAC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {value.preview ? <img src={value.preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <FileText size={18} color="#16A34A" />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#15803D', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value.file.name}</p>
            <p style={{ fontSize: 11, color: '#22C55E', marginTop: 2 }}>{(value.file.size / 1024).toFixed(0)} KB · {isPdf ? 'PDF' : 'Image'}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', background: '#DCFCE7', borderRadius: 99, fontSize: 10, fontWeight: 700, color: '#16A34A' }}>
              <Check size={10} /> Uploaded
            </span>
            <button type="button" onClick={() => onChange({ file: null, preview: null })}
              style={{ padding: 6, borderRadius: 8, border: 'none', cursor: 'pointer', background: 'rgba(220,252,231,0.5)', color: '#16A34A', display: 'flex' }}>
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div className={`upload-zone ${dragging ? 'dragging' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onClick={() => inputRef.current?.click()}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '28px 16px' }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#fff', border: '1px solid #E4E4E0', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Upload size={16} color={dragging ? '#7C3AED' : '#9CA3AF'} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>
              <span style={{ color: '#7C3AED' }}>Click to upload</span>
              <span style={{ color: '#6B7280', fontWeight: 400 }}> or drag & drop</span>
            </p>
            <p style={{ fontSize: 11, color: '#AEAAA6' }}>JPG, PNG, PDF · Max 2 MB</p>
          </div>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,application/pdf" style={{ display: 'none' }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} />
    </div>
  );
};

// ─── Num Input ────────────────────────────────────────────────────────────────
const NumInput: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder?: string; isDate?: boolean }> =
  ({ label, value, onChange, placeholder, isDate }) => (
    <div>
      <MiniLabel>{label}</MiniLabel>
      <input type={isDate ? 'date' : 'text'} value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || '0'}
        className="itr-input-sm" />
    </div>
  );

// ─── Directorship Card ────────────────────────────────────────────────────────
const DirectorshipCard: React.FC<{
  idx: number; entry: DirectorshipEntry; isPremium: boolean;
  onChange: (idx: number, field: keyof DirectorshipEntry, value: any) => void;
  onRemove: (idx: number) => void;
}> = ({ idx, entry, isPremium, onChange, onRemove }) => {
  const [expanded, setExpanded] = useState(true);
  const theme = useTheme(isPremium);
  const set = (field: keyof DirectorshipEntry) => (value: any) => onChange(idx, field, value);

  return (
    <div style={{ border: '1px solid #E4E4E0', borderRadius: 14, overflow: 'hidden', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: '#F7F7F5', borderBottom: '1px solid #F0EFEB' }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg,${theme.gradFrom},${theme.gradTo})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Building2 size={15} color="white" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {entry.companyName || `Company ${idx + 1}`}
          </p>
          <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
            {entry.companyPan || 'PAN not entered'}
            {' · '}
            <span style={{ fontWeight: 600, color: entry.isListed ? '#059669' : '#D97706' }}>
              {entry.isListed ? 'Listed' : 'Unlisted'}
            </span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          <button type="button" onClick={() => setExpanded(v => !v)}
            style={{ padding: 7, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
          <button type="button" onClick={() => onRemove(idx)}
            style={{ padding: 7, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#EF4444'; (e.currentTarget as HTMLElement).style.background = '#FEF2F2'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {expanded && (
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Company basic info */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 16 }}>
            <div>
              <FieldLabel required>Company Name</FieldLabel>
              <input type="text" value={entry.companyName} onChange={(e) => set('companyName')(e.target.value)}
                placeholder="Full legal name" className="itr-input" />
            </div>
            <div>
              <FieldLabel required>Company PAN</FieldLabel>
              <input type="text" value={entry.companyPan}
                onChange={(e) => set('companyPan')(e.target.value.toUpperCase())} maxLength={10}
                placeholder="AABCD1234E" className="itr-input"
                style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }} />
            </div>
            <div>
              <FieldLabel>DIN Number</FieldLabel>
              <div style={{ position: 'relative' }}>
                <Hash size={14} color="#9CA3AF" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type="text" value={entry.din} onChange={(e) => set('din')(e.target.value)}
                  placeholder="12345678" className="itr-input" style={{ paddingLeft: 34 }} />
              </div>
            </div>
            <div>
              <FieldLabel>Company Type</FieldLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {(['Domestic', 'Foreign'] as const).map(t => (
                  <button key={t} type="button" onClick={() => set('companyType')(t)}
                    className={`toggle-btn ${entry.companyType === t ? 'selected-accent' : ''}`}
                    style={{ padding: '9px 0', textAlign: 'center', fontSize: 13 }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Listing status */}
          <div>
            <FieldLabel required>Share Listing Status</FieldLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { val: true, label: 'Listed', desc: 'Traded on stock exchange — details required', cls: 'selected-emerald' },
                { val: false, label: 'Unlisted', desc: 'Not on exchange', cls: 'selected-amber' },
              ].map(({ val, label, desc, cls }) => (
                <button key={label} type="button" onClick={() => set('isListed')(val)}
                  className={`toggle-btn ${entry.isListed === val ? cls : ''}`}
                  style={{ textAlign: 'left', padding: '12px 14px', height: 'auto' }}>
                  <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{label}</p>
                  <p style={{ fontSize: 11, fontWeight: 400, color: '#9CA3AF', lineHeight: 1.4 }}>{desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* ─── Show Schedule AL form ONLY when isListed is TRUE (Listed) ─── */}
          {entry.isListed && (
            <div style={{ border: '1px solid #BBF7D0', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: '#F0FDF4', borderBottom: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Building2 size={13} color="white" />
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#14532D' }}>Listed Share Details — Schedule AL</p>
                  <p style={{ fontSize: 11, color: '#166534', marginTop: 1 }}>Mandatory disclosure for listed shareholdings</p>
                </div>
              </div>

              <div style={{ padding: 18, background: 'rgba(240,253,244,0.4)', display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  {
                    letter: 'A', label: 'Opening Balance', fields: [
                      { key: 'openingNoOfShares', label: 'No. of Shares (Col 4)', placeholder: '7000' },
                      { key: 'openingCostOfAcquisition', label: 'Cost of Acquisition ₹ (Col 5)', placeholder: '70000' },
                    ]
                  },
                  {
                    letter: 'B', label: 'Shares Acquired During Year', fields: [
                      { key: 'acquiredNoOfShares', label: 'No. of Shares (Col 6)', placeholder: '500' },
                      { key: 'acquiredDate', label: 'Date of Purchase (Col 7)', isDate: true },
                      { key: 'acquiredFaceValue', label: 'Face Value/Share ₹ (Col 8)', placeholder: '10' },
                      { key: 'acquiredIssuePrice', label: 'Issue Price/Share ₹ (Col 9)', placeholder: '100' },
                      { key: 'acquiredPurchasePrice', label: 'Purchase Price/Share ₹ (Col 10)', placeholder: '0' },
                    ]
                  },
                  {
                    letter: 'C', label: 'Shares Transferred', fields: [
                      { key: 'transferredNoOfShares', label: 'No. of Shares Transferred (Col 11)', placeholder: '0' },
                      { key: 'transferredSaleConsideration', label: 'Sale Consideration ₹ (Col 12)', placeholder: '0' },
                    ]
                  },
                  {
                    letter: 'D', label: 'Closing Balance', fields: [
                      { key: 'closingNoOfShares', label: 'No. of Shares (Col 13)', placeholder: '7000' },
                      { key: 'closingCostOfAcquisition', label: 'Cost of Acquisition ₹ (Col 14)', placeholder: '70000' },
                    ]
                  },
                ].map(({ letter, label, fields }) => (
                  <div key={letter}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#059669', flexShrink: 0 }}>
                        {letter}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
                      {fields.map((f: any) => (
                        <NumInput key={f.key} label={f.label} value={(entry as any)[f.key]}
                          onChange={set(f.key as keyof DirectorshipEntry)}
                          placeholder={f.placeholder} isDate={f.isDate} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Foreign Asset Form ───────────────────────────────────────────────────────
const ForeignAssetForm: React.FC<{
  entry: ForeignAsset; onSave: (e: ForeignAsset) => void; onCancel: () => void; isEdit: boolean;
}> = ({ entry: initialEntry, onSave, onCancel, isEdit }) => {
  const [entry, setEntry] = useState<ForeignAsset>(initialEntry);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: keyof ForeignAsset) => (v: string) => {
    setEntry(p => ({ ...p, [k]: v }));
    setErrors(p => { const n = { ...p }; delete n[k]; return n; });
  };

  const save = () => {
    const errs: Record<string, string> = {};
    if (!entry.countryName.trim()) errs.countryName = 'Country is required';
    if (!entry.incomeSource.trim()) errs.incomeSource = 'Income source is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave(entry);
  };

  return (
    <div className="foreign-form-bg">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#0F766E', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {isEdit ? 'Edit Entry' : 'New Foreign Income / Asset'}
        </p>
        <button type="button" onClick={onCancel}
          style={{ padding: 6, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#0F766E', display: 'flex' }}>
          <X size={14} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 14 }}>
        <div>
          <MiniLabel>Asset / Income Type</MiniLabel>
          <select value={entry.assetType} onChange={(e) => set('assetType')(e.target.value)}
            className="itr-input-sm" style={{ background: '#fff' }}>
            <option>Foreign Asset</option>
            <option>Foreign Income</option>
            <option>Foreign Bank Account</option>
            <option>Foreign Immovable Property</option>
            <option>Foreign Stocks / Equity</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <MiniLabel required>Country Name</MiniLabel>
          <input type="text" value={entry.countryName} onChange={(e) => set('countryName')(e.target.value)}
            placeholder="USA, UK, UAE…"
            className="itr-input-sm"
            style={{ borderColor: errors.countryName ? '#EF4444' : undefined, background: errors.countryName ? '#FEF2F2' : '#fff' }} />
          {errors.countryName && <p style={{ fontSize: 11, color: '#EF4444', marginTop: 4 }}>{errors.countryName}</p>}
        </div>
        <div>
          <MiniLabel required>Source of Income</MiniLabel>
          <input type="text" value={entry.incomeSource} onChange={(e) => set('incomeSource')(e.target.value)}
            placeholder="Salary, Dividends, Rent…"
            className="itr-input-sm"
            style={{ borderColor: errors.incomeSource ? '#EF4444' : undefined, background: errors.incomeSource ? '#FEF2F2' : '#fff' }} />
          {errors.incomeSource && <p style={{ fontSize: 11, color: '#EF4444', marginTop: 4 }}>{errors.incomeSource}</p>}
        </div>
        <div>
          <MiniLabel>Amount (₹ Equivalent)</MiniLabel>
          <div style={{ position: 'relative' }}>
            <DollarSign size={13} color="#9CA3AF" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input type="text" value={entry.amount} onChange={(e) => set('amount')(e.target.value)}
              placeholder="INR equivalent" className="itr-input-sm" style={{ paddingLeft: 28, background: '#fff' }} />
          </div>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <MiniLabel>Remarks / Additional Details</MiniLabel>
          <textarea value={entry.remark} onChange={(e) => set('remark')(e.target.value)} rows={2}
            placeholder="Acquisition date, account number, specific context…"
            className="itr-input-sm" style={{ resize: 'vertical', lineHeight: 1.6 }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16, paddingTop: 14, borderTop: '1px solid #99F6E4' }}>
        <button type="button" onClick={onCancel}
          style={{ padding: '8px 16px', borderRadius: 9, border: '1px solid #D4D0CA', background: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#6B7280', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Cancel
        </button>
        <button type="button" onClick={save}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 20px', borderRadius: 9, border: 'none', background: '#0D9488', color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 2px 8px rgba(13,148,136,0.3)' }}>
          <Check size={13} /> {isEdit ? 'Update Entry' : 'Add Entry'}
        </button>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export const ItrPremiumFormPage: React.FC = () => {
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
  const [foreignAssets, setForeignAssets] = useState<ForeignAsset[]>([]);
  const [addingForeign, setAddingForeign] = useState(false);
  const [editForeignIdx, setEditForeignIdx] = useState<number | null>(null);
  const attachInputRef = useRef<HTMLInputElement>(null);

  const planType = (orderItem?.planType || '').toUpperCase();
  const isElite = planType.includes('ELITE');
  const isPremium = !isElite;
  const theme = useTheme(isPremium);
  const apiEndpoint = isElite ? 'elite' : 'premium';

  const getActiveStep = () => {
    if (!mobileNo || !emailId) return 0;
    if (!aadhaarFront.file || !aadhaarBack.file) return 1;
    if (!panFront.file || !panBack.file) return 2;
    if (attachments.length === 0) return 3;
    if (directorships.length === 0) return 4;
    if (foreignAssets.length === 0) return 5;
    return 6;
  };

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
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) { toast.error('Only JPG, PNG, or PDF allowed'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('Max 5 MB'); return; }
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
      if (foreignAssets.length > 0) {
        fd.append('foreignAssets', JSON.stringify(foreignAssets.map(a => ({
          assetType: a.assetType, countryName: a.countryName,
          incomeSource: a.incomeSource,
          amount: a.amount ? Number(a.amount) : 0,
          remark: a.remark || null,
        }))));
      }

      const remarks: string[] = [];
      attachments.forEach(a => { fd.append('attachments', a.file); remarks.push(a.remark || ''); });
      if (remarks.length) fd.append('attachmentRemarks', JSON.stringify(remarks));

      const token = localStorage.getItem('token');
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${API}/itr/${apiEndpoint}`, { method: 'POST', headers, credentials: 'include', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setSubmitted(true);
      toast.success('Details submitted successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong.');
    } finally { setSubmitting(false); }
  };

  const planPrice = orderItem?.price ? `₹${Number(orderItem.price).toLocaleString('en-IN')}` : '';
  const listedCnt = directorships.filter(d => d.isListed).length;
  const activeStep = getActiveStep();

  // ── Loading ──
  if (loadingOrder) {
    return (
      <>
        <GlobalStyles isPremium={true} />
        <div className="itr-root" style={{ minHeight: '100vh', background: '#F7F7F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
          <div className="spin-anim" style={{ width: 52, height: 52, borderRadius: '50%', border: '3px solid #E4E4E0', borderTopColor: '#7C3AED' }} />
          <p style={{ fontSize: 13, color: '#9CA3AF', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Loading your order…</p>
        </div>
      </>
    );
  }

  // ── Success ──
  if (submitted) {
    return (
      <>
        <GlobalStyles isPremium={isPremium} />
        <div className="itr-root" style={{ minHeight: '100vh', background: '#F7F7F5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div className="itr-card scale-in" style={{ maxWidth: 460, width: '100%', textAlign: 'center', padding: 48 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: `linear-gradient(135deg,${theme.badgeBg},${theme.badgeBg})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: `0 0 0 8px ${theme.accentLight}`,
            }}>
              <CheckCircle2 size={32} color={theme.accent} />
            </div>
            <span className="badge-sm" style={{ background: theme.badgeBg, color: theme.accent, border: `1px solid ${theme.badgeBorder}`, marginBottom: 16, display: 'inline-flex' }}>
              <Crown size={10} /> {theme.label} Plan
            </span>
            <h2 className="itr-display" style={{ fontSize: 28, fontWeight: 600, color: '#111827', marginBottom: 10 }}>
              All done!
            </h2>
            <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, marginBottom: 28 }}>
              Your ITR {theme.label} details have been received. Our dedicated CA will review your documents
              and reach out within <strong style={{ color: '#374151' }}>1–2 business days</strong>.
            </p>
            {orderItem && (
              <div style={{ background: '#F7F7F5', border: '1px solid #E4E4E0', borderRadius: 12, padding: '14px 18px', marginBottom: 28, textAlign: 'left' }}>
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
            <button onClick={() => navigate('/dashboard', { state: { triggerPaymentForOrder: orderItem?.orderId } })} className="submit-btn"
              style={{ background: `linear-gradient(135deg,${theme.gradFrom},${theme.gradTo})`, boxShadow: `0 4px 24px ${theme.shadow}` }}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <GlobalStyles isPremium={isPremium} />
      <div className="itr-root" style={{ minHeight: '100vh', background: '#F7F7F5' }}>

        {/* ── Top Nav ── */}
        <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E4E4E0' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => navigate('/dashboard')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#6B7280', fontSize: 13, fontWeight: 500, fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F5F5F2'; (e.currentTarget as HTMLElement).style.color = '#111827'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#6B7280'; }}>
              <ArrowLeft size={15} /> Dashboard
            </button>

            <div style={{ width: 1, height: 20, background: '#E4E4E0' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg,${theme.gradFrom},${theme.gradTo})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Crown size={15} color="white" />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', lineHeight: 1 }}>
                  {orderItem?.serviceName || 'Income Tax Return'}
                </p>
                {(planPrice || orderItem?.orderNumber) && (
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                    {orderItem?.orderNumber}{planPrice ? ` · ${planPrice}` : ''}
                  </p>
                )}
              </div>
            </div>

            <span className="badge-sm" style={{ background: theme.badgeBg, color: theme.accent, border: `1px solid ${theme.badgeBorder}` }}>
              <Crown size={10} /> {theme.label} Plan
            </span>
          </div>
        </nav>

        {/* ── Page body ── */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px', display: 'flex', gap: 40, alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <div className="sidebar-block" style={{ display: 'none' }}>
            <SidebarProgress activeStep={activeStep} isPremium={isPremium} />
          </div>

          {/* Form column */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Title */}
            <div className="fade-up">
              <h1 className="itr-display" style={{ fontSize: 32, fontWeight: 600, color: '#111827', lineHeight: 1.15, marginBottom: 6 }}>
                File your ITR
              </h1>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6 }}>
                Complete each section below. Your dedicated CA handles filing, disclosures, and foreign asset reporting.
              </p>
            </div>

            {/* ── § 1 Contact ── */}
            <SectionCard className="fade-up-1"
              icon={<Phone size={16} color={theme.accent} />} iconBg={theme.badgeBg}
              title="Contact Information" subtitle="We'll send filing updates and CA queries here">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 20 }}>
                <div>
                  <FieldLabel required>Mobile Number</FieldLabel>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 13, fontWeight: 500, color: '#9CA3AF', borderRight: '1px solid #E4E4E0', paddingRight: 8, pointerEvents: 'none' }}>+91</span>
                    <input type="tel" value={mobileNo} onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="98XXXXXXXX" maxLength={10} className="itr-input" style={{ paddingLeft: 56 }} />
                  </div>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 5 }}>Indian mobile number only</p>
                </div>
                <div>
                  <FieldLabel required>Email Address</FieldLabel>
                  <div style={{ position: 'relative' }}>
                    <Mail size={15} color="#9CA3AF" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)}
                      placeholder="you@example.com" className="itr-input" style={{ paddingLeft: 36 }} />
                  </div>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 5 }}>Filing receipts sent here</p>
                </div>
              </div>
            </SectionCard>

            {/* ── § 2 Aadhaar ── */}
            <SectionCard className="fade-up-2"
              icon={<ImageIcon size={16} color="#EA580C" />} iconBg="#FFF7ED"
              title="Aadhaar Card" subtitle="Upload front & back — must be clearly legible">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 20 }}>
                <FileUploadZone label="Aadhaar — Front Side" sub="Side with your photo & name" value={aadhaarFront} onChange={setAadhaarFront} />
                <FileUploadZone label="Aadhaar — Back Side" sub="Side with your address" value={aadhaarBack} onChange={setAadhaarBack} />
              </div>
            </SectionCard>

            {/* ── § 3 PAN ── */}
            <SectionCard className="fade-up-3"
              icon={<CreditCard size={16} color="#059669" />} iconBg="#ECFDF5"
              title="PAN Card" subtitle="Upload front & back — PAN number must be visible">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 20 }}>
                <FileUploadZone label="PAN Card — Front Side" sub="Name, DOB & PAN number" value={panFront} onChange={setPanFront} />
                <FileUploadZone label="PAN Card — Back Side" sub="Back of the PAN card" value={panBack} onChange={setPanBack} />
              </div>
            </SectionCard>

            {/* ── § 4 Attachments ── */}
            <SectionCard className="fade-up-4"
              icon={<Paperclip size={16} color="#0891B2" />} iconBg="#ECFEFF"
              title="Supporting Documents" subtitle="Optional — Form 16, salary slips, bank statements"
              rightAction={attachments.length > 0 && attachments.length < 10 ? (
                <button type="button" onClick={() => attachInputRef.current?.click()}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: '1.5px solid #A5F3FC', background: '#ECFEFF', color: '#0891B2', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  <Plus size={13} /> Add File
                </button>
              ) : undefined}>
              <input ref={attachInputRef} type="file" accept="image/jpeg,image/png,application/pdf" style={{ display: 'none' }}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) addAttachment(f); e.target.value = ''; }} />
              {attachments.length === 0 ? (
                <div className="upload-zone" onClick={() => attachInputRef.current?.click()}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '36px 24px' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#ECFEFF', border: '1px solid #A5F3FC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FolderOpen size={22} color="#0891B2" />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Attach supporting documents</p>
                    <p style={{ fontSize: 12, color: '#9CA3AF' }}>Form 16, salary slips, bank statements, etc. · JPG, PNG, PDF · 5 MB each</p>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {attachments.map((att, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14, background: '#FAFAF8', border: '1px solid #E4E4E0', borderRadius: 12, marginBottom: 10 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 9, background: '#fff', border: '1px solid #E4E4E0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {att.file.type.startsWith('image/') ? <ImageIcon size={16} color="#6B7280" /> : <FileText size={16} color="#6B7280" />}
                      </div>
                      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <p style={{ fontSize: 12, fontWeight: 600, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{att.file.name}</p>
                        <input type="text" value={att.remark}
                          onChange={(e) => setAttachments(prev => prev.map((a, i) => i === idx ? { ...a, remark: e.target.value } : a))}
                          placeholder="Add a label or note (optional)"
                          className="itr-input-sm" style={{ background: '#fff' }} />
                      </div>
                      <button type="button" onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
                        style={{ width: 30, height: 30, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', flexShrink: 0 }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FEF2F2'; (e.currentTarget as HTMLElement).style.color = '#EF4444'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; }}>
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {attachments.length < 10 && (
                    <button type="button" onClick={() => attachInputRef.current?.click()}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 10, borderRadius: 10, border: '1.5px dashed #D4D0CA', background: 'transparent', cursor: 'pointer', color: '#9CA3AF', fontSize: 12, fontWeight: 500, fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#0891B2'; (e.currentTarget as HTMLElement).style.color = '#0891B2'; (e.currentTarget as HTMLElement).style.background = '#ECFEFF'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#D4D0CA'; (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                      <Plus size={13} /> Add another document
                    </button>
                  )}
                </div>
              )}
            </SectionCard>

            {/* ── § 5 Directorships ── */}
            <SectionCard className="fade-up-5"
              icon={<Building2 size={16} color={theme.accent} />} iconBg={theme.badgeBg}
              title="Directorship / Listed Shares"
              subtitle={`Companies where you hold directorship or listed shares${listedCnt > 0 ? ` · ${listedCnt} listed` : ''}`}
              badge={directorships.length > 0 ? (
                <span className="badge-sm" style={{ background: theme.badgeBg, color: theme.accent, border: `1px solid ${theme.badgeBorder}`, fontSize: 11, marginLeft: 6 }}>
                  {directorships.length}
                </span>
              ) : undefined}
              rightAction={
                <button type="button" onClick={() => setDirectorships(prev => [...prev, emptyDirectorship()])}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: `1.5px solid ${theme.badgeBorder}`, background: theme.badgeBg, color: theme.accent, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  <Plus size={13} /> Add Company
                </button>
              }>
              {directorships.length === 0 ? (
                <div className="upload-zone" onClick={() => setDirectorships([emptyDirectorship()])}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '40px 24px' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: theme.badgeBg, border: `1px solid ${theme.badgeBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building2 size={24} color={theme.accent} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Add Directorship or Listed Company</p>
                    <p style={{ fontSize: 12, color: '#9CA3AF' }}>Skip if you have no directorship or listed shareholdings</p>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {directorships.map((entry, idx) => (
                    <DirectorshipCard key={idx} idx={idx} entry={entry} isPremium={isPremium}
                      onChange={updateDirectorship}
                      onRemove={(i) => setDirectorships(prev => prev.filter((_, j) => j !== i))} />
                  ))}
                  <button type="button" onClick={() => setDirectorships(prev => [...prev, emptyDirectorship()])}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 12, borderRadius: 10, border: '1.5px dashed #D4D0CA', background: 'transparent', cursor: 'pointer', color: '#9CA3AF', fontSize: 12, fontWeight: 500, fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = theme.accent; (e.currentTarget as HTMLElement).style.color = theme.accent; (e.currentTarget as HTMLElement).style.background = theme.badgeBg; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#D4D0CA'; (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                    <Plus size={13} /> Add Another Company
                  </button>
                </div>
              )}
            </SectionCard>

            {/* ── § 6 Foreign Assets ── */}
            <SectionCard className="fade-up-6"
              icon={<Globe size={16} color="#0D9488" />} iconBg="#F0FDFA"
              title="Foreign Income / Assets"
              subtitle="Bank accounts, securities, property, salary earned outside India"
              badge={foreignAssets.length > 0 ? (
                <span className="badge-sm" style={{ background: '#CCFBF1', color: '#0D9488', border: '1px solid #99F6E4', fontSize: 11, marginLeft: 6 }}>
                  {foreignAssets.length}
                </span>
              ) : undefined}
              rightAction={!addingForeign && editForeignIdx === null ? (
                <button type="button" onClick={() => setAddingForeign(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: '1.5px solid #99F6E4', background: '#F0FDFA', color: '#0D9488', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  <Plus size={13} /> Add Entry
                </button>
              ) : undefined}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {(addingForeign || editForeignIdx !== null) && (
                  <ForeignAssetForm
                    entry={editForeignIdx !== null ? foreignAssets[editForeignIdx] : emptyForeignAsset()}
                    isEdit={editForeignIdx !== null}
                    onSave={(entry) => {
                      if (editForeignIdx !== null) {
                        setForeignAssets(prev => prev.map((a, i) => i === editForeignIdx ? entry : a));
                        setEditForeignIdx(null);
                      } else {
                        setForeignAssets(prev => [...prev, entry]);
                        setAddingForeign(false);
                      }
                    }}
                    onCancel={() => { setAddingForeign(false); setEditForeignIdx(null); }}
                  />
                )}

                {foreignAssets.length === 0 && !addingForeign ? (
                  <div className="upload-zone" onClick={() => setAddingForeign(true)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '40px 24px' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#F0FDFA', border: '1px solid #99F6E4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Globe size={24} color="#0D9488" />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Add Foreign Income / Asset</p>
                      <p style={{ fontSize: 12, color: '#9CA3AF' }}>Skip if you have no foreign income or assets abroad</p>
                    </div>
                  </div>
                ) : foreignAssets.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {foreignAssets.map((asset, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: '#F0FDFA', border: '1px solid #99F6E4', borderRadius: 12, marginBottom: 8 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 9, background: '#CCFBF1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Globe size={16} color="#0D9488" />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {asset.countryName} — {asset.incomeSource}
                          </p>
                          <p style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
                            {asset.assetType}{asset.amount ? ` · ₹${Number(asset.amount).toLocaleString('en-IN')}` : ''}
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                          <button type="button" onClick={() => { setEditForeignIdx(idx); setAddingForeign(false); }}
                            style={{ padding: 7, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#0D9488', display: 'flex' }}>
                            <Edit2 size={14} />
                          </button>
                          <button type="button" onClick={() => setForeignAssets(prev => prev.filter((_, i) => i !== idx))}
                            style={{ padding: 7, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#EF4444'; (e.currentTarget as HTMLElement).style.background = '#FEF2F2'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {!addingForeign && editForeignIdx === null && (
                      <button type="button" onClick={() => setAddingForeign(true)}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 10, borderRadius: 10, border: '1.5px dashed #D4D0CA', background: 'transparent', cursor: 'pointer', color: '#9CA3AF', fontSize: 12, fontWeight: 500, fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#0D9488'; (e.currentTarget as HTMLElement).style.color = '#0D9488'; (e.currentTarget as HTMLElement).style.background = '#F0FDFA'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#D4D0CA'; (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                        <Plus size={13} /> Add another entry
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            </SectionCard>

            {/* ── § 7 Notes ── */}
            <SectionCard className="fade-up-7"
              icon={<StickyNote size={16} color="#D97706" />} iconBg="#FFFBEB"
              title="Additional Notes" subtitle="Optional — anything else our CA team should know">
              <textarea value={otherNotes} onChange={(e) => setOtherNotes(e.target.value)} rows={4}
                placeholder="e.g. I have capital gains from US stocks, ESOP vesting from previous employer, rental income from Dubai — please check attached bank interest certificate too…"
                className="itr-input" style={{ resize: 'vertical', lineHeight: 1.7, minHeight: 100 }} />
              <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 6 }}>{otherNotes.length}/800 characters</p>
            </SectionCard>

            {/* ── Disclaimer ── */}
            <div className="fade-up-8" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 16px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12 }}>
              <AlertCircle size={15} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: '#92400E', lineHeight: 1.65 }}>
                <strong>Before submitting:</strong> Ensure documents are clear and legible. Foreign assets and income
                must be disclosed per FEMA and Schedule FA/FSI requirements. All files are AES-256 encrypted and handled by verified CAs only.
              </p>
            </div>

            {/* ── Submit ── */}
            <button type="button" onClick={handleSubmit} disabled={submitting}
              className="submit-btn fade-up-8"
              style={{ background: `linear-gradient(135deg,${theme.gradFrom},${theme.gradTo})`, boxShadow: `0 4px 24px ${theme.shadow}` }}>
              {submitting ? (
                <>
                  <div className="spin-anim" style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white' }} />
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