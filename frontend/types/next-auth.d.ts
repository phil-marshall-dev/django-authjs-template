import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

export type DjangoUser = {
  username: string;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    access: string;
    refresh: string;
    user: DjangoUser    
  }
  interface Session {
    access: string;
    refresh: string;
    user: DjangoUser;
    refreshAt: number;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    access: string;
    refresh: string;
    user: DjangoUser;
    refreshAt: number;
  }
}