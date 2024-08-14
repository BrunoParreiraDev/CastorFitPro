// /pages/api/submit.ts

import { signIn } from "@/lib/actions/user.actions";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Extrair dados do corpo da requisição
    const { email, password } = req.body;

    // Validar os dados (a validação pode ser mais complexa dependendo do caso)
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email e Senha são obrigatorios." });
    }

    // Processar os dados, como salvar no banco de dados ou enviar um email
    // Aqui, apenas respondemos com os dados recebidos
    try {
      const user = await signIn({ email, password });
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
        message: "Login bem-sucedido.",
        data: { email: user.email, name: user.displayName },
      });
    } catch (error) {
      res.status(400).json({ message: "Email ou senha incorretos.", error: error.message });
    }
    
  } else {
    // Método não permitido
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
