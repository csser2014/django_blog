require.config({
	paths:{
		'jquery' : 'jquery-1.11.1',
		
		// scrolltop and scrollfix
		'scrolltopui' : 'ui/scrolltop.ui',
		'scrollfixui' : 'ui/scrollfix.ui',

		//　加载地图
		'async' : 'async',
		'mapui' : "ui/map.ui",

		// jQuery UI
		'jqueryui' : 'ui/jquery.ui',
		'datepickerzhCN' : 'ui/datepicker.zh.CN'
	}
	/*
	shim : {
		"jquery.lockfixed" : ["jquery"]
	}
	*/
});
require(['jquery','util', 'prototype', 'scrolltopui', 'scrollfixui', 'mapui', 'proxy', 'jqueryui', 'datepickerzhCN'], function($,util, prototype, scrolltop, scrollfix, mapui, proxy){
	
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
	
	new scrolltop.ScrollTop();
	new scrollfix.ScrollFix({clsName : 'menu', offsetBottom:400});
	//new scrollfix.ScrollFix({clsName : 'menu'});
	//new scrolltop.ScrollTop({time:5000, top:100});

	//var arr = [5, 3, 1, 3, 6, 8];
	//console.log(arr.max());
	//console.log(arr.min());

	$(function(){
		
		var map = new mapui.Map("MapContent");
		map.enableScrollWheelZoom();
		map.addControl(new mapui.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE, offset: new mapui.Size(10, 10)}));
		map.centerAndZoom(new mapui.Point(116.404, 39.915), 15);  // 初始化地图,设置中心点坐标和地图级别
		map.addControl(new mapui.MapTypeControl());   //添加地图类型控件
		map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
		
		//　日期
		$('#datepicker').datepicker({
			changeMonth: false,  	//　是否有下拉的月份选择
	        changeYear: false,   	// 是否有下拉的年份选择
	        numberOfMonths: 2,   	// 指定月份的数量
	        minDate:"1d",	     	//　指定最小的日期
	        dateFormat:"yy-mm-dd",  //　日期的格式　2014-06-18
	        onSelect : function(selectedDate) {
	        	console.log(selectedDate);
	        }
		});
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

