import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Shield, 
  BellRing, 
  Globe, 
  CreditCard, 
  Moon, 
  Bell, 
  SmartphoneIcon, 
  Fingerprint 
} from 'lucide-react';
import { Card, Toggle, Select, Badge, Button } from '../ui';
import { useDashboard } from '../../context/DashboardContext';

export const Setting: React.FC = () => {
  const { darkMode, setDarkMode, settings, setSettings } = useDashboard();
  return (
    <motion.div 
      key="settings"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your account preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-2">
          {[
            { id: 'profile', label: 'Profile Settings', icon: User },
            { id: 'security', label: 'Security & 2FA', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: BellRing },
            { id: 'language', label: 'Language & Region', icon: Globe },
            { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
          ].map((item, idx) => (
            <Button 
              key={item.id}
              variant={idx === 0 ? 'primary' : 'ghost'}
              className={`w-full flex items-center justify-start gap-3 p-3 rounded-xl font-medium transition-all ${
                idx !== 0 ? 'text-slate-600 dark:text-slate-400' : ''
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Button>
          ))}
        </div>

        <div className="md:col-span-3 space-y-8">
          <Card className="p-6 space-y-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">General Preferences</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Toggle 
                enabled={darkMode}
                onChange={setDarkMode}
                label="Dark Mode"
                description="Switch between light and dark themes"
                icon={<Moon size={20} />}
              />
              <Toggle 
                enabled={settings.notifications}
                onChange={(val) => setSettings({...settings, notifications: val})}
                label="Push Notifications"
                description="Receive alerts on your desktop"
                icon={<Bell size={20} />}
              />
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Language & Region</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select 
                  label="System Language"
                  value={settings.language}
                  onChange={(e) => setSettings({...settings, language: e.target.value})}
                  options={[
                    { value: 'English', label: 'English (US)' },
                    { value: 'Bengali', label: 'Bengali (BD)' },
                    { value: 'Spanish', label: 'Spanish (ES)' },
                    { value: 'French', label: 'French (FR)' },
                  ]}
                />
                <Select 
                  label="Timezone"
                  defaultValue="GMT+6"
                  options={[
                    { value: 'GMT+6', label: 'Dhaka (GMT+6)' },
                    { value: 'GMT+0', label: 'London (GMT+0)' },
                    { value: 'GMT-5', label: 'New York (GMT-5)' },
                  ]}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Security & Access</h3>
              <Badge variant="success">Secured</Badge>
            </div>

            <div className="space-y-4">
              <Toggle 
                enabled={settings.twoFactor}
                onChange={(val) => setSettings({...settings, twoFactor: val})}
                label="Two-Factor Authentication (2FA)"
                description="Add an extra layer of security using your smartphone"
                icon={<SmartphoneIcon size={20} />}
              />
              
              <AnimatePresence>
                {settings.twoFactor && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg">
                          <Fingerprint size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">Biometric Login</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Use FaceID or TouchID for faster login</p>
                        </div>
                        <Toggle 
                          enabled={settings.biometric}
                          onChange={(val) => setSettings({...settings, biometric: val})}
                          className="ml-auto"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};
