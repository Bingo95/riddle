<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
		<title>猜谜语</title>
		<link rel="stylesheet" href="//cdn.bootcss.com/weui/1.1.1/style/weui.min.css">
		<link rel="stylesheet" href="//cdn.bootcss.com/jquery-weui/1.0.1/css/jquery-weui.min.css">
		<link rel="stylesheet" type="text/css" href="css/example.css" />
		<link rel="stylesheet" type="text/css" href="css/mmenu.css" />
		<link rel="stylesheet" type="text/css" href="css/riddle.css" />
		<script src="js/jquery-3.2.1.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/menu.js" type="text/javascript" charset="utf-8"></script>
		<script src="//cdn.bootcss.com/jquery-weui/1.0.1/js/jquery-weui.min.js"></script>
		<script src="js/jquery.mmenu.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/riddle_share.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/r_ajax.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/r_riddle.js" type="text/javascript" charset="utf-8"></script>
	</head>

	<body onload="r_replace_show();head_img_do();">
		<div id="page">
			<div class="weui-cell">
				<a href="#menu" class="weui-cell__hd img_head_sp">
					<img id="head_do" class="img_head" src="">
				</a>
				<a href="#menu" class="weui-cell__bd text_head">
					<p id="username"></p>
				</a>
				<div class="weui-cell__ft">
					<a href="r_riddle_add.jsp" class="weui-btn weui-btn_mini weui-btn_primary">
						<h3>我要出题</h3></a>
				</div>
			</div>
			<hr class="hr_head" />
			<div class="page__bd page__bd_spacing">
				<div class="weui-cell">
					<div class="weui-cell__bd">
						<p>谜面：</p>
					</div>
					<div id="riddle_getnew" class="weui-cell__ft">
						<a id="btn_login" href="JavaScript:r_replace();onlogin();" class="weui-btn weui-btn_mini weui-btn_plain-primary btn_ft">
							<h3><i id="login" class="weui-loading"></i>换一题</h3></a>
					</div>
				</div>
				<div>
					<h3><label id="riddle_content" class="weui-media-box text_color2"></label></h3>
				</div>
				<div id="riddle_do" class="weui-cells_form">
					<div class="weui-cells weui-cell weui-cell_vcode">
						<div class="weui-cell__bd">
							<input id="riddle_answer" class="weui-input" type="text" placeholder="我猜谜底是" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;">
						</div>
						<div class="weui-cell__ft">
							<a id="riddle_ok" class="weui-vcode-btn " href="javascript:r_answer();">
								<i id="login_ok" class="weui-loading"></i>确定</a>
						</div>
					</div>
				</div>
				<div id="riddle_answer2" class="answer_border_top">
					<div class="weui-cell">
						<div class="weui-cell__bd">
							<p>谜底：</p>
						</div>
					</div>
					<div>
						<label id="riddle_result2" class="weui-media-box answer_text"></label>
					</div>
				</div>
				<div id="btn_result" style="margin-top:20px;">
					<a href="javascript:r_result();resultlogin();" class="weui-btn weui-btn_plain-default ">
						<i id="login_result" class="weui-loading"></i>求答案</a>
				</div>
				<div class="text_center">
					<label id="riddle_result" class="prompt_ok"></label>
				</div>
			</div>

		</div>
		<div id="menu_content">

		</div>
		<input type="hidden" id="riddle_id" />
	</body>
	<script type="text/javascript">
		$(function() {
			$('nav#menu').mmenu();
		});
	</script>

</html>