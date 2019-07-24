const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs('access.log',{
 interval: '1d',
 path: logDirectory
});

const development = {
    name: 'development',
    aseet_path: './public/assets',
    session_cookie_key: 'somethhing',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'r.ranjantec@gmail.com',
            pass: 'learner@9470039793'
        } 
    },
    google_client_id: "323048417130-73b82vl8npqslcjao2sr4dmebaoj21b6.apps.googleusercontent.com",
    google_client_secret: "cmSYhcxFRgB324HGinFpcL3Z",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: 'production'
}

module.exports = development;