const conection = (req, res , next) =>{
    if(req.session.role && req.session.role !== null &&  req.session.role === undefined){
       next()
    }else if(req.url === '/'){
        next()
    }
    res.redirect('/');
}

export default conection