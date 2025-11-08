import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { AlertCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const AdminDisputeMediationPage: React.FC = () => {
  const disputes = [
    { id: '1', number: 'DSP-2025-001', subject: 'Quality issue with delivered batch', buyer: 'Health Foods Inc', supplier: 'NutriSource Ltd', filed: '2025-11-05', status: 'in_review', priority: 'high' },
    { id: '2', number: 'DSP-2025-002', subject: 'Delayed shipment', buyer: 'Wellness Corp', supplier: 'Organic Extracts Co', filed: '2025-10-28', status: 'resolved', priority: 'medium' },
  ];

  const getStatusBadge = (status: string) => {
    const variants = { open: 'bg-blue-100 text-blue-800', in_review: 'bg-orange-100 text-orange-800', resolved: 'bg-green-100 text-green-800', closed: 'bg-gray-100 text-gray-800' };
    return <Badge variant="secondary" className={variants[status as keyof typeof variants]}>{status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = { low: 'bg-gray-100 text-gray-800', medium: 'bg-orange-100 text-orange-800', high: 'bg-red-100 text-red-800' };
    return <Badge variant="secondary" className={variants[priority as keyof typeof variants]}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</Badge>;
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6">Dispute Mediation</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-1">Total Disputes</p>
              <p className="text-3xl font-semibold">12</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-1">In Review</p>
              <p className="text-3xl font-semibold">1</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-1">Avg Resolution Time</p>
              <p className="text-3xl font-semibold">5 days</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Disputes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dispute #</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Parties</TableHead>
                  <TableHead>Filed Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {disputes.map((dispute) => (
                  <TableRow key={dispute.id}>
                    <TableCell className="font-medium">{dispute.number}</TableCell>
                    <TableCell>{dispute.subject}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{dispute.buyer}</div>
                        <div className="text-gray-500">vs {dispute.supplier}</div>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(dispute.filed).toLocaleDateString()}</TableCell>
                    <TableCell>{getPriorityBadge(dispute.priority)}</TableCell>
                    <TableCell>{getStatusBadge(dispute.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Mediate</Button>
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

export default AdminDisputeMediationPage;
