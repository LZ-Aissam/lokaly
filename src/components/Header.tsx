// Header.tsx
// Barre de navigation principale affichée sur toutes les pages utilisateur
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FileText, Users, User, Menu, X, LogOut } from 'lucide-react';

// on n'a plus besoin de onNavigate et currentPage en props
// React Router s'occupe de tout ça maintenant
interface HeaderProps {
  communityName?: string;
  user?: { username: string; email?: string };
  onLogout?: () => void;
}

export function Header({ communityName = 'Commune de Tori', user, onLogout }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation(); // pour savoir sur quelle page on est actuellement
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // liste des items du menu avec leur chemin de navigation
  const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/annonces', label: 'Annonces', icon: FileText },
    { path: '/groupes', label: 'Groupes', icon: Users },
    { path: '/profil', label: 'Profil', icon: User },
  ];

  // vérifie si un item de nav est actif selon l'URL actuelle
  const isActive = (path: string) => {
    if (path === '/') {
      // pour l'accueil on vérifie l'égalité exacte sinon tout serait actif
      return location.pathname === '/';
    }
    // pour les autres pages on vérifie si l'URL commence par le chemin
    // ex: /annonces/1 -> l'item Annonces est actif
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo - clic pour aller à l'accueil */}
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-[var(--color-primary)]">Lokaly</span>
                <span className="text-xs text-[var(--color-text-secondary)] hidden sm:block">{communityName}</span>
              </div>
            </div>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive(item.path)
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-[var(--color-text-primary)] hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Infos utilisateur et bouton déconnexion (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {user && (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                  <div className="w-7 h-7 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">
                    {user.username}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-500 hover:text-[var(--color-danger)] hover:bg-red-50 rounded-lg transition-colors"
                  title="Se déconnecter"
                >
                  <LogOut size={20} />
                </button>
              </>
            )}
          </div>

          {/* Bouton hamburger pour mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu mobile déroulant */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[var(--color-border)]">
            {/* info user sur mobile */}
            {user && (
              <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-gray-50 rounded-lg mx-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Connecté</p>
                </div>
              </div>
            )}

            {/* items du menu mobile */}
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false); // on ferme le menu après navigation
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${
                    isActive(item.path)
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-[var(--color-text-primary)] hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* bouton déconnexion mobile */}
            {user && onLogout && (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 mt-2 text-[var(--color-danger)] hover:bg-red-50 transition-all border-t border-[var(--color-border)]"
              >
                <LogOut size={20} />
                <span>Se déconnecter</span>
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
