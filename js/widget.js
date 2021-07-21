// JavaScript Document


var hxsd_widget={
	//选项卡
"myTab":function (id,auto){
	//点击li 切换ac
	var tab=document.getElementById(id);
	var tabList=tab.getElementsByTagName('ul')[0];
	var aLi=tabList.getElementsByTagName('li');
	var aTabItem=tab.getElementsByClassName('tabItem');
	
	var n=0;//自动运行用的计数器
	
	var timer;  //定时器对象
	
	function changeTab(){//切换标签
		for(var j=0; j<aLi.length; j++){
			aLi[j].className='';
			aTabItem[j].style.display='none';
		};
		//指定n显示
		aLi[n].className='ac';
		aTabItem[n].style.display='block';
	};
	
	
	
	//点击切换---------------------------------------
	for(var i=0; i<aLi.length; i++){
		aLi[i].index=i;//发牌照
		
		aLi[i].onclick=function(){
			
			n=this.index;//调整计数器
			//所有的li去掉ac
			
			changeTab();
			
			/*for(var j=0; j<aLi.length; j++){
				aLi[j].className='';
				aTabItem[j].style.display='none';
			};
			//this加上ac
			
			this.className='ac';
			aTabItem[this.index].style.display='block';*/
		};
	};
	
	if(auto){
		//自动切换---------------------------------
		function autoRun(){
			timer=setInterval(function(){
				//计数器自动累加
				n++;
				//当n>aLi.length n=0
				if(n==aLi.length){
					n=0;
				};
				changeTab();
			},1000);
		};
		
		autoRun();
		
		//鼠标进入tab，暂定自动运行-------------------------
		tab.onmouseover=function(){
			clearInterval(timer);
		};
		
		//鼠标离开tab，重新开始自动运行-------------------------
		tab.onmouseout=function(){
			//重新启动定时器
			autoRun();
		}
	};
},


//幻灯片
"slide":function (id,showNum){
	var oDiv=document.getElementById(id);
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.children;
	
	var pBtn=oDiv.children[0];
	var nBtn=oDiv.children[1];
	
	var iNow=0;
	
	//图片宽度
	var li_w=hxsd_tools.getStyle(aLi[0],"width");
	
	//设置ul宽度
	oUl.style.width=li_w*aLi.length+'px';
	
	//页面内插入按钮-------------------------------------
	var ol=document.createElement('ol');
	for(var i=0; i<aLi.length; i++){
		ol.innerHTML+='<li>'+ (showNum ? i+1 :"")+'</li>';
	};
	oDiv.appendChild(ol);
	
	var aBtn=ol.children;
	aBtn[0].className="ac";
	
	//切换按钮--------------------------------------------
	function change(n){
		//改变按钮
		for(var k=0; k<aBtn.length; k++){
			aBtn[k].className='';
		};
		aBtn[n].className="ac";
		
		//移动ul
		hxsd_tools.move(oUl,{"left":-li_w*iNow});
	};
	
	
	for(var i=0; i<aBtn.length; i++){
		aBtn[i].index=i;
		aBtn[i].onclick=function(){
			iNow=this.index;
			change(iNow);
		};
	};
	
	//左右切换-----------------------------------------	
	pBtn.onclick=function(){
		iNow--;
		if(iNow<0){
			iNow=0;
		};
		change(iNow);
	};
	
	nBtn.onclick=function(){
		iNow++;
		if(iNow>=aLi.length-1){
			iNow=aLi.length-1
		};
		change(iNow);
	};
	
	//自动运行-----------------------------------------
	function autorun(){
		oDiv.timer=setInterval(function(){
			iNow++;
			if(iNow==aLi.length){
				iNow=0
			};
			change(iNow);
		},2000);
	};
	
	autorun();
	
	oDiv.onmouseover=function(){
		clearInterval(oDiv.timer);
	};
	
	oDiv.onmouseout=function(){
		autorun();
	};
},
//弹出导航
'popup':function(){
	var oMenu=document.getElementById('taobaoMenu');
	var aLi=oMenu.getElementsByTagName('li');
	var oMenuCont=document.getElementById('menuCont');
	var apop=oMenuCont.getElementsByClassName('popupp');
	var leave_menu=null;//离开右侧 回到左侧
	//删除所有li上的ac
	function del_li_ac(){
		for(var i=0; i<aLi.length; i++){
			aLi[i].className="";
		};
	};
	for(var i=0; i<aLi.length; i++){
		aLi[i].index=i;//发牌照
		aLi[i].onmouseover=function(){
			clearTimeout(leave_menu);
			oMenuCont.style.display="block";
			del_li_ac();//删除所有li上的ac  
			this.className="ac";//自己增加ac
			//显示相对应的内容(就是选项卡的原理)
			for(var i=0; i<apop.length; i++){
				apop[i].style.display="none";
			};
			apop[this.index].style.display="block";
		};
		aLi[i].onmouseout=function(){
			clearTimeout(leave_menu);
			leave_menu=setTimeout(function(){
				oMenuCont.style.display="none";
				del_li_ac();//删除所有li上的ac  
			},100)
		};
	};
	oMenuCont.onmouseenter=function(ev){
		clearTimeout(leave_menu);
		this.style.display="block";
	};
	oMenuCont.onmouseleave=function(){
			del_li_ac();//删除所有li上的ac  
			this.style.display="none";
	};
},
 'tab':function (){
  	    var oUL=document.getElementById('tab'); //找到tab导航ul
		var ali=oUL.getElementsByTagName('li'); //找打tab切换的li按钮
		var atab_cont=document.getElementsByClassName('tab_cont');//找到要切换的内容div;
		//alert(atab_cont.length);
		//点击每个li
		for(var i=0;i<ali.length;i++){
			ali[i].onmouseenter=function(){
				for(var j=0;j<ali.length;j++){
					ali[j].className='';
					atab_cont[j].style.display='none';	
					ali[j].index=j;
				};
				this.className='ac';
				atab_cont[this.index].style.display='block';		
			};
		};
  },
  	//放大镜的效果
  	'zoom':function(){
		var oDiv1=document.getElementById('div1');
		var oDiv2=document.getElementById('div2');
		var bigImg=oDiv2.getElementsByTagName('img');
		
		//var aInput=document.getElementsByTagName('input');
		var oSpan=oDiv1.getElementsByTagName('span')[0];
		oDiv1.onmousemove=function(ev){
			oSpan.style.display=oDiv2.style.display='block';
			var oEv=ev||event;
			//获取滚动条  chrome不识别 documentElement.scrollTop
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			
			//鼠标在span的中心位置
			var l=oEv.clientX-oDiv1.offsetLeft-oSpan.offsetWidth/2; 
			var t=oEv.clientY+scrollTop-oDiv1.offsetTop-oSpan.offsetHeight/2;
			
			//限制范围 
			if(l<0)l=0;
			if(l>=oDiv1.offsetWidth-oSpan.offsetWidth){
				l=oDiv1.offsetWidth-oSpan.offsetWidth;
			}
	
			if(t<0)t=0;
			if(t>=oDiv1.offsetHeight-oSpan.offsetHeight){
				t=oDiv1.offsetHeight-oSpan.offsetHeight;
			}
			oSpan.style.left=l+'px';
			oSpan.style.top=t+'px';	
			
			var l_rate=l / (oDiv1.offsetWidth-oSpan.offsetWidth);
			var t_rate=t / (oDiv1.offsetHeight-oSpan.offsetHeight);
			
			for(var k=0;k<bigImg.length;k++){
				bigImg[k].style.left=(oDiv2.offsetWidth-bigImg[k].offsetWidth)*l_rate +'px'; //外box 减 内部大图片，为负值
				bigImg[k].style.top=(oDiv2.offsetHeight-bigImg[k].offsetHeight)*t_rate +'px';		
			};
			
		};
		
		oDiv1.onmouseout=function(){
			oSpan.style.display=oDiv2.style.display='none';	
		};
  	},
	//内页的图片切换
       'det_tab': function (){
	    	var oul=document.getElementById('spec_tab');
    		var spec=document.getElementsByClassName('spec')[0];
    		var aimg=spec.getElementsByTagName('img');
    		var ali=oul.getElementsByTagName('li');
    		var oDiv2=document.getElementById('div2');
    		var bigImg=oDiv2.getElementsByTagName('img');
    		for(var i=0;i<ali.length;i++){
    			ali[i].onmouseenter=function(){
    				for(var j=0;j<ali.length;j++){
    					ali[j].className='';
    					aimg[j].style.display='none';
    					ali[j].index=j;	
    					bigImg[j].style.display='none';
    				};
    				this.className='select';
    				aimg[this.index].style.display='block';
    				bigImg[this.index].style.display='block';
	
    			};	
    		};	
	    },
         //颜色切换
        'colors':function(){
    		var color=document.getElementById('color'); //盒子div
    		var items=color.getElementsByClassName('item'); //点击的按钮
    		
    		for(var i=0;i<items.length;i++){
    			items[i].onclick=function(){
    				for( var j=0;j<items.length;j++){
    					items[j].className='item'; //所有按钮的类名为空	
    				};
    				this.className='item selected';	
    			};	
    		};
        },  
        'appre':function (){
        	var colors=document.getElementById('colors');
	    		var items=colors.getElementsByClassName('item');
		    	for(var i=0;i<items.length;i++){
	    			items[i].onclick=function(){
	    				for( var j=0;j<items.length;j++){
	    					items[j].className='item'; //所有按钮的类名为空	
	    				};
	    				this.className='item selected';	
	    			};	
	    		};
        },
        'white':function (){
        	var white=document.getElementById('white');
	    		var items=white.getElementsByClassName('item');
		    	for(var i=0;i<items.length;i++){
	    			items[i].onclick=function(){
	    				for( var j=0;j<items.length;j++){
	    					items[j].className='item'; //所有按钮的类名为空	
	    				};
	    				this.className='item selected';	
	    			};	
	    		};
        },
        'tab_list':function(){
			var tab_list=document.getElementsByClassName('tab_list')[0];
	    	var tab_btn=tab_list.getElementsByClassName('tab_btn')[0];
	    	var abtn=tab_btn.getElementsByTagName('a');
	    	var conent=tab_list.getElementsByClassName('conent');	    	
	    	
	    	for(var i=0;i<abtn.length;i++){
	    		abtn[i].index=i;
    			abtn[i].onclick=function(){
    				for( var j=0;j<abtn.length;j++){
    					abtn[j].className=''; //所有按钮的类名为空	
    					conent[j].style.display='none';
    				};
    				this.className='choos';	
    				conent[this.index].style.display='block';  
    			};	 
    		};	
	    },
	    //数量加减
	    'numbers':function(){
	    	var wrap_input=document.getElementsByClassName('wrap-input')[0];
    		var oinput=wrap_input.getElementsByTagName('input')[0];
    		var btn_add=wrap_input.getElementsByClassName('btn-add')[0]; //加号按钮
    		var btn_reduce=wrap_input.getElementsByClassName('btn-reduce')[0]; //减号按钮
    		var i=1; //计数器
			//点击加号，inputs的value值等于i++
			btn_add.onclick=function(){
				oinput.value=i+1;
				i++;
			};	
			//点击减号，inputs的value值等于i--
			btn_reduce.onclick=function(){
				i--;
				oinput.value=i;
			 	if(oinput.value<=1){ //判断如果value值小于等于1的时候就让value值等于1，不在向下减
					oinput.value=1; 
					i=1;
				};	
			};		
	    },
	    
	    //首页楼层2选项卡切换
	   'tab_2':function (){
	    	var floor_beuty=document.getElementsByClassName('floor_beuty')[0];
			var tab2=document.getElementById('tab2'); //找到切换导航
			var alis=tab2.getElementsByTagName('li');//要切换的按钮
			var tab_cont2=floor_beuty.getElementsByClassName('tab_cont2');
			//alert(tab_cont2.length);
			for(var i=0;i<alis.length;i++){
	    		alis[i].index=i;
    			alis[i].onmouseenter=function(){
    				for( var j=0;j<alis.length;j++){
    					alis[j].className=''; //所有按钮的类名为空	
    					tab_cont2[j].style.display='none';
    				};
    				this.className='ac';	
    				tab_cont2[this.index].style.display='block';  
    			};	 
			};	
	   },
	   
	   'floor':function(){
	   		
	   		var LocationFloorList=document.getElementsByClassName('LocationFloorList')[0];
			var aLi=LocationFloorList.getElementsByTagName('li');
			var aFloor=document.getElementsByClassName('floor');
			var arr=[];
				
			//-------------------------------------------------
				
			for(var i=0; i<aFloor.length; i++){
				var json={};
				json.name=i;
				json.offsetTop=aFloor[i].offsetTop;
				arr.push(json);
			};
			
			//console.log(arr);
			
			window.onscroll=function(){
				//显示楼层编号-------------------------------------------------
				var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
				if(scrolltop>1500){
					LocationFloorList.style.display='block';
				}else{
					LocationFloorList.style.display='none';
				};
				if(scrolltop>9100){
					LocationFloorList.style.display='none';	
				};
				
				// 根据楼层滚动位置，定位编号------------------------------------------------
				var last_arr=[];
				
				for(var j=0; j<arr.length; j++){
					if(arr[j].offsetTop<scrolltop+270){
						last_arr.push(arr[j].name);
					}
				};
				
				console.log(last_arr)
				
				var li_index=last_arr[last_arr.length-1];
		
				for(var l=0; l<aFloor.length; l++){
					aLi[l].className='';
				};
				aLi[li_index].className='ac';
			};
			
			//点击编号，跳转到相对楼层-----------------------------------------------
			for(var i=0; i<aFloor.length; i++){
				aLi[i].index=i;
				aLi[i].onclick=function(){
					var start=document.documentElement.scrollTop || document.body.scrollTop;
					var end=arr[this.index].offsetTop;
					move(start,end)
				}
			};
			//move-------------------------------------------------------
			var timer;
			function move(start,end){
				var dis=end-start;
				var count=parseInt(1500/30);
				var n=0;
				clearInterval(timer);
				timer=setInterval(function(){
					n++;
					var a=1-n/count;
					var step_dis=start+dis*(1-a*a*a*a);
					window.scrollTo(0,step_dis);
					if(n==count){
						clearInterval(timer);
					};
				},30)
			};
	  },













};









