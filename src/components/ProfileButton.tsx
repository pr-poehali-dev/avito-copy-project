import { useState } from "react";
import { User } from "lucide-react";
import AuthModal from "./auth/AuthModal";

const ProfileButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("videoVerified") === "true";
  });

  const handleLogin = () => {
    setActiveTab("login");
    setIsModalOpen(true);
  };

  const handleRegister = () => {
    setActiveTab("register");
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("videoVerified");
    localStorage.removeItem("isRegistered");
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="relative group">
        <button className="flex items-center text-gray-700">
          <User className="h-5 w-5" />
          <span className="ml-1 text-sm hidden md:inline">Профиль</span>
        </button>
        
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
          {isLoggedIn ? (
            <div className="py-1">
              <span className="block px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                Мой профиль
              </span>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Мои объявления
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Настройки
              </a>
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Выйти
              </button>
            </div>
          ) : (
            <div className="py-1">
              <button
                onClick={handleLogin}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Вход
              </button>
              <button
                onClick={handleRegister}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Регистрация
              </button>
            </div>
          )}
        </div>
      </div>
      
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultTab={activeTab}
      />
    </>
  );
};

export default ProfileButton;
