'use client'
import { BoardList } from "./_components/board-list";
import { EmptyOrg } from "./_components/empty-org";
import { useOrganization } from '@clerk/nextjs'

interface DashboardProps {
  searchParams: {
    search?: string;
    favourites?: string;
  };
};

export default function Dashboard({ searchParams }: DashboardProps) {
  const { organization } = useOrganization();
  return (
    <div className=" flex-1 h-screen p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (<BoardList organizations={organization.id} searchParams={searchParams} />)}
    </div>
  )
}