import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const url =   new URL(req.url)
    const searchParma = new URLSearchParams(url.search)
    const filename = searchParma.get("audio")
    return await fetch(`http://localhost:8000/tracks/${filename}`)
}