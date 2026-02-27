import React, { useState, useEffect } from 'react';
import { Save, Globe, Mail } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { supabase } from '../../../lib/supabase';

export function SiteSettings() {
  const [settings, setSettings] = useState({
    siteName: '',
    contactEmail: '',
    contactPhone: '',
    address: ''
  });

  // Load data saat halaman dibuka
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single();

    if (data) {
      setSettings(data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('site_settings')
      .update(settings)
      .eq('id', 1);

    if (error) {
      alert('Failed to save settings');
      console.error(error);
    } else {
      alert('Settings saved successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#191919]">Site Settings</h2>
        <p className="text-slate-500 text-sm">
          Configure general website information and contacts.
        </p>
      </div>

      <Card className="border-none shadow-sm max-w-2xl">
        <CardContent className="p-6">
          <form onSubmit={handleSave} className="space-y-6">

            <div>
              <label className="block text-sm mb-1">Site Name</label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName || ''}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={settings.contactEmail || ''}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input
                type="text"
                name="contactPhone"
                value={settings.contactPhone || ''}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Address</label>
              <textarea
                name="address"
                value={settings.address || ''}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <Button type="submit" className="bg-[#AE8737] text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}