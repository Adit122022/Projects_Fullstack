import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: '/admin/login',
  }
});

export const config = {
  // Protect the dashboard and subroutes but let /admin/login pass
  matcher: ['/admin', '/admin/((?!login).*)']
};
