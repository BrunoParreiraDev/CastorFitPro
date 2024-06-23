import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-700 p-4">
      <div className="container mx-auto flex justify-end">
        <div className="flex space-x-4 items-center">
          <Link href="/" className="text-gray-300 hover:text-white">
            Início
          </Link>
          <Link href="/sobre" className="text-gray-300 hover:text-white">
            Sobre
          </Link>
          <Link href="/suport" className="text-gray-300 hover:text-white">
            Suporte
          </Link>
          {/* Add other navbar items here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
