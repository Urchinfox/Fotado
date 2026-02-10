// app/api/send-email/route.js
import { Resend } from "resend";
import axios from "axios";

const resend = new Resend(process.env.RESEND_API_KEY);
const ABSTRACT_API_KEY = process.env.ABSTRACT_EMAIL_API_KEY;



export async function POST(request) {


  try {
    const body = await request.json();
    console.log('收到 body:', body);
    const { name, email, phone = '', message } = body;

    // 簡單驗證（可加強）
    if (!name || !email || !message) {
      return Response.json(
        { error: '姓名、Email 和訊息為必填' },
        { status: 400 }
      );
    }


    //用 Abstract API 驗證 email

    const verifyRes = await axios.get(
      `https://emailreputation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_EMAIL_API_KEY}&email=${encodeURIComponent(email)}`
    );

    console.log('Abstract API 回應:', verifyRes.data);

    const verification = verifyRes.data;

    // 判斷 email 是否有效
    if (verification.email_deliverability.status !== 'deliverable') {
      return Response.json(
        { error: '請輸入有效的 email 地址' },
        { status: 400 }
      );
    }
    console.log('email 驗證通過，開始寄信');


    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',  // 先用 Resend 預設 之後可改成你的域名
      to: ['carico.auto@gmail.com'],               // 公司email
      subject: `新聯絡表單 - ${name}`,
      html: `
        <h2 style="color: #333;">新聯絡表單</h2>
        <p><strong>姓名：</strong> ${name}</p>
        <p><strong>Email：</strong> ${email}</p>
        <p><strong>電話：</strong> ${phone || '未提供'}</p>
        <p><strong>訊息：</strong></p>
        <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br/>')}</p>
        <hr />
        <p style="color: #888; font-size: 12px;">此訊息來自網站聯絡表單</p>
      `,
    });

    if (error) {
      console.error('Resend 發信錯誤:', error);
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ success: true, message: '訊息已送出！' });
  } catch (err) {
    console.error('伺服器錯誤:', err);
    return Response.json({ error: '伺服器錯誤，請稍後再試' }, { status: 500 });
  }
}