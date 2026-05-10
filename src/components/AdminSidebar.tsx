// AdminSidebar.tsx
// Barre latérale de navigation pour les pages admin
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, UserPlus, BarChart3, Palette, Menu, X, UsersRound, ClipboardCheck } from 'lucide-react';

// plus de props onNavigate et currentPage - React Router gère tout
export function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation(); // pour savoir quelle page admin est active
  const [isOpen, setIsOpen] = React.useState(false);

  // liste des items du menu admin avec leurs chemins
  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/users', label: 'Utilisateurs', icon: UserPlus },
    { path: '/admin/groupes', label: 'Groupes', icon: UsersRound },
    { path: '/admin/stats', label: 'Statistiques', icon: BarChart3 },
    { path: '/admin/validation', label: 'Validation', icon: ClipboardCheck },
    { path: '/admin/config', label: 'Personnalisation', icon: Palette },
  ];

  // vérifie si l'item de menu correspond à la page actuelle
  const isActive = (path: string) => {
    if (path === '/admin') {
      // pour le dashboard on vérifie l'égalité exacte
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Bouton hamburger visible uniquement sur mobile */}
      <button
        className="lg:hidden fixed top-20 left-4 z-50 p-3 bg-white rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Fond semi-transparent quand la sidebar est ouverte sur mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* La sidebar elle-même */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-[var(--color-border)] w-64 z-40 transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* En-tête de la sidebar */}
        <div className="p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <div>
              <h3 className="font-bold text-[var(--color-primary)]">Lokaly</h3>
              <p className="text-xs text-[var(--color-text-secondary)]">Administration</p>
            </div>
          </div>
        </div>

        {/* Menu de navigation admin */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setIsOpen(false); // fermer la sidebar sur mobile après navigation
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive(item.path)
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'text-[var(--color-text-primary)] hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Lien retour au site principal */}
        <div className="p-4 border-t border-[var(--color-border)]">
          <button
            onClick={() => navigate('/')}
            className="w-full px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            ← Retour au site
          </button>
        </div>
      </aside>
    </>
  );
}
