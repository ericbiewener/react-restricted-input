'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RestrictedInput = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RestrictedInput = exports.RestrictedInput = _react2.default.createClass({
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

	cacheSelection: function cacheSelection() {
		// Cache selection on keydown since it will have changed by the time onChange is called
		this.cachedSelection = {
			start: this.el.selectionStart,
			end: this.el.selectionEnd
		};
	},

	render: function render() {
		var _this2 = this;

		var _props = this.props;
		var value = _props.value;
		var onFocus = _props.onFocus;
		var onBlur = _props.onBlur;
		var className = _props.className;


		return _react2.default.createElement('input', {
			type: 'text',
			className: className,
			value: value !== undefined ? value : '',
			onChange: this.onChange,
			onFocus: onFocus,
			onBlur: onBlur,
			onKeyDown: this.cacheSelection,
			ref: function ref(el) {
				return _this2.el = el;
			}
		});
	}
});