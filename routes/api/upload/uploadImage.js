const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');
const imageUploader = multer({ dest: 'images/' });

router.post('/cover', imageUploader.single('cover'), (req, res) => {
    const processedFile = req.file || {};
    let orgName = processedFile.originalname || '';
    orgName = orgName.trim().replace(/ /g, "-")
    const fullPathInServ = processedFile.path;
    const newFullPath = `${fullPathInServ}-${orgName}`;
    fs.renameSync(fullPathInServ, newFullPath);
    res.send({
        success: true,
        message: 'file uploaded',
        fileNameInServer: newFullPath
    })
})


module.exports = router;