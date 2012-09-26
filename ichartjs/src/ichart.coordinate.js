/**
 * @overview this is inner use for axis
 * @component#iChart.Scale
 * @extend#iChart.Component
 */
iChart.Scale = iChart.extend(iChart.Component, {
	configure : function() {

		/**
		 * invoked the super class's configuration
		 */
		iChart.Scale.superclass.configure.apply(this, arguments);

		/**
		 * indicate the component's type
		 */
		this.type = 'scale';

		this.set({
			/**
			 * @cfg {String} Specifies alignment of this scale.(default to 'left')
			 */
			position : 'left',
			/**
			 * @cfg {String} the axis's type(default to 'h') Available value are:
			 * @Option 'h' :horizontal
			 * @Option 'v' :vertical
			 */
			which : 'h',
			/**
			 * @inner {Number}
			 */
			distance : undefined,
			/**
			 * @cfg {Number} Specifies the start coordinate scale value.(default to 0)
			 */
			start_scale : 0,
			/**
			 * @cfg {Number} Specifies the end coordinate scale value.Note either this or property of max_scale must be has the given value.(default to undefined)
			 */
			end_scale : undefined,
			/**
			 * @cfg {Number} Specifies the chart's minimal value
			 */
			min_scale : undefined,
			/**
			 * @cfg {Number} Specifies the chart's maximal value
			 */
			max_scale : undefined,
			/**
			 * @cfg {Number} Specifies the space of two scale.Note either this or property of scale_share must be has the given value.(default to undefined)
			 */
			scale_space : undefined,
			/**
			 * @cfg {Number} Specifies the number of scale on axis.(default to 5)
			 */
			scale_share : 5,
			/**
			 * @cfg {Boolean} True to display the scale line.(default to true)
			 */
			scale_enable : true,
			/**
			 * @cfg {Number} Specifies the size of brush(context.linewidth).(default to 1)
			 */
			scale_size : 1,
			/**
			 * @cfg {Number} Specifies the width(length) of scale.(default to 4)
			 */
			scale_width : 4,
			/**
			 * @cfg {String} Specifies the color of scale.(default to 4)
			 */
			scale_color : '#333333',
			/**
			 * @cfg {String} Specifies the align against axis.(default to 'center') When the property of which set to 'h',Available value are:
			 * @Option 'left'
			 * @Option 'center'
			 * @Option 'right' When the property of which set to 'v', Available value are:
			 * @Option 'top'
			 * @Option 'center'
			 * @Option 'bottom'
			 */
			scaleAlign : 'center',
			/**
			 * @cfg {Array} the customize labels
			 */
			labels : [],
			/**
			 * @cfg {Number} Specifies the lineheight when text display multiline.(default to 16)
			 */
			text_height : 16,
			/**
			 * @cfg {Number} Specifies the distance to scale.(default to 4)
			 */
			text_space : 4,
			/**
			 * @cfg {String} Specifies the align against axis.(default to 'left' or 'bottom' in v mode) When the property of which set to 'h',Available value are:
			 * @Option 'left'
			 * @Option 'right' When the property of which set to 'v', Available value are:
			 * @Option 'top'
			 * @Option 'bottom'
			 */
			textAlign : 'left',
			/**
			 * @cfg {Number} Specifies the number of decimal.this will change along with scale.(default to 0)
			 */
			decimalsnum : 0,
			/**
			 * @inner {String} the style of overlapping(default to 'none') Available value are:
			 * @Option 'square'
			 * @Option 'round'
			 * @Option 'none'
			 */
			join_style : 'none',
			/**
			 * @inner {Number}
			 */
			join_size : 2
		});

		this.registerEvent(
		/**
		 * @event Fires the event when parse text、you can return a object like this:{text:'',textX:100,textY:100} to override the given.
		 * @paramter string#text item's text
		 * @paramter int#textX coordinate-x of item's text
		 * @paramter int#textY coordinate-y of item's text
		 * @paramter int#index item's index
		 */
		'parseText');

		this.items = [];
		this.number = 0;

	},
	isEventValid : function(e) {
		return {
			valid : false
		};
	},
	/**
	 * 按照从左自右,从上至下原则
	 */
	doDraw : function() {
		var _ = this._(), x = 0, y = 0, x0 = 0, y0 = 0, tx = 0, ty = 0, w = _.get('scale_width'), w2 = w / 2, sa = _.get('scaleAlign'), ta = _.get('textAlign'), ts = _.get('text_space');
		if (_.isH) {
			if (sa == 'top') {
				y = -w;
			} else if (sa == 'center') {
				y = -w2;
				y0 = w2;
			} else {
				y0 = w;
			}
			_.T.textAlign('center');
			if (ta == 'top') {
				ty = -ts;
				_.T.textBaseline('bottom');
			} else {
				ty = ts;
				_.T.textBaseline('top');
			}
		} else {
			if (sa == 'left') {
				x = -w;
			} else if (sa == 'center') {
				x = -w2;
				x0 = w2;
			} else {
				x0 = w;
			}
			_.T.textBaseline('middle');
			if (ta == 'right') {
				_.T.textAlign('left');
				tx = ts;
			} else {
				_.T.textAlign('right');
				tx = -ts;
			}
		}
		/**
		 * 将上述的配置部分转移到config中?
		 */

		/**
		 * individuation text?
		 */
		_.T.textFont(_.get('fontStyle'));

		_.items.each(function(item) {
			if (_.get('scale_enable'))
				_.T.line(item.x + x, item.y + y, item.x + x0, item.y + y0, _.get('scale_size'), _.get('scale_color'), false);

			_.T.fillText(item.text, item.textX + tx, item.textY + ty, false, _.get('color'), 'lr', _.get('text_height'));
		});

	},
	doConfig : function() {
		iChart.Scale.superclass.doConfig.call(this);
		iChart.Assert.isNumber(this.get('distance'), 'distance');

		var _ = this._(), customL = _.get('labels').length, min_s = _.get('min_scale'), max_s = _.get('max_scale'), s_space = _.get('scale_space'), e_scale = _.get('end_scale'), start_scale = _.get('start_scale');

		if (customL > 0) {
			_.number = customL - 1;
		} else {
			iChart.Assert.isTrue(iChart.isNumber(max_s) || iChart.isNumber(e_scale), 'max_scale&end_scale');
			/**
			 * end_scale must greater than maxScale
			 */
			if (!e_scale || e_scale < max_s) {
				e_scale = _.push('end_scale', iChart.ceil(max_s));
			}

			/**
			 * startScale must less than minScale
			 */
			if (start_scale > min_s) {
				_.push('start_scale', iChart.floor(min_s));
			}

			if (s_space && s_space < e_scale - start_scale) {
				_.push('scale_share', (e_scale - start_scale) / s_space);
			}

			/**
			 * value of each scale
			 */
			if (!s_space || s_space > e_scale - start_scale) {
				s_space = _.push('scale', (e_scale - start_scale) / _.get('scale_share'));
			}

			_.number = _.get('scale_share');

			if (s_space < 1 && _.get('decimalsnum') == 0) {
				var dec = s_space;
				while (dec < 1) {
					dec *= 10;
					_.push('decimalsnum', _.get('decimalsnum') + 1);
				}
			}

		}

		/**
		 * the real distance of each scale
		 */
		_.push('distanceOne', _.get('valid_distance') / _.number);

		var text, maxwidth = 0, x, y;

		_.T.textFont(_.get('fontStyle'));
		_.push('which', _.get('which').toLowerCase());
		_.isH = _.get('which') == 'h';
		/**
		 * 有效宽度仅对水平刻度有效、有效高度仅对垂直高度有效
		 */
		for ( var i = 0; i <= _.number; i++) {
			text = customL ? _.get('labels')[i] : (s_space * i + start_scale).toFixed(_.get('decimalsnum'));
			x = _.isH ? _.get('valid_x') + i * _.get('distanceOne') : _.x;
			y = _.isH ? _.y : _.get('valid_y') + _.get('distance') - i * _.get('distanceOne');
			_.items.push(iChart.merge({
				text : text,
				x : x,
				y : y,
				textX : x,
				textY : y
			}, _.fireEvent(_, 'parseText', [text, x, y, i])));
			maxwidth = Math.max(maxwidth, _.T.measureText(text));
		}

		/**
		 * what does follow code doing?
		 */
		_.left = _.right = _.top = _.bottom = 0;
		var ts = _.get('text_space'), ta = _.get('textAlign'), sa = _.get('scaleAlign'), w = _.get('scale_width'), w2 = w / 2;

		if (_.isH) {
			if (sa == 'top') {
				_.top = w;
			} else if (sa == 'center') {
				_.top = w2;
			} else {
				_.top = 0;
			}
			_.bottom = w - _.top;
			if (ta == 'top') {
				_.top += _.get('text_height') + ts;
			} else {
				_.bottom += _.get('text_height') + ts;
			}
		} else {
			if (sa == 'left') {
				_.left = w;
			} else if (sa == 'center') {
				_.left = w2;
			} else {
				_.left = 0;
			}
			_.right = w - _.left;
			if (ta == 'left') {
				_.left += maxwidth + ts;
			} else {
				_.right += maxwidth + ts;
			}
		}
	}
});

