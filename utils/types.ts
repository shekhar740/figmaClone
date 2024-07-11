// types.d.ts (or any file where you keep your types)
export interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    emailAddresses: { emailAddress: string }[];
    // Add other fields as necessary
  }
  