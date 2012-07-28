	/**
	 * @overview this component use for abc
	 * @component#iChart.Component
	 * @extend#iChart.Painter
	 */
	iChart.Component = iChart.extend(iChart.Painter,{
		configure : function(c) {
			/**
			 * invoked the super class's configuration
			 */
			iChart.Component.superclass.configure.apply(this,arguments);
	
			/**
			 * indicate the element's type
			 */
			this.type = 'component';
	
			this.set({
				/**
				 * @inner {Boolean} Specifies the config of Tip.For details see <link>iChart.Tip</link>
				 * Note:this has a extra property named 'enable',indicate whether tip available(default to false)
				 */
				tip : {
					enable : false,
					border : {
						width : 2
					}
				}
			});
			
			/**
			 * If this element can split or contain others.(default to false)
			 */
			this.atomic = false;
			
			this.inject(c);
			
			this.final_parameter = {};
			
	
	},
	afterConfiguration:function(){
		this.init();
	},
	initialize : function() {
		if (!this.preventEvent)
			/**
			 * define abstract method
			 */
			iChart.DefineAbstract('isEventValid', this);
	
		iChart.DefineAbstract('doDraw', this);
	
		this.doConfig();
		this.initialization = true;
	},
	doConfig : function() {
		iChart.Component.superclass.doConfig.call(this);
		/**
		 * originx
		 */
		this.x = this.get('originx')+this.get('offsetx');
		/**
		 * 
		 * originy
		 */
		this.y = this.get('originy')+this.get('offsety');
		
		/**
		 * if have evaluate it
		 */
		this.data = this.get('data');
	
		iChart.Interface._3D.call(this);
		
		if (this.get('tip.enable')) {
			/**
			 * make tip's border in accord with sector
			 */
			this.pushIf('tip.border.color', this.get('background_color'));
	
			if (!iChart.isFunction(this.get('tip.invokeOffset')))
				/**
				 * indicate the tip must calculate position
				 */
				this.push('tip.invokeOffset', this.tipInvoke());
		}
	
	},
	isMouseOver : function(e) {
		return this.isEventValid(e);
	},
	//render ? named
	redraw : function() {
		this.container.draw();
	},
	commonDraw : function(opts) {
		// 转换中心坐标至当前目标坐标中心?
		// this.T.ctx.translate(this.x,this.y);
		/**
		 * execute the doDraw() that the subClass implement
		 */
		this.doDraw.call(this, opts);
	
	},
	inject : function(c) {
		if (c) {
			this.container = c;
			this.target = this.T = c.T;
		}
	}
	});//@end