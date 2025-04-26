import { Search, Heart, Bell, MessageSquare, Menu, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProfileButton from "./ProfileButton";

const Header = () => {
  return (
    <header className="bg-white border-b border-avito-border">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Menu className="mr-2 h-6 w-6 text-gray-500 md:hidden" />
            <h1 className="text-2xl font-bold text-avito-blue">Avito</h1>
          </div>

          {/* Location */}
          <div className="hidden md:flex items-center text-gray-700 mx-4">
            <MapPin className="h-4 w-4 mr-1 text-avito-blue" />
            <span className="text-sm">Москва</span>
          </div>

          {/* Search */}
          <div className="flex-1 mx-2 hidden md:block">
            <div className="relative">
              <Input 
                className="avito-input pr-10" 
                placeholder="Поиск по объявлениям" 
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center text-gray-700">
              <Heart className="h-5 w-5" />
              <span className="ml-1 text-sm">Избранное</span>
            </button>
            
            <button className="hidden md:flex items-center text-gray-700">
              <MessageSquare className="h-5 w-5" />
              <span className="ml-1 text-sm">Сообщения</span>
            </button>
            
            <button className="hidden md:flex items-center text-gray-700">
              <Bell className="h-5 w-5" />
              <span className="ml-1 text-sm">Уведомления</span>
            </button>
            
            <ProfileButton />
            
            <Button className="avito-button hidden md:block">
              Разместить объявление
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-2 md:hidden">
          <div className="relative">
            <Input 
              className="avito-input pr-10" 
              placeholder="Поиск по объявлениям" 
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
