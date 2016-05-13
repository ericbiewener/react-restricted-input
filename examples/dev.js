import React from 'react'
import {render} from 'react-dom'
import RestrictedInput from '../src/index.js'

const PositiveIntegerInput = props => (
	<RestrictedInput 
		illegal={/\s/g}
		{...props}
	/>
)

const MyStatefulComponent = React.createClass({
	getInitialState: function() {
		return { inputValue: '' }
	},

	onChange: function(e) {
		this.setState({ inputValue: e.target.value })
	},

	render: function() {
		return 	<PositiveIntegerInput 
					value={this.state.inputValue}
					onChange={this.onChange}
					placeholder='Positive integers only'
				/>
	}
})

render(
	<MyStatefulComponent />,
	document.getElementById('root')
)