"use server";

import * as z from "zod";
import nodemailer from "nodemailer";

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  department: z.string().min(1),
  designation: z.string().min(1),
  companyName: z.string().min(1),
  streetNumber: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  industryType: z.string().min(1),
  message: z.string().min(10),
  attachment: z
    .object({
      name: z.string(),
      type: z.string().optional(),
      size: z.number().optional(),
      dataUrl: z.string(),
    })
    .optional(),
});

export async function submitContactForm(values: z.infer<typeof formSchema>) {
  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Invalid form data." };
  }

  const data = parsed.data;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    })

    const subject = `New Contact Inquiry from ${data.firstName} ${data.lastName}`;
    const html = `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 24px; color: #1f2937;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 720px; margin: 0 auto; border-collapse: separate; border-spacing: 0;">
      <tr>
        <td style="background: linear-gradient(90deg, hsl(261, 44%, 58%), hsl(231, 48%, 48%)); padding: 28px 24px; text-align: center; border-top-left-radius: 12px; border-top-right-radius: 12px;">
          <img src="https://res.cloudinary.com/dshrjyy17/image/upload/v1757314292/iTech_Innovations.jpg_fs5rkz.png" alt="iTech Innovations" width="80" style="display:inline-block; margin-bottom: 8px;" />
          <div style="font-size: 22px; color: #fff; font-weight: 600; letter-spacing: 0.3px;">New Contact Inquiry</div>
          <div style="font-size: 13px; color: #e5e7eb; margin-top: 4px;">From ${data.firstName} ${data.lastName}</div>
        </td>
      </tr>
      <tr>
        <td style="background-color: #ffffff; padding: 0 24px 24px 24px; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; border: 1px solid #e5e7eb; border-top: none;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: -16px;">
            <tr>
              <td>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: separate; border-spacing: 0;">
                  <tr>
                    <td style="padding-top: 24px;">
                      <div style="font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.06em;">Overview</div>
                      <div style="margin-top: 8px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px 14px; display: inline-block;">
                        <span style="display: inline-block; background-color: #eef2ff; color: hsl(231, 48%, 48%); border: 1px solid #e0e7ff; padding: 6px 10px; border-radius: 999px; font-size: 12px; font-weight: 600;">${data.department}</span>
                        <span style="display: inline-block; background-color: #f4f0ff; color: hsl(261, 44%, 40%); border: 1px solid #e6ddff; padding: 6px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; margin-left: 8px;">${data.designation}</span>
                        <span style="display: inline-block; background-color: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; padding: 6px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; margin-left: 8px;">${data.industryType}</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 18px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="50%" valign="top" style="padding-right: 10px;">
                            <div style="font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">Personal Information</div>
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;">
                              <tr><td style="background:#f9fafb; padding:10px 12px; font-weight:600;">Name</td></tr>
                              <tr><td style="padding:10px 12px;">${data.firstName} ${data.lastName}</td></tr>
                              <tr><td style="background:#f9fafb; padding:10px 12px; font-weight:600;">Email</td></tr>
                              <tr><td style="padding:10px 12px;"><a href="mailto:${data.email}" style="color:hsl(231, 48%, 48%); text-decoration:none;">${data.email}</a></td></tr>
                              <tr><td style="background:#f9fafb; padding:10px 12px; font-weight:600;">Phone</td></tr>
                              <tr><td style="padding:10px 12px;">${data.phone}</td></tr>
                            </table>
                          </td>
                          <td width="50%" valign="top" style="padding-left: 10px;">
                            <div style="font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">Company Information</div>
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;">
                              <tr><td style="background:#f9fafb; padding:10px 12px; font-weight:600;">Company</td></tr>
                              <tr><td style="padding:10px 12px;">${data.companyName}</td></tr>
                              <tr><td style="background:#f9fafb; padding:10px 12px; font-weight:600;">Address</td></tr>
                              <tr><td style="padding:10px 12px;">${data.streetNumber}, ${data.city} - ${data.zipCode}<br/>${data.state}, ${data.country}</td></tr>
                              <tr><td style="background:#f9fafb; padding:10px 12px; font-weight:600;">Industry</td></tr>
                              <tr><td style="padding:10px 12px;">${data.industryType}</td></tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 18px;">
                      <div style="font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">Message</div>
                      <div style="border: 1px solid #e5e7eb; background-color: #f9fafb; border-radius: 10px; padding: 14px; line-height: 1.6; white-space: pre-line;">${data.message}</div>
                    </td>
                  </tr>
                  ${data.attachment ? `
                  <tr>
                    <td style="padding-top: 18px;">
                      <div style="font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">Attachment</div>
                      <div style="display:inline-block; border:1px solid #e5e7eb; background:#fff; border-radius:8px; padding:10px 12px;">
                        <span style="display:inline-block; width:8px; height:8px; background:hsl(261, 44%, 58%); border-radius:50%; margin-right:8px; vertical-align:middle;"></span>
                        <span style="font-weight:600;">${data.attachment.name}</span>
                      </div>
                    </td>
                  </tr>` : ''}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="text-align:center; padding: 14px 8px; color:#6b7280; font-size:12px;">
          © ${new Date().getFullYear()} iTech Innovations. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
`;
    console.log(data.email , 'data.email');
    await transporter.sendMail({
      from: data.email ,
      to: 'info@itechinnovations.net',
      subject,
      html,
      attachments: data.attachment ? [
        {
          filename: data.attachment.name,
          content: data.attachment.dataUrl.split(',')[1],
          encoding: 'base64',
          contentType: data.attachment.type,
        }
      ] : [],
    });

    return { success: true, message: "Form submitted successfully." };

  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, message: "Failed to send message. Please try again later." };
  }
}
