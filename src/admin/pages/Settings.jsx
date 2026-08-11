import { useState } from 'react';
import { changeAdminPin } from '../../lib/storage';
import { Settings as SettingsIcon, Save } from 'lucide-react';

export default function Settings() {
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPin !== confirmPin) {
      setError('New PINs do not match.');
      return;
    }

    if (newPin.length < 4) {
      setError('PIN must be at least 4 characters long.');
      return;
    }

    const success = changeAdminPin(oldPin, newPin);
    if (success) {
      setMessage('PIN changed successfully.');
      setOldPin('');
      setNewPin('');
      setConfirmPin('');
    } else {
      setError('Incorrect current PIN.');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
           Settings
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your admin preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
              <SettingsIcon size={14} className="text-sky-400" />
            </div>
            <h2 className="text-slate-200 font-semibold text-base">Change Admin PIN</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-1.5">Current PIN</label>
              <input 
                type="password" 
                value={oldPin} 
                onChange={(e) => setOldPin(e.target.value)} 
                required
                className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-600 outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/15 transition tracking-widest"
                placeholder="••••"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-1.5">New PIN</label>
              <input 
                type="password" 
                value={newPin} 
                onChange={(e) => setNewPin(e.target.value)} 
                required
                className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-600 outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/15 transition tracking-widest"
                placeholder="••••"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-1.5">Confirm New PIN</label>
              <input 
                type="password" 
                value={confirmPin} 
                onChange={(e) => setConfirmPin(e.target.value)} 
                required
                className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-600 outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/15 transition tracking-widest"
                placeholder="••••"
              />
            </div>
            
            {error && <p className="text-red-400 text-xs">{error}</p>}
            {message && <p className="text-emerald-400 text-xs">{message}</p>}

            <button type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-colors shadow-lg shadow-sky-500/20 w-max">
              <Save size={16} /> Update PIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
