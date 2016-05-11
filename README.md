# React Restricted Character Input
Use any regex you want to restrict the characters that can be entered into an text input.

## Why do I need this?
While preventing illegal characters from being entered into a text input is traditionally a fairly straightforward task in JavaScript, the way React manages user interaction with inputs causes the carat to jump to the end of the input field if your code does not allow the field to update. This package solves this problem in the following way:

1. Caches and then restores the carat position if the caracter entered does not match the given regex restriction.
2. Temporarily hides the carat to make #1 invisible to the user. Without hiding the carat, the user would see it jump to the end and then back. Hiding the carat is achieved by temporarily setting the text color to transparent. This causes the text in the input field to briefly flicker, but one could argue that this is actually good UX because it indicates to the user that their keypress was indeed registered. An alternative approach to hiding the carat could be to briefly clone and hide the element, thus eliminating the text flicker. But this package doesn't do that :)

## Use
The following example creates a reusable component that only allows positive integers to be entered.

```
import RestrictedCharacterInput from 'react-restricted-character-input'

export const PositiveIntegerInput = () => (
    <RestrictedCharacterInput
        regex={/\D/g}
    />
)
```