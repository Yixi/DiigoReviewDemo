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
		this.element = $(args[0]);
		this.initdata = args[1];
		this.point = 0;
		this.h = window.innerHeight - 20;
		this.w = window.innerWidth;

		

		this.init = function(initdata) {
			if(initdata==undefined || initdata.length<1){
				z.LoadItems(0,"right",z.BuildUI);
			}else{
				z.BuildUI(initdata,"right");
			}
		}

		this.BuildUI = function(data, location) {
			switch (location) {
			case 'right':

				var lastid = z.element.children().length>0?z.element.children().last().attr('id'):"item_-1";
				z.r_offset = parseInt(lastid.slice(5,lastid.length));
				z.r_offset++;
				for (i = z.r_offset; i < (z.r_offset + data.length); i++) {
					// console.log(i-z.r_offset);
					z.element.append('<div id="item_' + i + '" data-offset="'+data[i-z.r_offset].offset+'" class="item" style="height:' + z.h + 'px;width:' + z.w + 'px;overflow:hidden;float:left;position:relative;"></div>');
					$("#item_" + i).append('<div id="i_' + i + '" class="i_item">' + data[i-z.r_offset].html + '</div>');
					z.element.css("width",parseInt(a.element.css("width").slice(0,-2))+z.w);
					$("#next_b").show();
				}

				if(z.element.children().length>25){
					for(i=0;i<5;i++){
						a.element.children().first().remove();
						z.element.css("width",parseInt(a.element.css("width").slice(0,-2))-z.w);
						z.element.css("marginLeft",parseInt(z.element.css('marginLeft').slice(0,-2))+z.w);
					}
				}


				lastid = z.element.children().length>0?z.element.children().last().attr('id'):"item_0";
				var firstid = z.element.children().length>0?z.element.children().first().attr('id'):"item_0";
				z.r_offset = parseInt(lastid.slice(5,lastid.length));
				z.l_offset = parseInt(firstid.slice(5,firstid.length));
				break;
			case 'left':
				var firstid = z.element.children().length>0?z.element.children().first().attr('id'):"item_0";
				z.l_offset = parseInt(firstid.slice(5,firstid.length));
				z.l_offset--;
				for (i =z.l_offset; i > z.l_offset - data.length; i--) {
					z.element.prepend('<div id="item_' +i+ '" data-offset="'+data[data.length-z.l_offset+i-1].offset+'" class="item" style="height:' + z.h + 'px;width:' + z.w + 'px;;overflow:hidden;float:left;position:relative;"></div>');
					$("#item_" + i).append('<div id="i_' + i + '" class="i_item">' + data[data.length-z.l_offset+i-1].html + '</div>');
					z.element.css("width",parseInt(a.element.css("width").slice(0,-2))+z.w);
					z.element.css("marginLeft",parseInt(z.element.css('marginLeft').slice(0,-2))-z.w);
					$("#prev_b").show();
				}

				if(z.element.children().length>25){
					for(i=0;i<5;i++){
						a.element.children().last().remove();
						z.element.css("width",parseInt(a.element.css("width").slice(0,-2))-z.w);
						// z.element.css("marginLeft",parseInt(z.element.css('marginLeft').slice(0,-2))+z.w);
					}
				}



				var lastid = z.element.children().length>0?z.element.children().last().attr('id'):"item_0";
			 	firstid = z.element.children().length>0?z.element.children().first().attr('id'):"item_0";
				z.r_offset = parseInt(lastid.slice(5,lastid.length));
				z.l_offset = parseInt(firstid.slice(5,firstid.length));
				break;
			};
			z.BindUI();
		};

		this.BindUI = function() {
			var type = $.browser.mozilla ? 'keypress' : 'keydown';
			$(document).bind(type, function(e) {
				var code = e.keyCode ? e.keyCode : e.which;
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
				z.scrollRight();
			})
			$(window).bind("resize", function(e) {
				var w = z.w;
				var l = parseInt(z.element.css('marginLeft').slice(0,-2));
				z.h = window.innerHeight - 20;
				z.w = window.innerWidth;
				for (i = 0; i < $('.item').length; i++) {
					$($('.item')[i]).attr('style', 'height:' + z.h + 'px;width:' + z.w + 'px;overflow:hidden;float:left;position:relative;')
					z.element.css('marginLeft',z.w * l / w);
				}
			});

		};

		this.scrollLeft = function() {
			
			$("#next_b").show();
			if(z.point==z.l_offset+1){
				$("#prev_b").hide();
			}	

			if(z.point==z.l_offset){
				$("#prev_b").hide();
				return;
			}			


			if(!z.element.is(":animated")){
				z.element.animate({marginLeft:parseInt(z.element.css('marginLeft').slice(0,-2))+z.w},function(e){
					z.point--;

				 	if(z.point-z.l_offset==2 || z.point==z.l_offset){

				 		// z.element.trigger('reviewlibdata',["left",a.element.children().first().attr('data-offset')]);

				 		z.LoadItems(z.element.children().first().attr('data-offset'),"left",z.BuildUI);

				 	}
				});
				

			}


		};


		this.scrollRight = function() {
			
			$("#prev_b").show();

			if(z.point==z.r_offset-1){
				$("#next_b").hide();
			}

			if(z.point==z.r_offset){
				return;
			}

			if (!z.element.is(':animated')){
				z.element.animate({marginLeft:parseInt(z.element.css('marginLeft').slice(0,-2))-z.w},function(e){
					z.point++;

					if(z.r_offset-z.point==3 || z.point==z.r_offset-1){
					
						// z.element.trigger('reviewlibdata',["right",a.element.children().last().attr('data-offset')]);
						z.LoadItems(z.element.children().last().attr('data-offset'),"right",z.BuildUI);
						// z.BuildUI(data,'right');
					}
				});
				
			}
		};

		this.LoadItems = function(offset,direction,callback){};

		// z.init(z.initdata);

	}

