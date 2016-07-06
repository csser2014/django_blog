require.config({
	paths:{
		'jquery' : 'jquery-1.11.1',

		// jQuery UI
		'jqueryui' : 'ui/jquery.ui',
		'datepickerzhCN' : 'ui/datepicker.zh.CN'

		
	},
	shim : {
		//"jquery.lockfixed" : ["jquery"]
	}
});
require(['jquery','util', 'prototype', 'jqueryui', 'datepickerzhCN'], function($,util, prototype){
	
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

