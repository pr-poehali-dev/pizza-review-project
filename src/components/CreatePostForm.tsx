
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ImagePlus, X } from "lucide-react";

interface CreatePostFormProps {
  onPostCreated?: () => void;
}

const CreatePostForm = ({ onPostCreated }: CreatePostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Просмотр выбранных изображений (в реальном приложении здесь был бы загрузчик)
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages(prev => [...prev, e.target!.result as string]);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Заголовок не может быть пустым",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Здесь будет API-запрос для создания поста
      console.log("Данные поста:", { title, content, images });
      
      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Пост создан!",
        description: "Ваш пост успешно опубликован.",
      });
      
      // Сброс формы
      setTitle("");
      setContent("");
      setImages([]);
      
      // Опционально вызов колбэка
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка публикации",
        description: "Не удалось опубликовать пост. Пожалуйста, попробуйте позже.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Заголовок</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок поста"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Содержание</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Опишите вашу историю, задайте вопрос или поделитесь чем-то интересным..."
              rows={5}
              disabled={isSubmitting}
            />
          </div>
          
          {images.length > 0 && (
            <div className="space-y-2">
              <Label>Прикрепленные изображения</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative group rounded-md overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Preview ${index}`} 
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <Label 
              htmlFor="image-upload" 
              className="flex items-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-md cursor-pointer transition"
            >
              <ImagePlus size={16} />
              <span>Добавить изображение</span>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                disabled={isSubmitting}
              />
            </Label>
            
            <Button 
              type="submit" 
              disabled={isSubmitting || !title.trim()}
              className="ml-auto"
            >
              {isSubmitting ? "Публикация..." : "Опубликовать"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
