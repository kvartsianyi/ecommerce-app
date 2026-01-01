"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type LoginModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLogin: (email: string, password: string) => void
  onSwitchToRegister: () => void
}

export function LoginModal({ open, onOpenChange, onLogin, onSwitchToRegister }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(email, password)
    setEmail("")
    setPassword("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Вхід</DialogTitle>
          <DialogDescription>Увійдіть у свій обліковий запис, щоб оформити замовлення</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Електронна пошта</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Увійти
          </Button>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Немає облікового запису? </span>
            <Button type="button" variant="link" className="cursor-pointer p-0" onClick={onSwitchToRegister}>
              Зареєструватися
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
