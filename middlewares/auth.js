const jwt = require('jsonwebtoken');
const config = require('config');

const auth = async function (req, res, next) {
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
                if (!user) {
                    return res.status(401).json({error: 'Invalid Token', success: false});
                }
                req.user = decoded.user;
                next();
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'something wrong with auth middleware' });
    }
};

module.exports = auth;