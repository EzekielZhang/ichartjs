iChart.Sector=iChart.extend(iChart.Component,{configure:function(){iChart.Sector.superclass.configure.apply(this,arguments);this.type="sector";this.set({name:"",counterclockwise:!1,startAngle:0,middleAngle:0,endAngle:0,totalAngle:0,bound_event:"click",expand:!1,pop_animate:!1,mutex:!1,increment:void 0,shadow:!0,gradient:!0,label:{enable:!0,linelength:void 0},tip:{enable:!1,border:{width:2}}});this.registerEvent("changed");this.tip=this.label=null},bound:function(){this.expanded||this.toggle()},rebound:function(){this.expanded&&this.toggle()},toggle:function(){this.fireEvent(this,this.get("bound_event"),[this])},drawLabel:function(){this.get("label.enable")&&this.label.draw({highlight:this.highlighted,invoke:this.labelInvoke(this.x,this.y)})},doDraw:function(){this.drawSector();this.drawLabel()},doConfig:function(){iChart.Sector.superclass.doConfig.call(this);var a=this;a.push("totalAngle",a.get("endAngle")-a.get("startAngle"));a.push("label.scolor",a.get("background_color"));a.variable.event.status=a.expanded=a.get("expand");a.get("tip.enable")&&("follow"!=a.get("tip.showType")&&a.push("tip.invokeOffsetDynamic",!1),a.tip=new iChart.Tip(a.get("tip"),a));a.variable.event.poped=!1;a.on(a.get("bound_event"),function(a){a.variable.event.poped=true;a.expanded=!a.expanded;a.redraw();a.variable.event.poped=false});a.on("beforedraw",function(){a.x=a.get("originx");a.y=a.get("originy");a.variable.event.status!=a.expanded&&a.fireEvent(a,"changed",[a,a.expanded]);if(a.variable.event.status=a.expanded)if(a.get("mutex")&&!a.variable.event.poped)a.expanded=false;else{a.x=a.x+a.get("increment")*Math.cos(2*Math.PI-a.get("middleAngle"));a.y=a.y-a.get("increment")*Math.sin(2*Math.PI-a.get("middleAngle"))}return true})}});