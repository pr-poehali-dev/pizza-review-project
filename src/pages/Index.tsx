
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import PostSkeleton from "@/components/PostSkeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, TrendingUp, Users, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Временные данные для демонстрации
const MOCK_POSTS = [
  {
    id: "1",
    title: "Невероятная находка в глубинах океана",
    content: "Ученые обнаружили новый вид морских существ на глубине 7000 метров. Эта находка может перевернуть наше представление о морской жизни и эволюции глубоководных организмов.",
    authorName: "МаринаБиолог",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    timeAgo: "2 часа назад",
    likesCount: 142,
    commentsCount: 23,
    images: ["https://images.unsplash.com/photo-1682686580391-615b1f28e330?q=80&w=1000"],
    category: "science"
  },
  {
    id: "2",
    title: "Как я создал свой первый веб-проект за выходные",
    content: "Делюсь опытом создания полноценного веб-приложения за один уикенд. Использовал React, Node.js и MongoDB. Получилось неидеально, но работает!",
    authorName: "КодерМакс",
    timeAgo: "5 часов назад",
    likesCount: 89,
    commentsCount: 15,
    images: [],
    category: "programming"
  },
  {
    id: "3",
    title: "Фотографии с поездки по Байкалу",
    content: "Недавно вернулся из путешествия по Байкалу. Невероятные виды, прозрачный лед и потрясающие закаты. Делюсь лучшими фотографиями.",
    authorName: "ФотоПутник",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",
    timeAgo: "1 день назад",
    likesCount: 213,
    commentsCount: 42,
    images: [
      "https://images.unsplash.com/photo-1551844931-7a24ef243a3d?q=80&w=1000",
      "https://images.unsplash.com/photo-1543363136-3fdb62e11be5?q=80&w=1000",
      "https://images.unsplash.com/photo-1548850174-76fb4ccfbb05?q=80&w=1000"
    ],
    category: "travel"
  }
];

const Index = () => {
  const [posts, setPosts] = useState<typeof MOCK_POSTS>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Имитируем загрузку данных с задержкой
    const timer = setTimeout(() => {
      setPosts(MOCK_POSTS);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Сайдбар */}
          <div className="hidden md:block md:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <h3 className="font-bold mb-3">Популярные темы</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                    #технологии
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                    #дизайн
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                    #путешествия
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                    #наука
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                    #программирование
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Основной контент */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Лента постов</h1>
              <Button 
                onClick={() => navigate("/create-post")}
                className="flex items-center gap-2"
              >
                <PlusCircle size={16} />
                Создать пост
              </Button>
            </div>
          
            <Tabs defaultValue="home" className="mb-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="home" className="flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Главная</span>
                </TabsTrigger>
                <TabsTrigger value="trending" className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Популярное</span>
                </TabsTrigger>
                <TabsTrigger value="following" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Подписки</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="home" className="mt-4 space-y-4">
                {loading ? (
                  Array(3).fill(0).map((_, index) => (
                    <PostSkeleton key={index} />
                  ))
                ) : (
                  posts.map(post => (
                    <PostCard key={post.id} {...post} />
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="trending" className="mt-4">
                {loading ? (
                  Array(3).fill(0).map((_, index) => (
                    <PostSkeleton key={`trending-${index}`} />
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">Здесь будут популярные посты</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="following" className="mt-4">
                {loading ? (
                  Array(2).fill(0).map((_, index) => (
                    <PostSkeleton key={`following-${index}`} />
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">Здесь будут посты от тех, на кого вы подписаны</p>
                    <Button variant="outline" className="mt-4">
                      Найти интересных пользователей
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Правый сайдбар */}
          <div className="hidden md:block md:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <h3 className="font-bold mb-3">Создать пост</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Поделитесь своими мыслями или медиа с сообществом
                </p>
                <Button 
                  className="w-full"
                  onClick={() => navigate("/create-post")}
                >
                  Создать пост
                </Button>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <h3 className="font-bold mb-3">Популярные авторы</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://images.unsplash.com/photo-${1580000000000 + i * 1000}?q=80&w=100`} />
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">Пользователь {i}</span>
                      </div>
                      <Button size="sm" variant="ghost">
                        Подписаться
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
