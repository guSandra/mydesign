 window.onload = function () {
            var container = document.getElementById('container');
            var list = document.getElementById('list');
            var buttons = document.getElementById('buttons').getElementsByTagName('span');
            var prev = document.getElementById('prev');
            var next = document.getElementById('next');
            var index = 1;
            var len = 4;
            var animated = false;
            var interval = 3000;
            var timer;


            function animate (offset) {
                if (offset == 0) {
                    return;
                }
                animated = true;
                var time = 300;
                var inteval = 10;
                var speed = offset/(time/inteval);
                var left = parseInt(list.style.left) + offset;

                var go = function (){
                    if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                        list.style.left = parseInt(list.style.left) + speed + 'px';
                        setTimeout(go, inteval);
                    }
                    else {
                        list.style.left = left + 'px';
                        if(left>-200){
                            list.style.left = -710 * len + 'px';
                        }
                        if(left<(-710 * len)) {
                            list.style.left = '-710px';
                        }
                        animated = false;
                    }
                }
                go();
            }

            function showButton() {
                for (var i = 0; i < buttons.length ; i++) {
                    if( buttons[i].className == 'on'){
                        buttons[i].className = '';
                        break;
                    }
                }
                buttons[index - 1].className = 'on';
            }

            function play() {
                timer = setTimeout(function () {
                    next.onclick();
                    play();
                }, interval);
            }
            function stop() {
                clearTimeout(timer);
            }

            next.onclick = function () {
                if (animated) {
                    return;
                }
                if (index == 4) {
                    index = 1;
                }
                else {
                    index += 1;
                }
                animate(-710);
                showButton();
            }
            prev.onclick = function () {
                if (animated) {
                    return;
                }
                if (index == 1) {
                    index = 4;
                }
                else {
                    index -= 1;
                }
                animate(710);
                showButton();
            }

            for (var i = 0; i < buttons.length; i++) {
                buttons[i].onclick = function () {
                    if (animated) {
                        return;
                    }
                    if(this.className == 'on') {
                        return;
                    }
                    var myIndex = parseInt(this.getAttribute('index'));
                    var offset = -710 * (myIndex - index);

                    animate(offset);
                    index = myIndex;
                    showButton();
                }
            }

            container.onmouseover = stop;
            container.onmouseout = play;

         function checkTime(i)
		{
			if (i<10) 
				{i="0" + i}
			return i;
		}  	
		function showTime()
		{
			var now=new Date();
			var year=now.getFullYear();
			var month=now.getMonth()+1;
			var day=now.getDate();
			var h=now.getHours();
			var m=now.getMinutes();
			var s=now.getSeconds();
			m=checkTime(m);
			s=checkTime(s);

			var weekday=new Array(7)
			weekday[0]="星期日"
			weekday[1]="星期一"
			weekday[2]="星期二"
			weekday[3]="星期三"
			weekday[4]="星期四"
			weekday[5]="星期五"
			weekday[6]="星期六"
			document.getElementById("show").innerHTML=""+year+"年"+month+"月"+day+"日 "+weekday[now.getDay()]+h+":"+m+":"+s;
			//t=setTimeout('showTime()',500)
			setTimeout(showTime,500);
		}
		
		 play();
		showTime();

}