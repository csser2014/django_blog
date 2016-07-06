require.config({
	paths:{
		'jquery' : 'jquery-1.11.1',
		'async' : 'async',
		'mapui' : "ui/map.ui"
	}
	/*
	shim : {
		"jquery.lockfixed" : ["jquery"]
	}
	*/
});
require(['jquery','util', 'prototype', 'mapui'], function($,util, prototype, mapui){
	
	//$('#a').click(function(){
		/*
		alert(util.isFinite('0.1'));
		alert(util.isFinite('ee0.1'));
		alert(util.isFinite('-0.1'));
		*/
	//});
	//var a = [1,2];
	//a.toTest();
	//console.log(a);
	//console.log("3".leftFix("0", 2));
	//console.log("abc我ddd是你的bbb好".getCNlen());
	//console.log("my name is {{name}} and age is {{age}}.".format({'age':18, 'name':'huzhirong'}));
	//console.log("my name is {{0}} and age is {{1}}.".format(['huzhirong', 18]));
	//返回顶部
	
	//var s = new scrolltop.ScrollTop();
	//var f = new scrollfix.ScrollFix({clsName : 'menu', offsetBottom:700});
	//new scrolltop.ScrollTop({time:5000, top:100});

	//var arr = [5, 3, 1, 3, 6, 8];
	//console.log(arr.max());
	//console.log(arr.min());

	//s.init();
	
	//var map = new t.BMap.Map('MapContent');

	$(function(){
		
		var map = new mapui.Map("MapContent");
		map.enableScrollWheelZoom();
		map.addControl(new mapui.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE, offset: new mapui.Size(10, 10)}));
		map.centerAndZoom(new mapui.Point(116.404, 39.915), 15);  // 初始化地图,设置中心点坐标和地图级别
		map.addControl(new mapui.MapTypeControl());   //添加地图类型控件
		map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
	});

   /*var param = {
	   c : decodeURI("广州")
   };
   var callback = {
	   success : function(res){
		   console.log(res);
	   },
	   failure : function(e){
	   }
   };
   proxy.MService.search(param, callback);
   */

});

