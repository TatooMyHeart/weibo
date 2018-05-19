$(document).ready(function(){
	//$("#login").submit(function() {
	//	loginForm();
	//});
	$("#register").submit(function() {
		regisForm();
	});
	$("#loginbtn").click(function() {
		console.log("in");
		$.ajax({
			type:"POST",
			url:"http://127.0.0.1/logIn/",
			async:false,
			data: JSON.stringify({
				"username":$("#Lusername").val(),
				"password":$("#Lpassword").val()
			}),
			contentType:"application/json;charset=utf-8",
			dataType:"json",
			error:function(request){
				console.log("error");
			},
			success:function(res){
				console.log(res);
			}
		});
	});
	$("#registerbtn").click(function() {
		$.post(
			baseurl+"/register/",
			//		{
			//				username: document.forms["register"]["username"].value,
			//				password: document.forms["register"]["password0"].value
			//			},
			$("#register").serialize(),
			function(data,textStatus) {
				regist_alt(textStatus);
			});
	});
});

function regisForm() {
	var name = document.forms["register"]["username"].value;
	var psw0 = document.forms["register"]["password0"].value;
	var psw1 = document.forms["register"]["password1"].value;
	if(name == null || name == "") {
		alert("用户名不能为空！");
		return false;
	}
	if(psw0 == null || psw0 == "") {
		alert("密码不能为空！");
		return false;
	}
	if(psw0 != psw1) {
		alert("两次输入密码不一致!");
		return false;
	}
	return true;
}

function loginForm() {
	var name = document.forms["login"]["Lusername"].value;
	var psw0 = document.forms["login"]["Lpassword"].value;
	if(name == null || name == "") {
		alert("用户名不能为空！");
		return false;
	}
	if(psw0 == null || psw0 == "") {
		alert("密码不能为空！");
		return false;
	}
	return true;
}

function login_alt(info) {
	if(info == "success") {
		alert("登陆成功");
		window.location.href = "homepage.html";
	} else {
		alert("用户名不存在或密码错误");
	}
}

function regist_alt(info) {
	if(info == "username exist") {
		alert("用户已经存在");
	} else if(info == "success") {
		alert("注册成功");
	} else {
		alert("其他错误");
	}
}
