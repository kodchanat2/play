(
	function(){
		var test = true;
		var finish = true;
		var cookie = true;
		var splitText = "&$#,";
		var indexUrl = document.URL.indexOf("id=");
		/*if(indexUrl == -1) indexUrl = document.URL.indexOf("q=")-2;
		else */indexUrl -= 3;
		var urlId = document.URL.substr(indexUrl);
		var subject = document.getElementById("content").getElementsByTagName("h2")[0].innerText.substr(0,10);
		subject = removeSpace(subject);
		if(test) console.log(subject);
		var div_bucket = document.getElementsByClassName('que');

		for(var i = 0; i < div_bucket.length; i++){
			var item = div_bucket[i]; /*each question*/
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
				var textChoice = undefined,check = undefined;
				for(var j = 0; j < choices.length && check == undefined; j++){
					textChoice = choices[j].innerText;
					textChoice = textChoice.substr(textChoice.indexOf(".")+1).trim();
					check = choices[j].getElementsByTagName('img')[0];
					if(check) check = check.alt;
					if(0) console.log(textChoice, check);
				}

				if(test) console.log("No",number,caption," item:",item);
				if(test) console.log("selected "+textChoice+ " : "+check);

				var keyMsg;
				if(caption) keyMsg = caption;
				else keyMsg = number;

				if(cookie && check == "Incorrect") addCookie(keyMsg, textChoice);
				else if(cookie && check == "Correct") setCookie(keyMsg, splitText+textChoice);
			}
		}
		/*finish*/
		if(finish) document.forms[0].submit();
		if(test) console.log("DONE");

		function getCookie(cname) {
			cname = removeSpace(cname);
		    var name = subject + cname + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0; i<ca.length; i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' ') c = c.substring(1);
		        console.log(c);
		        if (c.indexOf(name) == 0) {
		            return c.substring(name.length, c.length);
		        }
		    }
		    return "";
		}
		function setCookie(cname,cvalue) {
			cname = removeSpace(cname);
		    document.cookie = subject + cname+"="+cvalue;
		    console.log("seted"+subject + cname+"="+cvalue+";");
		}
		function addCookie(cname, cvalue){
			var old = getCookie(cname);
			if(old != "") cvalue = old + splitText + cvalue;
			setCookie(cname, cvalue);
		}
		function removeSpace(str){
			if(typeof(str) != "string");
			str = str.toString();
			return str.replace(/\s/g,'');
		}
	}()
)