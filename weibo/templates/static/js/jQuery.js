$(document).ready(function(){
	$(".commend btn btn-default").click(function() {
		var wbid = $(this).attr("id");
		var formid = "blogid_" + wbid;
		$.post(
			baseurl+"/sendP/", 
			{ //发表评论
				content: document.forms["formid"]["inputcommend"].value,
				wbid: $(this).attr("id")
			},
			function(data, textStatus) {
				alert(textStatus);
			});
	});
	
	$(".fo btn btn-default btn-xs").click(function() {
		var uid = $(this).attr("data-userid");
		//关注
		$.get(
			baseurl+"/follow/?fid=" + uid,
			function(data, textStatus) {
				alert(textStatus);
			}
		)
	});
	$(".unfo btn btn-default btn-xs").click(function() {
		var uid = $(this).attr("data-userid");
		//取关
		$.get(
			baseurl+"/unfollow/?fid=" + uid,
			function(data, textStatus) {
				alert(textStatus);
			}
		)
	});
	$("#addBlogbtn").click(function() {
		$.post(
			baseurl + "/sendWb/",
			$("#addblogform").serialize(),
			function(data, textStatus) {
				alert(textStatus);
			}
		);
	});

});