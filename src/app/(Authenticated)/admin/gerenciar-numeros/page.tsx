"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  Eraser,
  AlertCircle,
  Plus,
  ListPlus,
  UploadCloud,
  Pencil,
  Trash,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// Mocked numbers
const MOCK_NUMBERS = [
  { number: "12345", blockedAt: "2024-05-15" },
  { number: "67890", blockedAt: "2024-05-13" },
  { number: "11111", blockedAt: "2024-05-10" },
];

type NumberEntry = {
  number: string;
  blockedAt: string;
};

const ManageNumbersPage: React.FC = () => {
  // --- Busca ---
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);

  // --- Dados e filtro ---
  const [numbers, setNumbers] = useState<NumberEntry[]>(MOCK_NUMBERS);

  // --- Modal Adicionar Número ---
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addNumber, setAddNumber] = useState("");
  const [addNumberError, setAddNumberError] = useState<string | null>(null);
  const [addStatus, setAddStatus] = useState<"success" | "error" | null>(null);
  const [addMessage, setAddMessage] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  // --- Modal Adicionar Lista ---
  const [listDialogOpen, setListDialogOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [listStatus, setListStatus] = useState<"success" | "error" | null>(null);
  const [listMessage, setListMessage] = useState("");
  const [listLoading, setListLoading] = useState(false);

  // --- Edição de número (extra, pode ser expandido depois) ---
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [editStatus, setEditStatus] = useState<"success" | "error" | null>(null);
  const [editMessage, setEditMessage] = useState("");

  // --- Validação ---
  const validateNumber = (n: string) => {
    if (n.trim() === "") {
      return "O Número Não Pode Estar Vazio.";
    }
    if (!/^\d+$/.test(n.trim())) {
      return "O Número Não Pode Conter Letras ou Caracteres Especiais.";
    }
    return "";
  };

  // --- Busca (validação em tempo real) ---
  const handleSearchChange = (value: string) => {
    setSearch(value);
    const error = validateNumber(value);
    if (error && value) {
      setSearchError(error);
    } else {
      setSearchError(null);

    }
  };

  const handleSearch = () => {
    const error = validateNumber(search);
    if (error && search) {
      setSearchError(error);
      return;
    }
    setSearchError(null);
  };

  const clearSearch = () => {
    setSearch("");
    setSearchError(null);
  };

  const handleAddNumber = () => {
    const error = validateNumber(addNumber);
    if (error) {
      setAddStatus("error");
      setAddMessage(error);
      return;
    }
    // Simular adição (verifica duplicado no mock)
    if (numbers.some(n => n.number === addNumber)) {
      setAddStatus("error");
      setAddMessage("Esse número já está cadastrado.");
      return;
    }
    setAddLoading(true);
    setTimeout(() => {
      setNumbers([
        { number: addNumber, blockedAt: new Date().toISOString().slice(0, 10) },
        ...numbers,
      ]);
      setAddStatus("success");
      setAddMessage("Número cadastrado com sucesso!");
      setAddLoading(false);
    }, 1000);
  };

  const resetAddDialog = () => {
    setAddNumber("");
    setAddNumberError(null);
    setAddStatus(null);
    setAddMessage("");
    setAddLoading(false);
  };

  // --- Adicionar Lista ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setListStatus(null);
      setListMessage("");
    }
  };

  const handleAddList = () => {
    if (!file) {
      setListStatus("error");
      setListMessage("Selecione um arquivo primeiro.");
      return;
    }
    setListLoading(true);
    setTimeout(() => {
      // Simulação de importação: adiciona 2 números mockados
      setNumbers(prev => [
        { number: "55555", blockedAt: new Date().toISOString().slice(0, 10) },
        { number: "99999", blockedAt: new Date().toISOString().slice(0, 10) },
        ...prev,
      ]);
      setListStatus("success");
      setListMessage("Números importados com sucesso!");
      setListLoading(false);
    }, 1000);
  };

  const resetListDialog = () => {
    setFile(null);
    setListStatus(null);
    setListMessage("");
    setListLoading(false);
  };

  // --- Filtragem da lista de números ---
  const filteredNumbers = useMemo(() => {
    if (!search.trim() || searchError) return numbers;
    return numbers.filter(n =>
      n.number.includes(search.trim())
    );
  }, [search, numbers, searchError]);

  // --- Remover número ---
  const handleDelete = (idx: number) => {
    setNumbers(numbers => numbers.filter((_, i) => i !== idx));
  };

  // --- Editar número (extra básico) ---
  const startEdit = (idx: number) => {
    setEditingIdx(idx);
    setEditingValue(numbers[idx].number);
    setEditStatus(null);
    setEditMessage("");
  };

  const saveEdit = () => {
    const error = validateNumber(editingValue);
    if (error) {
      setEditStatus("error");
      setEditMessage(error);
      return;
    }
    // Duplicidade
    if (
      numbers.some(
        (n, i) => n.number === editingValue && i !== editingIdx
      )
    ) {
      setEditStatus("error");
      setEditMessage("Esse número já está cadastrado.");
      return;
    }
    setNumbers(numbers =>
      numbers.map((n, i) =>
        i === editingIdx ? { ...n, number: editingValue } : n
      )
    );
    setEditStatus("success");
    setEditMessage("Número alterado com sucesso!");
    setTimeout(() => {
      setEditingIdx(null);
      setEditingValue("");
      setEditStatus(null);
      setEditMessage("");
    }, 1000);
  };

  return (
    <div className="w-full max-w-[80%] mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Números</h1>
      {/* Input de busca */}
      <div
        className={`mb-3 flex items-center border-b-2 transition-colors duration-200 ${
          isFocused ? "border-red-400" : "border-gray-300"
        }`}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Buscar Número"
          className="p-2 text-lg text-center w-full border-none outline-none rounded-lg"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          type="button"
          onClick={handleSearch}
          className="ml-2 cursor-pointer"
        >
          <Search className="text-gray-500" />
        </button>
      </div>
      {/* Mensagem de erro busca */}
      {searchError && (
        <div className="flex items-center justify-center text-red-500 mb-2">
          <AlertCircle className="mr-2" />
          <span>{searchError}</span>
        </div>
      )}
      {/* Limpar busca */}
      {search && (
        <button
          onClick={clearSearch}
          className="w-full flex justify-end cursor-pointer"
        >
          <Eraser className="text-gray-500 mr-2 mb-2" />
          <span>Limpar</span>
        </button>
      )}

      {/* Botões de ação */}
      <div className="flex justify-end gap-4 mt-4 mb-8">
        {/* Dialog Adicionar Número */}
        <Dialog open={addDialogOpen} onOpenChange={(open) => {
          setAddDialogOpen(open);
          if (!open) resetAddDialog();
        }}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
              <Plus className="w-5 h-5" /> Adicionar Número
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white rounded-lg shadow border-none">
            <DialogHeader>
              <DialogTitle>Adicionar Número</DialogTitle>
            </DialogHeader>
            <div className="w-full flex flex-col items-center">
              <input
                type="text"
                value={addNumber}
                onChange={e => setAddNumber(e.target.value)}
                placeholder="Digite o número"
                className="p-2 text-lg text-center w-full border-b-2 border-gray-300 focus:border-red-400 outline-none rounded-lg mb-2 transition-colors"
                disabled={addStatus === "success"}
              />
              {addStatus && (
                <div
                  className={`flex text-center justify-center w-full items-center gap-2 mt-2 p-3 rounded ${
                    addStatus === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {addStatus === "success" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span>{addMessage}</span>
                </div>
              )}
            </div>
            <DialogFooter className="flex flex-col gap-2">
              {(!addStatus || addStatus === "error") && (
                <button
                  type="button"
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full cursor-pointer"
                  onClick={handleAddNumber}
                  disabled={addLoading || !!addNumberError}
                >
                  {addLoading ? "Cadastrando..." : "Cadastrar"}
                </button>
              )}
              {addStatus === "success" && (
                <div className="flex gap-2 w-full">
                  <DialogClose asChild>
                    <button
                      type="button"
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition w-full"
                    >
                      Fechar
                    </button>
                  </DialogClose>
                  <button
                    type="button"
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full"
                    onClick={resetAddDialog}
                  >
                    Cadastrar Novo
                  </button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Dialog Adicionar Lista */}
        <Dialog open={listDialogOpen} onOpenChange={(open) => {
          setListDialogOpen(open);
          if (!open) resetListDialog();
        }}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
              <ListPlus className="w-5 h-5" /> Adicionar Lista de Números
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white rounded-lg shadow border-none">
            <DialogHeader>
              <DialogTitle>Importar Lista de Números</DialogTitle>
            </DialogHeader>
            <div className="w-full flex flex-col items-center">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-red-400 transition mb-6 w-full">
                <UploadCloud className="w-8 h-8 text-red-500 mb-2" />
                <span className="text-gray-700 font-medium mb-2">
                  Selecione um arquivo CSV ou XLSX
                </span>
                <input
                  type="file"
                  accept=".csv, .xlsx"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={listStatus === "success"}
                />
                {file && (
                  <span className="mt-2 text-sm text-green-600">{file.name}</span>
                )}
              </label>
              {listStatus && (
                <div
                  className={`flex text-center justify-center w-full items-center gap-2 p-3 rounded ${
                    listStatus === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {listStatus === "success" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span>{listMessage}</span>
                </div>
              )}
            </div>
            <DialogFooter className="flex flex-col gap-2">
              {!listStatus && (
                <button
                  type="button"
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full"
                  onClick={handleAddList}
                  disabled={listLoading}
                >
                  {listLoading ? "Cadastrando..." : "Cadastrar"}
                </button>
              )}
              {listStatus === "success" && (
                <div className="flex gap-2 w-full">
                  <DialogClose asChild>
                    <button
                      type="button"
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition w-full"
                    >
                      Fechar
                    </button>
                  </DialogClose>
                  <button
                    type="button"
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full"
                    onClick={resetListDialog}
                  >
                    Cadastrar Novo
                  </button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de números */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-3">Números Cadastrados</h2>
        <div className="bg-white rounded-lg shadow border">
          <div className="grid grid-cols-12 gap-2 px-4 py-2 font-semibold text-gray-700 border-b">
            <span className="col-span-5">Número</span>
            <span className="col-span-5">Data de Bloqueio</span>
            <span className="col-span-2 text-center">Ações</span>
          </div>
          {filteredNumbers.length === 0 && (
            <div className="px-4 py-6 text-center text-gray-400">Nenhum número encontrado.</div>
          )}
          {filteredNumbers.map((item) => (
            <div
              key={item.number + item.blockedAt}
              className="grid grid-cols-12 gap-2 items-center px-4 py-2 border-b last:border-b-0"
            >
              {/* Número (editável) */}
              <span className="col-span-5">
                {editingIdx === numbers.findIndex(n => n.number === item.number && n.blockedAt === item.blockedAt) ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingValue}
                      onChange={e => setEditingValue(e.target.value)}
                      className="border rounded px-2 py-1 w-32 text-center"
                    />
                    <button
                      className="text-green-600"
                      onClick={saveEdit}
                      type="button"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                    <button
                      className="text-gray-500"
                      onClick={() => setEditingIdx(null)}
                      type="button"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  item.number
                )}
              </span>
              {/* Data de bloqueio */}
              <span className="col-span-5">{item.blockedAt}</span>
              {/* Ações */}
              <span className="col-span-2 flex items-center justify-center gap-4">
                <button
                  className="text-gray-500 hover:text-red-600 transition"
                  onClick={() => startEdit(numbers.findIndex(n => n.number === item.number && n.blockedAt === item.blockedAt))}
                  title="Editar"
                  disabled={editingIdx !== null}
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  className="text-gray-500 hover:text-red-600 transition"
                  onClick={() => handleDelete(numbers.findIndex(n => n.number === item.number && n.blockedAt === item.blockedAt))}
                  title="Remover"
                  disabled={editingIdx !== null}
                >
                  <Trash className="w-5 h-5" />
                </button>
              </span>
              {/* Mensagem de edição */}
              {editingIdx === numbers.findIndex(n => n.number === item.number && n.blockedAt === item.blockedAt) && (
                <div className="col-span-12 mt-2">
                  {editStatus && (
                    <div
                      className={`flex items-center gap-2 p-2 rounded ${
                        editStatus === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {editStatus === "success" ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <AlertCircle className="w-5 h-5" />
                      )}
                      <span>{editMessage}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageNumbersPage;