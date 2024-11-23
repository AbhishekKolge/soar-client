import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Search = (props) => {
  const { className } = props;
  return (
    <div className={cn("w-full lg:w-auto relative", className)}>
      <SearchIcon
        stroke="#718EBF"
        className="absolute top-1/2 left-[19px] w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] transform -translate-y-1/2"
      />
      <Input
        className="rounded-full lg:rounded-full text-[13px] lg:text-[15px] h-[40px] lg:h-[50px] lg:w-[255px] pl-[45px] lg:pl-[50px] pr-[30px] lg:pr-[40px] bg-secondary border-secondary"
        placeholder="Search for something"
      />
    </div>
  );
};

export default Search;
