import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    userId: string;
  };
}

const Layout = ({ children, params }: LayoutProps) => {
  return (
    <div className="flex flex-col gap-y4">
      <p>This is a layout for the user {params.userId}</p>
      {children}
    </div>
  );
};

export default Layout;