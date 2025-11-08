import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Search } from 'lucide-react';
import { mockRFQs } from '../../data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const GlobalRFQManagementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    const variants = { open: 'bg-blue-100 text-blue-800', closed: 'bg-gray-100 text-gray-800', awarded: 'bg-green-100 text-green-800' };
    return <Badge variant="secondary" className={variants[status as keyof typeof variants]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const filteredRFQs = mockRFQs.filter(rfq => {
    const matchesSearch = rfq.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rfq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6">Global RFQ Management</h1>
        <Card>
          <CardHeader>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search RFQs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="awarded">Awarded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>RFQ Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Quotes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRFQs.map((rfq) => (
                  <TableRow key={rfq.id}>
                    <TableCell className="font-medium">{rfq.title}</TableCell>
                    <TableCell>{rfq.category}</TableCell>
                    <TableCell>Health Foods Inc</TableCell>
                    <TableCell>{new Date(rfq.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{rfq.quotesCount}</TableCell>
                    <TableCell>{getStatusBadge(rfq.status)}</TableCell>
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

export default GlobalRFQManagementPage;