/**
 * @end
 */
iChart.Coordinate = {
	coordinate_ : function() {
		var _ = this._();
		if (_.is3D()) {
			_.push('coordinate.xAngle_', _.get('xAngle_'));
			_.push('coordinate.yAngle_', _.get('yAngle_'));
			/**
			 * the Coordinate' Z is same as long as the column's
			 */
			_.push('coordinate.zHeight', _.get('zHeight') * _.get('bottom_scale'));
			return new iChart.Coordinate3D(iChart.apply({
				scale : {
					position : _.get('scaleAlign'),
					scaleAlign : _.get('scaleAlign'),
					max_scale : _.get('maxValue'),
					min_scale : _.get('minValue')
				}
			}, _.get('coordinate')), _);
		} else {
			return new iChart.Coordinate2D(iChart.apply({
				scale : {
					position : _.get('scaleAlign'),
					max_scale : _.get('maxValue'),
					min_scale : _.get('minValue')
				}
			}, _.get('coordinate')), _);
		}
	},
	coordinate : function() {
		/**
		 * calculate chart's measurement
		 */
		var _ = this._(), f = 0.9, _w = _.get('client_width'), _h = _.get('client_height'), w = _.pushIf('coordinate.width', Math.floor(_w * f)), h = _.pushIf('coordinate.height', Math.floor(_h * f));

		if (h > _h) {
			h = _.push('coordinate.height', _h * f);
		}
		if (w > _w) {
			w = _.push('coordinate.width', _w * f);
		}
		if (_.is3D()) {
			h = _.push('coordinate.height', h - (_.get('coordinate.pedestal_height') || 22) - (_.get('coordinate.board_deep') || 20));
		}

		/**
		 * calculate chart's alignment
		 */
		if (_.get('align') == 'left') {
			_.push('originx', _.get('l_originx'));
		} else if (_.get('align') == 'right') {
			_.push('originx', _.get('r_originx') - w);
		} else {
			_.push('originx', _.get('centerx') - w / 2);
		}

		_.push('originx', _.get('originx') + _.get('offsetx'));
		_.push('originy', _.get('centery') - h / 2 + _.get('offsety'));

		if (!_.get('coordinate.valid_width') || _.get('coordinate.valid_width') > w) {
			_.push('coordinate.valid_width', w);
		}

		if (!_.get('coordinate.valid_height') || _.get('coordinate.valid_height') > h) {
			_.push('coordinate.valid_height', h);
		}

		/**
		 * originx for short
		 */
		_.x = _.get('originx');
		/**
		 * originy for short
		 */
		_.y = _.get('originy');

		_.push('coordinate.originx', _.x);
		_.push('coordinate.originy', _.y);
	}
}
/**
 * @overview this component use for abc
 * @component#iChart.Coordinate2D
 * @extend#iChart.Component
 */
