import React from "react";
import {
  Search,
  CheckSquare,
  Settings,
  Users,
  User,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const SideBar: React.FC = () => {
  return (
    <>
      {/* Ajustar o Responsivo */}
      <div className="bg-red-600 text-white h-screen px-12 py-24 hidden md:flex flex-col items-center justify-between md:items-start">
        <div className="flex items-center justify-center w-full">
          <Image
            src="/images/rejected-white.png"
            alt="logo"
            width={30}
            height={30}
            className="mr-2"
          />
          <h1 className="text-2xl font-bold mr-2 whitespace-nowrap">Secure Contact</h1>
        </div>
        <ul className="flex flex-col items-center md:items-start">
          <li className="mb-4">
            <Link
              href="/buscar-numero"
              className="hover:text-gray-400 flex items-center"
            >
              <Search className="mr-2" /> Buscar Número
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/validar-numeros"
              className="hover:text-gray-400 flex items-center"
            >
              <CheckSquare className="mr-2" /> Validar Números
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/admin/gerenciar-numeros"
              className="hover:text-gray-400 flex items-center"
            >
              <Settings className="mr-2" /> Gerenciar Números
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/admin/gerenciar-usuarios"
              className="hover:text-gray-400 flex items-center"
            >
              <Users className="mr-2" /> Gerenciar Usuários
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/dados-pessoais"
              className="hover:text-gray-400 flex items-center"
            >
              <User className="mr-2" /> Dados Pessoais
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/" className="hover:text-gray-400 flex items-center">
              <LogOut className="mr-2" /> Sair
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
