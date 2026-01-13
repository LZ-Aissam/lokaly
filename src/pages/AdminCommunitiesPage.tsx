import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Plus, ExternalLink } from 'lucide-react';
import { mockCommunautes } from '../data/mockData';

interface AdminCommunitiesPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function AdminCommunitiesPage({ onNavigate }: AdminCommunitiesPageProps) {
  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Gestion des communautés</h1>
          <p className="text-[var(--color-text-secondary)] mt-2">
            Gérez toutes les communautés de la plateforme
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={20} />}
        >
          Créer une communauté
        </Button>
      </div>
      
      {/* Liste des communautés */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockCommunautes.map((communaute) => (
          <Card key={communaute.id} hover>
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3>{communaute.nom}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    ID: {communaute.id}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-[var(--color-border)]">
                <div>
                  <p className="text-2xl font-bold text-[var(--color-primary)]">
                    {communaute.habitants}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    Habitants
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--color-secondary)]">
                    {communaute.annonces}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    Annonces
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--color-accent)]">
                    {communaute.groupes}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    Groupes
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  icon={<ExternalLink size={16} />}
                  fullWidth
                  onClick={() => onNavigate('admin-customization', communaute)}
                >
                  Gérer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                >
                  Statistiques
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
