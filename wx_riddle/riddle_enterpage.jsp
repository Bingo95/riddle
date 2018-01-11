<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
		<title>猜谜语入口</title>
		<link rel="stylesheet" href="//cdn.bootcss.com/weui/1.1.1/style/weui.min.css">
		<link rel="stylesheet" href="//cdn.bootcss.com/jquery-weui/1.0.1/css/jquery-weui.min.css">
	</head>

	<body onload="ridirect()">
		<div class="weui-loadmore">
			<i class="weui-loading"></i>
			<span class="weui-loadmore__tips">正在加载······</span>
		</div>
		<script>
			function ridirect() {
				var page = '<%=request.getParameter("page")%>'
				window.location.href = "http://wx.jidisoft.com/oauthpub2_redirect.jsp?r_url=http://192.168.1.72:8080/wx_riddle/enterpage?page=" + page;
			}
		</script>
	</body>

</html>