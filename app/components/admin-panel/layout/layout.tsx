'use client'

import { useState } from 'react'
import { FullScreenLoader } from '@/components/ui/fullscreen-loader'
import { Sidebar } from '@/components/admin-panel//admin-sidebar/admin-sidebar'
import { ProductsPanel } from '@/components/admin-panel//products-panel/products-panel'
import { ProductCategoriesPanel } from '@/components/admin-panel//product-categories-panel/product-categories-panel'
import { useAdmin } from '@/app/context/admin-context'


export default function AdminPanel() {
  const [ activeTab, setActiveTab ] = useState<AdminPanelTabItem>('products');
  const { isLoading } = useAdmin();

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
          {activeTab === 'product_categories' && <ProductCategoriesPanel />}
          {/* {activeTab === 'services' && <ServicesPanel />}
          {activeTab === 'events' && <EventsPanel />} */}
        </div>
      </main>
    </div>
  );
}