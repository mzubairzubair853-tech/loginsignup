import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("loggedInUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  function signup(name, email, password) {
    const users = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((item) => item.email === normalizedEmail)) {
      return {
        success: false,
        message: "This email is already registered.",
      };
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    users.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      })
    );

    return { success: true };
  }

  function login(email, password) {
    const users = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    const normalizedEmail = email.trim().toLowerCase();

    const foundUser = users.find(
      (item) =>
        item.email === normalizedEmail &&
        item.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Incorrect email or password.",
      };
    }

    const loggedInUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    };

    setUser(loggedInUser);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    return { success: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}