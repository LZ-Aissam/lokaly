// App.tsx
// Composant racine - gère l'auth et la structure de navigation
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet, Link } from 'react-router-dom';
import { Toaster } from 'sonner';

// composants de mise en page
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdminSidebar } from './components/AdminSidebar';

// pages utilisateur
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { AnnoncesPage } from './pages/AnnoncesPage';
import { AnnonceDetailPage } from './pages/AnnonceDetailPage';
import { NouvelleAnnoncePage } from './pages/NouvelleAnnoncePage';
import { GroupesPage } from './pages/GroupesPage';
import { GroupeDetailPage } from './pages/GroupeDetailPage';
import { CreerGroupePage } from './pages/CreerGroupePage';
import { ProfilPage } from './pages/ProfilPage';

// pages admin
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { AdminCustomizationPage } from './pages/AdminCustomizationPage';
import { AdminStatsPage } from './pages/AdminStatsPage';
import { AdminGroupsPage } from './pages/AdminGroupsPage';
import { AdminGroupDetailPage } from './pages/AdminGroupDetailPage';
import { AdminValidationPage } from './pages/AdminValidationPage';

// type qui représente un utilisateur connecté
interface User {
  username: string;
  email?: string;
}

// Composant qui protège les routes privées
// Si l'utilisateur n'est pas connecté, on le redirige vers /login
function ProtectedRoute({ user }: { user: User | null }) {
  if (!user) {
    // replace évite d'avoir /login dans l'historique de navigation
    return <Navigate to="/login" replace />;
  }
  // Outlet rend le composant enfant correspondant à la route
  return <Outlet />;
}

// Layout des pages utilisateur normales (accueil, annonces, groupes...)
// Contient le header en haut et le footer en bas
function UserLayout({ user, onLogout }: { user: User | null; onLogout: () => void }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} onLogout={onLogout} />
      <main className="flex-1">
        {/* Outlet affiche la page correspondant à l'URL actuelle */}
        <Outlet />
      </main>
      <Footer />
      {/* Bouton flottant pour accéder rapidement à l'admin */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          to="/admin"
          className="bg-[var(--color-danger)] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:bg-[var(--color-danger-hover)] transition-colors"
        >
          Admin
        </Link>
      </div>
    </div>
  );
}

// Layout des pages admin (dashboard, users, groupes admin...)
// Contient la sidebar à gauche
function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 lg:ml-0 overflow-x-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  // null = pas connecté, sinon on a les infos du user
  const [user, setUser] = useState<User | null>(null);
  // pour afficher l'écran de chargement le temps de lire le localStorage
  const [isLoading, setIsLoading] = useState(true);

  // au montage du composant, on vérifie si un user est déjà connecté
  useEffect(() => {
    const savedUser = localStorage.getItem('lokaly_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        // le JSON stocké est corrompu, on supprime la clé
        localStorage.removeItem('lokaly_user');
      }
    }
    setIsLoading(false);
  }, []);

  // appelé depuis LoginPage quand la connexion réussit
  const handleLogin = (loggedUser: User) => {
    console.log('Connexion réussie pour :', loggedUser.username);
    setUser(loggedUser);
  };

  // appelé depuis le Header quand l'utilisateur clique sur "déconnexion"
  const handleLogout = () => {
    localStorage.removeItem('lokaly_user');
    setUser(null);
  };

  // écran de chargement pendant la lecture du localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-xl mb-4 animate-pulse">
            <span className="text-3xl font-bold bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              L
            </span>
          </div>
          <p className="text-white text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* les toasts (notifications) sont visibles sur toutes les pages */}
      <Toaster position="top-right" richColors />

      <Routes>
        {/* page de login - pas besoin d'être connecté pour y accéder */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        {/* toutes les routes qui nécessitent d'être connecté */}
        <Route element={<ProtectedRoute user={user} />}>

          {/* pages utilisateur avec header + footer */}
          <Route element={<UserLayout user={user} onLogout={handleLogout} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/annonces" element={<AnnoncesPage />} />
            {/* /annonces/nouvelle doit être AVANT /annonces/:id sinon "nouvelle" serait interprété comme un id */}
            <Route path="/annonces/nouvelle" element={<NouvelleAnnoncePage />} />
            <Route path="/annonces/:id" element={<AnnonceDetailPage />} />
            <Route path="/groupes" element={<GroupesPage />} />
            <Route path="/groupes/creer" element={<CreerGroupePage />} />
            <Route path="/groupes/:id" element={<GroupeDetailPage />} />
            <Route path="/profil" element={<ProfilPage />} />
          </Route>

          {/* pages admin avec sidebar */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/groupes" element={<AdminGroupsPage />} />
            <Route path="/admin/groupes/:id" element={<AdminGroupDetailPage />} />
            <Route path="/admin/stats" element={<AdminStatsPage />} />
            <Route path="/admin/validation" element={<AdminValidationPage />} />
            <Route path="/admin/config" element={<AdminCustomizationPage />} />
          </Route>

        </Route>
      </Routes>
    </div>
  );
}
