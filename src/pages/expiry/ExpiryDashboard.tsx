import { useState } from 'react';
import { RefreshCw, AlertTriangle, Building2, CreditCard, FileText, Clock } from 'lucide-react';
import { useExpirySummary, useTradeLicenses, useEmiratesIDs, usePassports, useTaxReturns } from '../../api/hooks/useExpiry';
import type { TradeLicense, EmiratesID, PassportRecord, TaxReturn } from '../../types';
import { cn } from '../../utils/cn';

// ── Helpers ───────────────────────────────────────────────────────────────────

function daysUntil(dateStr: string): number {
  const ms = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(ms / 86_400_000);
}

function ExpiryBadge({ days }: { days: number }) {
  if (days < 0) return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700"><Clock className="w-3 h-3" />Expired</span>;
  if (days <= 30) return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700"><Clock className="w-3 h-3" />{days} days</span>;
  if (days <= 90) return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3" />{days} days</span>;
  return <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">{days} days</span>;
}

// ── Summary card ──────────────────────────────────────────────────────────────

function SummaryCard({
  icon: Icon,
  title,
  total,
  expiringSoon,
  borderColor,
}: {
  icon: React.ElementType;
  title: string;
  total: number;
  expiringSoon: number;
  borderColor: string;
}) {
  return (
    <div className={`bg-white rounded-xl border-t-4 ${borderColor} shadow-sm p-5`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-semibold text-slate-600">{title}</p>
        <Icon className="w-5 h-5 text-slate-400" />
      </div>
      <p className="text-3xl font-black text-slate-900">{total}</p>
      {expiringSoon > 0 && (
        <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 bg-red-50 text-red-600 rounded-full">
          <AlertTriangle className="w-3 h-3" />
          {expiringSoon} in 30d
        </div>
      )}
    </div>
  );
}

// ── Trade Licenses table ──────────────────────────────────────────────────────

function TradeLicensesTab() {
  const { data, isLoading, refetch } = useTradeLicenses({ limit: 50 });
  const items: TradeLicense[] = (data as any)?.licenses ?? (data as any)?.items ?? [];

  if (isLoading) return <TableSkeleton />;
  if (items.length === 0)
    return <EmptyState message="No trade licenses expiring within the next 90 days" />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            {['Name', 'Reference', 'Client', 'Expiry Date', 'Status'].map((h) => (
              <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((lic) => {
            const days = daysUntil(lic.expiryDate);
            return (
              <tr key={lic.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-800">{lic.name}</td>
                <td className="py-3 px-4 text-slate-500 font-mono text-xs">{lic.referenceNumber}</td>
                <td className="py-3 px-4">
                  {lic.client ? (
                    <span className="text-blue-600 font-medium hover:underline cursor-pointer">{lic.client.name}</span>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(lic.expiryDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <ExpiryBadge days={days} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function EmiratesIDsTab() {
  const { data, isLoading } = useEmiratesIDs({ limit: 50 });
  const items: EmiratesID[] = (data as any)?.emiratesIds ?? (data as any)?.items ?? [];

  if (isLoading) return <TableSkeleton />;
  if (items.length === 0) return <EmptyState message="No Emirates IDs expiring within the next 90 days" />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            {['Name', 'ID Number', 'Client / Party', 'Expiry Date', 'Status'].map((h) => (
              <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((eid) => {
            const days = daysUntil(eid.expiryDate);
            return (
              <tr key={eid.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-800">{eid.name}</td>
                <td className="py-3 px-4 text-slate-500 font-mono text-xs">{eid.idNumber}</td>
                <td className="py-3 px-4">
                  <span className="text-blue-600 font-medium">{eid.client?.name ?? eid.party?.name ?? '—'}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(eid.expiryDate).toLocaleDateString('en-GB')}
                  </span>
                </td>
                <td className="py-3 px-4"><ExpiryBadge days={days} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function PassportsTab() {
  const { data, isLoading } = usePassports({ limit: 50 });
  const items: PassportRecord[] = (data as any)?.passports ?? (data as any)?.items ?? [];

  if (isLoading) return <TableSkeleton />;
  if (items.length === 0) return <EmptyState message="No passports expiring within the next 90 days" />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            {['Name', 'Passport No.', 'Nationality', 'Expiry Date', 'Status'].map((h) => (
              <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((p) => {
            const days = daysUntil(p.expiryDate);
            return (
              <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-800">{p.name}</td>
                <td className="py-3 px-4 text-slate-500 font-mono text-xs">{p.passportNumber}</td>
                <td className="py-3 px-4 text-slate-600">{p.nationality ?? '—'}</td>
                <td className="py-3 px-4">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(p.expiryDate).toLocaleDateString('en-GB')}
                  </span>
                </td>
                <td className="py-3 px-4"><ExpiryBadge days={days} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TaxReturnsTab() {
  const { data, isLoading } = useTaxReturns({ limit: 50 });
  const items: TaxReturn[] = (data as any)?.taxReturns ?? (data as any)?.items ?? [];

  if (isLoading) return <TableSkeleton />;
  if (items.length === 0) return <EmptyState message="No tax returns due within the next 90 days" />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            {['Client', 'Tax Type', 'Period', 'Due Date', 'Status'].map((h) => (
              <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((t) => (
            <tr key={t.id} className="border-b border-slate-50 hover:bg-slate-50">
              <td className="py-3 px-4">
                <span className="text-blue-600 font-medium">{t.client?.name ?? '—'}</span>
              </td>
              <td className="py-3 px-4 font-semibold text-slate-800">{t.taxType}</td>
              <td className="py-3 px-4 text-slate-600">{t.period}</td>
              <td className="py-3 px-4">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {new Date(t.dueDate).toLocaleDateString('en-GB')}
                </span>
              </td>
              <td className="py-3 px-4">
                <TaxStatusBadge status={t.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TaxStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    PENDING: 'bg-amber-100 text-amber-700',
    FILED: 'bg-green-100 text-green-700',
    OVERDUE: 'bg-red-100 text-red-700',
    EXTENDED: 'bg-blue-100 text-blue-700',
  };
  return (
    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${map[status] ?? 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-3 p-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-10 bg-slate-100 rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-16 text-center">
      <p className="text-slate-400 text-sm">{message}</p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type TabKey = 'trade-licenses' | 'emirates-id' | 'passports' | 'tax-returns';

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: 'trade-licenses', label: 'Trade Licenses', icon: Building2 },
  { key: 'emirates-id', label: 'Emirates ID', icon: CreditCard },
  { key: 'passports', label: 'Passports', icon: FileText },
  { key: 'tax-returns', label: 'Tax Returns', icon: FileText },
];

const TAB_TITLES: Record<TabKey, string> = {
  'trade-licenses': 'Trade License Expiries',
  'emirates-id': 'Emirates ID Expiries',
  'passports': 'Passport Expiries',
  'tax-returns': 'Tax Return Due Dates',
};

const TAB_SUBTITLES: Record<TabKey, string> = {
  'trade-licenses': 'Client trade licenses expiring within the next 90 days',
  'emirates-id': 'Emirates ID cards expiring within the next 90 days',
  'passports': 'Passports expiring within the next 90 days',
  'tax-returns': 'Tax returns due within the next 90 days',
};

export function ExpiryDashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>('trade-licenses');
  const [filter, setFilter] = useState<string>('all');
  const { data: summary, isLoading: summaryLoading, refetch } = useExpirySummary();

  const s = (summary as any) ?? {};
  const tradeLicTotal = s.tradeLicenses?.total ?? 0;
  const tradeLicSoon = s.tradeLicenses?.expiringSoon ?? 0;
  const emiratesIdTotal = s.emiratesIds?.total ?? 0;
  const emiratesIdSoon = s.emiratesIds?.expiringSoon ?? 0;
  const passportTotal = s.passports?.total ?? 0;
  const passportSoon = s.passports?.expiringSoon ?? 0;
  const taxTotal = s.taxReturns?.total ?? 0;
  const taxSoon = s.taxReturns?.dueSoon ?? 0;

  const attentionRequired = s.attentionRequired ?? (tradeLicSoon + emiratesIdSoon + passportSoon + taxSoon);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Expiry Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">Track expiring documents and deadlines across all sections</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Items</option>
            <option value="30">Expiring in 30 days</option>
            <option value="60">Expiring in 60 days</option>
            <option value="90">Expiring in 90 days</option>
          </select>
          <button
            onClick={() => refetch()}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Attention Required Banner */}
      {attentionRequired > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
          <div>
            <p className="text-sm font-bold text-red-800">Attention Required</p>
            <p className="text-xs text-red-600">{attentionRequired} items are expiring within 30 days.</p>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard icon={Building2} title="Trade Licenses" total={tradeLicTotal} expiringSoon={tradeLicSoon} borderColor="border-blue-500" />
        <SummaryCard icon={CreditCard} title="Emirates ID" total={emiratesIdTotal} expiringSoon={emiratesIdSoon} borderColor="border-purple-500" />
        <SummaryCard icon={FileText} title="Passports" total={passportTotal} expiringSoon={passportSoon} borderColor="border-green-500" />
        <SummaryCard icon={FileText} title="Tax Returns" total={taxTotal} expiringSoon={taxSoon} borderColor="border-orange-500" />
      </div>

      {/* Tabs + Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-slate-100 overflow-x-auto">
          {TABS.map((tab) => {
            const counts: Record<TabKey, number> = {
              'trade-licenses': tradeLicSoon,
              'emirates-id': emiratesIdSoon,
              'passports': passportSoon,
              'tax-returns': taxSoon,
            };
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'flex items-center gap-2 px-5 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all',
                  activeTab === tab.key
                    ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {counts[tab.key] > 0 && (
                  <span className="bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {counts[tab.key]}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Table section header */}
        <div className="p-5 border-b border-slate-50">
          <h3 className="text-base font-bold text-slate-900">{TAB_TITLES[activeTab]}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{TAB_SUBTITLES[activeTab]}</p>
        </div>

        {/* Table content */}
        <div>
          {activeTab === 'trade-licenses' && <TradeLicensesTab />}
          {activeTab === 'emirates-id' && <EmiratesIDsTab />}
          {activeTab === 'passports' && <PassportsTab />}
          {activeTab === 'tax-returns' && <TaxReturnsTab />}
        </div>
      </div>
    </div>
  );
}
