var Code=["57fqferss5jcew33"];
        var runned = 0;
        var LOOP;
        var idWork = 0;
        var count = {ss:0,wa:0}

        function ping(){
            // console.log(Code)
            text = Code[0] || '57fqferss5jcew33';
            var map = '23456789abcdefghijkmnpqrstuvwxyz'.split('');
            var nMap = map.length;

            var head = text.substring(0,2)
            var body = text.substring(2,text.length-1)
            
            
            // console.log(fullCode(shift(genArray(body))))
            // Code = [fullCode(shift(genArray(body)))]
            var temp = genArray(body);
            var loop = Number($("#loop").val()||'0');
            var mode = ($("#mode").val() === "Random Mode");
            Code = [];
            for(i=0;i<loop;i++){
                if(mode)
                    temp = random(temp);
                else
                    temp = shift(temp);
                Code.push(fullCode(temp))
                runned++;
                $("#codeUsed").html(runned)
            }
            // console.log(Code);
            var vote=voteMember(Code,memberId);
            console.log(runned)
            vote.data.map((item)=>{
                if(item.status=='invalid')
                    used(item.code)
                else
                    response(item)
            })
            Code = [Code[Code.length-1]]
            return start();

            function genArray(text){
                var arr = []
                for (var i = 0; i <text.length; i++) {
                    var c = text.charAt(i);
                    var codePoint = map.indexOf(c);
                    arr.push(codePoint);        
                }
                return arr;
            }

            function shift(input){
                for(var i = input.length-1; i>=0; i--){
                    input[i]++;
                    if(input[i] >= map.length)
                        input[i] = 0;
                    else
                        break;
                }
                return input;
            }

            function random(input){
                for(var i = input.length-1; i>=0; i--){
                    input[i] = Math.floor(Math.random()*nMap);
                }
                return input;
            }

            function fullCode(input){
                var code = genCode(input);
                code += g(code,map);
                // console.log(code)
                return code;
                
                function genCode(arr){
                    var code = head;
                    for (var i = 0; i < arr.length; i++) {
                        var c = arr[i];
                        code += map[c];      
                    }
                    return code;
                }
            }
        }

        function show() {
            $(".modal-senbutsu div div:first span:first").html("กำลังสุ่ม code ให้")
            $(".modal-senbutsu div.col-lg-6.mx-auto").html('สำเร็จ <strong id="codeSuccess" class="pl-3 pr-3" style="font-size:3rem;color:#7bff7b;">0</strong> โหวต<br/>ใช้แล้ว <strong id="codeWarning" class="pl-3 pr-3" style="font-size:3rem;">0</strong> โหวต<br/>สุ่มไปแล้ว <strong id="codeUsed" class="pl-3 pr-3" style="font-size:3rem;">0</strong> code ')
            $("#reportAdmin").html("<textarea id='used' rows='5' style='text-align:center;' readonly></textarea>")
            $(".modal-senbutsu div div.row:nth-last-child(2)").html("<div class='form-group row mx-auto'><select class='col-5' id='mode'><option>Random Mode</option><option>Increasing Mode</option></select><label class='col-3 col-form-label'>สุ่มรอบละ</label> <div class='col-4'><input type='number' id='loop' class='form-control text-center' autocomplete='off' maxlength='4' value='1'></div></div>")
            $(".modal-senbutsu div div.row.mt-3:last-child").html('<div class="col-6 mx-auto"><button class="btn btn-vt-submit btn-block" onclick="start()">START</button></div><div class="col-6 mx-auto"><button class="btn btn-vt-submit btn-block" onclick="stop()">STOP</button></div>')
            $(".modal-senbutsu div div.row div.col-12.mx-auto span").html("การสุ่มล่าสุด");
            $('#msgModal').modal('show');
        }
        
        start = () =>{ LOOP = setTimeout(ping, 500); }
        stop = () => clearTimeout(LOOP);

        used = (code)=> {
            $("#used").html(code+'\n'+$("#used").html());
        }
        response = (data) => {
            idWork++;
            $("#codeSuccess").html(count.ss)
            $("#codeWarning").html(count.wa)
            $("#resCode").append("<div class='form-group row'><label class='col-2 col-form-label'>" + idWork + "</label> <div class='col-9'><input type='text' name='code_" + idWork + "' class='form-control serial text-center res " + data.status + "' autocomplete='off' maxlength='16' value=" + data.code + "><span class='res " + data.status + "'>" + data.result + "</span></div></div>");
        }
        
        show();
