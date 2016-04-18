(function(){
	function SelectFiltering(){}
	SelectFiltering.prototype = {
		init: function(option){
			var objDefault = {
				id: '',
				data: []
				};
			var _option = option,
				that = this;
			
			this.id = _option.id || objDefault.id;
			this.data = _option.data || objDefault.data;
			this.optionListId = this.id + new Date().getTime();
			
			
			this.domInput = document.getElementById(this.id);
			this.addEventListener(this.domInput, 'keyup', function(event){
				that.filteringOptions(event);
			});
			
			
			var domArrowParent = this.domInput.parentNode.nextSibling;
			while(domArrowParent.nodeName != "DIV"){
				domArrowParent = domArrowParent.nextSibling;
			}
			var domArrow = domArrowParent.firstChild;
			this.addEventListener(domArrow, 'click', function(event){
				that.listFullOptions();
			});
			this.addEventListener(document, 'click', function(event){
				var target = event.target || event.srcElement;
				if( target !== domArrow)
					if(that.domOptionsList)
						that.domOptionsList.style.display = "none";
			});
			
		},
		filteringOptions: function(event){
			var target = event.target || event.srcElement;
			var keyCode = event.keyCode || event.which;
			if( keyCode != 13 && keyCode != 38 && keyCode != 40 ){
				var objReg = new RegExp(target.value, "i");
				var filteredOptions = this.data.filter(function(value){
					return objReg.test(value);
				});
				var filteredOptList = "";
				filteredOptions.forEach(function(value){
					var temp = value.replace(objReg, "<span class=filtering>$&</span>");
					filteredOptList += "<li data-value=\""+value+"\">"+ temp + "</li>";
				});
				this.buildOptionsList(filteredOptList);
			}else{
				if( keyCode == 13 ){
					//Enter, fill value to input field
					var objLI = this.domOptionsList.getElementsByTagName("li");
					for(var i=0; i < objLI.length; i++){
						if(objLI[i].className == "selected"){
							this.domInput.value = objLI[i].dataset.value;
							this.domOptionsList.style.display = "none";
							break;
						}
					}
				}else{
					//Move Up/Down options
					this.moveUpDownOption(keyCode);
				}
			}
		},
		moveUpDownOption: function(keyCode){
			var objLI = this.domOptionsList.getElementsByTagName("li"),
				index = -1;
			for(var i=0; i < objLI.length; i++){
				if(objLI[i].className == "selected"){
					index = i;
					objLI[i].className = "";
					break;
				}
			}
			console.log(index);
			if( keyCode == 38 ){
				// up
				if(index == -1 || index == 0){
					index = objLI.length - 1;
				}else{
					index -= 1;
				}
				console.log(index);
				objLI[index].className = "selected";
			}else if(keyCode == 40){
				//down
				if(index == -1 || index == (objLI.length - 1)){
					index = 0;
				}else{
					index += 1;
				}
				console.log(index);
				objLI[index].className = "selected";
			}
		},
		listFullOptions: function(){  
			var option = "";
			this.data.forEach(function(value){
				option += "<li data-value=\""+value+"\">" + value + "</li>";
			});
			this.buildOptionsList(option);
		},
		buildOptionsList: function(option){
			var that = this;
			var optionsList = "";
			if(option != ""){
				optionsList = "<ul>"+ option + "</ul>";
				
				if(!this.domOptionsList){
					var optionsListEle = document.createElement("div");
					optionsListEle.id = this.optionListId;
					optionsListEle.className = "optionList";
					this.domInput.parentNode.appendChild(optionsListEle);
					this.domOptionsList = document.getElementById(this.optionListId);
				}
				this.domOptionsList.innerHTML = optionsList;
				this.domOptionsList.style.display = "block";
				
				
				
				var objUL = this.domOptionsList.getElementsByTagName("ul")[0];
				this.addEventListener(objUL, 'click', function(event){
					var target = event.target || event.srcElement;
					if(target.nodeName == "LI"){
						console.log(target);
						that.domInput.value = target.dataset.value;
						that.domOptionsList.style.display = "none";
					}
				});
			}
		},
		addEventListener: function(ele, type, fn){
			if(ele.addEventListener){
				ele.addEventListener(type, fn, false);
			}else if(ele.attachEvent){
				ele.attachEvent('on'+type, fn);
			}else{
				ele['on'+type] = fn;
			}
		}
	};
	
	window.selectFiltering = function(){
		var options = Array.prototype.slice.call(arguments);
		for(var i=0; i<options.length; i++){
			var selection = new SelectFiltering();
			selection.init(options[i]);
		}
	};
})();