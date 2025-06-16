import { ElementType } from 'react'
import { Package, Briefcase, Calendar, PackageSearch, VeganIcon } from 'lucide-react'

interface SidebarProps {
  activeTab: AdminPanelTabItem
  setActiveTab: (tab: AdminPanelTabItem) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="bg-gray-800 text-gray-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <SidebarItem
          icon={Package}
          text="Products"
          isActive={activeTab === 'products'}
          onClick={() => setActiveTab('products')}
        />
        <SidebarItem
          icon={PackageSearch}
          text="Product Categories"
          isActive={activeTab === 'product_categories'}
          onClick={() => setActiveTab('product_categories')}
        />
        <SidebarItem
          icon={Calendar}
          text="Events"
          isActive={activeTab === 'events'}
          onClick={() => setActiveTab('events')}
        />
        <SidebarItem
          icon={Calendar}
          text="Workshops"
          isActive={activeTab === 'workshops'}
          onClick={() => setActiveTab('workshops')}
        />
        <SidebarItem
          icon={Briefcase}
          text="Subscriptions"
          isActive={activeTab === 'subscriptions'}
          onClick={() => setActiveTab('subscriptions')}
        />
        <SidebarItem
          icon={VeganIcon}
          text="Weekly Menu"
          isActive={activeTab === 'weekly-menu'}
          onClick={() => setActiveTab('weekly-menu')}
        />
      </nav>
    </aside>
  )
}

interface SidebarItemProps {
  icon: ElementType
  text: string
  isActive: boolean
  onClick: () => void
}

function SidebarItem({ icon: Icon, text, isActive, onClick }: SidebarItemProps) {
  return (
    <a
      href="#"
      className={`flex items-center space-x-2 py-2 px-4 rounded transition duration-200 ${
        isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
      }`}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      <Icon className="h-5 w-5" />
      <span>{text}</span>
    </a>
  )
}