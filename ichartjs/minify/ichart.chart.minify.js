(function(i){function w(a){"string"===typeof a&&(a=document.getElementById(a));if(!a||!a.tagName||"canvas"!=a.tagName.toLowerCase())throw Error("there not a canvas element");this.canvas=a;this.c=this.canvas.getContext("2d");this.width=this.canvas.width;this.height=this.canvas.height}var u=Math.PI/90,o=Math.PI,y=2*Math.PI,q=Math.sin,s=Math.cos,l=function(a,b){return 1>=a?Math.floor(b)+0.5:Math.floor(b)};w.prototype={css:function(a,b){if(i.isDefined(b))this.canvas.style[a]=b;else return this.canvas.style[a]},arc:function(a,b,c,e,g,f,d,h,i,k,m,j,n,x,r,v,l){r=!!r;v=!!v;this.save();l&&(this.c.globalCompositeOperation="destination-over");d&&this.strokeStyle(h,i);this.shadowOn(k,m,j,n,x).fillStyle(f);this.moveTo(a,b).beginPath();this.c.arc(a,b,c,e,g,r);v&&this.lineTo(a,b);this.closePath().fill();d&&this.stroke();return this.restore()},ellipse:function(a,b,c,e,g,f,d,h,i,k,m,j,n,x,r,l,o,z){l=!!l;o=!!o;this.save();z&&(this.c.globalCompositeOperation="destination-over");e&&this.strokeStyle(i,k);this.shadowOn(m,j,n,x,r).fillStyle(d).moveTo(a,b).beginPath();for(o&&this.moveTo(a,b);g<=f;)this.lineTo(a+c*s(g),b+(l?-e*q(g):e*q(g))),g+=u;this.lineTo(a+c*s(f),b+(l?-e*q(f):e*q(f))).closePath();e&&this.stroke();return this.fill().restore()},sector:function(a,b,c,e,g,f,d,h,i,k,m,j,n,l,r){k?(this.arc(a,b,c,e,g,f,d,h,i,k,m,j,n,l,r,!0),this.arc(a,b,c,e,g,f,d,h,i,!1,m,j,n,l,r,!0)):this.arc(a,b,c,e,g,f,d,h,i,!1,0,0,0,0,r,!0);return this},sector3D:function(){var a=function(a,b,g,f,d,h,p,k,m){if(p&&h<=o||!p&&d>=o)return!1;var j=function(d,h){this.lineTo(a+g*s(d),b+(h||0)+(p?-f*q(d):f*q(d)))},d=p&&h>o&&d<o?o:d,h=!p&&d<o&&h>o?o:h,n=d;for(this.fillStyle(i.dark(m)).moveTo(a+g*s(d),b+(p?-f*q(d):f*q(d))).beginPath();n<=h;)j.call(this,n),n+=u;j.call(this,h);this.lineTo(a+g*s(h),b+k+(p?-f*q(h):f*q(h)));for(n=h;n>=d;)j.call(this,n,k),n-=u;j.call(this,d,k);this.lineTo(a+g*s(d),b+(p?-f*q(d):f*q(d))).closePath().fill()},b=function(a,b,g,f,d,h,p,k){g=a+g*s(p);f=b+h+(d?-f*q(p):f*q(p));this.moveTo(a,b).beginPath().fillStyle(i.dark(k)).lineTo(a,b+h).lineTo(g,f).lineTo(g,f-h).lineTo(a,b).closePath().fill()};return function(c,e,g,f,d,h,p,k,m,j,n,l,r,v,q,s,t){l=l&&!i.isOpera;this.save().fillStyle(k);this.c.globalCompositeOperation="destination-over";var u=t?d<o/2||d>1.5*o:d>o/2&&d<1.5*o,w=t?h>o/2&&h<1.5*o:h<o/2||h>1.5*o;if(u||w)u&&b.call(this,c,e,g,f,t,p,d,k),w&&b.call(this,c,e,g,f,t,p,h,k);this.ellipse(c,e+p,g,f,d,h,k,m,j,n,l,r,v,q,s,t,!0);this.c.globalCompositeOperation="source-over";this.ellipse(c,e,g,f,d,h,k,m,j,n,!1,r,v,q,s,t,!0);a.call(this,c,e,g,f,d,h,t,p,k);return this.restore()}}(),textStyle:function(a,b,c){return this.textAlign(a).textBaseline(b).textFont(c)},strokeStyle:function(a,b,c){a&&(this.c.lineWidth=a);b&&(this.c.strokeStyle=b);c&&(this.c.lineJoin=c);return this},globalAlpha:function(a){a&&(this.c.globalAlpha=a);return this},fillStyle:function(a){a&&(this.c.fillStyle=a);return this},textAlign:function(a){a&&(this.c.textAlign=a);return this},textBaseline:function(a){a&&(this.c.textBaseline=a);return this},textFont:function(a){a&&(this.c.font=a);return this},shadowOn:function(a,b,c,e,g){i.isString(a)&&(g=e,e=c,c=b,b=!0);a&&(this.c.shadowColor=b,this.c.shadowBlur=c,this.c.shadowOffsetX=e,this.c.shadowOffsetY=g);return this},shadowOff:function(){this.c.shadowColor="white";this.c.shadowBlur=this.c.shadowOffsetX=this.c.shadowOffsetY=0},avgLinearGradient:function(a,b,c,e,g){a=this.createLinearGradient(a,b,c,e);for(b=0;b<g.length;b++)a.addColorStop(b/(g.length-1),g[b]);return a},createLinearGradient:function(a,b,c,e){return this.c.createLinearGradient(a,b,c,e)},avgRadialGradient:function(a,b,c,e,g,f,d){a=this.createRadialGradient(a,b,c,e,g,f);for(b=0;b<d.length;b++)a.addColorStop(b/(d.length-1),d[b]);return a},createRadialGradient:function(a,b,c,e,g,f){return this.c.createRadialGradient(a,b,c,e,g,f)},fillText:function(a,b,c,e,g,f,d){a+="";e=e||!1;f=f||"lr";d=d||16;this.fillStyle(g);a.split("tb"==f?"":"\n").each(function(a){try{e?this.c.fillText(a,b,c,e):this.c.fillText(a,b,c),c+=d}catch(g){console.log(g.message+"["+a+","+b+","+c+"]")}},this);return this},measureText:function(a){return this.c.measureText(a).width},moveTo:function(a,b){this.c.moveTo(a||0,b||0);return this},lineTo:function(a,b){this.c.lineTo(a||0,b||0);return this},save:function(){this.c.save();return this},restore:function(){this.c.restore();return this},beginPath:function(){this.c.beginPath();return this},closePath:function(){this.c.closePath();return this},stroke:function(){this.c.stroke();return this},fill:function(){this.c.fill();return this},text:function(a,b,c,e,g,f,d,h,i,k){this.save();this.textStyle(f,d,h);this.fillText(a,b,c,e,g,i,k);this.c.restore();return this},cube:function(a,b,c,e,g,f,d,h,p,k,m,j,n,o,r,q){a=l(k,a);b=l(k,b);d=d&&0<d?d:g;e=b-d*e;c=l(k,a+d*c);e=l(k,e);j&&(this.polygon(h,p,k,m,j,n,o,r,q,!1,[a,b,c,e,c+g,e,a+g,b]),this.polygon(h,p,k,m,j,n,o,r,q,!1,[a,b,a,b+f,a+g,b+f,a+g,b]),this.polygon(h,p,k,m,j,n,o,r,q,!1,[a+g,b,c+g,e,c+g,e+f,a+g,b+f]));this.polygon(i.dark(h),p,k,m,!1,n,o,r,q,!1,[a,b,c,e,c+g,e,a+g,b]);this.polygon(h,p,k,m,!1,n,o,r,q,!1,[a,b,a,b+f,a+g,b+f,a+g,b]);this.polygon(i.dark(h),p,k,m,!1,n,o,r,q,!1,[a+g,b,c+g,e,c+g,e+f,a+g,b+f]);return this},cube3D:function(a,b,c,e,g,f,d,h,p,k,m,j){a=l(k,a);b=l(k,b);h=!h||0==h?f:h;g?(e=i.vectorP2P(c,e),c=a+h*e.x,e=b-h*e.y):(c=a+h*c,e=b-h*e);for(;6>j.length;)j.push(!1);c=l(k,c);e=l(k,e);h=[];0>e?i.isObject(j[4])&&h.push(i.applyIf({points:[a,b-d,c,e-d,c+f,e-d,a+f,b-d]},j[4])):i.isObject(j[0])&&h.push(i.applyIf({points:[a,b,c,e,c+f,e,a+f,b]},j[0]));i.isObject(j[1])&&h.push(i.applyIf({points:[c,e,c,e-d,c+f,e-d,c+f,e]},j[1]));i.isObject(j[2])&&h.push(i.applyIf({points:[a,b,a,b-d,c,e-d,c,e]},j[2]));i.isObject(j[3])&&h.push(i.applyIf({points:[a+f,b,a+f,b-d,c+f,e-d,c+f,e]},j[3]));0>e?i.isObject(j[0])&&h.push(i.applyIf({points:[a,b,c,e,c+f,e,a+f,b]},j[0])):i.isObject(j[4])&&h.push(i.applyIf({points:[a,b-d,c,e-d,c+f,e-d,a+f,b-d]},j[4]));i.isObject(j[5])&&h.push(i.applyIf({points:[a,b,a,b-d,a+f,b-d,a+f,b]},j[5]));h.each(function(a){this.polygon(a.color,p,k,m,a.shadow,a.shadowColor,a.blur,a.sx,a.sy,a.alpha,a.points)},this);return this},polygon:function(a,b,c,e,g,f,d,h,i,k,m){if(!(2>m.length)){this.save().strokeStyle(c,e).beginPath().fillStyle(a).globalAlpha(k).shadowOn(g,f,d,h,i).moveTo(m[0],m[1]);for(a=2;a<m.length;a+=2)this.lineTo(m[a],m[a+1]);this.closePath();b&&this.stroke();this.fill().restore();return this}},lines:function(a,b,c,e){if(4>a.length)return this;this.save();e&&(this.c.globalCompositeOperation="destination-over");this.beginPath().strokeStyle(b,c).moveTo(l(b,a[0]),l(b,a[1]));for(c=2;c<a.length-1;c+=2)this.lineTo(l(b,a[c]),l(b,a[c+1]));return this.stroke().restore()},line:function(a,b,c,e,g,f,d){if(!g||0==g)return this;this.save();d&&(this.c.globalCompositeOperation="destination-over");return this.beginPath().strokeStyle(g,f).moveTo(l(g,a),l(g,b)).lineTo(l(g,c),l(g,e)).stroke().restore()},round:function(a,b,c,e,g,f){return this.arc(a,b,c,0,y,e,!!f,g,f)},fillRect:function(a,b,c,e){this.c.fillRect(a,b,c,e);return this},translate:function(a,b){this.c.translate(a,b);return this},backgound:function(a,b,c,e,g){this.save();this.c.globalCompositeOperation="destination-over";return this.translate(a,b).beginPath().fillStyle(g).fillRect(0,0,c,e).restore()},rectangle:function(a,b,c,e,g,f,d,h,p,k,m,j,n){this.save().translate(l(d,a),l(d,b)).beginPath().fillStyle(g).shadowOn(p,k,m,j,n);f&&i.isNumber(d)&&(this.strokeStyle(d,h),this.c.strokeRect(0,0,c,e));g&&this.fillRect(0,0,c,e);f&&i.isArray(d)&&this.strokeStyle(null,h).line(0,0,c,0,d[0],h).line(c,0,c,e,d[1],h).line(0,e,c,e,d[2],h).line(0,0,0,e,d[3],h);return this.restore()},clearRect:function(a,b,c,e){c=c||this.width;e=e||this.height;this.c.clearRect(a||0,b||0,c,e);return this},drawBorder:function(a,b,c,e,g,f,d,h,p,k,m,j,n,o){this.save();var q=l(g,a),s=l(g,b);q!=a&&(a=q,c-=1);s!=b&&(b=s,e-=1);this.translate(a,b).strokeStyle(g,f);p&&(this.c.globalCompositeOperation="destination-over");h&&this.fillStyle(h);d=0==d?0:i.parseBorder(d);i.isArray(d)?(this.beginPath().moveTo(d[0],0).lineTo(c-d[1],0),this.c.arcTo(c,0,c,d[1],d[1]),this.lineTo(c,e-d[2]),this.c.arcTo(c,e,c-d[2],e,d[2]),this.lineTo(d[3],e),this.c.arcTo(0,e,0,e-d[3],d[3]),this.lineTo(0,d[0]),this.c.arcTo(0,0,d[0],0,d[0]),this.closePath().shadowOn(k,m,j,n,o),h&&this.fill(),k&&this.shadowOff(),this.c.globalCompositeOperation="source-over",this.stroke()):(this.shadowOn(k,m,j,n,o),h&&this.fillRect(0,0,c,e),k&&this.shadowOff(),this.c.strokeRect(0,0,c,e));return this.restore()},toImageURL:function(){return this.canvas.toDataURL("image/png")},addEvent:function(a,b,c){i.Event.addEvent(this.canvas,a,b,c)}};i.Chart=i.extend(i.Painter,{configure:function(){i.Chart.superclass.configure.apply(this,arguments);this.type="chart";this.set({render:"",data:[],width:void 0,height:void 0,lineJoin:"round",align:"center",default_mouseover_css:!0,segmentRect:!0,showpercent:!1,decimalsnum:1,title:{text:"",fontweight:"bold",fontsize:20,height:30},subtitle:{text:"",fontweight:"bold",fontsize:16,height:20},footnote:{text:"",color:"#5d7f97",height:20},footnote_align:"right",title_align:"center",title_valign:"top",animation:!1,doAnimationFn:i.emptyFn,animation_timing_function:"easeInOut",duration_animation_duration:1E3,legend:{enable:!1},tip:{enable:!1}});this.registerEvent("parseData","parseTipText","beforeAnimation","afterAnimation","animating");this.T=null;this.animationed=this.rendered=!1;this.data=[];this.components=[];this.total=0},pushComponent:function(a,b){b?this.components.unshift(a):this.components.push(a)},plugin:function(a,b){this.init();a.inject(this);this.pushComponent(a,b)},toImageURL:function(){return this.T.toImageURL()},segmentRect:function(){this.T.clearRect(this.get("l_originx"),this.get("t_originy"),this.get("client_width"),this.get("client_height"))},resetCanvas:function(){this.T.backgound(this.get("l_originx"),this.get("t_originy"),this.get("client_width"),this.get("client_height"),this.get("background_color"))},animation:function(){var a;return function(){a||(a=this);a.segmentRect();a.doAnimation(a.variable.animation.time,a.duration);a.resetCanvas();a.variable.animation.time<a.duration?(a.variable.animation.time++,requestAnimFrame(a.animation)):requestAnimFrame(function(){a.variable.animation.time=0;a.animationed=!0;a.draw();a.processAnimation=!1;a.fireEvent(a,"afterAnimation",[a])})}}(),doAnimation:function(a,b){this.get("doAnimationFn").call(this,a,b)},add:function(a,b,c){if(this.processAnimation)return this.variable.animation.queue.push({handler:"add",arguments:[a,b,c]}),!1;i.isNumber(b);b=i.between(0,this.data.length,b);a=i.Interface.parser.call(this,a,b);this.get("legend.enable")&&this.legend.calculate(this.data,a);return a},commonDraw:function(){i.Assert.isTrue(this.rendered,this.type+" has not rendered.");i.Assert.isTrue(this.initialization,this.type+" has initialize failed.");i.Assert.gtZero(this.data.length,this.type+"'data is empty.");this.redraw||(this.title&&this.title.draw(),this.subtitle&&this.subtitle.draw(),this.footnote&&this.footnote.draw(),this.get("border.enable")?this.T.drawBorder(0,0,this.width,this.height,this.get("border.width"),this.get("border.color"),this.get("border.radius"),this.get("background_color"),!0):this.T.backgound(0,0,this.width,this.height,this.get("background_color")));this.redraw=!0;!this.animationed&&this.get("animation")?(this.fireEvent(this,"beforeAnimation",[this]),this.animation()):(this.segmentRect(),this.components.eachAll(function(a){a.draw()},this),this.resetCanvas())},create:function(a){this.width=this.pushIf("width",400);this.height=this.pushIf("height",300);var b="width:"+this.width+"px;height:"+this.height+"px;padding:0px;overflow:hidden;position:relative;",c=i.iGather(this.type);this.shellid=i.iGather(this.type+"-shell");a.innerHTML="<div id='"+this.shellid+"' style='"+b+"'><canvas id= '"+c+"'  width='"+this.width+"' height="+this.height+"'><p>Your browser does not support the canvas element</p></canvas></div>";this.element=document.getElementById(c);this.shell=document.getElementById(this.shellid);this.T=this.target=new w(this.element);this.rendered=!0},render:function(a){this.push("render",a)},initialize:function(){if(!this.rendered){var a=this.get("render");"string"==typeof a&&document.getElementById(a)?this.create(document.getElementById(a)):"object"==typeof a&&this.create(a)}0<this.get("data").length&&this.rendered&&!this.initialization&&(i.Interface.parser.call(this,this.get("data")),this.doConfig(),this.initialization=!0)},doConfig:function(){i.Chart.superclass.doConfig.call(this);var a=this,b=a.variable.event,c=a.get("default_mouseover_css"),e,g;i.Assert.isArray(a.data);i.Interface._3D.call(a);a.T.strokeStyle(a.get("brushsize"),a.get("strokeStyle"),a.get("lineJoin"));a.processAnimation=a.get("animation");a.duration=Math.ceil(a.get("duration_animation_duration")*i.FRAME/1E3);a.variable.animation={type:0,time:0,queue:[]};a.animationArithmetic=i.getAnimationArithmetic(a.get("animation_timing_function"));a.on("afterAnimation",function(){var b=a.variable.animation.queue.shift();b&&a[b.handler].apply(a,b.arguments)});["click","dblclick","mousemove"].each(function(b){a.T.addEvent(b,function(c){a.processAnimation||a.fireEvent(a,b,[a,i.Event.fix(c)])},!1)});a.on("click",function(a,b){a.components.eachAll(function(a){if(!a.preventEvent){var c=a.isMouseOver(b);c.valid&&a.fireEvent(a,"click",[a,b,c])}})});a.on("mousemove",function(a,d){e=g=!1;a.components.eachAll(function(f){if(!f.preventEvent){var i=f.variable.event,j=f.isMouseOver(d);j.valid?(e=!0,g=g||f.atomic,b.mouseover||(b.mouseover=!0,a.fireEvent(a,"mouseover",[d])),c&&g&&a.T.css("cursor","pointer"),i.mouseover||(i.mouseover=!0,f.fireEvent(f,"mouseover",[d,j])),f.fireEvent(f,"mousemove",[d,j])):i.mouseover&&(i.mouseover=!1,f.fireEvent(f,"mouseout",[d,j]))}});c&&!g&&b.mouseover&&a.T.css("cursor","default");!e&&b.mouseover&&(b.mouseover=!1,a.fireEvent(a,"mouseout",[d]))});a.push("l_originx",a.get("padding_left"));a.push("r_originx",a.width-a.get("padding_right"));a.push("t_originy",a.get("padding_top"));a.push("b_originy",a.height-a.get("padding_bottom"));a.push("client_width",a.get("width")-a.get("hpadding"));var f=0;i.isString(a.get("title"))&&a.push("title",{text:a.get("title"),fontweight:"bold",fontsize:20,height:30});i.isString(a.get("subtitle"))&&a.push("subtitle",{text:a.get("subtitle"),fontweight:"bold",fontsize:16,height:20});i.isString(a.get("footnote"))&&a.push("footnote",{text:a.get("footnote"),color:"#5d7f97",height:20});if(""!=a.get("title.text")){var d=""!=a.get("subtitle.text"),f=d?a.get("title.height")+a.get("subtitle.height"):a.get("title.height");"left"==a.get("title_align")?a.push("title.originx",a.get("padding_left")):"right"==a.get("title_align")?a.push("title.originx",a.width-a.get("padding_right")):a.push("title.originx",a.get("padding_left")+a.get("client_width")/2);a.push("t_originy",a.get("t_originy")+f);this.push("title.textAlign",this.get("title_align"));this.push("title.originy",this.get("padding_top"));this.push("title.textBaseline","top");this.title=new i.Text(this.get("title"),this);d&&(a.push("subtitle.originx",a.get("title.originx")),a.push("subtitle.originy",a.get("title.originy")+a.get("title.height")),a.push("subtitle.textAlign",a.get("title_align")),a.push("subtitle.textBaseline","top"),this.subtitle=new i.Text(this.get("subtitle"),this))}""!=a.get("footnote.text")&&(d=a.get("footnote.height"),f+=d,a.push("b_originy",a.get("b_originy")-d),"left"==a.get("footnote_align")?a.push("footnote.originx",a.get("padding_left")):"right"==a.get("footnote_align")?a.push("footnote.originx",a.width-a.get("padding_right")):a.push("footnote.originx",a.get("padding_left")+a.get("client_width")/2),this.push("footnote.textAlign",this.get("footnote_align")),this.push("footnote.originy",this.get("b_originy")),this.push("footnote.textBaseline","top"),this.footnote=new i.Text(this.get("footnote"),this));a.push("client_height",a.get("height")-a.get("vpadding")-f);a.push("minDistance",Math.min(a.get("client_width"),a.get("client_height")));a.push("maxDistance",Math.max(a.get("client_width"),a.get("client_height")));a.push("minstr",a.get("client_width")<a.get("client_height")?"width":"height");a.push("centerx",a.get("l_originx")+a.get("client_width")/2);a.push("centery",a.get("t_originy")+a.get("client_height")/2);a.get("legend.enable")&&(a.legend=new i.Legend(i.apply({maxwidth:a.get("client_width"),data:a.data},a.get("legend")),a),a.components.push(a.legend));a.get("tip.enable")&&a.push("tip.wrap",a.shell)}})})(iChart);