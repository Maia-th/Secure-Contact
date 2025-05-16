"use client";

import React, { useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  Eraser,
  AlertCircle,
} from "lucide-react";

const SearchNumberPage: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    number: string;
    status: string;
  } | null>(null);
  const [message, setMessage] = useState("");

  const validatePhone = () => {
    if (number.trim() === "") {
      setMessage("O Número Não Pode Estar Vazio.");
      return false;
    } else if (!/^\d+$/.test(number.trim())) {
      setMessage("O Número Não Pode Conter Letras ou Caracteres Especiais.");
      return false;
    } else {
      setMessage("");
      return true;
    }
  };

  const handleSearch = () => {
    if (!validatePhone()) return;

    // Simulate a search result
    if (number === "12345") {
      setResult({ number: "12345", status: "Blocked" });
    } else {
      setResult({ number, status: "Not Registered" });
    }
  };

  const clear = () => {
    setNumber("");
    setMessage("");
    setResult(null);
  };

  return (
    <>
    <div className="w-full max-w-[80%]">
      <h1 className="text-2xl font-bold mb-6">Buscar Número</h1>
    </div>
    
      <div
        className={`mb-3 w-[80%] flex items-center border-b-2 transition-colors duration-200 ${
          isFocused ? "border-red-400" : "border-gray-300"
        }`}
      >
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Digite um Número"
          className="p-2 text-lg text-center w-full border-none outline-none rounded-lg"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button onClick={handleSearch} className="ml-2 cursor-pointer">
          <Search className="text-gray-500" />
        </button>
      </div>

      {message !== "" && (
        <div className="flex items-center text-red-500">
          <AlertCircle className="mr-2" />
          <span>{message}</span>
        </div>
      )}
      {number && (
        <button
          onClick={() => clear()}
          className="w-full max-w-[80%] flex justify-end cursor-pointer"
        >
          <Eraser className="text-gray-500 mr-2 mb-2" />
          <span>Limpar</span>
        </button>
      )}
      {result && (
        <div className="flex items-center mt-0">
          {result.status === "Blocked" ? (
            <XCircle className="text-red-500" />
          ) : (
            <CheckCircle className="text-green-500" />
          )}
          <span className="ml-2 text-lg">
            {result.number} - {result.status}
          </span>
        </div>
      )}
    </>
  );
};

export default SearchNumberPage;
