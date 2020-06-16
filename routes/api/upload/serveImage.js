const router = require('express').Router();
const path = require('path');

router.get('/:name', (req, res) => {
    const fileName = req.params.name;
    console.log('fileName', fileName);
    if (!fileName) {
        return res.send({
            success: false,
            message: 'no filename specified',
        })
    }
    res.sendFile(path.resolve(`./images/${fileName}`));
})

module.exports = router;