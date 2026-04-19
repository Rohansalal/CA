// @ts-nocheck
import { useState } from 'react';
import { useDocuments, downloadDocument } from '../../api/hooks/useDocuments';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/ui/button';
import { FileText, Download } from 'lucide-react';
import type { Document } from '../../types';

export function DocumentList() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useDocuments({ page, limit: 10 });

  const columns = [
    {
      key: 'fileName',
      header: 'File Name',
      render: (doc: Document) => (
        <div className="flex items-center gap-3">
          <FileText className="text-blue-500 w-5 h-5" />
          <span className="font-bold">{doc.fileName}</span>
        </div>
      ),
    },
    { key: 'category', header: 'Category' },
    { key: 'fileType', header: 'Type' },
    {
      key: 'fileSize',
      header: 'Size',
      render: (doc: Document) => <span>{(doc.fileSize / 1024).toFixed(2)} KB</span>,
    },
    {
      key: 'uploadedAt',
      header: 'Uploaded Date',
      render: (doc: Document) => new Date(doc.uploadedAt).toLocaleDateString(),
    },
  ];

  const actions = (doc: Document) => (
    <Button
      variant="outline"
      size="icon"
      onClick={() => downloadDocument(doc.id)}
      className="h-9 w-9 rounded-xl border-slate-200 hover:bg-blue-50"
    >
      <Download className="w-4 h-4 text-blue-600" />
    </Button>
  );

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/5">
        <h2 className="text-3xl font-black text-slate-900">Documents</h2>
        <p className="text-slate-500">Manage client documents and forms.</p>
      </div>
      <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 p-2">
        <DataTable
          data={data?.items || []}
          columns={columns}
          loading={isLoading}
          totalCount={data?.count || 0}
          page={page}
          onPageChange={setPage}
          actions={actions}
          keyExtractor={(doc) => doc.id}
        />
      </div>
    </div>
  );
}
