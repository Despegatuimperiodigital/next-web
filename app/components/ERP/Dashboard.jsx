import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, CheckCircle, AlertTriangle, Users } from 'lucide-react';
import Layout from './layout';

const Dashboard = ({ userType }) => {
  return (
    <Layout userType={userType}>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Tareas Pendientes" value="12" icon={<Clock className="text-blue-500" size={24} />} />
        <StatCard title="Tareas Completadas" value="45" icon={<CheckCircle className="text-green-500" size={24} />} />
        <StatCard title="Tareas Atrasadas" value="3" icon={<AlertTriangle className="text-red-500" size={24} />} />
        <StatCard title="Clientes Activos" value="28" icon={<Users className="text-purple-500" size={24} />} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Rendimiento Semanal">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completadas" fill="#22c55e" />
              <Bar dataKey="pendientes" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Tareas Recientes">
          <div className="space-y-4">
            {recentTasks.map((task, index) => (
              <TaskItem key={index} task={task} />
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div className="mr-4">{icon}</div>
      <div>
        <h2 className="text-lg font-semibold text-gray-700">{value}</h2>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
};

const Card = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
      {children}
    </div>
  );
};

const TaskItem = ({ task }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <h3 className="font-medium text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-500">{task.client}</p>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        task.status === 'Completada' ? 'bg-green-100 text-green-800' :
        task.status === 'En Progreso' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {task.status}
      </span>
    </div>
  );
};

const performanceData = [
  { name: 'Lun', completadas: 4, pendientes: 2 },
  { name: 'Mar', completadas: 3, pendientes: 1 },
  { name: 'Mié', completadas: 2, pendientes: 4 },
  { name: 'Jue', completadas: 5, pendientes: 3 },
  { name: 'Vie', completadas: 4, pendientes: 2 },
];

const recentTasks = [
  { title: 'Diseño de landing page', client: 'TechCorp', status: 'En Progreso' },
  { title: 'Optimización de SEO', client: 'Marketing Pro', status: 'Completada' },
  { title: 'Desarrollo de API', client: 'DataSys', status: 'Atrasada' },
  { title: 'Actualización de seguridad', client: 'SecureNet', status: 'En Progreso' },
];

export default Dashboard;