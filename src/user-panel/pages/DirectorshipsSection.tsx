import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Building2, Landmark, History, MoveRight, PieChart } from 'lucide-react';

interface Directorship {
    companyName: string;
    companyPan: string;
    companyType: string;
    isListed: boolean;
    din: string;
    // Opening Balance
    openingNoOfShares: number;
    openingCostOfAcquisition: number;
    // Acquired during year
    acquiredNoOfShares: number;
    acquiredDate: string;
    acquiredFaceValue: number;
    acquiredIssuePrice: number;
    acquiredPurchasePrice: number;
    // Transferred during year
    transferredNoOfShares: number;
    transferredSaleConsideration: number;
    // Closing Balance
    closingNoOfShares: number;
    closingCostOfAcquisition: number;
}

interface Props {
    data: Directorship[];
    onChange: (data: Directorship[]) => void;
}

export const DirectorshipsSection: React.FC<Props> = ({ data, onChange }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [editingIdx, setEditingIdx] = useState<number | null>(null);
    const [tempEntry, setTempEntry] = useState<Directorship>(getEmptyEntry());

    function getEmptyEntry(): Directorship {
        return {
            companyName: '',
            companyPan: '',
            companyType: 'Domestic',
            isListed: false,
            din: '',
            openingNoOfShares: 0,
            openingCostOfAcquisition: 0,
            acquiredNoOfShares: 0,
            acquiredDate: '',
            acquiredFaceValue: 0,
            acquiredIssuePrice: 0,
            acquiredPurchasePrice: 0,
            transferredNoOfShares: 0,
            transferredSaleConsideration: 0,
            closingNoOfShares: 0,
            closingCostOfAcquisition: 0,
        };
    }

    const handleSave = () => {
        if (!tempEntry.companyName || !tempEntry.companyPan) {
            alert('Company Name and PAN are required');
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
                    <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="font-black text-gray-900 text-lg">Directorship / Unlisted Shares</h2>
                        <p className="text-xs text-gray-400">Details of your holdings in unlisted companies</p>
                    </div>
                </div>
                {!isAdding && (
                    <button
                        type="button"
                        onClick={() => { setIsAdding(true); setEditingIdx(null); setTempEntry(getEmptyEntry()); }}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition"
                    >
                        <Plus className="w-4 h-4" /> Add Entry
                    </button>
                )}
            </div>

            {isAdding ? (
                <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-200 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider">
                            {editingIdx !== null ? 'Edit Entry' : 'New Directorship Entry'}
                        </h3>
                        <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {/* Core Details */}
                        <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Company Name *</label>
                                <input type="text" value={tempEntry.companyName} onChange={e => setTempEntry({ ...tempEntry, companyName: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" placeholder="Digiquinct Tech..." />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Company PAN *</label>
                                <input type="text" value={tempEntry.companyPan} onChange={e => setTempEntry({ ...tempEntry, companyPan: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" placeholder="ABCDE1234F" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">DIN (if director)</label>
                                <input type="text" value={tempEntry.din} onChange={e => setTempEntry({ ...tempEntry, din: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" placeholder="10095575" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Company Type</label>
                                <select value={tempEntry.companyType} onChange={e => setTempEntry({ ...tempEntry, companyType: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm">
                                    <option value="Domestic">Domestic</option>
                                    <option value="Foreign">Foreign</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-3 pt-6">
                                <input type="checkbox" checked={tempEntry.isListed} onChange={e => setTempEntry({ ...tempEntry, isListed: e.target.checked })} id="isListed" className="w-4 h-4 rounded text-indigo-600" />
                                <label htmlFor="isListed" className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Is shares listed?</label>
                            </div>
                        </div>

                        {/* Financial Metrics Sections */}
                        <div className="md:col-span-2 lg:col-span-3 h-px bg-gray-100 my-2"></div>

                        {/* Opening Balance */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-indigo-600 mb-2">
                                <Landmark className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Opening Balance</span>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">No. of Shares</label>
                                <input type="number" value={tempEntry.openingNoOfShares} onChange={e => setTempEntry({ ...tempEntry, openingNoOfShares: Number(e.target.value) })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Cost of Acquisition</label>
                                <input type="number" value={tempEntry.openingCostOfAcquisition} onChange={e => setTempEntry({ ...tempEntry, openingCostOfAcquisition: Number(e.target.value) })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
                            </div>
                        </div>

                        {/* Acquired during year - Detailed */}
                        <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-green-50/30 p-4 rounded-xl border border-green-100">
                            <div className="md:col-span-3 lg:col-span-5 flex items-center gap-2 text-green-600 mb-1">
                                <History className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Shares Acquired during the year</span>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">No. of Shares</label>
                                <input type="number" value={tempEntry.acquiredNoOfShares} onChange={e => setTempEntry({ ...tempEntry, acquiredNoOfShares: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Date of Purchase</label>
                                <input type="date" value={tempEntry.acquiredDate} onChange={e => setTempEntry({ ...tempEntry, acquiredDate: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Face Value</label>
                                <input type="number" value={tempEntry.acquiredFaceValue} onChange={e => setTempEntry({ ...tempEntry, acquiredFaceValue: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Issue Price</label>
                                <input type="number" value={tempEntry.acquiredIssuePrice} onChange={e => setTempEntry({ ...tempEntry, acquiredIssuePrice: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Purchase Price</label>
                                <input type="number" value={tempEntry.acquiredPurchasePrice} onChange={e => setTempEntry({ ...tempEntry, acquiredPurchasePrice: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                            </div>
                        </div>

                        {/* Transferred during year */}
                        <div className="md:col-span-1 lg:col-span-1.5 space-y-4 bg-orange-50/30 p-4 rounded-xl border border-orange-100">
                            <div className="flex items-center gap-2 text-orange-600 mb-1">
                                <MoveRight className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Shares Transferred</span>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">No. of Shares</label>
                                <input type="number" value={tempEntry.transferredNoOfShares} onChange={e => setTempEntry({ ...tempEntry, transferredNoOfShares: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Sale Consideration</label>
                                <input type="number" value={tempEntry.transferredSaleConsideration} onChange={e => setTempEntry({ ...tempEntry, transferredSaleConsideration: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                            </div>
                        </div>

                        {/* Closing Balance */}
                        <div className="md:col-span-1 lg:col-span-1.5 space-y-4 bg-blue-50/30 p-4 rounded-xl border border-blue-100">
                            <div className="flex items-center gap-2 text-blue-600 mb-1">
                                <PieChart className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Closing Balance</span>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">No. of Shares</label>
                                <input type="number" value={tempEntry.closingNoOfShares} onChange={e => setTempEntry({ ...tempEntry, closingNoOfShares: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Cost of Acquisition</label>
                                <input type="number" value={tempEntry.closingCostOfAcquisition} onChange={e => setTempEntry({ ...tempEntry, closingCostOfAcquisition: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                        <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-2.5 text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-gray-700transition">Cancel</button>
                        <button type="button" onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition">
                            <Check className="w-4 h-4" /> {editingIdx !== null ? 'Update Entry' : 'Add to List'}
                        </button>
                    </div>
                </div>
            ) : data.length === 0 ? (
                <div className="py-12 text-center bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 text-xs font-black uppercase tracking-widest">No directorship entries added yet</p>
                    <button type="button" onClick={() => setIsAdding(true)} className="mt-4 text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:underline">Click to add your first entry</button>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-left text-[10px] border-collapse min-w-[800px]">
                        <thead className="bg-gray-50 text-gray-400 font-black uppercase tracking-widest">
                            <tr>
                                <th className="px-5 py-4 border-b border-gray-100">Company / PAN / Type</th>
                                <th className="px-5 py-4 border-b border-gray-100">DIN / Listed</th>
                                <th className="px-5 py-4 border-b border-gray-100 text-center bg-indigo-50/20">Opening (Qty/Cost)</th>
                                <th className="px-5 py-4 border-b border-gray-100 text-center bg-green-50/20">Acquired (Qty/Date)</th>
                                <th className="px-5 py-4 border-b border-gray-100 text-center bg-orange-50/20">Transferred (Qty/Cost)</th>
                                <th className="px-5 py-4 border-b border-gray-100 text-center bg-blue-50/20">Closing (Qty/Cost)</th>
                                <th className="px-5 py-4 border-b border-gray-100 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-slate-700">
                            {data.map((entry, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-5 py-4">
                                        <div className="font-black text-slate-800 text-xs">{entry.companyName}</div>
                                        <div className="text-[10px] text-gray-400 mt-1 font-bold">{entry.companyPan} | {entry.companyType}</div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="font-bold">{entry.din || '-'}</div>
                                        <div className={`text-[10px] mt-1 font-black ${entry.isListed ? 'text-emerald-500' : 'text-orange-500'}`}>
                                            {entry.isListed ? 'LISTED' : 'UNLISTED'}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <div className="font-black">{entry.openingNoOfShares}</div>
                                        <div className="text-gray-400 mt-1 italic">₹{entry.openingCostOfAcquisition.toLocaleString()}</div>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <div className="font-black text-green-600">{entry.acquiredNoOfShares}</div>
                                        <div className="text-gray-400 mt-1 italic">{entry.acquiredDate || '-'}</div>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <div className="font-black text-orange-600">{entry.transferredNoOfShares}</div>
                                        <div className="text-gray-400 mt-1 italic">₹{entry.transferredSaleConsideration.toLocaleString()}</div>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <div className="font-black text-blue-600">{entry.closingNoOfShares}</div>
                                        <div className="text-gray-400 mt-1 italic">₹{entry.closingCostOfAcquisition.toLocaleString()}</div>
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
