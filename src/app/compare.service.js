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
var CompareService = /** @class */ (function() {
	function CompareService() {
		this.count = 0;
	}
	CompareService.prototype.compareShell = function(value) {
		var count = value;
		return compare;
		function compare(obj, arr, price) {
			for (var key in obj) {
				if (typeof obj[key] != 'object') {
					for (var j = 0; j < arr.length; j++) {
						if (obj[key] == arr[j] && typeof arr[j] != 'object') ++count;
					}
				} else {
					compare(obj[key], arr);
				}
				if (key == 'price' && price.minPrice != undefined) {
					if (obj[key] >= price.minPrice && obj[key] <= price.maxPrice) ++count;
				}
			}
			if (count == arr.length + 1) return obj;
			else return;
		}
	};
	CompareService = __decorate(
		[
			core_1.Injectable({
				providedIn: 'root',
			}),
		],
		CompareService
	);
	return CompareService;
})();
exports.CompareService = CompareService;
