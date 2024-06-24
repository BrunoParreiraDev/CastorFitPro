import React from "react";
import Link from "next/link";

const MobileNav = () => {
  return (
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 text-white flex justify-around d-md-flex">
        <Link href="/" className="text-gray-300 hover:text-white">
          Início
        </Link>
        <Link href="/sobre" className="text-gray-300 hover:text-white">
          Sobre
        </Link>
        <Link href="/suporte" className="text-gray-300 hover:text-white">
          Suporte
        </Link>
      </nav>
  );
};

export default MobileNav;
