const multer = require('multer')
const csv = require('csv-parser')
const fs = require('fs')
const path = require('path');
const addProd = require('../SqlServices/addProduct');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname + Date.now());
    }
  });

  var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      if (ext !== '.csv') {
        return callback(new Error('Only images are allowed'))
      }
      callback(null, true)
    }
  })

async function addCsv(req,res)
{
    upload.single('csv')(req, res, async function (err) {
        let fileName = req.file.path;
        let results = []
        fs.createReadStream(fileName)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
        let email = req.session.email;
        results.forEach(async(p)=>{
            let product = {
                Sid:email,
                name:p.name,
                price:p.price,
                quantity:p.quantity,
                description:p.description,
                image:p.image,
            }
            await addProd(product)
        })
        });
        res.redirect('/seller')
    })
}

module.exports = { addCsv }