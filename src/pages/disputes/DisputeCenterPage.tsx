import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { AlertCircle, Search, Plus, FileText } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';

interface Dispute {
  id: string;
  disputeNumber: string;
  subject: string;
  orderNumber: string;
  filed Date: string;
  status: 'open' | 'in_review' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
}

const mockDisputes: Dispute[] = [
  {
    id: '1',
    disputeNumber: 'DSP-2025-001',
    subject: 'Quality issue with delivered batch',
    orderNumber: 'ORD-1234',
    filedDate: '2025-11-05',
    status: 'in_review',
    priority: 'high',
  },
  {
    id: '2',
    disputeNumber: 'DSP-2025-002',
    subject: 'Delayed shipment',
    orderNumber: 'ORD-1189',
    filedDate: '2025-10-28',
    status: 'resolved',
    priority: 'medium',
  },
];

const DisputeCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    const variants = {
      open: 'bg-blue-100 text-blue-800',
      in_review: 'bg-orange-100 text-orange-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };

    return (
      <Badge variant="secondary" className={variants[status as keyof typeof variants]}>
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-orange-100 text-orange-800',
      high: 'bg-red-100 text-red-800',
    };

    return (
      <Badge variant="secondary" className={variants[priority as keyof typeof variants]}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const filteredDisputes = mockDisputes.filter(dispute => {
    const matchesSearch = 
      dispute.disputeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || dispute.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <h1 className="mb-2">Dispute Center</h1>
          <p className="text-gray-600">Manage and resolve transaction disputes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Disputes</p>
                  <p className="text-3xl font-semibold">{mockDisputes.length}</p>
                </div>
                <AlertCircle className="h-10 w-10 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Open</p>
                  <p className="text-3xl font-semibold">
                    {mockDisputes.filter(d => d.status === 'open' || d.status === 'in_review').length}
                  </p>
                </div>
                <AlertCircle className="h-10 w-10 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Resolved</p>
                  <p className="text-3xl font-semibold">
                    {mockDisputes.filter(d => d.status === 'resolved').length}
                  </p>
                </div>
                <AlertCircle className="h-10 w-10 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Resolution Time</p>
                  <p className="text-3xl font-semibold">5d</p>
                </div>
                <FileText className="h-10 w-10 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>All Disputes</CardTitle>
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search disputes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_review">In Review</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <a href="#/disputes/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    File Dispute
                  </Button>
                </a>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dispute #</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Filed Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDisputes.map((dispute) => (
                  <TableRow key={dispute.id}>
                    <TableCell className="font-medium">{dispute.disputeNumber}</TableCell>
                    <TableCell>{dispute.subject}</TableCell>
                    <TableCell>{dispute.orderNumber}</TableCell>
                    <TableCell>{new Date(dispute.filedDate).toLocaleDateString()}</TableCell>
                    <TableCell>{getPriorityBadge(dispute.priority)}</TableCell>
                    <TableCell>{getStatusBadge(dispute.status)}</TableCell>
                    <TableCell className="text-right">
                      <a href={`#/disputes/${dispute.id}`}>
                        <Button variant="outline" size="sm">View Details</Button>
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredDisputes.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No disputes found</p>
                <a href="#/disputes/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    File Your First Dispute
                  </Button>
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default DisputeCenterPage;
