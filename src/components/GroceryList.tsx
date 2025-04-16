
import { useState, useRef, FormEvent, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import GroceryItem from "./GroceryItem";
import { cn } from "@/lib/utils";

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
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleAddItem} className="flex gap-2 mb-6">
        <input
          ref={inputRef}
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Adicionar item à lista..."
          className="flex-grow p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-grocery-green focus:border-transparent"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!newItem.trim()}
          className={cn(
            "flex items-center justify-center px-4 rounded-lg transition-colors",
            newItem.trim()
              ? "bg-grocery-green text-white hover:bg-green-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          )}
        >
          <PlusCircle size={20} className="mr-1" />
          <span>Adicionar</span>
        </button>
      </form>

      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="text-center p-6 bg-white rounded-lg">
            <p className="text-gray-500">Sua lista está vazia. Adicione itens acima!</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between text-sm mb-2 px-2">
              <span>Total: {items.length} itens</span>
              <span>
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
  );
};

export default GroceryList;
