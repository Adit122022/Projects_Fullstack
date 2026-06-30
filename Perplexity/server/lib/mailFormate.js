export const Project_Name = "AKIRA"

export const mailFormate = (username,email,verificationUrl)=>`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verify Your Email :${email}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 20px;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08);">

<tr>
<td style="background:#4F46E5;padding:30px;text-align:center;">
<h1 style="color:#ffffff;margin:0;font-size:28px;">
${Project_Name}
</h1>
</td>
</tr>

<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#111827;">
Welcome, ${username}! 👋
</h2>

<p style="font-size:16px;line-height:1.7;color:#4B5563;">
Thank you for creating your account with
<strong>${Project_Name}</strong>.
</p>

<p style="font-size:16px;line-height:1.7;color:#4B5563;">
Before getting started, please verify your email address by clicking the button below.
</p>

<div style="text-align:center;margin:40px 0;">
<a href="${verificationUrl}"
style="
background:#4F46E5;
color:#ffffff;
padding:14px 32px;
text-decoration:none;
border-radius:8px;
display:inline-block;
font-size:16px;
font-weight:bold;
">
Verify Email
</a>
</div>

<p style="font-size:14px;color:#6B7280;">
Or copy and paste this link into your browser:
</p>

<p style="word-break:break-all;">
<a href="${verificationUrl}" style="color:#4F46E5;">
${verificationUrl}
</a>
</p>

<hr style="border:none;border-top:1px solid #e5e7eb;margin:35px 0;">

<p style="font-size:14px;color:#6B7280;">
If you didn't create an account, you can safely ignore this email.
</p>

<p style="font-size:14px;color:#6B7280;">
Best Regards,<br>
<strong>The ${Project_Name} Team</strong>
</p>

</td>
</tr>

<tr>
<td style="background:#F9FAFB;padding:20px;text-align:center;font-size:12px;color:#9CA3AF;">
© ${new Date().getFullYear()} ${Project_Name}. All rights reserved.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>`
