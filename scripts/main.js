var _timer;

var instance;

// 
// var tableData = {
//     _update: function(data){
// 		console.log(data)
//         if (data !== undefined) {
// 			$('#middle #content table tr:eq(' + data.row + ') .percentage').html(data.percentage);
// 			$('#middle #content table tr:eq(' + data.row + ') .bar').css('width',data.percentage + '%');
// 	    }
//     }
// };
// 
// var tableUpdate = function(topics, data){ 
// 	tableData._update(data);
// }
// 
// var instance = new Component();
// Component.prototype.setValue=function(value){
// 	this.value=value;
// }
// Component.prototype.getValue=function(value){
// 	return this.value;
// }
// 
// instance.setValue('blah');
// console.log(instance.getValue());


$(function () {
	
	$('#middle #content table tr').live('mouseover',function(){
		$('#middle #content table tr').removeClass('hover');
		$(this).addClass('hover');
	});
	$('#middle #content table tr').live('mousedown',function(){
		$(this).toggleClass('clicked')
	});
	$('.select').live('mousedown',function(e){
		e.stopImmediatePropagation();
	});
		
		
	$('#questions .q-pt1').live('mousedown',function(e){
		var list = Array ( "Item 1","Item 2", "Item 3");
		instance = new Component({id:"XF-254",list:list});
		console.log(instance.id)
		console.log(instance.list[0])
		
	});
			
		
	$('#questions .q-pt2a').live('mousedown',function(e){
		instance.subscribe('propertyChanged',propertyChangedCallbackAlpha);
	});
	$('#questions .q-pt2b').live('mousedown',function(e){
		instance.publish('propertyChanged','Hi there ' + getCurrentTime());
	});
	$('#questions .q-pt3a').live('mousedown',function(e){
		instance.subscribe('propertyChanged',propertyChangedCallbackBeta);
	});
	$('#questions .q-pt4').live('mousedown',function(e){

		Component.prototype.setValue=function(config){
			var values={};
			for (property in config) {
				values.old=this[property];
				values._new=config[property];
				this[property] = config[property];
			};
			
			this.publish('propertyChanged','property changed - ' + values.old + ' - ' + values._new);
			
		}

		instance.setValue({id:'NEW-ID01'});

	});
	
	for (var i=80;i>=5;i-=5){
		renderData(i);
	}
	

});

propertyChangedCallbackAlpha =function(topic,data){
	console.log('propertyChangedCallbackAlpha function ',data);
}
propertyChangedCallbackBeta =function(topic,data){
	console.log('propertyChangedCallbackBeta function ',data);
}

renderData=function (percentage) {
	var s='';
	s+='<tr">'
	s+='<td class="col-1">Variable 01</td>';
	s+='<td><span class="bar" style="width:' + percentage + '%"></span><span class="percentage">' + percentage + '</span></td>';
	s+='<td><input type="checkbox" class="select"/></td>';
	s+='</tr>'
	$('table tbody').append(s);
};

function getCurrentTime(){
    var date = new Date(),
          m = date.getMonth() + 1,
          d = date.getDate(),
          y = date.getFullYear(),
          t = date.toLocaleTimeString().toLowerCase();
 
    return (d + '/' + m + '/' + y + ' ' + t);   
}


pubsub=function (){
	Component.subscribe( 'rowUpdated', tableUpdate );
	// 
	// var events=	Component.events();
	// console.log(events) 	
	// 
	// Component.subscribe( 'rowUpdated', tableUpdate );
	// Component.subscribe( 'columnUpdated', tableUpdate );
}