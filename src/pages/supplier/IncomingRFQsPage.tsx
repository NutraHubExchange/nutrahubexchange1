import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Search, Calendar, Package, MapPin } from 'lucide-react';
import { mockRFQs } from '../../data/mockData';

const IncomingRFQsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRFQs = mockRFQs.filter(rfq => 
    rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) && rfq.status === 'open'
  );

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1>Incoming RFQs</h1>
          <p className="text-gray-600">Browse and respond to relevant RFQ opportunities</p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search RFQs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredRFQs.map((rfq) => (
            <Card key={rfq.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{rfq.title}</CardTitle>
                    <p className="text-sm text-gray-600">{rfq.buyerCompany}</p>
                  </div>
                  <Badge>{rfq.productCategory}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{rfq.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span>{rfq.quantity} {rfq.unit}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Deadline: {new Date(rfq.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{rfq.deliveryLocation}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-sm font-medium">Required Certifications:</span>
                  {rfq.certificationRequirements.map((cert) => (
                    <Badge key={cert} variant="outline">{cert}</Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <a href={`#/rfq/incoming/detail/${rfq.id}`} className="flex-1">
                    <Button className="w-full">Submit Quote</Button>
                  </a>
                  <Button variant="outline">Save for Later</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default IncomingRFQsPage;
