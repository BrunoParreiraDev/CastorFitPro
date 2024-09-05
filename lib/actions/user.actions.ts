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

    let photoURL = "/users/default-profile.jpg";

    // // Fazer upload da imagem de perfil
    // if (profileImage instanceof File) {
    //   const storageRef = ref(storage, `/users/${user.uid}/${uuidv4()}`);
    //   await uploadBytes(storageRef, profileImage); // Certifique-se de que profileImage é do tipo File ou Blob
    //   photoURL = await getDownloadURL(storageRef);
    // }

    // Atualizar perfil com displayName e photoURL
    await updateProfile(user, {
      displayName: name,
      photoURL,
    });


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
 * @returns {Promise<{profileImage: string; name: string; user: User | null}>} Retorna os dados do usuário autenticado atualmente ou null se nenhum usuário estiver autenticado.
 */
export const getUserData = (): Promise<{
  profileImage: string;
  name: string;
  user: User | null;
}> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Extrair o nome do usuário ou fornecer um valor padrão
        const profileImage = user.photoURL ? user.photoURL : "default-profile.jpg";
        const name = user.displayName ? user.displayName : "Usuário Anônimo"; // Extrai o nome do usuário
        resolve({ profileImage, name, user });
      } else {
        resolve({ profileImage: "default-profile.jpg", name: "", user: null });
      }
    });
  });
};