(function(){
	function Dialog()
	{
		this.oLogin=null;
		this.disX='';
		this.disY='';
	    this.url='';
	    this.startTime=+new Date;
		this.settings={   

				w:300,				//默认宽度
				title:'提示',	    //默认标题
				dir:'center',		//默认居中	
				mark:false,		    //默认没有笼罩层
				content:'你好',     //默认文字内容
	            drag:true
			};
	}

	Dialog.prototype.json={};

	Dialog.prototype.init=function(opts){  //自定义配置

		extend(this.settings,opts);
		

		//点击第一次才生成div层
		
		if(this.json[opts.iNow]==undefined)
		{
			this.json[opts.iNow]=true;

		}

		if(this.json[opts.iNow])
		{
			this.create();
			this.popClose();
			if(this.settings.mark)
			{
				this.createMark();
			}

			this.json[opts.iNow]=false;

			//是否拖拽
			if(this.settings.drag)
			{
				this.drag();
				this.oLogin.style.cursor='move';	
			}
			
		}

		
	}

	//生成弹窗层
	Dialog.prototype.create=function(){

		this.oLogin=document.createElement('div');
		this.oLogin.className='d_login modal-content';
		this.oLogin.id='d_login'+this.startTime;

		this.oLogin.innerHTML='<div class="d_title modal-header"><span class="close">X</span><h4>'+this.settings.title+'</h4></div><div class="d_content"><p class="d_content_in">'+this.settings.content+'</p><p class="t_conform"><button type="button" id="t_conform" class="btn btn-y">确定</button></p></div>';
		document.body.appendChild(this.oLogin);

		this.setData();
	}

	//设置弹窗位置和大小
	Dialog.prototype.setData=function(){
		this.oLogin.style.width = this.settings.w + 'px';
		this.oLogin.style.height = this.settings.h + 'px';
		if(this.settings.dir=='center')
		{
			
			this.oLogin.style.left=(viewWidth()-this.oLogin.offsetWidth)/2+'px';
			this.oLogin.style.top=(viewHeight()-this.oLogin.offsetHeight)/2+(document.documentElement.scrollTop||document.body.scrollTop||0)+'px';
		}
		else if(this.settings.dir=='right')
		{
			this.oLogin.style.left=viewWidth()-this.oLogin.offsetWidth+'px';
			this.oLogin.style.top=(viewHeight()-this.oLogin.offsetHeight)/2+(document.documentElement.scrollTop||document.body.scrollTop||0)+'px';
		}
		else if(this.settings.dir=='left')
		{
			this.oLogin.style.left=0+'px';
			this.oLogin.style.top=(viewHeight()-this.oLogin.offsetHeight)/2+(document.documentElement.scrollTop||document.body.scrollTop||0)+'px';
		}	
	}

	Dialog.prototype.popClose=function(){
	    var turl=this.settings.url;
		var oClose=this.oLogin.getElementsByTagName('span')[0];
		var oConform=document.getElementById('t_conform');
		var This=this;


		oConform.onclick=oClose.onclick=function(){
			document.body.removeChild(This.oLogin);
			if(This.oMark)
			{
				document.body.removeChild(This.oMark);
			}
			This.json[This.settings.iNow]=true;
		}


	}

	Dialog.prototype.createMark=function(){
		this.oMark=document.createElement('div');
		this.oMark.id='d_mark';
		this.oMark.className='d_mark';
		document.body.appendChild(this.oMark);
		this.oMark.style.width=viewWidth()+'px';
		this.oMark.style.height=getScrollHeight()+'px';

	}

	//拖拽
	Dialog.prototype.drag=function(){
		var obj=this.oLogin;
		var This=this;
		obj.onmousedown=function(ev){
			var ev = ev || window.event;
			This.disX = ev.clientX - this.offsetLeft;
			This.disY = ev.clientY - this.offsetTop;
			
			document.onmousemove=function(ev){
				var ev=ev || window.event;
				if(ev.clientX-This.disX>0 && ev.clientX-This.disX<(viewWidth()-This.oLogin.offsetWidth) && ev.clientY-This.disY>0 && ev.clientY-This.disY<(viewHeight()-This.oLogin.offsetHeight))
				{
					obj.style.left=ev.clientX-This.disX+'px';	
					obj.style.top=ev.clientY-This.disY+'px';
				}	
			}

			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmousedown=null;
			}

			return false;
		}
	}

	//获取可视区大小
	function viewWidth()
	{
		return document.documentElement.clientWidth || document.body.clientWidth;
	}

	function viewHeight()
	{
		return document.documentElement.clientHeight || document.body.clientHeight;
	}

	function getScrollHeight(eDoc)
	{
		!eDoc && (eDoc = document);
				var v1 = eDoc.documentElement.scrollHeight,
				v2 = eDoc.body.scrollHeight;
				return Math.max(v1, v2);
	}

	function extend(obj1,obj2)
	{
		for(var attr in obj2)
		{
			obj1[attr]=obj2[attr];
		}
	}

	window.Dialog=Dialog;
})()