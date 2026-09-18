import { NextResponse } from "next/server";
import { rawgFetch } from "@/lib/rawg";

// GET /api/games/[id]
export async function GET(_request, { params }) {
  try {
    const data = await rawgFetch(`/games/${params.id}`);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
