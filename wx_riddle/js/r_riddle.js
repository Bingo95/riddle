/*换题目*/
function r_replace_show() {
	$("#riddle_answer").val("");
	$("#riddle_result").html("");
	$("#btn_result").show();
	$("#riddle_do").show();
	$("#riddle_getnew").show();
	$("#riddle_result").show();
	$("#riddle_answer2").hide();
	$("#btn_replace").hide();
	$("#riddle_answer").removeAttr("disabled", "disabled");
	$("#riddle_ok").attr("href", "javascript:r_answer();");
	$("#riddle_ok").removeClass("btn_on");
}

/*求答案*/
function r_result_show() {
	$("#btn_result").hide();
	$("#riddle_do").hide();
	$("#riddle_result").hide();
	/*$("#riddle_getnew").hide();*/
	$("#riddle_answer2").show();
	/*$("#btn_replace").show();*/
}

/*审核跳转*/
function r_onclick() {
	var r_onclack = $(".r_onclack"); //因为这里是需要r_onclack的，所以先要有这个类 就要等 上面填充万数据 才找得到
	r_onclack.click(function() {
		r_check_id = $(this).next().text();
		var getval = r_check_id;
		window.location.href = "r_riddle_check.jsp?id=" + getval;
		/*alert($(this).next().text()) //next 是jquery提供的 寻找当前标签 的下一个标签（并列标签）*/
	});
}

/*延时清空提交谜语内容*/
function r_clean() {
	setTimeout(function() {
		$("#riddle_content2").val("");
		$("#riddle_key2").val("");
		$("#riddle_count").html("0");
	}, 2500);
}

/*审核详情跳转*/
function r_exit_list() {
	setTimeout(function() {
		window.location.href = "r_riddle_checklist.jsp";
	}, 500);
}

/*没有用户信息时重定向获取用户信息*/
function redirect_getuserinfo(flag, page) {
	if(flag == -1) {
		window.location.href = "riddle_enterpage.jsp?page=" + page;
		//window.location.href = "http://wx.jidisoft.com/oauthpub_redirect.jsp?r_url=http://192.168.1.72:8080/wx_riddle/enterpage?page="+page;
	}
}

/*checklist下滑加载*/
function uplist_data_checklist(has_next, r_page) {
	r_onclick();
	var loading = false;
	$(document.body).infinite().on("infinite", function() {
			if(loading) return;
			loading = true;
			setTimeout(function() {
				$.ajax({
					type: 'post',
					dataType: "json",
					/*async: false, //false这是同步，同步会锁住浏览器，等ajax执行完才继续执行其他代码      true是异步 就是大家都执行*/
					data: {
						param_json: '{"action_sort":"2001","Data":{"page_no":"' + r_page + '","page_size":"10"}}'
					},
					url: "get_riddle",
					success: function(data) {
						//redirect_getuserinfo(data.Data, data.Flag);
						var _data = data.Data.UncheckRiddleList; //这里是解析JSON获取到的 Data
						var maincontent = $("#main_content");
						for(var i = 0; i < _data.length; i++) {

							var r_key = "";
							var _key_list = _data[i].riddle_keys;
							for(var b = 0; b < _key_list.length; b++) {
								r_key += _key_list[b] + "#";
							}

							maincontent.append(
								"<div id='raddle_content_list' class='r_onclack'>" +
								"<div class='weui-media-box box_bottom '>" +
								"<p class='weui-media-box__hd'>" + _data[i].riddle_content + "</p>" +
								"<div class='top_margin'>" +
								"<label class='weui-form-preview__label'>" + "谜底:" + "</label>" +
								"<em class='weui-form-preview__value'>" + r_key.substring(0, r_key.length - 1) + "</em>" +
								"</div>" +
								"<img class='top_margin' src='" + _data[i].headimgurl + "'>&nbsp;&nbsp;" +
								"<label class='page__desc'>" + _data[i].nickname + "</label>&nbsp" +
								"<label class='page__desc'>" + _data[i].input_date.substring(0, _data[i].input_date.length - 2) + "</label>" +
								"</div>" +
								"</div>" +
								"<label  type='text' style='display:none'>" + _data[i].id + "</label>"
							);
						}
						has_next = data.Data.has_next;
					},
					error: function() {
						if(Flag == 0) {
							$.alert(data.Msg);
						}
					},
					complete: function() {
						r_onclick();
						if(has_next == 0) {
							$("#login_up").css('display', 'none');
						} else {
							loading = false;
							++r_page;
							return(has_next, r_page);
						}
					}
				});
			}, 500);
			r_onclick();
	});
}

