import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db } from "../server/firebase";
import { AlunoData } from "@/types/student";



export const registerAluno = async (
  alunoData: Omit<AlunoData, "id">
): Promise<{ success: boolean; error: string | null; id?: string }> => {
  try {
    const alunoRef = doc(collection(db, "alunos"));
    const dataToSave = {
      ...alunoData,
      dataNascimento: Timestamp.fromDate(alunoData.dataNascimento),
      dataAtualizacao: Timestamp.fromDate(new Date()),
    };
    await setDoc(alunoRef, dataToSave);

    return { success: true, error: null, id: alunoRef.id };
  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

export const listAlunos = async (): Promise<{
  alunos: AlunoData[];
  error: string | null;
}> => {
  try {
    const alunosRef = collection(db, "alunos");
    const alunosQuery = query(alunosRef, orderBy("nome"));
    const alunosSnapshot = await getDocs(alunosQuery);
    const alunosList = alunosSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          dataNascimento: doc.data().dataNascimento.toDate(),
          dataAtualizacao: doc.data().dataAtualizacao?.toDate(),
        } as AlunoData)
    );
    return { alunos: alunosList, error: null };
  } catch (error) {
    console.error("Erro ao listar alunos:", error);
    return {
      alunos: [],
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

export const updateAluno = async (
  alunoData: AlunoData
): Promise<{ success: boolean; error: string | null }> => {
  try {
    if (!alunoData.id) throw new Error("ID do aluno não fornecido");
    const alunoRef = doc(db, "alunos", alunoData.id);
    const dataToUpdate = {
      ...alunoData,
      dataNascimento: Timestamp.fromDate(alunoData.dataNascimento),
      dataAtualizacao: Timestamp.fromDate(new Date()),
    };
    await updateDoc(alunoRef, dataToUpdate);

    return { success: true, error: null };
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

export const getAlunoById = async (
  id: string
): Promise<{ aluno: AlunoData | null; error: string | null }> => {
  try {
    const alunoRef = doc(db, "alunos", id);
    const alunoSnap = await getDoc(alunoRef);

    if (alunoSnap.exists()) {
      const alunoData = alunoSnap.data();
      return {
        aluno: {
          id: alunoSnap.id,
          ...alunoData,
          dataNascimento: alunoData.dataNascimento.toDate(),
          dataAtualizacao: alunoData.dataAtualizacao?.toDate(),
        } as AlunoData,
        error: null,
      };
    } else {
      return { aluno: null, error: "Aluno não encontrado" };
    }
  } catch (error) {
    console.error("Erro ao buscar aluno:", error);
    return {
      aluno: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

export const excluirAluno = async (
  id: string
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const alunoRef = doc(db, "alunos", id);
    await deleteDoc(alunoRef);
    return { success: true, error: null };
  } catch (error) {
    console.error("Erro ao excluir aluno:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

export const searchAlunos = async (
  searchTerm: string
): Promise<{ alunos: AlunoData[]; error: string | null }> => {
  try {
    const alunosRef = collection(db, "alunos");
    const searchQuery = query(
      alunosRef,
      where("nome", ">=", searchTerm),
      where("nome", "<=", searchTerm + "\uf8ff"),
      limit(10)
    );
    const alunosSnapshot = await getDocs(searchQuery);
    const alunosList = alunosSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          dataNascimento: doc.data().dataNascimento.toDate(),
          dataAtualizacao: doc.data().dataAtualizacao?.toDate(),
        } as AlunoData)
    );
    return { alunos: alunosList, error: null };
  } catch (error) {
    console.error("Erro ao pesquisar alunos:", error);
    return {
      alunos: [],
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};
