var usLogin=document.getElementsByClassName("usLogin")[0];
var loginBtn=usLogin.getElementsByTagName("a");
var usCon=document.getElementsByClassName("smCon")[0];
var smCon=document.getElementsByClassName("sCode")[0];
for(let a=0;a<loginBtn.length;a++){
	loginBtn[a].index=a;
	loginBtn[a].onclick=function(){
//		console.log(1)
console.log(a);
		for(var r=0;r<loginBtn.length;r++){
			loginBtn[r].className="";
			
		}
		loginBtn[this.index].className="curLogin";
		if(a==0){
			usCon.style.display="block";
			smCon.style.display="none";
		}
		if(a==1){
			usCon.style.display="none";
			smCon.style.display="block";
		}
	}
}
