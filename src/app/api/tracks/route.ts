import { NextRequest, NextResponse } from "next/server";
import { type Track, type TrackStatus } from "@/lib/types";

let tracks: Track[] = [
  {
    id: 1,
    title: "Dreamscape",
    artist: "Aria Smith",
    releaseDate: "2024-05-10",
    genre: "Pop",
    status: "Published",
  },
  {
    id: 2,
    title: "Midnight Beats",
    artist: "DJ Raven",
    releaseDate: "2024-06-22",
    genre: "Electronic",
    status: "Draft",
  },
  {
    id: 3,
    title: "Echoes of Tomorrow",
    artist: "Liam Grey",
    releaseDate: "2024-07-01",
    genre: "Rock",
    status: "Submitted",
  },
  {
    id: 4,
    title: "Sunset Boulevard",
    artist: "The Wanderers",
    releaseDate: "2023-11-20",
    genre: "Indie",
    status: "Published",
  },
  {
    id: 5,
    title: "Quantum Leap",
    artist: "Systematic",
    releaseDate: "2024-08-15",
    genre: "Trance",
    status: "Submitted",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const track = tracks.find((t) => t.id === parseInt(id, 10));
    if (track) {
      return NextResponse.json(track);
    } else {
      return NextResponse.json({ message: "Track not found" }, { status: 404 });
    }
  }

  return NextResponse.json(tracks);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, artist, releaseDate, genre, status } = body;

    if (!title || !artist || !releaseDate || !genre || !status) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newTrack: Track = {
      id: tracks.length > 0 ? Math.max(...tracks.map((t) => t.id)) + 1 : 1,
      title,
      artist,
      releaseDate,
      genre,
      status: status as TrackStatus,
    };

    tracks.push(newTrack);

    return NextResponse.json(newTrack, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }
}
