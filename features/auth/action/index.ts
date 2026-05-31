"use server";

import { auth } from "@/auth";
import { getAccountByUserId, getUserById } from "./queries";

export const currentUser = async()=>{
    const user = await auth()
    return user?.user;
}

export { getAccountByUserId, getUserById };