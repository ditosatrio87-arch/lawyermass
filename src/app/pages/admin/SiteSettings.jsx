import React, { useState } from 'react';
import { Save, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export function SiteSettings() {
  const [settings, setSettings] = useState({
    siteName: 'M.A.S. Law Firm',
    contactEmail: 'contact@maslaw.com',
    contactPhone: '+62 21 555 0123',
    address: 'Menara Sudirman, Jakarta Selatan'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // In a real app, this would save to backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#191919]">Site Settings</h2>
        <p className="text-slate-500 text-sm">Configure general website information and contacts.</p>
      </div>

      <Card className="border-none shadow-sm max-w-2xl">
        <CardContent className="p-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#191919] flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#AE8737]" />
                General Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-[#191919] mb-1">Site Name</label>
                <input
                  type="text"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE8737] focus:border-transparent"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-[#191919] flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#AE8737]" />
                Contact Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#191919] mb-1">Contact Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE8737] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#191919] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={settings.contactPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE8737] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#191919] mb-1">Office Address</label>
                <textarea
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE8737] focus:border-transparent"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" className="bg-[#AE8737] hover:bg-[#8f6e2d] text-white flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
