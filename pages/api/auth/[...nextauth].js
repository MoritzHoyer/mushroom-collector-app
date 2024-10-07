import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  // Konfigurieren Sie einen oder mehrere Authentifizierungsanbieter
  providers: [
    GithubProvider({
      clientId:
        process.env.NODE_ENV === "development"
          ? process.env.GITHUB_ID_LOCAL
          : process.env.GITHUB_ID,
      clientSecret:
        process.env.NODE_ENV === "development"
          ? process.env.GITHUB_SECRET_LOCAL
          : process.env.GITHUB_SECRET,
    }),
    // ...hier weitere Anbieter hinzufügen
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent", // Optional: Erzwingen der Zustimmung kann bei Problemen helfen
          access_type: "offline",
          scope: "profile email", // Sicherstellen, dass Profil- und E-Mail-Bereiche angefordert werden
        },
      },
    }),
    // ...hier weitere Anbieter hinzufügen
  ],
  debug: true,

  callbacks: {
    async signIn({ user, account, profile }) {
      // Hier die E-Mail vom Google-Profil manuell zuweisen
      if (account.provider === "google") {
        user.email = profile.email; // E-Mail zuweisen
        user.name = profile.name; // Name zuweisen
      }

      console.log("User:", user); // Überprüfe die Benutzerinformationen
      console.log("Account:", account); // Informationen über den Account
      console.log("Profile:", profile); // Überprüfe das zurückgegebene Profil

      return true; // Erlaube die Anmeldung
    },
    async session({ session, user }) {
      session.user = user; // Aktualisiere die Session mit dem user-Objekt
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email; // Speichere die E-Mail im Token
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
