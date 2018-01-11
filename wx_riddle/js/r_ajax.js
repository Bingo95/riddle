var r_id;
var r_check_id;
var r_key;
var r_content;
var r_page = 1;
var openid;
var manager = 0;

/*换题目*/
function r_replace() {
	$.ajax({
		type: 'post',
		dataType: "json",
		data: {
			param_json: '{"action_sort":"1101","Data":{}}'
		},
		url: "get_riddle",
		success: function(data) {
			var page = 'r_riddle_do.jsp';
			redirect_getuserinfo(data.Flag, page);
			if(data.Flag == 0) {
				$.alert(data.Msg, function() {
					WeixinJSBridge.call('closeWindow');
				});
			} else {
				r_id = data.Data.id;
				$("#riddle_content").html(data.Data.riddle_content);
				r_replace_show();
				hide_login_ok();
				hide_login_result();
			}
		},
		error: function() {
			$.alert(data.Msg);
		},
		complete: function() {
			hide_time_login();
		}
	});
}

/*回答问题*/
function r_answer() {
	r_key = $("#riddle_answer").val();
	if(r_key.length == 0) {
		$.toast("请输入谜底!", "cancel");
	} else {
		oklogin();
		$.ajax({
			type: 'post',
			dataType: "json",
			data: {
				param_json: '{"action_sort":"1102","Data":{"riddle_id":"' + r_id + '","riddle_key":"' + $.trim(r_key) + '"}}'
			},
			url: "get_riddle",
			success: function(data) {
				var page = 'r_riddle_do.jsp';
				redirect_getuserinfo(data.Flag, page);
				if(data.Flag == 0) {
					$.alert(data.Msg, function() {
						WeixinJSBridge.call('closeWindow');
					});
				} else {
					var msg = data.Msg;
					if(msg.indexOf("SORRY") > -1) {
						$("#riddle_result").html(data.Msg);
						hide_login_ok();
					} else {
						$("#riddle_result").html(data.Msg);
						$("#btn_result").hide();
						$("#riddle_answer").attr("disabled", "disabled");
						$("#riddle_ok").removeAttr('href');
						$("#riddle_ok").addClass("btn_on");
						$("#login_ok").hide();
					}
				}
			},
			error: function() {
				$.alert(data.Msg);
			},
			complete: function() {

			}
		});
	}
}

/*求答案*/
function r_result() {
	var r_key = "";
	$.ajax({
		type: 'post',
		dataType: "json",
		data: {
			param_json: '{"action_sort":"1103","Data":{"riddle_id":"' + r_id + '"}}'
		},
		url: "get_riddle",
		success: function(data) {
			var page = 'r_riddle_do.jsp';
			redirect_getuserinfo(data.Flag, page);
			if(data.Flag == 0) {
				$.alert(data.Msg, function() {
					WeixinJSBridge.call('closeWindow');
				});
			} else {
				var _key_result = data.Data;
				for(var i = 0; i < _key_result.length; i++) {
					r_key += _key_result[i] + "或";
				}
				$("#riddle_result2").html(r_key.substring(0, r_key.length - 1));
				r_result_show();
			}
		},
		error: function() {
			$.alert(data.Msg);
		},
	});
}

/*提谜语*/
function r_add() {
	r_content = $("#riddle_content2").val();
	r_key = $("#riddle_key2").val();
	if($.trim(r_content).length == 0 && r_key.length == 0) {
		$.alert("请输入谜面和谜底!");
	} else if($.trim(r_content).length == 0) {
		$.alert("请输入谜面!");
	} else if(r_key.length == 0) {
		$.alert("请输入谜底！");
	} else {
		show_login_save();
		$.ajax({
			type: 'post',
			dataType: "json",
			data: {
				param_json: '{"action_sort":"1202","Data":{"riddle_content":"' + $.trim(r_content) + '","key_price":"0.1","stat":"0","input_man":"openid123","riddle_type":"1","riddle_key":"' + r_key + '";}}'
			},
			url: "get_riddle",
			success: function(data) {
				var page = 'r_riddle_add.jsp';
				redirect_getuserinfo(data.Flag, page);
				hide_login_save();
				if(data.Flag == 0) {
					$.alert(data.Msg, function() {
						WeixinJSBridge.call('closeWindow');
					});
				} else {
					$.toast("提交成功!");
					r_clean();
				}
			},
			error: function() {
				$.alert("服务器错误");
			},
			complete: function() {
				r_clean();
			}

		});
	}
}

