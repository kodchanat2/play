	function(){
		var test = true;
		var submit = true;
		var splitText = "&$#,";
		var indexUrl = document.URL.indexOf("id=");
		/*if(indexUrl == -1) indexUrl = document.URL.indexOf("q=")-2;
		else */indexUrl -= 3;
		var urlId = document.URL.substr(indexUrl);
		var subject = document.getElementById("content").getElementsByTagName("h2")[0].innerText.substr(0,10);
		subject = removeSpace(subject);
		if(test) console.log(subject);
		var form = document.forms['responseform'];
		var div_bucket = form.getElementsByTagName('div')[0];

		for(var i = 0; i < div_bucket.children.length; i++){
			var item = div_bucket.children[i]; /*each question*/
			var head = item.getElementsByClassName('qtext')[0]; /*header of question*/
			var number = item.getElementsByClassName('no')[0]; /*question number*/
			var choices = item.getElementsByTagName('label');
			
			if(head && number){ 
				number = number.innerText; /*to string*/
				number = number.substr(number.indexOf(" ")); /*get only digit*/
				number = Number(number); /*to number*/
				var caption = head.getElementsByTagName('b')[0];
				if(caption){
					caption = caption.getElementsByTagName('span')[0];
					caption = caption.innerText; /*describe of question*/
				}

				var old, textChoice = undefined;
				if(caption) old = getCookie(caption);
				else old = getCookie(number);

				if(old.indexOf(splitText) == 0){ /*found correct one*/
					old = old.substr(splitText.length); /*old is correct choice*/
					for(var j = 0; j < choices.length && textChoice != old; j++){
						textChoice = choices[j].lastChild.data.trim();
					}
				}
				else{
					old = old.split(splitText); /*old is array of not correct choices*/
					for(var j = 0, k = 0; j < choices.length && k != old.length; j++){
						textChoice = choices[j].lastChild.data.trim();
						for(k = 0; k < old.length && old[k] != textChoice; k++);
					}
				}
				if(test) console.log("select "+j+textChoice);
				choices[j-1].control.checked = true;

				if(test) console.log("No",number,caption," item:",item);

			}
		}
		/*submit*/
		if(submit) div_bucket.getElementsByClassName("submitbtns")[0].lastElementChild.click();
		if(test) console.log("DONE");

		function getCookie(cname) {
			cname = removeSpace(cname);
		    var name = subject + cname + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0; i<ca.length; i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' ') c = c.substring(1);
		        if (c.indexOf(name) == 0) {
		            return c.substring(name.length, c.length);
		        }
		    }
		    return "";
		}
		function removeSpace(str){
			if(typeof(str) != "string");
			str = str.toString();
			return str.replace(/\s/g,'');
		}
	}();