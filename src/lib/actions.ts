"use server"

import * as z from "zod"
import { contactFormSchema } from "./schemas"

export async function submitContactForm(data: z.infer<typeof contactFormSchema>) {
    console.log("Form data submitted:", data);
    // Here you would typically send the data to your backend, a CRM, or an email service.
    return { success: true, name: data.name };
}
