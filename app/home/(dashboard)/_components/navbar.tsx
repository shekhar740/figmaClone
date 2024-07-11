import { Header } from "@/components/dashboard/Header";
import { HeaderActions } from "@/components/dashboard/header-actions";
// import {  useOrganization} from "@clerk/nextjs";
import { SearchInput } from "./sidebar/searc-input";
import { InviteButton } from "./invite-button";

export function Navbar() {
  // const { organization } = useOrganization();
  return (
    <div className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
       <InviteButton /> 
      <HeaderActions />
    </div>
  );
}
