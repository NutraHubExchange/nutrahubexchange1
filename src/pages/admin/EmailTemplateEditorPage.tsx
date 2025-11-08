import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from 'sonner@2.0.3';
import { Mail, Eye } from 'lucide-react';

const EmailTemplateEditorPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('welcome');
  const [subject, setSubject] = useState('Welcome to NutriExchange');
  const [body, setBody] = useState('Hello {{name}},\n\nWelcome to NutriExchange! We\'re excited to have you on board.');

  const templates = [
    { value: 'welcome', label: 'Welcome Email' },
    { value: 'rfq_created', label: 'RFQ Created' },
    { value: 'quote_received', label: 'Quote Received' },
    { value: 'password_reset', label: 'Password Reset' },
    { value: 'certification_approved', label: 'Certification Approved' },
    { value: 'dispute_filed', label: 'Dispute Filed' },
  ];

  const handleSave = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    toast.success('Email template saved successfully');
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="mb-6">Email Template Editor</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {templates.map((template) => (
                    <button
                      key={template.value}
                      onClick={() => setSelectedTemplate(template.value)}
                      className={`w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                        selectedTemplate === template.value ? 'bg-blue-50 border border-blue-200' : 'border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{template.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Edit Template</CardTitle>
                <CardDescription>
                  Customize the email template content. Use {'{{'}variable{'}}'} for dynamic content.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter email subject..."
                  />
                </div>
                <div>
                  <Label htmlFor="body">Email Body</Label>
                  <Textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={12}
                    placeholder="Enter email content..."
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Available variables: {'{{'}name{'}}'},  {'{{'}email{'}}'},  {'{{'}company{'}}'},  {'{{'}date{'}}'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave}>Save Template</Button>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Template Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 bg-gray-50">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <p className="font-semibold mb-4">{subject}</p>
                    <div className="whitespace-pre-wrap text-sm">
                      {body.replace(/\{\{(\w+)\}\}/g, (_, key) => {
                        const examples: Record<string, string> = { name: 'John Doe', email: 'john@example.com', company: 'Example Corp', date: new Date().toLocaleDateString() };
                        return examples[key] || `{{${key}}}`;
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EmailTemplateEditorPage;
