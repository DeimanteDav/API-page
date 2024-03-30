import { createElement } from "../functions.js"
import toast from "./toast.js"

export default function buttonGroup({deleteInfo, editHref, editInfo}) {
    const buttonsWrapper = createElement('div', 'my-3')
    const deleteBtn = createElement('button', 'btn btn-danger mx-2 btn-sm', 'Delete')
    deleteBtn.type = 'button'

    const editBtn = createElement('a', 'btn btn-secondary mx-2 btn-sm', 'Edit')

    if (editHref) {
        editBtn.href = editHref
    } else if (editInfo) {
        const {handler, params} = editInfo
        editBtn.addEventListener('click', (e) => {
            e.preventDefault()
            handler(...params)
        })
    }
    
    buttonsWrapper.append(deleteBtn, editBtn)

    deleteBtn.addEventListener('click', (e) => {
        const {text, handler} = deleteInfo
        toast({text, confirmation: {handler}})
    })

    return buttonsWrapper
} 