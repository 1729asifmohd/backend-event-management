import * as jwt  from 'jsonwebtoken';

export default (req: any, res: any, next: any) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        req.isAuth = false
        return next()
    }
    const token = authHeader.split(' ')[1]
    if (!token) {
        req.isAuth = false
        next()
    }
    let verify:any;
    try {
        verify = jwt.verify(token, 'supersecretkey')
    } catch (err) {
        req.isAuth = false
        return next()
    }

    req.isAuth = true
    req.userId = verify.userId
    return next()
}