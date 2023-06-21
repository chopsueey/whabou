export const validateUser = (req, res, next) => {
    if (!req.body.email.length > 0){
        res.status(400).json("Die E-Mail wird benötigt!");
    }
    if (!req.body.password.length > 8){
        res.status(400).json("Das Password muss mindenstens 8 Zeichen sein!");
    }
    next();
}