import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isValidEmail } from "@/lib/utils";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // later: restrict to your domain
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  // Handle CORS preflight
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, projectId } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate email format using utility function
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long" },
        { status: 400, headers: corsHeaders }
      );
    }

    const finalProjectId = (projectId || "default_project").trim();

    console.log("📩 New feedback received:", {
      name,
      email,
      message,
      projectId: finalProjectId,
    });

    // Debug: Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    console.log("🔍 Supabase URL configured:", supabaseUrl ? "Yes" : "No");
    console.log("🔍 Supabase Key configured:", anonKey ? "Yes" : "No");

    // Use anon key (RLS handles permissions)
    const { createClient } = await import("@supabase/supabase-js");
    const supabaseKey = anonKey!;

    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey
    );

    console.log("🔑 Using key type: Anon (uses RLS)");

    const { data, error: dbError } = await supabaseClient
      .from("feedback")
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          message: message.trim(),
          project_id: finalProjectId,
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      console.error("Error code:", dbError.code);
      console.error("Error message:", dbError.message);
      console.error("Error details:", dbError);

      return NextResponse.json(
        {
          error: "Failed to save feedback. Please try again.",
          details: dbError.message || "Unknown database error",
          code: dbError.code,
        },
        { status: 500, headers: corsHeaders }
      );
    }

    console.log("✅ Feedback saved to database:", data);

    const reply = `Thank you ${name}! Your feedback has been received and saved! ✅`;

    return NextResponse.json(
      {
        success: true,
        reply,
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
          message: data.message,
          created_at: data.created_at,
          project_id: data.project_id,
        },
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error processing feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
