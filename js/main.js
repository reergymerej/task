var jg = {
	uid: function () {},

	/**
	* @param {Object/Array} iterable
	* @param {Function} callback - field, index, iterable - return false to break
	*/
	each: function (iterable, callback) {
		var i,
			isObject = typeof iterable === 'object' && iterable.constructor.name !== 'Array',
			max = iterable.length,
			quit;

		if (isObject) {
			for (i in iterable) {
				if (iterable.hasOwnProperty(i)) {
					quit = callback(iterable[i], i, iterable);
					if (quit === false) {
						break;
					}
				}
			}
		} else {
			for (i = 0; i < max; i++) {
				quit = callback(iterable[i], i, iterable);
				if (quit === false) {
					break;
				}
			}
		}
	},

	/**
	* @param {String[]} fields
	* @param {Object} config
	*/
	required: function (fields, config) {
		var missing;

		jg.each(fields, function (field, index, collection) {
			missing = config[field] === undefined;

			if (missing) {
				console.error('missing required config: "' + field + '"');
			}
			return !missing;
		});
	},

	/**
	* @cfg taskGroupId, name
	*/
	Task: function (config) {
		jg.required(['taskGroupId', 'name'], config);
		this.taskGroupId = config.taskGroupId;
		this.name = config.name;
		this.id = jg.uid.prototype.get();
		this.start = undefined;
		this.end = undefined;
	},
	TaskGroup: function (name) {
		this.id = jg.uid.prototype.get();
		this.name = name;
		this.tasks = [];
	}
};

jg.uid.prototype.id = Date.now();
jg.uid.prototype.get = function () {
	return this.id++;
};

var t = new jg.Task({
	taskGroupId: 111,
	name: 'zzz'
});
localStorage.setItem(t.id, JSON.stringify(t));