import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmptyPage from "./pages/EmptyPage";

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState("login");

  if (user) {
    return <EmptyPage />;
  }

  if (currentPage === "signup") {
    return (
      <Signup
        onLogin={() => setCurrentPage("login")}
      />
    );
  }

  return (
    <Login
      onSignup={() => setCurrentPage("signup")}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;