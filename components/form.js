import { createElement, createListItem } from "../functions.js";
import editingButtonGroup from "./editingButtonGroup.js";

export default function form(handleSubmit, elements) {
    const form = createElement('form', 'needs-validation')
    const updatedData = {}
    form.setAttribute('novalidate', true)
    
    elements.forEach(element => {
        const inputElement = element.querySelector('input, textarea, select');
        
        if (inputElement) {
            updatedData[inputElement.id] = inputElement.value;

            inputElement.addEventListener('input', () => {
                updatedData[inputElement.id] = inputElement.value;
            });
        }

        form.append(element);
    })

    form.append(editingButtonGroup())


    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        if (!form.checkValidity()) {
            e.stopPropagation()
        } else {
            handleSubmit(updatedData)
        }
  
        form.classList.add('was-validated')
    })


    return form
}