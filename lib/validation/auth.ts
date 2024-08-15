/* eslint-disable react-hooks/rules-of-hooks */
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Por favor, digite um email válido.")
    .required("Por favor, preencha este campo"),
  password: Yup.string()
    .min(6, "Por favor, digite no mínimo 6 caracteres no campo de senha.")
    .required("Por favor, preencha este campo"),
});

export const loginValidation = () =>
  useForm({
    resolver: yupResolver(loginSchema),
  });
