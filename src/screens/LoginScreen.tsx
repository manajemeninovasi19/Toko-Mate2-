import React, { useState } from 'react';
import { UserAccount } from '../types';
import {
  getRegisteredAccounts,
  loginGoogleAccount,
  createGoogleAccount,
  loginUser,
  DEFAULT_USER,
} from '../services/authService';

interface LoginScreenProps {
  onLoginSuccess: (user: UserAccount) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const registeredAccounts = getRegisteredAccounts();

  const handleEmailPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Masukkan alamat email yang valid.');
      return;
    }

    if (!password || password.length < 4) {
      setErrorMsg('Password minimal 4 karakter.');
      return;
    }

    if (isSignUp) {
      // Register new user
      const newUser = createGoogleAccount(
        email,
        name || undefined,
        storeName || undefined
      );
      loginUser(newUser);
      onLoginSuccess(newUser);
    } else {
      // Sign in
      const { user } = loginGoogleAccount(email);
      loginUser(user);
      onLoginSuccess(user);
    }
  };

  const handleContinueWithGoogle = (targetEmail?: string) => {
    const emailToUse = targetEmail || email || DEFAULT_USER.email;
    const { user } = loginGoogleAccount(emailToUse);
    loginUser(user);
    setIsGoogleModalOpen(false);
    onLoginSuccess(user);
  };

  const handleFillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('tokomate123');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-[#f8fafc] sm:bg-[#f1f5f9]">
      {/* Main Login Card matching user reference design */}
      <div className="max-w-[400px] w-full bg-white rounded-3xl p-7 sm:p-9 shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-100 flex flex-col items-center animate-fadeIn relative">
        {/* Top Logo Badge */}
        <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm ring-4 ring-slate-100 mb-4 bg-white flex items-center justify-center p-0.5 border border-slate-200 shrink-0">
          <img
            src="/tokomate-logo.jpeg"
            alt="TokoMate Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl font-extrabold text-[#0f172a] tracking-tight text-center">
          {isSignUp ? 'Create your Account' : 'Welcome to TokoMate'}
        </h1>
        <p className="text-xs text-slate-500 font-medium text-center mt-1 mb-6">
          {isSignUp ? 'Sign up to start managing your store' : 'Sign in to continue'}
        </p>

        {/* Error Alert */}
        {errorMsg && (
          <div className="w-full mb-4 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-[16px]">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Continue with Google Button */}
        <button
          type="button"
          onClick={() => {
            if (registeredAccounts.length > 1) {
              setIsGoogleModalOpen(true);
            } else {
              handleContinueWithGoogle();
            }
          }}
          className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] transition-all text-slate-700 font-semibold text-xs flex items-center justify-center gap-2.5 shadow-2xs cursor-pointer select-none"
        >
          {/* Multi-colored Google G Icon */}
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider: OR */}
        <div className="w-full flex items-center my-5">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="px-3 text-[11px] font-bold text-slate-400 tracking-wider">OR</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleEmailPasswordSubmit} className="w-full flex flex-col gap-3.5">
          {/* Sign Up extra fields */}
          {isSignUp && (
            <>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Nama Pemilik
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 material-symbols-outlined text-[17px]">
                    person
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Nama Toko
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 material-symbols-outlined text-[17px]">
                    storefront
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Toko Berkah Jaya"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-slate-50/50"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 material-symbols-outlined text-[17px]">
                mail
              </span>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-slate-50/50 font-mono"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 material-symbols-outlined text-[17px]">
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-slate-50/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[17px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-xl bg-[#0f172a] hover:bg-slate-800 active:scale-[0.98] transition-all text-white font-bold text-xs shadow-md cursor-pointer select-none"
          >
            {isSignUp ? 'Create Account' : 'Sign in'}
          </button>
        </form>

        {/* Footer Links */}
        <div className="w-full flex items-center justify-between text-[11px] mt-5 text-slate-500 font-medium">
          {!isSignUp ? (
            <>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
              <div>
                Need an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(true);
                    setErrorMsg('');
                  }}
                  className="font-bold text-slate-900 hover:underline cursor-pointer"
                >
                  Sign up
                </button>
              </div>
            </>
          ) : (
            <div className="w-full text-center">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setErrorMsg('');
                }}
                className="font-bold text-slate-900 hover:underline cursor-pointer ml-1"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Demo Account Quick Pill for convenience */}
      <div className="mt-4 flex flex-col items-center gap-1.5 text-center">
        <p className="text-[11px] text-slate-500 font-medium">
          Pintasan Masuk Cepat:
        </p>
        <button
          type="button"
          onClick={() => handleFillDemo(DEFAULT_USER.email)}
          className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400 text-xs font-semibold shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Isi Otomatis: <strong className="font-mono text-slate-800">{DEFAULT_USER.email}</strong></span>
        </button>
      </div>

      {/* Google Account Selector Modal (if Continue with Google clicked and multiple exist) */}
      {isGoogleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <h3 className="text-xs font-bold text-slate-800">Pilih Akun Google Toko</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsGoogleModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 my-2.5">
              Pilih akun yang ingin Anda gunakan untuk mengelola kasir dan toko:
            </p>

            <div className="flex flex-col gap-2 max-h-56 overflow-y-auto no-scrollbar">
              {registeredAccounts.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => handleContinueWithGoogle(acc.email)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all text-left flex items-center gap-3 cursor-pointer"
                >
                  <img
                    src={acc.picture}
                    alt={acc.name}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-800 truncate">{acc.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono truncate">{acc.email}</p>
                    <p className="text-[10px] text-emerald-700 font-semibold truncate">{acc.storeName || 'Toko'}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setIsGoogleModalOpen(false);
                setIsSignUp(true);
              }}
              className="w-full mt-3 py-2 rounded-xl border border-dashed border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              + Gunakan Akun Google Lainnya
            </button>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 text-center">
            <div className="w-11 h-11 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2.5">
              <span className="material-symbols-outlined text-[24px]">lock_reset</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Pemulihan Akun Toko</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Aplikasi TokoMate menggunakan otentikasi Google &amp; Multi-Tenant mandiri. Anda dapat langsung masuk kembali menggunakan tombol <strong>Continue with Google</strong> atau masukkan alamat email Anda untuk mengakses data toko.
            </p>
            <button
              type="button"
              onClick={() => {
                setForgotModalOpen(false);
                handleContinueWithGoogle();
              }}
              className="w-full py-2.5 rounded-xl bg-[#0f172a] text-white text-xs font-bold shadow-md cursor-pointer mb-2"
            >
              Masuk dengan Akun Utama
            </button>
            <button
              type="button"
              onClick={() => setForgotModalOpen(false)}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
            >
              Kembali
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
