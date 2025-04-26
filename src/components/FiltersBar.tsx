import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";

const FiltersBar = () => {
  return (
    <div className="bg-avito-gray py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="outline" 
            className="bg-white border-avito-border flex items-center text-gray-700"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Фильтры
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-white border-avito-border text-gray-700"
          >
            Цена
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-white border-avito-border text-gray-700"
          >
            Район
          </Button>
          
          <div className="ml-auto flex items-center">
            <span className="text-sm text-gray-500 mr-2 hidden md:inline">Сортировка:</span>
            <select className="avito-input py-1 px-2 text-sm">
              <option>По умолчанию</option>
              <option>Дешевле</option>
              <option>Дороже</option>
              <option>По дате</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;
