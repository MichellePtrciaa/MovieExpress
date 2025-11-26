import jwt from "jsonwebtoken"
console.log("FILE tokenUtil.js TERBACA");

export const getJwtToken = (user_id, username) => {
    const payload = {
        user_id : user_id,
        username : username
    }

    return jwt.sign(payload, "APP_JWT_SECRET", {
        expiresIn : '15m'
    })
}