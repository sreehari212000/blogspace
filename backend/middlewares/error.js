const errorHandler = (err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message
    res.status(statusCode).json({status: 'Fail', message})
    next()
}
export default errorHandler