import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserPlus, Trash2, LogOut, Lock, Mail, Key, Edit2, Check, Phone, MessageCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function VipModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { user, login, logout, users, addUser, removeUser, updateUserPassword } = useContext(AuthContext);
  
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const [newEmail, setNewEmail] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newName, setNewName] = useState('');
  const [newGroup, setNewGroup] = useState<'sinais' | 'mentoria'>('mentoria');
  
  const [activeTab, setActiveTab] = useState<'mentoria' | 'sinais'>('mentoria');
  
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editPassValue, setEditPassValue] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, pass);
    if(success) {
      setError('');
    } else {
      setError('Credenciais inválidas.');
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmail && newPass) {
      addUser(newEmail, newPass, newPhone, newName, newGroup);
      setNewEmail('');
      setNewPass('');
      setNewPhone('');
      setNewName('');
    }
  };
  
  const handleSavePassword = (emailToEdit: string) => {
    if (editPassValue) {
      updateUserPassword(emailToEdit, editPassValue);
    }
    setEditingUser(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] cursor-pointer"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md max-h-[90vh] overflow-y-auto bg-brand-card border border-brand-green/30 p-6 rounded-3xl z-[101] shadow-[0_0_100px_rgba(57,255,20,0.15)]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-brand-muted hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {!user ? (
              <div>
                <div className="mb-8 text-center pt-4">
                   <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-green/10 mb-4 border border-brand-green/30">
                     <Lock className="text-brand-green" size={28} />
                   </div>
                  <h3 className="text-2xl font-heading text-white tracking-wider mb-2 uppercase">
                    Área <span className="text-brand-green">VIP</span>
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    Acesso exclusivo para alunos.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  {error && <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">{error}</div>}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <input 
                      type="email" 
                      placeholder="Seu E-mail" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-green/50 transition-colors"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <input 
                      type="password" 
                      placeholder="Senha" 
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-green/50 transition-colors"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-brand-green text-black font-bold uppercase tracking-wider rounded-xl hover:bg-[#a3ff20] transition-colors mt-6 shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                    Entrar
                  </button>
                  <p className="text-center mt-6 text-sm text-brand-muted">
                    Ainda não é aluno?{' '}
                    <a href="#planos" onClick={onClose} className="text-brand-green font-bold hover:underline">
                      Criar acesso
                    </a>
                  </p>
                </form>
              </div>
            ) : user.role === 'admin' ? (
              <div>
                <div className="mb-6 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-heading text-brand-green tracking-wider uppercase">Painel Admin</h3>
                    <button onClick={logout} className="text-white/50 hover:text-red-400 p-2"><LogOut size={20}/></button>
                  </div>
                  <div className="bg-brand-green/10 border border-brand-green/20 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-sm text-brand-muted">Alunos Ativos</span>
                    <span className="text-xl font-bold text-brand-green">{users.length}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-white mb-3">Adicionar Aluno</h4>
                  <form onSubmit={handleAddUser} className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Nome do aluno (opcional)" 
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg py-2 px-4 text-white text-sm focus:outline-none focus:border-brand-green/50"
                    />
                    <input 
                      type="email" 
                      placeholder="E-mail do aluno" 
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg py-2 px-4 text-white text-sm focus:outline-none focus:border-brand-green/50"
                      required
                    />
                    <input 
                      type="password" 
                      placeholder="Senha de acesso" 
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg py-2 px-4 text-white text-sm focus:outline-none focus:border-brand-green/50"
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="WhatsApp (ex: 5511999999999)" 
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg py-2 px-4 text-white text-sm focus:outline-none focus:border-brand-green/50"
                    />
                    <div className="flex gap-2">
                       <label className="flex items-center gap-2 text-sm text-brand-muted cursor-pointer">
                         <input type="radio" checked={newGroup === 'mentoria'} onChange={() => setNewGroup('mentoria')} className="accent-brand-green" />
                         Mentoria
                       </label>
                       <label className="flex items-center gap-2 text-sm text-brand-muted cursor-pointer">
                         <input type="radio" checked={newGroup === 'sinais'} onChange={() => setNewGroup('sinais')} className="accent-brand-green" />
                         Sala de Sinal
                       </label>
                    </div>
                    <button type="submit" className="w-full py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors">
                      <UserPlus size={16} /> Adicionar
                    </button>
                  </form>
                </div>

                <div>
                  <div className="flex items-center gap-4 border-b border-white/10 mb-3 pb-3">
                    <button 
                      onClick={() => setActiveTab('mentoria')} 
                      className={`text-sm font-bold ${activeTab === 'mentoria' ? 'text-brand-green' : 'text-white/50 hover:text-white'}`}
                    >
                      Mentoria ({users.filter(u => u.group !== 'sinais').length})
                    </button>
                    <button 
                      onClick={() => setActiveTab('sinais')} 
                      className={`text-sm font-bold ${activeTab === 'sinais' ? 'text-brand-green' : 'text-white/50 hover:text-white'}`}
                    >
                      Sala de Sinal ({users.filter(u => u.group === 'sinais').length})
                    </button>
                  </div>
                  {users.filter(u => activeTab === 'mentoria' ? u.group !== 'sinais' : u.group === 'sinais').length === 0 ? (
                    <p className="text-xs text-brand-muted italic">Nenhum aluno nesta categoria.</p>
                  ) : (
                    <ul className="space-y-2 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                      {users.filter(u => activeTab === 'mentoria' ? u.group !== 'sinais' : u.group === 'sinais').map((u, i) => (
                        <li key={i} className="flex flex-col p-3 bg-black/30 rounded-lg border border-white/5">
                          <div className="flex items-center justify-between">
                            <div>
                              {u.name && <p className="text-sm font-bold text-brand-green mb-0.5">{u.name}</p>}
                              <p className="text-sm text-white font-medium">{u.email}</p>
                              {editingUser === u.email ? (
                                <div className="flex items-center gap-2 mt-1">
                                  <input 
                                    type="text" 
                                    value={editPassValue}
                                    onChange={(e) => setEditPassValue(e.target.value)}
                                    className="bg-black/50 border border-brand-green/50 rounded py-1 px-2 text-white text-xs w-28"
                                    autoFocus
                                  />
                                  <button onClick={() => handleSavePassword(u.email)} className="text-brand-green p-1 hover:bg-brand-green/20 rounded transition-colors">
                                    <Check size={14} />
                                  </button>
                                  <button onClick={() => setEditingUser(null)} className="text-brand-muted p-1 hover:bg-white/10 rounded transition-colors">
                                    <X size={14} />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 mt-1 -ml-1">
                                  <p className="text-xs text-brand-muted font-mono ml-1">{u.pass}</p>
                                  <button onClick={() => { setEditingUser(u.email); setEditPassValue(u.pass); }} className="text-white/40 hover:text-white p-1 transition-colors">
                                    <Edit2 size={12} />
                                  </button>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {u.phone && (
                                <a 
                                  href={`https://wa.me/${u.phone.replace(/\D/g, '')}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-[#25D366] p-2 hover:bg-[#25D366]/20 rounded-md transition-colors"
                                  title="Chamar no WhatsApp"
                                >
                                  <MessageCircle fill="currentColor" size={16} />
                                </a>
                              )}
                              <button onClick={() => removeUser(u.email)} className="text-red-500/50 hover:text-red-500 p-2 transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-green/10 mb-4 border border-brand-green/30 shadow-[0_0_30px_rgba(57,255,20,0.3)]">
                  <Lock size={28} className="text-brand-green" />
                </div>
                <h3 className="text-2xl font-heading text-white tracking-wider mb-2 uppercase">Bem-vindo, VIP!</h3>
                <p className="text-brand-muted text-sm mb-6">
                  Todos os módulos estão desbloqueados.
                </p>
                <div className="flex flex-col gap-3">
                  <a href="#modulos" onClick={onClose} className="w-full py-3 bg-brand-green text-black font-bold rounded-xl uppercase tracking-wider hover:bg-[#a3ff20] transition-colors block text-center">
                    Acessar Módulos
                  </a>
                  <button onClick={logout} className="w-full py-3 bg-white/5 text-white font-bold rounded-xl uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <LogOut size={18} /> Sair
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
