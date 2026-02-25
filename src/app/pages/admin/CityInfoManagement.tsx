import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Edit2, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function CityInfoManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [cityData, setCityData] = useState({
    name: 'Metropolitan City',
    population: '2,500,000',
    area: '1,500 sq km',
    mayor: 'Jane Smith',
    established: '1850',
    description: 'A vibrant metropolitan city known for its cultural diversity, thriving economy, and modern infrastructure. Home to leading technology companies, world-class universities, and historic landmarks.',
    timezone: 'GMT-5',
    website: 'www.metropolitancity.gov',
  });

  const handleSave = () => {
    toast.success('City information updated successfully');
    setIsEditing(false);
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">City Information Management</h1>
          <p className="text-gray-600">Manage and update essential city details</p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="gap-2"
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              Edit Information
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Core details about the city</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cityName">City Name</Label>
                <Input
                  id="cityName"
                  value={cityData.name}
                  onChange={(e) => setCityData({ ...cityData, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mayor">Mayor</Label>
                <Input
                  id="mayor"
                  value={cityData.mayor}
                  onChange={(e) => setCityData({ ...cityData, mayor: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="population">Population</Label>
                <Input
                  id="population"
                  value={cityData.population}
                  onChange={(e) => setCityData({ ...cityData, population: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Area</Label>
                <Input
                  id="area"
                  value={cityData.area}
                  onChange={(e) => setCityData({ ...cityData, area: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="established">Established</Label>
                <Input
                  id="established"
                  value={cityData.established}
                  onChange={(e) => setCityData({ ...cityData, established: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  value={cityData.timezone}
                  onChange={(e) => setCityData({ ...cityData, timezone: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Official Website</Label>
              <Input
                id="website"
                value={cityData.website}
                onChange={(e) => setCityData({ ...cityData, website: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={cityData.description}
                onChange={(e) => setCityData({ ...cityData, description: e.target.value })}
                disabled={!isEditing}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>City metrics and indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-1">98.5%</div>
                <div className="text-sm text-gray-600">Service Uptime</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl mb-1">1,247</div>
                <div className="text-sm text-gray-600">Public Facilities</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-1">156</div>
                <div className="text-sm text-gray-600">Active Projects</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl mb-1">92%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
