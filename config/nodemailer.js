
const nodeMiler = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');


let transporter = nodeMiler.createTransport(env.smtp);


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