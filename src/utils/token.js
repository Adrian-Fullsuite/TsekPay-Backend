import jwt from "jsonwebtoken";

// Token encoding
const encodeToken = ( key, value ) => {
    const token = jwt.sign({[key]: value}, process.env.SECRET_KEY,{
        expiresIn: "1d", //Token will expire in 2 days
    });
    return token;
};

// Token decoding
const decodeToken = ( token ) => {
    token = token.split(" ")[1];
    let decodedToken = null;
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err){
            console.log(err);
        } else {
            decodeToken = decoded;
        }
    })
    return decodedToken;    
};

export{
    encodeToken,
    decodeToken
}