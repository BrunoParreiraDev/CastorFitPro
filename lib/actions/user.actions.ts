"use server";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../server/firebase";
import { FormData } from "@/types";

export const signIn = async ({ email, password }: FormData) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error during sign in:', errorCode, errorMessage);
      return false
    });
};

export const getUserData = () => {
 
};
