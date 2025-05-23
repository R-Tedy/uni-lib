'use server'

import { signIn } from "@/auth";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, 'email' | 'password'>
) => {
  const {email, password} = params;

  const ip = (await headers()).get('x-forward-for') || '127.0.0.1';
  const {success} = await ratelimit.limit(ip); 

  if(!success) return redirect('/too-fast');

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if(result?.error) {
      return {success: false, error: result.error};
    };

    return {success: true};
  } catch (error) {
    console.log(error, 'Signin error');
    return {success: false, error: 'Sign in error'}
  }
}

export const signUp = async (params : AuthCredentials) => {
  const {fullName, email, password, universityId} = params;

  const ip = (await headers()).get('x-forward-for') || '127.0.0.1';
  const {success} = await ratelimit.limit(ip); 

  if(!success) return redirect('/too-fast');

  // fetching and existing user
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return {success: false, error: 'User already exists'};
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(usersTable).values({
      fullName,
      email,
      universityId,
      password: hashedPassword,
    });

    await signInWithCredentials({email, password});

    return{success: true}
  } catch (error) {
    console.log(error, 'sign up error');
    return {success: false, error: 'Sign up error'};
  }

}