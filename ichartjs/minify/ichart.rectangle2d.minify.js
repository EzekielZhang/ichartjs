iChart.Rectangle2D=iChart.extend(iChart.Rectangle,{configure:function(){iChart.Rectangle2D.superclass.configure.apply(this,arguments);this.type="rectangle2d";this.set({shadow_offsety:-2});this.registerEvent()},drawValue:function(){""!=this.get("value")&&this.T.text(this.get("value"),this.get("value_x"),this.get("value_y"),!1,this.get("color"),this.get("textAlign"),this.get("textBaseline"),this.get("fontStyle"))},drawRectangle:function(){this.T.rectangle(this.get("originx"),this.get("originy"),
this.get("width"),this.get("height"),this.get("fill_color"),this.get("border.enable"),this.get("border.width"),this.get("border.color"),this.get("shadow"),this.get("shadow_color"),this.get("shadow_blur"),this.get("shadow_offsetx"),this.get("shadow_offsety"))},isEventValid:function(a){return{valid:a.offsetX>this.x&&a.offsetX<this.x+this.width&&a.offsetY<this.y+this.height&&a.offsetY>this.y}},tipInvoke:function(){var a=this;return function(b,c){return{left:a.tipX(b,c),top:a.tipY(b,c)}}},doConfig:function(){iChart.Rectangle2D.superclass.doConfig.call(this);
"left"==this.get("tipAlign")||"right"==this.get("tipAlign")?this.tipY=function(a,b){return this.centerY-b/2}:this.tipX=function(a){return this.centerX-a/2};"left"==this.get("tipAlign")?this.tipX=function(a){return this.x-this.get("value_space")-a}:"right"==this.get("tipAlign")?this.tipX=function(){return this.x+this.width+this.get("value_space")}:this.tipY="bottom"==this.get("tipAlign")?function(){return this.y+this.height+3}:function(a,b){return this.y-b-3};"left"==this.get("valueAlign")?(this.push("textAlign",
"right"),this.push("value_x",this.x-this.get("value_space")),this.push("value_y",this.centerY)):"right"==this.get("valueAlign")?(this.push("textAlign","left"),this.push("textBaseline","middle"),this.push("value_x",this.x+this.width+this.get("value_space")),this.push("value_y",this.centerY)):"bottom"==this.get("valueAlign")?(this.push("value_x",this.centerX),this.push("value_y",this.y+this.height+this.get("value_space")),this.push("textBaseline","top")):(this.push("value_x",this.centerX),this.push("value_y",
this.y-this.get("value_space")),this.push("textBaseline","bottom"));this.valueX=this.get("value_x");this.valueY=this.get("value_y")}});
