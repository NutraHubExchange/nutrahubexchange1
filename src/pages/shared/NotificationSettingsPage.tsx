import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Switch } from '../../components/ui/switch';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner@2.0.3';
import { Bell, Mail, MessageSquare, FileText, DollarSign } from 'lucide-react';

interface NotificationPreferences {
  emailNotifications: {
    newRFQ: boolean;
    newQuote: boolean;
    messageReceived: boolean;
    rfqStatusChange: boolean;
    paymentReceived: boolean;
    disputeUpdate: boolean;
  };
  pushNotifications: {
    newRFQ: boolean;
    newQuote: boolean;
    messageReceived: boolean;
    rfqStatusChange: boolean;
    paymentReceived: boolean;
    disputeUpdate: boolean;
  };
  weeklyDigest: boolean;
  marketingEmails: boolean;
}

const NotificationSettingsPage: React.FC = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    emailNotifications: {
      newRFQ: true,
      newQuote: true,
      messageReceived: true,
      rfqStatusChange: true,
      paymentReceived: true,
      disputeUpdate: true,
    },
    pushNotifications: {
      newRFQ: false,
      newQuote: true,
      messageReceived: true,
      rfqStatusChange: false,
      paymentReceived: true,
      disputeUpdate: true,
    },
    weeklyDigest: true,
    marketingEmails: false,
  });

  const handleEmailToggle = (key: keyof NotificationPreferences['emailNotifications']) => {
    setPreferences({
      ...preferences,
      emailNotifications: {
        ...preferences.emailNotifications,
        [key]: !preferences.emailNotifications[key],
      },
    });
  };

  const handlePushToggle = (key: keyof NotificationPreferences['pushNotifications']) => {
    setPreferences({
      ...preferences,
      pushNotifications: {
        ...preferences.pushNotifications,
        [key]: !preferences.pushNotifications[key],
      },
    });
  };

  const handleSave = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    toast.success('Notification preferences saved');
  };

  const notificationTypes = [
    { key: 'newRFQ', label: 'New RFQ Opportunities', description: 'When new RFQs match your profile', icon: FileText },
    { key: 'newQuote', label: 'New Quotes Received', description: 'When suppliers submit quotes', icon: DollarSign },
    { key: 'messageReceived', label: 'New Messages', description: 'When you receive a message', icon: MessageSquare },
    { key: 'rfqStatusChange', label: 'RFQ Status Updates', description: 'When RFQ status changes', icon: FileText },
    { key: 'paymentReceived', label: 'Payment Updates', description: 'When payments are processed', icon: DollarSign },
    { key: 'disputeUpdate', label: 'Dispute Updates', description: 'When disputes are updated', icon: Bell },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="mb-2">Notification Settings</h1>
          <p className="text-gray-600">Manage how you receive notifications</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Notifications
              </CardTitle>
              <CardDescription>
                Choose which emails you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificationTypes.map((type) => (
                  <div key={type.key} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-start gap-3">
                      <type.icon className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">{type.label}</p>
                        <p className="text-sm text-gray-500">{type.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={preferences.emailNotifications[type.key as keyof typeof preferences.emailNotifications]}
                      onCheckedChange={() => handleEmailToggle(type.key as keyof typeof preferences.emailNotifications)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Push Notifications
              </CardTitle>
              <CardDescription>
                Get real-time notifications in your browser
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificationTypes.map((type) => (
                  <div key={type.key} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-start gap-3">
                      <type.icon className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">{type.label}</p>
                        <p className="text-sm text-gray-500">{type.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={preferences.pushNotifications[type.key as keyof typeof preferences.pushNotifications]}
                      onCheckedChange={() => handlePushToggle(type.key as keyof typeof preferences.pushNotifications)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Digest & Marketing</CardTitle>
              <CardDescription>
                Additional notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">Weekly Activity Digest</p>
                    <p className="text-sm text-gray-500">
                      Receive a weekly summary of your activity
                    </p>
                  </div>
                  <Switch
                    checked={preferences.weeklyDigest}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, weeklyDigest: checked })}
                  />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-gray-500">
                      Receive updates about new features and promotions
                    </p>
                  </div>
                  <Switch
                    checked={preferences.marketingEmails}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, marketingEmails: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={handleSave}>Save Preferences</Button>
            <Button variant="outline">Reset to Default</Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotificationSettingsPage;
