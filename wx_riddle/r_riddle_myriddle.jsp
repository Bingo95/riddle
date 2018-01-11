<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
		<title>我的谜语</title>
		<link rel="stylesheet" href="//cdn.bootcss.com/weui/1.1.1/style/weui.min.css">
		<link rel="stylesheet" href="//cdn.bootcss.com/jquery-weui/1.0.1/css/jquery-weui.min.css">
		<link rel="stylesheet" type="text/css" href="css/example.css" />
		<link rel="stylesheet" type="text/css" href="css/mmenu.css" />
		<link rel="stylesheet" type="text/css" href="css/riddle.css" />
		<script src="js/jquery-3.2.1.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="//cdn.bootcss.com/jquery-weui/1.0.1/js/jquery-weui.min.js"></script>
		<script src="js/jquery.mmenu.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/r_ajax.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/r_riddle.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/menu.js" type="text/javascript" charset="utf-8"></script>
	</head>

	<body onload="r_myriddlelist();">
		<div id="page">
			<div class="weui-cell">
				<a href="#menu" class="weui-cell__hd img_head_sp">
					<img id="myriddle_img" class="img_head" src="">
				</a>
				<a href="#menu" class="weui-cell__bd text_head">
					<p id="username"></p>
				</a>
				<div class="weui-cell__ft">
					<a href="javascript:history.back(-1);" class="weui-btn weui-btn_mini weui-btn_default">
						<h3>返回</h3></a>
				</div>
			</div>
			<hr class="hr_head" />
			<!--填充数据的区域-->
			<div class="weui-panel__bd" id="myriddle_content">

			</div>
			<div id="login_up2" class="weui-loadmore">
				<i class="weui-loading"></i>
				<span class="weui-loadmore__tips">正在加载</span>
			</div>
		</div>
		<div id="menu_content">
		</div>
	</body>
	<script type="text/javascript">
		$(function() {
			$('nav#menu').mmenu();
		});
	</script>

</html>