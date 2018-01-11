$(function() {
	var menucontent = $("#menu_content");
	menucontent.append(
		"<nav id='menu'>" +
		"<ul>" +
		"<li class='menu_li_head_back'>" +
		"<div class='weui-msg'>" +
		"<div class='weui-msg__icon-area'>" +
		"<img id='menu_head_img' class='img_head_menu' src=''/>" +
		"<div class='weui-msg__text-area'>" +
		"<label id='menu_name' class='text_head_menu'></label>" +
		"</div>" +
		"</div>" +
		"</div>" +
		"</li>" +
		"<li class='menu_li_back'>" +
		"<a class='text_color' href='r_riddle_do.jsp'>首页</a>" +
		"</li>" +
		"<li class='menu_li_back'>" +
		"<a class='text_color' href='r_riddle_myriddle.jsp'>我的谜语</a>" +
		"</li>" +
		"<li id='check_li' class='menu_li_back'>" +
		"<a class='text_color' href='r_riddle_checklist.jsp'>审核谜语</a>" +
		"</li>" +
		"<li class='menu_li_back'>" +
		"<a class='text_color' href='#'>···</a>" +
		"</li>" +
		"<li class='menu_li_back'>" +
		"<a class='text_color' href='#'>隐藏</a>" +
		"</li>" +
		"</ul>" +
		"</nav>"
	);
})

function hide_check(manager) {
	if(manager == 0) {
		$("#check_li").css('display', 'none');
	}
}
/*<!--<nav id="menu">
			<ul>
				<li class="menu_li_head_back">
					<div class="weui-msg">
						<div class="weui-msg__icon-area">
							<img id="menu_head_img" class="img_head_menu" src="" />
							<div class=" weui-msg__text-area ">
								<label id="menu_name" class="text_head_menu"></label>
							</div>
						</div>
					</div>
				</li>
				<li class="menu_li_back">
					<a class="text_color" href="r_riddle_do.jsp">首页</a>
				</li>
				<li class="menu_li_back">
					<a class="text_color" href="r_riddle_myriddle.jsp">我的谜语</a>
				</li>
				<li class="menu_li_back">
					<a class="text_color" href="">······</a>
				</li>
				<li class="menu_li_back">
					<a class="text_color" href="#">隐藏</a>
				</li>
			</ul>
		</nav>-->*/