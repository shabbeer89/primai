# Google Sheets Integration Setup

This guide will help you set up Google Sheets integration for the Get Started form submissions.

## Prerequisites

- Google account (collab.primai@gmail.com)
- Google Cloud Console access

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`

## Step 2: Set up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

## Step 3: Create Service Account

1. In Google Cloud Console, go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the details:
   - Service account name: `primai-form-submissions`
   - Service account ID: `primai-form-submissions@primai.iam.gserviceaccount.com`
   - Description: `Service account for PrimAI form submissions`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 4: Generate Service Account Key

1. In the "Credentials" page, find your new service account
2. Click on it, then go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Select "JSON" format
5. Download the JSON file (keep it secure!)

## Step 5: Share Google Sheet with Service Account

1. Open your Google Sheet
2. Click "Share" button
3. Paste the service account email (from the JSON file: `client_email`)
4. Give it "Editor" permissions
5. Click "Share"

## Step 6: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in the values:

```env
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_KEY=your_base64_encoded_key_here
```

### Encoding the Service Account Key

Run this command to base64 encode your JSON key file:

```bash
# On Linux/Mac
base64 -w 0 your-service-account-key.json

# On Windows (PowerShell)
[Convert]::ToBase64String([System.IO.File]::ReadAllBytes("your-service-account-key.json"))
```

Copy the entire output and paste it as the `GOOGLE_SERVICE_ACCOUNT_KEY` value.

## Step 7: Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/get-started`
3. Fill out and submit the form
4. Check your Google Sheet - the data should appear in a new sheet called "GetStartedForm"

## Troubleshooting

### Common Issues:

1. **"Invalid credentials" error**: Check that your service account key is correctly base64 encoded and the JSON is valid.

2. **"Access denied" error**: Make sure you've shared the Google Sheet with the service account email and given it Editor permissions.

3. **"Spreadsheet not found" error**: Verify that your `GOOGLE_SHEETS_SPREADSHEET_ID` is correct.

4. **API quota exceeded**: Google Sheets API has free quotas. If exceeded, you'll need to set up billing.

### Sheet Structure

The form data will be saved with these columns:
- Timestamp
- Name
- Required Service
- Country of Origin
- Country of Residence
- Mobile Number
- Email

## Security Notes

- Never commit the `.env.local` file to version control
- Keep your service account key secure
- Regularly rotate service account keys
- Monitor API usage in Google Cloud Console
