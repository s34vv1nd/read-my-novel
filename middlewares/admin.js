const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

const admin = async function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    //console.log(token);
    // Verify token
    try {
        await jwt.verify(token, config.get('jwtSecret'), async (error, decoded) => {
            if (error) {
                res.status(401).json({ msg: 'Token is not valid' });
            }
            else {
                const user = await User.findById(decoded.user.id);
                if (!user.admin) {
                    return res.status(401).json({error: 'You are not admin', success: false});
                }
                req.user = req.decoder;
                next();
            }
        });
    } catch (err) {
        console.error('something wrong with admin middleware')
        res.status(500).json({ msg: 'Server Error' });
    }
};

module.exports = admin;