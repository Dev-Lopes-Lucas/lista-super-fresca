
import { Check, Trash2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface GroceryItemProps {
  id: number;
  text: string;
  completed: boolean;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const GroceryItem = ({ id, text, completed, onComplete, onDelete }: GroceryItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow-sm hover:shadow transition-all">
      <span className={cn("text-grocery-text flex-grow", completed && "line-through text-gray-400")}>
        {text}
      </span>
      <div className="flex space-x-2">
        <button
          onClick={() => onComplete(id)}
          className={cn(
            "p-2 rounded-full transition-colors",
            completed ? "bg-gray-100 hover:bg-gray-200" : "bg-grocery-lightGreen hover:bg-green-100"
          )}
          aria-label={completed ? "Desfazer" : "Concluir"}
        >
          {completed ? (
            <RefreshCw size={18} className="text-gray-500" />
          ) : (
            <Check size={18} className="text-grocery-green" />
          )}
        </button>
        <button
          onClick={() => onDelete(id)}
          className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
          aria-label="Excluir"
        >
          <Trash2 size={18} className="text-grocery-red" />
        </button>
      </div>
    </div>
  );
};

export default GroceryItem;