/*待审核列表*/
function r_list() { //这个方法 然后ajax执行是需要时间的 这里是ajax的同步异步问题  同步的时候 就是需要等ajax执行完才执其他的代码
	var has_next;
	$.ajax({
		type: 'post',
		dataType: "json",
		/*async: false, //false这是同步，同步会锁住浏览器，等ajax执行完才继续执行其他代码      true是异步 就是大家都执行*/
		data: {
			param_json: '{"action_sort":"2001","Data":{"page_no":"' + r_page + '","page_size":"10"}}'
		},
		url: "get_riddle",
		success: function(data) {
			var page = 'r_riddle_checklist.jsp';
			redirect_getuserinfo(data.Flag, page);
			if(data.Flag == 0) {
				$.alert(data.Msg, function() {
					WeixinJSBridge.call('closeWindow');
				});
				$("#login_up").css('display', 'none');
			} else {

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
				var total = data.Data.total_cnt;
				++r_page;
				if(total == 0) {
					r_onclick();
					maincontent.append(
						"<div class='weui-panel weui-panel_access'>" +
						"<div class='weui-media-box weui-media-box_text'>" +
						"<h4 class='weui-media-box__title'>" + "暂时没有待审核的谜语。" + "</h4>" +
						"</div>" +
						"</div>"
					);
					$("#login_up").css('display', 'none');
				} else if(total <= 10) {
					$("#login_up").css('display', 'none');
				}
				uplist_data_checklist(has_next, r_page);
			}
		},
		error: function() {
			$.alert("服务器错误");
		},
		complete: function() {
			r_onclick();
		}
	});
};

/*我的谜语列表*/
function r_myriddlelist() {
	var r_page2 = 1;
	var has_next2;
	$.ajax({
		type: 'post',
		dataType: "json",
		/*async: false, //false这是同步，同步会锁住浏览器，等ajax执行完才继续执行其他代码      true是异步 就是大家都执行*/
		data: {
			param_json: '{"action_sort":"3001","Data":{"page_no":"' + r_page2 + '","page_size":"10"}}'
		},
		url: "get_riddle",
		success: function(data) {
			var page = 'r_riddle_myriddle.jsp';
			redirect_getuserinfo(data.Flag, page);
			if(data.Flag == 0) {
				$.alert(data.Msg, function() {
					WeixinJSBridge.call('closeWindow');
				});
				$("#login_up2").css('display', 'none');
			} else {
				var _data = data.Data.myRiddlesList; //这里是解析JSON获取到的 Data
				var maincontent = $("#myriddle_content");
				//头像名字
				$("#myriddle_img").attr('src', data.userinfo.headimgurl);
				$("#menu_head_img").attr('src', data.userinfo.headimgurl);
				$("#username").html(data.userinfo.nickname);
				$("#menu_name").html(data.userinfo.nickname);
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
						"<div class='page__desc text_right_top'>" +
						"<label class='text_color_stat'>" + _data[i].stat + "</label>" +
						"</div>" +
						"<div class='page__desc text_right'>" +
						"<label>" + _data[i].input_date.substring(0, _data[i].input_date.length - 2) + "</label>" +
						"</div>" +
						"</div>"
					);
				}

				var has_next2 = data.Data.has_next;
				var total = data.Data.total_cnt;
				++r_page2;
				if(total == 0) {

					/*text_myriddle();*/
					maincontent.append(
						"<div class='weui-panel weui-panel_access'>" +
						"<div class='weui-media-box weui-media-box_text'>" +
						"<a href='r_riddle_add.jsp'>" +
						"<h4 class='weui-media-box__title'>" + "您暂时还没有发布谜语。" + "</h4>" +
						"<p class='weui-media-box__desc'>" + "点击此处， 快速发布谜语" + "</p>" +
						"</a>" +
						"</div>" +
						"</div>"
					);
					$("#login_up2").css('display', 'none');
				} else if(total <= 10) {
					$("#login_up2").css('display', 'none');
				}
				uplist_data_myriddle(has_next2, r_page2);
			}
		},
		error: function() {
			$.alert("服务器错误");
		},
		complete: function() {
			color_stat();

		}
	});
}

/*审核谜语详情*/
function r_check() {
	$(function() {
		var id = $("#urlID").val();
		var r_key = "";
		$.ajax({
			type: 'post',
			dataType: "json",
			data: {
				param_json: '{"action_sort":"2002","Data":{"id":"' + id + '"}}'
			},
			url: "get_riddle",
			success: function(data) {
				openid = data.Data.openid;
				var page = 'r_riddle_check.jsp';
				redirect_getuserinfo(data.Flag, page);
				if(data.Flag == 0) {
					$.alert(data.Msg, function() {
						WeixinJSBridge.call('closeWindow');
					});
				} else {
					var _key = data.Data.riddle_key_list;
					for(var i = 0; i < _key.length; i++) {
						r_key += _key[i].riddle_key + "#";
					}
					document.getElementById('riddle_key3').innerText = r_key.substring(0, r_key.length - 1);
					$("#riddle_content3").html(data.Data.riddle_content);
					$("#input_man").html(data.Data.nickname);
					$("#input_date").html(data.Data.input_date.substring(0, data.Data.input_date.length - 2));
					$("#riddle_weight").val(data.Data.riddle_weight);
					$("#heard_img").attr('src', data.Data.headimgurl);
				}
			},
			error: function() {
				$.alert("服务器错误");
			},

		});
	});
}

