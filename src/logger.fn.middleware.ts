export const loggerFn = (req, res, next) => {
    console.log("req")
    next()
}