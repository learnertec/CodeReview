const nodeMailer = require('../config/nodemailer');


// exports.newComment = function(comment){
//   console.log('inside newComment mailer');
//   nodeMailer.transporter.sendMail({
//      from: 'r.ranjantec@gmail.com',
//      to: comment.user.email,
//      subject: "New Comment published",
//      html: '<h1>Congrats, Your comment mean a lot to me!</h1>'
//   },function(err,info){
//      if(err){
//        console.log('Error in sending mail',err);
//        return;
//      }
//      console.log('Mail Delivered',info);
//      return;
//   });
// }


exports.newComment = (comment) => {
  // ejs will automatically pickitup becasue we use ejs to renderfile in nodemailer
  let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');

  console.log('inside new comment mailer');
  nodeMailer.transporter.sendMail({
    from: 'r.ranjantec@gmail.com',
    to: comment.user.email,
    subject: "New Comment Pulished",
    html: htmlString
  },(err,info) => {
    if(err){
      console.log('Error in sending mail',err);
      return;
    }
   console.log('Message sent',info);
   return;
  });
}

// it is same as module.exports = newComment function
// exports.newComment;