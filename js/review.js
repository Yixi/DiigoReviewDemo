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
	this.h = window.innerHeight-20;
	this.w = window.innerWidth;


	this.init = function(){
		// console.log(1);
		$.get('js/data.json',function(data){
			t.data = data;

			$.get('TestDesign.html',function(html){
				t.testdata = html;
				t.BuildUI();
			});

				
		});
	};

	this.BuildUI = function(){
		var data = t.data.data;
		for(i=0;i<data.length;i++){
			t.element.append('<div id="item_'+i+'" class="item" style="height:'+t.h+'px;width:'+t.w+'px;margin-top:0px;margin-left:'+i*t.w+'px;overflow:hidden;position:absolute;"></div>');
			$("#item_"+i).append('<div id="i_'+i+'" class="i_item">'+t.testdata+'</div>');
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
					t.scrollRight();
					break;
				case 37:
					//prev
					t.scrollLeft();
					break;
			}
		});

		$("#prev_b").click(function(e){t.scrollLeft();})
		$("#next_b").click(function(e){t.scrollRight();})
		$(window).bind("resize",function(e){
			var w =t.w;
			var l = document.body.scrollLeft;
			t.h=window.innerHeight-20;
			t.w=window.innerWidth;
			for(i=0;i<$('.item').length;i++){
				$($('.item')[i]).attr('style','height:'+t.h+'px;width:'+t.w+'px;margin-top:0px;margin-left:'+i*t.w+'px;overflow:hidden;position:absolute;')
				document.body.scrollLeft = t.w*l/w
			}
		});
	}

	this.scrollLeft = function(){
		if (!$("body").is(':animated'))
		$("body").animate({scrollLeft:document.body.scrollLeft-t.w});
	}

	this.scrollRight = function(){
		if (!$("body").is(':animated'))
		$("body").animate({scrollLeft:document.body.scrollLeft+t.w});
	}

}





 $(function(){

 	var a = new Review('#items');
 	console.log(a);
 	a.init();
 });