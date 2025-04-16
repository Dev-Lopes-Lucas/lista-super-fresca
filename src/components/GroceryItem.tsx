
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
    <div 
      className={cn(
        "flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:shadow-md",
        completed 
          ? "bg-gray-50 border border-gray-100" 
          : "bg-white border border-grocery-lightGreen shadow-sm"
      )}
    >
      <span 
        className={cn(
          "text-grocery-text flex-grow pl-2 transition-all duration-200", 
          completed 
            ? "line-through text-gray-400" 
            : "text-gray-700 font-medium"
        )}
      >
        {text}
      </span>
      <div className="flex space-x-2">
        <button
          onClick={() => onComplete(id)}
          className={cn(
            "p-2 rounded-full transition-all duration-200 transform hover:scale-110",
            completed 
              ? "bg-gray-100 hover:bg-gray-200" 
              : "bg-grocery-lightGreen hover:bg-green-100"
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
          className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition-all duration-200 transform hover:scale-110"
          aria-label="Excluir"
        >
          <Trash2 size={18} className="text-grocery-red" />
        </button>
      </div>
    </div>
  );
};

export default GroceryItem;
