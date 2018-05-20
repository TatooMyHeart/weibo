var blogs = [{
		"id": 1,
		"username": "test1",
		"userid": 2,
		"content": "{'content': 'this is the test article'}",
		"isfollow": 1,
		"time": "2018-05-07",
		"plnum": 2,
		"comment": [{
				"WBid": 1,
				"time": "2018-05-07",
				"content": "这里是评论内容2",
				"id": 2, //评论id
				"username": "test2", //评论人
			},
			{
				"WBid": 1,
				"time": "2018-05-07",
				"content": "这里是评论内容3",
				"id": 3, //评论id
				"username": "test2", //评论人
			}
		]
	},
	{
		"id": 2,
		"username": "test1",
		"userid": 2,
		"content": "{'content': 'this is the test article'}",
		"isfollow": 0,
		"time": "2018-05-07",
		"plnum": 3,
		"comment": [{
				"WBid": 2,
				"time": "2018-05-07",
				"content": "这里是评论内容1",
				"id": 1, //评论id
				"username": "test2", //评论人
			},
			{
				"WBid": 2,
				"time": "2018-05-07",
				"content": "这里是评论内容2",
				"id": 2, //评论id
				"username": "test2", //评论人
			},
			{
				"WBid": 2,
				"time": "2018-05-07",
				"content": "这里是评论内容3",
				"id": 3, //评论id
				"username": "test2", //评论人
			}
		]
	},
	{
		"id": 3,
		"username": "test1",
		"userid": 2,
		"content": "b'----------------------------662704072003225494740374\\r\\nContent-Disposition: form-data; name=\"content\"\\r\\n\\r\\nthis is the test article\\r\\n----------------------------662704072003225494740374--\\r\\n'",
		"isfollow": 0,
		"time": "2018-05-07",
		"plnum": 0,
		"comment": [],
	},
];
var myInfo = {
	"id": 3,
	"fansnum": 1,
	"username": "test2",
	"follownum": 0,
	"password": "",
	"WBnum": 1
};
var folist = [{
		"id": 3,
		"fansnum": 1,
		"username": "这是一个偶像",
		"follownum": 0,
		"password": "",
		"WBnum": 1
	},
	{
		"id": 3,
		"fansnum": 1,
		"username": "这是我的第二个偶像",
		"follownum": 0,
		"password": "",
		"WBnum": 1
	}
];
var fanlist = [{
	"id": 3,
	"fansnum": 1,
	"username": "test2",
	"follownum": 0,
	"password": "",
	"WBnum": 1
}];

var folist, fanlist;

function scripts() {
	loadblogs();
	loadfan();
	loadfo();
	loadmyinfo();
	//	updateBlog(blogs);
	//	getMyinfo(myInfo);
	var showF = document.getElementById("loadFlist");
	showF.onclick = loadF(folist, fanlist);
}

