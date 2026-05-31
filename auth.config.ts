import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { NextAuthConfig } from "next-auth";
import { cleanEnv } from "./lib/env";


export default{
    providers:[
        Github({
            clientId: cleanEnv(process.env.AUTH_GITHUB_ID),
            clientSecret: cleanEnv(process.env.AUTH_GITHUB_SECRET),
            authorization: {
                params: {
                    scope: "read:user user:email repo",
                },
            },
        }),
        Google({
            clientId: cleanEnv(process.env.AUTH_GOOGLE_ID),
            clientSecret: cleanEnv(process.env.AUTH_GOOGLE_SECRET),
        }),
    ]
} satisfies NextAuthConfig;