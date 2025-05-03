
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCardProps {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorImage?: string;
  timeAgo: string;
  likesCount: number;
  commentsCount: number;
  images?: string[];
}

const PostCard = ({
  id,
  title,
  content,
  authorName,
  authorImage,
  timeAgo,
  likesCount,
  commentsCount,
  images = [],
}: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likesCount);

  const handleLike = () => {
    // В будущем здесь будет API-запрос
    if (liked) {
      setCurrentLikes(prev => prev - 1);
    } else {
      setCurrentLikes(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={authorImage} />
            <AvatarFallback>{authorName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{authorName}</p>
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="mb-4">{content}</p>
        
        {images.length > 0 && (
          <div className="relative rounded-md overflow-hidden bg-muted">
            <img 
              src={images[0]} 
              alt={title} 
              className="w-full h-auto object-cover max-h-[400px]"
            />
            {images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-background/80 rounded-full px-2 py-1 text-xs">
                +{images.length - 1}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 pb-4 flex justify-between">
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
            onClick={handleLike}
          >
            <Heart className={cn("h-4 w-4", liked && "fill-red-500 text-red-500")} />
            <span>{currentLikes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{commentsCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <Share className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSaved(!saved)}
        >
          <Bookmark className={cn("h-4 w-4", saved && "fill-primary text-primary")} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
