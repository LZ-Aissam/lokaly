import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ArrowLeft, Users, Calendar, Heart, UserMinus, Crown } from 'lucide-react';

interface AdminGroupDetailPageProps {
  groupe: any;
  onNavigate: (page: string, data?: any) => void;
}

// Données mock pour les membres et les intéressés
const mockMembres = [
  { id: '1', nom: 'Marie Dubois', role: 'admin', dateAdhesion: '2024-06-15' },
  { id: '2', nom: 'Pierre Leroy', role: 'membre', dateAdhesion: '2024-07-20' },
  { id: '3', nom: 'Sophie Martin', role: 'membre', dateAdhesion: '2024-08-10' },
  { id: '4', nom: 'Lucas Bernard', role: 'membre', dateAdhesion: '2024-09-05' },
];

const mockInteresses = [
  { id: '1', nom: 'Julie Petit', annonce: 'Cours de couture gratuits', date: '2024-12-10' },
  { id: '2', nom: 'Marc Durand', annonce: 'Cours de couture gratuits', date: '2024-12-09' },
  { id: '3', nom: 'Emma Rousseau', annonce: 'Échange de graines', date: '2024-12-08' },
];

export function AdminGroupDetailPage({ groupe, onNavigate }: AdminGroupDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'membres' | 'interesses'>('membres');

  if (!groupe) {
    return (
      <div className="p-8 text-center">
        <p className="text-[var(--color-text-secondary)]">Groupe non trouvé</p>
        <Button
          variant="outline"
          onClick={() => onNavigate('admin-groups')}
          className="mt-4"
        >
          Retour aux groupes
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div>
        <Button
          variant="outline"
          icon={<ArrowLeft size={20} />}
          onClick={() => onNavigate('admin-groups')}
          className="mb-4"
        >
          Retour aux groupes
        </Button>

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="min-w-0">{groupe.nom}</h1>
              <Badge variant="level" level={groupe.niveau} />
            </div>
            <p className="text-[var(--color-text-secondary)] mt-2">
              {groupe.description}
            </p>
          </div>
        </div>
      </div>

      {/* Statistiques du groupe */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{groupe.membres}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Membres</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{groupe.annonces.length}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Annonces actives</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockInteresses.length}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Personnes intéressées</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Onglets */}
      <div className="border-b border-[var(--color-border)]">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('membres')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 -mb-px ${
              activeTab === 'membres'
                ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                : 'text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-text-primary)]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users size={18} />
              Membres ({mockMembres.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('interesses')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 -mb-px ${
              activeTab === 'interesses'
                ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                : 'text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-text-primary)]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Heart size={18} />
              Intéressés ({mockInteresses.length})
            </div>
          </button>
        </div>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'membres' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left p-4 font-medium text-[var(--color-text-secondary)]">Membre</th>
                  <th className="text-left p-4 font-medium text-[var(--color-text-secondary)]">Rôle</th>
                  <th className="text-left p-4 font-medium text-[var(--color-text-secondary)]">Date d'adhésion</th>
                  <th className="text-right p-4 font-medium text-[var(--color-text-secondary)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockMembres.map((membre) => (
                  <tr key={membre.id} className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {membre.nom.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium">{membre.nom}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {membre.role === 'admin' ? (
                        <Badge variant="accent">
                          <Crown size={14} className="mr-1" />
                          Admin
                        </Badge>
                      ) : (
                        <Badge variant="neutral">Membre</Badge>
                      )}
                    </td>
                    <td className="p-4 text-[var(--color-text-secondary)]">
                      {new Date(membre.dateAdhesion).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end">
                        {membre.role !== 'admin' && (
                          <Button
                            variant="outline"
                            size="sm"
                            icon={<UserMinus size={16} />}
                            onClick={() => alert(`Retirer ${membre.nom} du groupe ?`)}
                          >
                            Retirer
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'interesses' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left p-4 font-medium text-[var(--color-text-secondary)]">Personne</th>
                  <th className="text-left p-4 font-medium text-[var(--color-text-secondary)]">Annonce concernée</th>
                  <th className="text-left p-4 font-medium text-[var(--color-text-secondary)]">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockInteresses.map((interesse) => (
                  <tr key={interesse.id} className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {interesse.nom.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium">{interesse.nom}</span>
                      </div>
                    </td>
                    <td className="p-4 text-[var(--color-text-secondary)]">
                      {interesse.annonce}
                    </td>
                    <td className="p-4 text-[var(--color-text-secondary)]">
                      {new Date(interesse.date).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {mockInteresses.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-[var(--color-text-secondary)]">
                Aucune personne intéressée pour le moment.
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
