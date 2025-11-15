import { NextRequest, NextResponse } from 'next/server';
import { formSchema } from '@/lib/form-schema';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the form data
    const validationResult = formSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // Prepare the data for Supabase - handle both requiredService and requiredServices
    const requiredServiceValue = formData.requiredServices
      ? formData.requiredServices.join(', ') // Convert array to comma-separated string
      : formData.requiredService || '';

    const submissionData = {
      name: formData.name,
      required_service: requiredServiceValue,
      country_of_origin: formData.countryOfOrigin,
      country_of_residence: formData.countryOfResidence,
      mobile_number: formData.mobileNumber,
      email: formData.email,
      application_type: formData.requiredServices ? 'bde' : 'general', // Track application type
      created_at: new Date().toISOString(),
    };

    // Insert into Supabase using admin client to bypass RLS
    const { data, error } = await supabaseAdmin
      .from('primai_form_submissions')
      .insert([submissionData])
      .select();

    if (error) {
      console.error('Supabase error:', error);

      // If Supabase table doesn't exist, provide instructions
      if (error.message?.includes('relation "primai_form_submissions" does not exist')) {
        console.log('Supabase table not found. Please create the table manually in Supabase dashboard.');
        console.log('Form data received:', formData);
        return NextResponse.json(
          {
            message: 'Form submitted successfully (table needs to be created)',
            data: formData,
            note: 'Please create the primai_form_submissions table in your Supabase dashboard using the SQL from supabase_setup.sql'
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to save form data to database' },
        { status: 500 }
      );
    }

    console.log('Form data saved to Supabase:', data);

    return NextResponse.json(
      {
        message: 'Form submitted successfully',
        data: formData,
        supabaseData: data
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
