// AdminGroupDetailPage.tsx
// Page admin - détail d'un groupe avec membres et intéressés
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ArrowLeft, Users, Calendar, Heart, UserMinus, Crown } from 'lucide-react';
import { mockGroupes } from '../data/mockData';

// données mock des membres (en attendant le backend)
const mockMembres = [
  { id: '1', nom: 'Marie Dubois', role: 'admin', dateAdhesion: '2024-06-15' },
  { id: '2', nom: 'Pierre Leroy', role: 'membre', dateAdhesion: '2024-07-20' },
  { id: '3', nom: 'Sophie Martin', role: 'membre', dateAdhesion: '2024-08-10' },
  { id: '4', nom: 'Lucas Bernard', role: 'membre', dateAdhesion: '2024-09-05' },
];

// données mock des personnes intéressées
const mockInteresses = [
  { id: '1', nom: 'Julie Petit', annonce: 'Cours de couture gratuits', date: '2024-12-10' },
  { id: '2', nom: 'Marc Durand', annonce: 'Cours de couture gratuits', date: '2024-12-09' },
  { id: '3', nom: 'Emma Rousseau', annonce: 'Échange de graines', date: '2024-12-08' },
];

// plus de props - on récupère l'id depuis l'URL
export function AdminGroupDetailPage() {
  const { id } = useParams<{ id: string }>(); // id depuis /admin/groupes/:id
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'membres' | 'interesses'>('membres');

  // on cherche le groupe dans les données mock
  const groupe = mockGroupes.find(g => g.id === id);

  // si le groupe n'existe pas
  if (!groupe) {
    return (
      <div className="p-8 text-center">
        <p className="text-[var(--color-text-secondary)]">Groupe non trouvé</p>
        <Button
          variant="outline"
          onClick={() => navigate('/admin/groupes')}
          className="mt-4"
        >
          Retour aux groupes
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* en-tête avec bouton retour */}
      <div>
        <Button
          variant="outline"
          icon={<ArrowLeft size={20} />}
          onClick={() => navigate('/admin/groupes')}
          className="mb-4"
        >
          Retour aux groupes
        </Button>
        <h1>{groupe.name}</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">{groupe.description}</p>
      </div>

      {/* stats rapides du groupe */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{groupe.members}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Membres</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Crown size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{groupe.niveau}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Niveau</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <Heart size={24} className="text-pink-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockInteresses.length}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Intéressés</p>
            </div>
          </div>
        </Card>
      </div>

      {/* onglets membres / intéressés */}
      <div className="flex gap-2 border-b border-[var(--color-border)]">
        <button
          onClick={() => setActiveTab('membres')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'membres'
              ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          Membres ({mockMembres.length})
        </button>
        <button
          onClick={() => setActiveTab('interesses')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'interesses'
              ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          Intéressés ({mockInteresses.length})
        </button>
      </div>

      {/* liste des membres */}
      {activeTab === 'membres' && (
        <Card>
          <div className="divide-y divide-[var(--color-border)]">
            {mockMembres.map((membre) => (
              <div key={membre.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {membre.nom.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{membre.nom}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      Membre depuis le {membre.dateAdhesion}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={membre.role === 'admin' ? 'primary' : 'neutral'}>
                    {membre.role}
                  </Badge>
                  <button className="p-2 text-[var(--color-danger)] hover:bg-red-50 rounded-lg transition-colors">
                    <UserMinus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* liste des personnes intéressées */}
      {activeTab === 'interesses' && (
        <Card>
          <div className="divide-y divide-[var(--color-border)]">
            {mockInteresses.map((interesse) => (
              <div key={interesse.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-accent)] rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {interesse.nom.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{interesse.nom}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      Intéressé par : {interesse.annonce}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[var(--color-text-secondary)]" />
                  <span className="text-sm text-[var(--color-text-secondary)]">{interesse.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
