import { useState } from 'react';
import { Workflow, Plus, Eye, Edit, Trash2, ToggleLeft, ToggleRight, ChevronDown, ChevronRight, FileText, CheckSquare, CreditCard, Upload, Star } from 'lucide-react';
import { useWorkflowTemplates, useDeleteWorkflowTemplate, useUpdateWorkflowTemplate } from '../../api/hooks/useWorkflowTemplates';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import type { WorkflowTemplate, WorkflowStep } from '../../types';
import { toast } from 'sonner';

const STEP_ICONS: Record<string, React.ElementType> = {
  DOCUMENT_UPLOAD: Upload,
  FORM_FILL: FileText,
  APPROVAL: CheckSquare,
  PAYMENT: CreditCard,
  REVIEW: Eye,
  CUSTOM: Star,
};

function StepTypeBadge({ type }: { type: string }) {
  const map: Record<string, string> = {
    DOCUMENT_UPLOAD: 'bg-blue-100 text-blue-700',
    FORM_FILL: 'bg-purple-100 text-purple-700',
    APPROVAL: 'bg-amber-100 text-amber-700',
    PAYMENT: 'bg-green-100 text-green-700',
    REVIEW: 'bg-indigo-100 text-indigo-700',
    CUSTOM: 'bg-slate-100 text-slate-600',
  };
  const label = type.replace(/_/g, ' ');
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${map[type] ?? 'bg-slate-100 text-slate-600'}`}>{label}</span>;
}

function TemplateCard({ template, onToggle, onDelete }: {
  template: WorkflowTemplate;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-start gap-4 p-5">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
          <Workflow className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-slate-900 text-sm">{template.name}</h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${template.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
              {template.isActive ? 'Active' : 'Inactive'}
            </span>
            {template.service && (
              <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">{template.service.name}</span>
            )}
          </div>
          {template.description && <p className="text-xs text-slate-400 mt-1">{template.description}</p>}
          <div className="flex items-center gap-4 mt-2">
            <span className="text-xs text-slate-500">{template.steps?.length ?? 0} steps</span>
            {template.usageCount !== undefined && (
              <span className="text-xs text-slate-500">{template.usageCount} uses</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setExpanded((p) => !p)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          <button onClick={onToggle} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50">
            {template.isActive ? <ToggleLeft className="w-4 h-4" /> : <ToggleRight className="w-4 h-4" />}
          </button>
          <button onClick={onDelete} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {expanded && template.steps && template.steps.length > 0 && (
        <div className="border-t border-slate-50 px-5 py-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Workflow Steps</p>
          <div className="space-y-2">
            {template.steps.map((step, idx) => {
              const Icon = STEP_ICONS[step.type] ?? Star;
              return (
                <div key={step.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">{step.title}</p>
                    {step.description && <p className="text-xs text-slate-400 truncate">{step.description}</p>}
                  </div>
                  <StepTypeBadge type={step.type} />
                  {step.isRequired && (
                    <span className="text-[10px] text-red-500 font-semibold">Required</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function WorkflowTemplateList() {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useWorkflowTemplates({ search });
  const deleteTemplate = useDeleteWorkflowTemplate();
  const updateTemplate = useUpdateWorkflowTemplate();

  const templates: WorkflowTemplate[] = (data as any)?.templates ?? (data as any)?.items ?? [];
  const total = (data as any)?.count ?? 0;

  const handleToggle = async (template: WorkflowTemplate) => {
    try {
      await updateTemplate.mutateAsync({ id: template.id, isActive: !template.isActive });
    } catch { /* */ }
  };

  const handleDelete = (id: number, name: string) => {
    toast.custom((t) => (
      <div className="bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 w-80">
        <h3 className="font-bold text-slate-900">Delete Template?</h3>
        <p className="text-sm text-slate-500 mt-1">Remove <strong>{name}</strong>?</p>
        <div className="flex gap-2 mt-4 justify-end">
          <Button variant="ghost" size="sm" onClick={() => toast.dismiss(t)} className="rounded-xl">Cancel</Button>
          <Button size="sm" className="bg-red-600 text-white rounded-xl" onClick={async () => { toast.dismiss(t); try { await deleteTemplate.mutateAsync(id); } catch { /* */ } }}>Delete</Button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
            <Workflow className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Workflow Templates</h1>
            <p className="text-xs text-slate-400">{total} templates</p>
          </div>
        </div>
        <Button className="bg-blue-600 text-white rounded-xl gap-2">
          <Plus className="w-4 h-4" />
          New Template
        </Button>
      </div>

      <div className="relative max-w-xs">
        <Eye className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search templates…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-white border-slate-200 rounded-xl"
        />
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-white rounded-xl border border-slate-100 animate-pulse" />)}
        </div>
      ) : templates.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 py-16 text-center">
          <Workflow className="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No workflow templates yet.</p>
          <p className="text-slate-300 text-xs mt-1">Create templates to standardize your service delivery process.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {templates.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              onToggle={() => handleToggle(t)}
              onDelete={() => handleDelete(t.id, t.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
