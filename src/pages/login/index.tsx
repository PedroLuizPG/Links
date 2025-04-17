import { Link, useNavigate } from "react-router";
import { Input } from "../../components/input";
import { FormEvent, useState } from "react";

import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email === "" || senha === "") {
      alert("Preencha todos os campos");
      return;
    }
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
        navigate('/admin', {replace:true})
        setEmail("");
        setSenha("");
      })
      .catch((error) => {
        console.log("Error ao fazer login");
        console.error(error);
      });
  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to={"/"}>
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>

      <form
        className="w-full max-w-xl flex flex-col px-1"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Digite seu email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="************"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          className="h-9 bg-blue-600 rounded border-0 text-lg text-white font-medium"
          type="submit"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
