
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PostSkeleton = () => {
  return (
    <Card className="mb-4 animate-pulse">
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-11/12 mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <Skeleton className="h-[200px] w-full rounded-md" />
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <div className="flex space-x-4 w-full">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostSkeleton;
