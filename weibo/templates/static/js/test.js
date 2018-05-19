function try() {
    $.ajax({
        type:"POST",
        url:"logIn/",
        data:{
            username:"test2",
            password:"test2"
        },
        dataType:"json"
        success:function(data){
            alert(data);
        }

    })
}