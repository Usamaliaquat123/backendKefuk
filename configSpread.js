const GoogleSpreadsheet =  require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('./client_secret.json')

function spreadSheet() {
         
    const doc = new GoogleSpreadsheet('1nJpLRHjhOG1tqqXDZgw3iegkbM3JQNVGaIkAlCooz-s');
    await promisify(doc.useServiceAccountAuth)(creds)
    const info = await promisify(doc.getInfo)();
    return info
      }

module.export = spreadSheet