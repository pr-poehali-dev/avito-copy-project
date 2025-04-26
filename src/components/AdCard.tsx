import { Heart } from "lucide-react";

interface AdCardProps {
  id: number;
  title: string;
  price: string;
  location: string;
  date: string;
  imageUrl: string;
  isVip?: boolean;
}

const AdCard = ({ id, title, price, location, date, imageUrl, isVip }: AdCardProps) => {
  return (
    <div className="avito-card">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-2 right-2 bg-white p-1 rounded-full">
          <Heart className="h-5 w-5 text-gray-400 hover:text-avito-red" />
        </button>
        {isVip && (
          <div className="absolute top-2 left-2 bg-avito-orange text-white text-xs px-2 py-1 rounded">
            VIP
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-lg mb-1 line-clamp-2">{title}</h3>
        <p className="font-bold text-xl mb-2">{price}</p>
        <div className="flex justify-between text-xs text-avito-darkgray">
          <span>{location}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