function getXmlHttp() {
	var xmlhttp;
	if(window.XMLHttpRequest) {
		// code for Firefox, Opera, IE7, etc.
		xmlhttp = new XMLHttpRequest();
	} else if(window.ActiveXObject) { //code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}

function loadblogs() {
	var xmlhttp = getXmlHttp();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//执行到这的时候前端已经拿到了后台的数据
			var responseText = xmlhttp.responseText;
			//这个时候responseText只是一个字符串，需要转换成响应的json对象
			var jsonObj = JSON.parse(responseText);
			//			console.log(jsonObj);

			//把这个json对象里面的内容(文件信息)显现出来
			updateBlog(jsonObj);
		}
		//else
		//alert("审计结果获取失败");
	}
	var url = baseurl + "/getAllWbList/";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function loadfan() {
	var xmlhttp = getXmlHttp();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//执行到这的时候前端已经拿到了后台的数据
			var responseText = xmlhttp.responseText;
			//这个时候responseText只是一个字符串，需要转换成响应的json对象
			var jsonObj = JSON.parse(responseText);
			//			console.log(jsonObj);

			//把这个json对象里面的内容(文件信息)显现出来
			fanlist = jsonObj;
		}
		//else
		//alert("审计结果获取失败");
	}
	var url = baseurl + "/getFansList/";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function loadfo() {
	var xmlhttp = getXmlHttp();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//执行到这的时候前端已经拿到了后台的数据
			var responseText = xmlhttp.responseText;
			//这个时候responseText只是一个字符串，需要转换成响应的json对象
			var jsonObj = JSON.parse(responseText);
			//			console.log(jsonObj);

			//把这个json对象里面的内容(文件信息)显现出来
			folist = jsonObj;
		}
		//else
		//alert("审计结果获取失败");
	}
	var url = baseurl + "/getFollowList/";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function loadmyinfo() {
	var xmlhttp = getXmlHttp();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//执行到这的时候前端已经拿到了后台的数据
			var responseText = xmlhttp.responseText;
			//这个时候responseText只是一个字符串，需要转换成响应的json对象
			var jsonObj = JSON.parse(responseText);
			//			console.log(jsonObj);

			//把这个json对象里面的内容(文件信息)显现出来
			getMyinfo(jsonObj);
		}
		//else
		//alert("审计结果获取失败");
	}
	var url = baseurl + "/getInfo/";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function loadF(fo, fan) {
	var folist = document.getElementById("folist");
	var fanlist = document.getElementById("fanlist");
	var i = 0;
	len0 = fo.length;
	len1 = fan.length;
	textnode = document.createTextNode("");
	for(; i < len0; i++) {
		textnode = document.createTextNode(fo[i].username);
		var li0 = document.createElement("li");
		var li1 = document.createElement("li");
		var text_ = document.createTextNode("|");
		li1.appendChild(text_);
		li0.appendChild(textnode);
		folist.appendChild(li1);
		folist.appendChild(li0);
	}
	i = 0;
	for(; i < len1; i++) {
		textnode = document.createTextNode(fan[i].username);
		var li0 = document.createElement("li");
		var li1 = document.createElement("li");
		var text_1 = document.createTextNode("|");
		li1.appendChild(text_1);
		li0.appendChild(textnode);
		fanlist.appendChild(li1);
		fanlist.appendChild(li0);
	}

}

function getMyinfo(Info) {
	//console.log("getinfo")
	document.getElementById("uName").innerHTML = Info.username;
	document.getElementById("uId").innerHTML = Info.id;
	document.getElementById("foNum").innerHTML = Info.follownum;
	document.getElementById("fanNum").innerHTML = Info.fansnum;
	document.getElementById("blogNum").innerHTML = Info.WBnum;
}

