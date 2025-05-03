
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ImagePlus, X, Upload } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface CreatePostFormProps {
  onPostCreated?: () => void;
}

// Список категорий для постов
const CATEGORIES = [
  { value: "tech", label: "Технологии" },
  { value: "science", label: "Наука" },
  { value: "lifestyle", label: "Стиль жизни" },
  { value: "travel", label: "Путешествия" },
  { value: "gaming", label: "Игры" },
  { value: "programming", label: "Программирование" },
  { value: "design", label: "Дизайн" },
  { value: "art", label: "Искусство" },
  { value: "other", label: "Другое" }
];

const CreatePostForm = ({ onPostCreated }: CreatePostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    // Имитация процесса загрузки
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        
        // Обработка файлов после загрузки
        Array.from(files).forEach(file => {
          const reader = new FileReader();
          
          reader.onload = (e) => {
            if (e.target?.result) {
              setImages(prev => [...prev, e.target!.result as string]);
            }
          };
          
          reader.readAsDataURL(file);
        });
      }
    }, 100);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-primary");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("border-primary");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-primary");
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setIsUploading(true);
      
      // Имитация процесса загрузки
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Обработка файлов после загрузки
          Array.from(e.dataTransfer.files).forEach(file => {
            if (file.type.startsWith("image/")) {
              const reader = new FileReader();
              
              reader.onload = (e) => {
                if (e.target?.result) {
                  setImages(prev => [...prev, e.target!.result as string]);
                }
              };
              
              reader.readAsDataURL(file);
            } else {
              toast({
                variant: "destructive",
                title: "Ошибка",
                description: "Можно загружать только изображения",
              });
            }
          });
        }
      }, 100);
    }
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
    
    if (!category) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Выберите категорию для поста",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Здесь будет API-запрос для создания поста
      console.log("Данные поста:", { title, content, category, images });
      
      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Пост создан!",
        description: "Ваш пост успешно опубликован.",
      });
      
      // Сброс формы
      setTitle("");
      setContent("");
      setCategory("");
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
            <Label htmlFor="category">Категория</Label>
            <Select 
              value={category} 
              onValueChange={setCategory}
              disabled={isSubmitting}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          
          {/* Зона drag-n-drop для изображений */}
          <div 
            className="border-2 border-dashed rounded-md p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition cursor-pointer"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm font-medium mb-1">Перетащите сюда изображения</p>
              <p className="text-xs text-muted-foreground mb-4">или нажмите для выбора</p>
              
              <Label 
                htmlFor="image-upload" 
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md cursor-pointer transition"
              >
                <ImagePlus size={16} />
                <span>Выбрать изображения</span>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isSubmitting || isUploading}
                />
              </Label>
            </div>
          </div>
          
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Загрузка изображений...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}
          
          {images.length > 0 && (
            <div className="space-y-2">
              <Label>Прикрепленные изображения ({images.length})</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative group rounded-md overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Preview ${index}`} 
                      className="w-full h-28 object-cover"
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
          
          <div className="flex items-center gap-4 pt-2">
            <Button 
              type="button" 
              variant="outline"
              disabled={isSubmitting || isUploading}
              onClick={() => {
                setTitle("");
                setContent("");
                setCategory("");
                setImages([]);
              }}
            >
              Отменить
            </Button>
            
            <Button 
              type="submit" 
              disabled={isSubmitting || isUploading || !title.trim() || !category}
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
