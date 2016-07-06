define(['jquery', 'util'], function($, util){
	
	/**
	 * @member
	 * @return 
	 * @description 用 iframe 实现浏览器的跨域调用
	 * @example
	 *
	 */

	var Proxy = function(args){

		var ts = new Date().getTime() + '' + Math.floor(Math.random() * 1000);
		var defArgs = {
				protocol    : 'http',   		//　默认 http 协议
				host        : '',               //　默认为空
				port        : '80', 			// 默认 80　端口
				crossdomain : false, 			// 默认不跨域
				proxy       : '/proxy.html',    // 默认代理文件为 proxy.html
				iframeName  : 'iframe_' + ts    
		};
		// 调用方式
		this.METHOD = {
				GET : 'get',
				POST : 'post'
		};

		// 覆盖默认参数
		this.cfg = $.extend({}, defArgs, args);

	};
	
	/**
	 * 成功返回数据调用
	 */
	var successHandler = function(callback, p){
		if(callback && callback.success && callback.success instanceof Function){
			callback.success.call(callback, p);
		}
	};

	/**
	 * 失败调用
	 */
	var failureHandler = function(callback, p){
		if(callback && callback.failure && callback.failure instanceof Function){
			callback.failure.call(callback, p);
		}
	};

	/**
	 * 提示信息
	 *
	 */ 
	var MSG = {
			SERVER_ERROR		:	'服务器忙，请稍候再试',
			NONE_DATA			:	'没有数据',
			LOADING_DATA_ERROR	:	'加载数据错误'
	};

	$.extend(Proxy.prototype, {
	    
		xjQuery : function(url, method, param, callback) {
			try {
				var _args = arguments, _jQuery = null, _this = this, _frameName = null;
				try {
					_frameName = frames[_this.cfg.iframeName]; // 获取 iframe
					_jQuery = frames[_this.cfg.iframeName]
							&& frames[_this.cfg.iframeName].jQuery; // 获取 iframe 的 jQuery 对象
				} catch (e) {}
				
				if (_jQuery) {
					var Aargs = $.makeArray(_args);
					Aargs = Aargs.slice(1); 
					_jQuery[_args[0]].apply(_jQuery, Aargs); // 调用 ajax 方法
				} else {
					if(!_frameName){
						jQuery('body')
								.append('<iframe src="'
										+ _this.cfg.protocol + '://' + _this.cfg.host + ':' + _this.cfg.port + _this.cfg.proxy 
										+ '" name="' + _this.cfg.iframeName + '" style="display:none"></iframe>');
					}
					setTimeout(function() {
							_args.callee.apply(_this, _args);  //　重复调用函数
						}, 500);
				}
			} catch (e) {
			}
		},
		
		req : function(url, method, param, callback) {
			if(this.cfg.crossdomain){
				this.xjQuery('ajax',{
					url : url,
					type : method,
					data : param,
					cache : false,
					dataType : 'json',
					success : function(data,textStatus){
						if(data){
							successHandler(callback, data);
						}else{
							failureHandler(callback, MSG.SERVER_ERROR);
						}
					},
					error : function (XMLHttpRequest, textStatus, errorThrown) {
						failureHandler(callback, MSG.SERVER_ERROR + '[' + textStatus + ']');
					}
				});
			}else{
				jQuery.ajax({
					url : url,
					type : method,
					data : param,
					cache : false,
					dataType : 'json',
					success : function(data,textStatus){
						if(data){
							successHandler(callback, data);
						}else{
							failureHandler(callback, MSG.SERVER_ERROR);
						}
					},
					error : function (XMLHttpRequest, textStatus, errorThrown) {
						failureHandler(callback, MSG.SERVER_ERROR + '[' + textStatus + ']');
					}
				});
			}	
		}
	});
	
	//　地图的接口
	var MapService = function(cfg){
		MapService.superclass.constructor.call(this, cfg);
	};
	util.extend(MapService, Proxy);
	
	_fpr = MapService.prototype;
	
	_fpr.search = function(param, callback){
			this.req('/hotel/domestic/getDomesticHotel', this.METHOD.GET, param, callback);
	};
	var  MService= new MapService({
	   host        : 'travel.tianya.cn',
	   crossdomain : true,
	   proxy       : '/proxy.html'
	});

	return {
		MService : MService
	};
});
