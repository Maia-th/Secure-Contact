"use client";

import React, { useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  Eraser,
  AlertCircle,
} from "lucide-react";

const BuscarNumeroPage: React.FC = () => {
  const [numero, setNumero] = useState("");
  const [resultado, setResultado] = useState<{
    numero: string;
    situacao: string;
  } | null>(null);
  const [mensagem, setMensagem] = useState("");

  const validarPhone = () => {
    const regex = /^[0-9]+$/;

    if (numero.trim() === "") {
      setMensagem("O Número Não Pode Estar Vazio.");
      return false;
    } else if (!regex.test(numero)) {
      setMensagem("O Número Não Pode Conter Letras ou Caracteres Especiais.");
      return false;
    } else {
      setMensagem("");
      return true;
    }
  };

  const handleSearch = () => {
    if (!validarPhone()) return;

    // Simulate a search result
    if (numero === "12345") {
      setResultado({ numero: "12345", situacao: "Bloqueado" });
    } else {
      setResultado({ numero, situacao: "Não Cadastrado" });
    }
  };

  const limpar = () => {
    setNumero("");
    setMensagem("")
    setResultado(null);
  };

  return (
    <>
      <div className="mb-3 flex items-center border-b-2 border-gray-300">
        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          placeholder="Buscar Número"
          className="p-2 text-lg text-center lg:w-180 border-none outline-none"
        />
        <button onClick={handleSearch} className="ml-2 cursor-pointer">
          <Search className="text-gray-500" />
        </button>
      </div>
      
      {mensagem !== "" && (
        <div className="flex items-center text-red-500">
          <AlertCircle className="mr-2" />
          <span>{mensagem}</span>
        </div>
      )}
      {numero && (
        <button
          onClick={() => limpar()}
          className="w-full flex justify-end cursor-pointer"
        >
          <Eraser className="text-gray-500 mr-2 mb-2" />
          <span>Limpar</span>
        </button>
      )}
      {resultado && (
        <div className="flex items-center mt-0">
          {resultado.situacao === "Bloqueado" ? (
            <XCircle className="text-red-500" />
          ) : (
            <CheckCircle className="text-green-500" />
          )}
          <span className="ml-2 text-lg">
            {resultado.numero} - {resultado.situacao}
          </span>
        </div>
      )}
    </>
  );
};

export default BuscarNumeroPage;
