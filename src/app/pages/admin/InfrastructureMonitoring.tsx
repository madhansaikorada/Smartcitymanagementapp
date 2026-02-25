import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Activity, AlertTriangle, CheckCircle, TrendingUp, Zap, Droplets, Wifi, Car } from 'lucide-react';

interface InfrastructureItem {
  id: string;
  name: string;
  category: string;
  status: 'good' | 'warning' | 'critical';
  capacity: number;
  usage: number;
  lastUpdated: string;
}

export default function InfrastructureMonitoring() {
  const [infrastructure] = useState<InfrastructureItem[]>([
    {
      id: '1',
      name: 'Power Grid',
      category: 'Energy',
      status: 'good',
      capacity: 100,
      usage: 72,
      lastUpdated: '2 minutes ago',
    },
    {
      id: '2',
      name: 'Water Supply',
      category: 'Utilities',
      status: 'good',
      capacity: 100,
      usage: 65,
      lastUpdated: '5 minutes ago',
    },
    {
      id: '3',
      name: 'Internet Connectivity',
      category: 'Technology',
      status: 'warning',
      capacity: 100,
      usage: 88,
      lastUpdated: '1 minute ago',
    },
    {
      id: '4',
      name: 'Traffic Management',
      category: 'Transportation',
      status: 'good',
      capacity: 100,
      usage: 54,
      lastUpdated: '3 minutes ago',
    },
    {
      id: '5',
      name: 'Waste Management',
      category: 'Utilities',
      status: 'good',
      capacity: 100,
      usage: 45,
      lastUpdated: '10 minutes ago',
    },
    {
      id: '6',
      name: 'Street Lighting',
      category: 'Energy',
      status: 'critical',
      capacity: 100,
      usage: 95,
      lastUpdated: '1 minute ago',
    },
  ]);

  const getStatusColor = (status: InfrastructureItem['status']) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'critical': return 'text-red-600 bg-red-50';
    }
  };

  const getStatusIcon = (status: InfrastructureItem['status']) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <Activity className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Energy': return <Zap className="w-5 h-5" />;
      case 'Utilities': return <Droplets className="w-5 h-5" />;
      case 'Technology': return <Wifi className="w-5 h-5" />;
      case 'Transportation': return <Car className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const goodCount = infrastructure.filter(i => i.status === 'good').length;
  const warningCount = infrastructure.filter(i => i.status === 'warning').length;
  const criticalCount = infrastructure.filter(i => i.status === 'critical').length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Infrastructure Monitoring</h1>
        <p className="text-gray-600">Real-time monitoring of city infrastructure and systems</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Operational</p>
                <p className="text-3xl">{goodCount}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Warnings</p>
                <p className="text-3xl">{warningCount}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-full">
                <Activity className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Critical</p>
                <p className="text-3xl">{criticalCount}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Systems</TabsTrigger>
          <TabsTrigger value="Energy">Energy</TabsTrigger>
          <TabsTrigger value="Utilities">Utilities</TabsTrigger>
          <TabsTrigger value="Technology">Technology</TabsTrigger>
          <TabsTrigger value="Transportation">Transportation</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {infrastructure.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription>{item.category}</CardDescription>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(item.status)} gap-1`}>
                    {getStatusIcon(item.status)}
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Capacity Usage</span>
                    <span>{item.usage}%</span>
                  </div>
                  <Progress value={item.usage} className="h-2" />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Last updated: {item.lastUpdated}</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Real-time</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {['Energy', 'Utilities', 'Technology', 'Transportation'].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {infrastructure
              .filter((item) => item.category === category)
              .map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <CardDescription>{item.category}</CardDescription>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(item.status)} gap-1`}>
                        {getStatusIcon(item.status)}
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Capacity Usage</span>
                        <span>{item.usage}%</span>
                      </div>
                      <Progress value={item.usage} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Last updated: {item.lastUpdated}</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>Real-time</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
