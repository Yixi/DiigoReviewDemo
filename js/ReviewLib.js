/**
 * Diigo Review lib v 0.2
 *
 * Copyright (c) 2012 Diigo, Inc. (diigo.com)
 * Powered by jQuery (jquery.com)
 *
 */

var ReviewLib = function() {
		//args = [*element,initdata]
		var args = Array.prototype.slice.call(arguments);

		var z = this;
		this.element = $(args[0])

		this.h = window.innerHeight - 20;
		this.w = window.innerWidth;

		this.init = function(url) {
			$.get(url, function(data) {
				t.BuildUI(data.data, "right");
			});
		}

		this.BuildUI = function(data, location) {
			switch (location) {
			case 'right':
				for (i = 0; i < data.length; i++) {
					z.element.append('<div id="item_' + i + '" class="item" style="height:' + z.h + 'px;width:' + z.w + 'px;margin-top:0px;margin-left:' + i * z.w + 'px;overflow:hidden;position:absolute;"></div>');
					$("#item_" + i).append('<div id="i_' + i + '" class="i_item">' + data[i].html + '</div>');
				}
				break;
			case 'left':
				for (i = data.length - 1; i >= 0; i--) {
					z.element.prepend('<div id="item_' + i + '" class="item" style="height:' + z.h + 'px;width:' + z.w + 'px;margin-top:0px;margin-left:' + i * z.w + 'px;overflow:hidden;position:absolute;"></div>');
					$("#item_" + i).append('<div id="i_' + i + '" class="i_item">' + data[i].html + '</div>');
				}
				break;
			};

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
			
		}
		this.scrollRight = function() {

		}

	}



$(function() {


});