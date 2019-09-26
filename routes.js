const express = require("express");
const stripeLoader = require("stripe");
const router = express.Router();

const GoogleSpreadsheet =  require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('./client_secret.json')


const volunteer = async (name, address , mobile, email, type) => {
  return new Promise(async(resolve,reject) => {
      try {
          const doc = new GoogleSpreadsheet('1jjS16xtL_c3USCU9cXVSd36liMww71K3BXdhYyxz6PU');
      await promisify(doc.useServiceAccountAuth)(creds)
      const info = await promisify(doc.getInfo)();

          const sheet = info.worksheets[1];
const row = {
    name,
   address,
  mobile,
email,
type }
await promisify(sheet.addRow)(row)
resolve(200)
      } catch (error) {
          reject(error)
      }
  })


}




const subscribe = async (email) => {
  return new Promise(async(resolve,reject) => {
    try {
      const doc = new GoogleSpreadsheet('1jjS16xtL_c3USCU9cXVSd36liMww71K3BXdhYyxz6PU');
      await promisify(doc.useServiceAccountAuth)(creds)
      const info = await promisify(doc.getInfo)();

          const sheet = info.worksheets[0];
const row = {
    subscriptionemails: email }

    await promisify(sheet.addRow)(row)
    resolve(200)

    } catch (error) {
      reject(error)
    }
  })
}



// subscribe('sadasd').then(res => console.log(`ajsd${res}`)).catch(err => console.log(`error ${err}`))
router.post("/api/volunteer",async (req,res,next) => {
  const fundAndVolunter = `${req.body.fundraise} ${req.body.volunteer}`
  volunteer(req.body.name, req.body.address, req.body.mobile, req.body.email,fundAndVolunter).then(res => res.sendStatus(200)).catch(err => res.sendStatus(400))
  // res.sendStatus(200)
})





router.post("/api/subscribe", async (req, res, next) => {
  try {
    res.sendStatus(200)
    await subscribe(req.body.email).then(resp => res.sendStatus(200)).catch(err => res.sendStatus(400))
  } catch (error) {
    res.sendStatus(400)
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
  // console.log(req.body);
  try {
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
    res.send("Charged!");
    res.sendStatus(200)
    
  } catch (e) {
    // console.log(e);
    // res.send(500);
    // res.send(req)
    res.sendStatus(400)
  }
});

module.exports = router;
