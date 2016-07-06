define(['jquery'], function(){
	/**
	 * @member
	 * @return 
	 * @description 实现滚动到导航条时固定在顶部
	 * @example
	 * new ScrollFix();
	 * new ScrollFix({clsName : 'menu', offsetBottom:700});
	 */

	var ScrollFix = function(args) {
		// 默认参数
		var defArgs = {
			clsName      : 'scrollfix-ui',  // 要固定滚动对象的类名
			offsetTop    : 0,               // 当滚动到要固定对象的时候，offsetTop 代表的是要固定对象离顶部的距离
			offsetBottom : 0,       		// 当滚动到要固定对象的时候，offsetBottom 代表的是要固定对象离底部的距离
			is_fixed     : true     		// 默认是固定的
		};

		this.cfg = $.extend({}, defArgs, args);
		
		this.init();
	};

	$.extend(ScrollFix.prototype, {

		init : function() {
			
			this.setConfig();
			this.bindEvent();
		},

		// 获取初始化的参数
		setConfig : function() {
			this.node = $('.' + this.cfg.clsName);
			if (this.node && this.node.offset()) {
				this.docTop = this.node.offset().top; // 元素相对于文档的高度
				this.elTop = this.node.css('top');    // 获取元素的 top 属性值，带 px 单位的，默认是 auto
				this.elPosition = this.node.css('position'); // 获取元素的 position 属性值，默认是 static
				this.marginTop = parseInt(this.node.css('marginTop'), 10) || 0; // 要固定对象的 margin-top 的值
				this.elHeight = this.node.outerHeight();  //元素的高度，不带 px 单位的
				this.elWidth = this.node.outerWidth();    //元素的宽度，不带 px 单位的
				this.maxHeight = $(document).height() - this.cfg.offsetBottom;
			}
		},

		bindEvent : function() {
			var _this = this, top = 0;
			$(window).on('scroll resize', function(){

				var scrollTop = $(window).scrollTop();

				// 不固定
				if (!_this.cfg.is_fixed) {
					return;
				}

				if (_this.node.css('position') !== 'fixed' && _this.cfg.is_fixed) {
					_this.docTop = _this.node.offset().top; 
				}

				// 判断是否已经滚动超过固定对象的位置了
				if (scrollTop >= (_this.docTop - _this.marginTop - _this.cfg.offsetTop)) {
					
					if (_this.maxHeight < (scrollTop + _this.elHeight + _this.marginTop + _this.cfg.offsetTop)){
						top = scrollTop + _this.elHeight + _this.marginTop + _this.cfg.offsetTop - _this.maxHeight;
					}else{
						top = 0;
					}

					_this.node.css({'position': 'fixed', 'top': (_this.cfg.offsetTop-top) + 'px'});

				}else{
					// 没有滚动到超过固定的位置，就恢复原来的属性，否则会一直固定在那里
					_this.node.css({'position': _this.elPosition, 'top': _this.elTop, 'width':_this.elWidth, 'marginTop': _this.marginTop + 'px'});
				}

			});
		}
	});
	return {
		ScrollFix : ScrollFix
	};
});
