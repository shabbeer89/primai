"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import Select from "react-select";
import { ChevronDown, Check, AlertCircle, X, CheckCircle, Sparkles } from "lucide-react";
import { formSchema, serviceOptions, mobileCountryCodes, type FormData } from "@/lib/form-schema";
import { countries } from "@/lib/countries";

// Modern Error Message Component
const ErrorMessage = ({ error }: { error?: { message?: string } }) => {
  if (!error?.message) return null;

  return (
    <div className="flex items-start space-x-2 mt-2 p-3 bg-red-500/10 border border-red-400/20 rounded-lg animate-in slide-in-from-top-1">
      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-red-400 font-medium leading-tight">{error.message}</p>
    </div>
  );
};

// Success Modal Component
const SuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (isOpen) {
      // Auto-close after 5 seconds
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-2xl p-8 shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-300 border border-white/20">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            Form Submitted Successfully!
          </h3>
          <p className="text-white/80 mb-6 leading-relaxed">
            Thank you for your interest in PrimAI. Our team will review your application and get back to you within 24 hours.
          </p>

          {/* Progress indicator */}
          <div className="flex justify-center items-center space-x-1 mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <div className="w-6 h-0.5 bg-green-400/50" />
            <div className="w-2 h-2 bg-green-400/70 rounded-full animate-pulse" />
            <div className="w-6 h-0.5 bg-green-400/50" />
            <div className="w-2 h-2 bg-green-400/30 rounded-full animate-pulse" />
          </div>

          <p className="text-sm text-white/60 mb-4">
            This notification will close automatically in a few seconds
          </p>

          {/* CTA Button */}
          <button
            onClick={onClose}
            className="w-full bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

const countryOptions = countries.map(country => ({
  value: country,
  label: country,
}));

const mobileCodeOptions = mobileCountryCodes.map(code => ({
  value: code.code,
  label: `${code.code} ${code.name}`,
}));

export default function GetStartedForm() {
  const searchParams = useSearchParams();
  const isBdeMode = searchParams.get('mode') === 'bde';

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema as any),
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        // Show success modal and reset form
        setShowSuccessModal(true);
        setKey(prev => prev + 1);
        setSelectedServices([]);
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
  const selectedMobileCountryCode = watch("mobileCountryCode");

  const handleServiceToggle = (service: string) => {
    const newSelected = selectedServices.includes(service)
      ? selectedServices.filter(s => s !== service)
      : [...selectedServices, service];
    setSelectedServices(newSelected);
    setValue("requiredServices", newSelected);
    // Trigger validation immediately for instant error clearing
    setTimeout(() => {
      trigger("requiredServices");
      trigger("requiredService"); // Also clear the refine validation error
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 pt-32 md:pt-28 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">{isBdeMode ? "Apply as BDE" : "Get Started"}</h1>
            <p className="text-gray-300">Fill out the form below and we'll get back to you with a personalized solution.</p>
          </div>

          <form key={key} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Name *
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className={`w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? 'border-2 border-red-400 focus:ring-red-500 bg-red-500/10'
                    : 'border border-white/30 focus:ring-indigo-500 focus:border-transparent'
                }`}
                placeholder="Enter your full name"
              />
              <ErrorMessage error={errors.name} />
            </div>

            {/* Required Services Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                {isBdeMode ? "Preferred Category *" : "Required Service *"}
              </label>

              {isBdeMode ? (
                // BDE Mode: Checkbox Dropdown
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-4 py-3 bg-white/20 rounded-lg text-white text-left focus:outline-none focus:ring-2 flex items-center justify-between transition-all ${
                      errors.requiredServices
                        ? 'border-2 border-red-400 focus:ring-red-500 bg-red-500/10'
                        : 'border border-white/30 focus:ring-indigo-500 focus:border-transparent'
                    }`}
                  >
                    <span className={selectedServices.length === 0 ? "text-gray-400" : "text-white"}>
                      {selectedServices.length === 0
                        ? "Select services..."
                        : `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected`
                      }
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-black/90 border border-white/30 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {serviceOptions.map((service) => (
                        <div
                          key={service}
                          onClick={() => handleServiceToggle(service)}
                          className="flex items-center px-4 py-3 hover:bg-white/10 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center justify-center w-5 h-5 mr-3 border border-white/30 rounded">
                            {selectedServices.includes(service) && (
                              <Check className="w-3 h-3 text-indigo-400" />
                            )}
                          </div>
                          <span className="text-white text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {isBdeMode && selectedServices.length === 0 && errors.requiredService ? (
                    <ErrorMessage error={{ message: "Select at least one Preferred Category" }} />
                  ) : null}
                </div>
              ) : (
                // Regular Mode: Textarea
                <>
                  <textarea
                    {...register("requiredService")}
                    rows={4}
                    className={`w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 resize-none transition-all ${
                      errors.requiredService
                        ? 'border-2 border-red-400 focus:ring-red-500 bg-red-500/10'
                        : 'border border-white/30 focus:ring-indigo-500 focus:border-transparent'
                    }`}
                    placeholder="Describe the service you require in detail..."
                  />
                  <ErrorMessage error={errors.requiredService} />
                </>
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
                onChange={(option) => {
                  setValue("countryOfOrigin", option?.value || "");
                  trigger("countryOfOrigin"); // Trigger validation immediately
                }}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select your country of origin"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: errors.countryOfOrigin ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                    borderColor: errors.countryOfOrigin ? 'rgba(239, 68, 68, 0.6)' : 'rgba(255, 255, 255, 0.3)',
                    borderWidth: errors.countryOfOrigin ? '2px' : '1px',
                    borderRadius: '0.5rem',
                    color: 'white',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: errors.countryOfOrigin ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255, 255, 255, 0.5)',
                    },
                    '&:focus-within': {
                      borderColor: errors.countryOfOrigin ? '#ef4444' : '#6366f1',
                      boxShadow: `0 0 0 1px ${errors.countryOfOrigin ? '#ef4444' : '#6366f1'}`,
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
              <ErrorMessage error={errors.countryOfOrigin} />
            </div>

            {/* Country of Residence Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Country of Residence *
              </label>
              <Select
                options={countryOptions}
                value={countryOptions.find(option => option.value === selectedCountryOfResidence)}
                onChange={(option) => {
                  setValue("countryOfResidence", option?.value || "");
                  trigger("countryOfResidence"); // Trigger validation immediately
                }}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select your country of residence"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: errors.countryOfResidence ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                    borderColor: errors.countryOfResidence ? 'rgba(239, 68, 68, 0.6)' : 'rgba(255, 255, 255, 0.3)',
                    borderWidth: errors.countryOfResidence ? '2px' : '1px',
                    borderRadius: '0.5rem',
                    color: 'white',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: errors.countryOfResidence ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255, 255, 255, 0.5)',
                    },
                    '&:focus-within': {
                      borderColor: errors.countryOfResidence ? '#ef4444' : '#6366f1',
                      boxShadow: `0 0 0 1px ${errors.countryOfResidence ? '#ef4444' : '#6366f1'}`,
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
              <ErrorMessage error={errors.countryOfResidence} />
            </div>

            {/* Mobile Number Field */}
            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-white mb-2">
                Mobile Number *
              </label>
              <div className="flex space-x-3">
                <div className="w-32">
                  <Select
                    options={mobileCodeOptions}
                    value={mobileCodeOptions.find(option => option.value === selectedMobileCountryCode)}
                    onChange={(option) => {
                      setValue("mobileCountryCode", option?.value || "+1");
                      trigger("mobileNumber"); // Re-validate phone when country code changes
                    }}
                    className="react-select-container"
                    classNamePrefix="react-select-mobile"
                    placeholder="+1"
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '0.5rem',
                        color: 'white',
                        minHeight: '48px', // Match py-3 input height
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
                        minWidth: '200px',
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? '#6366f1' : state.isFocused ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                        color: 'white',
                        fontSize: '14px',
                        '&:hover': {
                          backgroundColor: 'rgba(99, 102, 241, 0.2)',
                        },
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: 'white',
                        fontSize: '14px',
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: '#9ca3af',
                        fontSize: '14px',
                      }),
                      input: (base) => ({
                        ...base,
                        color: 'white',
                        fontSize: '14px',
                      }),
                    }}
                  />
                </div>
                <div className="flex-1">
                  <input
                    {...register("mobileNumber")}
                    type="tel"
                    id="mobileNumber"
                    className={`w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.mobileNumber
                        ? 'border-2 border-red-400 focus:ring-red-500 bg-red-500/10'
                        : 'border border-white/30 focus:ring-indigo-500 focus:border-transparent'
                    }`}
                    placeholder="555-123-4567"
                  />
                </div>
              </div>
              <ErrorMessage error={errors.mobileNumber} />
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
                className={`w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? 'border-2 border-red-400 focus:ring-red-500 bg-red-500/10'
                    : 'border border-white/30 focus:ring-indigo-500 focus:border-transparent'
                }`}
                placeholder="your.email@example.com"
              />
              <ErrorMessage error={errors.email} />
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

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
