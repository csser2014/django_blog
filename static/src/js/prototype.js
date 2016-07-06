define(['jquery'], function($){
	/**
	 * 扩展 Array 类
	 *
	 */
	$.extend(Array.prototype, {

		/**
		 * @member Array
		 * @description
		 * @return {Max Number}
		 * @example
		 *
		 */
		max : function(){
			return Math.max.apply({}, this);
		},

		/**
		 * @member Array
		 * @description
		 * @return {Min Number}
		 * @example
		 *
		 */
		min : function(){
			return Math.min.apply({}, this);
		}
	});

	/**
	 * 扩展 String 类
	 *
	 */
	$.extend(String.prototype, {

		/**
		 * @member String
		 * @description 去除左边空格
		 * @return  {String}
		 * @example
		 * " This is a test".ltrim(); //This is a test
		 */
		ltrim : function(){
			return this.replace(/^\s+/g, '');
		},

		/**
		 * @member String
		 * @description 去除右边空格
		 * @return {String}
		 * @example
		 * "This is a test ".rtrim(); //This is a test
		 */
		rtrim : function(){
			return this.replace(/\s+$/g, '');
		},

		/**
		 * @member String
		 * @description 将特定的 html 编码转换为字符串
		 * @return {String}
		 * @example
		 *
		 */
		escapeHTML : function(){
			return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		},

		/**
		 * @member String
		 * @description 将字符串转换为特定的 html 编码
		 * @return {String}
		 * @example
		 *
		 */
		unescapeHTML : function(){
			return this.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
		},

		/**
		 * @member String
		 * @description 字符串长度小于 length 时，对 str 左边填入 fixStr
		 * @return {String}
		 * @example  
		 * "3".leftFix("0", 2) // 03 
		 */
		leftFix : function(fixStr, length){
			str = this;
			while (str.length < length){
				str = fixStr + str;
			}
			return str;
		},

		/**
		 * @member String
		 * @description 获取长度，中文用2位表示
		 * @return {String}
		 * @example 
		 * "我shi测试".getCNlen(); //9
		 */
		getCNlen : function(){
			return this.replace(/[^\x00-\xff]/g, '**').length;
		},

		/**
		 * @member String
		 * @description 
		 * @return {String}
		 * @example
		 * "my name is {{name}} and age is {{age}}.".format({'name':'test', 'age':18});
		 * "my name is {{1}} and age is {{0}}.".format(['test', 18]);
		 * my name is test and age is 18
		 */

		format : function(){
			var a = arguments;
			var data = (a.length == 1 && typeof(a) == 'object') ? a[0] : a;
			return this.replace(/\{([\d\w]+)\}/g, function(m, i){
				return data[i] != undefined ? data[i].toString() : '';
			});
		}
	});

	/**
	 * 扩展 Date 类
	 *
	 */
	$.extend(Date.prototype, {
	});
});
