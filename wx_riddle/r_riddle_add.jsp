<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
		<title>出题</title>
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

	<body onload="head_img_add();">
		<div id="page">
			<div class="weui-cell">
				<a href="#menu" class="weui-cell__hd img_head_sp">
					<img id="head_add" class="img_head" src="">
				</a>
				<a href="#menu" class="weui-cell__bd text_head">
					<p id="username"></p>
				</a>
				<div class="weui-cell__ft">
					<a href="r_riddle_do.jsp" class="weui-btn weui-btn_mini weui-btn_default">
						<h3>返回</h3></a>
				</div>
			</div>
			<hr class="hr_head" />
			<div class="weui-cells__title">谜面</div>
			<div class="weui-cells weui-cells_form">
				<div class="weui-cell">
					<div class="weui-cell__bd">
						<textarea id="riddle_content2" maxlength="160" class="weui-textarea" placeholder="请输入谜面" rows="3"></textarea>
						<div class="weui-textarea-counter"><span id="riddle_count">0</span>/160</div>
					</div>
				</div>
			</div>
			<div class="weui-cells__title">谜底</div>
			<div class="weui-cells">
				<div class="weui-cell">
					<div class="weui-cell__bd">
						<input id="riddle_key2" class="weui-input" type="text" placeholder="请输入谜底" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;">
					</div>
				</div>
			</div>
			<label class="prompt">出题有机会获得现金红包哦!</label>

			<div class="page__bd page__bd_spacing">
				<a href="javascript:r_add();" class="weui-btn weui-btn_primary btn_top">
					<i id="login_save" class="weui-loading"></i>保存</a>
			</div>
		</div>
		<div id="menu_content">
		</div>
	</body>

</html>
<script type="text/javascript">
	/*textarea字数*/
	$(function() {
		var text2 = $("#riddle_content2").val();
		var counter2 = text2.length;
		$("#riddle_count").text(counter2);
		$("#riddle_content2").on('blur keyup input', function() {
			var text2 = $("#riddle_content2").val();
			var counter = text2.length;
			$("#riddle_count").text(counter);
		});
	});

	/*侧滑*/
	$(function() {
		$('nav#menu').mmenu();
	});
</script>