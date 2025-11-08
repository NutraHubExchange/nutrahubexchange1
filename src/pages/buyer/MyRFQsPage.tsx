import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Search, Plus } from 'lucide-react';
import { mockRFQs } from '../../data/mockData';

const MyRFQsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const myRFQs = mockRFQs.filter(rfq => rfq.buyerId === 'buyer-1');

  const filteredRFQs = myRFQs.filter(rfq => {
    const matchesSearch = rfq.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rfq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1>My RFQs</h1>
            <p className="text-gray-600">Manage all your requests for quotes</p>
          </div>
          <a href="#/rfq/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create RFQ
            </Button>
          </a>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search RFQs..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
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
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Quotes</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRFQs.map((rfq) => (
                  <TableRow key={rfq.id}>
                    <TableCell className="font-medium">{rfq.title}</TableCell>
                    <TableCell>{rfq.productCategory}</TableCell>
                    <TableCell>{rfq.quantity} {rfq.unit}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{rfq.quotesCount}</Badge>
                    </TableCell>
                    <TableCell>{new Date(rfq.deadline).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={rfq.status === 'open' ? 'default' : 'secondary'}>
                        {rfq.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <a href={`#/rfq/detail/${rfq.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </a>
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

export default MyRFQsPage;
