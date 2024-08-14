// /pages/api/user.ts

import { getAuth } from "firebase-admin/auth";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

// Inicializar Firebase Admin SDK
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Pegar o token do cookie
      const cookies = parse(req.headers.cookie || '');
      const token = cookies.token;

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Verificar o token e pegar os dados do usuário
      const decodedToken = await getAuth().verifyIdToken(token);
      const user = await getAuth().getUser(decodedToken.uid);

      res.status(200).json({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
