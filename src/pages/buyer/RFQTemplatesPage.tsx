import React from 'react';
import { AppLayout } from '../../components/Layout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { FileText, Plus } from 'lucide-react';

const RFQTemplatesPage: React.FC = () => {
  const templates = [
    { id: '1', name: 'Bulk Herbal Extract', category: 'Herbal Extracts', usedCount: 12 },
    { id: '2', name: 'Marine Omega-3', category: 'Marine Extracts', usedCount: 8 },
    { id: '3', name: 'Probiotic Blend', category: 'Probiotics', usedCount: 5 },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1>RFQ Templates</h1>
            <p className="text-gray-600">Save time with reusable RFQ templates</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <Badge variant="secondary">{template.usedCount} uses</Badge>
                </div>
                <CardTitle className="mt-4">{template.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{template.category}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">Use Template</Button>
                  <Button size="sm" variant="outline">Edit</Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center h-full py-12">
              <Plus className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">Create a new template</p>
              <Button variant="outline">New Template</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default RFQTemplatesPage;
