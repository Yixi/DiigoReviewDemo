/**
 * Diigo Review lib v 0.2
 *
 * Copyright (c) 2012 Diigo, Inc. (diigo.com)
 * Powered by jQuery (jquery.com)
 *
 */

var ReviewLib = function() {
		//args = [*element,]
		var args = Array.prototype.slice.call(arguments);

		var z = this;
		this.element = $(args[0])
		this.point = 0;
		this.h = window.innerHeight - 20;
		this.w = window.innerWidth;

		this.init = function(initdata) {
			// console.log(initdata[0]);
			z.BuildUI(initdata,"right");
			// document.body.scrollLeft= 10000 * z.w;
		}

		this.BuildUI = function(data, location) {
			switch (location) {
			case 'right':
				var lastid;
				// if(z.element.children.length>0) lastid = z.element.children.last().attr('id');
				// 	else lastid = "item_0";
				lastid = z.element.children().length>0?z.element.children().last().attr('id'):"item_-1";

				z.r_offset = parseInt(lastid.slice(5,lastid.length));
				z.r_offset++;
				for (i = z.r_offset; i < (z.r_offset + data.length); i++) {
					// console.log(i-z.r_offset);
					z.element.append('<div id="item_' + i + '" class="item" style="height:' + z.h + 'px;width:' + z.w + 'px;overflow:hidden;float:left;position:relative;"></div>');
					$("#item_" + i).append('<div id="i_' + i + '" class="i_item">' + data[i-z.r_offset] + '</div>');
					z.element.css("width",i*z.w);
				}
				lastid = z.element.children().length>0?z.element.children().last().attr('id'):"item_0";
				z.r_offset = parseInt(lastid.slice(5,lastid.length));
				break;
			case 'left':
				for (i = data.length - 1; i >= 0; i--) {
					z.element.prepend('<div id="item_' +z.l_offset+ '" class="item" style="height:' + z.h + 'px;width:' + z.w + 'px;margin-top:0px;margin-left:' + z.l_offset * z.w + 'px;overflow:hidden;position:absolute;"></div>');
					$("#item_" + z.l_offset).append('<div id="i_' + z.l_offset + '" class="i_item">' + data[i] + '</div>');
					z.l_offset--;
				}
				break;
			};
			z.BindUI();
		};

		this.BindUI = function() {
			var type = $.browser.mozilla ? 'keypress' : 'keydown';
			$(document).bind(type, function(e) {
				var code = e.keyCode ? e.keyCode : e.which;
				console.log(e);
				switch (code) {
				case 39:
					//next
					z.scrollRight();
					break;
				case 37:
					//prev
					z.scrollLeft();
					break;
				}
			});

			$("#prev_b").click(function(e) {

				z.scrollLeft();
			})
			$("#next_b").click(function(e) {
				console.log(e);
				z.scrollRight();
			})
			$(window).bind("resize", function(e) {
				var w = z.w;
				var l = document.body.scrollLeft;
				z.h = window.innerHeight - 20;
				z.w = window.innerWidth;
				for (i = 0; i < $('.item').length; i++) {
					$($('.item')[i]).attr('style', 'height:' + z.h + 'px;width:' + z.w + 'px;margin-top:0px;margin-left:' + i * z.w + 'px;overflow:hidden;position:absolute;')
					document.body.scrollLeft = z.w * l / w
				}
			});

		};

		this.scrollLeft = function() {
			var w =z.w;
			var l = document.body.scrollLeft;
			var cur = l/w+1;

			if(cur==3 && cur==0){
				console.log('loadingleft');
				z.element.trigger('data',["left"]);
			}



			if (!$("body").is(':animated'))
			$("body").animate({scrollLeft:document.body.scrollLeft-z.w});

		}
		this.scrollRight = function() {
			console.log('lodingright');
			if(z.r_offset-z.point==3 || z.point==z.r_offset-1){
				
				z.element.trigger('data',["right"]);
			}

			if(z.point==z.r_offset-1){
				return;
			}

			if (!z.element.is(':animated')){
				z.element.animate({marginLeft:z.element.css('marginLeft').slice(0,-2)-z.w});
				z.point++;
			}


			


			// var w = z.w;
			// var l = Math.abs(z.element.css('marginLeft').slice(0,-2));
			// var len = z.element.children().length;
			// var cur = l/w +1;

			// if(cur==3 && cur==0){
			// 	console.log('lodingright');
			// 	z.element.trigger('data',["right"]);
			// }
		}



	}

var a ;

$(function() {

	$.get('TestDesign.html',function(html){
		
		var testdata = new Array();

		for(i=0;i<10;i++){
			testdata.push(html);
		}

		a = new ReviewLib("#items");
		console.log(a);
		a.init(testdata);

		a.element.bind('data',function(e,message){
			console.log(message);
				switch(message){
					case "right":
						var rightdata = new Array();
						$.get('TestDesign.html',function(html){
							for(i=0;i<5;i++){
								rightdata.push(html);
							}
							a.BuildUI(rightdata,"right");
						});
						break;
					case "left":
						var rightdata = new Array();
						$.get('TestDesign.html',function(html){
							for(i=0;i<5;i++){
								rightdata.push(html);
							}
							a.BuildUI(rightdata,"left");
						});
						break;
				}

		});

	});




	

});