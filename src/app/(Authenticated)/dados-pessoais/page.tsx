"use client";

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const mockUser = {
  name: 'John Doe',
  email: 'john.doe@email.com',
};

export default function PersonalDataPage() {
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [message, setMessage] = useState('');

  const [focus, setFocus] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    currentPassword: false,
  });

  // Show/hide states for individual password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!name.trim() || !email.trim()) {
      setStatus('error');
      setMessage('Nome e email não podem estar vazios.');
      return;
    }
    if (password && password !== confirmPassword) {
      setStatus('error');
      setMessage('Senha e confirmação não coincidem.');
      return;
    }

    // Mock password check (replace with real API call)
    if (currentPassword !== 'password123') {
      setStatus('error');
      setMessage('Senha atual está incorreta.');
      return;
    }

    // Mock success
    setStatus('success');
    setMessage('Dados pessoais atualizados com sucesso!');
    // Optionally reset password fields
    setPassword('');
    setConfirmPassword('');
    setCurrentPassword('');
  };

  return (
    <div className="w-full max-w-[80%]">
      <h1 className="text-2xl font-bold mb-6">Dados Pessoais</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <div
            className={`mb-3 flex items-center border-b-2 transition-colors duration-200 ${
              focus.name ? "border-red-400" : "border-gray-300"
            }`}
          >
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Seu Nome"
              required
              className="p-2 text-lg w-full border-none outline-none rounded-lg"
              onFocus={() => setFocus(f => ({ ...f, name: true }))}
              onBlur={() => setFocus(f => ({ ...f, name: false }))}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <div
            className={`mb-3 flex items-center border-b-2 transition-colors duration-200 ${
              focus.email ? "border-red-400" : "border-gray-300"
            }`}
          >
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="p-2 text-lg w-full border-none outline-none rounded-lg"
              onFocus={() => setFocus(f => ({ ...f, email: true }))}
              onBlur={() => setFocus(f => ({ ...f, email: false }))}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nova Senha</label>
          <div
            className={`relative mb-3 flex items-center border-b-2 transition-colors duration-200 ${
              focus.password ? "border-red-400" : "border-gray-300"
            }`}
          >
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Digite sua nova senha"
              className="p-2 text-lg w-full border-none outline-none rounded-lg"
              onFocus={() => setFocus(f => ({ ...f, password: true }))}
              onBlur={() => setFocus(f => ({ ...f, password: false }))}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(v => !v)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center max-w-10 max-h-10"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <EyeOff className="size-5 text-gray-400" />
              ) : (
                <Eye className="size-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Confirmação da Senha</label>
          <div
            className={`relative mb-3 flex items-center border-b-2 transition-colors duration-200 ${
              focus.confirmPassword ? "border-red-400" : "border-gray-300"
            }`}
          >
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua nova senha"
              className="p-2 text-lg w-full border-none outline-none rounded-lg"
              onFocus={() => setFocus(f => ({ ...f, confirmPassword: true }))}
              onBlur={() => setFocus(f => ({ ...f, confirmPassword: false }))}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowConfirmPassword(v => !v)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center max-w-10 max-h-10"
              aria-label={showConfirmPassword ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
            >
              {showConfirmPassword ? (
                <EyeOff className="size-5 text-gray-400" />
              ) : (
                <Eye className="size-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Senha Atual</label>
          <div
            className={`relative mb-3 flex items-center border-b-2 transition-colors duration-200 ${
              focus.currentPassword ? "border-red-400" : "border-gray-300"
            }`}
          >
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              placeholder="Digite sua senha atual para salvar as alterações"
              required
              className="p-2 text-lg w-full border-none outline-none rounded-lg"
              onFocus={() => setFocus(f => ({ ...f, currentPassword: true }))}
              onBlur={() => setFocus(f => ({ ...f, currentPassword: false }))}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowCurrentPassword(v => !v)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center max-w-10 max-h-10"
              aria-label={showCurrentPassword ? "Ocultar senha atual" : "Mostrar senha atual"}
            >
              {showCurrentPassword ? (
                <EyeOff className="size-5 text-gray-400" />
              ) : (
                <Eye className="size-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
        <div className='flex justify-end'>
          <button type="submit" className="flex justify-center gap-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition w-24 cursor-pointer">
            Salvar
          </button>
        </div>
        {status && (
          <div
            className={`flex justify-center items-center gap-2 mt-4 p-3 rounded ${
              status === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status === "success" ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  );
}