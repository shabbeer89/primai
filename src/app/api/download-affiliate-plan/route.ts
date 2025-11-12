import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export async function GET() {
  try {
    // Launch puppeteer browser
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: await chromium.executablePath(),
      args: [
        ...chromium.args,
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

        /* Allow natural page flow - only break when necessary */
        /* Welcome Section stays on first page with hero */

        /* Force page break only for major section transitions */
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12:nth-of-type(1),
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12:nth-of-type(2),
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12:nth-of-type(3),
        .bg-gradient-to-r.from-yellow-500\\/20.to-orange-500\\/20.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12.border-2.border-yellow-400:nth-of-type(1),
        .bg-gradient-to-r.from-blue-500\\/20.to-indigo-500\\/20.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12.border-2.border-blue-400:nth-of-type(1),
        .bg-gradient-to-r.from-blue-500\\/20.to-indigo-500\\/20.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12.border-2.border-blue-400:nth-of-type(2),
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12:nth-of-type(4),
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12:nth-of-type(5),
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12:nth-of-type(6) {
          page-break-before: auto;
          page-break-after: auto;
        }

        /* Only force page break for Call to Action to ensure it's on its own page */
        .bg-gradient-to-r.from-indigo-600.to-purple-600.rounded-2xl.p-8.md\\:p-12.text-center {
          page-break-before: always;
        }

        /* Prevent page breaks inside cards */
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12,
        .bg-gradient-to-r.from-yellow-500\\/20.to-orange-500\\/20.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12.border-2.border-yellow-400,
        .bg-gradient-to-r.from-blue-500\\/20.to-indigo-500\\/20.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12.border-2.border-blue-400,
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

        /* Ensure proper spacing between cards */
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12.mb-12,
        .bg-white\\/10.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12,
        .bg-gradient-to-r.from-yellow-500\\/20.to-orange-500\\/20.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12.border-2.border-yellow-400,
        .bg-gradient-to-r.from-blue-500\\/20.to-indigo-500\\/20.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12.border-2.border-blue-400,
        .bg-gradient-to-r.from-indigo-600.to-purple-600.rounded-2xl.p-8.md\\:p-12.text-center {
          margin-bottom: 30px !important;
          margin-top: 20px !important;
        }

        /* Add extra spacing for yellow gradient cards */
        .bg-gradient-to-r.from-yellow-500\\/20.to-orange-500\\/20.backdrop-blur-lg.rounded-2xl.p-8.md\\:p-12.border-2.border-yellow-400 {
          margin-bottom: 40px !important;
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
