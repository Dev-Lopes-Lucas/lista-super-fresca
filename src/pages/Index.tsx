
import GroceryList from "@/components/GroceryList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-grocery-lightGreen/40">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-grocery-green mb-3 drop-shadow-sm">
            Lista Super Fresca
          </h1>
          <p className="text-gray-600 text-lg">Organize sua lista de compras de forma simples e prática</p>
        </header>
        <main>
          <GroceryList />
        </main>
      </div>
    </div>
  );
};

export default Index;
