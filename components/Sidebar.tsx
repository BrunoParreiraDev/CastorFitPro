import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-800 text-white w-52 flex flex-col items-center sidebar">
      <div className="pt-4">
        <Link href="/" className="text-white text-lg font-semibold flex items-center">
          <Image src="/logo.png" alt="Logo" className="mr-4" width={30} height={30}/>
          CastorFit Pro
        </Link>
      </div>
      <nav className="sidebar-items">
        <ul className="pl-6 pt-4">
          <li className="nav-item">
            <Link href="/" className="text-gray-300 hover:text-white w-screen h-full">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/resumo" className="text-gray-300 hover:text-white w-screen h-full">
              Resumo
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/treinos" className="text-gray-300 hover:text-white w-screen h-full">
              Meus Treinos
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/aulas" className="text-gray-300 hover:text-white w-screen h-full">
              Video aulas
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/progresso" className="text-gray-300 hover:text-white w-screen h-full">
              Meu Progresso
            </Link>
          </li>
          {/* Add other sidebar items here */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
