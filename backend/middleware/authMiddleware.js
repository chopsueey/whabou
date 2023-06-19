import { validateToken } from "../lib/auth.js";

export const authMiddleware = async (req, res, next) => {
    const headers = req.headers;
    console.log(headers.cookie)
    const authorization = headers.cookie;
    if (!authorization){
        return res.status(403).json({msg:"Authentifizierung fehlgeschlagen"});
    }
    try {
        const token = authorization.split("=")[1];
        if (!token){
            return res.status(403).json({msg:"Authentifizierung fehlgeschlagen! Token fehlerhaft."})
        }
        req.user = await validateToken(token);
        next();
    } catch (error) {
        return res.status(400).json({error, msg:"Authentifizierung fehlgeschlagen!"});
    }
}