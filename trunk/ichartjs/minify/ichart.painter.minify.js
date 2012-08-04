iChart.Painter=iChart.extend(iChart.Element,{configure:function(){this.type="painter";this.dimension=iChart._2D;iChart.DefineAbstract("commonDraw",this);iChart.DefineAbstract("initialize",this);this.set({brushsize:1,strokeStyle:"gray",padding:10,color:"black",offsetx:0,offsety:0,background_color:"#FEFEFE",color_factor:0.15,gradient:!1,style:"",border:{enable:!0},listeners:null,originx:0,originy:0});this.variable.event={mouseover:!1};this.registerEvent("initialize","click","dblclick","mousemove","mouseover","mouseout","beforedraw","draw")},afterConfiguration:function(){},registerEvent:function(){for(var a=0;a<arguments.length;a++)this.events[arguments[a]]=[]},init:function(){if(!this.initialization){if(iChart.isObject(this.get("listeners")))for(var a in this.get("listeners"))this.on(a,this.get("listeners")[a]);this.initialize();this.fireEvent(this,"initialize",[this])}},is3D:function(){return this.dimension==iChart._3D},draw:function(a){this.init();this.draw=function(a){if(!this.fireEvent(this,"beforedraw",[this]))return this;this.commonDraw(a);this.fireEvent(this,"draw",[this])};this.draw(a)},fireString:function(a,b,c,d){a=this.fireEvent(a,b,c);return iChart.isString(a)?a:d},fireEvent:function(a,b,c){var d=this.events[b].length;if(1==d)return this.events[b][0].apply(a,c);for(var f=!0,e=0;e<d;e++)f=this.events[b][e].apply(a,c);return f},on:function(a,b){iChart.isString(a)&&iChart.isFunction(b)&&(this.events[a]||console.log(a));this.events[a].push(b);return this},doConfig:function(){var a=iChart.parsePadding(this.get("padding")),b=this.get("background_color"),c=this.get("color_factor");this.push("padding_top",a[0]);this.push("padding_right",a[1]);this.push("padding_bottom",a[2]);this.push("padding_left",a[3]);this.push("hpadding",a[1]+a[3]);this.push("vpadding",a[0]+a[2]);this.push("fontStyle",iChart.getFont(this.get("fontweight"),this.get("fontsize"),this.get("font")));this.push("fill_color",b);this.push("light_color",iChart.light(b,c));this.push("dark_color",iChart.dark(b,c));this.push("light_color2",iChart.light(b,2*c));this.push("dark_color2",2*iChart.dark(b,c));this.id=this.get("id")}});