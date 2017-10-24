var fn_redi = async(ctx, next)=>{
    ctx.redirect('/login');
}

var fn_login = async (ctx, next) => {
    await ctx.render('login.pug');
} 
var fn_login_page = async (ctx,next) => {
    await next();
    console.log(ctx.request.body);
    ctx.response.body = "w"
}

module.exports = {
    'get /': fn_redi,
    'get /login': fn_login,
    'post /login': fn_login_page
}; 