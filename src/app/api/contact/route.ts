import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "请填写所有必填字段" },
        { status: 400 }
      );
    }

    // Log the form submission
    console.log("收到联系表单提交:", {
      name,
      email,
      company,
      service,
      message,
      timestamp: new Date().toISOString(),
    });

    // Try to send email with multiple configurations
    let emailSent = false;
    const emailConfigs = [
      {
        name: "QQ邮箱 SSL",
        config: {
          host: "smtp.qq.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER || "3279406579@qq.com",
            pass: process.env.EMAIL_PASS || "",
          },
        },
      },
      {
        name: "QQ邮箱 STARTTLS",
        config: {
          host: "smtp.qq.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER || "3279406579@qq.com",
            pass: process.env.EMAIL_PASS || "",
          },
        },
      },
      {
        name: "QQ邮箱 Service",
        config: {
          service: "QQ",
          auth: {
            user: process.env.EMAIL_USER || "3279406579@qq.com",
            pass: process.env.EMAIL_PASS || "",
          },
        },
      },
    ];

    // Email content
    const mailOptions = {
      from: `"知微工作室网站" <${process.env.EMAIL_USER || "3279406579@qq.com"}>`,
      to: "3279406579@qq.com",
      replyTo: email,
      subject: `[知微工作室] 新消息 - ${name}`,
      html: `
        <div style="font-family: 'Microsoft YaHei', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #06060a; padding: 30px; border-radius: 10px;">
            <h1 style="color: #c83246; margin: 0 0 20px 0; font-size: 24px;">知微工作室 - 新消息</h1>
            <div style="background-color: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 14px; width: 80px;">姓名</td>
                  <td style="padding: 10px 0; color: white; font-size: 14px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 14px; border-top: 1px solid rgba(255,255,255,0.05);">邮箱</td>
                  <td style="padding: 10px 0; color: white; font-size: 14px; border-top: 1px solid rgba(255,255,255,0.05);">
                    <a href="mailto:${email}" style="color: #c83246; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                ${company ? `
                <tr>
                  <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 14px; border-top: 1px solid rgba(255,255,255,0.05);">公司</td>
                  <td style="padding: 10px 0; color: white; font-size: 14px; border-top: 1px solid rgba(255,255,255,0.05);">${company}</td>
                </tr>
                ` : ''}
                ${service ? `
                <tr>
                  <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 14px; border-top: 1px solid rgba(255,255,255,0.05);">服务</td>
                  <td style="padding: 10px 0; color: white; font-size: 14px; border-top: 1px solid rgba(255,255,255,0.05);">${service}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 14px; border-top: 1px solid rgba(255,255,255,0.05); vertical-align: top;">消息</td>
                  <td style="padding: 10px 0; color: white; font-size: 14px; border-top: 1px solid rgba(255,255,255,0.05); line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
                </tr>
              </table>
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05);">
              <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">
                此邮件由知微工作室网站联系表单自动发送
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Try each email configuration
    for (const { name: configName, config } of emailConfigs) {
      try {
        console.log(`尝试使用 ${configName} 发送邮件...`);
        const transporter = nodemailer.createTransport(config);
        await transporter.sendMail(mailOptions);
        console.log(`邮件发送成功 (${configName})`);
        emailSent = true;
        break;
      } catch (configError) {
        console.error(`${configName} 失败:`, configError);
      }
    }

    if (!emailSent) {
      console.error("所有邮件配置都失败了");
      // Return success anyway - the form submission is logged
      return NextResponse.json(
        { 
          message: "消息已收到，我们会尽快回复您！",
          note: "邮件发送暂时不可用，但我们已收到您的消息"
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "消息已发送，我们会尽快回复您！" },
      { status: 200 }
    );
  } catch (error) {
    console.error("处理表单失败:", error);
    return NextResponse.json(
      { error: "发送失败，请稍后重试" },
      { status: 500 }
    );
  }
}
