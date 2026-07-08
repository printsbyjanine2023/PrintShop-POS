import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Clock } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple';
}

const colorMap = {
  blue: 'from-blue-400 to-blue-600',
  green: 'from-green-400 to-green-600',
  orange: 'from-orange-400 to-orange-600',
  red: 'from-red-400 to-red-600',
  purple: 'from-purple-400 to-purple-600',
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  trend,
  icon,
  color,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className={`bg-gradient-to-r ${colorMap[color]} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-opacity-90 text-white text-sm mb-1">{title}</p>
            <h3 className="text-3xl font-bold">{value}</h3>
            {trend !== undefined && (
              <div className={`flex items-center gap-1 mt-2 ${trend >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                {trend >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-semibold">{Math.abs(trend)}% from last period</span>
              </div>
            )}
          </div>
          <div className="opacity-80">{icon}</div>
        </div>
      </div>
    </motion.div>
  );
};
