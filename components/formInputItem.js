import { createElement } from "../functions.js"

export default function formInputItem(labelText, elementId, type, inputValue, required) {
    const wrapper = createElement('div', 'my-3')

    const label = createElement('label', 'form-label', labelText)
    label.for = elementId
    const input = createElement('input', 'form-control')
    inputValue && (input.value = inputValue)

    input.type = type
    input.id = elementId
    required && (input.required = true)

    wrapper.append(label, input)

    return wrapper
}