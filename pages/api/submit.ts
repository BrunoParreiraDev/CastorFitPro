import { signIn } from "@/lib/actions/user.actions";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { UserCredential } from "firebase/auth";

/**
 * API handler para realizar a autenticação de um usuário.
 * 
 * Este manipulador de API lida com solicitações POST para autenticar um usuário 
 * utilizando o Firebase Authentication. Se a autenticação for bem-sucedida, 
 * um cookie contendo o token do usuário será definido. Caso contrário, uma 
 * mensagem de erro será retornada.
 * 
 * @param {NextApiRequest} req - A solicitação HTTP recebida, contendo o email e a senha do usuário.
 * @param {NextApiResponse} res - A resposta HTTP a ser enviada de volta ao cliente.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email e Senha são obrigatórios." });
    }

    try {
      const userCredential: UserCredential = await signIn({ email, password });
      const user = userCredential.user;
      const token = await user.getIdToken();

      res.setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7, // 1 semana
          path: "/",
        })
      );

      res.status(200).json({
        message: "Autenticação bem-sucedida.",
        data: { email: user.email, name: user.displayName || "" },
      });
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        return res.status(400).json({ message: "O email já está em uso.", error: error.message });
      }
      res.status(400).json({ message: "Erro ao autenticar.", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
