import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Your email address where notifications will be sent
const NOTIFICATION_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL || 'your-email@example.com';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const {
            firstName,
            lastName,
            email,
            phone,
            status,
            interest,
            painPoint,
            budget,
            timeline,
            locale
        } = data;

        // Format the email content
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #0047AB, #06B6D4); padding: 30px; border-radius: 12px 12px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Neuer Lead über das Quiz!</h1>
                    <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">
                        Sprache: <strong style="color: white;">${locale === 'en' ? '🇬🇧 Englisch' : '🇩🇪 Deutsch'}</strong>
                    </p>
                </div>
                
                <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
                    <h2 style="color: #111; margin-top: 0; font-size: 18px;">📋 Kontaktdaten</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;">Name:</td>
                            <td style="padding: 8px 0; font-weight: bold; color: #111;">${firstName} ${lastName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;">E-Mail:</td>
                            <td style="padding: 8px 0;">
                                <a href="mailto:${email}" style="color: #0047AB; font-weight: bold;">${email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;">Telefon:</td>
                            <td style="padding: 8px 0;">
                                <a href="tel:${phone}" style="color: #0047AB; font-weight: bold;">${phone}</a>
                            </td>
                        </tr>
                    </table>
                    
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                    
                    <h2 style="color: #111; font-size: 18px;">📊 Quiz-Antworten</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;">Status:</td>
                            <td style="padding: 8px 0; color: #111;">${status || '-'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;">Interesse:</td>
                            <td style="padding: 8px 0; color: #111;">${interest || '-'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;">Pain Point:</td>
                            <td style="padding: 8px 0; color: #111;">${painPoint || '-'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;">Budget:</td>
                            <td style="padding: 8px 0; color: #111; font-weight: bold;">
                                ${budget === 'yes' ? '✅ Ja, bereit zu investieren' : budget === 'unsure' ? '🤔 Unsicher' : '❌ Nein'}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;">Timeline:</td>
                            <td style="padding: 8px 0; color: #111;">${timeline || '-'}</td>
                        </tr>
                    </table>
                </div>
                
                <div style="background: #111; padding: 20px 30px; border-radius: 0 0 12px 12px; text-align: center;">
                    <a href="mailto:${email}" style="display: inline-block; background: #0047AB; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                        Direkt antworten →
                    </a>
                </div>
            </div>
        `;

        const { data: emailData, error } = await resend.emails.send({
            from: 'DOCEBA Leads <leads@kosmetikentwicklung.com>',
            to: [NOTIFICATION_EMAIL],
            subject: `🎯 Neuer Lead: ${firstName} ${lastName} (${locale === 'en' ? 'EN' : 'DE'})`,
            html: emailHtml,
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, id: emailData?.id });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to send notification' },
            { status: 500 }
        );
    }
}
