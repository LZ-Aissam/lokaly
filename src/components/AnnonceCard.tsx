import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AnnonceCardProps {
  annonce: {
    id: string;
    titre: string;
    description: string;
    zone: string;
    disponibilite: string;
    type: string;
    image?: string;
    auteur: {
      nom: string;
      avatar?: string;
    };
  };
  onClick?: () => void;
  onInterested?: () => void;
}

const typeColors: Record<string, { bg: string; text: string }> = {
  'Don': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  'Prêt': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Service': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'Recherche': { bg: 'bg-amber-100', text: 'text-amber-700' },
};

export function AnnonceCard({ annonce, onClick, onInterested }: AnnonceCardProps) {
  const typeStyle = typeColors[annonce.type] || { bg: 'bg-gray-100', text: 'text-gray-700' };

  return (
    <Card hover onClick={onClick}>
      <div className="overflow-hidden">
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          <ImageWithFallback
            src={annonce.image}
            alt={annonce.titre}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeStyle.bg} ${typeStyle.text}`}>
              {annonce.type}
            </span>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4 space-y-3">
          <div>
            <h4 className="font-medium text-[var(--color-text-primary)] line-clamp-1">
              {annonce.titre}
            </h4>
            <p className="text-[var(--color-text-secondary)] text-sm line-clamp-2 mt-1">
              {annonce.description}
            </p>
          </div>

          <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
            <MapPin size={14} />
            <span>{annonce.zone}</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
            <span className="text-sm text-[var(--color-text-secondary)]">
              {annonce.auteur.nom}
            </span>
            <Button
              size="sm"
              variant="primary"
              onClick={(e) => {
                e?.stopPropagation();
                onInterested?.();
              }}
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
