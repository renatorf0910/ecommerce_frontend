import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Contact from "./pages/contact/Contact";
import Header from "./pages/header/Header";
import Footer from "./pages/footer/Footer";
import EditProfile from "./pages/user/EditProfile";
import { Chat } from "./chat/Chat";
import OwnerProducts from "./pages/products/OwnerProducts";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);
  const showHeaderFooter = isLoggedIn;

  return (
    <div className="flex flex-col min-h-screen">
      {showHeaderFooter && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/myownproducts" element={<OwnerProducts />} />
        </Routes>
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
