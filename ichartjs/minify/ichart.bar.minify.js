iChart.Bar=iChart.extend(iChart.Chart,{configure:function(){iChart.Bar.superclass.configure.call(this);this.type="bar";this.dataType="simple";this.set({coordinate:{alternate_direction:"h"},barheight:void 0,text_space:6,scaleAlign:"bottom",rectangle:{}});this.registerEvent();this.rectangles=[];this.labels=[]},doParse:function(a,c,b,d,e,f){d=this.get("showpercent")?iChart.toPercent(a.value/this.total,this.get("decimalsnum")):a.value;this.get("tip.enable")&&this.push("rectangle.tip.text",this.fireString(this,"parseTipText",[a,a.value,c],a.name+" "+d));this.push("rectangle.value",d);this.push("rectangle.background_color",a.color);this.push("rectangle.id",b);this.push("rectangle.originy",e);this.push("rectangle.width",f)},doAnimation:function(a,c){this.coo.draw();this.labels.each(function(a){a.draw()},this);this.rectangles.each(function(b){b.push("width",Math.ceil(this.animationArithmetic(a,0,b.width,c)));b.drawRectangle()},this)},doConfig:function(){iChart.Bar.superclass.doConfig.call(this);iChart.Interface.coordinate.call(this);if("simple"==this.dataType){var a=this.data.length,c=this.get("coordinate.height"),b=this.pushIf("barheight",c/(2*a+1));b*a>c&&(b=this.push("barheight",c/(2*a+1)));this.push("barspace",(c-b*a)/(a+1))}this.is3D();this.coo=iChart.Interface.coordinate_.call(this);this.pushComponent(this.coo,!0);iChart.apply(this.get("rectangle"),iChart.clone("shadow,shadow_color,shadow_blur,shadow_offsetx,shadow_offsety,gradient,color_factor".split(","),this.options));this.push("rectangle.height",b);this.push("rectangle.valueAlign","right");this.push("rectangle.tipAlign","right");this.push("rectangle.originx",this.x+this.coo.get("brushsize"))}});