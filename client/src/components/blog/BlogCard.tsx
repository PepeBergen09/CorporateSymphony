import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import type { Post } from "@db/schema";

interface BlogCardProps {
  post: Post & { author: { username: string } };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {post.author.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {post.author.username}
            </span>
          </div>
          <time className="text-sm text-muted-foreground">
            {format(new Date(post.createdAt), "MMM d, yyyy")}
          </time>
        </div>
        <h3 className="text-xl font-semibold leading-tight hover:text-primary cursor-pointer">
          {post.title}
        </h3>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{post.content}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <Badge variant="secondary">Blog</Badge>
          {!post.published && (
            <Badge variant="outline" className="ml-2">
              Draft
            </Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