iChart.Coordinate2D = iChart
		.extend(
				iChart.Component,
				{
					configure : function() {
						/**
						 * invoked the super class's configurationuration
						 */
						iChart.Coordinate2D.superclass.configure.apply(this, arguments);

						/**
						 * indicate the component's type
						 */
						this.type = 'coordinate2d';

						this.set({
							/**
							 * @inner {Number}
							 */
							sign_size : 12,
							/**
							 * @inner {Number}
							 */
							sign_space : 5,
							/**
							 * @cfg {Array} the option for scale.For details see <link>iChart.Scale</link>
							 */
							scale : [],
							/**
							 * @cfg {Number} Specifies the valid width,less than the width of coordinate.(default same as width)
							 */
							valid_width : undefined,
							/**
							 * @cfg {Number} Specifies the valid height,less than the height of coordinate.(default same as height)
							 */
							valid_height : undefined,
							/**
							 * @cfg {Number} Specifies the linewidth of the grid.(default to 1)
							 */
							grid_line_width : 1,
							/**
							 * @cfg {String} Specifies the color of the grid.(default to '#dbe1e1')
							 */
							grid_color : '#dbe1e1',
							/**
							 * @cfg {Boolean} True to display grid line.(default to true)
							 */
							gridlinesVisible : true,
							/**
							 * @cfg {Boolean} indicate whether the grid is accord with scale,on the premise of grids is not specify. this just give a convenient way bulid grid for default.and actual value depend on scale's scale2grid
							 */
							scale2grid : true,
							/**
							 * @cfg {Object} this is grid config for custom.there has two valid property horizontal and vertical.the property's sub property is: way:the manner calculate grid-line (default to 'share_alike') Available property are:
							 * @Option share_alike
							 * @Option given_value value: when property way apply to 'share_alike' this property mean to the number of grid's line. when apply to 'given_value' this property mean to the distance each grid line(unit:pixel) . code will like: { horizontal: {
							 *         way:'share_alike', value:10 } vertical: { way:'given_value', value:40 } }
							 */
							grids : undefined,
							/**
							 * @cfg {Boolean} If True the grid line will be ignored when gird and axis overlap.(default to true)
							 */
							ignoreOverlap : true,
							/**
							 * @cfg {Boolean} If True the grid line will be ignored when gird and coordinate's edge overlap.(default to false)
							 */
							ignoreEdge : false,
							/**
							 * @inner {String} Specifies the label on x-axis
							 */
							xlabel : '',
							/**
							 * @inner {String} Specifies the label on y-axis
							 */
							ylabel : '',
							/**
							 * @cfg {Boolean} If True the grid background-color will be alternate.(default to true)
							 */
							alternate_color : true,
							/**
							 * @cfg {String} Specifies the direction apply alternate color.(default to 'v')Available value are:
							 * @Option 'h' horizontal
							 * @Option 'v' vertical
							 */
							alternate_direction : 'v',
							/**
							 * @cfg {float(0.01 - 0.5)} Specifies the factor make color dark alternate_color,relative to background-color,the bigger the value you set,the larger the color changed.(defaults to '0.01')
							 */
							alternate_color_factor : 0.01,
							/**
							 * @cfg {Object} Specifies config crosshair.(default enable to false).For details see <link>iChart.CrossHair</link> Note:this has a extra property named 'enable',indicate whether crosshair available(default to false)
							 */
							crosshair : {
								enable : false
							},
							/**
							 * @cfg {Number} Required,Specifies the width of this coordinate.(default to undefined)
							 */
							width : undefined,
							/**
							 * @cfg {Number} Required,Specifies the height of this coordinate.(default to undefined)
							 */
							height : undefined,
							/**
							 * @cfg {Number}Override the default as -1 to make sure it at the bottom.(default to -1)
							 */	
							z_index : -1,
							/**
							 * @cfg {Object} Specifies style for axis of this coordinate. Available property are:
							 * @Option enable {Boolean} True to display the axis.(default to true)
							 * @Option color {String} Specifies the color of each axis.(default to '#666666')
							 * @Option width {Number/Array} Specifies the width of each axis, If given the a array,there must be have have 4 element, like this:[1,0,0,1](top-right-bottom-left).(default to 1)
							 */
							axis : {
								enable : true,
								color : '#666666',
								width : 1
							}
						});

						this.registerEvent();

						this.scale = [];
						this.gridlines = [];
					},
					getScale : function(p) {
						for ( var i = 0; i < this.scale.length; i++) {
							var k = this.scale[i];
							if (k.get('position') == p) {
								return {
									start : k.get('start_scale'),
									end : k.get('end_scale'),
									distance : k.get('end_scale') - k.get('start_scale')
								};
							}
						}
						return {
							start : 0,
							end : 0,
							distance : 0
						};
					},
					isEventValid : function(e) {
						return {
							valid : e.x > this.x && e.x < (this.x + this.get('width')) && e.y < this.y + this.get('height') && e.y > this.y
						};
					},
					doDraw : function(opts) {
						var _ = this._();
						_.T.box(_.x, _.y, _.get('width'), _.get('height'), 0, _.get('f_color'));
						if (_.get('alternate_color')) {
							var x, y, f = false, axis = [0, 0, 0, 0], c = iChart.dark(_.get('background_color'), _.get('alternate_color_factor'));
							if (_.get('axis.enable')) {
								axis = _.get('axis.width');
							}
						}

						var glw = _.get('grid_line_width'), v = _.get('alternate_direction') == 'v';

						_.gridlines.each(function(g) {
							g.x1 = Math.round(g.x1);
							g.y1 = Math.round(g.y1);
							g.x2 = Math.round(g.x2);
							g.y2 = Math.round(g.y2);
							if (_.get('alternate_color')) {
								if (f) {
									if (v)
										_.T.box(g.x1 + axis[3], g.y1 + glw, g.x2 - g.x1 - axis[3] - axis[1], y - g.y1 - glw, 0, c);
									else
										_.T.box(x + glw, g.y2 + axis[0], g.x1 - x, g.y1 - g.y2 - axis[0] - axis[2], 0, c);
								}
								x = g.x1;
								y = g.y1;
								f = !f;
							}
							_.T.line(g.x1, g.y1, g.x2, g.y2, glw, _.get('grid_color'));
						});

						_.T.box(_.x, _.y, _.get('width'), _.get('height'), _.get('axis'), false, _.get('shadow'));

						_.scale.each(function(s) {
							s.draw()
						});
					},
					doConfig : function() {
						iChart.Coordinate2D.superclass.doConfig.call(this);

						var _ = this._();

						iChart.Assert.isNumber(_.get('width'), 'width');
						iChart.Assert.isNumber(_.get('height'), 'height');

						/**
						 * this element not atomic because it is a container,so this is a particular case.
						 */
						_.atomic = false;

						/**
						 * apply the gradient color to f_color
						 */
						if (_.get('gradient') && iChart.isString(_.get('f_color'))) {
							_.push('f_color', _.T.avgLinearGradient(_.x, _.y, _.x, _.y + _.get('height'), [_.get('dark_color'), _.get('light_color')]));
						}

						if (_.get('axis.enable')) {
							var aw = _.get('axis.width');
							if (!iChart.isArray(aw))
								_.push('axis.width', [aw, aw, aw, aw]);
						}

						if (_.get('crosshair.enable')) {
							_.push('crosshair.wrap', _.container.shell);
							_.push('crosshair.height', _.get('height'));
							_.push('crosshair.width', _.get('width'));
							_.push('crosshair.top', _.y);
							_.push('crosshair.left', _.x);

							_.crosshair = new iChart.CrossHair(_.get('crosshair'), _);
						}

						var jp, cg = !!(_.get('gridlinesVisible') && _.get('grids')), // custom grid
					hg = cg && !!_.get('grids.horizontal'), vg = cg && !!_.get('grids.vertical'), h = _.get('height'), w = _.get('width'), vw = _.get('valid_width'), vh = _.get('valid_height'), k2g = _.get('gridlinesVisible') && _.get('scale2grid') && !(hg && vg), sw = (w - vw) / 2, sh = (h - vh) / 2, axis = _
							.get('axis.width');

					if (!iChart.isArray(_.get('scale'))) {
						if (iChart.isObject(_.get('scale')))
							_.push('scale', [_.get('scale')]);
						else
							_.push('scale', []);
					}
					_.get('scale').each(function(kd, i) {
						jp = kd['position'];
						jp = jp || 'left';
						jp = jp.toLowerCase();
						kd['originx'] = _.x;
						kd['originy'] = _.y;
						kd['valid_x'] = _.x + sw;
						kd['valid_y'] = _.y + sh;
						kd['position'] = jp;
						// calculate coordinate,direction,distance
							if (jp == 'top') {
								kd['which'] = 'h';
								kd['distance'] = w;
								kd['valid_distance'] = vw;
							} else if (jp == 'right') {
								kd['which'] = 'v';
								kd['distance'] = h;
								kd['valid_distance'] = vh;
								kd['originx'] += w;
								kd['valid_x'] += vw;
							} else if (jp == 'bottom') {
								kd['which'] = 'h';
								kd['distance'] = w;
								kd['valid_distance'] = vw;
								kd['originy'] += h;
								kd['valid_y'] += vh;
							} else {
								kd['which'] = 'v';
								kd['distance'] = h;
								kd['valid_distance'] = vh;
							}
							_.scale.push(new iChart.Scale(kd, _.container));
						}, _);

					var iol = _.push('ignoreOverlap', _.get('ignoreOverlap') && _.get('axis.enable') || _.get('ignoreEdge'));

					if (iol) {
						if (_.get('ignoreEdge')) {
							var ignoreOverlap = function(w, x, y) {
								return w == 'v' ? (y == _.y) || (y == _.y + h) : (x == _.x) || (x == _.x + w);
							}
						} else {
							var ignoreOverlap = function(wh, x, y) {
								return wh == 'v' ? (y == _.y && axis[0] > 0) || (y == (_.y + h) && axis[2] > 0) : (x == _.x && axis[3] > 0) || (x == (_.x + w) && axis[1] > 0);
							}
						}
					}

					if (k2g) {
						var scale, x, y, p;
						for ( var i = 0; i < _.scale.length; i++) {
							scale = _.scale[i];
							p = scale.get('position');
							// disable,given specfiy grid will ignore scale2grid
							if (iChart.isFalse(scale.get('scale2grid')) || hg && scale.get('which') == 'v' || vg && scale.get('which') == 'h') {
								continue;
							}
							x = y = 0;
							if (p == 'top') {
								y = h;
							} else if (p == 'right') {
								x = -w;
							} else if (p == 'bottom') {
								y = -h;
							} else {
								x = w;
							}
							for ( var j = 0; j < scale.items.length; j++) {
								if (iol)
									if (ignoreOverlap.call(_, scale.get('which'), scale.items[j].x, scale.items[j].y))
										continue;
								_.gridlines.push({
									x1 : scale.items[j].x,
									y1 : scale.items[j].y,
									x2 : scale.items[j].x + x,
									y2 : scale.items[j].y + y
								});
							}
						}
					}
					if (vg) {
						var gv = _.get('grids.vertical');
						iChart.Assert.gtZero(gv['value'], 'value');
						var d = w / gv['value'], n = gv['value'];
						if (gv['way'] == 'given_value') {
							n = d;
							d = gv['value'];
							d = d > w ? w : d;
						}

						for ( var i = 0; i <= n; i++) {
							if (iol)
								if (ignoreOverlap.call(_, 'h', _.x + i * d, _.y))
									continue;
							_.gridlines.push({
								x1 : _.x + i * d,
								y1 : _.y,
								x2 : _.x + i * d,
								y2 : _.y + h
							});
						}
					}
					if (hg) {
						var gh = _.get('grids.horizontal');
						iChart.Assert.gtZero(gh['value'], 'value');
						var d = h / gh['value'], n = gh['value'];
						if (gh['way'] == 'given_value') {
							n = d;
							d = gh['value'];
							d = d > h ? h : d;
						}

						for ( var i = 0; i <= n; i++) {
							if (iol)
								if (ignoreOverlap.call(_, 'v', _.x, _.y + i * d))
									continue;
							_.gridlines.push({
								x1 : _.x,
								y1 : _.y + i * d,
								x2 : _.x + w,
								y2 : _.y + i * d
							});
						}
					}
				}
				});
