import { Card, CardContent } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatCard({ title, value, subtitle, icon: Icon, iconColor = 'text-indigo-600' }: StatCardProps) {
  return (
    <Card>
      <CardContent className="py-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
            {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          </div>
          <div className={`p-2 rounded-lg bg-gray-50 ${iconColor}`}>
            <Icon size={22} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
