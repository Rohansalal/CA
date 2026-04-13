import { useCallback, useRef, useState } from 'react';
import { 
  Upload, X, FileText, Image as ImageIcon, Check, 
  Loader2, Plus, Paperclip 
} from 'lucide-react';
import { toast } from 'sonner';
import { FormField, DocumentRequirement, parseFieldOptions, parseValidation } from './useDynamicForm';

interface FileWithPreview {
  file: File | null;
  preview: string | null;
}

interface DynamicFormProps {
  formFields: FormField[];
  documents: DocumentRequirement[];
  formData: Record<string, any>;
  onFieldChange: (key: string, value: any) => void;
  attachments?: { file: File; remark: string }[];
  onAddAttachment?: (file: File) => void;
  onRemoveAttachment?: (index: number) => void;
  onUpdateAttachmentRemark?: (index: number, remark: string) => void;
  attachInputRef?: React.RefObject<HTMLInputElement>;
  disabled?: boolean;
}

// ============================================
// STYLES (inline for portability)
// ============================================
const styles = {
  card: {
    background: '#ffffff',
    border: '1px solid #E4E4E0',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
  },
  sectionHeader: {
    padding: '18px 24px',
    borderBottom: '1px solid #F0EFEB',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  sectionIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  sectionBody: {
    padding: '24px',
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    border: '1.5px solid #E4E4E0',
    borderRadius: '10px',
    fontSize: '14px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: '#111827',
    background: '#FAFAF8',
    transition: 'all 0.18s ease',
    outline: 'none',
  },
  uploadZone: {
    border: '1.5px dashed #D4D0CA',
    borderRadius: '12px',
    background: '#FAFAF8',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  uploadFilled: {
    background: '#F0FDF4',
    border: '1.5px solid #86EFAC',
    borderRadius: '12px',
  },
  label: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#374151',
    display: 'block',
    marginBottom: '6px',
  },
  submitBtn: {
    background: 'linear-gradient(135deg, #4338CA 0%, #3730A3 100%)',
    borderRadius: '14px',
    padding: '16px 32px',
    fontWeight: 700,
    fontSize: '15px',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    width: '100%' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxShadow: '0 4px 24px rgba(67,56,202,0.35)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
};

// ============================================
// FILE UPLOAD ZONE COMPONENT
// ============================================
const FileUploadZone: React.FC<{
  label: string;
  sub?: string;
  value: FileWithPreview;
  onChange: (v: FileWithPreview) => void;
  accept?: string;
  maxSizeMb?: number;
  disabled?: boolean;
}> = ({ label, sub, value, onChange, accept = 'image/jpeg,image/png,application/pdf', maxSizeMb = 10, disabled }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!accept.split(',').some(type => file.type.trim() === type.trim())) {
      toast.error('Invalid file type');
      return;
    }
    if (file.size > maxSizeMb * 1024 * 1024) {
      toast.error(`File must be under ${maxSizeMb} MB`);
      return;
    }
    const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
    onChange({ file, preview });
  }, [accept, maxSizeMb, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const isPdf = value.file?.type === 'application/pdf';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={styles.label}>
        {label} <span style={{ color: '#EF4444' }}>*</span>
      </label>
      
      {value.file ? (
        <div style={{ 
          ...styles.uploadFilled, 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          padding: '12px 14px' 
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10, overflow: 'hidden',
            background: '#fff', border: '1px solid #86EFAC',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {value.preview ? (
              <img src={value.preview} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <FileText size={18} color="#16A34A" />
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#15803D', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {value.file.name}
            </p>
            <p style={{ fontSize: 11, color: '#22C55E' }}>
              {(value.file.size / 1024).toFixed(0)} KB · {isPdf ? 'PDF' : 'Image'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange({ file: null, preview: null })}
            style={{ padding: 6, borderRadius: 8, border: 'none', cursor: 'pointer', background: 'rgba(220,252,231,0.5)', color: '#16A34A' }}
            disabled={disabled}
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          style={{
            ...styles.uploadZone,
            ...(dragging ? { borderColor: '#4338CA', background: 'rgba(67,56,202,0.03)' } : {}),
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: '10px', padding: '28px 16px',
          }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
        >
          <div style={{
            width: 42, height: 42, borderRadius: '50%',
            background: '#fff', border: '1px solid #E4E4E0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Upload size={16} color={dragging ? '#4338CA' : '#9CA3AF'} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: '#4338CA', fontWeight: 600 }}>
              Click to upload <span style={{ color: '#6B7280', fontWeight: 400 }}>or drag & drop</span>
            </p>
            <p style={{ fontSize: 11, color: '#AEAAA6' }}>JPG, PNG, PDF · Max {maxSizeMb} MB</p>
          </div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
        disabled={disabled}
      />
    </div>
  );
};

// ============================================
// SECTION CARD COMPONENT
// ============================================
const SectionCard: React.FC<{
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ icon, iconBg, title, subtitle, children, className }) => (
  <div className={`dynamic-form-card ${className || ''}`} style={styles.card}>
    <div className="section-header" style={styles.sectionHeader}>
      <div className="section-icon" style={{ background: iconBg }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{subtitle}</p>}
      </div>
    </div>
    <div className="section-body" style={styles.sectionBody}>{children}</div>
  </div>
);

// ============================================
// FIELD RENDERERS
// ============================================
const renderField = (
  field: FormField,
  value: any,
  onChange: (key: string, value: any) => void,
  disabled?: boolean
) => {
  const options = parseFieldOptions(field.fieldOptions);
  const validation = parseValidation(field.validation);
  const key = field.fieldKey;

  switch (field.fieldType) {
    case 'textarea':
      return (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(key, e.target.value)}
          placeholder={field.placeholder || ''}
          rows={4}
          style={{ ...styles.input, resize: 'vertical' }}
          disabled={disabled}
        />
      );

    case 'select':
      return (
        <select
          value={value || ''}
          onChange={(e) => onChange(key, e.target.value)}
          style={styles.input}
          disabled={disabled}
        >
          <option value="">Select {field.fieldLabel}</option>
          {options.map((opt: any, i: number) => (
            <option key={i} value={typeof opt === 'string' ? opt : opt.value}>
              {typeof opt === 'string' ? opt : opt.label}
            </option>
          ))}
        </select>
      );

    case 'checkbox':
      return (
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: disabled ? 'not-allowed' : 'pointer' }}>
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(key, e.target.checked)}
            disabled={disabled}
            style={{ width: 18, height: 18, accentColor: '#4338CA' }}
          />
          <span style={{ fontSize: 14, color: '#374151' }}>{field.placeholder || field.fieldLabel}</span>
        </label>
      );

    case 'date':
      return (
        <input
          type="date"
          value={value || ''}
          onChange={(e) => onChange(key, e.target.value)}
          style={styles.input}
          disabled={disabled}
        />
      );

    case 'number':
      return (
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(key, e.target.value)}
          placeholder={field.placeholder || ''}
          min={validation.min}
          max={validation.max}
          style={styles.input}
          disabled={disabled}
        />
      );

    case 'email':
      return (
        <input
          type="email"
          value={value || ''}
          onChange={(e) => onChange(key, e.target.value)}
          placeholder={field.placeholder || ''}
          style={styles.input}
          disabled={disabled}
        />
      );

    case 'phone':
      return (
        <input
          type="tel"
          value={value || ''}
          onChange={(e) => onChange(key, e.target.value.replace(/\D/g, '').slice(0, 10))}
          placeholder={field.placeholder || '98XXXXXXXX'}
          maxLength={10}
          style={styles.input}
          disabled={disabled}
        />
      );

    default: // text
      return (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(key, e.target.value)}
          placeholder={field.placeholder || ''}
          style={styles.input}
          disabled={disabled}
        />
      );
  }
};

// ============================================
// MAIN COMPONENT
// ============================================
export const DynamicForm: React.FC<DynamicFormProps> = ({
  formFields,
  documents,
  formData,
  onFieldChange,
  attachments = [],
  onAddAttachment,
  onRemoveAttachment,
  onUpdateAttachmentRemark,
  attachInputRef,
  disabled = false,
}) => {
  const handleAddAttachment = (file: File) => {
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      toast.error('Only JPG, PNG, or PDF files are allowed');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Attachment must be under 5 MB');
      return;
    }
    onAddAttachment?.(file);
  };

  // Group fields by fieldGroup
  const textFields = formFields.filter(f => f.fieldType !== 'file');
  const fileFields = formFields.filter(f => f.fieldType === 'file');
  
  const docFields = documents.filter(d => d.minPlan === 'BASIC' || d.minPlan === 'STANDARD' || d.minPlan === 'PREMIUM' || d.minPlan === 'ELITE');

  return (
    <div className="dynamic-form-root">
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        .dynamic-form-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .dynamic-form-card { animation: fadeUp 0.45s ease both; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.9s linear infinite; }
      `}</style>

      {/* Text Fields Section */}
      {textFields.length > 0 && (
        <SectionCard
          icon={<span style={{ fontSize: 16 }}>📝</span>}
          iconBg="linear-gradient(135deg, #DBEAFE, #BFDBFE)"
          title="Basic Information"
          subtitle="Enter your details"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {textFields.map((field, idx) => (
              <div key={field.id || field.fieldKey} style={{ animationDelay: `${idx * 0.05}s` }}>
                <label style={styles.label}>
                  {field.fieldLabel} {field.isRequired && <span style={{ color: '#EF4444' }}>*</span>}
                </label>
                {renderField(field, formData[field.fieldKey], onFieldChange, disabled)}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Document Requirements Section */}
      {docFields.length > 0 && (
        <SectionCard
          icon={<ImageIcon size={16} />}
          iconBg="linear-gradient(135deg, #FEF3C7, #FDE68A)"
          title="Required Documents"
          subtitle="Upload the following documents"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {docFields.map((doc, idx) => (
              <div key={doc.id || doc.docKey} style={{ animationDelay: `${idx * 0.05}s` }}>
                <FileUploadZone
                  label={doc.docLabel}
                  sub={doc.isMandatory ? 'Required' : 'Optional'}
                  value={(formData[`doc_${doc.docKey}`] as FileWithPreview) || { file: null, preview: null }}
                  onChange={(v) => onFieldChange(`doc_${doc.docKey}`, v)}
                  accept={doc.acceptedTypes}
                  maxSizeMb={doc.maxSizeMb}
                  disabled={disabled}
                />
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Additional Attachments */}
      <SectionCard
        icon={<Paperclip size={16} />}
        iconBg="linear-gradient(135deg, #D1FAE5, #A7F3D0)"
        title="Additional Attachments"
        subtitle="Optional - Supporting documents"
      >
        {attachments.length === 0 ? (
          <div
            style={{
              ...styles.uploadZone,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: '8px', padding: '32px',
            }}
            onClick={() => !disabled && attachInputRef?.current?.click()}
          >
            <Paperclip size={24} color="#9CA3AF" />
            <p style={{ fontSize: 13, color: '#6B7280' }}>Click to attach supporting documents</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {attachments.map((att, idx) => (
              <div key={idx} style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                padding: '14px', background: '#FAFAF8', border: '1px solid #E4E4E0',
                borderRadius: '12px',
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 9, background: '#fff',
                  border: '1px solid #E4E4E0', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {att.file.type.startsWith('image/') ? (
                    <ImageIcon size={16} color="#6B7280" />
                  ) : (
                    <FileText size={16} color="#6B7280" />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {att.file.name}
                  </p>
                  <input
                    type="text"
                    value={att.remark}
                    onChange={(e) => onUpdateAttachmentRemark?.(idx, e.target.value)}
                    placeholder="Add remark (optional)"
                    style={{ ...styles.input, marginTop: 8, padding: '8px 12px', fontSize: 12 }}
                    disabled={disabled}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveAttachment?.(idx)}
                  style={{ padding: 6, borderRadius: 8, border: 'none', cursor: 'pointer', background: 'rgba(254,202,202,0.5)', color: '#DC2626' }}
                  disabled={disabled}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            {attachments.length < 10 && (
              <button
                type="button"
                onClick={() => attachInputRef?.current?.click()}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px', border: '1px dashed #D4D0CA', borderRadius: 12, background: 'transparent', color: '#6B7280', fontSize: 13, cursor: 'pointer' }}
                disabled={disabled}
              >
                <Plus size={14} /> Add another file
              </button>
            )}
          </div>
        )}
      </SectionCard>

      <input
        ref={attachInputRef}
        type="file"
        accept="image/jpeg,image/png,application/pdf"
        style={{ display: 'none' }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleAddAttachment(f); e.target.value = ''; }}
        disabled={disabled}
      />
    </div>
  );
};

export default DynamicForm;