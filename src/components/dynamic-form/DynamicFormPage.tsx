import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { DynamicForm, useDynamicForm, FileWithPreview } from './DynamicForm';

interface DynamicFormPageProps {
  serviceId?: number;
  serviceSlug?: string;
  submitEndpoint: string;
  serviceName: string;
  planType: string;
}

export const DynamicFormPage: React.FC<DynamicFormPageProps> = ({
  serviceId,
  serviceSlug,
  submitEndpoint,
  serviceName,
  planType,
}) => {
  const { orderItemId } = useParams<{ orderItemId: string }>();
  const navigate = useNavigate();

  const {
    formFields,
    documents,
    loading,
    submitting,
    submitted,
    orderDetails,
    formData,
    attachments,
    updateField,
    addAttachment,
    removeAttachment,
    updateAttachmentRemark,
    validate,
    submit,
    attachInputRef,
  } = useDynamicForm({ serviceId, orderItemId });

  // Handle form submission
  const handleSubmit = async () => {
    const success = await submit(submitEndpoint);
    if (!success) {
      // Error already handled in submit function
    }
  };

  // Loading state
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#F7F7F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 16,
      }}>
        <Loader2 size={32} className="spin" style={{ color: '#4338CA' }} />
        <p style={{ fontSize: 13, color: '#9CA3AF' }}>Loading form...</p>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          .spin { animation: spin 0.8s linear infinite; }
        `}</style>
      </div>
    );
  }

  // Success state
  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#F7F7F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}>
        <div style={{
          background: '#fff',
          border: '1px solid #E4E4E0',
          borderRadius: '16px',
          maxWidth: 460,
          width: '100%',
          textAlign: 'center',
          padding: 48,
          animation: 'scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #DCFCE7, #BBF7D0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <CheckCircle2 size={32} color="#16A34A" />
          </div>
          <h2 style={{
            fontSize: 28,
            fontWeight: 600,
            color: '#111827',
            marginBottom: 10,
            fontFamily: "'Georgia', serif",
          }}>
            All done!
          </h2>
          <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
            Your {serviceName} details have been submitted successfully. 
            Our team will review your documents and reach out within <strong>1–2 business days</strong>.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'linear-gradient(135deg, #4338CA 0%, #3730A3 100%)',
              borderRadius: 14,
              padding: '14px 28px',
              fontWeight: 600,
              fontSize: 14,
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Go to Dashboard
          </button>
          <style>{`
            @keyframes scaleIn {
              from { opacity: 0; transform: scale(0.85); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Price display
  const planPrice = orderDetails?.price ? `₹${Number(orderDetails.price).toLocaleString('en-IN')}` : '';

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F5' }}>
      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #E4E4E0',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: 8,
              borderRadius: 8,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: '#6B7280',
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #4338CA, #6366F1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Shield size={18} color="white" />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
                {serviceName} — {planType} Plan
              </p>
              {planPrice && orderDetails?.orderNumber && (
                <p style={{ fontSize: 12, color: '#9CA3AF' }}>
                  {orderDetails.orderNumber} · {planPrice}
                </p>
              )}
            </div>
          </div>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 99,
            background: '#EEF2FF',
            color: '#4338CA',
            fontSize: 12,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            <Shield size={12} /> {planType}
          </span>
        </div>
      </div>

      {/* Form Content */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '32px 20px',
        display: 'flex',
        gap: 32,
      }}>
        {/* Main Form */}
        <div style={{ flex: 1 }}>
          <DynamicForm
            formFields={formFields}
            documents={documents}
            formData={formData}
            onFieldChange={updateField}
            attachments={attachments}
            onAddAttachment={addAttachment}
            onRemoveAttachment={removeAttachment}
            onUpdateAttachmentRemark={updateAttachmentRemark}
            attachInputRef={attachInputRef as any}
            disabled={submitting}
          />

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              background: submitting 
                ? '#9CA3AF' 
                : 'linear-gradient(135deg, #4338CA 0%, #3730A3 100%)',
              borderRadius: 14,
              padding: '16px 32px',
              fontWeight: 700,
              fontSize: 15,
              color: 'white',
              border: 'none',
              cursor: submitting ? 'not-allowed' : 'pointer',
              width: '100%',
              marginTop: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              boxShadow: submitting ? 'none' : '0 4px 24px rgba(67,56,202,0.35)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="spin" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />
                Submit Details
              </>
            )}
          </button>
          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
            .spin { animation: spin 0.9s linear infinite; }
          `}</style>
        </div>

        {/* Sidebar */}
        <aside style={{ width: 280, flexShrink: 0, display: 'none', lg: { display: 'block' } }}>
          {/* Progress */}
          <div style={{
            background: '#fff',
            border: '1px solid #E4E4E0',
            borderRadius: 16,
            padding: 20,
          }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#AEAAA6', marginBottom: 12 }}>
              Filing Progress
            </p>
            <div style={{ height: 4, background: '#F0EFEB', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: formData ? '100%' : '20%',
                background: 'linear-gradient(90deg, #4338CA, #818CF8)',
                borderRadius: 99,
                transition: 'width 0.4s ease',
              }} />
            </div>
            <p style={{ fontSize: 12, color: '#6B7280', marginTop: 8 }}>
              {formFields.length + documents.length} fields to complete
            </p>
          </div>

          {/* Trust Badge */}
          <div style={{
            marginTop: 20,
            padding: '14px 16px',
            background: 'linear-gradient(135deg, #EEF2FF, #F5F3FF)',
            border: '1px solid #C7D2FE',
            borderRadius: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Shield size={14} color="#4338CA" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#4338CA' }}>Bank-level Security</span>
            </div>
            <p style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.6 }}>
              Your documents are encrypted with AES-256 and processed by certified CAs.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DynamicFormPage;