import { NextResponse } from "next/server";
import { rawgFetch } from "@/lib/rawg";

// GET /api/games?search=&genres=&ordering=&page=&page_size=
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  try {
    const data = await rawgFetch("/games", {
      search: searchParams.get("search") || undefined,
      genres: searchParams.get("genres") || undefined,
      platforms: searchParams.get("platforms") || undefined,
      ordering: searchParams.get("ordering") || "-added",
      page: searchParams.get("page") || 1,
      page_size: searchParams.get("page_size") || 20,
    });

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
