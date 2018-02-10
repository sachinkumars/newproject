const nodemailer = require('nodemailer');
const mustache = require('mustache');
const fs = require('fs');
const path = require('path');

const fromEmail = '"NewProject" <newproject@gmail.com>';

const templates = {
    'welcome': {
        from: fromEmail,
        subject: 'Welcome to NewProject',
        template: '../templates/welcome.html'
    }
};

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, //true for 465, false for other ports
    auth: {
        user: 'newproject@gmail.com',
        pass: 'newproject2018'
    }
});

const sendMail = (type, mailOptions) => {
    return new Promise((resolve, reject) => {
        if (!templates.hasOwnProperty(type))
            reject(new Error('Unknown email type'));
        try {
            const defaultOption = templates[type];
            const content = fs.readFileSync(path.join(__dirname, defaultOption.template), 'utf-8');

            let options = {
                html: mustache.render(content, mailOptions),
                subject: mustache.render(defaultOption.subject, mailOptions),
                to: mailOptions.to.toString(),
                from: mailOptions.from || defaultOption.from
            };

            transporter.sendMail(options, (error, response) => {
                if (error)
                    reject(error);
                resolve(response);
            });
        } catch(error) {
            reject(error);
        }
    });
};

module.exports = {
    sendMail
};