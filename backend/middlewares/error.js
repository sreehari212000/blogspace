const errorHandler = (err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message
    console.log(err);
    
    res.status(statusCode).json({status: 'Fail', message})
    next()
}


export default errorHandler