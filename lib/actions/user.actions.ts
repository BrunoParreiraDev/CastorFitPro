"use client";

import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
  UserCredential,
  updateProfile,
} from "firebase/auth";
import { auth, storage } from "@/lib/server/firebase";
import { RegisterData } from "@/types";
import { AuthData } from "@/types"
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


/**
 * Realiza o cadastro de um novo usuário com email e senha.
 *
 * @param {FormData} data - Os dados do formulário contendo email e senha.
 * @returns {Promise<{user: User | null, error: string | null}>} Retorna um objeto com os dados do usuário ou um erro.
 */
export const signUp = async ({ name, email, password, profileImage }: RegisterData) => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    let photoURL = "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg";

    // Fazer upload da imagem de perfil
    if (profileImage) {
      const storageRef = ref(storage, `profileImages/${user.uid}/${uuidv4()}`);
      await uploadBytes(storageRef, profileImage);
      photoURL = await getDownloadURL(storageRef);
    }

    // Atualizar perfil com displayName e photoURL
    await updateProfile(user, {
      displayName: name,
      photoURL,
    });

    console.log("Usuário criado com nome e imagem:", name, photoURL);

    return { user, error: null };
  } catch (error: any) {
    console.error("Erro durante o cadastro:", error.code, error.message);
    return { user: null, error: error.message };
  }
};


/**
 * Realiza a autenticação do usuário.
 *
 * @param {FormData} data - Os dados do formulário contendo email e senha.
 * @returns {Promise<{user: User | null, error: string | null}>} Retorna um objeto com os dados do usuário ou um erro.
 */
export const signIn = async ({ email, password }: AuthData) => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { user, error: null };
  } catch (error: any) {
    console.error("Erro durante a autenticação:", error.code, error.message);
    return { user: null, error: error.message };
  }
};

/**
 * Realiza o logout do usuário.
 *
 * @returns {Promise<{success: boolean, error: string | null}>} Retorna um objeto indicando o sucesso ou o erro.
 */
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true, error: null };
  } catch (error: any) {
    console.error("Erro durante o logout:", error.code, error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Obtém os dados do usuário autenticado atualmente.
 *
 * @returns {Promise<{user: User | null}>} Retorna os dados do usuário autenticado atualmente ou null se nenhum usuário estiver autenticado.
 */
export const getUserData = (): Promise<{
  profileImage: any; user: User | null 
}> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({ user });
      } else {
        resolve({ user: null });
      }
    });
  });
};

