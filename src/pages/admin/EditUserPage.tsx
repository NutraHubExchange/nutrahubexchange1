import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { toast } from 'sonner@2.0.3';

const EditUserPage: React.FC<{ id?: string }> = ({ id }) => {
  const [formData, setFormData] = useState({
    name: 'John Buyer',
    email: 'buyer@example.com',
    company: 'Health Foods Inc',
    role: 'buyer',
    status: 'active',
    isVerified: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise(resolve => setTimeout(resolve, 500));
    toast.success('User updated successfully');
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <a href="#/admin/users" className="text-blue-600 hover:underline mb-2 inline-block">← Back to Users</a>
          <h1>Edit User</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="supplier">Supplier</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Account Status</p>
                  <p className="text-sm text-gray-600">Enable or disable user account</p>
                </div>
                <Switch checked={formData.status === 'active'} onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? 'active' : 'suspended' })} />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Verified Status</p>
                  <p className="text-sm text-gray-600">Mark user as verified</p>
                </div>
                <Switch checked={formData.isVerified} onCheckedChange={(checked) => setFormData({ ...formData, isVerified: checked })} />
              </div>
              <div className="flex gap-4 pt-4">
                <Button type="submit">Save Changes</Button>
                <a href="#/admin/users">
                  <Button type="button" variant="outline">Cancel</Button>
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EditUserPage;
