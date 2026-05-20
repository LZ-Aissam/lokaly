import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { User, Save, Edit2, Plus, X } from 'lucide-react';
import { B_auth } from '../Composables/BRIDGE_auth';
import { B_users } from '../Composables/BRIDGE_users';
import { toast } from 'sonner';

export function ProfilPage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState<number | null>(null);
  const [nom, setNom] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [bio, setBio] = useState('');
  const [objetsDisponibles, setObjetsDisponibles] = useState<string[]>([]);
  const [nouvelObjet, setNouvelObjet] = useState('');

  useEffect(() => {
    B_auth().getCurrentUser()
      .then((authUser: any) => {
        const id = authUser.user_id;
        setUserId(id);
        return B_users().getUser(id);
      })
      .then((user: any) => {
        setNom((user.name || '') + (user.surname ? ' ' + user.surname : ''));
        setIdentifier(user.identifier || '');
        setBio(user.description || '');
        setLoading(false);
      })
      .catch((err: any) => {
        console.log('erreur chargement profil:', err);
        setLoading(false);
      });
  }, []);

  const handleAddObjet = () => {
    const trimmed = nouvelObjet.trim();
    if (trimmed && !objetsDisponibles.includes(trimmed)) {
      setObjetsDisponibles([...objetsDisponibles, trimmed]);
      setNouvelObjet('');
    }
  };

  const handleRemoveObjet = (objet: string) => {
    setObjetsDisponibles(objetsDisponibles.filter(o => o !== objet));
  };

  const handleSave = async () => {
    if (userId === null) return;
    try {
      await B_users().updateUser(userId, { description: bio });
      toast.success('Profil enregistré avec succès !');
      setIsEditing(false);
    } catch (err) {
      console.log('erreur sauvegarde profil:', err);
      toast.error('Erreur lors de la sauvegarde.');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Carte principale */}
        <Card className="mb-6">
          <div className="p-6 md:p-8 space-y-6">
            {/* Avatar et nom */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full flex items-center justify-center">
                <User size={40} className="text-white" />
              </div>
              <div>
                <h2>{nom || 'Utilisateur'}</h2>
                <p className="text-[var(--color-text-secondary)]">@{identifier}</p>
              </div>
            </div>

            {/* Bio */}
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

        {/* Objets disponibles */}
        <Card className="mb-6">
          <div className="p-6 md:p-8 space-y-4">
            <h3>Objets disponibles</h3>
            {objetsDisponibles.length === 0 && !isEditing ? (
              <p className="text-sm text-[var(--color-text-secondary)]">Aucun objet renseigné.</p>
            ) : (
              <ul className="space-y-2">
                {objetsDisponibles.map((objet, index) => (
                  <li key={index} className="flex items-center justify-between gap-2 text-[var(--color-text-secondary)]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full flex-shrink-0"></span>
                      {objet}
                    </div>
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
            )}
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
