import { Car, Home, Smartphone, Briefcase, ShoppingBag, Baby, Sofa, Wrench } from "lucide-react";

const categories = [
  { name: "Транспорт", icon: <Car className="h-5 w-5" /> },
  { name: "Недвижимость", icon: <Home className="h-5 w-5" /> },
  { name: "Электроника", icon: <Smartphone className="h-5 w-5" /> },
  { name: "Работа", icon: <Briefcase className="h-5 w-5" /> },
  { name: "Услуги", icon: <Wrench className="h-5 w-5" /> },
  { name: "Личные вещи", icon: <ShoppingBag className="h-5 w-5" /> },
  { name: "Для дома и дачи", icon: <Sofa className="h-5 w-5" /> },
  { name: "Товары для детей", icon: <Baby className="h-5 w-5" /> }
];

const Categories = () => {
  return (
    <div className="bg-white border-b border-avito-border py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between overflow-x-auto">
          {categories.map((category, index) => (
            <a 
              key={index}
              href="#"
              className="flex flex-col items-center px-3 py-1 whitespace-nowrap text-gray-700 hover:text-avito-blue"
            >
              <div className="mb-1">{category.icon}</div>
              <span className="text-xs">{category.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
