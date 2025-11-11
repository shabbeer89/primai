import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET() {
  try {
    // Launch puppeteer browser
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();

    // Set viewport to match typical screen size
    await page.setViewport({ width: 1200, height: 800 });

    // Navigate to the affiliate page
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    await page.goto(`${baseUrl}/affiliate`, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for content to load (animations, etc.)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Inject CSS to hide navbar and add page breaks
    await page.addStyleTag({
      content: `
        /* Hide navbar */
        nav, .navbar, [class*="navbar"], [class*="nav"] {
          display: none !important;
        }

        /* Hide floating WhatsApp button and chat elements */
        .fixed.z-50, [class*="whatsapp"], [class*="floating"], button[class*="whatsapp"], [class*="chat"] {
          display: none !important;
        }

        /* Hide buttons in hero section */
        .flex.flex-col.sm\\:flex-row.gap-4.justify-center a,
        .flex.flex-col.sm\\:flex-row.gap-4.justify-center button {
          display: none !important;
        }

        /* Add page breaks before each major section */
        /* Welcome Section stays on first page with hero */

        /* BDE Section - page 2 */
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12:nth-of-type(1) {
          page-break-before: always;
        }

        /* BDM Section - page 3 */
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12:nth-of-type(2) {
          page-break-before: always;
        }

        /* Top Performer Bonus Section - page 4 */
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12:nth-of-type(3) {
          page-break-before: always;
        }

        /* Promotion Path Section - page 5 */
        .bg-gradient-to-r.from-yellow-500\\/20.to-orange-500\\/20.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12.border-2.border-yellow-400 {
          page-break-before: always;
        }

        /* Earning Scenarios Section - page 6 */
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12:nth-of-type(4) {
          page-break-before: always;
        }

        /* Why Choose PrimAI Section - page 7 */
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12:nth-of-type(5) {
          page-break-before: always;
        }

        /* Quick Reference Section - page 8 */
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12:nth-of-type(6) {
          page-break-before: always;
        }

        /* Call to Action Section - page 9 */
        .bg-gradient-to-r.from-indigo-600.to-purple-600.rounded-2xl.p-8.md\\:p-12.text-center {
          page-break-before: always;
        }

        /* Prevent page breaks inside cards */
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12,
        .bg-gradient-to-r.from-yellow-500\\/20.to-orange-500\\/20.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12.border-2.border-yellow-400,
        .bg-gradient-to-r.from-indigo-600.to-purple-600.rounded-2xl.p-8.md\\:p-12.text-center {
          page-break-inside: avoid !important;
        }

        /* Center cards vertically and horizontally on each page */
        .max-w-6xl.mx-auto.px-4.py-16 {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          min-height: 100vh !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          align-items: center !important;
        }

        /* Ensure proper spacing at page breaks */
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12.mb-12,
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12 {
          margin-bottom: 0 !important;
        }
      `
    });

    // Generate PDF with the same styling as the page
    const pdfBuffer = await page.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      },
      preferCSSPageSize: false,
      displayHeaderFooter: false,
    });

    await browser.close();

    // Return PDF as response
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="primai_affiliate_plan.pdf"'
      }
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
