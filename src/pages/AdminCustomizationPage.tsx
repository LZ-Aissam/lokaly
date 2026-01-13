import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Save, Eye, Upload } from 'lucide-react';

interface AdminCustomizationPageProps {
  communaute?: any;
}

// Liste d'emojis suggérés pour les niveaux
const SUGGESTED_EMOJIS = ['⭐', '🌟', '✨', '💫', '🔥', '💎', '🏆', '👑', '🌸', '🍀', '🎯', '💪'];

export function AdminCustomizationPage({ communaute }: AdminCustomizationPageProps) {
  const [couleurPrimaire, setCouleurPrimaire] = useState('#3b82f6');
  const [messageAccueil, setMessageAccueil] = useState('Bienvenue dans votre communauté !');
  const [emojiNiveau, setEmojiNiveau] = useState('⭐');
  const [customEmoji, setCustomEmoji] = useState('');
  
  const handleSave = () => {
    alert('Personnalisation enregistrée avec succès !');
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
          <Card>
            <div className="p-6 space-y-6">
              <h3>Apparence</h3>
              
              <div className="space-y-2">
                <label className="block">
                  Couleur principale
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={couleurPrimaire}
                    onChange={(e) => setCouleurPrimaire(e.target.value)}
                    className="w-20 h-12 rounded-lg border-2 border-[var(--color-border)] cursor-pointer"
                  />
                  <Input
                    value={couleurPrimaire}
                    onChange={(e) => setCouleurPrimaire(e.target.value)}
                    placeholder="#3b82f6"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block">
                  Image de bannière
                </label>
                <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-8 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer">
                  <p className="text-[var(--color-text-secondary)]">
                    Cliquez pour ajouter une image
                  </p>
                  <p className="text-sm text-[var(--color-text-light)] mt-1">
                    JPG, PNG - Max 2 Mo - 1920x600px recommandé
                  </p>
                </div>
              </div>
              
              <Textarea
                label="Message d'accueil"
                value={messageAccueil}
                onChange={(e) => setMessageAccueil(e.target.value)}
                rows={4}
                helper="Ce message s'affichera sur la page d'accueil"
              />
            </div>
          </Card>

          {/* Emoji des niveaux de groupe */}
          <Card>
            <div className="p-6 space-y-6">
              <h3>Emoji des niveaux de groupe</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Choisissez l'emoji qui représentera les niveaux des groupes (comme les étoiles d'hôtel).
                Cet emoji sera appliqué à tous les groupes de la commune.
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

              {/* Emoji personnalisé */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Ou importez un emoji personnalisé</label>
                <div className="flex gap-3">
                  <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-4 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer flex-1">
                    <Upload size={24} className="mx-auto text-[var(--color-text-light)] mb-2" />
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Importer une image
                    </p>
                    <p className="text-xs text-[var(--color-text-light)]">
                      PNG, 64x64px recommandé
                    </p>
                  </div>
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
              <h3>Prévisualisation</h3>
              <div 
                className="rounded-xl p-8 text-white space-y-4"
                style={{ backgroundColor: couleurPrimaire }}
              >
                <h2 className="text-white">{messageAccueil}</h2>
                <p className="text-white/90">
                  Lokaly facilite l{'\''}entraide et les échanges entre voisins.
                </p>
                <div className="flex gap-3">
                  <button
                    className="px-4 py-2 bg-white rounded-lg text-gray-900"
                    style={{ color: couleurPrimaire }}
                  >
                    Nouvelle annonce
                  </button>
                  <button className="px-4 py-2 bg-white/20 rounded-lg text-white border-2 border-white/30">
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
                  • La couleur principale sera appliquée aux boutons, liens et éléments d{'\''}interface
                </p>
                <p>
                  • Le message d{'\''}accueil apparaîtra en première page
                </p>
                <p>
                  • L{'\''}image de bannière sera visible sur la page d{'\''}accueil
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
