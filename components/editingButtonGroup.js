import { createElement } from "../functions.js"

export default function editingButtonGroup() {
    const buttonsWrapper = createElement('div', 'col-12 mt-5')
    const submitBtn = createElement('button', 'btn btn-primary mx-2 btn-sm', 'Save') 
    submitBtn.type = 'submit'    
    const goBackBtn = createElement('button', 'btn btn-secondary mx-2 btn-sm', 'Go back')
    goBackBtn.type = 'button'
    buttonsWrapper.append(goBackBtn, submitBtn)
    
    goBackBtn.addEventListener('click', (e) => {
        history.back()
    })

    return buttonsWrapper
}