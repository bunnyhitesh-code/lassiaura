import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, type, guests, date, notes } = body;

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

  try {
    await resend.emails.send({
      from: "Lassi Aura <onboarding@resend.dev>",
      to: "hiteshbelide23@gmail.com",
      subject: `New booking enquiry from ${name}`,
      html: `
        <h2>New Booking Enquiry — Lassi Aura</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Event type</strong></td><td>${type}</td></tr>
          <tr><td><strong>Guest count</strong></td><td>${guests || "Not specified"}</td></tr>
          <tr><td><strong>Date</strong></td><td>${date}</td></tr>
          <tr><td><strong>Notes</strong></td><td>${notes || "None"}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}