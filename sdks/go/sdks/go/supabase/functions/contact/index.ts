
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  message: string;
  type: "trial" | "upgrade";
  to: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting contact request handler...");
    const { name, email, message, type, to }: ContactRequest = await req.json();
    console.log("Parsed request data:", { name, email, message, type, to });

    if (!to || !email) {
      console.error("Missing required email addresses:", { to, email });
      throw new Error("Missing required email addresses");
    }

    // First, try to send email to support team
    console.log(`Attempting to send support email to: ${to}`);
    const supportEmailResponse = await resend.emails.send({
      from: "Udene Support <onboarding@resend.dev>",
      to: [to],
      subject: `New ${type === "trial" ? "Trial Support" : "Upgrade"} Request from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    }).catch(error => {
      console.error("Error sending support email:", error);
      throw error;
    });

    console.log("Support email response:", supportEmailResponse);

    // Then, send confirmation email to user
    console.log(`Attempting to send confirmation email to: ${email}`);
    const userEmailResponse = await resend.emails.send({
      from: "Udene Support <onboarding@resend.dev>",
      to: [email],
      subject: "We received your message!",
      html: `
        <h2>Thank you for contacting us, ${name}!</h2>
        <p>We have received your ${type === "trial" ? "support" : "upgrade"} request and will get back to you as soon as possible.</p>
        <p>Your message:</p>
        <p>${message}</p>
        <br>
        <p>Best regards,<br>The Udene Team</p>
      `,
    }).catch(error => {
      console.error("Error sending confirmation email:", error);
      throw error;
    });

    console.log("User confirmation email response:", userEmailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        supportEmailId: supportEmailResponse.id,
        userEmailId: userEmailResponse.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in contact function:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred while sending emails",
        details: error
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
