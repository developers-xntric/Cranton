import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { name, email, subject, message, service, recaptchaToken } = await req.json();

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Verify reCAPTCHA
        if (!recaptchaToken) {
            return NextResponse.json(
                { error: "reCAPTCHA verification required" },
                { status: 400 }
            );
        }

        const verifyRes = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
            { method: "POST" }
        );
        const verifyData = await verifyRes.json();

        if (!verifyData.success) {
            return NextResponse.json(
                { error: "reCAPTCHA verification failed" },
                { status: 400 }
            );
        }

        // SMTP Configuration
        const transporter = nodemailer.createTransport({
            to: process.env.CONTACT_EMAIL, // This will be set in mailOptions
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false, // true for 465, false for 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const emailSubject = subject ? `Contact Form: ${subject}` : service ? `Service Inquiry: ${service}` : "Contact Form Submission";

        // Email Content
        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL,
            replyTo: email,
            subject: emailSubject,
            text: `Name: ${name}\nEmail: ${email}${subject ? `\nSubject: ${subject}` : ""}${service ? `\nService: ${service}` : ""}\n\nMessage:\n${message}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
                ${service ? `<p><strong>Service:</strong> ${service}</p>` : ""}
                <br/>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br/>")}</p>
            `,
        };

        // Send notification email to admin
        await transporter.sendMail(mailOptions);

        // Send thank-you email to the submitter
        const thankYouMailOptions = {
            from: `"Cranton Electric" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Thank You for Contacting Cranton",
            text: `Dear ${name},\n\nThank you for reaching out to Cranton Electric. We have received your inquiry and our team will get back to you shortly.\n\nBest regards,\nCranton Electric Team`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #025094;">Thank You for Contacting Cranton</h2>
                    <p>Dear ${name},</p>
                    <p>Thank you for reaching out to us. We have received your inquiry and our team will get back to you shortly.</p>
                    <br/>
                    <p>Best regards,</p>
                    <p><strong>Cranton Team</strong></p>
                </div>
            `,
        };

        await transporter.sendMail(thankYouMailOptions);

        return NextResponse.json(
            { message: "Email sent successfully!" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("SMTP Error:", error);
        return NextResponse.json(
            { error: "Failed to send email. Please try again later." },
            { status: 500 }
        );
    }
}
