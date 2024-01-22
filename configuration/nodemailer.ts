const nodemailer = require("nodemailer");
const GOOGLE_CODE_APP = process.env.GOOGLE_CODE_APP;
const EMAIL = process.env.EMAIL;
const URL_RESET_PASSWORD=process.env.URL_RESET_PASSWORD
const transporteur = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: GOOGLE_CODE_APP,
  },
});

const mailContent = (content:{toEmail:string,subject:string,text:string}) => {
    
  return {
    from: EMAIL,
    to: content.toEmail,
    subject: content.subject,
    text: content.text,
  };
};
exports.sendConfirmationCode = (email:string, code:string) => {
  return new Promise((resolve, reject) => {
    transporteur.sendMail(
      mailContent({
        toEmail: email,
        subject: "code de confirmation",
        text: "Votre code est : " + code,
      }),
      (error:Error, info:string) => {
        resolve(!error || !!info);
      }
    );
  });
};
exports.sendNewPassword = (email:string, token:string) => {
  return new Promise((resolve, reject) => {
    transporteur.sendMail(
      mailContent({
        toEmail: email,
        subject: "Lien de réinitialisation de mot de passe",
        text: "Le lien de réinitialisation de mot de passe est : "+URL_RESET_PASSWORD + token,
      }),
      (error:Error, info:string) => {
        resolve(!error || !!info);
      }
    );
  });
};