/*myriddle下滑加载*/
function uplist_data_myriddle(has_next2, r_page2) {
	var loading = false;
	$(document.body).infinite().on("infinite", function() {
			if(loading) return;
			loading = true;
			setTimeout(function() {
				$.ajax({
					type: 'post',
					dataType: "json",
					/*async: false, //false这是同步，同步会锁住浏览器，等ajax执行完才继续执行其他代码      true是异步 就是大家都执行*/
					data: {
						param_json: '{"action_sort":"3001","Data":{"page_no":"' + r_page2 + '","page_size":"10"}}'
					},
					url: "get_riddle",
					success: function(data) {
						//redirect_getuserinfo(data.Data, data.Flag);
						var _data = data.Data.myRiddlesList; //这里是解析JSON获取到的 Data
						var maincontent = $("#myriddle_content");
						for(var i = 0; i < _data.length; i++) {
							if(_data[i].stat == 0) {
								_data[i].stat = "待审核";
							} else if(_data[i].stat == 1) {
								_data[i].stat = "已上线";
							} else {
								_data[i].stat = "未通过";
							}

							var r_key = "";
							var _key_myriddlelist = _data[i].riddle_keys;
							for(var c = 0; c < _key_myriddlelist.length; c++) {
								r_key += _key_myriddlelist[c] + "#";
							}

							maincontent.append(
								"<div class='weui-media-box box_bottom '>" +
								"<p class='weui-media-box__hd text_myriddle'>" + _data[i].riddle_content + "</p>" +
								"<div class='page__desc'>" +
								"<label class='weui-form-preview__label'>" + "谜底:" + "</label>" +
								"<em class='weui-form-preview__value'>" + r_key.substring(0, r_key.length - 1) + "</em>" +
								"</div>" +
								"<div class='page__desc'>" +
								"<label class='weui-form-preview__label'>" + "访问次数:" + "</label>" +
								"<em class='weui-form-preview__value'>" + _data[i].access_cnt + "</em>" +
								"</div>" +
								"<div id='r_mystat' class='page__desc text_right_top'>" +
								"<label class='text_color_stat'>" + _data[i].stat + "</label>" +
								"</div>" +
								"<div class='page__desc text_right'>" +
								"<label>" + _data[i].input_date.substring(0, _data[i].input_date.length - 2) + "</label>" +
								"</div>" +
								"</div>"
							);
						}
						has_next2 = data.Data.has_next;
					},
					error: function() {
						if(Flag == 0) {
							$.alert(data.Msg);
						}
					},
					complete: function() {
						color_stat();
						if(has_next2 == 0) {
							$("#login_up2").css('display', 'none');
						} else {
							loading = false;
							++r_page2;
							return(has_next2, r_page2);
						}

					}
				});
			}, 500);
	});
}

/*我的谜语状态颜色*/
function color_stat() {
	$(".text_color_stat:contains('已上线')").css("color", "green");
	$(".text_color_stat:contains('未通过')").css("color", "gray");
};

/*页面加载时login隐藏*/
function login_hide() {
	hide_login();
	hide_login_ok();
	hide_login_result();
}
/*隐藏换题login*/
function hide_login() {
	$("#login").hide();
}

/*隐藏确定login*/
function hide_login_ok() {
	$("#riddle_ok").css("color", "#3CC51E")
	$("#login_ok").hide();
}

/*隐藏求答案login*/
function hide_login_result() {
	$("#login_result").hide();
}

/*隐藏保存login*/
function hide_login_save() {
	$("#login_save").hide();
}

/*隐藏审核页面login*/
function hide_check_ok(){
	$("#check_login_ok").hide();
}

function hide_check_no(){
	$("#check_login_no").hide();
}
/*延时隐藏换题login*/
function hide_time_login() {
	setTimeout(function() {
		$("#btn_login").removeClass("weui-btn_plain-disabled");
		$("#btn_login").css("width", "95px");
		$("#login").hide();
	}, 500);
}

/*换题目login显示*/
function onlogin() {
	$("#btn_login").addClass("weui-btn_plain-disabled");
	$("#btn_login").css("width", "108px");
	$("#login").show();
}

/*确定答案login显示*/
function oklogin() {
	$("#riddle_ok").css("color", "#AAAAAA");
	$("#login_ok").show();
}

/*求答案login显示*/
function resultlogin() {
	$("#login_result").show();
}

/*保存login显示*/
function show_login_save() {
	$("#login_save").show();
}

/*显示隐藏页面login*/
function show_check_ok(){
	$("#check_login_ok").show();
}

function show_check_no(){
	$("#check_login_no").show();
}