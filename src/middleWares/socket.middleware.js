import jwt from 'jsonwebtoken'
import Auth from '../../DB/models/Auth.mode.js'

export const socketAuth = async (socket, next) => {
    try {
        let token = socket.handshake.auth.token

        if (!token.startsWith(process.env.TOKEN_PREFIX)) {
            next('Invalid token prefix')
        }

        token = token.split(process.env.TOKEN_PREFIX)[1]
        const verifyToken = jwt.verify(token, process.env.ACCESSTOKEN)
        const user = await Auth.findById(verifyToken.id)

        if (!user) {
            return next(new Error("Please sign up first"))
        }

        socket.handshake.user = user
        next()
    } catch (err) {
        console.log(err);
        next(new Error("Invalid token"))
    }
}