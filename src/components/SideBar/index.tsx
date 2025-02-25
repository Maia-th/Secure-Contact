import React, { useState } from "react";
import {
  Search,
  CheckSquare,
  Settings,
  Users,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="bg-red-800 text-white h-screen px-8 py-24 hidden md:flex flex-col items-center justify-between md:items-start">
        <div className="flex items-center justify-center w-full">
          <Image
            src="/assets/images/rejected-white.png"
            alt="logo"
            width={30}
            height={30}
            className="mr-2"
          />
          <h1 className="text-2xl font-bold">Secure Contact</h1>
        </div>
        <ul className="flex flex-col items-center md:items-start">
          <li className="mb-4 flex items-center">
            <Search className="mr-2" />
            <Link href="/admin/buscar-numero" className="hover:text-gray-400">
              Buscar Número
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <CheckSquare className="mr-2" />
            <Link href="/admin/validar-numeros" className="hover:text-gray-400">
              Validar Números
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <Settings className="mr-2" />
            <Link
              href="/admin/gerenciar-numeros"
              className="hover:text-gray-400"
            >
              Gerenciar Números
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <Users className="mr-2" />
            <Link
              href="/admin/gerenciar-usuarios"
              className="hover:text-gray-400"
            >
              Gerenciar Usuários
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <User className="mr-2" />
            <Link href="/admin/dados-pessoais" className="hover:text-gray-400">
              Dados Pessoais
            </Link>
          </li>
        </ul>
        <ul>
          <li className="flex items-center">
            <LogOut className="mr-2" />
            <Link href="/logout" className="hover:text-gray-400">
              Sair
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-0 z-50 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div
          className={`fixed inset-0 bg-red-800 text-white transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex items-center justify-center w-full mb-8">
              <Image
                src="/assets/images/rejected-white.png"
                alt="logo"
                width={30}
                height={30}
                className="mr-2"
              />
              <h1 className="text-2xl font-bold">Secure Contact</h1>
            </div>
            <ul className="flex flex-col items-center space-y-4">
              <li className="flex items-center">
                <Search className="mr-2" />
                <Link href="/admin/buscar-numero">Buscar Número</Link>
              </li>
              <li className="flex items-center">
                <CheckSquare className="mr-2" />
                <Link href="/admin/validar-numeros">Validar Números</Link>
              </li>
              <li className="flex items-center">
                <Settings className="mr-2" />
                <Link href="/admin/gerenciar-numeros">Gerenciar Números</Link>
              </li>
              <li className="flex items-center">
                <Users className="mr-2" />
                <Link href="/admin/gerenciar-usuarios">Gerenciar Usuários</Link>
              </li>
              <li className="flex items-center">
                <User className="mr-2" />
                <Link href="/admin/dados-pessoais">Dados Pessoais</Link>
              </li>
              <li className="flex items-center">
                <LogOut className="mr-2" />
                <Link href="/logout">Sair</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="md:hidden fixed top-4 left-4 z-50 text-white"
      >
        {isOpen ? (
          <X className="text-white" />
        ) : (
          <Menu className="text-black" />
        )}
      </button>
    </>
  );
};

export default SideBar;
