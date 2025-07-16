import ratelimit from "../config/upstash.js"


const ratelimiter = async (req,res,next) =>{
    try {
        const {success} = await ratelimit.limit("my-limit-key")
        if(!success) {
            return res.status(429).json({
                message:"Too many request, please try again later"
            });
        }
        next()
    } catch (error) {
        console.log('====================================');
        console.log("Rate limit error",error);
        console.log('====================================');
        next(error);
    }
}

export default ratelimiter