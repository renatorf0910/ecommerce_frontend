import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { login } from "@/services/api"; // importa a função login que criamos

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // previne reload da página

    try {
      await login({ username, password }); // se seu backend usa username, pode ajustar pra { username, password }

      console.log("Logado com sucesso");
      window.location.href = "/"; 
    } catch (err: any) {
      console.error("Erro no login:", err);
      setErrorMsg("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x">
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
        className="relative z-10 w-full max-w-md"
      >
        <Card className="shadow-2xl border-none rounded-2xl bg-white/90 backdrop-blur-lg">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Entrar na Conta</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Usuário
                </label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Seu usuário"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <Input
                  type="password"
                  id="password"
                  placeholder="********"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {errorMsg && (
                <p className="text-red-600 text-sm text-center">{errorMsg}</p>
              )}

              <Button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700">
                Entrar
              </Button>

              <p className="text-sm text-center text-gray-500">
                Ainda não tem uma conta?{" "}
                <a href="/register" className="underline text-indigo-600">
                  Cadastrar
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
