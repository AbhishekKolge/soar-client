import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "../../utils/helper";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

export const NavAction = (props) => {
  const { auth, onLogout } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-[60px] w-[60px] cursor-pointer">
          <AvatarImage
            className="object-cover"
            src={auth.profileImageUrl}
            alt={`@${auth.username}`}
          />
          <AvatarFallback className="uppercase">
            {getInitials(auth.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="grid gap-1">
          <span>{`Hey, ${auth.name}`}</span>
          <span className="text-xs text-slate-400">{`@${auth.username}`}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={ROUTES.profileSetting}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
