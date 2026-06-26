import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  let supabase;
  try {
    supabase = createServiceClient();
  } catch {
    return NextResponse.json(
      { error: "Server is not configured for Readers' Club signups" },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("readers_club")
    .insert({ name, email })
    .select("id, name, email, created_at")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "This email is already subscribed." },
        { status: 409 }
      );
    }

    if (error.code === "42P01") {
      return NextResponse.json(
        {
          error:
            "Readers' Club is not set up yet. Run supabase/readers_club.sql in the Supabase SQL editor.",
        },
        { status: 503 }
      );
    }

    console.error("Readers club insert error:", error);
    return NextResponse.json(
      { error: "Failed to save your subscription. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, member: data });
}