/*审核*/
function r_riddle_check(stat) {
	var id = $("#urlID").val();
	var riddle_weight = $("#riddle_weight").val();
	if(riddle_weight.length == 0 || riddle_weight >= 100 || riddle_weight < 1) {
		$.toast("请输入权重【1-99】", "cancel");
	} else {
		if(stat == 1) {
			show_check_ok();
		} else {
			show_check_no();
		}
		$.ajax({
			type: 'post',
			dataType: "json",
			data: {
				param_json: '{"action_sort":"2003","Data":{"stat":"' + stat + '","id":"' + id + '","riddle_weight":"' + riddle_weight + '","input_man":"' + openid + '","riddle_content":"' + $("#riddle_content3").html() + '","riddle_key":"' + $("#riddle_key3").html() + '"}}'
			},
			url: "get_riddle",
			success: function(data) {
				var page = 'r_riddle_check.jsp';
				redirect_getuserinfo(data.Flag, page);
				if(data.Flag == 0) {
					$.alert(data.Msg, function() {
						WeixinJSBridge.call('closeWindow');
					});
				} else {
					if(stat == 1) {
						$.toast("审核通过!");
					} else {
						$.toast("审核未通过!");
					}
				}
			},
			error: function() {
				$.alert("服务器错误");
			},
			complete: function() {
				hide_check_ok();
				hide_check_no();
				r_exit_list();
			}
		});
	}
}

//做题页面头像
function head_img_do() {
	login_hide();
	$.ajax({
		type: 'post',
		dataType: "json",
		data: {
			param_json: '{"action_sort":"4001","Data":{}}'
		},
		url: "get_riddle",
		success: function(data) {
			var page = 'r_riddle_do.jsp';
			redirect_getuserinfo(data.Flag, page);
			if(data.Flag == 0) {
				$.alert(data.Msg, function() {
					WeixinJSBridge.call('closeWindow');
				});
			} else {
				$("#head_do").attr('src', data.userinfo.headimgurl);
				$("#menu_head_img").attr('src', data.userinfo.headimgurl);
				$("#username").html(data.userinfo.nickname);
				$("#menu_name").html(data.userinfo.nickname);
			}
			if(data.userinfo.nickname.length > 0) {
				r_replace();
			}
			
			if(!data.userinfo.user_sort){
				manager = 0;
			}else{
				manager = data.userinfo.user_sort;
			}
			hide_check(manager);
		},
		error: function() {
			$.alert("用户信息错误");
		},
	});
}

//出题头像//
function head_img_add() {
	hide_login_save();
	$.ajax({
		type: 'post',
		dataType: "json",
		data: {
			param_json: '{"action_sort":"4001","Data":{}}'
		},
		url: "get_riddle",
		success: function(data) {
			var page = 'r_riddle_add.jsp';
			redirect_getuserinfo(data.Flag, page);
			if(data.Flag == 0) {
				$.alert(data.Msg, function() {
					WeixinJSBridge.call('closeWindow');
				});
			} else {
				$("#head_add").attr('src', data.userinfo.headimgurl);
				$("#menu_head_img").attr('src', data.userinfo.headimgurl);
				$("#username").html(data.userinfo.nickname);
				$("#menu_name").html(data.userinfo.nickname);
			}
			if(!data.userinfo.user_sort){
				manager = 0;
			}else{
				manager = data.userinfo.user_sort;
			}
			hide_check(manager);
		},
		error: function() {
			$.alert("用户信息错误");
		},
	});
}

//审核详情头像//
function head_img_check() {

	hide_check_ok();
	hide_check_no();
	$.ajax({
		type: 'post',
		dataType: "json",
		data: {
			param_json: '{"action_sort":"4001","Data":{}}'
		},
		url: "get_riddle",
		success: function(data) {
			var page = 'r_riddle_check.jsp';
			redirect_getuserinfo(data.Flag, page);
			if(data.Flag == 0) {
				$.alert(data.Msg, function() {
					WeixinJSBridge.call('closeWindow');
				});
			} else {
				$("#check_name").html(data.userinfo.nickname);
				$("#head_check").attr('src', data.userinfo.headimgurl);
			}
		},
		error: function() {
			$.alert("用户信息错误");
		},
	});
}