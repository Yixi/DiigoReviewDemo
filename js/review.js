/**
 * Diigo Review lib v 0.1 
 *
 * Copyright (c) 2012 Diigo, Inc. (diigo.com)
 * Powered by jQuery (jquery.com)
 * 
 */

var Review  = function  () {
	// args = [element,data]

	var args = Array.prototype.slice.call(arguments);
	var t = this;
	this.element = $(args[0]);
	this.dataurl = args[1];
	this.h = document.height-20;
	this.w = document.width;


	this.init = function(){
		// console.log(1);
		$.get('js/data.json',function(data){
			t.data = data;
			t.BuildUI();	
		});
	};

	this.BuildUI = function(){
		var data = t.data.data;
		for(i=0;i<data.length;i++){
			t.element.append('<div id="item_'+i+'" class="item" style="height:'+t.h+'px;width:'+t.w+'px;margin-top:0px;margin-left:'+i*t.w+'px;overflow:hidden;position:absolute;"></div>');
			$("#item_"+i).append('<div id="i_'+i+'" class="i_item">'+data[i].title+i+'</div>');
		};
		t.bindUI();
	}

	this.bindUI = function(){
		var type = $.browser.mozilla ? 'keypress' : 'keydown';
		$(document).bind(type,function(e){
			var code = e.keyCode ? e.keyCode : e.which;
			switch(code){
				case 39:
					//next
					if (!$("body").is(':animated'))
					$("body").animate({scrollLeft:document.body.scrollLeft+t.w});
					break;
				case 37:
					//prev
					if (!$("body").is(':animated'))
					$("body").animate({scrollLeft:document.body.scrollLeft-t.w});
					break;
			}
		});
	}


}





 $(function(){

 	var a = new Review('#items');
 	console.log(a);
 	a.init();
 });