import { createElement } from "../functions.js";

export default function form(formTitle, handleSubmit, data) {
    const form = createElement('form')
    const fieldset = createElement('fieldset')
    const legend = createElement('legend', '', formTitle)
    const updatedData = {}

    fieldset.append(legend)
    form.append(fieldset)

    data.forEach(item => {
        const {value, label, id, type, textarea} = item
        updatedData[id] = value

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

        input.addEventListener('input', () => {
            updatedData[id] = input.value;
        });
        itemWrapper.append(labelEl, input)
    
        fieldset.append(itemWrapper)
    });


    const buttonsWrapper = createElement('div')
    const saveBtn = createElement('button', 'btn btn-primary mx-2 btn-sm', 'Save') 
    saveBtn.type = 'submit'    
    const cancelBtn = createElement('button', 'btn btn-secondary mx-2 btn-sm', 'Cancel')
    cancelBtn.type = 'button'

    buttonsWrapper.append(cancelBtn, saveBtn)
    fieldset.append(buttonsWrapper)

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        handleSubmit(updatedData)
    })

    cancelBtn.addEventListener('click', (e) => {
        history.back()
    })

    return form
}