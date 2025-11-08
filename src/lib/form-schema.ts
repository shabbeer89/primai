import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  requiredService: z.string().min(1, "Required service is required").min(10, "Please provide more details about the service"),
  countryOfOrigin: z.string().min(1, "Country of origin is required"),
  countryOfResidence: z.string().min(1, "Country of residence is required"),
  mobileNumber: z.string().min(1, "Mobile number is required").regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid mobile number"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

export type FormData = z.infer<typeof formSchema>;
