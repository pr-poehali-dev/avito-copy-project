import AdCard from "./AdCard";

const ads = [
  {
    id: 1,
    title: "iPhone 13 Pro Max 256GB Sierra Blue",
    price: "79 900 ₽",
    location: "Москва",
    date: "Сегодня, 12:45",
    imageUrl: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    isVip: true
  },
  {
    id: 2,
    title: "Macbook Pro 14 M1 Pro 16GB/512GB",
    price: "159 000 ₽",
    location: "Санкт-Петербург",
    date: "Вчера, 19:23",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 3,
    title: "Sony PlayStation 5 Disc Edition",
    price: "45 999 ₽",
    location: "Екатеринбург",
    date: "22 апреля, 10:17",
    imageUrl: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 4,
    title: "Велосипед горный Trek Marlin 7",
    price: "79 990 ₽",
    location: "Краснодар",
    date: "21 апреля, 15:30",
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 5,
    title: "2-комнатная квартира, 54 м², 7/16 эт.",
    price: "8 500 000 ₽",
    location: "Новосибирск",
    date: "20 апреля, 09:12",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    isVip: true
  },
  {
    id: 6,
    title: "Nintendo Switch OLED + 2 игры",
    price: "32 500 ₽",
    location: "Казань",
    date: "20 апреля, 08:45",
    imageUrl: "https://images.unsplash.com/photo-15783035120e7854f70ea9ed98421737?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 7,
    title: "Кроссовки Nike Air Force 1, размер 42",
    price: "6 900 ₽",
    location: "Ростов-на-Дону",
    date: "19 апреля, 17:56",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 8,
    title: "Кухонный гарнитур ИКЕА, 2.5 метра",
    price: "65 000 ₽",
    location: "Омск",
    date: "19 апреля, 14:22",
    imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
  }
];

const AdGrid = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ads.map((ad) => (
          <AdCard key={ad.id} {...ad} />
        ))}
      </div>
    </div>
  );
};

export default AdGrid;
