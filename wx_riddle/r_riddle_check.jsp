<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%   
  String id=request.getParameter("id");
 %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">

	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
		<title>谜语审核</title>
		<link rel="stylesheet" href="//cdn.bootcss.com/weui/1.1.1/style/weui.min.css">
		<link rel="stylesheet" href="//cdn.bootcss.com/jquery-weui/1.0.1/css/jquery-weui.min.css">
		<link rel="stylesheet" type="text/css" href="css/example.css" />
		<link rel="stylesheet" href="css/riddle.css" />
		<script src="js/jquery-3.2.1.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="//cdn.bootcss.com/jquery-weui/1.0.1/js/jquery-weui.min.js"></script>
		<script src="js/r_ajax.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/r_riddle.js" type="text/javascript" charset="utf-8"></script>
	</head>

	<body onload="r_check(),head_img_check()">
		<!--onload="r_check();"-->
		<div class="page  js_show ">
			<div class="weui-cell">
				<a href="#menu" class="weui-cell__hd img_head_sp">
					<img id="head_check" class="img_head" src="">
				</a>
				<a href="#menu" class="weui-cell__bd text_head">
					<p id="check_name"></p>
				</a>
				<div class="weui-cell__ft">
					<a href="r_riddle_checklist.jsp" class="weui-btn weui-btn_mini weui-btn_default">
						返回</a>
				</div>
			</div>
			<hr class="hr_head" />
			<div class="page__bd page__bd_spacing">
				<div class="weui-media-box weui-media-box_text">
					<input type="hidden" id="urlID" value="<%=id%>" />
					<h4 class="weui-media-box__title">谜面：</h4>
					<label id="riddle_content3" class="page__desc"></label>
				</div>
				<div class="weui-cell weui-cell_access">
					<div class="weui-cell__bd">
						<p>谜底：</p>
					</div>
					<label id="riddle_key3"></label>
				</div>
				<div class="weui-cell weui-cell_access">
					<div class="weui-cell__bd">
						<p >用户：</p>
					</div>
					<img id="heard_img" src="">
					<label id="input_man"></label>
				</div>
				<div class="weui-cell weui-cell_access">
					<div class="weui-cell__bd">
						<p>时间：</p>
					</div>
					<label id="input_date"></label>
				</div>

				<div class="weui-cells weui-cells_form">
					<div class="weui-cell">
						<div class="weui-cell__hd">
							<label class="weui-label">权重</label>
						</div>
						<div class="weui-cell__bd">
							<input id="riddle_weight" maxlength="2" class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入权重">
						</div>
					</div>
				</div>
				<div style="margin-top: 20px;">
					<a href="javascript:r_riddle_check(1);" class="weui-btn weui-btn_primary"><i id="check_login_ok" class="weui-loading"></i>通过</a>
					<a href="javascript:r_riddle_check(-1);" class="weui-btn weui-btn_warn"><i id="check_login_no" class="weui-loading"></i>不通过</a>
				</div>
			</div>
		</div>
	</body>

</html>