function updateBlog(Info) {

	//	console.log(Info);
	var textnode = document.createTextNode("");
	var i = 0,
		len = Info.length;
	for(; i < len; i++) {
		var td_ = document.createElement("td");
		textnode = document.createTextNode("|");
		td_.appendChild(textnode);
		var td_0 = document.createElement("td");
		textnode = document.createTextNode("|");
		td_0.appendChild(textnode);

		//console.log(i);
		var div0 = document.createElement("div");
		div0.className = "panel panel-info";
		div0.id = Info[i].id;

		var div1 = document.createElement("div");
		div1.className = "panel-body";
		textnode = document.createTextNode(Info[i].content);
		div1.appendChild(textnode);
		div0.appendChild(div1);

		var table = document.createElement("table");
		table.className = "table";
		div0.appendChild(table);

		var tbody = document.createElement("tbody");
		table.appendChild(tbody);

		var tr = document.createElement("tr");
		tbody.appendChild(tr);

		var td0 = document.createElement("td");
		td0.className = "text-center";
		tr.appendChild(td0);

		var imgnode = document.createElement("img");
		imgnode.src = "...";
		imgnode.className = "img-circle";
		td0.appendChild(imgnode);

		var strongnode = document.createElement("strong");
		textnode = document.createTextNode("发布人：");
		strongnode.appendChild(textnode);
		textnode = document.createTextNode(Info[i].username);
		strongnode.appendChild(textnode);
		td0.appendChild(strongnode);
		if(Info[i].isfollow == 0) {
			var btn = document.createElement("button");
			btn.type = "button";
			btn.className = "fo btn btn-default btn-xs";
			btn.setAttribute("data-userid", Info[i].userid); //关注按钮对应的属性
			var span0 = document.createElement("span");
			span0.className = "glyphicon glyphicon-heart-empty";
			span0.setAttribute('aria-hidden', 'true');
			textnode = document.createTextNode("未关注");
			btn.appendChild(textnode);
			btn.appendChild(span0);
			td0.appendChild(btn);
		} else {
			var btn = document.createElement("button");
			btn.type = "button";
			btn.className = "unfo btn btn-default btn-xs";
			btn.setAttribute("data-userid", Info[i].userid);
			var span0 = document.createElement("span");
			span0.className = "glyphicon glyphicon-heart";
			span0.setAttribute('aria-hidden', 'true');
			textnode = document.createTextNode("已关注");
			btn.appendChild(textnode);
			btn.appendChild(span0);
			td0.appendChild(btn);
		}

		tr.appendChild(td_);

		var td1 = document.createElement("td");
		td1.className = "text-center";
		textnode = document.createTextNode("评论数：");
		td1.appendChild(textnode);
		textnode = document.createTextNode(Info[i].plnum);
		td1.appendChild(textnode);
		var a = document.createElement("a");
		a.id = "load" + blogs[i].id + "Commends" //加载微博id为i的评论
		console.log(a.id);
		a.className = "caret";
		a.setAttribute('calss', 'caret');
		a.setAttribute('data-toggle', 'collapse');
		a.setAttribute('href', '#' + blogs[i].id + 'commends'); //链接到微博id的评论坍缩
		console.log(a.href);
		a.setAttribute('aria-expanded', 'false');
		a.setAttribute('aria-controls', 'collapseExample');
		td1.appendChild(textnode);
		td1.appendChild(a);
		tr.appendChild(td1);

		tr.appendChild(td_0);

		var td2 = document.createElement("td");
		td2.className = "text-center";
		textnode = document.createTextNode("发布时间：");
		td2.appendChild(textnode);
		textnode = document.createTextNode(Info[i].time);
		td2.appendChild(textnode);
		tr.appendChild(td2);

		document.getElementById("blogs").appendChild(div0);

		//加载评论
		if(Info[i].plnum != 0) {
			var comDiv = document.createElement("div");
			comDiv.className = "collapse";
			comDiv.id = blogs[i].id + 'commends';
			console.log(comDiv.id);
			loadCommends(Info[i].comment, comDiv);
			document.getElementById("blogs").appendChild(comDiv);
		}

	}
}

function loadCommends(Info, root) {
	//发表评论
	var wellDiv = document.createElement("div");
	wellDiv.className = "well";
	root.appendChild(wellDiv);

	var form = document.createElement("form");
	form.id = "blogid_" + Info[0].WBid;
	var inputDiv = document.createElement("div");
	inputDiv.className = "input-group";
	form.appendChild(inputDiv);

	var inp = document.createElement("input");
	inp.id = "inputcommend";
	inp.type = "text";
	inp.className = "form-control";
	inp.maxLength = "100"; //字数限制
	inp.placeholder = "不超过100字...";
	var span = document.createElement("span");
	span.className = "input-group-btn";
	inputDiv.appendChild(inp);
	inputDiv.appendChild(span);

	var btn = document.createElement("button");
	btn.id = Info[0].WBid;
	btn.className = "commend btn btn-default";
	btn.type = "button";
	span.appendChild(btn);

	var in_ = document.createTextNode("发表评论");
	btn.appendChild(in_);

	wellDiv.appendChild(form);
	var hr = document.createElement("hr");
	wellDiv.appendChild(hr);
	var ul = document.createElement("ul");
	ul.className = "list-unstyled";
	wellDiv.appendChild(ul);
	//显示评论
	var i = 0,
		len = Info.length;

	for(; i < len; i++) {
		var li = document.createElement("li");
		ul.appendChild(li);

		var p = document.createElement("p");
		var hr = document.createElement("hr");
		li.appendChild(p);
		li.appendChild(hr);

		var span = document.createElement("span");
		var strong = document.createElement("strong");
		var cont = document.createTextNode(Info[i].content);
		var small = document.createElement("small");
		small.className = "pull-right";
		p.appendChild(span);
		p.appendChild(strong);
		p.appendChild(cont);
		p.appendChild(small);

		var txt = document.createTextNode(Info[i].username);
		span.appendChild(txt);

		txt = document.createTextNode(" : ");
		strong.appendChild(txt);

		txt = document.createTextNode(Info[i].time);
		small.appendChild(txt);
	}

}