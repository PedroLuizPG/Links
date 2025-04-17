import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FormEvent, useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { db } from "../../services/firebaseConnection";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

interface LinksProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [colorInput, setColorInput] = useState("#f1f1f1");
  const [bgInput, setBgInput] = useState("#121212");
  const [link, setLink] = useState<LinksProps[]>();

  useEffect(() => {
    const linkRef = collection(db, "links");
    const queryRef = query(linkRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinksProps[];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });
      console.log(lista);
      setLink(lista);
    });
    return () => {
      unsub();
    };
  }, []);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (nameInput === "" || urlInput === "") {
      toast.error("Preencha os campos!")
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "links"), {
        name: nameInput,
        url: urlInput,
        bg: bgInput,
        color: colorInput,
        created: new Date(),
      });

      const resolveAfter3Sec = new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );
      toast.promise(resolveAfter3Sec, {
        pending: "Cadastrando Link...",
        success: "Link cadastrado com sucesso",
      });

      setNameInput("");
      setUrlInput("");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function handleDelete(id: string) {
    await deleteDoc(doc(db, "links", id)).then(() => {
      toast.info("Link deletado!");
    });
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form
        className="flex flex-col mt-10 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label className="text-white font-medium my-2 ">Nome do link</label>
        <Input
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className="text-white font-medium my-2 ">URL do link</label>
        <Input
          type="url"
          placeholder="Digite a URL..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2 items-center">
            <label className="text-white font-medium my-2 ">Cor do Link</label>
            <input
              type="color"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="text-white font-medium my-2 ">
              Fundo do Link
            </label>
            <input
              type="color"
              value={bgInput}
              onChange={(e) => setBgInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput && (
          <div className="flex items-center  justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md ">
            <label className="text-white font-medium mt-2 mb-3 ">
              Veja como está ficando
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3 mb-1"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: bgInput,
              }}
            >
              <p className="font-medium" style={{ color: colorInput }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}

        <button
          className="text-white bg-blue-600 hover:bg-blue-950 h-9 rounded-md items-center justify-center flex mb-7 font-medium cursor-pointer"
          type="submit"
        >
          Cadastrar
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>

      {link &&
        link.map((i) => (
          <article
            key={i.id}
            className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none "
            style={{ backgroundColor: i.bg, color: i.color }}
          >
            <p>{i.name}</p>
            <div>
              <button
                onClick={() => handleDelete(i.id)}
                className="cursor-pointer border p-0.5 bg-black"
              >
                <BiTrash size={18} color="#fff" />
              </button>
            </div>
          </article>
        ))}
      <ToastContainer theme="dark"/>
    </div>
  );
}
