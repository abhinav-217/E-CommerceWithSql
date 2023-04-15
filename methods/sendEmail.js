const Mailjet = require('node-mailjet').apiConnect(
    "d55b4661fc0741d49ccedb0677296423",
    "4b1ea64a26d639363ab8362b24f80e15"
);
module.exports = function (email, otp, UseCase ,callback) {
    const request = Mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: 'abhinav.saxena@ssipmt.com',
                    Name: 'Pur-Chase --- Email Verification OTP',
                },
                To: [
                    {
                        Email: email,
                        Name: 'We dont need',
                    },
                ],
                Subject: UseCase,
                TextPart: 'If you enjoys purchase Saste/Cheap products. verify quickly',
                HTMLPart: `<h2>Your One time password</h2>
                           ${otp}`
            },
        ],
    })


    request
        .then(result => {
            // console.log(result.body.Messages[0].Status)
            callback(null, result.body)
        })
        .catch(err => {
            console.log(err);
            callback(err, null)

        })
}
