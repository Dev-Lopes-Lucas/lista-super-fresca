
import { useState, useRef, FormEvent, useEffect } from "react";
import { PlusCircle, ShoppingBag } from "lucide-react";
import GroceryItem from "./GroceryItem";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GroceryItem {
  id: number;
  text: string;
  completed: boolean;
}

const GroceryList = () => {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Carrega itens do localStorage quando o componente monta
  useEffect(() => {
    const savedItems = localStorage.getItem("groceryItems");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Salva itens no localStorage quando há mudanças
  useEffect(() => {
    localStorage.setItem("groceryItems", JSON.stringify(items));
  }, [items]);

  const handleAddItem = (e: FormEvent) => {
    e.preventDefault();
    
    if (!newItem.trim()) return;
    
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: newItem.trim(),
        completed: false,
      },
    ]);
    setNewItem("");
    inputRef.current?.focus();
  };

  const handleCompleteItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDeleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
        <form onSubmit={handleAddItem} className="flex gap-3 mb-8">
          <Input
            ref={inputRef}
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Adicionar item à lista..."
            className="flex-grow border-gray-200 rounded-xl focus:ring-grocery-green focus:border-grocery-green"
            autoComplete="off"
          />
          <Button
            type="submit"
            disabled={!newItem.trim()}
            className={cn(
              "gap-2 px-5 rounded-xl transition-all duration-200 transform hover:scale-105",
              newItem.trim()
                ? "bg-grocery-green hover:bg-green-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            <PlusCircle size={18} />
            <span>Adicionar</span>
          </Button>
        </form>

        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-xl border border-gray-100">
              <ShoppingBag size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-center">Sua lista está vazia. Adicione itens acima!</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between text-sm mb-3 px-2 text-gray-600">
                <span className="font-medium">Total: {items.length} itens</span>
                <span className="font-medium">
                  Concluídos: {items.filter((item) => item.completed).length}
                </span>
              </div>
              {items.map((item) => (
                <GroceryItem
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  completed={item.completed}
                  onComplete={handleCompleteItem}
                  onDelete={handleDeleteItem}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroceryList;
