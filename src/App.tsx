import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdminSidebar } from './components/AdminSidebar';
import { HomePage } from './pages/HomePage';
import { AnnoncesPage } from './pages/AnnoncesPage';
import { AnnonceDetailPage } from './pages/AnnonceDetailPage';
import { NouvelleAnnoncePage } from './pages/NouvelleAnnoncePage';
import { GroupesPage } from './pages/GroupesPage';
import { GroupeDetailPage } from './pages/GroupeDetailPage';
import { CreerGroupePage } from './pages/CreerGroupePage';
import { ProfilPage } from './pages/ProfilPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { AdminCommunitiesPage } from './pages/AdminCommunitiesPage';
import { AdminCustomizationPage } from './pages/AdminCustomizationPage';
import { AdminStatsPage } from './pages/AdminStatsPage';
import { AdminGroupsPage } from './pages/AdminGroupsPage';
import { AdminGroupDetailPage } from './pages/AdminGroupDetailPage';

type PageType =
  | 'home'
  | 'annonces'
  | 'annonce-detail'
  | 'nouvelle-annonce'
  | 'groupes'
  | 'groupe-detail'
  | 'creer-groupe'
  | 'profil'
  | 'admin-dashboard'
  | 'admin-users'
  | 'admin-communities'
  | 'admin-customization'
  | 'admin-groups'
  | 'admin-group-detail'
  | 'admin-stats';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [pageData, setPageData] = useState<any>(null);
  
  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page as PageType);
    setPageData(data || null);
    window.scrollTo(0, 0);
  };
  
  const isAdminPage = currentPage.startsWith('admin-');

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {!isAdminPage ? (
        <div className="flex flex-col min-h-screen">
          <Header
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />
          <main className="flex-1">
            {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
            {currentPage === 'annonces' && <AnnoncesPage onNavigate={handleNavigate} />}
            {currentPage === 'annonce-detail' && <AnnonceDetailPage annonce={pageData} onNavigate={handleNavigate} />}
            {currentPage === 'nouvelle-annonce' && <NouvelleAnnoncePage onNavigate={handleNavigate} />}
            {currentPage === 'groupes' && <GroupesPage onNavigate={handleNavigate} />}
            {currentPage === 'groupe-detail' && <GroupeDetailPage groupe={pageData} onNavigate={handleNavigate} />}
            {currentPage === 'creer-groupe' && <CreerGroupePage onNavigate={handleNavigate} />}
            {currentPage === 'profil' && <ProfilPage onNavigate={handleNavigate} />}
          </main>
          <Footer onNavigate={handleNavigate} />
        </div>
      ) : (
        <div className="flex min-h-screen">
          <AdminSidebar currentPage={currentPage} onNavigate={handleNavigate} />
          <main className="flex-1 lg:ml-0 overflow-x-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              {currentPage === 'admin-dashboard' && <AdminDashboardPage />}
              {currentPage === 'admin-users' && <AdminUsersPage />}
              {currentPage === 'admin-communities' && <AdminCommunitiesPage onNavigate={handleNavigate} />}
              {currentPage === 'admin-customization' && <AdminCustomizationPage communaute={pageData} />}
              {currentPage === 'admin-groups' && <AdminGroupsPage onNavigate={handleNavigate} />}
              {currentPage === 'admin-group-detail' && <AdminGroupDetailPage groupe={pageData} onNavigate={handleNavigate} />}
              {currentPage === 'admin-stats' && <AdminStatsPage />}
            </div>
          </main>
        </div>
      )}

      {/* Bouton d'accès admin */}
      {!isAdminPage && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => handleNavigate('admin-dashboard')}
            className="bg-[var(--color-danger)] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:bg-[var(--color-danger-hover)] transition-colors"
          >
            Admin
          </button>
        </div>
      )}
    </div>
  );
}