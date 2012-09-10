/*script js*/
var a ;

$(function() {

	$.get('TestDesign.html',function(html){

		var testdata = new Array();

		for(i=0;i<10;i++){
			var jsondata = {
				offset:parseInt(100*Math.random()),
				html:html
			}
			testdata.push(jsondata);
		}


		a = new ReviewLib("#items");
		

		a.LoadItems = function(offset,direction,callback){
			$.ajax({
				url:'TestDesign.html',
				success:function(data){
					// console.log(data);

					var t = new Array();
					for(i=0;i<5;i++){
						var jsondata = {
							offset:parseInt(100*Math.random()),
							html:data
						}
						t.push(jsondata);
					}

					callback(t,direction)
					// callback([]);
				}
			});
			

		}

		a.init(testdata);

		// a.LoadItems(0,"right",a.BuildUI(testdata,"right"));
	});





	// $.get('TestDesign.html',function(html){
		
	// 	var testdata = new Array();

	// 	for(i=0;i<10;i++){
	// 		var jsondata = {
	// 			offset:parseInt(100*Math.random()),
	// 			html:html
	// 		}
	// 		testdata.push(jsondata);
	// 	}

	// 	a = new ReviewLib("#items");
	// 	console.log(a);
	// 	a.init(testdata);

	// 	a.element.bind('reviewlibdata',function(e,message,offset){
	// 		/* for test data*/

	// 		console.log(message,offset);
	// 			switch(message){
	// 				case "right":
	// 					var rightdata = new Array();
	// 					$.get('TestDesign.html',function(html){
	// 						for(i=0;i<5;i++){
	// 							var jsondata = {
	// 								offset:parseInt(100*Math.random()),
	// 								html:html
	// 							}
	// 							rightdata.push(jsondata);
	// 						}
	// 						a.BuildUI(rightdata,"right");
	// 					});
	// 					break;
	// 				case "left":
	// 					var leftdata = new Array();
	// 					$.get('TestDesign.html',function(html){
	// 						for(i=0;i<5;i++){
	// 							var jsondata = {
	// 								offset:parseInt(100*Math.random()),
	// 								html:html
	// 							}
	// 							leftdata.push(jsondata);
	// 						}
	// 						a.BuildUI(leftdata,"left");
	// 					});
	// 					break;
	// 			}

	// 	});

	// });




	

});