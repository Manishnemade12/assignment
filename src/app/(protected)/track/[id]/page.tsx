import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { type Track } from "@/lib/types";
import { ArrowLeft, User, Calendar, Music, Tag } from "lucide-react";

async function getTrack(id: string): Promise<Track | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
  try {
    const res = await fetch(`${baseUrl}/api/tracks?id=${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch track ${id}:`, error);
    return null;
  }
}

export default async function TrackDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const track = await getTrack(params.id);

  if (!track) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/dashboard" className="mb-6 inline-flex items-center text-sm font-medium text-primary hover:underline">
         <ArrowLeft className="mr-2 h-4 w-4" />
         Back to Dashboard
      </Link>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">{track.title}</CardTitle>
          <CardDescription className="flex items-center gap-2 pt-2">
            <User className="h-4 w-4" />
            <span>{track.artist}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
            <span className="text-sm font-medium text-muted-foreground">Status</span>
            <StatusBadge status={track.status} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Release Date</p>
                <p className="text-muted-foreground">{track.releaseDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Tag className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Genre</p>
                <p className="text-muted-foreground">{track.genre}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground">Track ID: {track.id}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
