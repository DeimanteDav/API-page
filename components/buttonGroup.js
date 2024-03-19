import { createElement } from "../functions.js"
import toast from "./toast.js"

export default function buttonGroup(deleteText, editHref) {
    const buttonsWrapper = createElement('div')
    const deleteBtn = createElement('button', 'btn btn-danger mx-2 btn-sm', 'Delete')
    deleteBtn.type = 'button'

    const editBtn = createElement('a', 'btn btn-secondary mx-2 btn-sm', 'Edit')
    editBtn.href = editHref

    buttonsWrapper.append(deleteBtn, editBtn)


    deleteBtn.addEventListener('click', (e) => {
        toast(deleteText, 'confirm')
    })

    return buttonsWrapper
}