import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Select } from '../components/Select';
import { Card } from '../components/Card';
import { ArrowLeft, Sparkles, Eye, Send } from 'lucide-react';

interface NouvelleAnnoncePageProps {
  onNavigate: (page: string) => void;
}

export function NouvelleAnnoncePage({ onNavigate }: NouvelleAnnoncePageProps) {
  const [titre, setTitre] = useState('');
  const [categorie, setCategorie] = useState('');
  const [description, setDescription] = useState('');
  const [zone, setZone] = useState('');
  const [disponibilite, setDisponibilite] = useState('');
  const [aiKeywords, setAiKeywords] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  
  const handleAiGenerate = () => {
    // Simulation de génération IA
    if (aiKeywords) {
      setAiSuggestion(
        `Je propose ${aiKeywords}. Disponible pour la communauté. N'hésitez pas à me contacter pour plus d'informations !`
      );
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Annonce publiée avec succès !');
    onNavigate('annonces');
  };
  
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Button
          variant="outline"
          icon={<ArrowLeft size={20} />}
          onClick={() => onNavigate('home')}
          className="mb-6"
        >
          Retour
        </Button>
        
        <div className="mb-8">
          <h1>Créer une annonce</h1>
          <p className="text-[var(--color-text-secondary)] mt-2">
            Partagez avec votre communauté ce que vous souhaitez donner, prêter ou proposer.
          </p>
        </div>
        
        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <div className="p-6 md:p-8 space-y-6">
              <h3>Informations de base</h3>
              
              <Input
                label="Titre de l'annonce"
                placeholder="Ex: Prêt de tondeuse à gazon"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                required
                helper="Soyez clair et précis"
              />
              
              <Select
                label="Catégorie"
                placeholder="Sélectionnez une catégorie"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                required
                options={[
                  { value: 'objet', label: 'Objet (don/prêt)' },
                  { value: 'service', label: 'Service' },
                  { value: 'atelier', label: 'Atelier' },
                  { value: 'autre', label: 'Autre' }
                ]}
              />
              
              <Textarea
                label="Description"
                placeholder="Décrivez votre annonce en détail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={6}
                helper="Minimum 20 caractères"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Zone"
                  placeholder="Sélectionnez une zone"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  required
                  options={[
                    { value: 'centre', label: 'Centre-ville' },
                    { value: 'nord', label: 'Quartier Nord' },
                    { value: 'sud', label: 'Quartier Sud' },
                    { value: 'toute', label: 'Toute la commune' }
                  ]}
                />
                
                <Input
                  label="Disponibilité"
                  placeholder="Ex: Week-ends, 14h-16h"
                  value={disponibilite}
                  onChange={(e) => setDisponibilite(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm">
                  Images (optionnel)
                </label>
                <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-8 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer">
                  <p className="text-[var(--color-text-secondary)]">
                    Cliquez pour ajouter des images
                  </p>
                  <p className="text-sm text-[var(--color-text-light)] mt-1">
                    JPG, PNG - Max 5 Mo
                  </p>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Assistance IA */}
          <Card>
            <div className="p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles size={24} className="text-[var(--color-accent)]" />
                <h3>Assistance IA</h3>
              </div>
              <p className="text-[var(--color-text-secondary)]">
                Besoin d{'\''}aide pour rédiger votre annonce ? Entrez quelques mots-clés et l{'\''}IA vous proposera un texte.
              </p>
              
              <Input
                placeholder="Ex: pommes / donner / samedi"
                value={aiKeywords}
                onChange={(e) => setAiKeywords(e.target.value)}
              />
              
              <Button
                type="button"
                variant="outline"
                icon={<Sparkles size={20} />}
                onClick={handleAiGenerate}
              >
                Générer une suggestion
              </Button>
              
              {aiSuggestion && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium text-blue-900">Suggestion IA :</p>
                  <p className="text-[var(--color-text-secondary)]">{aiSuggestion}</p>
                  <Button
                    type="button"
                    size="sm"
                    variant="primary"
                    onClick={() => setDescription(aiSuggestion)}
                  >
                    Utiliser cette suggestion
                  </Button>
                </div>
              )}
            </div>
          </Card>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              variant="outline"
              icon={<Eye size={20} />}
              fullWidth
            >
              Prévisualiser
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={<Send size={20} />}
              fullWidth
            >
              Publier l{'\''}annonce
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
