import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import {
  FiEdit2,
  FiLogOut,
  FiShoppingCart,
  FiUser,
  FiBell,
  FiMenu,
  FiSearch,
  FiHeart,
  FiPackage,
  FiBarChart,
  FiPlusCircle,
} from "react-icons/fi";

export default function Header() {
  const [username, setUsername] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Mock: quantidade de itens no carrinho
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUsername(null);
      return;
    }

    api
      .get("user/profile/")
      .then((res) => setUsername(res.data.username))
      .catch(() => {
        setUsername(null);
        localStorage.removeItem("token");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <header className="w-full bg-white shadow p-4 flex items-center justify-between relative z-30">

      <a href="/" className="flex items-center text-2xl font-extrabold text-indigo-700 hover:text-indigo-800">
        <img src="/images/rounin.png" alt="logo" className="w-14" />
        <span className="ml-2">Rounin</span>
      </a>

      <div className="hidden md:flex flex-1 max-w-xl mx-6">
        <input
          type="text"
          placeholder="Buscar produtos, marcas e muito mais..."
          className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-r-md transition">
          <FiSearch size={20} />
        </button>
      </div>

      <nav className="hidden md:flex items-center space-x-6">

        <a
          href="/favorites"
          className="flex items-center text-gray-700 hover:text-indigo-600 transition space-x-1"
        >
          <FiHeart size={20} />
          <span className="text-sm">Favoritos</span>
        </a>

        <a
          href="/orders"
          className="flex items-center text-gray-700 hover:text-indigo-600 transition space-x-1"
        >
          <FiPackage size={20} />
          <span className="text-sm">Meus Pedidos</span>
        </a>

        <a
          href="/cart"
          className="relative flex items-center text-gray-700 hover:text-indigo-600 transition"
        >
          <FiShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-3 bg-red-600 text-white text-xs rounded-full px-2">
              {cartCount}
            </span>
          )}
        </a>

        {/* <a
          href="/sell"
          className="flex items-center space-x-1 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold px-3 py-1 rounded-md transition"
        >
          <FiPlusCircle size={20} />
          <span>Vender</span>
        </a> */}


        <button
          aria-label="Notificações"
          className="relative text-gray-700 hover:text-indigo-600 transition"
        >
          <FiBell size={22} />
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
            23
          </span>
        </button>

        {username ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-4 focus:outline-none"
            >
              <span className="text-gray-900 font-semibold">Bem vindo, {capitalizeFirstLetter(username)}</span>
              <img
                src={`https://ui-avatars.com/api/?name=${username}&background=4F46E5&color=fff&rounded=true`}
                alt="User avatar"
                className="w-8 h-8 rounded-full"
              />
            </button>

            {showDropdown && (
              <div
                className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-20 animate-fadeIn transition-all duration-200"
              >
                <a
                  href="/profile/edit"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                  onClick={() => setShowDropdown(false)}
                >
                  <FiEdit2 className="mr-2" /> Editar Perfil
                </a>
                <a
                  href="/orders"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                  onClick={() => setShowDropdown(false)}
                >
                  <FiPackage className="mr-2" /> Meus Pedidos
                </a>
                <a
                  href="/myownproducts"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                  onClick={() => setShowDropdown(false)}
                >
                  <FiPlusCircle className="mr-2" /> Minhas vendas
                </a>
                <a href="/contact"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                  onClick={() => setShowDropdown(false)}
                >
                  <FiBarChart className="mr-2" />Contato
                </a>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                >
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </div>
            )}

          </div>
        ) : (
          <>
            <a href="/login">
              <Button variant="outline">Login</Button>
            </a>
            <a href="/register">
              <Button>Register</Button>
            </a>
          </>
        )}
      </nav>

      <button
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="md:hidden text-gray-700 hover:text-indigo-600 transition focus:outline-none"
        aria-label="Abrir menu"
      >
        <FiMenu size={28} />
      </button>

      {showMobileMenu && (
        <div
          className="absolute top-full left-0 w-full bg-white shadow-lg border-t md:hidden z-40 transform transition-all duration-300 ease-out animate-slideDown"
        >
          <nav className="flex flex-col p-4 space-y-4 text-gray-700">
            <a href="/" className="font-semibold hover:text-indigo-600 transition">Home</a>
            <a href="/contact" className="hover:text-indigo-600 transition">Contato</a>
            <a href="/favorites" className="hover:text-indigo-600 flex items-center space-x-2 transition">
              <FiHeart /> <span>Favoritos</span>
            </a>
            <a href="/orders" className="hover:text-indigo-600 flex items-center space-x-2 transition">
              <FiPackage /> <span>Meus Pedidos</span>
            </a>
            <a href="/cart" className="hover:text-indigo-600 flex items-center space-x-2 transition">
              <FiShoppingCart /> <span>Carrinho ({cartCount})</span>
            </a>
            <a href="/sell" className="hover:text-indigo-600 flex items-center space-x-2 transition">
              <FiPlusCircle /> <span>Vender</span>
            </a>
            {username ? (
              <>
                <a href="/profile/edit" className="hover:text-indigo-600 flex items-center space-x-2 transition">
                  <FiEdit2 /> <span>Editar Perfil</span>
                </a>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowMobileMenu(false);
                  }}
                  className="text-left hover:text-indigo-600 flex items-center space-x-2 transition"
                >
                  <FiLogOut /> <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="hover:text-indigo-600 transition">Login</a>
                <a href="/register" className="hover:text-indigo-600 transition">Registrar</a>
              </>
            )}
          </nav>
        </div>
      )}

    </header>
  );
}