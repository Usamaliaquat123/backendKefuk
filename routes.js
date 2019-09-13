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

const charge = (token, amt, email,descText) => {
  return stripe.charges.create({
    amount: amt * 100,
    currency: "usd",
    source: token,
    description: descText,
    receipt_email: email,
  
  });
};


router.get("/api/donate", (req,res,next) => {
  res.send('Api of donate section')
})
router.post("/api/donate", async (req, res, next) => {
  // try {
    console.log(req);
    let descText = ''
    if(req.body.amount == 10){
      descText = "Donation of education of a child"
    }else if(req.body.amount == 25){
      descText = "Sponsor a education of a child"
    }else if(req.body.amount == 60){
      descText = "Sponsor a female trainee teacher"
    }else{
      descText = "Custom Donation"
    }
    let data = await charge(req.body.token.id, req.body.amount, req.body.email, descText);
    console.log("==================================");
    console.log(data);
    console.log("==================================");
    res.send("Charged!");
    
  // } catch (e) {
    // console.log(e);
    // res.send(500);
    // res.send(req)
    res.send('working )')
  // }
});

module.exports = router;
