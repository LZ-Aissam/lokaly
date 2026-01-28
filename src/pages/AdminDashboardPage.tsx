import React from 'react';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/Card';
import { FileText, Users, Users as GroupsIcon, TrendingUp } from 'lucide-react';
import { mockStats, mockActivite } from '../data/mockData';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div>
        <h1>Dashboard</h1>
        <p className="text-[var(--color-text-secondary)] mt-2">
          Vue d{'\''}ensemble de l{'\''}activité de la communauté
        </p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Annonces actives"
          value={mockStats.annonces}
          icon={<FileText size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Habitants inscrits"
          value={mockStats.habitants}
          icon={<Users size={24} />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Groupes actifs"
          value={mockStats.groupes}
          icon={<GroupsIcon size={24} />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Taux de participation"
          value={`${mockStats.participation}%`}
          icon={<TrendingUp size={24} />}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution des annonces */}
        <Card>
          <div className="p-6">
            <h3 className="mb-6">Évolution des annonces</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockActivite}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mois" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="annonces"
                  stroke="#1e40af"
                  strokeWidth={2}
                  name="Annonces"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Taux de participation */}
        <Card>
          <div className="p-6">
            <h3 className="mb-6">Taux de participation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockActivite}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mois" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="participation"
                  fill="#3b82f6"
                  name="Participation (%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Activité récente */}
      <Card>
        <div className="p-6">
          <h3 className="mb-4">Activité récente</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)]">
              <div>
                <p className="font-medium">Nouvelle annonce publiée</p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  "Prêt de tondeuse à gazon" par Marie Dubois
                </p>
              </div>
              <span className="text-sm text-[var(--color-text-secondary)]">Il y a 2h</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)]">
              <div>
                <p className="font-medium">Nouveau membre validé</p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Marc Durand a rejoint la communauté
                </p>
              </div>
              <span className="text-sm text-[var(--color-text-secondary)]">Il y a 5h</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Nouveau groupe créé</p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  "Repair Café" par Sophie Martin
                </p>
              </div>
              <span className="text-sm text-[var(--color-text-secondary)]">Hier</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
