require('dotenv').config();

function checkRole(req, res, next) {
    // Ensure req.local exists and has the role property
    if (req.local && req.local.role && req.local.role === process.env.USER) {
        return res.status(401).json({ error: "Unauthorized: Insufficient permissions" });
    } else {
        next();
    }
}

module.exports = { checkRole: checkRole };