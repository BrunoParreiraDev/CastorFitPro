"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
  UserCredential,
  updateProfile,
  updatePassword,
} from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage, db } from "@/lib/server/firebase";

import { v4 as uuidv4 } from "uuid";
import { RegisterData, AuthData } from "@/types";

const DEFAULT_PROFILE_IMAGE = "/users/default-profile.jpg";

export const signUp = async ({
  name,
  email,
  password,
  profileImage,
}: RegisterData) => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    let photoURL = DEFAULT_PROFILE_IMAGE;

    if (profileImage instanceof File) {
      photoURL = await uploadProfileImage(user.uid, profileImage);
    }

    await updateProfile(user, { displayName: name, photoURL });

    return { user, error: null };
  } catch (error: any) {
    console.error("Erro durante o cadastro:", error.code, error.message);
    return { user: null, error: error.message };
  }
};

export const signIn = async ({ email, password }: AuthData) => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    console.error("Erro durante a autenticação:", error.code, error.message);
    return { user: null, error: error.message };
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true, error: null };
  } catch (error: any) {
    console.error("Erro durante o logout:", error.code, error.message);
    return { success: false, error: error.message };
  }
};

export const getUserData = (): Promise<{
  profileImage: string;
  name: string;
  user: User | null;
}> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const profileImage = user.photoURL || DEFAULT_PROFILE_IMAGE;
        const name = user.displayName || "Usuário Anônimo";
        resolve({ profileImage, name, user });
      } else {
        resolve({ profileImage: DEFAULT_PROFILE_IMAGE, name: "", user: null });
      }
    });
  });
};

export const updateUserData = async ({
  name,
  password,
  profileImage,
}: {
  name: string;
  password?: string;
  profileImage?: File;
}) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Nenhum usuário autenticado.");

    if (name) await updateProfile(user, { displayName: name });
    if (password) await updatePassword(user, password);

    let photoURL = user.photoURL;
    if (profileImage) {
      photoURL = await uploadProfileImage(user.uid, profileImage);
      await updateProfile(user, { photoURL });
    }

    return { user, error: null };
  } catch (error: any) {
    console.error("Erro ao atualizar os dados do usuário:", error.message);
    return { user: null, error: error.message };
  }
};

export const registerStudent = async (alunoData: {
  nome: string;
  email: string;
  telefone: string;
  endereco?: string;
}) => {
  try {
    const alunoRef = doc(db, "alunos", uuidv4());
    await setDoc(alunoRef, {
      nome: alunoData.nome,
      email: alunoData.email,
      telefone: alunoData.telefone,
      endereco: alunoData.endereco || "",
      dataCadastro: new Date(),
    });

    return { success: true, error: null };
  } catch (error: any) {
    console.error("Erro ao cadastrar aluno:", error.message);
    return { success: false, error: error.message };
  }
};

export const listStudents = async () => {
  try {
    const alunosRef = collection(db, "alunos");
    const alunosSnapshot = await getDocs(alunosRef);
    const alunosList = alunosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { alunos: alunosList, error: null };
  } catch (error: any) {
    console.error("Erro ao listar alunos:", error.message);
    return { alunos: [], error: error.message };
  }
};

async function uploadProfileImage(
  userId: string,
  profileImage: File
): Promise<string> {
  const storageRef = ref(storage, `/users/${userId}/${uuidv4()}`);
  await uploadBytes(storageRef, profileImage);
  return getDownloadURL(storageRef);
}