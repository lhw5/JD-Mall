//版权所有 火星时代

function documentReady(fn){
	if(document.addEventListener)document.addEventListener('DOMContentLoaded', fn, false);
	else{
		document.attachEvent('onreadystatechange', function (){//IE兼容
			if(document.readyState=='complete') fn && fn();
		});
	}
};

var hxsd_tools={

//清除空白节点
clearSpace:function(elm) {
    for(var i=0; i<elm.childNodes.length; i++){   
        var node = elm.childNodes[i];
        if(node.nodeType==3 && !/\S/.test(node.nodeValue)) node.parentNode.removeChild(node);   
    }   
},   

//插入节点
insertAfter:function (newEl, targetEl){
	var parentEl = targetEl.parentNode;//找到父级元素
	if(this.get_lastChild(parentEl) == targetEl) parentEl.appendChild(newEl);
	else parentEl.insertBefore(newEl,this.get_nextSibling(targetEl));
},


//过滤文本和空格
get_firstChild:function(elm){
	var x=elm.firstChild;
	while (x.nodeType!=1) x=x.nextSibling;
	return x;
},

get_lastChild:function(elm){
	var x=elm.lastChild;
	while (x.nodeType!=1) x=x.previousSibling;
	return x;
},

get_previousSibling:function(elm){
	var x=elm.previousSibling;
	while (x.nodeType!=1)x=x.previousSibling;
	return x;
},

get_nextSibling:function(elm){
	var x=elm.nextSibling;
	while (x.nodeType!=1) x=x.nextSibling;
	return x;
},



//计算offsetTop
offsetTop:function (elm){ 
	var top = elm.offsetTop; 
	var parent = elm.offsetParent; 
	while( parent != null ){ 
		top += parent.offsetTop; 
		parent = parent.offsetParent; 
	}; 
	return top; 
}, 

//计算offsetLeft
offsetLeft:function(elm){ 
	var left = elm.offsetLeft; 
	var parent = elm.offsetParent; 
	while( parent != null ){ 
		left += parent.offsetLeft; 
		parent = parent.offsetParent; 
	}; 
	return left; 
},

//判断上下半屏
halfScreen:function(elm){
	var scroll_top=document.documentElement.scrollTop || document.body.scrollTop;
	var top=this.offsetTop(elm);
	var screen_h=document.documentElement.clientHeight;
	return top<scroll_top+screen_h/2 ? true : false;
},

//事件监听
addEvent:function(obj,ev,fn){
	obj.attachEvent? obj.attachEvent('on'+ev,fn):obj.addEventListener(ev,fn,false);
},

//判断是否有父级
isParent:function (oParent,obj){
	while(obj){
		if(obj==oParent)return true;
		obj=obj.parentNode;
	}	
	return false;
},

//--------------------------------
getByClass:function (oParent,className){
	
	if(document.getElementsByClassName) return oParent.getElementsByClassName(className);
	else{
		var arr=[]; //容器
		var aEl=oParent.getElementsByTagName('*');//所有标签
		for(var i=0;i<aEl.length;i++){
			if(new RegExp('\\b'+className+'\\b').test(aEl[i].className)) arr.push(aEl[i]);//向数组中添加
		}
	return arr;
	}
},
//--------------------------------
addClass:function(obj, className){
	if(elm.length){
		for(var i=0; i<obj.length;i++){
			obj[i].className+=' '+className; 
		}
	}else{
		obj.className+=' '+className; 
	}
},
//--------------------------------------------
removeClass:function (obj,className){
	if(obj.length){
		for(var i=0; i<obj.length;i++){
			obj[i].className=obj[i].className.replace(new RegExp('\\b'+className+'\\b'),'');
		};
	}else{
		obj.className=obj.className.replace(new RegExp('\\b'+className+'\\b'),'');
	};
},

//居中显示弹框-----------------------------------------
display_center:function(obj){
	obj.style.display="block";
	var l=(document.documentElement.clientWidth-obj.offsetWidth)/2;
	var t=(document.documentElement.clientHeight-obj.offsetHeight)/2;
	obj.style.left=l+'px';
	obj.style.top=t+'px';
	window.onresize=function(){
		hxsd_tools.display_center();
	}
},


//拖拽----------------------------------
drag:function(obj,title){
	title =title||obj;
	title.onmousedown=function(ev){//按下时机  记录下鼠标的错位位置
		var oEv=ev ||event;
		var disX=oEv.clientX-obj.offsetLeft;//left方向
		var disY=oEv.clientY-obj.offsetTop;// top 方向
	
		//鼠标移动的对象应该是document
		document.onmousemove=function(ev){//移动拖拽
			var oEv=ev ||event;
			var l=oEv.clientX-disX;
			var t=oEv.clientY-disY;
			
			//判断屏幕范围
			if(l<0)l=0;
			if(t<0)t=0;
			if(l>document.documentElement.clientWidth-obj.offsetWidth) l=document.documentElement.clientWidth-obj.offsetWidth;
			if(t>document.documentElement.clientHeight-obj.offsetHeight) t=document.documentElement.clientHeight-obj.offsetHeight;
			obj.style.left=l+'px';
			obj.style.top=t+'px';
		};
		
		//释放鼠标move事件
		document.onmouseup=function(){
			document.onmouseup=document.onmousemove=null;
			if(obj.releaseCapture) obj.releaseCapture();//取消获捕
		}
		if(obj.setCapture) obj.setCapture();//设置捕获
		return false;
	};
},
//滚轮----------------------------------------------
mouseWheel:function(obj,fn){
	if(window.navigator.userAgent.indexOf('Firefox')!=-1) obj.addEventListener('DOMMouseScroll',wheelFn,true);
	else obj.onmousewheel=wheelFn;
	function wheelFn(ev){
		var oEv=ev||event;
		var direct=oEv.wheelDelta ? oEv.wheelDelta<0 : oEv.detail>0;
		fn && fn(direct);//将direct作为参数传递出去
		if(window.event){//IE
			oEv.returnValue = false; //ie 阻止默认事件
			return false;//ie9 以上阻止回车
		}
		else{
			oEv.preventDefault();//阻止默认事件 firefox
		}
	};
},

//读取样式-------------------------------------
getStyle:function (obj, styleName){
	var value=obj.currentStyle ? obj.currentStyle[styleName]:getComputedStyle(obj,false)[styleName];
	return styleName=='opacity' ? value=Math.round(parseFloat(value)*100):value=parseInt(value);
},

//-----------------------------------------------------------------------------
move:function (obj,moveJson,speed,fn){//对象 运动模式 移动时间 回调
	var prd_speed={ //预定义 predefine
		veryslow:	5000,
		slow:		2000,
		normal:		1000,
		fast:		700,
		veryfast:	300
	};
	
	//如果输入预定速度的字符串，就进行转换
	if(speed){
		if(typeof stopTime=='string') speed=prd_speed[speed];
	}else{
		speed=prd_speed.normal;
	}
	
	//-----------------------------------------------------
	var start={};//起点json
	var dis={};//距离json
	
	for(var key in moveJson){
		start[key]=this.getStyle(obj, key);
		dis[key]=moveJson[key]-start[key];//距离 distance
	}
	
	//分段
	var count=parseInt(speed/30);////次数
	var n=0;//步进
	
	//定时器---------------------------------------------
	clearInterval(obj.timer);//使用对象属性，定义计时器变量
	obj.timer=setInterval(function(){
		n++;
		for(var key in moveJson){
			var a=1-n/count;  //a的值会越来越小
			var step_dis=start[key]+dis[key]*(1-a*a*a);
			
			if(key=='opacity'){//透明
				obj.style.filter='alpha(opacity:'+step_dis+')';
				obj.style.opacity=step_dis/100;
			}
			else{//其他
				obj.style[key]=step_dis+'px';
			}
		};
		
		//取消定时器
		if(n==count){
			clearInterval(obj.timer);
			fn && fn();
		};
	
	},30)
}
}