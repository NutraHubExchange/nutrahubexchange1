import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { mockRFQs } from '../../data/mockData';

const IncomingRFQDetailPage: React.FC<{ id?: string }> = ({ id = 'rfq-1' }) => {
  const rfq = mockRFQs.find(r => r.id === id) || mockRFQs[0];
  const [quoteData, setQuoteData] = useState({
    pricePerUnit: '',
    leadTime: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Quote submitted successfully!');
    window.location.hash = '/quotes/my-list';
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>RFQ Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h2>{rfq.title}</h2>
                  <p className="text-gray-600 mt-1">{rfq.buyerCompany}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-2">Description</h3>
                  <p className="text-gray-600">{rfq.description}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Quantity</p>
                    <p className="font-medium">{rfq.quantity} {rfq.unit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Target Price</p>
                    <p className="font-medium">${rfq.targetPrice}/unit</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="font-medium">{new Date(rfq.deadline).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delivery Location</p>
                    <p className="font-medium">{rfq.deliveryLocation}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-2">Required Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {rfq.certificationRequirements.map((cert) => (
                      <Badge key={cert} variant="outline">{cert}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Quote</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="pricePerUnit">Price per Unit (USD) *</Label>
                    <Input
                      id="pricePerUnit"
                      type="number"
                      step="0.01"
                      placeholder="45.00"
                      value={quoteData.pricePerUnit}
                      onChange={(e) => setQuoteData({ ...quoteData, pricePerUnit: e.target.value })}
                      required
                    />
                  </div>

                  {quoteData.pricePerUnit && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Total Price</p>
                      <p className="text-2xl font-semibold">
                        ${(parseFloat(quoteData.pricePerUnit) * rfq.quantity).toLocaleString()}
                      </p>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="leadTime">Lead Time *</Label>
                    <Input
                      id="leadTime"
                      placeholder="e.g., 6 weeks"
                      value={quoteData.leadTime}
                      onChange={(e) => setQuoteData({ ...quoteData, leadTime: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      rows={4}
                      placeholder="Provide any additional information about your quote, certifications, or terms..."
                      value={quoteData.notes}
                      onChange={(e) => setQuoteData({ ...quoteData, notes: e.target.value })}
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full">Submit Quote</Button>
                    <Button type="button" variant="outline" className="w-full mt-2" onClick={() => window.history.back()}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default IncomingRFQDetailPage;
