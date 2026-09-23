const clean = (value, max = 5000) => String(value ?? '').trim().slice(0, max);
const escapeHtml = (value) => clean(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
}[char]));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return res.status(503).json({ error: 'Contact delivery is not configured yet.' });
  }

  const name = clean(req.body?.name, 120);
  const email = clean(req.body?.email, 254);
  const phone = clean(req.body?.phone, 40);
  const interest = clean(req.body?.interest, 120);
  const meetingDate = clean(req.body?.meeting_date, 20);
  const meetingTime = clean(req.body?.meeting_time, 20);
  const message = clean(req.body?.message, 5000);
  const emailUpdates = Boolean(req.body?.email_updates);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isMeetingRequest = interest === 'Meeting Request';
  if (!name || !emailPattern.test(email) || !phone || !interest || !message || (isMeetingRequest && (!meetingDate || !meetingTime))) {
    return res.status(400).json({ error: 'Please complete all required fields.' });
  }

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
      <h2>New BAIDNET website inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Interest:</strong> ${escapeHtml(interest)}</p>
      ${isMeetingRequest ? `<p><strong>Preferred meeting:</strong> ${escapeHtml(meetingDate)} at ${escapeHtml(meetingTime)}</p>` : ''}
      <p><strong>Email updates opt-in:</strong> ${emailUpdates ? 'Yes' : 'No'}</p>
      <hr>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'BAIDNET Website <website@blackwall-interconnectedco.com>',
        to: [to],
        reply_to: email,
        subject: `BAIDNET Contact: ${interest}`,
        html
      })
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('Resend contact delivery failed', response.status, result);
      return res.status(502).json({ error: 'Message delivery failed. Please try again.' });
    }

    const confirmationHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.65;color:#111;max-width:640px;margin:auto">
        <h2 style="margin-bottom:8px">We received your BAIDNET inquiry.</h2>
        <p>Hello ${escapeHtml(name)},</p>
        <p>Thank you for contacting BlackWall-Interconnected and BAIDNET. Your submission has been received by our team.</p>
        <p><strong>Inquiry:</strong> ${escapeHtml(interest)}</p>
        ${isMeetingRequest ? `<p><strong>Requested meeting:</strong> ${escapeHtml(meetingDate)} at ${escapeHtml(meetingTime)}</p><p>Your requested time is not confirmed yet. A team member will follow up by email to confirm availability.</p>` : '<p>A team member will follow up as appropriate.</p>'}
        <p>— BlackWall-Interconnected / BAIDNET Team</p>
      </div>`;

    const confirmationResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'BAIDNET <website@blackwall-interconnectedco.com>',
        to: [email],
        reply_to: to,
        subject: isMeetingRequest ? 'We received your BAIDNET meeting request' : 'We received your BAIDNET inquiry',
        html: confirmationHtml
      })
    });

    if (!confirmationResponse.ok) {
      const confirmationResult = await confirmationResponse.json().catch(() => ({}));
      console.error('Resend submitter confirmation failed', confirmationResponse.status, confirmationResult);
      return res.status(502).json({ error: 'Your message reached our team, but we could not send your confirmation email. Please try again.' });
    }

    return res.status(200).json({ ok: true, confirmationSent: true });
  } catch (error) {
    console.error('Contact endpoint error', error);
    return res.status(500).json({ error: 'Message delivery failed. Please try again.' });
  }
}
