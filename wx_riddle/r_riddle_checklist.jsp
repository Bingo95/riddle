<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
		<title>谜语审核列表</title>
		<link rel="stylesheet" href="//cdn.bootcss.com/weui/1.1.1/style/weui.min.css">
		<link rel="stylesheet" href="//cdn.bootcss.com/jquery-weui/1.0.1/css/jquery-weui.min.css">
		<link href="css/example.css" rel="stylesheet" type="text/css" />
		<link href="css/riddle.css" rel="stylesheet" type="text/css" />
		<script src="js/jquery-3.2.1.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="//cdn.bootcss.com/jquery-weui/1.0.1/js/jquery-weui.min.js"></script>
		<script src="js/r_ajax.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/r_riddle.js" type="text/javascript" charset="utf-8"></script>
	</head>

	<body onload="r_list();">
		<!--页面记载玩以后 执行r_list()方法-->
		<div class="weui-panel">
			<!--这里面是填充数据的区域-->
			<div class="weui-panel__bd" id="main_content">
				<!--这就是一组数据-->
				<!--<div id="" class="weui-media-box box_bottom">
					<p class="weui-media-box__hd">老人梅友并到医院去做检查，结果医生告诉他说要看开一点，请问他得了什么病？ </p>
					<div class="top_margin">
						<label class="weui-form-preview__label ">谜底:</label>
						<em id="" class="weui-form-preview__value">113</em>
					</div>
					<img class="top_margin" src="http://wx.qlogo.cn/mmopen/QvYsvYHrgPnsggJ1icg3kWNicU8sZo4JAHvDI2By6IicqmKtsuqGBkvBibFjGrBX6EOT7np8XGSEia4T2aGTaicULANudyhYH13FJD/0">
					<label id="" class="page__desc">admin</label>
					<label id="" class="page__desc">05-01 11:16:13</label>
				</div>-->

			</div>
			<div id="login_up" class="weui-loadmore">
				<i class="weui-loading"></i>
				<span class="weui-loadmore__tips">正在加载</span>
			</div>
		</div>
	</body>

</html>