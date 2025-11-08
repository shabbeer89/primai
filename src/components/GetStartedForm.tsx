"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import { formSchema, type FormData } from "@/lib/form-schema";
import { countries } from "@/lib/countries";

const countryOptions = countries.map(country => ({
  value: country,
  label: country,
}));

export default function GetStartedForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema as any),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Form submitted successfully! We will contact you soon.");
        // Reset form after successful submission
        // You might want to add form reset logic here
      } else {
        alert(`Error submitting form: ${result.error}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Error submitting form. Please try again.");
    }
  };

  const selectedCountryOfOrigin = watch("countryOfOrigin");
  const selectedCountryOfResidence = watch("countryOfResidence");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Get Started</h1>
            <p className="text-gray-300">Fill out the form below and we'll get back to you with a personalized solution.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Name *
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            {/* Required Service Field */}
            <div>
              <label htmlFor="requiredService" className="block text-sm font-medium text-white mb-2">
                Required Service *
              </label>
              <textarea
                {...register("requiredService")}
                id="requiredService"
                rows={4}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                placeholder="Describe the service you require in detail..."
              />
              {errors.requiredService && (
                <p className="mt-1 text-sm text-red-400">{errors.requiredService.message}</p>
              )}
            </div>

            {/* Country of Origin Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Country of Origin *
              </label>
              <Select
                options={countryOptions}
                value={countryOptions.find(option => option.value === selectedCountryOfOrigin)}
                onChange={(option) => setValue("countryOfOrigin", option?.value || "")}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select your country of origin"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&:focus-within': {
                      borderColor: '#6366f1',
                      boxShadow: '0 0 0 1px #6366f1',
                    },
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    borderRadius: '0.5rem',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected ? '#6366f1' : state.isFocused ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    },
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: 'white',
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: '#9ca3af',
                  }),
                  input: (base) => ({
                    ...base,
                    color: 'white',
                  }),
                }}
              />
              {errors.countryOfOrigin && (
                <p className="mt-1 text-sm text-red-400">{errors.countryOfOrigin.message}</p>
              )}
            </div>

            {/* Country of Residence Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Country of Residence *
              </label>
              <Select
                options={countryOptions}
                value={countryOptions.find(option => option.value === selectedCountryOfResidence)}
                onChange={(option) => setValue("countryOfResidence", option?.value || "")}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select your country of residence"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&:focus-within': {
                      borderColor: '#6366f1',
                      boxShadow: '0 0 0 1px #6366f1',
                    },
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    borderRadius: '0.5rem',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected ? '#6366f1' : state.isFocused ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    },
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: 'white',
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: '#9ca3af',
                  }),
                  input: (base) => ({
                    ...base,
                    color: 'white',
                  }),
                }}
              />
              {errors.countryOfResidence && (
                <p className="mt-1 text-sm text-red-400">{errors.countryOfResidence.message}</p>
              )}
            </div>

            {/* Mobile Number Field */}
            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-white mb-2">
                Mobile Number *
              </label>
              <input
                {...register("mobileNumber")}
                type="tel"
                id="mobileNumber"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
              {errors.mobileNumber && (
                <p className="mt-1 text-sm text-red-400">{errors.mobileNumber.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email *
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-indigo-700 hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
