define(['jquery'], function($){

	/**
	 *
	 * @member 
	 * @return 
	 * @description 实现按钮返回到顶部的组件
	 * @example
	 * new ScrollTop();
	 * new ScrollTop({clsName:'scrolltotop', time:5000, top:100});
	 *
	 */

	function ScrollTop(args) {
		//默认参数
		var defArgs = {
			clsName : 'scrolltop-ui', //默认类名
			text    : '返回顶部',
			id      : 'scrolltop_ui_' + (new Date()).getTime(),
			time    : 500, //默认返回到顶部的时间为500毫秒
			top     : $(window).width()  //钮默是滚动到大于屏幕的高度的时候出现返回顶部按钮
		};

		this.cfg = $.extend({}, defArgs, args);

		this.init();
	}


	$.extend(ScrollTop.prototype, {
		init : function() {

			this.createHtmlDom();

			this.bindEvent();

		},
		
		//创建 dom 结构
		createHtmlDom : function() {
			var domHtml = [
				'<div id="' + this.cfg.id + '" class="' + this.cfg.clsName + '">',
					'<a class="scrolltop_ui_btn" href="javascript:void(0);">' + this.cfg.text + '</a>',
				'</div>'
			].join("");
			$('body').append(domHtml);
		},

		//邦定事件
		bindEvent : function() {
			var _this = this;
			$(window).on('scroll resize', function(){
				if ($(window).scrollTop() > _this.cfg.top){
					$('.' + _this.cfg.clsName).fadeIn(); //显示返回顶部按钮
				} else{
					$('.' + _this.cfg.clsName).fadeOut(); //隐藏返回顶部按钮
				}
			});

			$('.' + _this.cfg.clsName).on('click', function(){
				$('body, html').animate({scrollTop : 0}, _this.cfg.time);
			});
		}
	});
	return {
		ScrollTop : ScrollTop
	};
});
