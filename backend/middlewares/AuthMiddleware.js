
export const auth = async (req, res, next) => {
    if(!req.session.userId) return res.status(404).json({msg: 'tidak ada token'})
    next()
}