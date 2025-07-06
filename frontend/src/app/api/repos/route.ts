import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    if (!username) {
        return NextResponse.json({ error: "Missing username" }, { status: 400 });
    }
    try {
        // Change the backend URL if needed
        const backendUrl = `http://localhost:8000/repos/${encodeURIComponent(username)}`;
        const res = await fetch(backendUrl);
        if (!res.ok) {
            return NextResponse.json({ error: "User not found or error fetching repos." }, { status: res.status });
        }
        const data = await res.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
