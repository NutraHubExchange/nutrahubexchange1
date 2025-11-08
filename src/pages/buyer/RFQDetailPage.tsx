import React from 'react';
import { AppLayout } from '../../components/Layout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Separator } from '../../components/ui/separator';
import { mockRFQs, mockQuotes } from '../../data/mockData';
import { Calendar, MapPin, Package, FileCheck, DollarSign } from 'lucide-react';

const RFQDetailPage: React.FC<{ id?: string }> = ({ id = 'rfq-1' }) => {
  const rfq = mockRFQs.find(r => r.id === id) || mockRFQs[0];
  const quotes = mockQuotes.filter(q => q.rfqId === rfq.id);

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1>{rfq.title}</h1>
            <Badge>{rfq.status}</Badge>
          </div>
          <p className="text-gray-600">Created {new Date(rfq.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>RFQ Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2">Description</h3>
                  <p className="text-gray-600">{rfq.description}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Package className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Quantity</p>
                      <p className="font-medium">{rfq.quantity} {rfq.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Target Price</p>
                      <p className="font-medium">${rfq.targetPrice}/unit</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Deadline</p>
                      <p className="font-medium">{new Date(rfq.deadline).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Delivery Location</p>
                      <p className="font-medium">{rfq.deliveryLocation}</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="h-5 w-5 text-gray-400" />
                    <h3>Required Certifications</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {rfq.certificationRequirements.map((cert) => (
                      <Badge key={cert} variant="outline">{cert}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Received Quotes ({quotes.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {quotes.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Price/Unit</TableHead>
                        <TableHead>Total Price</TableHead>
                        <TableHead>Lead Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quotes.map((quote) => (
                        <TableRow key={quote.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{quote.supplierCompany}</p>
                              <p className="text-sm text-gray-600">{quote.supplierName}</p>
                            </div>
                          </TableCell>
                          <TableCell>${quote.pricePerUnit}</TableCell>
                          <TableCell className="font-medium">${quote.totalPrice.toLocaleString()}</TableCell>
                          <TableCell>{quote.leadTime}</TableCell>
                          <TableCell>
                            <Badge variant={quote.status === 'accepted' ? 'default' : 'secondary'}>
                              {quote.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {quote.status === 'pending' && (
                              <Button size="sm" variant="outline">Accept</Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center py-8 text-gray-500">No quotes received yet</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">Edit RFQ</Button>
                <Button variant="outline" className="w-full">Close RFQ</Button>
                <Button variant="outline" className="w-full">Save as Template</Button>
                <Separator />
                <Button variant="destructive" className="w-full">Delete RFQ</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Total Quotes</p>
                  <p className="text-2xl font-semibold">{quotes.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Quote Price</p>
                  <p className="text-2xl font-semibold">
                    ${quotes.length > 0 ? Math.round(quotes.reduce((sum, q) => sum + q.pricePerUnit, 0) / quotes.length) : 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Days Remaining</p>
                  <p className="text-2xl font-semibold">
                    {Math.max(0, Math.ceil((new Date(rfq.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default RFQDetailPage;
