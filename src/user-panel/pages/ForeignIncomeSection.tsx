import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Globe, DollarSign, FileText, AlertCircle } from 'lucide-react';

interface ForeignAsset {
    assetType: string;
    countryName: string;
    incomeSource: string;
    amount: number;
    remark: string;
}

interface Props {
    data: ForeignAsset[];
    onChange: (data: ForeignAsset[]) => void;
}

export const ForeignIncomeSection: React.FC<Props> = ({ data, onChange }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [editingIdx, setEditingIdx] = useState<number | null>(null);
    const [tempEntry, setTempEntry] = useState<ForeignAsset>(getEmptyEntry());
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    function getEmptyEntry(): ForeignAsset {
        return { assetType: 'Foreign Asset', countryName: '', incomeSource: '', amount: 0, remark: '' };
    }

    const setField = (key: keyof ForeignAsset, value: any) => {
        setTempEntry(prev => ({ ...prev, [key]: value }));
        if (formErrors[key]) {
            setFormErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
        }
    };

    const handleSave = () => {
        const errs: Record<string, string> = {};
        if (!tempEntry.countryName.trim()) errs.countryName = 'Country name is required';
        if (!tempEntry.incomeSource.trim()) errs.incomeSource = 'Source of income is required';
        setFormErrors(errs);
        if (Object.keys(errs).length > 0) return;

        if (editingIdx !== null) {
            const newData = [...data];
            newData[editingIdx] = tempEntry;
            onChange(newData);
            setEditingIdx(null);
        } else {
            onChange([...data, tempEntry]);
            setIsAdding(false);
        }
        setTempEntry(getEmptyEntry());
        setFormErrors({});
    };

    const handleCancel = () => {
        setIsAdding(false); setEditingIdx(null);
        setTempEntry(getEmptyEntry()); setFormErrors({});
    };

    const handleRemove = (index: number) => onChange(data.filter((_, i) => i !== index));

    const handleEdit = (index: number) => {
        setEditingIdx(index); setTempEntry(data[index]);
        setIsAdding(true); setFormErrors({});
    };

    const inputCls = (key?: string) =>
        `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition ${
            key && formErrors[key]
                ? 'border-red-400 bg-red-50/30 focus:ring-red-200 focus:border-red-500'
                : 'border-gray-200 bg-white focus:ring-teal-200 focus:border-teal-400'
        }`;

    const FieldError = ({ k }: { k: string }) =>
        formErrors[k] ? (
            <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3 flex-shrink-0" /> {formErrors[k]}
            </p>
        ) : null;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-teal-500 overflow-hidden">
            {/* Section Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100 bg-teal-50/20">
                <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 bg-teal-100 rounded-xl flex items-center justify-center">
                        <Globe className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                        <h2 className="font-black text-gray-900 text-base">Foreign Income / Assets</h2>
                        <p className="text-[11px] text-gray-400 mt-0.5">Holdings and income outside India — bank accounts, securities, property</p>
                    </div>
                </div>
                {!isAdding && (
                    <button
                        type="button"
                        onClick={() => { setIsAdding(true); setEditingIdx(null); setTempEntry(getEmptyEntry()); }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-teal-700 transition shadow-sm flex-shrink-0"
                    >
                        <Plus className="w-4 h-4" /> Add Asset
                    </button>
                )}
            </div>

            {/* Body */}
            <div className="p-7">
                {isAdding ? (
                    <div className="bg-gray-50/60 rounded-2xl p-6 border border-gray-200 space-y-5">
                        <div className="flex items-center justify-between">
                            <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider">
                                {editingIdx !== null ? 'Edit Asset Entry' : 'New Foreign Asset / Income'}
                            </h3>
                            <button type="button" onClick={handleCancel}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Asset / Income Type</label>
                                <select value={tempEntry.assetType} onChange={e => setField('assetType', e.target.value)} className={inputCls()}>
                                    <option value="Foreign Asset">Foreign Asset</option>
                                    <option value="Foreign Income">Foreign Income</option>
                                    <option value="Bank Account">Foreign Bank Account</option>
                                    <option value="Property">Foreign Immovable Property</option>
                                    <option value="Shares">Foreign Stocks / Equity</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                                    Country Name <span className="text-red-500">*</span>
                                </label>
                                <input type="text" value={tempEntry.countryName}
                                    onChange={e => setField('countryName', e.target.value)}
                                    className={inputCls('countryName')} placeholder="e.g. USA, UK, UAE" />
                                <FieldError k="countryName" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                                    Source of Income <span className="text-red-500">*</span>
                                </label>
                                <input type="text" value={tempEntry.incomeSource}
                                    onChange={e => setField('incomeSource', e.target.value)}
                                    className={inputCls('incomeSource')} placeholder="Salary, Dividends, Rent…" />
                                <FieldError k="incomeSource" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Amount (₹ Equivalent)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type="number" min="0" value={tempEntry.amount || ''}
                                        onChange={e => setField('amount', Number(e.target.value))}
                                        className={`${inputCls()} pl-10`} placeholder="Equivalent INR value" />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Detailed Remarks</label>
                                <textarea value={tempEntry.remark}
                                    onChange={e => setField('remark', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition resize-none"
                                    rows={2} placeholder="Acquisition date, account details, specific context…" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
                            <button type="button" onClick={handleCancel}
                                className="px-5 py-2.5 text-gray-600 font-bold text-xs uppercase tracking-widest hover:text-gray-900 hover:bg-gray-100 rounded-xl transition">
                                Cancel
                            </button>
                            <button type="button" onClick={handleSave}
                                className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-teal-700 transition shadow-sm">
                                <Check className="w-4 h-4" />
                                {editingIdx !== null ? 'Update Entry' : 'Add to List'}
                            </button>
                        </div>
                    </div>
                ) : data.length === 0 ? (
                    <div className="py-14 text-center bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
                        <Globe className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm font-black uppercase tracking-widest">No foreign assets added</p>
                        <p className="text-gray-400 text-xs mt-1">Applicable if you have income or assets outside India</p>
                        <button type="button" onClick={() => setIsAdding(true)}
                            className="mt-4 text-teal-600 font-black text-[10px] uppercase tracking-widest hover:underline">
                            + Click to add foreign asset
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-gray-100">
                        <table className="w-full text-left text-xs border-collapse min-w-[500px]">
                            <thead className="bg-gray-50 text-gray-400 font-black uppercase tracking-widest">
                                <tr>
                                    <th className="px-5 py-4 border-b border-gray-100">Country / Source</th>
                                    <th className="px-5 py-4 border-b border-gray-100">Type</th>
                                    <th className="px-5 py-4 border-b border-gray-100 text-right">Amount (₹)</th>
                                    <th className="px-5 py-4 border-b border-gray-100 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-slate-700">
                                {data.map((entry, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-5 py-4">
                                            <div className="font-black text-slate-800">{entry.countryName}</div>
                                            <div className="text-[10px] text-gray-400 mt-1">{entry.incomeSource}</div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="inline-block px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[9px] font-black uppercase tracking-wider">
                                                {entry.assetType}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-right font-black text-teal-700">
                                            ₹{new Intl.NumberFormat('en-IN').format(entry.amount)}
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button type="button" onClick={() => handleEdit(idx)}
                                                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button type="button" onClick={() => handleRemove(idx)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Add more button */}
                        <div className="border-t border-gray-100 px-5 py-3">
                            <button type="button" onClick={() => setIsAdding(true)}
                                className="text-[10px] text-teal-600 font-black uppercase tracking-widest hover:underline flex items-center gap-1">
                                <Plus className="w-3 h-3" /> Add another asset
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
