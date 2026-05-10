// GroupeDetailPage.tsx
// Détail d'un groupe - on récupère le groupe via l'id dans l'URL
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { AnnonceCard } from '../components/AnnonceCard';
import { ArrowLeft, Users, UserPlus, TrendingUp } from 'lucide-react';
import { mockAnnonces, mockGroupes } from '../data/mockData';
import { toast } from 'sonner';

// plus de props - on récupère l'id depuis l'URL
export function GroupeDetailPage() {
  const { id } = useParams<{ id: string }>(); // id depuis /groupes/:id
  const navigate = useNavigate();
  const [isMember, setIsMember] = React.useState(false);

  // cherche le groupe dans les données mock
  const groupe = mockGroupes.find(g => g.id === id);

  // cas où le groupe n'existe pas
  if (!groupe) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Groupe introuvable</h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Ce groupe n'existe pas ou a été supprimé.
          </p>
          <Button variant="primary" onClick={() => navigate('/groupes')}>
            Retour aux groupes
          </Button>
        </div>
      </div>
    );
  }

  // on filtre les annonces qui appartiennent à ce groupe
  const groupeAnnonces = mockAnnonces.filter(a => groupe.annonces?.includes(a.id));

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* bouton retour */}
        <Button
          variant="outline"
          icon={<ArrowLeft size={20} />}
          onClick={() => navigate('/groupes')}
          className="mb-6"
        >
          Retour aux groupes
        </Button>

        {/* carte d'en-tête du groupe */}
        <Card className="mb-8">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1>{groupe.name}</h1>
                  <Badge variant="level" level={groupe.niveau}>
                    Niveau {groupe.niveau}
                  </Badge>
                </div>
                <p className="text-[var(--color-text-secondary)]">
                  {groupe.description}
                </p>
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <Users size={20} />
                  <span>{groupe.members} membre{groupe.members > 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* bouton pour rejoindre/quitter le groupe */}
              <Button
                variant={isMember ? 'secondary' : 'primary'}
                icon={<UserPlus size={20} />}
                onClick={() => setIsMember(!isMember)}
              >
                {isMember ? 'Membre ✓' : 'Rejoindre le groupe'}
              </Button>
            </div>
          </div>
        </Card>

        {/* annonces liées à ce groupe (s'il y en a) */}
        {groupeAnnonces.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-6">Annonces du groupe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupeAnnonces.map((annonce) => (
                <AnnonceCard
                  key={annonce.id}
                  annonce={annonce}
                  onClick={() => navigate('/annonces/' + annonce.id)}
                  onInterested={() => toast.success('Intérêt manifesté ! Le contact sera partagé.')}
                />
              ))}
            </div>
          </section>
        )}

        {/* activité récente (données statiques pour l'instant) */}
        <section>
          <h2 className="mb-6">Activité récente</h2>
          <div className="space-y-4">
            <Card>
              <div className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={20} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">3 nouveaux membres ce mois</p>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    Le groupe continue de grandir !
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">2 ateliers organisés récemment</p>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    Merci à tous les participants !
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
