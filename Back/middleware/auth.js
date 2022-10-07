const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]; //retriever the token
            const decodeToken = jwt.verify(token, 'RADOM_TOKEN_SECRET'); //decode the token
            const userId = decodeToken.userId;
            req.auth = {
                userId: userId
            };
        } catch(error) {
            res.status(401).json({ error });
        }
};