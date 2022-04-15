const ipfs = require("ipfs-http-client");
const fs = require("fs");
const imageModel = require("../Model/image");
const fileupload = require("express-fileupload");

module.exports = {
  upload: async (req, res) => {

    // creating ipfs server
    const ipfsClient = async () => {
      const ipfsCreate = await ipfs.create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
      })
      return ipfsCreate;
    };

    // saving the file
    async function saveFile() {
      try {
        let data 
        var file=req.files.file
        var fileName=file.name
        console.log('File name : ' + fileName);
        var filePath = './uploads/' + fileName
        function move(){
          // move files to local storage
          file.mv(filePath, async() => {  // file uploaded to local storage

            // Now The file at local storage is uploading into ipfs server
              data = fs.readFileSync(filePath)
              let options = {
                warpWithDirectory: false,
                progress: (prog) => console.log(`Saved :${prog}`),
              }
              let result = await ipfs.add(data, options);
              console.log(result);
              // file hash is saving into datatbase
              image = new imageModel({
                path: result.path,
                size: result.size,
                url: `ipfs.io/ipfs/${result.path}`
              });
              image.save();
              // Sending the response to the user
              res.status(200).send('URL : ipfs.io/ipfs/' + result.path)
          }) 
        }
        let ipfs = await ipfsClient()
        await move()
        
      } catch (err) {
        console.log(err);
        res.status(401).json({ Error: err });
      }
    }
    await saveFile()
  }
};
