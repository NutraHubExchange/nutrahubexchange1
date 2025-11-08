import React from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { FileCheck, Check, X, Eye } from 'lucide-react';
import { mockCertifications } from '../../data/mockData';
import { toast } from 'sonner@2.0.3';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const PendingCertificationsPage: React.FC = () => {
  const pendingCerts = mockCertifications.filter(c => c.status === 'pending');

  const handleApprove = (id: string) => {
    toast.success('Certification approved');
  };

  const handleReject = (id: string) => {
    toast.error('Certification rejected');
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6">Pending Certifications</h1>
        <Card>
          <CardHeader>
            <CardTitle>Certifications Awaiting Review</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Number</TableHead>
                  <TableHead>Issued Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingCerts.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-medium">{cert.type}</TableCell>
                    <TableCell>NutriSource Ltd</TableCell>
                    <TableCell>{cert.number}</TableCell>
                    <TableCell>{new Date(cert.issuedDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(cert.expiryDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleApprove(cert.id)}>
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleReject(cert.id)}>
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {pendingCerts.length === 0 && (
              <div className="text-center py-12">
                <FileCheck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No pending certifications</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default PendingCertificationsPage;
