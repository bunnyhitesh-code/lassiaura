import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json() as { name?: string; email?: string; type?: string; guests?: number; date?: string; notes?: string; city?: string; package?: string };
  const { name, email, type, guests, date, notes, city, package: packageChoice } = body;

  if (!name || !email || !type || !date) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (guests && (isNaN(Number(guests)) || Number(guests) < 1)) {
    return NextResponse.json({ error: "Invalid guest count" }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Lassi Aura <onboarding@resend.dev>",
      to: "hiteshbelide23@gmail.com",
      subject: `New booking enquiry from ${name}`,
      html: `
        <h2>New Booking Enquiry — Lassi Aura</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Package</strong></td><td>${packageChoice || "Not specified"}</td></tr>
          <tr><td><strong>Event type</strong></td><td>${type}</td></tr>
          <tr><td><strong>Guest count</strong></td><td>${guests || "Not specified"}</td></tr>
          <tr><td><strong>City</strong></td><td>${city || "Not specified"}</td></tr>
          <tr><td><strong>Date</strong></td><td>${date}</td></tr>
          <tr><td><strong>Notes</strong></td><td>${notes || "None"}</td></tr>
        </table>
      `,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}