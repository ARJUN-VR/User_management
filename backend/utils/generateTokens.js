import jwt from 'jsonwebtoken'

const  generateToken=(res,userId)=>{
    const Token = jwt.sign({userId},process.env.JWT_CODE,{
        expiresIn:'30d'
    });
    res.cookie('jwt', Token ,{
        httpOnly:true,
        secure : process.env.NODE_ENV !=='development',
        sameSite:true,
        maxAge : 30 * 24 * 60 * 60 * 1000

    })
   
}

export default generateToken