import React, { useState, useRef } from 'react';
import { UserAccount } from '../types';
import {
  getRegisteredAccounts,
  createGoogleAccount,
  loginGoogleAccount,
  setCurrentUser,
} from '../services/authService';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onSwitchUser: (newUser: UserAccount) => void;
  onRequestDeleteAccount?: (account: UserAccount) => void;
  onUpdateUserPhoto?: (newPhotoUrl: string) => void;
}

type AuthTab = 'list' | 'login' | 'register';

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSwitchUser,
  onRequestDeleteAccount,
  onUpdateUserPhoto,
}) => {
  const [activeTab, setActiveTab] = useState<AuthTab>('list');
  const [accounts, setAccounts] = useState<UserAccount[]>(getRegisteredAccounts());

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');

  // Register form state
  const [regEmail, setRegEmail] = useState('');
  const [regName, setRegName] = useState('');
  const [regStoreName, setRegStoreName] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const modalFileRef = useRef<HTMLInputElement>(null);

  const handleModalFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Harap pilih file gambar (JPG, PNG, atau WEBP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 256;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          if (onUpdateUserPhoto) {
            onUpdateUserPhoto(compressedDataUrl);
          }
          setAccounts(getRegisteredAccounts());
          setSuccessMsg('Foto profil akun berhasil diperbarui dari galeri!');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  if (!isOpen) return null;

  const handleSelectAccount = (acc: UserAccount) => {
    setCurrentUser(acc);
    onSwitchUser(acc);
    onClose();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginEmail || !loginEmail.includes('@')) {
      setErrorMsg('Masukkan alamat email Google yang valid (contoh: user@gmail.com)');
      return;
    }

    const { user, isNew } = loginGoogleAccount(loginEmail);
    setAccounts(getRegisteredAccounts());
    onSwitchUser(user);

    if (isNew) {
      setSuccessMsg(`Akun baru ${user.email} berhasil didaftarkan dan aktif!`);
    } else {
      setSuccessMsg(`Berhasil masuk ke akun ${user.email}!`);
    }

    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!regEmail || !regEmail.includes('@')) {
      setErrorMsg('Masukkan alamat email Google yang valid (contoh: user@gmail.com)');
      return;
    }

    const created = createGoogleAccount(regEmail, regName, regStoreName);
    setAccounts(getRegisteredAccounts());
    onSwitchUser(created);
    setSuccessMsg(`Toko ${created.storeName} berhasil didaftarkan dengan akun ${created.email}!`);

    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-5 shadow-2xl border border-surface-container overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
          <div className="flex items-center gap-2.5">
            <img
              src="/tokomate-logo.jpeg"
              alt="TokoMate Logo"
              className="w-10 h-10 rounded-xl object-cover shadow-xs border border-surface-container shrink-0"
            />
            <div>
              <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                Akun Toko &amp; Multi-Tenant
              </h3>
              <p className="text-[11px] text-on-surface-variant">Penyimpanan mandiri terisolasi per akun</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Navigation Tabs: Akun Tersimpan, Masuk (Login), Daftar Baru (Register) */}
        <div className="flex border-b border-surface-container mt-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab('list');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 text-center text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'list'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">badge</span>
            <span>Akun Saya ({accounts.length})</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 text-center text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'login'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">login</span>
            <span>Masuk (Login)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 text-center text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'register'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">person_add</span>
            <span>Daftar Baru</span>
          </button>
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="mt-2.5 p-2 rounded-xl bg-error-container/20 text-error text-xs font-medium flex items-center gap-1.5 animate-fadeIn">
            <span className="material-symbols-outlined text-[16px]">error</span>
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mt-2.5 p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5 animate-fadeIn">
            <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
            <span>{successMsg}</span>
          </div>
        )}

        <div className="py-3 overflow-y-auto no-scrollbar flex flex-col gap-3">
          {/* TAB 1: LIST / SAVED ACCOUNTS */}
          {activeTab === 'list' && (
            <>
              {/* Active Tenant Box with Photo Change */}
              <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3">
                <div className="relative shrink-0 group">
                  <button
                    type="button"
                    onClick={() => modalFileRef.current?.click()}
                    className="relative block w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/40 focus:outline-hidden cursor-pointer"
                    title="Klik untuk ganti foto profil dari galeri"
                  >
                    <img
                      src={currentUser.picture}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/45 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => modalFileRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center border border-white shadow-xs"
                    title="Pilih foto dari galeri"
                  >
                    <span className="material-symbols-outlined text-[10px]">photo_camera</span>
                  </button>
                </div>

                <input
                  ref={modalFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleModalFileSelect}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-on-surface truncate">{currentUser.name}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold shrink-0">
                      Aktif Bertugas
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant truncate font-mono">{currentUser.email}</p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-primary font-semibold flex-wrap">
                    <span>🏬 {currentUser.storeName || 'Toko Anda'}</span>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => modalFileRef.current?.click()}
                      className="inline-flex items-center gap-0.5 text-primary hover:underline cursor-pointer font-bold"
                    >
                      <span className="material-symbols-outlined text-[12px]">add_photo_alternate</span>
                      <span>Ganti Foto Galeri</span>
                    </button>
                  </div>
                </div>

                {onRequestDeleteAccount && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onRequestDeleteAccount(currentUser);
                    }}
                    className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-xl transition-colors cursor-pointer shrink-0"
                    title="Hapus Akun Ini & Seluruh Data Toko"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                )}
              </div>

              {/* List of registered accounts */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-on-surface">Pilih / Ganti Akun Google Toko:</span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className="text-[11px] font-bold text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">add_circle</span>
                    <span>Tambah Toko</span>
                  </button>
                </div>

                <div className="flex flex-col gap-1.5 max-h-52 overflow-y-auto no-scrollbar">
                  {accounts.map((acc) => {
                    const isActive = acc.email.toLowerCase() === currentUser.email.toLowerCase();
                    return (
                      <div
                        key={acc.id}
                        className={`p-2.5 rounded-xl flex items-center justify-between text-left transition-all border ${
                          isActive
                            ? 'bg-primary/10 border-primary text-primary font-bold shadow-xs'
                            : 'bg-surface-container-lowest border-surface-container hover:bg-surface-container-low text-on-surface'
                        }`}
                      >
                        <div
                          onClick={() => handleSelectAccount(acc)}
                          className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
                        >
                          <img
                            src={acc.picture}
                            alt={acc.name}
                            className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-semibold truncate text-on-surface">{acc.name}</p>
                              {isActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              )}
                            </div>
                            <p className="text-[10px] text-on-surface-variant font-mono truncate">{acc.email}</p>
                            <p className="text-[10px] text-slate-500 truncate">{acc.storeName || 'Toko'}</p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5">
                          {!isActive ? (
                            <button
                              type="button"
                              onClick={() => handleSelectAccount(acc)}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-on-surface cursor-pointer"
                            >
                              Pilih
                            </button>
                          ) : (
                            <span className="text-[11px] font-bold text-primary flex items-center gap-0.5 px-1.5">
                              <span className="material-symbols-outlined text-[15px]">check_circle</span>
                              <span>Dipakai</span>
                            </span>
                          )}

                          {onRequestDeleteAccount && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                                onRequestDeleteAccount(acc);
                              }}
                              className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-lg cursor-pointer transition-colors"
                              title={`Hapus Akun ${acc.email}`}
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: MASUK (LOGIN) */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">login</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-on-surface">Masuk ke Toko Anda</h4>
                  <p className="text-[11px] text-on-surface-variant">Gunakan email Google yang sudah terdaftar</p>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-on-surface-variant font-semibold block mb-1">
                  Email Google Toko:
                </label>
                <input
                  type="email"
                  required
                  autoFocus
                  placeholder="contoh: manajemeninovasi19@gmail.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container focus:outline-hidden focus:border-primary font-mono"
                />
              </div>

              <div className="text-[11px] text-on-surface-variant bg-surface-container-lowest p-2.5 rounded-xl border border-surface-container flex items-start gap-1.5">
                <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">info</span>
                <span>
                  Jika email sudah terdaftar, seluruh transaksi, produk, dan saldo toko Anda akan langsung dimuat kembali secara otomatis.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-dim transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Masuk Sekarang</span>
              </button>
            </form>
          )}

          {/* TAB 3: DAFTAR BARU (REGISTER) */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">store</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-on-surface">Daftar Akun Toko Baru</h4>
                  <p className="text-[11px] text-on-surface-variant">Buka ruang toko terpisah (Multi-Tenant mulai bersih)</p>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-on-surface-variant font-semibold block mb-1">
                  Email Google Pemilik:
                </label>
                <input
                  type="email"
                  required
                  placeholder="toko.baru@gmail.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container focus:outline-hidden focus:border-primary font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-on-surface-variant font-semibold block mb-1">
                    Nama Pemilik:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Rian"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container focus:outline-hidden focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-on-surface-variant font-semibold block mb-1">
                    Nama Toko:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Toko Berkah 2"
                    value={regStoreName}
                    onChange={(e) => setRegStoreName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container focus:outline-hidden focus:border-primary"
                  />
                </div>
              </div>

              <div className="text-[11px] text-on-surface-variant bg-surface-container-lowest p-2.5 rounded-xl border border-surface-container flex items-start gap-1.5">
                <span className="material-symbols-outlined text-emerald-600 text-[16px] shrink-0 mt-0.5">check_circle</span>
                <span>
                  Ruang toko baru akan dibuat bersih mandiri dengan katalog produk awal dan saldo laci kasir Rp 0.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-dim transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">add_business</span>
                <span>Daftar &amp; Buka Ruang Toko</span>
              </button>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-surface-container flex justify-between items-center text-xs">
          <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-emerald-600">lock</span>
            <span>Data Toko Terisolasi Mandiri</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-low cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
