"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  CheckCircle2,
  Eraser,
  AlertCircle,
  Plus,
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

// Mocked users
const MOCK_USERS: UserEntry[] = [
  { name: "João Silva", email: "joao@email.com", access: "admin" },
  { name: "Maria Oliveira", email: "maria@email.com", access: "user" },
  { name: "Carlos Souza", email: "carlos@email.com", access: "user" },
];

type UserEntry = {
  name: string;
  email: string;
  access: "admin" | "user";
};

const validateEmail = (email: string) => {
  if (!email.trim()) return "O email não pode estar vazio.";
  // Regex simples para email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    return "Email inválido.";
  return "";
};

const validateName = (name: string) => {
  if (!name.trim()) return "O nome não pode estar vazio.";
  return "";
};

const validateAccess = (access: string) => {
  if (access !== "admin" && access !== "user")
    return "Selecione um tipo de acesso.";
  return "";
};

const ManageUsersPage: React.FC = () => {
  // --- Busca ---
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);

  // --- Dados (mockados) ---
  const [users, setUsers] = useState<UserEntry[]>(MOCK_USERS);

  // --- Modal Adicionar Usuário ---
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addName, setAddName] = useState("");
  const [addNameError, setAddNameError] = useState<string | null>(null);
  const [addEmail, setAddEmail] = useState("");
  const [addEmailError, setAddEmailError] = useState<string | null>(null);
  const [addAccess, setAddAccess] = useState<"admin" | "user" | "">("");
  const [addAccessError, setAddAccessError] = useState<string | null>(null);
  const [addPassword, setAddPassword] = useState("");
  const [addStatus, setAddStatus] = useState<"success" | "error" | null>(null);
  const [addMessage, setAddMessage] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  // --- Modal Editar Usuário ---
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAccess, setEditAccess] = useState<"admin" | "user" | "">("");
  const [resetPassword, setResetPassword] = useState(false);
  const [editNameError, setEditNameError] = useState<string | null>(null);
  const [editEmailError, setEditEmailError] = useState<string | null>(null);
  const [editAccessError, setEditAccessError] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<"success" | "error" | null>(null);
  const [editMessage, setEditMessage] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  // --- Validação busca em tempo real ---
  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
      setSearchError("Digite um email válido para buscar.");
    else setSearchError(null);
  };

  const clearSearch = () => {
    setSearch("");
    setSearchError(null);
  };

  // --- Adicionar Usuário (validação em tempo real) ---
  const handleAddNameChange = (value: string) => {
    setAddName(value);
    const error = validateName(value);
    setAddNameError(error || null);
  };
  const handleAddEmailChange = (value: string) => {
    setAddEmail(value);
    const error = validateEmail(value);
    setAddEmailError(error || null);
  };
  const handleAddAccessChange = (value: "admin" | "user" | "") => {
    setAddAccess(value);
    const error = validateAccess(value);
    setAddAccessError(error || null);
  };
  const handleAddPasswordChange = (value: string) => {
    setAddPassword(value);
  };

  const handleAddUser = () => {
    const nameError = validateName(addName);
    const emailError = validateEmail(addEmail);
    const accessError = validateAccess(addAccess);

    setAddNameError(nameError || null);
    setAddEmailError(emailError || null);
    setAddAccessError(accessError || null);

    if (nameError || emailError || accessError) {
      setAddStatus("error");
      setAddMessage("Preencha todos os campos corretamente.");
      return;
    }
    if (users.some(u => u.email === addEmail)) {
      setAddStatus("error");
      setAddMessage("Esse email já está cadastrado.");
      return;
    }
    setAddLoading(true);
    setTimeout(() => {
      setUsers([
        { name: addName, email: addEmail, access: addAccess as "admin" | "user" },
        ...users,
      ]);
      setAddStatus("success");
      setAddMessage("Usuário cadastrado com sucesso!");
      setAddLoading(false);
    }, 1000);
  };

  const resetAddDialog = () => {
    setAddName("");
    setAddNameError(null);
    setAddEmail("");
    setAddEmailError(null);
    setAddAccess("");
    setAddAccessError(null);
    setAddPassword("");
    setAddStatus(null);
    setAddMessage("");
    setAddLoading(false);
  };

  // --- Editar Usuário (validação em tempo real) ---
  const openEditDialog = (idx: number) => {
    setEditDialogOpen(true);
    setEditingIdx(idx);
    setEditName(users[idx].name);
    setEditEmail(users[idx].email);
    setEditAccess(users[idx].access);
    setResetPassword(false);
    setEditNameError(null);
    setEditEmailError(null);
    setEditAccessError(null);
    setEditStatus(null);
    setEditMessage("");
    setEditLoading(false);
  };

  const handleEditNameChange = (value: string) => {
    setEditName(value);
    const error = validateName(value);
    setEditNameError(error || null);
  };
  const handleEditEmailChange = (value: string) => {
    setEditEmail(value);
    const error = validateEmail(value);
    setEditEmailError(error || null);
  };
  const handleEditAccessChange = (value: "admin" | "user" | "") => {
    setEditAccess(value);
    const error = validateAccess(value);
    setEditAccessError(error || null);
  };

  const handleEditUser = () => {
    const nameError = validateName(editName);
    const emailError = validateEmail(editEmail);
    const accessError = validateAccess(editAccess);

    setEditNameError(nameError || null);
    setEditEmailError(emailError || null);
    setEditAccessError(accessError || null);

    if (nameError || emailError || accessError) {
      setEditStatus("error");
      setEditMessage("Preencha todos os campos corretamente.");
      return;
    }
    if (
      users.some(
        (u, i) => u.email === editEmail && i !== editingIdx
      )
    ) {
      setEditStatus("error");
      setEditMessage("Esse email já está cadastrado.");
      return;
    }
    setEditLoading(true);
    setTimeout(() => {
      setUsers(users =>
        users.map((u, i) =>
          i === editingIdx
            ? { name: editName, email: editEmail, access: editAccess as "admin" | "user" }
            : u
        )
      );
      setEditStatus("success");
      setEditMessage(
        `Usuário atualizado com sucesso!${resetPassword ? " Senha redefinida para '123456789'." : ""}`
      );
      setEditLoading(false);
      setTimeout(() => {
        setEditDialogOpen(false);
      }, 1500);
    }, 1000);
  };

  const resetEditDialog = () => {
    setEditDialogOpen(false);
    setEditingIdx(null);
    setEditName("");
    setEditNameError(null);
    setEditEmail("");
    setEditEmailError(null);
    setEditAccess("");
    setEditAccessError(null);
    setResetPassword(false);
    setEditStatus(null);
    setEditMessage("");
    setEditLoading(false);
  };

  // --- Remover Usuário ---
  const handleDelete = (idx: number) => {
    setUsers(users => users.filter((_, i) => i !== idx));
  };

  // --- Filtragem da lista de usuários ---
  const filteredUsers = useMemo(() => {
    if (!search.trim() || searchError) return users;
    return users.filter(u => u.email.toLowerCase().includes(search.trim().toLowerCase()));
  }, [search, users, searchError]);

  return (
    <div className="w-full max-w-[80%] mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Usuários</h1>
      {/* Input de busca */}
      <div
        className={`mb-3 flex items-center border-b-2 transition-colors duration-200 ${
          isFocused ? "border-red-400" : "border-gray-300"
        }`}
      >
        <input
          type="text"
          value={search}
          onChange={e => handleSearchChange(e.target.value)}
          placeholder="Buscar por email"
          className="p-2 text-lg text-center w-full border-none outline-none rounded-lg"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Search className="text-gray-500" />
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

      {/* Botão de ação */}
      <div className="flex justify-end gap-4 mt-4 mb-8">
        {/* Dialog Adicionar Usuário */}
        <Dialog open={addDialogOpen} onOpenChange={open => {
          setAddDialogOpen(open);
          if (!open) resetAddDialog();
        }}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer">
              <Plus className="w-5 h-5" /> Adicionar Usuário
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white rounded-lg shadow border-none">
            <DialogHeader>
              <DialogTitle>Adicionar Usuário</DialogTitle>
            </DialogHeader>
            <div className="w-full flex flex-col gap-3">
              <input
                type="text"
                value={addName}
                onChange={e => handleAddNameChange(e.target.value)}
                placeholder="Nome"
                className="p-2 text-lg w-full border-b-2 border-gray-300 focus:border-red-400 outline-none rounded-lg transition-colors"
                disabled={addStatus === "success"}
              />
              {addNameError && (
                <div className="flex items-center text-red-500">
                  <AlertCircle className="mr-2" />
                  <span>{addNameError}</span>
                </div>
              )}
              <input
                type="email"
                value={addEmail}
                onChange={e => handleAddEmailChange(e.target.value)}
                placeholder="Email"
                className="p-2 text-lg w-full border-b-2 border-gray-300 focus:border-red-400 outline-none rounded-lg transition-colors mt-2"
                disabled={addStatus === "success"}
              />
              {addEmailError && (
                <div className="flex items-center text-red-500">
                  <AlertCircle className="mr-2" />
                  <span>{addEmailError}</span>
                </div>
              )}
              <select
                value={addAccess}
                onChange={e => handleAddAccessChange(e.target.value as "admin" | "user" | "")}
                className="p-2 text-lg w-full border-b-2 border-gray-300 focus:border-red-400 outline-none rounded-lg transition-colors mt-2"
                disabled={addStatus === "success"}
              >
                <option value="">Selecione o tipo de acesso</option>
                <option value="admin">Administrador</option>
                <option value="user">Usuário</option>
              </select>
              {addAccessError && (
                <div className="flex items-center text-red-500">
                  <AlertCircle className="mr-2" />
                  <span>{addAccessError}</span>
                </div>
              )}
              <input
                type="password"
                value={addPassword}
                onChange={e => handleAddPasswordChange(e.target.value)}
                placeholder="Senha (opcional)"
                className="p-2 text-lg w-full border-b-2 border-gray-300 focus:border-red-400 outline-none rounded-lg transition-colors mt-2"
                disabled={addStatus === "success"}
              />
              <span className="text-xs text-gray-500">
                Se não informado, a senha padrão será <b>123456789</b>
              </span>
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
                  onClick={handleAddUser}
                  disabled={addLoading || !!addNameError || !!addEmailError || !!addAccessError}
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
      </div>

      {/* Lista de usuários */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-3">Usuários Cadastrados</h2>
        <div className="bg-white rounded-lg shadow border">
          <div className="grid grid-cols-12 gap-2 px-4 py-2 font-semibold text-gray-700 border-b">
            <span className="col-span-4">Nome</span>
            <span className="col-span-4">Email</span>
            <span className="col-span-2">Acesso</span>
            <span className="col-span-2 text-center">Ações</span>
          </div>
          {filteredUsers.length === 0 && (
            <div className="px-4 py-6 text-center text-gray-400">Nenhum usuário encontrado.</div>
          )}
          {filteredUsers.map((item) => (
            <div
              key={item.email}
              className="grid grid-cols-12 gap-2 items-center px-4 py-2 border-b last:border-b-0"
            >
              <span className="col-span-4">{item.name}</span>
              <span className="col-span-4">{item.email}</span>
              <span className="col-span-2">{item.access === "admin" ? "Administrador" : "Usuário"}</span>
              <span className="col-span-2 flex items-center justify-center gap-4">
                <button
                  className="text-gray-500 hover:text-red-600 transition cursor-pointer"
                  onClick={() => openEditDialog(users.findIndex(u => u.email === item.email))}
                  title="Editar"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  className="text-gray-500 hover:text-red-600 transition cursor-pointer"
                  onClick={() => handleDelete(users.findIndex(u => u.email === item.email))}
                  title="Remover"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog Editar Usuário */}
      <Dialog open={editDialogOpen} onOpenChange={open => {
        if (!open) resetEditDialog();
        else setEditDialogOpen(open);
      }}>
        <DialogContent className="bg-white rounded-lg shadow border-none">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>
          <div className="w-full flex flex-col gap-3">
            <input
              type="text"
              value={editName}
              onChange={e => handleEditNameChange(e.target.value)}
              placeholder="Nome"
              className="p-2 text-lg w-full border-b-2 border-gray-300 focus:border-red-400 outline-none rounded-lg transition-colors"
              disabled={editStatus === "success"}
            />
            {editNameError && (
              <div className="flex items-center text-red-500">
                <AlertCircle className="mr-2" />
                <span>{editNameError}</span>
              </div>
            )}
            <input
              type="email"
              value={editEmail}
              onChange={e => handleEditEmailChange(e.target.value)}
              placeholder="Email"
              className="p-2 text-lg w-full border-b-2 border-gray-300 focus:border-red-400 outline-none rounded-lg transition-colors mt-2"
              disabled={editStatus === "success"}
            />
            {editEmailError && (
              <div className="flex items-center text-red-500">
                <AlertCircle className="mr-2" />
                <span>{editEmailError}</span>
              </div>
            )}
            <select
              value={editAccess}
              onChange={e => handleEditAccessChange(e.target.value as "admin" | "user" | "")}
              className="p-2 text-lg w-full border-b-2 border-gray-300 focus:border-red-400 outline-none rounded-lg transition-colors mt-2"
              disabled={editStatus === "success"}
            >
              <option value="">Selecione o tipo de acesso</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuário</option>
            </select>
            {editAccessError && (
              <div className="flex items-center text-red-500">
                <AlertCircle className="mr-2" />
                <span>{editAccessError}</span>
              </div>
            )}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="resetPassword"
                checked={resetPassword}
                onChange={e => setResetPassword(e.target.checked)}
                disabled={editStatus === "success"}
              />
              <label htmlFor="resetPassword" className="text-sm select-none">Resetar senha para <b>123456789</b></label>
            </div>
            {editStatus && (
              <div
                className={`flex text-center justify-center w-full items-center gap-2 mt-2 p-3 rounded ${
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
          <DialogFooter className="flex flex-col gap-2">
            {(!editStatus || editStatus === "error") && (
              <button
                type="button"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full cursor-pointer"
                onClick={handleEditUser}
                disabled={editLoading || !!editNameError || !!editEmailError || !!editAccessError}
              >
                {editLoading ? "Salvando..." : "Salvar Alterações"}
              </button>
            )}
            {editStatus === "success" && (
              <DialogClose asChild>
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition w-full"
                >
                  Fechar
                </button>
              </DialogClose>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUsersPage;