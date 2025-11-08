import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const UserManagementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const users = [
    { id: 'buyer-1', name: 'John Buyer', email: 'buyer@example.com', role: 'buyer', company: 'Health Foods Inc', status: 'active', joined: '2024-01-15' },
    { id: 'supplier-1', name: 'Jane Supplier', email: 'supplier@example.com', role: 'supplier', company: 'NutriSource Ltd', status: 'active', joined: '2024-02-20' },
    { id: 'admin-1', name: 'Admin User', email: 'admin@example.com', role: 'admin', company: 'Platform Admin', status: 'active', joined: '2024-01-01' },
  ];

  const getRoleBadge = (role: string) => {
    const variants = { buyer: 'bg-blue-100 text-blue-800', supplier: 'bg-green-100 text-green-800', admin: 'bg-purple-100 text-purple-800' };
    return <Badge variant="secondary" className={variants[role as keyof typeof variants]}>{role.charAt(0).toUpperCase() + role.slice(1)}</Badge>;
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6">User Management</h1>
        <Card>
          <CardHeader>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="supplier">Supplier</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.company}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <a href={`#/admin/users/edit/${user.id}`}>
                        <Button variant="outline" size="sm">Edit</Button>
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

export default UserManagementPage;
