import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Search } from 'lucide-react';
import { mockQuotes } from '../../data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const GlobalQuoteManagementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    const variants = { pending: 'bg-orange-100 text-orange-800', accepted: 'bg-green-100 text-green-800', rejected: 'bg-red-100 text-red-800' };
    return <Badge variant="secondary" className={variants[status as keyof typeof variants]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const filteredQuotes = mockQuotes.filter(quote => {
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    return matchesStatus;
  });

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6">Global Quote Management</h1>
        <Card>
          <CardHeader>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search quotes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quote ID</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>RFQ</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium">QT-{quote.id}</TableCell>
                    <TableCell>NutriSource Ltd</TableCell>
                    <TableCell>RFQ-{quote.rfqId}</TableCell>
                    <TableCell>${quote.totalPrice.toLocaleString()}</TableCell>
                    <TableCell>{new Date(quote.submittedAt).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(quote.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">View Details</Button>
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

export default GlobalQuoteManagementPage;
