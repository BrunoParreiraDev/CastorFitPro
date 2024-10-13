import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../server/firebase";
import { AlunoData } from "@/types/student";

export const registerAluno = async (alunoData: AlunoData) => {
    try {
      const alunoRef = doc(db, "alunos");
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
  
  export const listAlunos = async () => {
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
  
  export const updateAluno = async (alunoData: AlunoData) => {
    try {
      const alunoRef = doc(db, "alunos", alunoData.id);
      await setDoc(alunoRef, {
        nome: alunoData.nome,
        email: alunoData.email,
        telefone: alunoData.telefone,
        endereco: alunoData.endereco || "",
        altura: alunoData.altura || null,
        peso: alunoData.peso || null,
        // Adicione outros campos físicos conforme necessário
        dataAtualizacao: new Date(),
      }, { merge: true });
  
      return { success: true, error: null };
    } catch (error: any) {
      console.error("Erro ao atualizar aluno:", error.message);
      return { success: false, error: error.message };
    }
  };
  
  export const getAlunoById = async (id: string) => {
    try {
      const alunoRef = doc(db, "alunos", id);
      const alunoSnap = await getDoc(alunoRef);
      
      if (alunoSnap.exists()) {
        return { aluno: { id: alunoSnap.id, ...alunoSnap.data() }, error: null };
      } else {
        return { aluno: null, error: "Aluno não encontrado" };
      }
    } catch (error: any) {
      console.error("Erro ao buscar aluno:", error.message);
      return { aluno: null, error: error.message };
    }
  };
  
  export const excluirAluno = async (id: string) => {
    try {
      const alunoRef = doc(db, "alunos", id);
      await deleteDoc(alunoRef);
      return { success: true, error: null };
    } catch (error: any) {
      console.error("Erro ao excluir aluno:", error.message);
      return { success: false, error: error.message };
    }
  };