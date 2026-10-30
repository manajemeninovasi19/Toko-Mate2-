import React, { useState } from 'react';
import { UserAccount } from '../types';
import { LOGO_URL } from '../data/mockData';
import {
  getRegisteredAccounts,
  createGoogleAccount,
  loginUser,
  deleteGoogleAccount,
} from '../services/authService';

interface GoogleAuthScreenProps {
  onLoginSuccess: (user: UserAccount) => void;
}

export const GoogleAuthScreen: React.FC<GoogleAuthScreenProps> = ({ onLoginSuccess }) => {
  const [accounts, setAccounts] = useState<UserAccount[]>(getRegisteredAccounts());
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Quick Select / Login with existing account
  const handleSelectAccount = (acc: UserAccount) => {
    setIsLoading(true);
    setTimeout(() => {
      loginUser(acc);
      onLoginSuccess(acc);
      setIsLoading(false);
    }, 300);
  };

  // Submit new Google registration / login
  const handleSubmitNewAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Mohon masukkan alamat email Google yang valid (contoh: toko@gmail.com)');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const created = createGoogleAccount(email, name, storeName);
      loginUser(created);
      onLoginSuccess(created);
      setIsLoading(false);
    }, 400);
  };

  const handleDeleteAccountQuick = (e: React.MouseEvent, acc: UserAccount) => {
    e.stopPropagation();
    if (window.confirm(`Hapus akun ${acc.email} dan seluruh data tokonya?`)) {
      const { remainingAccounts } = deleteGoogleAccount(acc.email);
      setAccounts([...remainingAccounts]);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low flex flex-col justify-center items-center p-4 sm:p-6 antialiased selection:bg-primary-fixed-dim">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-2xl border border-surface-container flex flex-col items-center animate-fadeIn">
        {/* App Logo & Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center p-2 mb-3 shadow-xs">
            <img
              src={LOGO_URL}
              alt="TokoMate POS Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface">
            TokoMate POS &amp; Kasir
          </h1>
          <p className="text-xs text-on-surface-variant mt-1.5 max-w-xs leading-relaxed">
            Masuk atau daftar dengan Akun Google untuk mengelola toko, kasir, dan laporan penjualan Anda
          </p>
        </div>

        {errorMsg && (
          <div className="w-full mb-4 p-3 rounded-xl bg-error-container/20 border border-error/30 text-error text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span className="flex-1">{errorMsg}</span>
          </div>
        )}

        {/* Mode Toggle: Pilih Akun vs Daftar Baru */}
        <div className="w-full grid grid-cols-2 p-1 bg-surface-container rounded-xl mb-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => setIsRegisterMode(false)}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              !isRegisterMode
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Pilih Akun ({accounts.length})
          </button>
          <button
            type="button"
            onClick={() => setIsRegisterMode(true)}
            className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
              isRegisterMode
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">person_add</span>
            <span>Daftar Toko Baru</span>
          </button>
        </div>

        {!isRegisterMode ? (
          /* List of Available Google Accounts */
          <div className="w-full flex flex-col gap-2">
            <span className="text-[11px] font-bold text-on-surface-variant mb-1 uppercase tracking-wider block">
              Akun Google yang Tersimpan di Perangkat:
            </span>

            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto no-scrollbar">
              {accounts.map((acc) => (
                <div
                  key={acc.id}
                  onClick={() => !isLoading && handleSelectAccount(acc)}
                  className="p-3 rounded-2xl border border-surface-container bg-surface-container-lowest hover:border-primary hover:bg-primary/5 transition-all cursor-pointer flex items-center justify-between gap-3 shadow-2xs group"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img
                      src={acc.picture}
                      alt={acc.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-on-surface truncate group-hover:text-primary transition-colors">
                          {acc.name}
                        </span>
                        <div className="w-3.5 h-3.5 rounded-full bg-white shadow-2xs flex items-center justify-center border border-slate-200 shrink-0">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-[11px] text-on-surface-variant font-mono truncate">{acc.email}</p>
                      <p className="text-[10px] text-primary font-semibold truncate mt-0.5">
                        🏬 {acc.storeName || 'Toko Saya'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <span className="material-symbols-outlined text-primary text-[20px] group-hover:translate-x-0.5 transition-transform">
                      arrow_forward
                    </span>
                    {accounts.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => handleDeleteAccountQuick(e, acc)}
                        className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-lg cursor-pointer transition-colors"
                        title="Hapus Akun"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsRegisterMode(true)}
              className="mt-2 w-full py-2.5 rounded-xl border border-dashed border-primary/50 text-primary hover:bg-primary/5 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>+ Masuk dengan Akun Google Lain</span>
            </button>
          </div>
        ) : (
          /* Form: Daftar Akun Google Baru */
          <form onSubmit={handleSubmitNewAccount} className="w-full flex flex-col gap-3 text-xs">
            <div className="p-3 bg-primary/5 rounded-2xl border border-primary/20 flex items-center gap-2.5 mb-1">
              <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center border border-slate-200 shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-bold text-on-surface text-xs block">Daftar Toko via Google</span>
                <span className="text-[10px] text-on-surface-variant">Data toko baru akan otomatis dibuat terpisah</span>
              </div>
            </div>

            <div>
              <label className="font-semibold text-on-surface mb-1 block">Alamat Email Google *</label>
              <input
                type="email"
                required
                placeholder="nama.toko@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-on-surface focus:outline-hidden focus:border-primary text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-on-surface mb-1 block">Nama Pemilik / Kasir</label>
              <input
                type="text"
                placeholder="cth: Rian Sanjaya"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-on-surface focus:outline-hidden focus:border-primary text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-on-surface mb-1 block">Nama Toko Baru</label>
              <input
                type="text"
                placeholder="cth: Toko Rian Berkah"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-on-surface focus:outline-hidden focus:border-primary text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Membuat Ruang Toko...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  <span>Masuk &amp; Buka Toko dengan Akun Ini</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Feature Highlights */}
        <div className="w-full mt-6 pt-4 border-t border-surface-container flex flex-col gap-2 text-[11px] text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 text-[16px]">verified</span>
            <span>Data tersimpan otomatis &amp; anti-hilang saat refresh</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[16px]">domain</span>
            <span>Setiap akun Google memiliki ruang toko terpisah (Multi-Tenant)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
