import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { AlertCircle, CheckCircle, Clock, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Issue {
  id: string;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'resolved';
  description: string;
  location: string;
  reportedDate: string;
}

export default function ReportIssue() {
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: '1',
      title: 'Broken Street Light',
      category: 'Infrastructure',
      priority: 'medium',
      status: 'in-progress',
      description: 'Street light on Main Street is not working',
      location: 'Main Street, Block 5',
      reportedDate: '2026-02-20',
    },
    {
      id: '2',
      title: 'Pothole on Highway',
      category: 'Roads',
      priority: 'high',
      status: 'pending',
      description: 'Large pothole causing traffic issues',
      location: 'Highway 101, Mile 15',
      reportedDate: '2026-02-22',
    },
  ]);

  const [newIssue, setNewIssue] = useState({
    title: '',
    category: '',
    priority: 'medium' as Issue['priority'],
    description: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newIssue.title || !newIssue.category || !newIssue.description || !newIssue.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    const issue: Issue = {
      id: Date.now().toString(),
      title: newIssue.title,
      category: newIssue.category,
      priority: newIssue.priority,
      status: 'pending',
      description: newIssue.description,
      location: newIssue.location,
      reportedDate: new Date().toISOString().split('T')[0],
    };

    setIssues([issue, ...issues]);
    setNewIssue({
      title: '',
      category: '',
      priority: 'medium',
      description: '',
      location: '',
    });
    toast.success('Issue reported successfully! We will address it soon.');
  };

  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
    }
  };

  const getPriorityColor = (priority: Issue['priority']) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'high': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: Issue['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Report Issue</h1>
        <p className="text-gray-600">Report problems with public services or infrastructure</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Submit New Issue</CardTitle>
            <CardDescription>Provide details about the issue you're reporting</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title *</Label>
                <Input
                  id="title"
                  value={newIssue.title}
                  onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                  placeholder="Brief description of the issue"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={newIssue.category}
                  onValueChange={(value) => setNewIssue({ ...newIssue, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="Roads">Roads</SelectItem>
                    <SelectItem value="Public Safety">Public Safety</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Sanitation">Sanitation</SelectItem>
                    <SelectItem value="Parks">Parks & Recreation</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newIssue.priority}
                  onValueChange={(value: Issue['priority']) => setNewIssue({ ...newIssue, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={newIssue.location}
                  onChange={(e) => setNewIssue({ ...newIssue, location: e.target.value })}
                  placeholder="Where is the issue located?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newIssue.description}
                  onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                  placeholder="Provide detailed information about the issue"
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Submit Issue Report
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl">Your Reported Issues</h2>
          {issues.map((issue) => (
            <Card key={issue.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{issue.title}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{issue.category}</Badge>
                      <Badge className={getPriorityColor(issue.priority)}>
                        {issue.priority}
                      </Badge>
                      <Badge className={`${getStatusColor(issue.status)} gap-1`}>
                        {getStatusIcon(issue.status)}
                        {issue.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-700">{issue.description}</p>
                <div className="pt-2 space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Location:</span> {issue.location}</p>
                  <p><span className="font-medium">Reported:</span> {new Date(issue.reportedDate).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
