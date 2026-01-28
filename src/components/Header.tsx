import React from 'react';
import { Home, FileText, Users, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  communityName?: string;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ communityName = 'Commune de Tori', onNavigate, currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'annonces', label: 'Annonces', icon: FileText },
    { id: 'groupes', label: 'Groupes', icon: Users },
    { id: 'profil', label: 'Profil', icon: User },
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo et nom */}
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onNavigate('home')}
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
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
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

          {/* Bouton menu mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[var(--color-border)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-[var(--color-text-primary)] hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
