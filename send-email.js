const nodemailer = require('nodemailer');

//criar um transporter 

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",  //process.env.EMAIL_HOST para pegar do .env em um projeto de vdd
  port: "465",
  secure: true, //true se a porta for 465
  auth: {
    user: "wanderson@ifsp.edu.br",
    pass: "tzus gupj vkij pkkg"
  }
})

// criar a msg para enviar o email

send = async () => {

    let info = await transporter.sendMail({
        from: 'Fulano',
        to: 'c.nicizima@aluno.ifsp.edu.br',
        subject: 'Troque seu email',
        text: 'Troque seu email', //versão em plain text
        html: '<p>Olá, troque seu email</p>' //versão em html, imagem, enviar codificada
    }) 
console.log(`Mensagem enviada: ${info.messageId}`) //id da mensagem
}

send();