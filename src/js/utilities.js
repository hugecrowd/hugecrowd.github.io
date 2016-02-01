EventUtl = {
	addEventListener: function(elem, type, handler){
		if(elem.addEventListener){
			elem.addEventListener(type, handler, true);
		}else if(elem.attachEvent){
			elem.attachEvent('on'+type, handler);
		}else{
			elem['on'+type] = handler;
		}
	},
	removeEventListener: function(elem, type, handler){
		if(elem.removeEventListener){
			elem.removeEventListener(type, handler, true);
		}else if(elem.detachEvent){
			elem.detachEvent('on'+type, handler);
		}else{
			elem['on'+type] = null;
		}
	},
	getEvent: function(event){
		return event ? event : window.event;
	},
	getTarget: function(event){
		if(event.target){
			return event.target;
		}else{
			return event.srcElement;
		}
	},
	preventDefault: function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.cancelable = true;
		}
	},
	stopPropagation: function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}
}