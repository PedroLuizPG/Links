import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export function Networks() {
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    async function loadLinks() {
      const docRef = doc(db, "social", "link");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setLinkedin(docSnap.data()?.linkedin);
        setGithub(docSnap.data()?.github);
        setYoutube(docSnap.data()?.youtube);
      } else {
        console.log("Nenhum documento encontrado");
      }
    }
    loadLinks();
  }, []);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    await setDoc(doc(db, "social", "link"), {
      linkedin: linkedin,
      github: github,
      youtube: youtube,
    })
      .then(() => {
        console.log("Cadastrado com sucesso");
        const resolveAfter = new Promise((resolve) =>
          setTimeout(resolve, 900)
        );
        toast.promise(resolveAfter, {
          pending: "Cadastrando Links...",
          success: "Links cadastrados com sucesso",
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        Minhas Redes Sociais
      </h1>

      <form className="flex flex-col max-w-xl w-full">
        <label className="text-white font-medium my-2">Link do Linkedin</label>
        <Input
          type="url"
          placeholder="Digite o url do linkedin"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />

        <label className="text-white font-medium my-2">Link do GitHub</label>
        <Input
          type="url"
          placeholder="Digite o url do GitHub"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />

        <label className="text-white font-medium my-2">Link do Youtube</label>
        <Input
          type="url"
          placeholder="Digite o url do Youtube"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />

        <button
          type="submit"
          className="text-white bg-blue-600 hover:bg-blue-950 h-9 rounded-md items-center justify-center flex mb-7 font-medium cursor-pointer"
          onClick={handleRegister}
        >
          Salvar Links
        </button>
      </form>
      <ToastContainer theme="dark"/>
    </div>
  );
}
