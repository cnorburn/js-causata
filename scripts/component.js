var Component = function (config) { 

	for (property in config) {
		this[property] = config[property];
	};
		
	var topics={}; /* subscribers */
	var	events=[]; /* fired events array */
			
	this.subscribe=function(topic,callback){

  		var indx=eventHasFired(topic);
    	if(indx.length>0){
			for(var i = 0; i < indx.length; i++) {
				if(events[indx[i]].topic === topic){
					//fire event again with new callback
					callback(events[indx[i]].topic,events[indx[i]].data)
				}
			}
    	}
 		if ( !topics.hasOwnProperty( topic ) ){
    	    topics[topic] = [];
		}
        topics[topic].push( { func : callback } );
			
	}
		
	this.publish=function(topic,data,republish){
        var subscribers = topics[topic];
        for ( var i = 0, j = subscribers.length; i < j; i++ ){
            subscribers[i].func( topic, data );
	    }
		if (!republish){
			events.push({topic:topic,data:data});
		}
		
	}
	
	var eventHasFired=function(event){
		var indx=[];
		for(var i = 0; i < events.length; i++) {
			if(events[i].topic.search(event) > -1){
			  indx.push(i);
			}
		}
		//return an array of indices
		return indx;
	};
	
};
