import React from 'react';

interface PageProps {
  params: {
    user: string;
  };
}

const Page = ({ params }: PageProps) => {
  return <div>This is a user Page {params.user}</div>;
};

export default Page;