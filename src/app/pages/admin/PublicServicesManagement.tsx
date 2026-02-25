import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Plus, Edit2, Trash2, MapPin, Phone, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  category: string;
  status: 'operational' | 'maintenance' | 'offline';
  location: string;
  contact: string;
  hours: string;
  description: string;
}

export default function PublicServicesManagement() {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'City Hospital',
      category: 'Healthcare',
      status: 'operational',
      location: '123 Medical Drive',
      contact: '(555) 123-4567',
      hours: '24/7',
      description: 'Emergency and general medical services',
    },
    {
      id: '2',
      name: 'Central Police Station',
      category: 'Public Safety',
      status: 'operational',
      location: '456 Safety Boulevard',
      contact: '(555) 987-6543',
      hours: '24/7',
      description: 'Law enforcement and emergency response',
    },
    {
      id: '3',
      name: 'Fire Department HQ',
      category: 'Public Safety',
      status: 'operational',
      location: '789 Fire Lane',
      contact: '(555) 246-8135',
      hours: '24/7',
      description: 'Fire prevention and emergency services',
    },
    {
      id: '4',
      name: 'City Library',
      category: 'Education',
      status: 'operational',
      location: '321 Knowledge Street',
      contact: '(555) 369-2580',
      hours: 'Mon-Sat 9AM-9PM',
      description: 'Public library with extensive collection',
    },
    {
      id: '5',
      name: 'Water Treatment Plant',
      category: 'Utilities',
      status: 'maintenance',
      location: '654 River Road',
      contact: '(555) 147-2589',
      hours: '24/7',
      description: 'Water purification and distribution',
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newService, setNewService] = useState<Partial<Service>>({
    status: 'operational',
  });

  const handleAddService = () => {
    if (newService.name && newService.category) {
      const service: Service = {
        id: Date.now().toString(),
        name: newService.name,
        category: newService.category,
        status: newService.status as Service['status'] || 'operational',
        location: newService.location || '',
        contact: newService.contact || '',
        hours: newService.hours || '',
        description: newService.description || '',
      };
      setServices([...services, service]);
      setNewService({ status: 'operational' });
      setIsAddDialogOpen(false);
      toast.success('Service added successfully');
    }
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
    toast.success('Service deleted');
  };

  const handleStatusChange = (id: string, status: Service['status']) => {
    setServices(services.map(s => s.id === id ? { ...s, status } : s));
    toast.success('Status updated');
  };

  const getStatusColor = (status: Service['status']) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Public Services Management</h1>
          <p className="text-gray-600">Manage city services and their operational status</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>Add a new public service to the system</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="serviceName">Service Name</Label>
                <Input
                  id="serviceName"
                  value={newService.name || ''}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  placeholder="e.g., City Hospital"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newService.category}
                  onValueChange={(value) => setNewService({ ...newService, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Public Safety">Public Safety</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newService.location || ''}
                  onChange={(e) => setNewService({ ...newService, location: e.target.value })}
                  placeholder="Address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  value={newService.contact || ''}
                  onChange={(e) => setNewService({ ...newService, contact: e.target.value })}
                  placeholder="Phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Operating Hours</Label>
                <Input
                  id="hours"
                  value={newService.hours || ''}
                  onChange={(e) => setNewService({ ...newService, hours: e.target.value })}
                  placeholder="e.g., Mon-Fri 9AM-5PM"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newService.description || ''}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  placeholder="Service description"
                />
              </div>
              <Button onClick={handleAddService} className="w-full">Add Service</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle>{service.name}</CardTitle>
                    <Badge variant="outline">{service.category}</Badge>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={service.status}
                    onValueChange={(value: Service['status']) => handleStatusChange(service.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operational">Operational</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{service.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{service.contact}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{service.hours}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
