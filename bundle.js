/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	
	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	document.write("It works.");

	var KanbanBox = function (_React$Component) {
	  _inherits(KanbanBox, _React$Component);

	  function KanbanBox() {
	    _classCallCheck(this, KanbanBox);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(KanbanBox).call(this));

	    _this.state = {
	      toDo: [],
	      doing: [],
	      done: []
	    };
	    _this.onMongoData = _this.onMongoData.bind(_this);
	    return _this;
	  }

	  _createClass(KanbanBox, [{
	    key: "onMongoData",
	    value: function onMongoData(data) {
	      var parsedMongoData = JSON.parse(data.currentTarget.response);

	      var toDoData = parsedMongoData.filter(function (el, index) {
	        return parsedMongoData[index].status === "to-do";
	      });

	      var doingData = parsedMongoData.filter(function (el, index) {
	        return parsedMongoData[index].status === "doing";
	      });

	      var doneData = parsedMongoData.filter(function (el, index) {
	        return parsedMongoData[index].status === "done";
	      });

	      this.setState({
	        toDo: toDoData,
	        doing: doingData,
	        done: doneData
	      });
	    }
	  }, {
	    key: "loadDataFromMongo",
	    value: function loadDataFromMongo() {
	      var req = new XMLHttpRequest();
	      req.addEventListener('load', this.onMongoData);
	      req.open('GET', '/tasks');
	      req.send();
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.loadDataFromMongo();
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { id: "mainDiv" },
	        React.createElement(
	          "div",
	          { id: "titleDiv" },
	          React.createElement(
	            "h1",
	            null,
	            "KanbanBox"
	          )
	        ),
	        React.createElement(
	          "h3",
	          null,
	          this.state.toDo.name
	        ),
	        React.createElement(ToDoBox, { data: this.state.toDo }),
	        React.createElement(DoingBox, { data: this.state.doing }),
	        React.createElement(DoneBox, { data: this.state.done })
	      );
	    }
	  }]);

	  return KanbanBox;
	}(React.Component);

	;

	KanbanBox.propTypes = {
	  data: React.PropTypes.array
	};

	KanbanBox.defaultProps = {
	  data: []
	};

	var ToDoBox = function (_React$Component2) {
	  _inherits(ToDoBox, _React$Component2);

	  function ToDoBox() {
	    _classCallCheck(this, ToDoBox);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ToDoBox).apply(this, arguments));
	  }

	  _createClass(ToDoBox, [{
	    key: "render",
	    value: function render() {
	      var taskListNode = this.props.data.map(function (taskDataItem) {
	        return React.createElement(TaskFormatter, { name: taskDataItem.name, author: taskDataItem.author, key: taskDataItem._id, uniqueID: taskDataItem._id, description: taskDataItem.description });
	      });
	      return React.createElement(
	        "div",
	        { id: "colOne" },
	        React.createElement(
	          "div",
	          null,
	          "To Do Tasks",
	          taskListNode
	        )
	      );
	    }
	  }]);

	  return ToDoBox;
	}(React.Component);

	;

	var DoingBox = function (_React$Component3) {
	  _inherits(DoingBox, _React$Component3);

	  function DoingBox() {
	    _classCallCheck(this, DoingBox);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(DoingBox).apply(this, arguments));
	  }

	  _createClass(DoingBox, [{
	    key: "render",
	    value: function render() {
	      var taskListNode = this.props.data.map(function (taskDataItem) {
	        console.log(taskDataItem);
	        return React.createElement(TaskFormatter, { name: taskDataItem.name, author: taskDataItem.author, uniqueID: taskDataItem._id, description: taskDataItem.description });
	      });
	      return React.createElement(
	        "div",
	        { id: "colTwo" },
	        React.createElement(
	          "div",
	          null,
	          "Doing Tasks",
	          taskListNode
	        )
	      );
	    }
	  }]);

	  return DoingBox;
	}(React.Component);

	var DoneBox = function (_React$Component4) {
	  _inherits(DoneBox, _React$Component4);

	  function DoneBox() {
	    _classCallCheck(this, DoneBox);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(DoneBox).apply(this, arguments));
	  }

	  _createClass(DoneBox, [{
	    key: "render",
	    value: function render() {
	      var taskListNode = this.props.data.map(function (taskDataItem) {
	        return React.createElement(TaskFormatter, { uniqueID: taskDataItem._id, name: taskDataItem.name, author: taskDataItem.author, description: taskDataItem.description });
	      });
	      return React.createElement(
	        "div",
	        { id: "colThree" },
	        React.createElement(
	          "div",
	          null,
	          "Done Tasks",
	          taskListNode
	        )
	      );
	    }
	  }]);

	  return DoneBox;
	}(React.Component);

	var TaskFormatter = function (_React$Component5) {
	  _inherits(TaskFormatter, _React$Component5);

	  function TaskFormatter() {
	    _classCallCheck(this, TaskFormatter);

	    var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(TaskFormatter).call(this));

	    _this5.doingStatus = _this5.doingStatus.bind(_this5);
	    _this5.doneStatus = _this5.doneStatus.bind(_this5);
	    _this5.toDoStatus = _this5.toDoStatus.bind(_this5);
	    return _this5;
	  }

	  _createClass(TaskFormatter, [{
	    key: "doingStatus",
	    value: function doingStatus() {
	      console.log(this.props);
	      var req = new XMLHttpRequest();
	      req.open('PUT', "/tasks/" + this.props.uniqueID);
	      req.setRequestHeader("Content-Type", "application/json");
	      req.send(JSON.stringify({
	        "name": "" + this.props.name,
	        "author": "" + this.props.author,
	        "description": "" + this.props.description,
	        "status": "doing"
	      }));
	    }
	  }, {
	    key: "doneStatus",
	    value: function doneStatus() {
	      console.log(this.props);
	      var req = new XMLHttpRequest();
	      req.open('PUT', "/tasks/" + this.props.uniqueID);
	      req.setRequestHeader("Content-Type", "application/json");
	      req.send(JSON.stringify({
	        "name": "" + this.props.name,
	        "author": "" + this.props.author,
	        "description": "" + this.props.description,
	        "status": "done"
	      }));
	    }
	  }, {
	    key: "toDoStatus",
	    value: function toDoStatus() {
	      console.log(this.props);
	      var req = new XMLHttpRequest();
	      req.open('PUT', "/tasks/" + this.props.uniqueID);
	      req.setRequestHeader("Content-Type", "application/json");
	      req.send(JSON.stringify({
	        "name": "" + this.props.name,
	        "author": "" + this.props.author,
	        "description": "" + this.props.description,
	        "status": "to-do"
	      }));
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { className: "taskItem" },
	        React.createElement(
	          "h3",
	          null,
	          this.props.name
	        ),
	        React.createElement(
	          "p",
	          null,
	          this.props.author
	        ),
	        React.createElement(
	          "p",
	          null,
	          this.props.description
	        ),
	        React.createElement(
	          "button",
	          { onClick: this.doingStatus },
	          " Doing "
	        ),
	        React.createElement(
	          "button",
	          { onClick: this.doneStatus },
	          " Done "
	        ),
	        React.createElement(
	          "button",
	          { onClick: this.toDoStatus },
	          " To Do"
	        )
	      );
	    }
	  }]);

	  return TaskFormatter;
	}(React.Component);

	;

	ReactDOM.render(React.createElement(KanbanBox, null), document.getElementById('content'));

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/******/(function (modules) {
		// webpackBootstrap
		/******/ // The module cache
		/******/var installedModules = {};

		/******/ // The require function
		/******/function __webpack_require__(moduleId) {

			/******/ // Check if module is in cache
			/******/if (installedModules[moduleId])
				/******/return installedModules[moduleId].exports;

			/******/ // Create a new module (and put it into the cache)
			/******/var module = installedModules[moduleId] = {
				/******/exports: {},
				/******/id: moduleId,
				/******/loaded: false
				/******/ };

			/******/ // Execute the module function
			/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

			/******/ // Flag the module as loaded
			/******/module.loaded = true;

			/******/ // Return the exports of the module
			/******/return module.exports;
			/******/
		}

		/******/ // expose the modules object (__webpack_modules__)
		/******/__webpack_require__.m = modules;

		/******/ // expose the module cache
		/******/__webpack_require__.c = installedModules;

		/******/ // __webpack_public_path__
		/******/__webpack_require__.p = "";

		/******/ // Load entry module and return exports
		/******/return __webpack_require__(0);
		/******/
	})(
	/************************************************************************/
	/******/[
	/* 0 */
	/***/function (module, exports, __webpack_require__) {

		(function webpackMissingModule() {
			throw new Error("Cannot find module \"./entry.jsx\"");
		})();
		__webpack_require__(1);
		module.exports = __webpack_require__(2);

		/***/
	},
	/* 1 */
	/***/function (module, exports) {

		'use strict';

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _possibleConstructorReturn(self, call) {
			if (!self) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
			}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		}

		document.write("It works.");

		var KanbanBox = function (_React$Component) {
			_inherits(KanbanBox, _React$Component);

			function KanbanBox() {
				_classCallCheck(this, KanbanBox);

				var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(KanbanBox).call(this));

				_this.state = {
					toDo: [],
					doing: [],
					done: []
				};
				_this.onMongoData = _this.onMongoData.bind(_this);
				return _this;
			}

			_createClass(KanbanBox, [{
				key: "onMongoData",
				value: function onMongoData(data) {
					var parsedMongoData = JSON.parse(data.currentTarget.response);

					var toDoData = parsedMongoData.filter(function (el, index) {
						return parsedMongoData[index].status === "to-do";
					});

					var doingData = parsedMongoData.filter(function (el, index) {
						return parsedMongoData[index].status === "doing";
					});

					var doneData = parsedMongoData.filter(function (el, index) {
						return parsedMongoData[index].status === "done";
					});

					this.setState({
						toDo: toDoData,
						doing: doingData,
						done: doneData
					});
				}
			}, {
				key: "loadDataFromMongo",
				value: function loadDataFromMongo() {
					var req = new XMLHttpRequest();
					req.addEventListener('load', this.onMongoData);
					req.open('GET', '/tasks');
					req.send();
				}
			}, {
				key: "componentDidMount",
				value: function componentDidMount() {
					this.loadDataFromMongo();
				}
			}, {
				key: "render",
				value: function render() {
					return React.createElement("div", { id: "mainDiv" }, React.createElement("div", { id: "titleDiv" }, React.createElement("h1", null, "KanbanBox")), React.createElement("h3", null, this.state.toDo.name), React.createElement(ToDoBox, { data: this.state.toDo }), React.createElement(DoingBox, { data: this.state.doing }), React.createElement(DoneBox, { data: this.state.done }));
				}
			}]);

			return KanbanBox;
		}(React.Component);

		;

		KanbanBox.propTypes = {
			data: React.PropTypes.array
		};

		KanbanBox.defaultProps = {
			data: []
		};

		var ToDoBox = function (_React$Component2) {
			_inherits(ToDoBox, _React$Component2);

			function ToDoBox() {
				_classCallCheck(this, ToDoBox);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(ToDoBox).apply(this, arguments));
			}

			_createClass(ToDoBox, [{
				key: "render",
				value: function render() {
					var taskListNode = this.props.data.map(function (taskDataItem) {
						return React.createElement(TaskFormatter, { name: taskDataItem.name, author: taskDataItem.author, key: taskDataItem._id, uniqueID: taskDataItem._id, description: taskDataItem.description });
					});
					return React.createElement("div", { id: "colOne" }, React.createElement("div", null, "To Do Tasks", taskListNode));
				}
			}]);

			return ToDoBox;
		}(React.Component);

		;

		var DoingBox = function (_React$Component3) {
			_inherits(DoingBox, _React$Component3);

			function DoingBox() {
				_classCallCheck(this, DoingBox);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(DoingBox).apply(this, arguments));
			}

			_createClass(DoingBox, [{
				key: "render",
				value: function render() {
					var taskListNode = this.props.data.map(function (taskDataItem) {
						console.log(taskDataItem);
						return React.createElement(TaskFormatter, { name: taskDataItem.name, author: taskDataItem.author, uniqueID: taskDataItem._id, description: taskDataItem.description });
					});
					return React.createElement("div", { id: "colTwo" }, React.createElement("div", null, "Doing Tasks", taskListNode));
				}
			}]);

			return DoingBox;
		}(React.Component);

		var DoneBox = function (_React$Component4) {
			_inherits(DoneBox, _React$Component4);

			function DoneBox() {
				_classCallCheck(this, DoneBox);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(DoneBox).apply(this, arguments));
			}

			_createClass(DoneBox, [{
				key: "render",
				value: function render() {
					var taskListNode = this.props.data.map(function (taskDataItem) {
						return React.createElement(TaskFormatter, { uniqueID: taskDataItem._id, name: taskDataItem.name, author: taskDataItem.author, description: taskDataItem.description });
					});
					return React.createElement("div", { id: "colThree" }, React.createElement("div", null, "Done Tasks", taskListNode));
				}
			}]);

			return DoneBox;
		}(React.Component);

		var TaskFormatter = function (_React$Component5) {
			_inherits(TaskFormatter, _React$Component5);

			function TaskFormatter() {
				_classCallCheck(this, TaskFormatter);

				var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(TaskFormatter).call(this));

				_this5.doingStatus = _this5.doingStatus.bind(_this5);
				_this5.doneStatus = _this5.doneStatus.bind(_this5);
				_this5.toDoStatus = _this5.toDoStatus.bind(_this5);
				return _this5;
			}

			_createClass(TaskFormatter, [{
				key: "doingStatus",
				value: function doingStatus() {
					console.log(this.props);
					var req = new XMLHttpRequest();
					req.open('PUT', "/tasks/" + this.props.uniqueID);
					req.setRequestHeader("Content-Type", "application/json");
					req.send(JSON.stringify({
						"name": "" + this.props.name,
						"author": "" + this.props.author,
						"description": "" + this.props.description,
						"status": "doing"
					}));
				}
			}, {
				key: "doneStatus",
				value: function doneStatus() {
					console.log(this.props);
					var req = new XMLHttpRequest();
					req.open('PUT', "/tasks/" + this.props.uniqueID);
					req.setRequestHeader("Content-Type", "application/json");
					req.send(JSON.stringify({
						"name": "" + this.props.name,
						"author": "" + this.props.author,
						"description": "" + this.props.description,
						"status": "done"
					}));
				}
			}, {
				key: "toDoStatus",
				value: function toDoStatus() {
					console.log(this.props);
					var req = new XMLHttpRequest();
					req.open('PUT', "/tasks/" + this.props.uniqueID);
					req.setRequestHeader("Content-Type", "application/json");
					req.send(JSON.stringify({
						"name": "" + this.props.name,
						"author": "" + this.props.author,
						"description": "" + this.props.description,
						"status": "to-do"
					}));
				}
			}, {
				key: "render",
				value: function render() {
					return React.createElement("div", { className: "taskItem" }, React.createElement("h3", null, this.props.name), React.createElement("p", null, this.props.author), React.createElement("p", null, this.props.description), React.createElement("button", { onClick: this.doingStatus }, " Doing "), React.createElement("button", { onClick: this.doneStatus }, " Done "), React.createElement("button", { onClick: this.toDoStatus }, " To Do"));
				}
			}]);

			return TaskFormatter;
		}(React.Component);

		;

		ReactDOM.render(React.createElement(KanbanBox, null), document.getElementById('content'));

		/***/
	},
	/* 2 */
	/***/function (module, exports) {

		"use strict";

		var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
			return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
		} : function (obj) {
			return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
		};

		/******/(function (modules) {
			// webpackBootstrap
			/******/ // The module cache
			/******/var installedModules = {};

			/******/ // The require function
			/******/function __webpack_require__(moduleId) {

				/******/ // Check if module is in cache
				/******/if (installedModules[moduleId])
					/******/return installedModules[moduleId].exports;

				/******/ // Create a new module (and put it into the cache)
				/******/var module = installedModules[moduleId] = {
					/******/exports: {},
					/******/id: moduleId,
					/******/loaded: false
					/******/ };

				/******/ // Execute the module function
				/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

				/******/ // Flag the module as loaded
				/******/module.loaded = true;

				/******/ // Return the exports of the module
				/******/return module.exports;
				/******/
			}

			/******/ // expose the modules object (__webpack_modules__)
			/******/__webpack_require__.m = modules;

			/******/ // expose the module cache
			/******/__webpack_require__.c = installedModules;

			/******/ // __webpack_public_path__
			/******/__webpack_require__.p = "";

			/******/ // Load entry module and return exports
			/******/return __webpack_require__(0);
			/******/
		})(
		/************************************************************************/
		/******/[
		/* 0 */
		/***/function (module, exports, __webpack_require__) {

			(function webpackMissingModule() {
				throw new Error("Cannot find module \"./entry.jsx\"");
			})();
			__webpack_require__(1);
			(function webpackMissingModule() {
				throw new Error("Cannot find module \"bundle.js\"");
			})();

			/***/
		},
		/* 1 */
		/***/function (module, exports) {

			'use strict';

			var _createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
					}
				}return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
				};
			}();

			function _classCallCheck(instance, Constructor) {
				if (!(instance instanceof Constructor)) {
					throw new TypeError("Cannot call a class as a function");
				}
			}

			function _possibleConstructorReturn(self, call) {
				if (!self) {
					throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
			}

			function _inherits(subClass, superClass) {
				if (typeof superClass !== "function" && superClass !== null) {
					throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
				}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
			}

			document.write("It works.");

			var KanbanBox = function (_React$Component) {
				_inherits(KanbanBox, _React$Component);

				function KanbanBox() {
					_classCallCheck(this, KanbanBox);

					var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(KanbanBox).call(this));

					_this.state = {
						toDo: [],
						doing: [],
						done: []
					};
					_this.onMongoData = _this.onMongoData.bind(_this);
					return _this;
				}

				_createClass(KanbanBox, [{
					key: "onMongoData",
					value: function onMongoData(data) {
						var parsedMongoData = JSON.parse(data.currentTarget.response);

						var toDoData = parsedMongoData.filter(function (el, index) {
							return parsedMongoData[index].status === "to-do";
						});

						var doingData = parsedMongoData.filter(function (el, index) {
							return parsedMongoData[index].status === "doing";
						});

						var doneData = parsedMongoData.filter(function (el, index) {
							return parsedMongoData[index].status === "done";
						});

						this.setState({
							toDo: toDoData,
							doing: doingData,
							done: doneData
						});
					}
				}, {
					key: "loadDataFromMongo",
					value: function loadDataFromMongo() {
						var req = new XMLHttpRequest();
						req.addEventListener('load', this.onMongoData);
						req.open('GET', '/tasks');
						req.send();
					}
				}, {
					key: "componentDidMount",
					value: function componentDidMount() {
						this.loadDataFromMongo();
					}
				}, {
					key: "render",
					value: function render() {
						return React.createElement("div", { id: "mainDiv" }, React.createElement("div", { id: "titleDiv" }, React.createElement("h1", null, "KanbanBox")), React.createElement("h3", null, this.state.toDo.name), React.createElement(ToDoBox, { data: this.state.toDo }), React.createElement(DoingBox, { data: this.state.doing }), React.createElement(DoneBox, { data: this.state.done }));
					}
				}]);

				return KanbanBox;
			}(React.Component);

			;

			KanbanBox.propTypes = {
				data: React.PropTypes.array
			};

			KanbanBox.defaultProps = {
				data: []
			};

			var ToDoBox = function (_React$Component2) {
				_inherits(ToDoBox, _React$Component2);

				function ToDoBox() {
					_classCallCheck(this, ToDoBox);

					return _possibleConstructorReturn(this, Object.getPrototypeOf(ToDoBox).apply(this, arguments));
				}

				_createClass(ToDoBox, [{
					key: "render",
					value: function render() {
						var taskListNode = this.props.data.map(function (taskDataItem) {
							return React.createElement(TaskFormatter, { name: taskDataItem.name, author: taskDataItem.author, key: taskDataItem._id, uniqueID: taskDataItem._id, description: taskDataItem.description });
						});
						return React.createElement("div", { id: "colOne" }, React.createElement("div", null, "To Do Tasks", taskListNode));
					}
				}]);

				return ToDoBox;
			}(React.Component);

			;

			var DoingBox = function (_React$Component3) {
				_inherits(DoingBox, _React$Component3);

				function DoingBox() {
					_classCallCheck(this, DoingBox);

					return _possibleConstructorReturn(this, Object.getPrototypeOf(DoingBox).apply(this, arguments));
				}

				_createClass(DoingBox, [{
					key: "render",
					value: function render() {
						var taskListNode = this.props.data.map(function (taskDataItem) {
							console.log(taskDataItem);
							return React.createElement(TaskFormatter, { name: taskDataItem.name, author: taskDataItem.author, uniqueID: taskDataItem._id, description: taskDataItem.description });
						});
						return React.createElement("div", { id: "colTwo" }, React.createElement("div", null, "Doing Tasks", taskListNode));
					}
				}]);

				return DoingBox;
			}(React.Component);

			var DoneBox = function (_React$Component4) {
				_inherits(DoneBox, _React$Component4);

				function DoneBox() {
					_classCallCheck(this, DoneBox);

					return _possibleConstructorReturn(this, Object.getPrototypeOf(DoneBox).apply(this, arguments));
				}

				_createClass(DoneBox, [{
					key: "render",
					value: function render() {
						var taskListNode = this.props.data.map(function (taskDataItem) {
							return React.createElement(TaskFormatter, { uniqueID: taskDataItem._id, name: taskDataItem.name, author: taskDataItem.author, description: taskDataItem.description });
						});
						return React.createElement("div", { id: "colThree" }, React.createElement("div", null, "Done Tasks", taskListNode));
					}
				}]);

				return DoneBox;
			}(React.Component);

			var TaskFormatter = function (_React$Component5) {
				_inherits(TaskFormatter, _React$Component5);

				function TaskFormatter() {
					_classCallCheck(this, TaskFormatter);

					var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(TaskFormatter).call(this));

					_this5.doingStatus = _this5.doingStatus.bind(_this5);
					_this5.doneStatus = _this5.doneStatus.bind(_this5);
					_this5.toDoStatus = _this5.toDoStatus.bind(_this5);
					return _this5;
				}

				_createClass(TaskFormatter, [{
					key: "doingStatus",
					value: function doingStatus() {
						console.log(this.props);
						var req = new XMLHttpRequest();
						req.open('PUT', "/tasks/" + this.props.uniqueID);
						req.setRequestHeader("Content-Type", "application/json");
						req.send(JSON.stringify({
							"name": "" + this.props.name,
							"author": "" + this.props.author,
							"description": "" + this.props.description,
							"status": "doing"
						}));
					}
				}, {
					key: "doneStatus",
					value: function doneStatus() {
						console.log(this.props);
						var req = new XMLHttpRequest();
						req.open('PUT', "/tasks/" + this.props.uniqueID);
						req.setRequestHeader("Content-Type", "application/json");
						req.send(JSON.stringify({
							"name": "" + this.props.name,
							"author": "" + this.props.author,
							"description": "" + this.props.description,
							"status": "done"
						}));
					}
				}, {
					key: "toDoStatus",
					value: function toDoStatus() {
						console.log(this.props);
						var req = new XMLHttpRequest();
						req.open('PUT', "/tasks/" + this.props.uniqueID);
						req.setRequestHeader("Content-Type", "application/json");
						req.send(JSON.stringify({
							"name": "" + this.props.name,
							"author": "" + this.props.author,
							"description": "" + this.props.description,
							"status": "to-do"
						}));
					}
				}, {
					key: "render",
					value: function render() {
						return React.createElement("div", { className: "taskItem" }, React.createElement("h3", null, this.props.name), React.createElement("p", null, this.props.author), React.createElement("p", null, this.props.description), React.createElement("button", { onClick: this.doingStatus }, " Doing "), React.createElement("button", { onClick: this.doneStatus }, " Done "), React.createElement("button", { onClick: this.toDoStatus }, " To Do"));
					}
				}]);

				return TaskFormatter;
			}(React.Component);

			;

			ReactDOM.render(React.createElement(KanbanBox, null), document.getElementById('content'));

			/***/
		}
		/******/]);

		/***/
	}
	/******/]);

/***/ }
/******/ ]);