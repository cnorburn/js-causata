var Component = {};
 
var Component=function(){
 
    "use strict";

    var topics = {};
	var	events=[];
    var lastUid = -1;
 
   this.publish = function( topic,data,republish){
        if ( !topics.hasOwnProperty( topic ) ){
            return false;
        }
	     var notify = function(){
	        var subscribers = topics[topic];
	        for ( var i = 0, j = subscribers.length; i < j; i++ ){
                subscribers[i].func( topic, data );
		    }
 	  	};
		if (!republish){
			events.push({topic:topic});
		}
        setTimeout( notify , 0 );
        return true;
	 };
 
    this.subscribe = function( topic, func ){

  		var indx=this.eventHasFired(topic);
    	if(indx.length>0){
			for(var i = 0; i < indx.length; i++) {
				var _indx=indx[i];
				if(events[_indx].topic === topic ){
					this.publish(events[_indx].topic,events[_indx].data,true);
				}
			}
    	}

		if ( !topics.hasOwnProperty( topic ) ){
    	    topics[topic] = [];
        }else{
			//event already registered
        }
        var token = (++lastUid).toString();
        topics[topic].push( { token : token, func : func } );

        return token;
    };
 
  
    this.unsubscribe = function( token ){
        for ( var m in topics ){
            if ( topics.hasOwnProperty( m ) ){
                for ( var i = 0, j = topics[m].length; i < j; i++ ){
                    if ( topics[m][i].token === token ){
                        topics[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }
        return false;
    };
	
	
	this.eventHasFired=function(event){
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