$(document).ready(function(){
    $('#form .btn').click(function(){
        $.ajax({
            url:'/login',
            type:'post',
            data: $("#form").serialize()
        })
    })
})