// AnnoncesPage.tsx
// Liste de toutes les annonces avec recherche et filtres
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { AnnonceCard } from '../components/AnnonceCard';
import { Button } from '../components/Button';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import { mockAnnonces } from '../data/mockData';
import { toast } from 'sonner';

// plus de props - useNavigate gère la navigation
export function AnnoncesPage() {
  // hook de navigation
  const navigate = useNavigate();

  // états pour la recherche et les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [zoneFilter, setZoneFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // on filtre les annonces selon les critères sélectionnés
  const filteredAnnonces = mockAnnonces.filter((annonce) => {
    const matchSearch = annonce.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       annonce.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = !typeFilter || annonce.type === typeFilter;
    const matchZone = !zoneFilter || annonce.location === zoneFilter;
    return matchSearch && matchType && matchZone;
  });

  console.log('Annonces filtrées:', filteredAnnonces.length); // debug - à garder pour l'instant

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête avec titre et bouton nouvelle annonce */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1>Annonces locales</h1>
            <p className="text-[var(--color-text-secondary)] mt-2">
              {filteredAnnonces.length} annonce{filteredAnnonces.length > 1 ? 's' : ''} disponible{filteredAnnonces.length > 1 ? 's' : ''}
            </p>
          </div>
          {/* bouton pour aller créer une nouvelle annonce */}
          <Button
            variant="primary"
            icon={<Plus size={20} />}
            onClick={() => navigate('/annonces/nouvelle')}
          >
            Nouvelle annonce
          </Button>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Rechercher une annonce..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all"
              />
            </div>
            {/* bouton pour afficher/masquer les filtres avancés */}
            <Button
              variant="outline"
              icon={<SlidersHorizontal size={20} />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filtres
            </Button>
          </div>

          {/* Filtres avancés - masqués par défaut */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[var(--color-border)]">
              <Select
                label="Type d'annonce"
                placeholder="Tous les types"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                options={[
                  { value: '', label: 'Tous les types' },
                  { value: 'Don', label: 'Don' },
                  { value: 'Prêt', label: 'Prêt' },
                  { value: 'Service', label: 'Service' },
                  { value: 'Atelier', label: 'Atelier' }
                ]}
              />
              <Select
                label="Zone"
                placeholder="Toutes les zones"
                value={zoneFilter}
                onChange={(e) => setZoneFilter(e.target.value)}
                options={[
                  { value: '', label: 'Toutes les zones' },
                  { value: 'Centre-ville', label: 'Centre-ville' },
                  { value: 'Quartier Nord', label: 'Quartier Nord' },
                  { value: 'Quartier Sud', label: 'Quartier Sud' },
                  { value: 'Toute la commune', label: 'Toute la commune' }
                ]}
              />
            </div>
          )}
        </div>

        {/* Liste des annonces filtrées */}
        {filteredAnnonces.length === 0 ? (
          // message si aucune annonce trouvée
          <div className="text-center py-16">
            <p className="text-[var(--color-text-secondary)] text-lg">
              Aucune annonce ne correspond à vos critères de recherche.
            </p>
          </div>
        ) : (
          // grille des cartes d'annonces
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAnnonces.map((annonce) => (
              <AnnonceCard
                key={annonce.id}
                annonce={annonce}
                onClick={() => navigate('/annonces/' + annonce.id)}
                onInterested={() => toast.success('Intérêt manifesté ! Le contact sera partagé.')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
