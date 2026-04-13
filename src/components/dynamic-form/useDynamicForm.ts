import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/utils/api';
import { toast } from 'sonner';
import { useAuth } from '@/user-panel/contexts/AuthContext';

export interface FormField {
  id: number;
  serviceId: number;
  fieldKey: string;
  fieldLabel: string;
  fieldType: string;
  fieldOptions: string | null;
  placeholder: string | null;
  isRequired: boolean;
  minPlan: string;
  fieldGroup: string;
  displayOrder: number;
  validation: string | null;
}

export interface DocumentRequirement {
  id: number;
  serviceId: number;
  docKey: string;
  docLabel: string;
  isMandatory: boolean;
  minPlan: string;
  acceptedTypes: string;
  maxSizeMb: number;
  displayOrder: number;
}

interface FileWithPreview {
  file: File | null;
  preview: string | null;
}

interface Attachment {
  file: File;
  remark: string;
}

interface DynamicFormData {
  [key: string]: string | File | null | FileWithPreview | Attachment[];
}

interface UseDynamicFormProps {
  serviceId?: number;
  orderItemId?: string;
}

export function useDynamicForm({ serviceId, orderItemId }: UseDynamicFormProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [documents, setDocuments] = useState<DocumentRequirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const [formData, setFormData] = useState<DynamicFormData>({});
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const attachInputRef = useRef<HTMLInputElement>(null);

  // Fetch form fields and documents from API
  useEffect(() => {
    const fetchFormConfig = async () => {
      if (!serviceId && !orderItemId) {
        setLoading(false);
        return;
      }

      try {
        // If we have orderItemId, fetch order details first to get serviceId
        if (orderItemId && !serviceId) {
          const orderRes = await api.get(`/orders/items/${orderItemId}`);
          if (orderRes.data?.orderItem) {
            setOrderDetails(orderRes.data.orderItem);
            // Now fetch form fields for this service
            const serviceIdFromOrder = orderRes.data.orderItem.serviceId;
            const [fieldsRes, docsRes] = await Promise.all([
              api.get(`/services/${serviceIdFromOrder}/form-fields`),
              api.get(`/services/${serviceIdFromOrder}/documents`),
            ]);
            setFormFields(fieldsRes.data?.fields || []);
            setDocuments(docsRes.data?.documents || []);
          }
        } else if (serviceId) {
          const [fieldsRes, docsRes] = await Promise.all([
            api.get(`/services/${serviceId}/form-fields`),
            api.get(`/services/${serviceId}/documents`),
          ]);
          setFormFields(fieldsRes.data?.fields || []);
          setDocuments(docsRes.data?.documents || []);
        }
      } catch (error: any) {
        console.error('Error fetching form config:', error);
        // Fallback to empty - form will show generic fields
        setFormFields([]);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFormConfig();
  }, [serviceId, orderItemId]);

  // Pre-fill user data
  useEffect(() => {
    if (user && formFields.length > 0) {
      const prefilled: DynamicFormData = {};
      formFields.forEach(field => {
        const key = field.fieldKey.toLowerCase();
        if (key.includes('email') && user.email) {
          prefilled[field.fieldKey] = user.email;
        } else if (key.includes('phone') && (user as any).phone) {
          prefilled[field.fieldKey] = (user as any).phone;
        } else if (key.includes('name') && user.name) {
          prefilled[field.fieldKey] = user.name;
        }
      });
      if (Object.keys(prefilled).length > 0) {
        setFormData(prev => ({ ...prev, ...prefilled }));
      }
    }
  }, [user, formFields]);

  const updateField = useCallback((key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  }, []);

  const addAttachment = useCallback((file: File) => {
    setAttachments(prev => [...prev, { file, remark: '' }]);
  }, []);

  const removeAttachment = useCallback((index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateAttachmentRemark = useCallback((index: number, remark: string) => {
    setAttachments(prev => prev.map((a, i) => i === index ? { ...a, remark } : a));
  }, []);

  const validate = useCallback((): string | null => {
    // Check required text fields
    for (const field of formFields) {
      if (field.isRequired) {
        const value = formData[field.fieldKey];
        if (!value || (typeof value === 'string' && !value.trim())) {
          return `${field.fieldLabel} is required`;
        }
      }
    }

    // Check required documents
    for (const doc of documents) {
      if (doc.isMandatory) {
        const docKey = `doc_${doc.docKey}`;
        const value = formData[docKey] as FileWithPreview | undefined;
        if (!value?.file) {
          return `${doc.docLabel} is required`;
        }
      }
    }

    return null;
  }, [formFields, documents, formData]);

  const submit = useCallback(async (endpoint: string) => {
    const err = validate();
    if (err) {
      toast.error(err);
      return false;
    }

    setSubmitting(true);
    try {
      const formDataToSend = new FormData();
      
      // Add text fields
      formFields.forEach(field => {
        const value = formData[field.fieldKey];
        if (typeof value === 'string') {
          formDataToSend.append(field.fieldKey, value);
        }
      });

      // Add documents
      documents.forEach(doc => {
        const docKey = `doc_${doc.docKey}`;
        const value = formData[docKey] as FileWithPreview | undefined;
        if (value?.file) {
          formDataToSend.append(docKey, value.file);
        }
      });

      // Add attachments
      attachments.forEach(a => {
        formDataToSend.append('attachments', a.file);
      });
      if (attachments.length > 0) {
        formDataToSend.append('attachmentRemarks', JSON.stringify(attachments.map(a => a.remark)));
      }

      if (orderItemId) {
        formDataToSend.append('orderItemId', orderItemId);
      }

      const res = await api.post(endpoint, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data?.error) {
        throw new Error(res.data.error);
      }

      setSubmitted(true);
      toast.success('Form submitted successfully!');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong. Please try again.');
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [formData, attachments, orderItemId, formFields, documents, validate]);

  return {
    // State
    formFields,
    documents,
    loading,
    submitting,
    submitted,
    orderDetails,
    formData,
    attachments,
    
    // Actions
    updateField,
    addAttachment,
    removeAttachment,
    updateAttachmentRemark,
    validate,
    submit,
    
    // Refs
    attachInputRef,
    
    // Helpers
    getFieldValue: (key: string) => formData[key],
  };
}

// Utility to parse field options
export function parseFieldOptions(options: string | null): any[] {
  if (!options) return [];
  try {
    return JSON.parse(options);
  } catch {
    return [];
  }
}

// Utility to parse validation rules
export function parseValidation(validation: string | null): any {
  if (!validation) return {};
  try {
    return JSON.parse(validation);
  } catch {
    return {};
  }
}