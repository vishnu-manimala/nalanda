
 const isAdmin = (req, res, next) =>{
    role = req.user.role;
    if( role !== 'admin'){
        return res.status(403).json({status: "Forbidden",
            message: "You do not have permission to access this resource."})

    }

    next();
}

module.exports = {
    isAdmin
}

