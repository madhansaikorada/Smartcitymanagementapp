import { Outlet } from 'react-router';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Building2, AlertCircle, MessageSquare } from 'lucide-react';

export default function UserDashboard() {
  const navigation = [
    {
      name: 'City Details',
      path: '/user/city-details',
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      name: 'Report Issue',
      path: '/user/report-issue',
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      name: 'Provide Feedback',
      path: '/user/feedback',
      icon: <MessageSquare className="w-5 h-5" />,
    },
  ];

  return (
    <DashboardLayout navigation={navigation} title="User Portal">
      <Outlet />
    </DashboardLayout>
  );
}
