'use client'

import { useState } from 'react'
import { Sidebar } from '../admin-sidebar/admin-sidebar'
import { ProductsPanel } from '../products-panel/products-panel'
import { useAdmin } from '@/app/context/admin-context'
import { FullScreenLoader } from '../../ui/fullscreen-loader'
// import { ServicesPanel } from '../services-panel/services-panel'
// import { EventsPanel } from '../events-panel/events-panel';

type AdminPanelTab = 'products' | 'services' | 'events'

export default function AdminPanel() {
  const { isLoading } = useAdmin();
  const [activeTab, setActiveTab] = useState<AdminPanelTab>('products');

  const renderLoader = () => {
    if (!isLoading) return;
    return <FullScreenLoader />;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {renderLoader()}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          {activeTab === 'products' && <ProductsPanel />}
          {/* {activeTab === 'services' && <ServicesPanel />}
          {activeTab === 'events' && <EventsPanel />} */}
        </div>
      </main>
    </div>
  );
}