import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

export function Header() {
    
  async function handleLogout() {
    await signOut(auth)
      .then(() => {
        alert("Deslogado com sucesso!")
      })
  }
  return (
    <header className="w-full max-w-2xl mt-4 px-1">
      <nav className="w-full bg-white h-12 flex items-center justify-between px-3 rounded-md">
        <div className="flex gap-4 font-medium">
          <Link to={"/"}>Home</Link>
          <Link to={"/admin"}>Links</Link>
          <Link to={"/admin/social"}>Redes Sociais</Link>
        </div>
        <button 
        className="cursor-pointer"
        onClick={handleLogout}>
          <BiLogOut size={28} color="#db2629" />
        </button>
      </nav>
    </header>
  );
}
