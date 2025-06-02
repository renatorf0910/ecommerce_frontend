import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

export default function Register() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordValidations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[!@#$%^&*]/.test(password),
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl z-0"
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-lg"
      >
        <Card className="shadow-2xl border-none rounded-2xl bg-white/90 backdrop-blur-lg">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Criar Conta</h2>
            <form className="space-y-4">
              <Input required type="text" placeholder="Nome completo" />
              <Input required type="email" placeholder="Email" />
              <Input required type="tel" placeholder="Telefone" />

              <div className="relative">
                <Input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute right-3 top-2.5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className={clsx(passwordValidations.length ? "text-green-600" : "text-red-400")}>
                  • Mínimo 8 caracteres
                </span>
                <span className={clsx(passwordValidations.uppercase ? "text-green-600" : "text-red-400")}>
                  • Letra maiúscula
                </span>
                <span className={clsx(passwordValidations.number ? "text-green-600" : "text-red-400")}>
                  • Número
                </span>
                <span className={clsx(passwordValidations.symbol ? "text-green-600" : "text-red-400")}>
                  • Símbolo (!@#...)
                </span>
              </div>

              <div className="relative">
                <Input
                  required
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirmar senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  className="absolute right-3 top-2.5 cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </div>
              </div>

              <Button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700">
                Registrar
              </Button>
              <p className="text-sm text-center text-gray-500">
                Já tem conta? <a href="/login" className="underline text-indigo-600">Entrar</a>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
