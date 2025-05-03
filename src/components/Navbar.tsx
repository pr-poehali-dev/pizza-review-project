
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Bell, PlusSquare, Home, Trending, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // В будущем будет заменено на реальную аутентификацию

  return (
    <div className="border-b fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950">
      <div className="container flex items-center justify-between py-2">
        {/* Лого */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-primary">RedditClone</h1>
        </div>

        {/* Поиск */}
        <div className="hidden md:flex relative max-w-sm w-full mx-4">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Поиск постов..." 
            className="pl-8"
          />
        </div>

        {/* Навигация */}
        <div className="flex items-center space-x-1">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Home className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Trending className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Users className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="primary" size="sm" className="hidden sm:flex">
                <PlusSquare className="h-4 w-4 mr-2" />
                Создать пост
              </Button>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="px-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>ЮК</AvatarFallback>
                      </Avatar>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-1 p-2">
                        <li>
                          <NavigationMenuLink asChild>
                            <Button variant="ghost" className="w-full justify-start">
                              Профиль
                            </Button>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Button variant="ghost" className="w-full justify-start">
                              Настройки
                            </Button>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Button variant="ghost" className="w-full justify-start text-destructive" onClick={() => setIsLoggedIn(false)}>
                              Выйти
                            </Button>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" className="mr-2" onClick={() => setIsLoggedIn(true)}>
                Войти
              </Button>
              <Button size="sm">
                Регистрация
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
