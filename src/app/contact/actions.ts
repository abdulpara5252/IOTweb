"use server";

import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContactForm(values: z.infer<typeof formSchema>) {
  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Invalid form data." };
  }

  try {
    // Here you would typically send an email using a service like Resend, SendGrid, or Nodemailer.
    // For this demo, we'll just log the data and simulate a successful submission.
    console.log("New contact form submission:");
    console.log("Name:", parsed.data.name);
    console.log("Email:", parsed.data.email);
    console.log("Message:", parsed.data.message);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true, message: "Form submitted successfully." };

  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, message: "Failed to send message. Please try again later." };
  }
}
