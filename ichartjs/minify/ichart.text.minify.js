iChart.Text=iChart.extend(iChart.Component,{configure:function(){iChart.Text.superclass.configure.apply(this,arguments);this.type="text";this.set({text:"",textAlign:"center",background_color:0,textBaseline:"top",border:{enable:!1},width:0,height:0,padding:0,writingmode:"lr",line_height:16,rotate:0});this.registerEvent()},doDraw:function(a){a.get("box_feature")&&a.T.box(a.x,a.y,a.get(a.W),a.get(a.H),a.get("border"),a.get("f_color"));a.T.text(a.get("text"),a.get("textx"),a.get("texty"),a.get(a.W),a.get("color"),a.get("textAlign"),a.get("textBaseline"),a.get("fontStyle"),a.get("writingmode"),a.get("line_height"),a.get("shadow"),a.get("rotate"))},isEventValid:function(){return{valid:!1}},doLayout:function(a,c,d,b){b.x=b.push(b.X,b.x+a);b.y=b.push(b.Y,b.y+c);b.push("textx",b.get("textx")+a);b.push("texty",b.get("texty")+c)},doConfig:function(){iChart.Text.superclass.doConfig.call(this);var a=this._(),c=a.x,d=a.y+a.get("padding_top"),b=a.get(a.W),e=a.get(a.H),f=a.get("textAlign"),c=c+(f==a.C?b/2:f==a.R?b-a.get("padding_right"):a.get("padding_left"));e&&(d+=e/2,a.push("textBaseline","middle"));a.push("textx",c);a.push("texty",d);a.push("box_feature",b&&e);a.applyGradient()}});