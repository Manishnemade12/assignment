"use server";

// import { determineTrackStatus } from "@/ai/flows/determine-track-status";
import { type TrackStatus } from "@/lib/types";

export async function suggestStatusAction(
  trackTitle: string
): Promise<{ status: TrackStatus | null; error: string | null }> {
  if (!trackTitle.trim()) {
    return { status: null, error: "Track title is required." };
  }

  try {
    const result = await determineTrackStatus({ trackTitle });
    return { status: result.status, error: null };
  } catch (error) {
    console.error("AI status suggestion failed:", error);
    return {
      status: null,
      error: "Could not suggest a status at this time.",
    };
  }
}
