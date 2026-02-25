import { Outlet } from 'react-router';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Building2, Server, Wrench } from 'lucide-react';

export default function AdminDashboard() {
  const navigation = [
    {
      name: 'City Information',
      path: '/admin/city-info',
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      name: 'Public Services',
      path: '/admin/public-services',
      icon: <Wrench className="w-5 h-5" />,
    },
    {
      name: 'Infrastructure',
      path: '/admin/infrastructure',
      icon: <Server className="w-5 h-5" />,
    },
  ];

  return (
    <DashboardLayout navigation={navigation} title="Admin Panel">
      <Outlet />
    </DashboardLayout>
  );
}
