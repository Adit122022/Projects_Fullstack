import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder_secret",
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
        input: false,
      },
      phone: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      companyName: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      taxId: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      department: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      streetAddress: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      city: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      state: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      postalCode: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      country: {
        type: "string",
        required: false,
        defaultValue: "India",
        input: true,
      },
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: "NComputing India <onboarding@resend.dev>",
              to: email,
              subject: "Your NComputing Access Code",
              html: `
                <div style="font-family: sans-serif; padding: 32px; max-width: 550px; margin: 20px auto; border: 1px solid #e2e8f0; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 24px;">
                    <div style="background-color: #2563eb; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; text-align: center; line-height: 36px;">
                      N
                    </div>
                    <span style="font-size: 20px; font-weight: 800; color: #0f172a;">NComputing India</span>
                  </div>
                  <h3 style="color: #0f172a; margin-top: 0; font-size: 18px; font-weight: 700;">Verify Your Authentication</h3>
                  <p style="font-size: 14px; color: #475569; line-height: 1.6;">Use the following one-time verification code to complete your access portal login:</p>
                  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 18px; border-radius: 14px; font-size: 32px; font-weight: 900; letter-spacing: 6px; text-align: center; color: #1d4ed8; margin: 24px 0; font-family: monospace;">
                    ${otp}
                  </div>
                  <p style="font-size: 11px; color: #94a3b8; line-height: 1.5; margin-bottom: 0;">This code is private and expires in 5 minutes. If you did not initiate this request, please contact administrator.</p>
                </div>
              `,
            }),
          });
          if (!res.ok) {
            console.error("Failed to send OTP email via Resend:", await res.text());
          }
        } catch (error) {
          console.error("Error sending OTP email:", error);
        }
      },
    }),
  ],
});
