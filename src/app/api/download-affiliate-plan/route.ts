import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // Serve the static PDF file from public folder
    const pdfPath = join(process.cwd(), 'public', 'affilliate.pdf');
    const pdfBuffer = readFileSync(pdfPath);

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="primai_affiliate_plan.pdf"'
      }
    });

  } catch (error) {
    console.error('Error serving PDF:', error);
    return NextResponse.json(
      { error: 'Failed to download PDF' },
      { status: 500 }
    );
  }
}
