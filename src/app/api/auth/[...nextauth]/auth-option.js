import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/service/auth-api";

export const authOptions = {
  debug: false,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async redirect({ baseUrl, url }) {
      try {
        const validUrl = new URL(url, baseUrl);
        const callbackUrl = validUrl.searchParams.get("callbackUrl") || "/admin";
        return callbackUrl.startsWith("/") ? `${baseUrl}${callbackUrl}` : callbackUrl;
      } catch (error) {
        console.log("Invalid URL:", error);
        return `${baseUrl}/admin`;
      }
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      type: "credentials",
      async authorize(credentials, req) {
        if (credentials) {
          try {
            const data = await login(credentials.email, credentials.password);
            if (data.code === 200 && data.data.user) {
              return { ...data.data.user, token: data.data.token };
            } else {
              console.error("Invalid credentials");
              return null;
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
