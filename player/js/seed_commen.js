var zidan={};

/*过渡效果*/
zidan.addTransition = function(obj){
	obj.style.transition = "all 0.3s";
	obj.style.webkitTransition = "all 0.3s";
}
/*取消过渡效果*/
zidan.removeTransition=function(obj){
	obj.style.transition = "";
	obj.style.webkitTransition = "";
}
/*平移相册的效果    direction:趋势、方向*/
zidan.setTransform=function(obj,distance,direction){
	if(direction){
		obj.style.transform = "translate"+direction+"("+distance+"px)";
		obj.style.webkitTransform = "translate"+direction+"("+distance+"px)";
	}else{
		obj.style.transform = "translateX("+distance+"px)";
		obj.style.webkitTransform = "translateX("+distance+"px)";
	}
}
/*过渡结束后的事件*/
zidan.addTransitionEnd=function(obj,fn){
	obj.addEventListener("transitionEnd",fn);
	obj.addEventListener("webkitTransitionEnd",fn);
}

/*手指滑触轮播效果*/
zidan.tap = function(obj,fn){
	var start = 0;
	var distance = 0;
	var end = 0;
	var isMove = false;
	obj.addEventListener("touchstart",function(){
		start = (new Date()).getTime();
	});
	obj.addEventListener("touchmove",function(){
		isMove = true;
	});
	obj.addEventListener("touchend",function(){
		end = (new Date()).getTime();
		distance = end - start;
		if(distance<150&&!isMove){
			fn();
			console.log("拨完一次");
		}
		start = 0;
		move = 0;
		end = 0;
		isMove = false;
	});
}
