// Footer.tsx
// Pied de page affiché sur toutes les pages utilisateur
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter, Heart } from 'lucide-react';

// plus besoin de onNavigate, on utilise Link directement
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-gray-300 mt-auto border-t-4 border-[var(--color-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* À propos */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-xl">Lokaly</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              La plateforme qui connecte les habitants de votre quartier.
              Partagez, échangez et créez des liens avec vos voisins.
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[var(--color-primary)] rounded-lg flex items-center justify-center transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[var(--color-primary)] rounded-lg flex items-center justify-center transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[var(--color-primary)] rounded-lg flex items-center justify-center transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {/* on utilise Link au lieu de button+onNavigate */}
              <li><Link to="/" className="hover:text-[var(--color-primary)] transition-colors">Accueil</Link></li>
              <li><Link to="/annonces" className="hover:text-[var(--color-primary)] transition-colors">Annonces</Link></li>
              <li><Link to="/groupes" className="hover:text-[var(--color-primary)] transition-colors">Groupes</Link></li>
              <li><Link to="/profil" className="hover:text-[var(--color-primary)] transition-colors">Mon profil</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin size={16} className="text-[var(--color-primary)] flex-shrink-0" />
                <span>1 Place de la Mairie, 75001</span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Mail size={16} className="text-[var(--color-primary)] flex-shrink-0" />
                <span>contact@lokaly.fr</span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Phone size={16} className="text-[var(--color-primary)] flex-shrink-0" />
                <span>01 23 45 67 89</span>
              </li>
            </ul>
          </div>

          {/* Actions rapides */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">Actions rapides</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/annonces/nouvelle" className="hover:text-[var(--color-primary)] transition-colors">Publier une annonce</Link></li>
              <li><Link to="/groupes/creer" className="hover:text-[var(--color-primary)] transition-colors">Créer un groupe</Link></li>
              <li><Link to="/annonces" className="hover:text-[var(--color-primary)] transition-colors">Voir les annonces</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barre du bas */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} Lokaly. Tous droits réservés.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Fait avec <Heart size={14} className="text-red-500" /> pour notre communauté
          </p>
        </div>
      </div>
    </footer>
  );
}
