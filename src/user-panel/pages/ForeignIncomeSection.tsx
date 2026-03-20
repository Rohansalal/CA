import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Globe, DollarSign, FileText } from 'lucide-react';

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

    function getEmptyEntry(): ForeignAsset {
        return {
            assetType: 'Foreign Asset',
            countryName: '',
            incomeSource: '',
            amount: 0,
            remark: '',
        };
    }

    const handleSave = () => {
        if (!tempEntry.countryName || !tempEntry.incomeSource) {
            alert('Country and Source are required');
            return;
        }

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
    };

    const handleRemove = (index: number) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const handleEdit = (index: number) => {
        setEditingIdx(index);
        setTempEntry(data[index]);
        setIsAdding(true);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <Globe className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <h2 className="font-black text-gray-900 text-lg">Foreign Income / Assets</h2>
                        <p className="text-xs text-gray-400">Details of your holdings and income outside India</p>
                    </div>
                </div>
                {!isAdding && (
                    <button
                        type="button"
                        onClick={() => { setIsAdding(true); setEditingIdx(null); setTempEntry(getEmptyEntry()); }}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition"
                    >
                        <Plus className="w-4 h-4" /> Add Assets
                    </button>
                )}
            </div>

            {isAdding ? (
                <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider">
                            {editingIdx !== null ? 'Edit Asset' : 'New Foreign Asset/Income'}
                        </h3>
                        <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Asset Type *</label>
                            <select value={tempEntry.assetType} onChange={e => setTempEntry({ ...tempEntry, assetType: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm">
                                <option value="Foreign Asset">Foreign Asset</option>
                                <option value="Foreign Income">Foreign Income</option>
                                <option value="Bank Account">Foreign Bank Account</option>
                                <option value="Property">Foreign Immovable Property</option>
                                <option value="Shares">Foreign Stocks / Equity</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Country Name *</label>
                            <input type="text" value={tempEntry.countryName} onChange={e => setTempEntry({ ...tempEntry, countryName: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" placeholder="USA, UK, etc." />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Source of Income *</label>
                            <input type="text" value={tempEntry.incomeSource} onChange={e => setTempEntry({ ...tempEntry, incomeSource: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" placeholder="Salary, Dividends, Rent..." />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Amount (₹ Val)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                <input type="number" value={tempEntry.amount} onChange={e => setTempEntry({ ...tempEntry, amount: Number(e.target.value) })} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm" placeholder="Equivalent INR value" />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Detailed Remarks</label>
                            <textarea value={tempEntry.remark} onChange={e => setTempEntry({ ...tempEntry, remark: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white" rows={2} placeholder="Acquisition date, address, specific details..."></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                        <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-2.5 text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-gray-700 transition">Cancel</button>
                        <button type="button" onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition">
                            <Check className="w-4 h-4" /> {editingIdx !== null ? 'Update Entry' : 'Add to List'}
                        </button>
                    </div>
                </div>
            ) : data.length === 0 ? (
                <div className="py-12 text-center bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 text-xs font-black uppercase tracking-widest">No foreign assets added yet</p>
                    <button type="button" onClick={() => setIsAdding(true)} className="mt-4 text-emerald-600 font-black text-[10px] uppercase tracking-widest hover:underline">Click to add your foreign income</button>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-gray-50 text-gray-400 font-black uppercase tracking-widest">
                            <tr>
                                <th className="px-5 py-4 border-b border-gray-100">Country / Source</th>
                                <th className="px-5 py-4 border-b border-gray-100">Type</th>
                                <th className="px-5 py-4 border-b border-gray-100 text-right">Amount</th>
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
                                    <td className="px-5 py-4 uppercase font-bold text-gray-500 tracking-tighter">
                                        {entry.assetType}
                                    </td>
                                    <td className="px-5 py-4 text-right font-black text-emerald-600">
                                        ₹{new Intl.NumberFormat('en-IN').format(entry.amount)}
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button type="button" onClick={() => handleEdit(idx)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                                            <button type="button" onClick={() => handleRemove(idx)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
