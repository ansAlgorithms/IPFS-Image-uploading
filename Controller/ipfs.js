const ipfs = require("ipfs-http-client");
const fs = require("fs");
const imageModel = require("../Model/image");
const fileupload = require("express-fileupload");
//const express = require('express')
//const app = express()
//app.use(fileupload());

module.exports = {
  upload: async (req, res) => {
    // creating ipfs

    const ipfsClient = async () => {
      console.log("doing");
      const ipfsCreate = await ipfs.create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
      });
      console.log("doing");
      return ipfsCreate;
    };

    // save the file
    async function saveFile() {
      try {
        //if(req.files){
          // console.log(req.files)
          var file=req.files.file
          var fileName=file.name
          console.log(fileName);
          var filePath='./uploads/'+fileName   
          file.mv(filePath, async (err) => {
              if (err){
                  console.log('Error: failed to download the file');
                  return res.status(500).send(err);
              }          
              //await addFile(fileName,filePath)
              //console.log(fileHash)
              console.log(file)
              fs.unlink(filePath, (err) => { if (err) console.log(err); });
          })  
      
        let ipfs = await ipfsClient();
        //let Data = req.files.files
        let data = fs.readFileSync('./blackWidow.jpg');
        let options = {
          warpWithDirectory: false,
          progress: (prog) => console.log(`Saved :${prog}`),
        };
        let result = await ipfs.add(data, options);
        console.log(result);
        image = new imageModel({
          path: result.path,
          size: result.size,
          url: `ipfs.io/ipfs/${result.path}`
        });
        image.save();
        res.status(200).json({
          message: `Image has been uploaded. Hit the following url to see the uploaded image`,
          url: `ipfs.io/ipfs/${result.path}`,
          Path: result.path,
          Size: result.size
        });
      } catch (err) {
        console.log(err);
        res.status(401).json({ Error: err });
      }
    }
    saveFile();
  },
};