/**
 * @end
 */
/**
 * @overview this component use for abc
 * @component#iChart.Coordinate3D
 * @extend#iChart.Coordinate2D
 */
iChart.Coordinate3D = iChart.extend(iChart.Coordinate2D, {
	configure : function() {
		/**
		 * invoked the super class's configurationuration
		 */
		iChart.Coordinate3D.superclass.configure.apply(this, arguments);

		/**
		 * indicate the component's type
		 */
		this.type = 'coordinate3d';
		this.dimension = iChart._3D;

		this.set({
			/**
			 * @cfg {Number} Three-dimensional rotation X in degree(angle).socpe{0-90},Normally, this will accord with the chart.(default to 60)
			 */
			xAngle : 60,
			/**
			 * @cfg {Number} Three-dimensional rotation Y in degree(angle).socpe{0-90},Normally, this will accord with the chart.(default to 20)
			 */
			yAngle : 20,
			xAngle_ : undefined,
			yAngle_ : undefined,
			/**
			 * @cfg {Number} Required,Specifies the z-axis deep of this coordinate,Normally, this will given by chart.(default to 0)
			 */
			zHeight : 0,
			/**
			 * @cfg {Number} Specifies pedestal height of this coordinate.(default to 22)
			 */
			pedestal_height : 22,
			/**
			 * @cfg {Number} Specifies board deep of this coordinate.(default to 20)
			 */
			board_deep : 20,
			/**
			 * @cfg {Boolean} Override the default as true
			 */
			gradient : true,
			/**
			 * @cfg {float} Override the default as 0.18.
			 */
			color_factor : 0.18,
			/**
			 * @cfg {Boolean} Override the default as true.
			 */
			ignoreEdge : true,
			/**
			 * @cfg {Boolean} Override the default as false.
			 */
			alternate_color : false,
			/**
			 * @cfg {String} Override the default as '#7a8d44'.
			 */
			grid_color : '#7a8d44',
			/**
			 * @cfg {String} Override the default as '#d6dbd2'.
			 */
			background_color : '#d6dbd2',
			/**
			 * @cfg {Number} Override the default as 4.
			 */
			shadow_offsetx : 4,
			/**
			 * @cfg {Number} Override the default as 2.
			 */
			shadow_offsety : 2,
			/**
			 * @cfg {Array} Specifies the style of board(wall) of this coordinate. the array length must be 3 and each object option has two property. Available property are:
			 * @Option color the color of wall
			 * @Option alpha the opacity of wall
			 */
			wall_style : [],
			/**
			 * @cfg {Boolean} Override the default as axis.enable = false.
			 */
			axis : {
				enable : false
			}
		});
	},
	doDraw : function(opts) {
		var _ = this._(), w = _.get('width'), h = _.get('height'), xa = _.get('xAngle_'), ya = _.get('yAngle_'), zh = _.get('zHeight'), offx = xa * zh, offy = ya * zh;
		/**
		 * bottom
		 */
		_.T.cube3D(_.x, _.y + h + _.get('pedestal_height'), xa, ya, false, w, _.get('pedestal_height'), zh * 3 / 2, _.get('axis.enable'), _.get('axis.width'), _.get('axis.color'), _.get('bottom_style'));
		/**
		 * board_style
		 */
		_.T.cube3D(_.x + _.get('board_deep') * xa, _.y + h - _.get('board_deep') * ya, xa, ya, false, w, h, zh, _.get('axis.enable'), _.get('axis.width'), _.get('axis.color'), _.get('board_style'));

		_.T.cube3D(_.x, _.y + h, xa, ya, false, w, h, zh, _.get('axis.enable'), _.get('axis.width'), _.get('axis.color'), _.get('wall_style'));
		
		_.gridlines.each(function(g) {
			_.T.line(g.x1, g.y1, g.x1 + offx, g.y1 - offy, _.get('grid_line_width'), _.get('grid_color'));
			_.T.line(g.x1 + offx, g.y1 - offy, g.x2 + offx, g.y2 - offy, _.get('grid_line_width'), _.get('grid_color'));
		});

		_.scale.each(function(s) {
			s.draw()
		});
	},
	doConfig : function() {
		iChart.Coordinate3D.superclass.doConfig.call(this);

		var _ = this._(), ws = _.get('wall_style'), bg = _.get('background_color'), c = iChart.dark(bg, 0.1), c1 = _.get('dark_color'), h = _.get('height'), w = _.get('width');

		if (ws.length < 3) {
			ws = _.push('wall_style', [{
				color : c
			}, {
				color : bg
			}, {
				color : c
			}]);
		}

		var dark = ws[0].color;

		/**
		 * 右-前
		 */
		_.push('bottom_style', [{
			shadow : _.get('shadow')
		}, false, false, {
			color : dark
		}, {
			color : dark
		}, {
			color : dark
		}]);

		/**
		 * 上-右
		 */
		_.push('board_style', [false, false, false, {
			color : dark
		}, {
			color : bg
		}, false]);
		/**
		 * 下底-底-左-右-上-前
		 */
		if (_.get('gradient')) {
			var offx = _.get('xAngle_') * _.get('zHeight'), offy = _.get('yAngle_') * _.get('zHeight'), bs = _.get('bottom_style');
			if (iChart.isString(ws[0].color)) {
				ws[0].color = _.T.avgLinearGradient(_.x, _.y + h, _.x + w, _.y + h, [dark, c1]);
			}
			if (iChart.isString(ws[1].color)) {
				ws[1].color = _.T.avgLinearGradient(_.x + offx, _.y - offy, _.x + offx, _.y + h - offy, [c1, _.get('light_color')]);
			}
			if (iChart.isString(ws[2].color)) {
				ws[2].color = _.T.avgLinearGradient(_.x, _.y, _.x, _.y + h, [bg, c1]);
			}
			bs[5].color = _.T.avgLinearGradient(_.x, _.y + h, _.x, _.y + h + _.get('pedestal_height'), [bg, c]);
		}

	}
});
/*
 * @end
 */

