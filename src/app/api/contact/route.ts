import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    console.log("=== CONTACT FORM SUBMISSION ===");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("Timestamp:", new Date().toISOString());

    // Send email using Resend
    try {
      const { data, error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>", // This will be replaced with your domain
        to: ["ux.rasmusmattsson@gmail.com"], // Send to your Gmail for testing
        replyTo: email,
        subject: `💬 Conversation: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
              <h3 style="color: #333; margin-top: 0;">Message</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e3f2fd; border-radius: 8px; border-left: 4px solid #2196f3;">
              <p style="margin: 0; color: #1976d2; font-size: 14px;">
                <strong>Note:</strong> This message was sent from your portfolio contact form.
              </p>
            </div>
          </div>
        `,
        text: `
          New Contact Form Submission
          
          Name: ${name}
          Email: ${email}
          Subject: ${subject}
          
          Message:
          ${message}
          
          ---
          This message was sent from your portfolio contact form.
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json(
          {
            error: "Failed to send email",
            details: error.message,
          },
          { status: 500 }
        );
      }

      console.log("✅ Email sent successfully! Message ID:", data?.id);
      return NextResponse.json(
        { message: "Email sent successfully!" },
        { status: 200 }
      );
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return NextResponse.json(
        {
          error: "Failed to send email",
          details:
            emailError instanceof Error ? emailError.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("General error:", error);
    return NextResponse.json(
      {
        error: "Failed to process message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
