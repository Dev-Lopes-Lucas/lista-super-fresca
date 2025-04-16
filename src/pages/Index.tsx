
import GroceryList from "@/components/GroceryList";

const Index = () => {
  return (
    <div className="min-h-screen bg-grocery-bg">
      <div className="container mx-auto px-4 py-10">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-grocery-text mb-2">
            Lista Super Fresca
          </h1>
          <p className="text-gray-500">Organize sua lista de compras de forma simples e prática</p>
        </header>
        <main>
          <GroceryList />
        </main>
      </div>
    </div>
  );
};

export default Index;
