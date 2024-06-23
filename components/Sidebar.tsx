import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-800 text-white w-52">
      <div className="p-4">
        <Link href="/" className="text-white text-lg font-semibold mx-auto">
          CastorFit Pro
        </Link>
      </div>
      <nav className="mt-0">
        <ul className="pl-6 pt-4">
          <li className="nav-item">
            <Link href="/" className="text-gray-300 hover:text-white w-screen h-full">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/about" className="text-gray-300 hover:text-white w-screen h-full">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/contact" className="text-gray-300 hover:text-white w-screen h-full">
              Contact
            </Link>
          </li>
          {/* Add other sidebar items here */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
