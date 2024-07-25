import { createTransport } from "nodemailer";
const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = process.env;

async function sendEmail(data) {
  try {
    console.log(GOOGLE_EMAIL, GOOGLE_PASSWORD)
    const trasport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: GOOGLE_EMAIL, pass: GOOGLE_PASSWORD },
    });
    //OPCIONALMENTE verificar el transporte
    await trasport.verify();
    await trasport.sendMail({
      from: data.from,
      to: data.to,
      subject:data.subject,
      html: data.template,
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;