'use strict';
var __decorate =
	(this && this.__decorate) ||
	function(decorators, target, key, desc) {
		var c = arguments.length,
			r =
				c < 3
					? target
					: desc === null
					? (desc = Object.getOwnPropertyDescriptor(target, key))
					: desc,
			d;
		if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
			r = Reflect.decorate(decorators, target, key, desc);
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i]))
					r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
exports.__esModule = true;
var core_1 = require('@angular/core');
var GetBicyclesService = /** @class */ (function() {
	function GetBicyclesService(http) {
		this.http = http;
		this.url = 'http://demo4164358.mockable.io/bicycles';
		this.arrBicycles = [];
	}
	GetBicyclesService.prototype.request = function() {
		return this.http.get(this.url);
	};
	GetBicyclesService.prototype.getBicycles = function() {
		var _this = this;
		this.request().subscribe(function(value) {
			for (var key in value) {
				_this.arrBicycles.push(value[key]);
			}
			_this.arrBicycles.forEach(function(i) {
				i.price = i.price.replace(' ', '');
				i.price = +i.price;
				i.brand = i.name.split(' ')[0];
			});
		});
	};
	GetBicyclesService = __decorate(
		[
			core_1.Injectable({
				providedIn: 'root',
			}),
		],
		GetBicyclesService
	);
	return GetBicyclesService;
})();
exports.GetBicyclesService = GetBicyclesService;
