iChart.Component=iChart.extend(iChart.Painter,{configure:function(a){iChart.Component.superclass.configure.apply(this,arguments);this.type="component";this.set({fontsize:12,font:"Verdana",fontweight:"normal",fontunit:"px",tip:{enable:!1,border:{width:2}}});this.ICHARTJS_CHART=this.proxy=this.atomic=!1;this.inject(a)},initialize:function(){iChart.DefineAbstract("isEventValid",this);iChart.DefineAbstract("doDraw",this);this.doConfig();this.initialization=!0},getDimension:function(){return{x:this.x,y:this.y,width:this.get("width"),height:this.get("height")}},destroy:function(){this.tip&&this.tip.destroy()},doConfig:function(){iChart.Component.superclass.doConfig.call(this);var a=this._(),b=a.get(a.W),c=a.get("maxwidth"),d=a.get(a.X);if(b&&c&&(b=a.push(a.W,iChart.parsePercent(b,c)),b>c&&(b=a.push("width",c)),c>b)){var e=a.get("align")||a.C;e==a.C?d+=(c-b)/2:e==a.R&&(d+=c-b)}a.x=a.push(a.X,d+a.get("offsetx"));a.y=a.push(a.Y,a.get(a.Y)+a.get("offsety"));a.push("fontStyle",iChart.getFont(a.get("fontweight"),a.get("fontsize"),a.get("font"),a.get("fontunit")));a.data=a.get("data");a.get("tip.enable")&&(a.pushIf("tip.border.color",a.get("f_color")),iChart.isFunction(a.get("tip.invokeOffset"))||a.push("tip.invokeOffset",a.tipInvoke()))},isMouseOver:function(a){return this.isEventValid(a,this)},redraw:function(a){this.root.draw(a,this.root.Combination)},last:iChart.emptyFn,commonDraw:function(a){a.proxy||a.doDraw.call(a,a)}});