const express = require("express");
const stripe = require('stripe')(process.env.stripeSecret);
const router = new express.Router();

router.post("/acceptPayment", async (req, res) => {
    try {
        stripe.paymentIntents.create({
                amount:req.query.amount,
                currency: req.query.currency,
                payment_method: req.query.pm_id,
                confirmation_method:"automatic",
                confirm:true,
                description: req.query.description
            },
            function (err, paymentIntent){
            if (err!==null){
                console.log("Error", err);
                res.send("There was an error");

            }else {
                console.log("Payment success", paymentIntent)
                res.json({
                    paymentIntent: paymentIntent
                })
            }

        })
        // sendEmail(name, email, phone, message);
        // sendConfirmationEmail(email, name);
        res.status(200).send("Email sent successfully");
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
