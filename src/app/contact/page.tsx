"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "./actions";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { generateStructuredData } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters.").max(500, "Message must be less than 500 characters."),
});

export default function ContactPage() {
  const { toast } = useToast();
  
  const breadcrumbData = generateStructuredData({
    type: 'BreadcrumbList',
    data: {
      items: [
        { name: 'Home', url: '/' },
        { name: 'Contact', url: '/contact' }
      ]
    }
  });

  const contactData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact IOTech',
    description: 'Get in touch with IOTech for IoT solutions, technical support, and partnership opportunities.',
    mainEntity: {
      '@type': 'Organization',
      name: 'IOTech',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+1-555-0123',
          contactType: 'customer service',
          email: 'contact@iotech.com',
          availableLanguage: 'English'
        },
        {
          '@type': 'ContactPoint',
          telephone: '+1-555-0124',
          contactType: 'technical support',
          email: 'support@iotech.com',
          availableLanguage: 'English'
        }
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Tech Street',
        addressLocality: 'San Francisco',
        addressRegion: 'CA',
        postalCode: '94105',
        addressCountry: 'US'
      }
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await submitContactForm(values);

    if (result.success) {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      });
      form.reset();
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: result.message || "There was a problem with your request.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <StructuredData data={breadcrumbData} />
      <StructuredData data={contactData} />
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Get in Touch</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a question or a project in mind? We'd love to hear from you.
        </p>
      </header>

      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2 space-y-8">
          <Card className="p-6">
            <CardContent className="flex items-start gap-4 p-0">
              <Mail className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold font-headline">Email</h3>
                <p className="text-muted-foreground">General Inquiries</p>
                <a href="mailto:contact@iotech.com" className="text-primary hover:underline">contact@iotech.com</a>
              </div>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardContent className="flex items-start gap-4 p-0">
              <Phone className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold font-headline">Phone</h3>
                <p className="text-muted-foreground">Mon-Fri, 9am-5pm</p>
                <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
              </div>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardContent className="flex items-start gap-4 p-0">
              <MapPin className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold font-headline">Office</h3>
                <p className="text-muted-foreground">123 Innovation Drive<br/>Tech City, TS 45678</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-3">
          <Card className="p-8 shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project or question..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}
