define(['jquery'], function(jQuery){

	// 工具类
	var utilTool = {
		isFinite : function(num) {
			return isFinite(num);
		},
		extend : function(subClass, superClass) {
			var F = function(){};
			F.prototype = superClass.prototype;
			subClass.prototype = new F();
			subClass.prototype.constructor = subClass;
			subClass.superclass = superClass.prototype;
			if (superClass.prototype.constructor === Object.prototype.constructor){
				superClass.prototype.constructor = superClass;
			}
		}
	};
	return utilTool;
});
