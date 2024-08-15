"use server";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User, UserCredential } from "firebase/auth";
import { auth } from "../server/firebase";
import { FormData } from "@/types";


/**
 * Realiza a autenticação do usuário.
 * 
 * Verifica se o email já está em uso. Se estiver, tenta realizar o login. 
 * Caso contrário, cria um novo usuário com o email e a senha fornecidos.
 * 
 * @param {FormData} data - Os dados do formulário contendo email e senha.
 * @returns {Promise<UserCredential | null>} As credenciais do usuário autenticado ou null em caso de erro.
 * @throws {Error} Lança um erro se a autenticação falhar.
 */
export const signIn = async ({ email, password }: FormData): Promise<UserCredential | null> => {
  try {
    // Tenta realizar o login, assumindo que o usuário já existe
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      // Se o usuário não existir, cria uma nova conta
      const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
      return newUserCredential;
    } else if (error.code === 'auth/email-already-in-use') {
      // Se o email já estiver em uso, retorna um erro apropriado
      throw new Error("O email já está em uso.");
    } else {
      console.error('Erro durante a autenticação:', error.code, error.message);
      throw error;
    }
  }const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getAuth(auth).currentUser;

    if (currentUser) {
      setUser(currentUser);
      // Enviar informações do usuário para o servidor
      fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: currentUser.uid }),
      });
    }
  }, []);
};

/**
 * Obtém os dados do usuário autenticado atualmente.
 * 
 * Esta função verifica se há um usuário autenticado no Firebase 
 * e retorna os dados desse usuário. Se nenhum usuário estiver autenticado, retorna null.
 * 
 * @returns {User | null} Os dados do usuário autenticado atualmente, ou null se nenhum usuário estiver autenticado.
 */
export const getUserData = (): User | null => {
  // const user = auth.currentUser;
  // if (user) {
  //   return user;
  // } else {
  //   console.log('Nenhum usuário está autenticado no momento.');
  //   return null;
  // }
  return null
};
