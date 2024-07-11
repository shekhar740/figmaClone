import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(['/protected-route(.*)']);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  
  // Check if the route is protected
  if (isProtectedRoute(req)) {
    // Protect the route or perform some actions
    if (!userId) {
      return auth().redirectToSignIn();
    }
  }

  // You can also get the current user details here if needed
  // const user = currentUser(); 
  // Example: console.log(user);

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};