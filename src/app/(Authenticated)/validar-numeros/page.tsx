"use client";

import React from "react";
import { useState } from "react";
import { UploadCloud, FileDown, CheckSquare, Square } from "lucide-react";

const ValidateNumberPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [validation, setValidation] = useState<"blocked" | "valid" | null>(
    null
  );
  const [downloads, setDownloads] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleValidationChange = (type: "blocked" | "valid") => {
    setValidation(type);
  };

  const handleGenerate = () => {
    // Simulação de geração de arquivos para download
    if (file && validation) {
      setDownloads([
        `${file.name.replace(/\.[^/.]+$/, "")}_${validation}.csv`,
        `${file.name.replace(/\.[^/.]+$/, "")}_${validation}.xlsx`,
      ]);
    }
  };

  return (
    <>
      <div className="w-full max-w-[80%]">
        <h1 className="text-2xl font-bold mb-6">Validar Números</h1>
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-red-400 transition mb-6">
          <UploadCloud className="w-8 h-8 text-red-500 mb-2" />
          <span className="text-gray-700 font-medium mb-2">
            Selecione um arquivo CSV ou XLSX
          </span>
          <input
            type="file"
            accept=".csv, .xlsx"
            className="hidden"
            onChange={handleFileChange}
          />
          {file && (
            <span className="mt-2 text-sm text-green-600">{file.name}</span>
          )}
        </label>

        <div className="flex justify-between mb-6">
          <div className="flex gap-4">
            <button
              type="button"
              className={`flex items-center gap-2 px-3 py-1 rounded border cursor-pointer ${
                validation === "blocked"
                  ? "bg-red-100 border-red-400"
                  : "bg-white border-gray-300"
              }`}
              onClick={() => handleValidationChange("blocked")}
            >
              {validation === "blocked" ? (
                <CheckSquare className="w-5 h-5 text-red-500" />
              ) : (
                <Square className="w-5 h-5 text-gray-400" />
              )}
              Apenas bloqueados
            </button>
            <button
              type="button"
              className={`flex items-center gap-2 px-3 py-1 rounded border cursor-pointer ${
                validation === "valid"
                  ? "bg-red-100 border-red-400"
                  : "bg-white border-gray-300"
              }`}
              onClick={() => handleValidationChange("valid")}
            >
              {validation === "valid" ? (
                <CheckSquare className="w-5 h-5 text-red-500" />
              ) : (
                <Square className="w-5 h-5 text-gray-400" />
              )}
              Apenas válidos
            </button>
          </div>
          <button
            className="flex items-center justify-center gap-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition w-24 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGenerate}
            disabled={!file || !validation}
          >
            <FileDown className="w-5 h-5" />
            Gerar
          </button>
        </div>

        {downloads.length > 0 && (
          <div className="mt-4">
            <span className="block text-gray-700 font-medium mb-2">
              Arquivos para download:
            </span>
            <ul className="space-y-2 flex flex-col items-end w-full">
              {downloads.map((filename) => (
                <li key={filename}>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-red-600 hover:underline"
                    download={filename}
                  >
                    <FileDown className="w-4 h-4" />
                    {filename}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default ValidateNumberPage;
