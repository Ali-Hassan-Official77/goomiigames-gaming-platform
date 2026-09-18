import { NextResponse } from "next/server";
import { rawgFetch } from "@/lib/rawg";

// GET /api/genres
export async function GET() {
  try {
    const data = await rawgFetch("/genres", { page_size: 20 });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
