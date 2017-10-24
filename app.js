const Koa = require('koa'),
      router = require('koa-router')(),
      serve = require('koa-static'),
      views = require('koa-views'),
      fs = require('fs'),
      parser = require('koa-body-parser'),
      app = new Koa();

// Must be used before any router is used 
app.use(views(__dirname + '/frontend/pug', {
    map: {
        html: 'pug'
    }
}));
app.use(serve(__dirname + '/frontend'));
app.use(parser());
var files = fs.readdirSync('controller'),
    js_files = files.filter((file)=>{
        return file.endsWith('.js');
    });

for(let i=0;i<js_files.length;i++){
    let con = require(__dirname + "/controller/" + js_files[i]);
    for(let key in con){
        if(key.startsWith('get ')){
            let url = key.substring(4);
            router.get(url, con[key])
        }else if(key.startsWith('post ')){
            let url = key.substring(5);
            router.post(url, con[key])
        }else {
            console.log(`invalid url ${url}`);
        } 
    }
}

app.use(router.routes())

app.listen(3000);