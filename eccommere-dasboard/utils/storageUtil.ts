export const setToken = (token: string) => localStorage.setItem("TOKEN", token);
export const getToken = () => localStorage.getItem("TOKEN");
export const removeToken = () => localStorage.removeItem("TOKEN");

export const setUser = (user: any) =>
  localStorage.setItem("USER", JSON.stringify(user));
export const getUser = () => JSON.parse(localStorage.getItem("USER") ?? "");
export const removeUser = () => localStorage.removeItem("USER");
