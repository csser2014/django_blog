require.config({
	paths:{
		'jquery' : 'jquery-1.11.1',
		'scrolltopui' : 'ui/scrolltop.ui',
		'scrollfixui' : 'ui/scrollfix.ui'
		
		//async : 'async',
		//mapui : "map.ui"
	}
	/*
	shim : {
		"jquery.lockfixed" : ["jquery"]
	}
	*/
});
require(['jquery','util', 'prototype', 'scrolltopui', 'scrollfixui'], function($,util, prototype, scrolltop, scrollfix){
	
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
	
	var s = new scrolltop.ScrollTop();
	var f = new scrollfix.ScrollFix({clsName : 'menu', offsetBottom:700});
	//new scrolltop.ScrollTop({time:5000, top:100});

});

