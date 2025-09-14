"use client";

import { useForm } from "react-hook-form";
import { useRef } from "react";
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
import GoogleMap from '@/components/common/GoogleMap';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(5, "Please enter a valid phone number."),
  department: z.string().min(1, "Department is required."),
  designation: z.string().min(1, "Designation is required."),

  companyName: z.string().min(1, "Company name is required."),
  streetNumber: z.string().min(1, "Street number is required."),
  city: z.string().min(1, "City is required."),
  zipCode: z.string().min(1, "ZIP code is required."),
  state: z.string().min(1, "State is required."),
  country: z.string().min(1, "Country is required."),
  industryType: z.string().min(1, "Type of industry is required."),

  message: z.string().min(10, "Message must be at least 10 characters.").max(1000, "Message must be less than 1000 characters."),
  attachment: z.any().optional(),
}).superRefine((val, ctx) => {
  const file = val.attachment as File | undefined;
  if (file && file.size > MAX_FILE_SIZE) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Attachment must be less than 5MB",
      path: ["attachment"],
    });
  }
});

export default function ContactPage() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
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
    name: 'Contact iTech Innovations',
    description: 'Get in touch with iTech Innovations for remote monitoring systems and IoT solutions.',
    mainEntity: {
      '@type': 'Organization',
      name: 'iTech Innovations',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+91-9825706052',
          contactType: 'customer service',
          email: 'info@itechinnovations.net',
          availableLanguage: 'English'
        },
        {
          '@type': 'ContactPoint',
          telephone: '+91-7927416447',
          contactType: 'fax',
          email: 'info@itechinnovations.net',
          availableLanguage: 'English'
        }
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'FF-121, Shivam Complex, Opp. Hetarth Party Plot, Science City Road, Sola',
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        postalCode: '380060',
        addressCountry: 'IN'
      },
      url: 'https://www.itechinnovations.net'
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      companyName: "",
      streetNumber: "",
      city: "",
      zipCode: "",
      state: "",
      country: "",
      industryType: "",
      message: "",
      attachment: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const file = values.attachment as File | undefined;
    let payload: any = { ...values };
    if (file) {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      payload.attachment = {
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl,
      };
    } else {
      payload.attachment = undefined;
    }
    const result = await submitContactForm(payload);

    if (result.success) {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      });
      form.reset();
      form.setValue("attachment", undefined);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: result.message || "There was a problem with your request.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
    <div className="container mx-auto px-4 py-16 md:py-24">
      <StructuredData data={breadcrumbData} />
      <StructuredData data={contactData} />
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Contact us for more information on how iTech Remote Monitoring systems can improve your networked system, also with any questions or for a proposal. We look forward for the opportunity to work with you!
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
                <a href="mailto:info@itechinnovations.net" className="text-primary hover:underline">info@itechinnovations.net</a>
              </div>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardContent className="flex items-start gap-4 p-0">
              <Phone className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold font-headline">Phone</h3>
                <p className="text-muted-foreground">Phone / Telefax</p>
                <div className="space-y-1">
                  <a href="tel:+919825706052" className="text-primary hover:underline">+91 98257 06052</a>
                  <div className="text-muted-foreground">Telefax: +91 79 2741 6447</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardContent className="flex items-start gap-4 p-0">
              <MapPin className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold font-headline">Office</h3>
                <p className="text-muted-foreground">
                  OFFICE: FF-121, Shivam Complex, Opp. Hetarth Party Plot, Science City Road, Sola, Ahmedabad-380060 Gujarat, (India)
                </p>
                <p className="text-muted-foreground mt-2">
                  WORKS: I-12, Vishram nagar, Nr. Suhbash Chowk, Gurukul Road, Memnagar, Ahmedabad-380052 Gujarat, (India)
                </p>
              </div>
            </CardContent>
          </Card>
          <div className="rounded-lg overflow-hidden aspect-video">
              <GoogleMap
                className="w-full h-full"
                center={{ lat: 23.076649043054097, lng: 72.50859461756781 }}
                zoom={16}
                markerLabel="iTech Innovations"
              />
          </div>
        </div>
        <div className="md:col-span-3">
          <Card className="p-8 shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                    name="firstName"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>First Name</FormLabel>
                      <FormControl>
                          <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="JhonDoe@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 00000-00000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="designation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Designation</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name of Company</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="streetNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Number</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="industryType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Industry</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="attachment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attachment</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => field.onChange(e.target.files?.[0] ?? undefined)}
                          value={undefined as unknown as string}
                        />
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
    </>
  );
}
