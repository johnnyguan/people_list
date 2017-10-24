import 'whatwg-fetch'

fetch('/json/test.json')
.then(function(response){
    return response.json()
}).then(function(json){
    console.log(json);
})