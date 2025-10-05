import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  fullWidth?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export default function SearchInput({
  placeholder,
  fullWidth = false,
  value,
  onChange,
}: SearchInputProps) {
  return (
    <div className={`relative ${fullWidth ? "w-full" : "w-auto"}`}>
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder || "Search..."}
        className={`rounded-md py-2 pr-4 pl-9 focus-visible:ring-1 focus-visible:ring-blue-500 ${
          fullWidth ? "w-full" : "w-auto"
        }`}
      />
    </div>
  );
}
