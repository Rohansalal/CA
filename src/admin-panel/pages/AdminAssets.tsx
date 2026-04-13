import React, { useState, useEffect, useCallback } from "react";
import { 
  FileSearch, 
  FileText, 
  Image as ImageIcon, 
  Download, 
  ExternalLink, 
  Search, 
  Filter, 
  Trash2, 
  User, 
  Clock, 
  Tag,
  Paperclip,
  UploadCloud,
  PlusCircle
} from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import api from "../../utils/api";
import { cn } from "../../components/ui/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "../../components/ui/dropdown-menu";

interface Asset {
  id: string;
  source: string;
  name: string;
  fileType: string;
  documentType: string;
  userId: number | null;
  email?: string;
  filePath: string;
  url: string;
  createdAt: string;
}

export const AdminAssets: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/assets');
      setAssets(res.data.assets);
    } catch (err) {
      console.error("Failed to fetch assets", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('assets', files[i]);
    }

    try {
      // Simulate upload
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      console.log("Uploading files:", files);
      // In a real scenario, you'd call your API here:
      // await api.post('/admin/upload-assets', formData);
      fetchAssets(); // Refresh assets after upload
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  }, [handleFileUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files);
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         asset.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "ALL" || asset.source === filterType;
    return matchesSearch && matchesFilter;
  });

  const getSourceBadge = (source: string) => {
    switch(source) {
      case 'ITR_BASIC': return <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-none">ITR Basic</Badge>;
      case 'ITR_ATTACHMENT': return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none">ITR Attachment</Badge>;
      case 'DOCUMENT': return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">Order Doc</Badge>;
      case 'WORKFLOW': return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none">Workflow</Badge>;
      default: return <Badge variant="outline">{source}</Badge>;
    }
  };

  const handleDownload = (asset: Asset) => {
    // Navigate to proxy URL with download=true to force browser attachment
    const url = `${api.defaults.baseURL}${asset.url}`.replace('/api/api/', '/api/');
    window.open(`${url}${url.includes('?') ? '&' : '?'}download=true`, '_blank');
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Storage & R2 Repository</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Asset Repository</h1>
            <p className="text-slate-500 font-medium">Browse and manage all user certificates, PAN/Aadhaar cards, and reports.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-10 px-4 rounded-xl border-slate-200 transition-all hover:bg-slate-50 flex items-center gap-2 uppercase tracking-wider text-[11px] font-bold">
                        <PlusCircle className="h-4 w-4" />
                        Bulk Actions
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Download Selected</DropdownMenuItem>
                    <DropdownMenuItem>Delete Selected</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Tag Selected</DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
             <Button variant="outline" className="h-10 px-4 rounded-xl border-slate-200 transition-all hover:bg-slate-50 flex items-center gap-2 uppercase tracking-wider text-[11px] font-bold" onClick={fetchAssets}>
                Refresh List
             </Button>
          </div>
        </div>

        {/* Filters and Upload */}
        <Card className="rounded-2xl border-slate-200 bg-white shadow-sm overflow-hidden">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search assets by name or user email..." 
                  className="pl-10 h-11 rounded-xl border-slate-200 focus-visible:ring-indigo-500/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                {['ALL', 'ITR_BASIC', 'ITR_ATTACHMENT', 'DOCUMENT', 'WORKFLOW'].map((type) => (
                  <Button 
                    key={type}
                    variant={filterType === type ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                        "rounded-lg px-4 h-9 text-[11px] font-bold uppercase tracking-wider transition-all",
                        filterType === type ? "bg-indigo-600 text-black shadow-md shadow-indigo-100" : "text-slate-500"
                    )}
                    onClick={() => setFilterType(type)}
                  >
                    {type.replace('_', ' ')}
                  </Button>
                ))}
              </div>
            </div>
            {/* File Upload Area */}
            <div 
                className={cn(
                    "mt-6 border-2 border-dashed rounded-2xl p-6 text-center transition-colors",
                    isDragging ? "border-indigo-500 bg-indigo-50/50" : "border-slate-200 bg-slate-50"
                )}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input 
                    type="file" 
                    multiple 
                    className="hidden" 
                    id="asset-upload-input" 
                    onChange={handleFileSelect} 
                />
                <label htmlFor="asset-upload-input" className="cursor-pointer flex flex-col items-center justify-center">
                    <UploadCloud className={cn(
                        "h-10 w-10 mb-3 transition-colors",
                        isDragging ? "text-indigo-600" : "text-slate-400"
                    )} />
                    <p className="text-sm font-medium text-slate-700">
                        {isDragging ? "Drop files here to upload" : "Drag & drop files or click to browse"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Supports all common document and image formats</p>
                </label>
            </div>
          </CardContent>
        </Card>

        {/* Asset Grid */}
        {loading ? (
             <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500/10 border-t-indigo-500"></div>
                <p className="text-slate-500 font-medium animate-pulse">Scanning R2 storage records...</p>
             </div>
        ) : filteredAssets.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <FileSearch className="h-12 w-12 text-slate-200 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-1">No Assets Found</h3>
                <p className="text-slate-400 max-w-sm text-center">We couldn't find any file matching your criteria. Try adjusting your search or filters.</p>
             </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
            {filteredAssets.map((asset) => (
              <Card key={asset.id} className="group rounded-2xl border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
                <div className="relative aspect-[4/3] bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
                  {/* Preview Logic */}
                  {asset.fileType?.includes('image') || asset.filePath.match(/\.(jpg|jpeg|png)$/i) || asset.filePath.match(/\.enc$/i) ? (
                    <img 
                      src={`${api.defaults.baseURL}${asset.url}`.replace('/api/api/', '/api/')} 
                      alt={asset.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                         // Fallback to icon on error
                         e.currentTarget.style.display = 'none';
                         e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-300">
                       <FileText className="h-12 w-12" />
                       <span className="text-[10px] font-bold mt-2 uppercase">{asset.fileType.split('/').pop() || 'FILE'}</span>
                    </div>
                  )}
                  {/* Icon Fallback if image fails or is actually a PDF */}
                  <div className="fallback-icon hidden flex-col items-center justify-center text-slate-300 h-full w-full">
                     <FileText className="h-12 w-12" />
                  </div>

                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <Button variant="secondary" size="icon" className="h-10 w-10 rounded-xl shadow-lg hover:bg-white" onClick={() => handleDownload(asset)}>
                      <ExternalLink className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-4 flex-1 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-slate-900 text-sm truncate">{asset.name}</h3>
                      <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">{asset.documentType || 'Generic Asset'}</p>
                    </div>
                    {getSourceBadge(asset.source)}
                  </div>

                  <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="h-3 w-3" />
                      <span className="text-[10px] font-medium">{new Date(asset.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                       <Paperclip className="h-3 w-3" />
                       <span className="text-[10px] font-medium tracking-tight">Order #{asset.orderId || 'N/A'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
