(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var RestrictedInput = _react2.default.createClass({
	displayName: 'RestrictedInput',

	onChange: function onChange(e) {
		var _this = this;

		var onChange = this.props.onChange;
		var value = e.target.value;

		if (value.search(this.props.regex) === -1) {
			this.props.onChange(e, value);
		} else {
			// Yes, this is a hack. But it's where the magic happens.
			// When "rejecting" the change (by not propagating it further), React seems
			// to lose track of where the caret should be, causing the caret to jump to
			// the end of the input. We therefore reset the text selection to what it was
			// before (having cached it in the keyDown event, which fires prior to onChange).
			// We also temporarily hide the caret/selection via the color/textShadow trick
			// to prevent the user from seeing the caret jump to the end and then back.
			// This has the sideffect of causing the text to blink, but that's far less
			// jarring than a jumping caret, and one could even argue that it's a good thing
			// because it helps indicate to the user that their input was incorrect, as
			// opposed to just ignored.

			this.el.style.textShadow = '#000';
			this.el.style.color = 'transparent';

			setTimeout(function () {
				_this.el.selectionStart = _this.cachedSelection.start;
				_this.el.selectionEnd = _this.cachedSelection.end;
				_this.el.style.color = '';
				_this.el.style.textShadow = '';
			});
		}
	},

	onKeyDown: function onKeyDown(e) {
		// Cache selection on keydown since it will have changed by the time onChange is called
		this.cachedSelection = {
			start: this.el.selectionStart,
			end: this.el.selectionEnd
		};

		if (this.props.onKeyDown) this.props.onKeyDown(e);
	},

	render: function render() {
		var _this2 = this;

		var _props = this.props;
		var onChange = _props.onChange;
		var onKeyDown = _props.onKeyDown;

		var rest = _objectWithoutProperties(_props, ['onChange', 'onKeyDown']);

		return _react2.default.createElement('input', _extends({
			type: 'text',
			onChange: this.onChange,
			onKeyDown: this.onKeyDown,
			ref: function ref(el) {
				return _this2.el = el;
			}
		}, rest));
	}
});

exports.default = RestrictedInput;

},{"react":1}]},{},[2]);
