
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CreatePostForm from "@/components/CreatePostForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CreatePost = () => {
  const navigate = useNavigate();
  
  const handlePostCreated = () => {
    // После создания поста перенаправляем на главную
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container pt-20 pb-10">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Создание нового поста</h1>
          </div>
          
          <CreatePostForm onPostCreated={handlePostCreated} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
