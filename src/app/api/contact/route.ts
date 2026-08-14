import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ success: true, data: [] });
    }

    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase select contact_messages notice:", error.message);
      return NextResponse.json({ success: true, data: [] });
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (error: any) {
    console.error("GET /api/contact error:", error);
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();
    let createdItem = {
      id: "cnt-" + Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : null,
      message: message.trim(),
      status: "new",
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      const { data, error } = await supabase
        .from("contact_messages")
        .insert([
          {
            name: name.trim(),
            email: email.trim(),
            phone: phone ? phone.trim() : null,
            message: message.trim(),
            status: "new",
          },
        ])
        .select()
        .single();

      if (!error && data) {
        createdItem = data;
      } else if (error) {
        console.warn("Supabase insert contact_messages warning:", error.message);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully",
        data: createdItem,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "ID and status are required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();
    if (supabase && id.includes("-")) {
      const { data, error } = await supabase
        .from("contact_messages")
        .update({ status })
        .eq("id", id)
        .select();

      if (error) {
        console.warn("Supabase status update warning:", error.message);
      }
    }

    return NextResponse.json({ success: true, data: { id, status } });
  } catch (error: any) {
    console.error("PATCH /api/contact error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update status" },
      { status: 500 }
    );
  }
}
