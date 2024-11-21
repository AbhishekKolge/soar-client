import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="relative">
      <SearchIcon
        stroke="#718EBF"
        className="absolute top-1/2 left-[25px] transform -translate-y-1/2"
      />
      <Input
        className="rounded-full pl-[60px] lg:rounded-full bg-secondary border-secondary"
        placeholder="Search for something"
      />
    </div>
  );
};

export default Search;
