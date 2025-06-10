import { LoginSchema, OauthSchema, typeLoginSchema } from "@/schemas/auth";
import { UtilsAuth } from "@/utils/services/auth";
import type { Profile } from "@auth/core/types";
import type { Account, NextAuthConfig, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { oauthGithubConfig, oauthGoogleConfig } from "./privatConfig";
interface jwtParams {
  token: JWT;
  user?: User;
  account: Account | null;
  profile?: Profile;
}

interface OauthParams {
  user?: User;
  account: Account | null;
}

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        return await serviceAuthCredentials(credentials as typeLoginSchema);
      },
    }),

    GithubProvider({
      clientId: oauthGithubConfig.GITHUB_CLIENT_ID,
      clientSecret: oauthGithubConfig.GITHUB_CLIENT_SECRET,
    }),

    GoogleProvider({
      clientId: oauthGoogleConfig.GOOGLE_CLIENT_ID,
      clientSecret: oauthGoogleConfig.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "github") {
        const newAccount = await serviceAuthGithub({ user, account });

        user.role = newAccount.role;
        user.image = newAccount.image;
        user.token = newAccount.token;
        user.provider = account.provider;
        user.providerAccountId = account.providerAccountId;
        user.accessTokenExpires = newAccount.accessTokenExpires;

        return newAccount;
      }

      if (account?.provider === "google") {
        const newAccount = await serviceAuthGoogle({ user, account });

        user.role = newAccount.role;
        user.image = newAccount.image;
        user.token = newAccount.token;
        user.provider = account.provider;
        user.providerAccountId = account.providerAccountId;
        user.refresh_token = newAccount.refresh_token;
        user.accessTokenExpires = newAccount.accessTokenExpires;

        return newAccount;
      }

      return true;
    },

    async jwt({ token, user }: jwtParams) {
      if (user) {
        token.id = user.id!;
        token.name = user.name!;
        token.email = user.email!;
        token.role = user.role;
        token.image = user.image!;
        token.token = user.token;
        token.provider = user.provider;
        token.accessTokenExpires = user.accessTokenExpires;
        token.refresh_token = user.refresh_token;
      }

      if (token.accessTokenExpires && Date.now() > token.accessTokenExpires) {
        const refresh_token = await serviceAuthRefreshToken(token);
        token.id = refresh_token.id;
        token.name = refresh_token.name;
        token.email = refresh_token.email;
        token.role = refresh_token.role;
        token.image = refresh_token.image;
        token.token = refresh_token.token;
        token.provider = refresh_token.provider;
        token.accessTokenExpires = refresh_token.accessTokenExpires;
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.image = token.image;
      session.user.token = token.token;

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  
} satisfies NextAuthConfig;

const serviceAuthCredentials = async (credentials: typeLoginSchema) => {
  const validatedFields = LoginSchema.safeParse(credentials);

  try {
    if (!validatedFields.success) {
      throw new Error("Invalid credentials");
    }

    const newUser = { ...validatedFields.data, provider: "credentials" };

    const result = await UtilsAuth.Login(newUser);

    if (!result || result.errors) return null;

    return result;
  } catch {
    return null;
  }
};

const serviceAuthGithub = async ({ user }: OauthParams) => {
  const validatedFields = OauthSchema.safeParse(user);

  try {
    if (!validatedFields.success) throw new Error("Invalid credentials");

    const result = await UtilsAuth.Oauth(validatedFields.data);

    if (!result || result.errors) throw new Error(result.errors);

    return result;
  } catch {
    return false;
  }
};

const serviceAuthGoogle = async ({ user }: OauthParams) => {
  const validatedFields = OauthSchema.safeParse(user);

  try {
    if (!validatedFields.success) throw new Error("Invalid credentials");

    const result = await UtilsAuth.Oauth(validatedFields.data);

    if (!result || result.errors) throw new Error(result.errors);

    return result;
  } catch {
    return false;
  }
};

// Refresh token
const serviceAuthRefreshToken = async (token: JWT): Promise<JWT> => {
  try {
    const result = await UtilsAuth.RefreshToken({
      refresh_token: token.refresh_token,
    });

    if (result.errors) return token;

    return result;
  } catch (err) {
    console.log({ Error: `ErrorRefresh: ${err}` });

    return token;
  }
};
