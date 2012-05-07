iChart.LineSegment=iChart.extend(iChart.Component,{configure:function(){iChart.LineSegment.superclass.configure.apply(this,arguments);this.type="linesegment";this.set({intersection:!0,label:!1,point_style:"round",point_hollow:!0,point_size:3,points:[],keep_with_coordinate:!1,shadow:!0,shadow_blur:1,shadow_offsetx:0,shadow_offsety:1,spacing:0,coordinate:null,event_range_x:0,limit_y:!1,tip_offset:2,event_range_y:0,area:!1,area_opacity:0.4,tip:{enable:!1,border:{width:2}}});this.tip=this.label=null},
drawLabel:function(){if(this.get("intersection")&&this.get("label"))for(var b=0;b<this.points.length;b++)this.T.textStyle("center","bottom",iChart.getFont(this.get("fontweight"),this.get("fontsize"),this.get("font"))),this.T.fillText(this.points[b].value,this.x+this.points[b].x,this.y-this.points[b].y-3*this.get("point_size")/2,!1,this.get("background_color"),"lr",16)},drawLineSegment:function(){this.T.shadowOn(this.get("shadow"),this.get("shadow_color"),this.get("shadow_blur"),this.get("shadow_offsetx"),
this.get("shadow_offsety"));if(this.get("area")){for(var b=[this.x,this.y],a=0;a<this.points.length;a++)b.push(this.x+this.points[a].x),b.push(this.y-this.points[a].y);b.push(this.x+this.get("width"));b.push(this.y);a=this.get("light_color");this.get("gradient")&&(a=this.T.avgLinearGradient(this.x,this.y-this.get("height"),this.x,this.y,[this.get("light_color2"),a]));this.T.polygon(a,!1,1,"",!1,"",0,0,0,this.get("area_opacity"),b)}for(a=0;a<this.points.length-1;a++)this.T.line(this.x+
this.points[a].x,this.y-this.points[a].y,this.x+this.points[a+1].x,this.y-this.points[a+1].y,this.get("brushsize"),this.get("fill_color"),!1);if(this.get("intersection"))for(a=0;a<this.points.length;a++)this.get("point_hollow")?this.T.round(this.x+this.points[a].x,this.y-this.points[a].y,this.get("point_size"),"#FEFEFE",this.get("brushsize"),this.get("fill_color")):this.T.round(this.x+this.points[a].x,this.y-this.points[a].y,this.get("point_size"),this.get("fill_color"));this.get("shadow")&&
this.T.shadowOff()},doDraw:function(){this.drawLineSegment();this.drawLabel()},isEventValid:function(){return{valid:!1}},tipInvoke:function(){var b=this.x,a=this.get("tip_offset"),d=this.get("point_size")+a,c=this;return function(g,i,e){var f=e.left,h=e.top,f=3>c.tipPosition&&0<e.left-g-b-a||2<c.tipPosition&&0>e.left-g-b-a?f-(g+a):f+a,h=0==c.tipPosition%2?e.top+d:e.top-i-d;return{left:f,top:h}}},doConfig:function(){iChart.LineSegment.superclass.doConfig.call(this);iChart.Assert.gtZero(this.get("spacing"),
"spacing");this.points=this.get("points");for(var b=0;b<this.points.length;b++)this.points[b].width=this.points[b].x,this.points[b].height=this.points[b].y;var a=this.get("spacing");0==this.get("event_range_x")?this.push("event_range_x",Math.floor(a/2)):this.push("event_range_x",iChart.between(1,Math.floor(a/2),this.get("event_range_x")));0==this.get("event_range_y")&&this.push("event_range_y",Math.floor(this.get("point_size")));var d=this.get("tipInvokeHeap");this.get("tip.enable")&&(this.on("mouseover",
function(){d.push(this);this.tipPosition=d.length}).on("mouseout",function(){d.pop()}),this.push("tip.invokeOffsetDynamic",!0),this.tip=new iChart.Tip(this.get("tip"),this));var c=this,g=c.get("coordinate"),i=c.get("event_range_y"),e=c.get("event_range_x"),f=c.get("limit_y"),h=c.get("keep_with_coordinate"),j=function(a,b,d){return Math.abs(b-(c.x+c.points[a].x))<e&&(!f||f&&Math.abs(d-(c.y-c.points[a].y))<i)?true:false},k=function(a){return{valid:true,text:c.points[a].value,top:c.y-c.points[a].y,left:c.x+
c.points[a].x,hit:true}};this.isEventValid=function(b){if(g&&!g.isEventValid(b).valid)return{valid:false};var d=Math.floor((b.offsetX-c.x)/a);if(d<0||d>=this.points.length-1){d=iChart.between(0,this.points.length-1,d);return j(d,b.offsetX,b.offsetY)?k(d):{valid:h}}for(var e=d;e<=d+1;e++)if(j(e,b.offsetX,b.offsetY))return k(e);return{valid:h}}}});
