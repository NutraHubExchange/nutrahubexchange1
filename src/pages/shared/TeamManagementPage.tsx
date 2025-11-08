import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Users, Plus, Mail, MoreVertical, UserPlus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  status: 'active' | 'pending';
  joinedDate: string;
}

const TeamManagementPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Buyer',
      email: 'buyer@example.com',
      role: 'owner',
      status: 'active',
      joinedDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@healthfoods.com',
      role: 'admin',
      status: 'active',
      joinedDate: '2024-03-20',
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@healthfoods.com',
      role: 'member',
      status: 'active',
      joinedDate: '2024-06-10',
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@healthfoods.com',
      role: 'member',
      status: 'pending',
      joinedDate: '2025-11-05',
    },
  ]);

  const [isInviting, setIsInviting] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: '',
    role: 'member' as 'admin' | 'member',
  });

  const handleInvite = () => {
    const newMember: TeamMember = {
      id: String(teamMembers.length + 1),
      name: inviteData.email.split('@')[0],
      email: inviteData.email,
      role: inviteData.role,
      status: 'pending',
      joinedDate: new Date().toISOString().split('T')[0],
    };

    setTeamMembers([...teamMembers, newMember]);
    setIsInviting(false);
    setInviteData({ email: '', role: 'member' });
    toast.success(`Invitation sent to ${inviteData.email}`);
  };

  const handleResendInvite = (email: string) => {
    toast.success(`Invitation resent to ${email}`);
  };

  const handleRemoveMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    toast.success('Team member removed');
  };

  const handleChangeRole = (id: string, newRole: 'admin' | 'member') => {
    setTeamMembers(
      teamMembers.map(member =>
        member.id === id ? { ...member, role: newRole } : member
      )
    );
    toast.success('Role updated successfully');
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      owner: 'bg-purple-100 text-purple-800',
      admin: 'bg-blue-100 text-blue-800',
      member: 'bg-gray-100 text-gray-800',
    };

    return (
      <Badge variant="secondary" className={variants[role as keyof typeof variants]}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-orange-100 text-orange-800',
    };

    return (
      <Badge variant="secondary" className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <h1 className="mb-2">Team Management</h1>
          <p className="text-gray-600">Manage your team members and their permissions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Members</p>
                  <p className="text-3xl font-semibold">{teamMembers.length}</p>
                </div>
                <Users className="h-10 w-10 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active</p>
                  <p className="text-3xl font-semibold">
                    {teamMembers.filter(m => m.status === 'active').length}
                  </p>
                </div>
                <Users className="h-10 w-10 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Invites</p>
                  <p className="text-3xl font-semibold">
                    {teamMembers.filter(m => m.status === 'pending').length}
                  </p>
                </div>
                <Mail className="h-10 w-10 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  People who have access to your organization
                </CardDescription>
              </div>
              <Dialog open={isInviting} onOpenChange={setIsInviting}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite Team Member</DialogTitle>
                    <DialogDescription>
                      Send an invitation to join your team
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="colleague@company.com"
                        value={inviteData.email}
                        onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={inviteData.role}
                        onValueChange={(value: 'admin' | 'member') =>
                          setInviteData({ ...inviteData, role: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-500 mt-1">
                        {inviteData.role === 'admin'
                          ? 'Can manage team members and settings'
                          : 'Can view and create RFQs'}
                      </p>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleInvite} className="flex-1">
                        Send Invitation
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsInviting(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{member.name}</p>
                        {getRoleBadge(member.role)}
                        {getStatusBadge(member.status)}
                      </div>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <p className="text-xs text-gray-500">
                        Joined {new Date(member.joinedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {member.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResendInvite(member.email)}
                      >
                        Resend Invite
                      </Button>
                    )}
                    {member.role !== 'owner' && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {member.role !== 'admin' && (
                            <DropdownMenuItem onClick={() => handleChangeRole(member.id, 'admin')}>
                              Promote to Admin
                            </DropdownMenuItem>
                          )}
                          {member.role === 'admin' && (
                            <DropdownMenuItem onClick={() => handleChangeRole(member.id, 'member')}>
                              Change to Member
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            Remove from Team
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>
              What each role can do in your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <Badge className="bg-purple-100 text-purple-800 mt-0.5">Owner</Badge>
                <div>
                  <p className="font-medium mb-1">Full Access</p>
                  <p className="text-sm text-gray-600">
                    Can manage all aspects including billing, team members, and settings
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Badge className="bg-blue-100 text-blue-800 mt-0.5">Admin</Badge>
                <div>
                  <p className="font-medium mb-1">Administrative Access</p>
                  <p className="text-sm text-gray-600">
                    Can manage team members, RFQs, and view all data
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Badge className="bg-gray-100 text-gray-800 mt-0.5">Member</Badge>
                <div>
                  <p className="font-medium mb-1">Standard Access</p>
                  <p className="text-sm text-gray-600">
                    Can create and manage their own RFQs and view suppliers
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default TeamManagementPage;
