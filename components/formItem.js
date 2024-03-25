export default function formItem({label, id, value, type}) {
    const itemWrapper = createElement('div', 'mb-3')
    const labelEl = createElement('label', 'form-label', label)
    labelEl.for = id

    let input
    if (textarea) {
        input = createElement('textarea', 'form-control')
        input.style.height = '120px'
    } else {
        input = createElement('input', 'form-control')
        input.type = type
    }
    input.value = value
    input.id = id
    itemWrapper.append(labelEl, input)

    return itemWrapper
}