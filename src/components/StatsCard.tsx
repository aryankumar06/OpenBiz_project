import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'blue' | 'emerald' | 'amber' | 'purple';
  trend?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    emerald: 'bg-emerald-100 text-emerald-600 border-emerald-200',
    amber: 'bg-amber-100 text-amber-600 border-amber-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
  };

  const trendColorClasses = {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    purple: 'text-purple-600',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm font-medium mt-2 ${trendColorClasses[color]}`}>
              {trend}
            </p>
          )}
        </div>
        <div className={`p-4 rounded-xl border-2 ${colorClasses[color]}`}>
          <Icon className="h-8 w-8" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;