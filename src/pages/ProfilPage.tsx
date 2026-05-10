// ProfilPage.tsx
// Page de profil de l'utilisateur connecté
// Note : cette page ne navigue nulle part, elle n'a pas besoin de useNavigate
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { User, Save, Edit2, Plus, X } from 'lucide-react';
import { mockUserProfile } from '../data/mockData';
import { toast } from 'sonner';

// plus de props - cette page ne navigue pas donc pas besoin de useNavigate non plus
export function ProfilPage() {
  // état pour savoir si on est en mode édition
  const [isEditing, setIsEditing] = useState(false);

  // états du formulaire de profil
  const [bio, setBio] = useState(mockUserProfile.bio);
  const [contactExterne, setContactExterne] = useState(mockUserProfile.contactExterne);
  const [objetsDisponibles, setObjetsDisponibles] = useState(mockUserProfile.objetsDisponibles);
  const [nouvelObjet, setNouvelObjet] = useState('');

  // ajouter un objet à la liste si non vide et non dupliqué
  const handleAddObjet = () => {
    const trimmed = nouvelObjet.trim();
    if (trimmed && !objetsDisponibles.includes(trimmed)) {
      setObjetsDisponibles([...objetsDisponibles, trimmed]);
      setNouvelObjet('');
    }
  };

  // supprimer un objet de la liste
  const handleRemoveObjet = (objet: string) => {
    setObjetsDisponibles(objetsDisponibles.filter(o => o !== objet));
  };

  const handleSave = () => {
    // TODO: envoyer les modifs au backend quand il sera prêt
    toast.success('Profil enregistré avec succès !');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête avec bouton modifier / enregistrer */}
        <div className="flex items-center justify-between mb-8">
          <h1>Mon profil</h1>
          <Button
            variant={isEditing ? 'secondary' : 'outline'}
            icon={isEditing ? <Save size={20} /> : <Edit2 size={20} />}
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? 'Enregistrer' : 'Modifier'}
          </Button>
        </div>

        {/* Carte principale - avatar, nom, bio */}
        <Card className="mb-6">
          <div className="p-6 md:p-8 space-y-6">
            {/* Avatar et nom de l'utilisateur */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full flex items-center justify-center">
                <User size={40} className="text-white" />
              </div>
              <div>
                <h2>{mockUserProfile.nom}</h2>
                <p className="text-[var(--color-text-secondary)]">@{mockUserProfile.identifier}</p>
              </div>
            </div>

            {/* Bio modifiable */}
            <div>
              <Textarea
                label="Présentation"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={!isEditing}
                rows={4}
                helper="Parlez-vous à la communauté"
              />
            </div>
          </div>
        </Card>

        {/* Centres d'intérêt */}
        <Card className="mb-6">
          <div className="p-6 md:p-8 space-y-4">
            <h3>Centres d{'\''}intérêt</h3>
            <div className="flex flex-wrap gap-2">
              {mockUserProfile.centresInteret.map((interet, index) => (
                <Badge key={index} variant="primary">
                  {interet}
                </Badge>
              ))}
              {isEditing && (
                <Badge variant="neutral">
                  + Ajouter
                </Badge>
              )}
            </div>
          </div>
        </Card>

        {/* Compétences proposées à la communauté */}
        <Card className="mb-6">
          <div className="p-6 md:p-8 space-y-4">
            <h3>Compétences proposées</h3>
            <div className="flex flex-wrap gap-2">
              {mockUserProfile.competences.map((competence, index) => (
                <Badge key={index} variant="secondary">
                  {competence}
                </Badge>
              ))}
              {isEditing && (
                <Badge variant="neutral">
                  + Ajouter
                </Badge>
              )}
            </div>
          </div>
        </Card>

        {/* Objets disponibles - liste avec ajout/suppression en mode édition */}
        <Card className="mb-6">
          <div className="p-6 md:p-8 space-y-4">
            <h3>Objets disponibles</h3>
            <ul className="space-y-2">
              {objetsDisponibles.map((objet, index) => (
                <li key={index} className="flex items-center justify-between gap-2 text-[var(--color-text-secondary)]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full flex-shrink-0"></span>
                    {objet}
                  </div>
                  {/* bouton supprimer visible seulement en mode édition */}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveObjet(objet)}
                      className="p-0.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {/* champ d'ajout d'objet visible seulement en mode édition */}
            {isEditing && (
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={nouvelObjet}
                  onChange={(e) => setNouvelObjet(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddObjet())}
                  placeholder="Ex: Vélo, Échelle..."
                  className="flex-1 px-3 py-2 text-sm rounded-lg border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none transition-all"
                />
                <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={handleAddObjet}>
                  Ajouter
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Contact externe (lien Line / WhatsApp) */}
        <Card>
          <div className="p-6 md:p-8 space-y-4">
            <h3>Contact externe</h3>
            <Input
              label="Lien Line / WhatsApp"
              placeholder="https://line.me/ti/p/votre-nom"
              value={contactExterne}
              onChange={(e) => setContactExterne(e.target.value)}
              disabled={!isEditing}
              helper="Ce lien sera partagé uniquement avec les personnes intéressées par vos annonces"
            />
          </div>
        </Card>

        {/* Boutons de sauvegarde/annulation en bas de page - visibles seulement en mode édition */}
        {isEditing && (
          <div className="flex gap-4 mt-6">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setIsEditing(false)}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handleSave}
            >
              Enregistrer les modifications
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
