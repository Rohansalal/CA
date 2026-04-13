import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Upload, X, CheckCircle, Loader2, QrCode,
  Clock, AlertCircle, FileText, Info, CreditCard, IndianRupee,
  Shield, BadgeCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { useOrderItem } from '../../hooks/useOrders';
import { useSubmitPayment } from '../../hooks/usePayments';

const UPI_ID = import.meta.env.VITE_UPI_ID || 'payments@upi';
const UPI_NAME = import.meta.env.VITE_UPI_NAME || 'Protech Planner CA';

const PLAN_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  BASIC:    { bg: 'bg-slate-100',   text: 'text-slate-700',   dot: '#64748B' },
  STANDARD: { bg: 'bg-blue-100',    text: 'text-blue-700',    dot: '#2563EB' },
  PREMIUM:  { bg: 'bg-violet-100',  text: 'text-violet-700',  dot: '#7C3AED' },
  ELITE:    { bg: 'bg-amber-100',   text: 'text-amber-700',   dot: '#D97706' },
};

export const ServicePaymentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: item, isLoading } = useOrderItem(parseInt(id!));
  const submitPayment = useSubmitPayment();

  const [method, setMethod] = useState<'qr' | 'pay_later'>('qr');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      toast.error('Only JPG, PNG or PDF allowed'); return;
    }
    if (file.size > 5 * 1024 * 1024) { toast.error('Max 5 MB'); return; }
    setProofFile(file);
    setProofPreview(file.type.startsWith('image/') ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async () => {
    if (!item) return;
    if (method === 'qr' && !proofFile) {
      toast.error('Please upload payment screenshot'); return;
    }
    try {
      await submitPayment.mutateAsync({
        orderId: item.orderId,
        method: method === 'qr' ? 'MANUAL_QR' : 'PAY_LATER',
        proofFile: proofFile ?? undefined,
      });
      toast.success(
        method === 'qr'
          ? 'Payment submitted! Proceeding to fill your application…'
          : 'Order placed! Fill your application now.',
      );
      navigate(`/dashboard/order/${id}/form`);
    } catch {
      // handled by hook
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          </div>
          <p className="text-slate-500 font-semibold">Loading order details…</p>
        </div>
      </div>
    );
  }

  if (!item) return null;

  const basePrice = item.price || 0;
  const gst = Math.round(basePrice * 0.18);
  const total = basePrice + gst;
  const planStyle = PLAN_COLORS[item.planType] || PLAN_COLORS.BASIC;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Sticky Header ── */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="font-black text-slate-900 text-sm sm:text-base truncate">{item.serviceName}</h1>
            <p className="text-xs text-slate-400 font-medium">Complete payment to continue</p>
          </div>
          {/* Step indicator */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-500/30">
              <span className="w-5 h-5 rounded-full bg-white/20 text-white text-[10px] font-black flex items-center justify-center">1</span>
              <span className="text-[11px] font-black text-white">Payment</span>
            </div>
            <span className="text-slate-300 text-xs">›</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100">
              <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-500 text-[10px] font-black flex items-center justify-center">2</span>
              <span className="text-[11px] font-black text-slate-400">Form</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 pb-16">

        {/* ── Order Summary Card ── */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5 overflow-hidden">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 px-6 py-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-black text-indigo-200 uppercase tracking-widest mb-1">Service Order</p>
                <p className="text-lg font-black text-white leading-tight">{item.serviceName}</p>
                <p className="text-indigo-300 text-xs font-semibold mt-1">Order #{item.orderNumber}</p>
              </div>
              <span className={`shrink-0 text-[10px] font-black px-2.5 py-1 rounded-full ${planStyle.bg} ${planStyle.text}`}>
                {item.planType}
              </span>
            </div>
          </div>
          <div className="px-6 py-5">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Service Amount</span>
                <span className="font-bold text-slate-800">₹{basePrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">GST (18%)</span>
                <span className="font-bold text-slate-800">+₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
                <span className="font-black text-slate-900">Total Payable</span>
                <div className="flex items-center gap-1">
                  <IndianRupee className="w-5 h-5 text-indigo-600" strokeWidth={2.5} />
                  <span className="text-2xl font-black text-indigo-600">{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Payment Method Toggle ── */}
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              key: 'qr' as const,
              icon: QrCode,
              label: 'Pay via QR',
              sub: 'Scan & upload proof',
              active: 'border-indigo-500 bg-indigo-50',
              inactive: 'border-slate-200 bg-white hover:border-indigo-200',
              iconBg: method === 'qr' ? 'bg-indigo-600' : 'bg-slate-100',
              iconColor: method === 'qr' ? '#fff' : '#94A3B8',
              textColor: method === 'qr' ? 'text-indigo-700' : 'text-slate-700',
            },
            {
              key: 'pay_later' as const,
              icon: Clock,
              label: 'Pay Later',
              sub: 'Fill form, pay within 7 days',
              active: 'border-amber-400 bg-amber-50',
              inactive: 'border-slate-200 bg-white hover:border-amber-200',
              iconBg: method === 'pay_later' ? 'bg-amber-400' : 'bg-slate-100',
              iconColor: method === 'pay_later' ? '#fff' : '#94A3B8',
              textColor: method === 'pay_later' ? 'text-amber-700' : 'text-slate-700',
            },
          ].map(({ key, icon: Icon, label, sub, active, inactive, iconBg, iconColor, textColor }) => (
            <button
              key={key}
              onClick={() => setMethod(key)}
              className={`relative flex flex-col items-center gap-3 px-4 py-5 rounded-2xl border-2 transition-all ${method === key ? active : inactive}`}
            >
              {method === key && (
                <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-current flex items-center justify-center"
                  style={{ color: key === 'qr' ? '#4F46E5' : '#D97706' }}>
                  <CheckCircle className="w-4 h-4" />
                </div>
              )}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${iconBg}`}>
                <Icon className="w-6 h-6" style={{ color: iconColor }} />
              </div>
              <div className="text-center">
                <p className={`text-sm font-black ${textColor}`}>{label}</p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">{sub}</p>
              </div>
            </button>
          ))}
        </div>

        {/* ── QR + Upload ── */}
        {method === 'qr' && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5 p-6 space-y-5">
            {/* QR placeholder */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-48 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="w-16 h-16 text-indigo-200 mx-auto mb-2" />
                  <p className="text-xs font-bold text-indigo-400">QR Code</p>
                  <p className="text-[10px] text-indigo-300 mt-0.5">Contact us to receive QR</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-base font-black text-slate-900">Pay ₹{total.toLocaleString('en-IN')}</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  UPI ID: <span className="font-black text-indigo-600">{UPI_ID}</span>
                  <span className="text-slate-400 ml-1">({UPI_NAME})</span>
                </p>
              </div>
            </div>

            {/* Info box */}
            <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700 font-medium leading-relaxed">
                After making payment, take a screenshot and upload it below. Your application will be activated after payment verification (within 2–4 hours).
              </p>
            </div>

            {/* Proof upload */}
            <div>
              <p className="text-sm font-black text-slate-800 mb-3">
                Upload Payment Screenshot <span className="text-red-500">*</span>
              </p>

              {proofFile ? (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                  {proofPreview
                    ? <img src={proofPreview} alt="proof" className="w-14 h-14 rounded-xl object-cover border border-emerald-200 shrink-0" />
                    : <div className="w-14 h-14 rounded-xl bg-white border border-emerald-200 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-emerald-600" />
                      </div>
                  }
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-emerald-800 truncate">{proofFile.name}</p>
                    <p className="text-xs text-emerald-500 font-medium mt-0.5">{(proofFile.size / 1024).toFixed(0)} KB</p>
                  </div>
                  <button
                    onClick={() => { setProofFile(null); setProofPreview(null); }}
                    className="p-2 rounded-xl hover:bg-emerald-100 text-emerald-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`cursor-pointer flex flex-col items-center justify-center gap-3 py-10 px-4 rounded-2xl border-2 border-dashed transition-all ${
                    dragging ? 'border-indigo-400 bg-indigo-50' : 'border-slate-200 bg-slate-50/50 hover:border-indigo-300 hover:bg-indigo-50/30'
                  }`}
                >
                  <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center shadow-sm">
                    <Upload className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-500 font-medium">
                      <span className="font-black text-indigo-600">Click to upload</span> or drag & drop
                    </p>
                    <p className="text-xs text-slate-400 mt-1">JPG, PNG, PDF · Max 5 MB</p>
                  </div>
                  <input
                    ref={fileInputRef} type="file" className="hidden"
                    accept="image/jpeg,image/png,application/pdf"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Pay Later info ── */}
        {method === 'pay_later' && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="font-black text-amber-900 mb-1.5">Pay Later Selected</p>
                <p className="text-sm text-amber-700 font-medium leading-relaxed">
                  You can fill your application form now and complete payment within <strong>7 days</strong> via bank transfer or UPI. Service processing begins after payment confirmation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Trust badges ── */}
        <div className="flex items-center justify-center gap-6 flex-wrap py-2">
          {[
            { icon: Shield, label: '100% Secure' },
            { icon: BadgeCheck, label: 'Expert CA Support' },
            { icon: Clock, label: '7-Day Guarantee' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
              <Icon className="w-3.5 h-3.5 text-emerald-500" />
              {label}
            </div>
          ))}
        </div>

        {/* ── Submit Button ── */}
        <button
          onClick={handleSubmit}
          disabled={submitPayment.isPending || (method === 'qr' && !proofFile)}
          className="w-full flex items-center justify-center gap-2.5 py-4 bg-indigo-600 text-white rounded-2xl font-black text-base hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-xl shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {submitPayment.isPending ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Processing…</>
          ) : method === 'qr' ? (
            <><CreditCard className="w-5 h-5" /> Confirm Payment & Continue</>
          ) : (
            <><Clock className="w-5 h-5" /> Place Order & Fill Form</>
          )}
        </button>

      </div>
    </div>
  );
};
