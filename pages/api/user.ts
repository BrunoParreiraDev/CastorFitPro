"use server";

import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/lib/server/firebase";
import { parse } from "cookie";

/**
 * Manipulador de API para obter informações do usuário autenticado.
 * 
 * Esta função lida com solicitações GET para obter os dados do usuário autenticado, 
 * verificando o token presente nos cookies. Se o token for válido, os dados do usuário 
 * serão retornados. Caso contrário, uma resposta de não autorizado será enviada.
 * 
 * @param {NextApiRequest} req - A solicitação HTTP recebida, contendo os cookies com o token do usuário.
 * @param {NextApiResponse} res - A resposta HTTP a ser enviada de volta ao cliente.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Obter o token do cookie
      const cookies = parse(req.headers.cookie || '');
      const token = cookies.token;

      if (!token) {
        return res.status(401).json({ message: "Não autorizado" });
      }

      // Verificar o token e obter os dados do usuário
      const decodedToken = await auth.verifyIdToken(token);
      const user = await auth.getUser(decodedToken.uid);

      res.status(200).json({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    } catch (error) {
      console.error("Erro ao verificar o token ou obter os dados do usuário:", error);
      res.status(401).json({ message: "Não autorizado" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
