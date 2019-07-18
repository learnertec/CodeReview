
const nodeMiler = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


let transporter = nodeMiler.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'r.ranjantec@gmail.com',
        pass: 'learner@9470039793'
    } 
});


// let renderTemplate = function(data,relativePath){
//     let mailHTML;
//     ejs.renderFile(
//         path.join(__dirname,'../views/mailers',relativePath,data,function(err,template){
//             if(err){
//                 console.log('err in rendering email template',err);
//                 return;
//             }
//             mailHTML = template
//         })
//     )
//     return mailHTML;
// }

let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('error in rendering template',err); return }

            mailHTML = template;
        }

    )
        return mailHTML; 
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}