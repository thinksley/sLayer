# sLayer
无依赖的简易弹层

插件参数：this.settings={   
			w:300,				//默认宽度
			
			title:'提示',	    //默认标题
			
			dir:'center',		//默认居中	
			mark:false,		    //是否有笼罩层，默认隐藏
			content:'你好',     //默认文字内容
            		drag:true           //是否拖拽
		};

页面调用如下：	oInput[1].onclick=function(){
			var d2=new Dialog();
			d2.init({
				
				w:400,
				title:'this is title',
				dir:'right',
				mark:true
			});
		}		
