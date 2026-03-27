import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Building2, Landmark, History, MoveRight, PieChart, AlertCircle, TrendingUp, Lock } from 'lucide-react';

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
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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

    const setField = (key: keyof Directorship, value: any) => {
        setTempEntry(prev => ({ ...prev, [key]: value }));
        if (formErrors[key]) {
            setFormErrors(prev => { const next = { ...prev }; delete next[key]; return next; });
        }
    };

    const handleSave = () => {
        const errs: Record<string, string> = {};
        if (!tempEntry.companyName.trim()) errs.companyName = 'Company name is required';
        if (!tempEntry.companyPan.trim()) errs.companyPan = 'Company PAN is required';
        else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(tempEntry.companyPan.trim().toUpperCase())) {
            errs.companyPan = 'Invalid PAN format (e.g. ABCDE1234F)';
        }

        // When listed — share movement fields become compulsory
        if (tempEntry.isListed) {
            if (!tempEntry.acquiredDate) errs.acquiredDate = 'Date of purchase is required for listed shares';
            if (tempEntry.acquiredFaceValue <= 0) errs.acquiredFaceValue = 'Face value must be greater than 0';
            if (tempEntry.acquiredIssuePrice <= 0) errs.acquiredIssuePrice = 'Issue price must be greater than 0';
            if (tempEntry.acquiredPurchasePrice <= 0) errs.acquiredPurchasePrice = 'Purchase price must be greater than 0';
            if (tempEntry.closingNoOfShares < 0) errs.closingNoOfShares = 'Closing shares cannot be negative';
        }

        setFormErrors(errs);
        if (Object.keys(errs).length > 0) return;

        if (editingIdx !== null) {
            const newData = [...data];
            newData[editingIdx] = { ...tempEntry, companyPan: tempEntry.companyPan.toUpperCase() };
            onChange(newData);
            setEditingIdx(null);
        } else {
            onChange([...data, { ...tempEntry, companyPan: tempEntry.companyPan.toUpperCase() }]);
            setIsAdding(false);
        }
        setTempEntry(getEmptyEntry());
        setFormErrors({});
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingIdx(null);
        setTempEntry(getEmptyEntry());
        setFormErrors({});
    };

    const handleRemove = (index: number) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const handleEdit = (index: number) => {
        setEditingIdx(index);
        setTempEntry(data[index]);
        setIsAdding(true);
        setFormErrors({});
    };

    const inputCls = (key: string) =>
        `w-full px-4 py-2.5 border rounded-xl text-sm transition focus:outline-none focus:ring-2 ${
            formErrors[key]
                ? 'border-red-400 bg-red-50/30 focus:ring-red-200 focus:border-red-500'
                : 'border-gray-200 bg-white focus:ring-indigo-200 focus:border-indigo-400'
        }`;

    const FieldError = ({ k }: { k: string }) =>
        formErrors[k] ? (
            <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {formErrors[k]}
            </p>
        ) : null;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="font-black text-gray-900 text-lg">Directorship / Unlisted Shares</h2>
                        <p className="text-xs text-gray-400">Details of your holdings in companies — listed or unlisted</p>
                    </div>
                </div>
                {!isAdding && (
                    <button
                        type="button"
                        onClick={() => { setIsAdding(true); setEditingIdx(null); setTempEntry(getEmptyEntry()); }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition shadow-sm"
                    >
                        <Plus className="w-4 h-4" /> Add Entry
                    </button>
                )}
            </div>

            {isAdding ? (
                <div className="bg-gray-50/60 rounded-2xl p-6 border border-gray-200 space-y-6">
                    {/* Form Header */}
                    <div className="flex items-center justify-between">
                        <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider">
                            {editingIdx !== null ? 'Edit Entry' : 'New Directorship Entry'}
                        </h3>
                        <button type="button" onClick={handleCancel} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* ── Core Details ── */}
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5" />
                            Company Details
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="lg:col-span-2">
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                                    Company Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={tempEntry.companyName}
                                    onChange={e => setField('companyName', e.target.value)}
                                    className={inputCls('companyName')}
                                    placeholder="e.g. Reliance Industries Ltd."
                                />
                                <FieldError k="companyName" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                                    Company PAN <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={tempEntry.companyPan}
                                    onChange={e => setField('companyPan', e.target.value.toUpperCase())}
                                    className={`${inputCls('companyPan')} font-mono tracking-widest uppercase`}
                                    placeholder="ABCDE1234F"
                                    maxLength={10}
                                />
                                <FieldError k="companyPan" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                                    Company Type
                                </label>
                                <select
                                    value={tempEntry.companyType}
                                    onChange={e => setField('companyType', e.target.value)}
                                    className={inputCls('companyType')}
                                >
                                    <option value="Domestic">Domestic</option>
                                    <option value="Foreign">Foreign</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                                    DIN (if Director)
                                </label>
                                <input
                                    type="text"
                                    value={tempEntry.din}
                                    onChange={e => setField('din', e.target.value)}
                                    className={inputCls('din')}
                                    placeholder="e.g. 10095575"
                                    maxLength={8}
                                />
                            </div>

                            {/* Is Listed Toggle */}
                            <div className="flex items-start gap-3 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setField('isListed', !tempEntry.isListed)}
                                    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 mt-0.5 ${
                                        tempEntry.isListed ? 'bg-emerald-500' : 'bg-gray-300'
                                    }`}
                                >
                                    <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                                        tempEntry.isListed ? 'translate-x-5' : 'translate-x-0'
                                    }`} />
                                </button>
                                <div>
                                    <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">
                                        {tempEntry.isListed ? 'Listed Company' : 'Unlisted Company'}
                                    </p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">
                                        {tempEntry.isListed
                                            ? 'Share movement details required below'
                                            : 'Toggle if shares are listed on a stock exchange'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Listed Company Alert ── */}
                    {tempEntry.isListed && (
                        <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                            <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-black text-emerald-800">Listed Company — Complete Share Movement Required</p>
                                <p className="text-[10px] text-emerald-600 mt-0.5">
                                    As per ITR Schedule, all share transaction details (Opening, Acquired, Transferred, Closing) must be filled for listed companies.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="h-px bg-gray-200" />

                    {/* ── Opening Balance ── */}
                    <div className="bg-indigo-50/40 rounded-xl p-5 border border-indigo-100">
                        <div className="flex items-center gap-2 text-indigo-700 mb-4">
                            <Landmark className="w-4 h-4" />
                            <span className="text-[11px] font-black uppercase tracking-widest">Opening Balance</span>
                            <span className="text-[10px] text-indigo-400 font-medium">(as of 1 April)</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                                    No. of Shares
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={tempEntry.openingNoOfShares || ''}
                                    onChange={e => setField('openingNoOfShares', Number(e.target.value))}
                                    className="w-full px-4 py-2.5 border border-indigo-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                                    Cost of Acquisition (₹)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={tempEntry.openingCostOfAcquisition || ''}
                                    onChange={e => setField('openingCostOfAcquisition', Number(e.target.value))}
                                    className="w-full px-4 py-2.5 border border-indigo-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ── Acquired During Year ── */}
                    <div className={`rounded-xl p-5 border transition-all ${
                        tempEntry.isListed
                            ? 'bg-green-50 border-green-300 shadow-sm'
                            : 'bg-green-50/30 border-green-100'
                    }`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-green-700">
                                <History className="w-4 h-4" />
                                <span className="text-[11px] font-black uppercase tracking-widest">Shares Acquired During the Year</span>
                            </div>
                            {tempEntry.isListed && (
                                <span className="flex items-center gap-1 text-[9px] font-black text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full uppercase tracking-widest">
                                    <Lock className="w-2.5 h-2.5" />
                                    Required
                                </span>
                            )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                                    No. of Shares
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={tempEntry.acquiredNoOfShares || ''}
                                    onChange={e => setField('acquiredNoOfShares', Number(e.target.value))}
                                    className="w-full px-3 py-2.5 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                                    Date of Purchase {tempEntry.isListed && <span className="text-red-500">*</span>}
                                </label>
                                <input
                                    type="date"
                                    value={tempEntry.acquiredDate}
                                    onChange={e => setField('acquiredDate', e.target.value)}
                                    className={`w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 transition border ${
                                        formErrors.acquiredDate
                                            ? 'border-red-400 bg-red-50/30 focus:ring-red-200'
                                            : 'border-green-200 focus:ring-green-200 focus:border-green-400'
                                    }`}
                                />
                                <FieldError k="acquiredDate" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                                    Face Value (₹) {tempEntry.isListed && <span className="text-red-500">*</span>}
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={tempEntry.acquiredFaceValue || ''}
                                    onChange={e => setField('acquiredFaceValue', Number(e.target.value))}
                                    className={`w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 transition border ${
                                        formErrors.acquiredFaceValue
                                            ? 'border-red-400 bg-red-50/30 focus:ring-red-200'
                                            : 'border-green-200 focus:ring-green-200 focus:border-green-400'
                                    }`}
                                    placeholder="0.00"
                                />
                                <FieldError k="acquiredFaceValue" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                                    Issue Price (₹) {tempEntry.isListed && <span className="text-red-500">*</span>}
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={tempEntry.acquiredIssuePrice || ''}
                                    onChange={e => setField('acquiredIssuePrice', Number(e.target.value))}
                                    className={`w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 transition border ${
                                        formErrors.acquiredIssuePrice
                                            ? 'border-red-400 bg-red-50/30 focus:ring-red-200'
                                            : 'border-green-200 focus:ring-green-200 focus:border-green-400'
                                    }`}
                                    placeholder="0.00"
                                />
                                <FieldError k="acquiredIssuePrice" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                                    Purchase Price (₹) {tempEntry.isListed && <span className="text-red-500">*</span>}
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={tempEntry.acquiredPurchasePrice || ''}
                                    onChange={e => setField('acquiredPurchasePrice', Number(e.target.value))}
                                    className={`w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 transition border ${
                                        formErrors.acquiredPurchasePrice
                                            ? 'border-red-400 bg-red-50/30 focus:ring-red-200'
                                            : 'border-green-200 focus:ring-green-200 focus:border-green-400'
                                    }`}
                                    placeholder="0.00"
                                />
                                <FieldError k="acquiredPurchasePrice" />
                            </div>
                        </div>
                    </div>

                    {/* ── Transferred + Closing side by side ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Transferred */}
                        <div className={`rounded-xl p-5 border transition-all ${
                            tempEntry.isListed
                                ? 'bg-orange-50 border-orange-300 shadow-sm'
                                : 'bg-orange-50/30 border-orange-100'
                        }`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-orange-700">
                                    <MoveRight className="w-4 h-4" />
                                    <span className="text-[11px] font-black uppercase tracking-widest">Shares Transferred</span>
                                </div>
                                {tempEntry.isListed && (
                                    <span className="text-[9px] font-black text-orange-700 bg-orange-100 px-2 py-1 rounded-full uppercase tracking-widest">
                                        Fill if applicable
                                    </span>
                                )}
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">No. of Shares</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={tempEntry.transferredNoOfShares || ''}
                                        onChange={e => setField('transferredNoOfShares', Number(e.target.value))}
                                        className="w-full px-3 py-2.5 border border-orange-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Sale Consideration (₹)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={tempEntry.transferredSaleConsideration || ''}
                                        onChange={e => setField('transferredSaleConsideration', Number(e.target.value))}
                                        className="w-full px-3 py-2.5 border border-orange-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Closing Balance */}
                        <div className={`rounded-xl p-5 border transition-all ${
                            tempEntry.isListed
                                ? 'bg-blue-50 border-blue-300 shadow-sm'
                                : 'bg-blue-50/30 border-blue-100'
                        }`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-blue-700">
                                    <PieChart className="w-4 h-4" />
                                    <span className="text-[11px] font-black uppercase tracking-widest">Closing Balance</span>
                                </div>
                                {tempEntry.isListed && (
                                    <span className="flex items-center gap-1 text-[9px] font-black text-blue-700 bg-blue-100 px-2 py-1 rounded-full uppercase tracking-widest">
                                        <Lock className="w-2.5 h-2.5" />
                                        Required
                                    </span>
                                )}
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                                        No. of Shares {tempEntry.isListed && <span className="text-red-500">*</span>}
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={tempEntry.closingNoOfShares || ''}
                                        onChange={e => setField('closingNoOfShares', Number(e.target.value))}
                                        className={`w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 transition border ${
                                            formErrors.closingNoOfShares
                                                ? 'border-red-400 bg-red-50/30 focus:ring-red-200'
                                                : 'border-blue-200 focus:ring-blue-200 focus:border-blue-400'
                                        }`}
                                        placeholder="0"
                                    />
                                    <FieldError k="closingNoOfShares" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
                                        Cost of Acquisition (₹)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={tempEntry.closingCostOfAcquisition || ''}
                                        onChange={e => setField('closingCostOfAcquisition', Number(e.target.value))}
                                        className="w-full px-3 py-2.5 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Save / Cancel ── */}
                    <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-5 py-2.5 text-gray-600 font-bold text-xs uppercase tracking-widest hover:text-gray-900 transition rounded-xl hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition shadow-sm"
                        >
                            <Check className="w-4 h-4" />
                            {editingIdx !== null ? 'Update Entry' : 'Add to List'}
                        </button>
                    </div>
                </div>
            ) : data.length === 0 ? (
                <div className="py-14 text-center bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
                    <Building2 className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm font-black uppercase tracking-widest">No directorship entries added</p>
                    <p className="text-gray-400 text-xs mt-1">Applicable if you are a director or hold shares in any company</p>
                    <button
                        type="button"
                        onClick={() => setIsAdding(true)}
                        className="mt-4 text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:underline"
                    >
                        + Click to add your first entry
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-left text-[10px] border-collapse min-w-[900px]">
                        <thead className="bg-gray-50 text-gray-400 font-black uppercase tracking-widest">
                            <tr>
                                <th className="px-5 py-4 border-b border-gray-100">Company / PAN / Type</th>
                                <th className="px-5 py-4 border-b border-gray-100">DIN / Status</th>
                                <th className="px-5 py-4 border-b border-gray-100 text-center bg-indigo-50/40">Opening (Qty / Cost)</th>
                                <th className="px-5 py-4 border-b border-gray-100 text-center bg-green-50/40">Acquired (Qty / Date)</th>
                                <th className="px-5 py-4 border-b border-gray-100 text-center bg-orange-50/40">Transferred (Qty / Sale)</th>
                                <th className="px-5 py-4 border-b border-gray-100 text-center bg-blue-50/40">Closing (Qty / Cost)</th>
                                <th className="px-5 py-4 border-b border-gray-100 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-slate-700">
                            {data.map((entry, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-5 py-4">
                                        <div className="font-black text-slate-800 text-xs">{entry.companyName}</div>
                                        <div className="text-[10px] text-gray-400 mt-1 font-mono">{entry.companyPan}</div>
                                        <div className="text-[10px] text-gray-400 mt-0.5">{entry.companyType}</div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="font-bold text-xs">{entry.din || '—'}</div>
                                        <div className={`text-[9px] mt-1.5 font-black px-2 py-0.5 rounded-full inline-block ${
                                            entry.isListed
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-orange-100 text-orange-700'
                                        }`}>
                                            {entry.isListed ? 'LISTED' : 'UNLISTED'}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-center bg-indigo-50/20">
                                        <div className="font-black text-indigo-700">{entry.openingNoOfShares.toLocaleString()}</div>
                                        <div className="text-gray-400 mt-1 text-[10px]">₹{entry.openingCostOfAcquisition.toLocaleString()}</div>
                                    </td>
                                    <td className="px-5 py-4 text-center bg-green-50/20">
                                        <div className="font-black text-green-700">{entry.acquiredNoOfShares.toLocaleString()}</div>
                                        <div className="text-gray-400 mt-1 text-[10px]">{entry.acquiredDate || '—'}</div>
                                    </td>
                                    <td className="px-5 py-4 text-center bg-orange-50/20">
                                        <div className="font-black text-orange-700">{entry.transferredNoOfShares.toLocaleString()}</div>
                                        <div className="text-gray-400 mt-1 text-[10px]">₹{entry.transferredSaleConsideration.toLocaleString()}</div>
                                    </td>
                                    <td className="px-5 py-4 text-center bg-blue-50/20">
                                        <div className="font-black text-blue-700">{entry.closingNoOfShares.toLocaleString()}</div>
                                        <div className="text-gray-400 mt-1 text-[10px]">₹{entry.closingCostOfAcquisition.toLocaleString()}</div>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                type="button"
                                                onClick={() => handleEdit(idx)}
                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                                title="Edit"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleRemove(idx)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                                title="Remove"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
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
