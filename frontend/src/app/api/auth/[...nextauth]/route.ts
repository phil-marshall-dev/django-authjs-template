import NextAuth, { AuthOptions, CallbacksOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60;            // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60;  // 6 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

const callbackOptions: CallbacksOptions = {
  async signIn({ user, account, profile, email, credentials }) {
    return true
  },
  async redirect({ url, baseUrl }) {
    return baseUrl
  },
  async session({ session, user, token }) {
    session.access = token.access
    session.refresh = token.refresh
    session.user = token.user
    return session
  },
  async jwt({ token, user, account, profile, isNewUser }) {
    console.log('JWT callback running')
    if (user) {
    token.access = user.access
    token.refresh = user.refresh
    token.user = user.user
    }
    return token
  }
}

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },
  secret: "MYSECRETKEY",
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await axios.post('http://localhost:8000/api/auth/login/', {
            username: credentials?.username,
            password: credentials?.password,
          });

          const user = res.data;
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      }
    })
  ],
  callbacks: callbackOptions
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
