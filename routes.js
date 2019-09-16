const express = require("express");
const stripeLoader = require("stripe");
const router = express.Router();

const GoogleSpreadsheet =  require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('./client_secret.json')



async function accessSpreadSheet (email,currentDate){
 


}
// accessSpreadSheet('asdsa','asdawo')
router.post("/api/subscribe", async (req, res, next) => {
  try {
   
    const doc = new GoogleSpreadsheet('1nJpLRHjhOG1tqqXDZgw3iegkbM3JQNVGaIkAlCooz-s');
    await promisify(doc.useServiceAccountAuth)(creds)
    const info = await promisify(doc.getInfo)();
  
    // info[0]
    // //  Selecting Sheets
    const sheet = info.worksheets[0];
  
  
    const row = {
      subscriptionemails : req.body.email,
      date : req.body.currentDate }

        await promisify(sheet.addRow)(row)
      res.send(200)

  }catch(e) {
    res.send(e)
  }



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
  try {
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
    res.send(200)
    
  } catch (e) {
    // console.log(e);
    // res.send(500);
    // res.send(req)
    res.send('working )')
  }
});

module.exports = router;
