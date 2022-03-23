const userAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log(req.user)
        return next()
    } else {
        res.status(401).send({ message: 'not allowed to access this page' })
        console.log(req.user)
    }
}

export default userAuth