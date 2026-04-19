import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Settings as SettingsIcon, Save, Key, UserCircle, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '../../store';

export function Settings() {
  const user = useAuthStore((state) => state.user);
  const [platformName, setPlatformName] = useState('Protech Planner CA');
  const [contactEmail, setContactEmail] = useState('contact@protechplanner.com');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Settings updated successfully');
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/5 border border-slate-100">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[1.5rem] bg-stone-800 flex items-center justify-center text-white shadow-xl shadow-stone-900/20">
            <SettingsIcon size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Platform Settings</h2>
            <p className="text-slate-500 font-medium mt-1">Configure global platform behavior and access points.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-left font-bold text-slate-900 bg-slate-100 rounded-xl px-4 py-3">
            <Globe size={18} className="mr-3" />
            General Defaults
          </Button>
          <Button variant="ghost" className="w-full justify-start text-left font-bold text-slate-500 hover:text-slate-900 rounded-xl px-4 py-3">
            <Key size={18} className="mr-3" />
            API Keys
          </Button>
          <Button variant="ghost" className="w-full justify-start text-left font-bold text-slate-500 hover:text-slate-900 rounded-xl px-4 py-3">
            <UserCircle size={18} className="mr-3" />
            Admin Profile
          </Button>
        </div>

        <div className="lg:col-span-3">
          <Card className="border-none shadow-xl shadow-slate-900/5 bg-white rounded-[2rem] overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-100">
              <h3 className="font-black text-slate-900">General Configuration</h3>
            </div>
            <CardContent className="p-8">
              <form onSubmit={handleSave} className="space-y-6 max-w-xl">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Platform Name</label>
                  <input
                    type="text"
                    value={platformName}
                    onChange={(e) => setPlatformName(e.target.value)}
                    className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 text-slate-900 font-medium focus:ring-2 focus:ring-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Support Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 text-slate-900 font-medium focus:ring-2 focus:ring-slate-900 outline-none"
                  />
                </div>
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="rounded-xl h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white font-black shadow-xl shadow-slate-900/20"
                  >
                    {isLoading ? 'Saving...' : (
                      <>
                        <Save size={18} className="mr-2" />
                        Apply Settings
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
