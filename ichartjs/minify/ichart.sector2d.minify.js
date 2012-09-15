iChart.Sector2D=iChart.extend(iChart.Sector,{configure:function(){iChart.Sector2D.superclass.configure.apply(this,arguments);this.type="sector2d";this.set({radius:0})},drawSector:function(){this.T.sector(this.x,this.y,this.r,this.get("donutwidth"),this.get("startAngle"),this.get("endAngle"),this.get("f_color"),this.get("border.enable"),this.get("border.width"),this.get("border.color"),this.get("shadow"),this.get("counterclockwise"))},isEventValid:function(a){if(this.label&&this.label.isEventValid(a).valid)return{valid:!0};var b=iChart.distanceP2P(this.x,this.y,a.x,a.y),c=this.get("donutwidth");return this.r<b||c&&this.r-c>b?{valid:!1}:iChart.angleInRange(this.get("startAngle"),this.get("endAngle"),2*Math.PI-iChart.atan2Radian(this.x,this.y,a.x,a.y))?{valid:!0}:{valid:!1}},tipInvoke:function(){return function(a,b){var c=iChart.p2Point(this.x,this.y,this.get("middleAngle"),0.8*this.r),d=iChart.quadrantd(this.get("middleAngle"));return{left:2<=d&&3>=d?c.x-a:c.x,top:3<=d?c.y-b:c.y}}},doConfig:function(){iChart.Sector2D.superclass.doConfig.call(this);var a=this._();a.r=a.get("radius");iChart.Assert.gtZero(a.r);a.get("donutwidth")>a.r&&a.push("donutwidth",0);a.get("gradient")&&a.push("f_color",a.T.avgRadialGradient(a.x,a.y,0,a.x,a.y,a.r,[a.get("light_color"),a.get("dark_color")]));a.pushIf("increment",iChart.lowTo(5,a.r/10));var b=a.get("middleAngle"),c=a.get("increment");a.push("inc_x",c*Math.cos(2*Math.PI-b));a.push("inc_y",c*Math.sin(2*Math.PI-b));a.get("label.enable")&&(a.pushIf("label.linelength",iChart.lowTo(10,a.r/8)),Q=iChart.quadrantd(b),P2=iChart.p2Point(a.x,a.y,b,a.get("donutwidth")?a.r-a.get("donutwidth")/2:a.r/2),a.push("label.originx",P2.x),a.push("label.originy",P2.y),a.push("label.quadrantd",Q),b=iChart.p2Point(a.x,a.y,b,a.r+a.get("label.linelength")),a.push("label.line_potins",[P2.x,P2.y,b.x,b.y]),a.push("label.labelx",b.x),a.push("label.labely",b.y),a.label=new iChart.Label(a.get("label"),a))}});