const express = require("express");
const stripeLoader = require("stripe");
const router = express.Router();

router.get("/api/hello", (req, res, next) => {
  console.log("sdasd");
});

router.get("/",(req,res,next) => {
  res.send('gee')
})
const stripe = new stripeLoader("sk_test_Zq0gEeme3OrsfasvNj1usezK005wYl82oQ");

const charge = (token, amt, email) => {
  return stripe.charges.create({
    amount: amnt * 100,
    currency: "usd",
    source: token,
    description: "Statement Description",
    receipt_email: email
  });
};
router.get("/api/donate", (req,res,next) => {
  res.send('Api of donate section')
})
router.post("/api/donate", async (req, res, next) => {
  // try {
    console.log(req);
    // let data = await charge(req, req.body.token.id, req.body.amount);
    console.log(req.body.token);
    // res.send("Charged!");
  // } catch (e) {
    // console.log(e);
    // res.send(500);
    // res.send(req)
    res.send('working )')
  // }
});

module.exports = router;
