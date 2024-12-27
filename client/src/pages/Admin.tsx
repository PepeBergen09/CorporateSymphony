import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import type { Post, Event } from "@db/schema";
import { useState } from "react";

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("blog");

  const { data: posts } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const { data: events } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const createPost = useMutation({
    mutationFn: async (data: Partial<Post>) => {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(await response.text());
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({ title: "Success", description: "Post created successfully" });
    },
  });

  const createEvent = useMutation({
    mutationFn: async (data: Partial<Event>) => {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(await response.text());
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Success", description: "Event created successfully" });
    },
  });

  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createPost.mutateAsync({
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      published: formData.get("published") === "on",
      slug: formData.get("title") as string,
    });
    e.currentTarget.reset();
  };

  const handleEventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createEvent.mutateAsync({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: new Date(formData.get("date") as string).toISOString(),
      location: formData.get("location") as string,
      published: formData.get("published") === "on",
    });
    e.currentTarget.reset();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="blog">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <Input name="title" placeholder="Post Title" required />
                <Textarea
                  name="content"
                  placeholder="Post Content"
                  className="min-h-[200px]"
                  required
                />
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="published" />
                  <span>Publish immediately</span>
                </label>
                <Button type="submit" disabled={createPost.isPending}>
                  {createPost.isPending ? "Creating..." : "Create Post"}
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Existing Posts</h2>
              <div className="space-y-4">
                {posts?.map((post) => (
                  <div key={post.id} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {post.published ? "Published" : "Draft"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Create New Event</h2>
              <form onSubmit={handleEventSubmit} className="space-y-4">
                <Input name="title" placeholder="Event Title" required />
                <Textarea
                  name="description"
                  placeholder="Event Description"
                  className="min-h-[200px]"
                  required
                />
                <Input name="location" placeholder="Event Location" required />
                <Input
                  type="datetime-local"
                  name="date"
                  required
                />
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="published" />
                  <span>Publish immediately</span>
                </label>
                <Button type="submit" disabled={createEvent.isPending}>
                  {createEvent.isPending ? "Creating..." : "Create Event"}
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Existing Events</h2>
              <div className="space-y-4">
                {events?.map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.published ? "Published" : "Draft"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
