import { z } from "zod";

// Mobile country codes with validation patterns
export const mobileCountryCodes = [
  { code: "+1", name: "United States/Canada", minLength: 10, maxLength: 10, countries: ["United States", "Canada"] },
  { code: "+44", name: "United Kingdom", minLength: 10, maxLength: 11, countries: ["United Kingdom"] },
  { code: "+91", name: "India", minLength: 10, maxLength: 10, countries: ["India"] },
  { code: "+86", name: "China", minLength: 11, maxLength: 11, countries: ["China"] },
  { code: "+81", name: "Japan", minLength: 10, maxLength: 11, countries: ["Japan"] },
  { code: "+49", name: "Germany", minLength: 10, maxLength: 13, countries: ["Germany"] },
  { code: "+33", name: "France", minLength: 9, maxLength: 9, countries: ["France"] },
  { code: "+39", name: "Italy", minLength: 9, maxLength: 10, countries: ["Italy"] },
  { code: "+34", name: "Spain", minLength: 9, maxLength: 9, countries: ["Spain"] },
  { code: "+55", name: "Brazil", minLength: 10, maxLength: 11, countries: ["Brazil"] },
  { code: "+7", name: "Russia", minLength: 10, maxLength: 10, countries: ["Russia"] },
  { code: "+82", name: "South Korea", minLength: 10, maxLength: 11, countries: ["South Korea"] },
  { code: "+65", name: "Singapore", minLength: 8, maxLength: 8, countries: ["Singapore"] },
  { code: "+60", name: "Malaysia", minLength: 9, maxLength: 10, countries: ["Malaysia"] },
  { code: "+62", name: "Indonesia", minLength: 9, maxLength: 12, countries: ["Indonesia"] },
  { code: "+63", name: "Philippines", minLength: 10, maxLength: 10, countries: ["Philippines"] },
  { code: "+84", name: "Vietnam", minLength: 9, maxLength: 10, countries: ["Vietnam"] },
  { code: "+66", name: "Thailand", minLength: 9, maxLength: 9, countries: ["Thailand"] },
  // Default option
  { code: "+1", name: "Other (+1)", minLength: 8, maxLength: 15, countries: [] }
] as const;

export const formSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  requiredService: z.string().optional(),
  requiredServices: z.array(z.string()).optional(),
  countryOfOrigin: z.union([z.string(), z.undefined()]).transform(val => val || "").pipe(z.string().min(1, "Select Country of Origin")),
  countryOfResidence: z.union([z.string(), z.undefined()]).transform(val => val || "").pipe(z.string().min(1, "Select Country of Residence")),
  mobileCountryCode: z.union([z.string(), z.undefined()]).transform(val => val || "+1").pipe(z.string().min(1, "Select country code")),
  mobileNumber: z.string().min(1, "Mobile number is required").regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid mobile number"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
}).refine((data) => {
  // For BDE mode, requiredServices must have at least one selection
  // For regular mode, requiredService must be provided
  const isBdeMode = data.requiredServices !== undefined;
  if (isBdeMode) {
    return data.requiredServices && data.requiredServices.length > 0;
  } else {
    return data.requiredService && data.requiredService.length > 0;
  }
}, {
  message: "Please provide the required information",
  path: ["requiredService"], // Default path
}).refine((data) => {
  // Validate mobile number length based on selected country code
  if (data.mobileNumber && data.mobileCountryCode) {
    const countryCode = mobileCountryCodes.find(cc => cc.code === data.mobileCountryCode);
    if (countryCode) {
      const cleanNumber = data.mobileNumber.replace(/\D/g, ''); // Remove non-digits
      return cleanNumber.length >= countryCode.minLength && cleanNumber.length <= countryCode.maxLength;
    }
  }
  return true; // Allow if no validation info available
}, {
  message: "Invalid mobile number length for selected country",
  path: ["mobileNumber"],
});

export const serviceOptions = [
  "Crypto & Blockchain Solutions",
  "Trading & Financial Tools",
  "AI & Generative Technology",
  "Education & Community",
  "Advanced Digital Marketing"
];

export type FormData = z.infer<typeof formSchema>;
