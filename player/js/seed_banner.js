window.onload=function(){
	slider();
}	
	function slider(){
		/*
		* 需求分析
		* 1、自动轮播 (定时器 过渡)
   		* 2、小圆点随着图片滚动(监听图片显示的索引，然后设置当前样式now)
	    * 3、图片能滑动(touch)
	    * 4、滑动不超过一定距离 吸附回去 (过渡)
	    * 5、滑动超过一定距离 滚动到下一张(过渡)
		*/
		
		var box = document.querySelector('.Bigbanner');
		var imgUl = document.querySelector('.slider');
		var dotUl = document.querySelector('.solid_box');
		var imgLis = imgUl.children;
		var dotLis = dotUl.children;
		var width = imgLis[1].offsetWidth;
		console.log(width+',--imglis.length是：'+imgLis.length+'dotlis.length'+dotLis.length);
		var num = 1;
		//1、自动轮播（有定时器与过渡效果）
		clearInterval(box.timer);
		box.timer = setInterval(function(){
			num++;
			zidan.addTransition(imgUl);
			zidan.setTransform(imgUl,-num*width);
		},3000);
		/*图片环环相扣轮播*/
		zidan.addTransitionEnd(imgUl,function(){
			if(num>imgLis.length-2){
				num = 1;
				zidan.removeTransition(imgUl);
				zidan.setTransform(imgUl,-num*width);
			}else if(num==0){
				num = imgLis.length-2;
				zidan.removeTransition(imgUl);
				zidan.setTransform(imgUl,-num*width);
			}
			light(num);
		});
		/*小圆点索引跟着跳转*/
		light(num);
		function light(x){
			for(var i=0;i<dotLis.length;i++){
				dotLis[i].className = "";
			}
			dotLis[x-1].className = "now";
		}
		
		/*
		 * 4、滑动不超过一定距离 吸附回去 (过渡)
		 * 5、滑动超过一定距离 滚动到下一张(过渡)
		 */
		var startX = 0;
		var moveX = 0;
		var endX = 0;
		var isMove = 0;
		var distance = 0;
		imgUl.addEventListener("touchstart",function(){
			clearInterval(box.timer);
			startX = event.touches[0].clientX;
		});
		imgUl.addEventListener("touchmove",function(){
			moveX = event.touches[0].clientX;
			isMove = true;
			distance = moveX - startX;
			zidan.removeTransition(imgUl);
			zidan.setTransform(imgUl,-num*width+distance);
		});
		imgUl.addEventListener("touchend",function(){
			endX = moveX;
			if(isMove){
				if(Math.abs(distance)>width/3){
					if(distance>0){
						num--;
					}else{
						num++;
					}
					zidan.addTransition(imgUl);
					zidan.setTransform(imgUl,-num*width);
				}else{
					zidan.addTransition(imgUl);
					zidan.setTransform(imgUl,-num*width);
				}
			}
			
			clearInterval(box.timer);
			box.timer = setInterval(function(){
				num++;
				zidan.addTransition(imgUl);
				zidan.setTransform(imgUl,-num*width);
			},3000);
			startX = 0;
			moveX = 0;
			endX = 0;
			isMove = false;
			distance = 0;
		});		
	}
	

