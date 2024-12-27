import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import type { Event } from "@db/schema";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <h3 className="text-xl font-semibold leading-tight hover:text-primary cursor-pointer">
          {event.title}
        </h3>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          <time>{format(new Date(event.date), "MMMM d, yyyy 'at' h:mm a")}</time>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
        <p className="text-muted-foreground line-clamp-3">{event.description}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <Badge variant="secondary">Event</Badge>
          {!event.published && (
            <Badge variant="outline" className="ml-2">
              Draft
            </Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
