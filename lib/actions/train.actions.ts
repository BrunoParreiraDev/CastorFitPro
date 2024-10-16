import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../server/firebase";
import { TreinoData } from "@/types/training";

export const registerTreino = async (treinoData: TreinoData) => {
    try {
      const treinoRef = doc(db, "treinos");
      await setDoc(treinoRef, {
        ...treinoData,
      });
  
      return { success: true, error: null };
    } catch (error: any) {
      console.error("Erro ao cadastrar treino:", error.message);
      return { success: false, error: error.message };
    }
  };
  
  export const listTreino = async () => {
    try {
      const treinosRef = collection(db, "treinos");
      const treinosSnapshot = await getDocs(treinosRef);
      const treinosList = treinosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return { treinos: treinosList, error: null };
    } catch (error: any) {
      console.error("Erro ao listar treinos:", error.message);
      return { treinos: [], error: error.message };
    }
  };
  
  export const updateTreino = async (treinoData: TreinoData) => {
    try {
      const treinoRef = doc(db, "treinos", treinoData.id);
      await setDoc(treinoRef, {
        ...treinoData,
        dataAtualizacao: new Date(),
      }, { merge: true });
  
      return { success: true, error: null };
    } catch (error: any) {
      console.error("Erro ao atualizar treino:", error.message);
      return { success: false, error: error.message };
    }
  };
  
  export const getTreinoById = async (id: string) => {
    try {
      const treinoRef = doc(db, "treinos", id);
      const treinoSnap = await getDoc(treinoRef);
      
      if (treinoSnap.exists()) {
        return { treino: { id: treinoSnap.id, ...treinoSnap.data() }, error: null };
      } else {
        return { treino: null, error: "treino não encontrado" };
      }
    } catch (error: any) {
      console.error("Erro ao buscar treino:", error.message);
      return { treino: null, error: error.message };
    }
  };
  
  export const excluirTreino = async (id: string) => {
    try {
      const treinoRef = doc(db, "treinos", id);
      await deleteDoc(treinoRef);
      return { success: true, error: null };
    } catch (error: any) {
      console.error("Erro ao excluir treino:", error.message);
      return { success: false, error: error.message };
    }
  };