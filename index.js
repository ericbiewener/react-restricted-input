import React from 'react'


export const RestrictedCharacterInput = React.createClass({
	onChange: function(e) {
		let {onChange} = this.props,
		    value = e.target.value
		    
		if (value.search(this.props.regex) === -1) {
			this.props.onChange(e, value)
		}
		else {
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

			this.el.style.textShadow = '#000'
			this.el.style.color = 'transparent'

			setTimeout(() => {
				this.el.selectionStart = this.cachedSelection.start
				this.el.selectionEnd = this.cachedSelection.end
				this.el.style.color = ''
				this.el.style.textShadow = ''
			})
		}
	},

	cacheSelection: function() {
		// Cache selection on keydown since it will have changed by the time onChange is called
		this.cachedSelection = {
			start: this.el.selectionStart,
			end: this.el.selectionEnd
		}
	},

	render: function() {
		let {value, onFocus, onBlur, className} = this.props

		return <input 
					type='text'
					className= {className}
					value={value !== undefined ? value : ''} 
					onChange={this.onChange} 
					onFocus={onFocus}
					onBlur={onBlur}
					onKeyDown={this.cacheSelection}
					ref={el => this.el = el}
				/>
	}
})

export const PositiveIntegerInput = (props) => (
	<RestrictedCharacterInput
		regex={/\D/g}
		{...props}
	/>
)