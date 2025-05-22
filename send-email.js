const nodemailer = require('nodemailer');


// Criar um transporter

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // --> Exemplo: process.env.EMAIL_HOST
    port: '465',
    secure: true, // True se a porta for a 465
    auth: {
        user: 'gabriel.domiciano@aluno.ifsp.edu.br',
        pass: 'tzus gupj vkij pkkg' // Senha do email
    }
});

// Criar a mensagem/processo para enviar o email

send = async () => {
    let info = await transporter.sendMail({
        from: 'Gabriel',
        to: 'gm08155@gmail.com',
        subject: 'Assunto do email',
        text: 'Texto do email', // Versão em texto plano
        html: '<strong> Seja bem vindo! </strong>' // Versão em HTML que aceite as Tags do HTML
    });
    
    console.log(`Mensagem enviada: ${info.messageId}`);
}

send();