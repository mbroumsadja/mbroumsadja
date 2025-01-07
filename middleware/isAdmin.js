const conection = (req, res , next) =>{
    if(req.body.role && req.body.role !== null &&  req.session.role === undefined){
       next()
    }else if(req.url === '/'){
        next()
    }
    res.redirect('/');
}

export default conection