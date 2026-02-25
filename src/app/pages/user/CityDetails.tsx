import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Search, MapPin, Phone, Clock, Users, Building, Calendar } from 'lucide-react';

interface PublicService {
  id: string;
  name: string;
  category: string;
  status: 'operational' | 'maintenance' | 'offline';
  location: string;
  contact: string;
  hours: string;
  description: string;
}

export default function CityDetails() {
  const [searchQuery, setSearchQuery] = useState('');

  const cityInfo = {
    name: 'Metropolitan City',
    population: '2,500,000',
    area: '1,500 sq km',
    mayor: 'Jane Smith',
    established: '1850',
    description: 'A vibrant metropolitan city known for its cultural diversity, thriving economy, and modern infrastructure. Home to leading technology companies, world-class universities, and historic landmarks.',
  };

  const services: PublicService[] = [
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
  ];

  const amenities = [
    { name: 'Parks & Recreation', count: 127, icon: '🏞️' },
    { name: 'Public Transportation', count: 45, icon: '🚌' },
    { name: 'Schools', count: 89, icon: '🏫' },
    { name: 'Hospitals', count: 23, icon: '🏥' },
    { name: 'Libraries', count: 18, icon: '📚' },
    { name: 'Community Centers', count: 34, icon: '🏢' },
  ];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: PublicService['status']) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">City Details</h1>
        <p className="text-gray-600">Explore information about our city and public services</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Public Services</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About {cityInfo.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{cityInfo.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Population</p>
                    <p>{cityInfo.population}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Building className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Area</p>
                    <p>{cityInfo.area}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mayor</p>
                    <p>{cityInfo.mayor}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Established</p>
                    <p>{cityInfo.established}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>City metrics and satisfaction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <div className="text-2xl mb-1">98.5%</div>
                  <div className="text-sm text-gray-600">Service Uptime</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <div className="text-2xl mb-1">1,247</div>
                  <div className="text-sm text-gray-600">Public Facilities</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <div className="text-2xl mb-1">156</div>
                  <div className="text-sm text-gray-600">Active Projects</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg text-center">
                  <div className="text-2xl mb-1">92%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="grid gap-4">
            {filteredServices.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <Badge variant="outline">{service.category}</Badge>
                        <Badge className={getStatusColor(service.status)}>
                          {service.status}
                        </Badge>
                      </div>
                      <CardDescription>{service.description}</CardDescription>
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
        </TabsContent>

        <TabsContent value="amenities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>City Amenities</CardTitle>
              <CardDescription>Public facilities and community resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{amenity.icon}</span>
                      <span className="text-2xl">{amenity.count}</span>
                    </div>
                    <p className="text-sm">{amenity.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
