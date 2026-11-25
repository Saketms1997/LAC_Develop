/*
 * Demo-grade admin gate. The password is checked in the browser, so it only keeps casual
 * visitors out. Before going live, replace this with real server-side authentication.
 * Set VITE_ADMIN_PASSWORD in a .env file to change the password.
 */
const SESSION_KEY = 'ps_admin_session';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

export const login = (password) => {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, '1');
    return true;
  }
  return false;
};

export const logout = () => sessionStorage.removeItem(SESSION_KEY);

export const isAuthenticated = () => sessionStorage.getItem(SESSION_KEY) === '1';
