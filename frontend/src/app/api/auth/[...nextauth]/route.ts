import NextAuth, { AuthOptions, CallbacksOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';
let counter = 0;

// These should be less than what they are in Django
const BACKEND_ACCESS_TOKEN_LIFETIME =  30
const BACKEND_REFRESH_TOKEN_LIFETIME = 60;

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
    session.refreshAt = token.refreshAt
    return session
  },
  async jwt({ token, user, account, profile }) {
    console.log('JWT callback running ', counter)
    counter++;
    if (user) {
      console.log('user is defined')
      token.access = user.access
      token.refresh = user.refresh
      token.user = user.user
      token.refreshAt = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
    }
    // Refresh the token if it's time
    if (getCurrentEpochTime() > token.refreshAt) {
      console.log('refreshing')
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/api/auth/token/refresh/",
        data: {
          refresh: token.refresh,
        },
      });
      token.access = response.data.access;
      token.refresh = response.data.refresh;
      token.refreshAt = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
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
