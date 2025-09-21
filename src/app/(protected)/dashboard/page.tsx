import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { type Track } from "@/lib/types";
import { PlusCircle, ChevronRight } from "lucide-react";

async function getTracks(): Promise<Track[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
  try {
    const res = await fetch(`${baseUrl}/api/tracks`, { cache: "no-store" });
    if (!res.ok) {
      console.error("Failed to fetch tracks");
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const tracks = await getTracks();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">
            Track Dashboard
          </h1>
          <p className="text-muted-foreground">
            An overview of all your music tracks.
          </p>
        </div>
        <Link href="/track/upload">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload Track
          </Button>
        </Link>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Tracks</CardTitle>
          <CardDescription>
            {tracks.length > 0
              ? "Click on a track to view details."
              : "No tracks found. Upload one to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Track Title</TableHead>
                  <TableHead>Artist</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Release Date
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Genre</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"><span className="sr-only">View</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tracks.length > 0 ? (
                  tracks.map((track) => (
                    <TableRow key={track.id} className="group cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <Link href={`/track/${track.id}`} className="stretched-link block">
                          {track.title}
                        </Link>
                      </TableCell>
                      <TableCell>{track.artist}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {track.releaseDate}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {track.genre}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={track.status} />
                      </TableCell>
                       <TableCell>
                        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No tracks available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
