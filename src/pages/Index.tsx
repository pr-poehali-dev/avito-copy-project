import Header from "@/components/Header";
import Categories from "@/components/Categories";
import FiltersBar from "@/components/FiltersBar";
import AdGrid from "@/components/AdGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Categories />
      <main>
        <div className="bg-white py-4 border-b border-avito-border">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Объявления в России</h1>
            <p className="text-avito-darkgray">356 729 объявлений</p>
          </div>
        </div>
        
        <FiltersBar />
        <AdGrid />

        <div className="container mx-auto px-4 py-8 text-center">
          <button className="avito-button py-3 px-8">
            Показать еще
          </button>
        </div>
      </main>

      <footer className="bg-white border-t border-avito-border py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-gray-500">
            <p>© ООО «Авито» 2007–2025</p>
            <p className="mt-2">
              Использование сайта означает согласие с пользовательским соглашением и политикой конфиденциальности
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
