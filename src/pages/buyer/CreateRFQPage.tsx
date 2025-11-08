import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Checkbox } from '../../components/ui/checkbox';

const CreateRFQPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    quantity: '',
    unit: 'kg',
    targetPrice: '',
    deadline: '',
    deliveryLocation: '',
    certifications: [] as string[],
  });

  const certificationOptions = [
    'GMP',
    'Organic',
    'ISO 22000',
    'HACCP',
    'Kosher',
    'Halal',
    'Non-GMO',
    'IFOS',
    'USP Verified',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    alert('RFQ created successfully!');
    window.location.hash = '/rfq/my-list';
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h1>Create New RFQ</h1>
          <p className="text-gray-600">Fill in the details to request quotes from verified suppliers</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">RFQ Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Bulk Organic Turmeric Extract"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Product Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="herbal">Herbal Extracts</SelectItem>
                      <SelectItem value="marine">Marine Extracts</SelectItem>
                      <SelectItem value="probiotics">Probiotics</SelectItem>
                      <SelectItem value="vitamins">Vitamins</SelectItem>
                      <SelectItem value="minerals">Minerals</SelectItem>
                      <SelectItem value="amino">Amino Acids</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="deadline">Deadline *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Provide detailed specifications, purity requirements, intended use, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="5000"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit *</Label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                      <SelectItem value="tons">Metric Tons</SelectItem>
                      <SelectItem value="units">Units</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="targetPrice">Target Price per Unit (Optional)</Label>
                <Input
                  id="targetPrice"
                  type="number"
                  placeholder="45.00"
                  value={formData.targetPrice}
                  onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                />
                <p className="text-sm text-gray-500 mt-1">Providing a target price helps suppliers tailor their quotes</p>
              </div>

              <div>
                <Label htmlFor="deliveryLocation">Delivery Location *</Label>
                <Input
                  id="deliveryLocation"
                  placeholder="Los Angeles, CA"
                  value={formData.deliveryLocation}
                  onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Certification Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Select the certifications your suppliers must have. Only verified suppliers with these certifications will see your RFQ.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {certificationOptions.map((cert) => (
                  <label key={cert} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={formData.certifications.includes(cert)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({ ...formData, certifications: [...formData.certifications, cert] });
                        } else {
                          setFormData({ ...formData, certifications: formData.certifications.filter(c => c !== cert) });
                        }
                      }}
                    />
                    <span>{cert}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 mt-6">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit">Publish RFQ</Button>
            <Button type="button" variant="outline">Save as Template</Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default CreateRFQPage;
