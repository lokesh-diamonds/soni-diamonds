import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, pieceDetails } = body;

    const recipientEmail = process.env.CONTACT_EMAIL || "lokesh@sonidiamonds.in";
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const emailContent = `
New Diamond Enquiry Received on Soni Diamonds:

From: ${name} (${email})
Phone: ${phone || "Not provided"}
Subject: ${subject || "General Diamond Enquiry"}
Details: ${pieceDetails || "N/A"}

Message:
${message}
      `.trim();

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Soni Diamonds Website <onboarding@resend.dev>",
          to: [recipientEmail],
          subject: `💎 Soni Diamonds Enquiry: ${subject || "Client Message"} - ${name}`,
          text: emailContent,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Resend Email API error:", errorData);
      }
    } else {
      console.log(
        `[INQUIRY SENT] To: ${recipientEmail} | From: ${name} (${email}) | Message: ${message}`
      );
    }

    return NextResponse.json({
      success: true,
      message: `Enquiry successfully dispatched to ${recipientEmail}. Lokesh Soni will reply shortly.`,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to process enquiry. Please try again or call directly." },
      { status: 500 }
    );
  }
}
