import { sendRequest } from "@/utils/api"
import NextAuth, { AuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    secret: process.env.NO_SECRET,
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: "http://localhost:8000/api/v1/auth/login",
                    method: "POST",
                    body: {
                        username: credentials?.username,
                        password: credentials?.password
                    }
                })

                if (res && res.data) {
                    return res.data as any
                } else {
                    throw new Error(res.message as string)
                    return null
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),

    ],
    callbacks: {
        async jwt({ token, trigger, account, user }) {
          
            if (trigger === "signIn" && account?.provider !== "credentials") {
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: "http://localhost:8000/api/v1/auth/social-media",
                    method: "POST",
                    body: {
                        type: account?.provider.toLocaleUpperCase(),
                        username: user.email
                    }
                })

                if (res.data) {
                    const { access_token, refresh_token, user } = res.data
                    token.access_token = access_token
                    token.refresh_token = refresh_token
                    token.user = user
                }
            }

            if (trigger === "signIn" && account?.provider === "credentials") {
                //@ts-ignore
                token.access_token = user.access_token
                //@ts-ignore
                token.refresh_token = user.refresh_token
                //@ts-ignore
                token.user = user.user
            }
            return token
        },
        session: ({ session, token }) => {

            if (token) {
                const { access_token, refresh_token, user } = token
                session.access_token = access_token
                session.refresh_token = refresh_token
                session.user = user
            }
            return session
        },
        
    },
    // pages: {
    //     signIn:"/auth/signin"
    // }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }