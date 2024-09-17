'use client'

import React, { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getUserData, updateUserData } from "@/lib/actions/user.actions"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { UserInfo } from "firebase/auth"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

const updateSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  profileImage: z.any().optional(),
})

export default function PerfilPage() {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(updateSchema),
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData()
        setUser(data.user)
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do usuário.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchUserData()
  }, [toast])

  const onSubmit = async (data: any) => {
    try {
      const profileImageFile = data.profileImage?.[0]
      const updatedUser = await updateUserData({
        name: data.name,
        profileImage: profileImageFile,
      })
      setUser(updatedUser.user)
      toast({
        title: "Sucesso",
        description: "Dados atualizados com sucesso!",
      })
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error)
      toast({
        title: "Erro",
        description: "Erro ao atualizar os dados.",
        variant: "destructive",
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  if (isLoading) {
    return (
      <div className="centered flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <p className="centered text-center my-5">Não foi possível carregar os dados do usuário.</p>
  }

  return (
    <div className="centered flex justify-center items-center w-full my-5">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={previewImage || user.photoURL || "/users/default_profile.jpg"} alt="Foto de perfil" />
              <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <Label htmlFor="profileImage" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
              <Input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("profileImage")}
                onChange={(e) => {
                  handleImageChange(e)
                  register("profileImage").onChange(e)
                }}
              />
            </Label>
          </div>
          <div className="text-center">
            <CardTitle>Editar Perfil</CardTitle>
            <CardDescription>Atualize suas informações abaixo.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                {...register("name")}
                defaultValue={user.displayName || ''}
                placeholder="Nome"
              />
              {errors.name?.message && (
                <p className="text-sm text-destructive">{String(errors.name.message)}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Atualizando...
                </>
              ) : (
                'Atualizar Dados'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}