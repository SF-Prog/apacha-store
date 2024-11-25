import React from 'react'

interface PageContentProps {
  children: React.ReactNode
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <main className="flex-grow">
      {children}
    </main>
  );
};

export default PageContent;