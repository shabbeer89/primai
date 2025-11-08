import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { formSchema } from '@/lib/form-schema';

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'; // Default to a sample sheet
const SHEET_NAME = 'GetStartedForm';

async function getGoogleSheetsClient() {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '', 'base64').toString()
  );

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

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

    // Initialize Google Sheets client
    const sheets = await getGoogleSheetsClient();

    // Prepare the data to append
    const values = [
      [
        new Date().toISOString(), // Timestamp
        formData.name,
        formData.requiredService,
        formData.countryOfOrigin,
        formData.countryOfResidence,
        formData.mobileNumber,
        formData.email,
      ],
    ];

    // Check if sheet exists, if not create it
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:G`,
        valueInputOption: 'RAW',
        requestBody: {
          values,
        },
      });
    } catch (error) {
      // If sheet doesn't exist, create it first
      try {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SPREADSHEET_ID,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: SHEET_NAME,
                  },
                },
              },
            ],
          },
        });

        // Add headers
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_NAME}!A1:G1`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [['Timestamp', 'Name', 'Required Service', 'Country of Origin', 'Country of Residence', 'Mobile Number', 'Email']],
          },
        });

        // Now append the data
        await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_NAME}!A:G`,
          valueInputOption: 'RAW',
          requestBody: {
            values,
          },
        });
      } catch (sheetError) {
        console.error('Error creating sheet:', sheetError);
        return NextResponse.json(
          { error: 'Failed to create Google Sheets worksheet' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { message: 'Form submitted successfully', data: formData },
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
