iChart.LineBasic2D=iChart.extend(iChart.Line,{configure:function(){iChart.LineBasic2D.superclass.configure.call(this);this.type="basicline2d";this.tipInvokeHeap=[]},doAnimation:function(a,h){var c,d;this.coo.draw();for(var e=0;e<this.lines.length;e++){c=this.lines[e];d=c.get("points");for(var b=0;b<d.length;b++)d[b].y=c.y-Math.ceil(this.animationArithmetic(a,0,c.y-d[b].y_,h));c.drawSegment()}},doConfig:function(){iChart.LineBasic2D.superclass.doConfig.call(this);var a=this._();a.coo=new iChart.Coordinate2D(iChart.merge({scale:[{position:a.get("scaleAlign"),max_scale:a.get("maxValue")},{position:a.get("labelAlign"),scaleEnable:!1,start_scale:1,scale:1,end_scale:a.get("maxItemSize"),labels:a.get("data_labels")}]},a.get("coordinate")),a);a.components.push(a.coo);var h=a.coo.getScale(a.get("scaleAlign")),c=a.get("coordinate.valid_height"),d=a.get("label_spacing"),e,b,j,l=a.get("segment_style.originx"),m=a.get("segment_style.originy"),i;a.push("segment_style.tip.showType","follow");a.push("segment_style.coordinate",a.coo);a.push("segment_style.tipInvokeHeap",a.tipInvokeHeap);a.push("segment_style.point_space",d);a.data.each(function(g){e=[];g.value.each(function(f,k){b=d*k;j=(f-h.start)*c/h.distance;i={x:l+b,y:m-j,value:f,text:f};iChart.merge(i,a.fireEvent(a,"parsePoint",[g,f,b,j,k]));a.get("tip.enable")&&(i.text=a.fireString(a,"parseTipText",[g,f,k],f));e.push(i)},a);a.push("segment_style.points",e);a.push("segment_style.brushsize",g.linewidth||1);a.push("segment_style.background_color",g.color);a.lines.push(new iChart.LineSegment(a.get("segment_style"),a))},this);a.components.push(a.lines)}});