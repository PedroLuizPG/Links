import { useState, useEffect } from "react";
import { Social } from "../../components/social";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  orderBy,
  query,
  getDoc,
  doc,
} from "firebase/firestore";

interface LinksProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}
interface SocialProps {
  linkedin: string;
  github: string;
  youtube: string;
}
export function Home() {
  const [links, setLinks] = useState<LinksProps[]>([]);
  const [socialLink, setSocialLink] = useState<SocialProps>();

  useEffect(() => {
    async function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      await getDocs(queryRef)
        .then((snapshot) => {
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
          setLinks(lista);
        })
        .catch((err) => console.log("Deu error" + err));
    }
    loadLinks();
  }, []);

  useEffect(() => {
    async function loadSocialLink() {
      const docRef = doc(db, "social", "link");
      await getDoc(docRef).then((snapshot) => {
        if (snapshot.exists()) {
          setSocialLink({
            linkedin: snapshot.data()?.linkedin,
            github: snapshot.data()?.github,
            youtube: snapshot.data()?.youtube,
          });
        }
      });
    }
    loadSocialLink();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
        Pedro Luiz
      </h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links &&
          links.map((item) => (
            <section
              key={item.id}
              className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
              style={{ backgroundColor: item.bg }}
            >
              <a href={item.url} target="blank">
                <p
                  className="text-base md:text-lg"
                  style={{ color: item.color }}
                >
                  {item.name}
                </p>
              </a>
            </section>
          ))}
      </main>
        
      {socialLink && Object.keys(socialLink).length > 0 && (
        <footer className="flex justify-center gap-3 my-4 hover:">
          
        <Social  url={socialLink?.youtube}>
          <FaYoutube size={35} color="#fff" />
        </Social>
        <Social url={socialLink?.linkedin}>
          <FaLinkedin size={35} color="#fff" />
        </Social>
        <Social url={socialLink?.github}>
          <FaGithub size={35} color="#fff" />
        </Social>
      
  </footer>
      )}
    </div>
  );
}
