		$(document).ready(function() {

			var inputObj = $('.input');
			var textArray = ['hello', 'nicholas'];
			var countTimer = '';

			//获取input输入框的值
			function getInputValue() {
				var text = inputObj.val();
				return text;
			}; 

			//创建元素
			function creatDiv(text) {
				var top = 40 * Math.floor(Math.random()*9);
				var color = getColor();
				var box = ('<div style="position:absolute;right:0;top:' + top + 'px;box-sizing:border-box;height:30px;margin-bottom:10px;line-height:30px;color:'+ color +';font-size: 20px;font-weight:400;white-space:nowrap">' + text + '</div>'); // 可以用添加一个class不用行内样式  ("<div class=\"className\"</div>) 用转义符

				if(text && $.trim(text) !== ''){
					if(textArray.indexOf(text) === -1){
						textArray.push(text);
					}
					$("#info_box").append(box);
				}else{
					inputObj.val('');
					alert('请输入有效值');
				}

			};

			// 动画过程
			function move(){
				$("#info_box div:not(:animated)").animate({
					right:"+=120%"
				}, 4000 + Math.random()*8000, function() {
					this.remove();		
				})
			};

			// 鼠标悬停
			$("#info_box div").hover(
				function() {
					console.log($(this))
					$(this).stop();
				},
				function() {
					move();
				}
			);
			// 定时触发函数
			function timer() {
				var text = textArray[Math.floor(Math.random()*textArray.length)];
				if(textArray.length === 0){
					return false;
				}
				creatDiv(text);
				move();
			}
			var int = setInterval(timer,1000);
			setTimeout(function(){
				countTimer = 'open';
				int;
			},5000);

			// 获取随机颜色
			function getColor() {
				var red = ('00' + Math.floor(Math.random()*256).toString(16)).slice(-2);
				var green = ('00' + Math.floor(Math.random()*256).toString(16)).slice(-2);
				var blue = ('00' + Math.floor(Math.random()*256).toString(16)).slice(-2);
				var colorNum = '#' + red + green + blue;
				return colorNum;
			};

			// 点击将元素添加到页面
			$('.button .send').click(function() {
				var text = getInputValue();
				inputObj.val('');
				if(countTimer == 'close'){ // 重新设置并开启定时器
					int = setInterval(timer,1000);
					setTimeout(function(){
						countTimer = 'open';
						int;
					},5000);
				}
				creatDiv(text);
				move();
			});

			//   实现 enter发送弹幕
			inputObj.keyup(function(event) {
				if(event.which === 13){
					$('.button .send').click();
				}
			})

			// 清除内容
			$('.button .clear').click(function() {
				clearInterval(int); // 清除定时器
			  countTimer = 'close';
				textArray = [];     // 清空数组
				$('.info_box').empty();    // 清空内容
			})
			// 另一种思路：
		})