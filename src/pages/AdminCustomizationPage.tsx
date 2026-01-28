import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Save, Eye, Upload, Plus, X, MapPin } from 'lucide-react';

interface AdminCustomizationPageProps {
  communaute?: any;
}

// Liste d'emojis suggérés pour les niveaux
const SUGGESTED_EMOJIS = ['⭐', '🌟', '✨', '💫', '🔥', '💎', '🏆', '👑', '🌸', '🍀', '🎯', '💪'];

// Jeux de couleurs prédéfinis
const COLOR_PRESETS = [
  { name: 'Bleu océan', primary: '#3b82f6', secondary: '#10b981' },
  { name: 'Violet élégant', primary: '#8b5cf6', secondary: '#ec4899' },
  { name: 'Vert nature', primary: '#22c55e', secondary: '#14b8a6' },
  { name: 'Orange chaleureux', primary: '#f97316', secondary: '#eab308' },
  { name: 'Rouge passion', primary: '#ef4444', secondary: '#f97316' },
  { name: 'Bleu nuit', primary: '#1e40af', secondary: '#3b82f6' },
];

export function AdminCustomizationPage({ communaute }: AdminCustomizationPageProps) {
  // États pour les couleurs (Bleu nuit par défaut)
  const [couleurPrimaire, setCouleurPrimaire] = useState('#1e40af');
  const [couleurSecondaire, setCouleurSecondaire] = useState('#3b82f6');

  // États pour le branding
  const [nomCommunaute, setNomCommunaute] = useState('Lokaly');
  const [logoUrl, setLogoUrl] = useState('');
  const [messageAccueil, setMessageAccueil] = useState('Bienvenue dans votre communauté !');

  // États pour les emojis de niveau
  const [emojiNiveau, setEmojiNiveau] = useState('⭐');

  // États pour les tags région
  const [tagsRegion, setTagsRegion] = useState<string[]>([
    'Centre-ville',
    'Quartier Nord',
    'Quartier Sud',
    'Salle Polyvalente',
  ]);
  const [nouveauTagRegion, setNouveauTagRegion] = useState('');

  const handleSave = () => {
    alert('Personnalisation enregistrée avec succès !');
  };

  const applyColorPreset = (preset: typeof COLOR_PRESETS[0]) => {
    setCouleurPrimaire(preset.primary);
    setCouleurSecondaire(preset.secondary);
  };

  const addTagRegion = () => {
    if (nouveauTagRegion.trim() && !tagsRegion.includes(nouveauTagRegion.trim())) {
      setTagsRegion([...tagsRegion, nouveauTagRegion.trim()]);
      setNouveauTagRegion('');
    }
  };

  const removeTagRegion = (tag: string) => {
    setTagsRegion(tagsRegion.filter(t => t !== tag));
  };

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div>
        <h1>Personnalisation</h1>
        <p className="text-[var(--color-text-secondary)] mt-2">
          {communaute ? `${communaute.nom}` : 'Personnalisez l\'apparence de votre communauté'}
        </p>
      </div>

      {/* Formulaire de personnalisation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration */}
        <div className="space-y-6">
          {/* Logo et nom de la communauté */}
          <Card>
            <div className="p-6 space-y-6">
              <h3>Identité de la communauté</h3>

              <div className="space-y-4">
                <Input
                  label="Nom de la communauté"
                  value={nomCommunaute}
                  onChange={(e) => setNomCommunaute(e.target.value)}
                  placeholder="Ex: Lokaly, Ma Commune, etc."
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Logo de la communauté</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                      {logoUrl ? (
                        <img src={logoUrl} alt="Logo" className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <span className="text-white font-bold text-3xl">{nomCommunaute.charAt(0)}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-4 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer">
                        <Upload size={20} className="mx-auto text-[var(--color-text-light)] mb-1" />
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          Importer un logo
                        </p>
                        <p className="text-xs text-[var(--color-text-light)]">
                          PNG, JPG - 200x200px recommandé
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Couleurs */}
          <Card>
            <div className="p-6 space-y-6">
              <h3>Couleurs des boutons</h3>

              {/* Jeux de couleurs prédéfinis */}
              <div className="space-y-3">
                <label className="block text-sm font-medium">Palettes prédéfinies</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyColorPreset(preset)}
                      className={`p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                        couleurPrimaire === preset.primary && couleurSecondaire === preset.secondary
                          ? 'border-gray-900 shadow-md'
                          : 'border-[var(--color-border)]'
                      }`}
                    >
                      <div className="flex gap-1 mb-2">
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: preset.secondary }}
                        />
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)]">{preset.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Couleurs personnalisées */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Couleur principale</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={couleurPrimaire}
                      onChange={(e) => setCouleurPrimaire(e.target.value)}
                      className="w-12 h-10 rounded-lg border-2 border-[var(--color-border)] cursor-pointer"
                    />
                    <Input
                      value={couleurPrimaire}
                      onChange={(e) => setCouleurPrimaire(e.target.value)}
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Couleur secondaire</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={couleurSecondaire}
                      onChange={(e) => setCouleurSecondaire(e.target.value)}
                      className="w-12 h-10 rounded-lg border-2 border-[var(--color-border)] cursor-pointer"
                    />
                    <Input
                      value={couleurSecondaire}
                      onChange={(e) => setCouleurSecondaire(e.target.value)}
                      placeholder="#10b981"
                    />
                  </div>
                </div>
              </div>

              {/* Aperçu des boutons */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Aperçu des boutons</label>
                <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg">
                  <button
                    className="px-4 py-2 rounded-lg text-white font-medium shadow-md"
                    style={{ backgroundColor: couleurPrimaire }}
                  >
                    Bouton principal
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg text-white font-medium shadow-md"
                    style={{ backgroundColor: couleurSecondaire }}
                  >
                    Bouton secondaire
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg font-medium border-2"
                    style={{ borderColor: couleurPrimaire, color: couleurPrimaire }}
                  >
                    Bouton outline
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Emoji des niveaux de groupe */}
          <Card>
            <div className="p-6 space-y-6">
              <h3>Emoji des niveaux de groupe</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Choisissez l'emoji qui représentera les niveaux des groupes.
              </p>

              {/* Emojis suggérés */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Emojis suggérés</label>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setEmojiNiveau(emoji)}
                      className={`w-12 h-12 text-2xl rounded-lg border-2 transition-all ${
                        emojiNiveau === emoji
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                          : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prévisualisation des niveaux */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Aperçu des niveaux</label>
                <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <Badge key={level} variant="level" level={level} emoji={emojiNiveau} />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Tags région */}
          <Card>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-[var(--color-primary)]" />
                <h3>Tags région / localisation</h3>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Définissez les zones et lieux qui pourront être associés aux annonces et événements.
                Un seul tag région peut être lié à chaque annonce ou événement.
              </p>

              {/* Liste des tags existants */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Tags actuels</label>
                <div className="flex flex-wrap gap-2">
                  {tagsRegion.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      <MapPin size={14} />
                      {tag}
                      <button
                        onClick={() => removeTagRegion(tag)}
                        className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Ajouter un nouveau tag */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Ajouter un tag région</label>
                <div className="flex gap-2">
                  <Input
                    value={nouveauTagRegion}
                    onChange={(e) => setNouveauTagRegion(e.target.value)}
                    placeholder="Ex: Quartier des Fontaines, Salle Polyvalente..."
                    onKeyDown={(e) => e.key === 'Enter' && addTagRegion()}
                  />
                  <Button
                    variant="primary"
                    icon={<Plus size={20} />}
                    onClick={addTagRegion}
                  >
                    Ajouter
                  </Button>
                </div>
                <p className="text-xs text-[var(--color-text-light)]">
                  Exemples : nom de quartier, lieu exact (salle, parc...), zone géographique
                </p>
              </div>
            </div>
          </Card>

          {/* Message d'accueil */}
          <Card>
            <div className="p-6 space-y-6">
              <h3>Message d'accueil</h3>
              <Textarea
                label="Texte affiché sur la page d'accueil"
                value={messageAccueil}
                onChange={(e) => setMessageAccueil(e.target.value)}
                rows={3}
              />
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              icon={<Eye size={20} />}
              fullWidth
            >
              Prévisualiser
            </Button>
            <Button
              variant="primary"
              icon={<Save size={20} />}
              fullWidth
              onClick={handleSave}
            >
              Enregistrer
            </Button>
          </div>
        </div>

        {/* Prévisualisation */}
        <div className="space-y-6">
          <Card>
            <div className="p-6 space-y-4">
              <h3>Prévisualisation du header</h3>
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${couleurPrimaire}, ${couleurSecondaire})` }}
                  >
                    {logoUrl ? (
                      <img src={logoUrl} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <span className="text-white font-bold text-xl">{nomCommunaute.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <span className="font-bold text-lg" style={{ color: couleurPrimaire }}>{nomCommunaute}</span>
                    <p className="text-xs text-gray-500">Commune de Tori</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6 space-y-4">
              <h3>Prévisualisation du hero</h3>
              <div
                className="rounded-xl p-8 text-white space-y-4"
                style={{ background: `linear-gradient(135deg, ${couleurPrimaire}, ${couleurSecondaire})` }}
              >
                <h2 className="text-white text-xl font-bold">{messageAccueil}</h2>
                <p className="text-white opacity-90 text-sm">
                  {nomCommunaute} facilite l{'\''}entraide et les échanges entre voisins.
                </p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-white rounded-lg text-sm font-medium" style={{ color: couleurPrimaire }}>
                    Nouvelle annonce
                  </button>
                  <button className="px-4 py-2 bg-white/20 rounded-lg text-white text-sm border-2 border-white/30">
                    Créer un groupe
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6 space-y-4">
              <h4>Informations</h4>
              <div className="space-y-3 text-sm text-[var(--color-text-secondary)]">
                <p>
                  • Les couleurs seront appliquées aux boutons et éléments d{'\''}interface
                </p>
                <p>
                  • Le logo et le nom apparaîtront dans le header du site
                </p>
                <p>
                  • Les tags région seront disponibles lors de la création d{'\''}annonces
                </p>
                <p>
                  • Les modifications sont instantanées pour tous les utilisateurs
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
