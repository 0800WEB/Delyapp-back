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
      from: `ADOPTME <${GOOGLE_EMAIL}>`,
      to: data.to,
      subject: `USER ${data.first_name.toUpperCase()} REGISTERED!`,
      html: `
        <h1 style="color: red">WELCOME TO ADOPTME!</h1>
        <p>VERIFY CODE: ${data.code}</p>
      `,
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;