import React, { useState, useEffect } from 'react';
import { Save, Globe, Mail, Phone, MapPin } from 'lucide-react';
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

  const [loading, setLoading] = useState(false);

  // ======================
  // LOAD DATA
  // ======================
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (!error && data) {
      setSettings({
        siteName: data.site_name || '',
        contactEmail: data.contact_email || '',
        contactPhone: data.contact_phone || '',
        address: data.address || ''
      });
    }
  };

  // ======================
  // INPUT CHANGE
  // ======================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  // ======================
  // SAVE
  // ======================
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('site_settings')
      .update({
        site_name: settings.siteName,
        contact_email: settings.contactEmail,
        contact_phone: settings.contactPhone,
        address: settings.address
      })
      .eq('id', 1);

    setLoading(false);

    if (error) {
      console.error(error);
      alert('Failed to save settings');
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
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Address</label>
              <textarea
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}