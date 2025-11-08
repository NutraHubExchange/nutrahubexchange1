import React from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { mockQuotes } from '../../data/mockData';

const MyQuotesPage: React.FC = () => {
  const myQuotes = mockQuotes.filter(q => q.supplierId === 'supplier-1');

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1>My Submitted Quotes</h1>
          <p className="text-gray-600">Track the status of all your submitted quotes</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quotes Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>RFQ</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Price/Unit</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Lead Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myQuotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium">RFQ #{quote.rfqId}</TableCell>
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
                      <Badge 
                        variant={
                          quote.status === 'accepted' ? 'default' : 
                          quote.status === 'rejected' ? 'destructive' : 
                          'secondary'
                        }
                      >
                        {quote.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(quote.submittedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default MyQuotesPage;
