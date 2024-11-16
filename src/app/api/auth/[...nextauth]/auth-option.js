import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/service/auth-api";

export const authOptions = {
  debug: true,
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.userType = user.user_type; 
      }
      return token;
    },
    async redirect({ url, baseUrl, token }) {

      const defaultRedirect = token?.userType === "Student" ? "/" : "/admin";

      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      return defaultRedirect;
    },
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          try {
            const data = await login(credentials.email, credentials.password);
            if (data.code === 200 && data.data.user) {
              return {
                ...data.data.user,
                token: data.data.token,
              };
            }
          } catch (error) {
            console.error("Authorization error:", error);
            return null;
          }
        }
        return null;
      },
    }),
  ],
};
