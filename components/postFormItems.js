import { createElement } from "../functions.js"
import formInputItem from "./formInputItem.js"

export default function postFormItems(users, userId, title, paragraph) {
    const titleWrapper = formInputItem('Title', 'title', 'text', title)

    const userWrapper = createElement('div', 'my-3')
    const userLabel = createElement('label', 'form-label', 'User')
    userLabel.for = 'user'
    const userSelect = createElement('select', 'form-select')
    userSelect.id = 'user'
    userSelect.required = true

    const defaultOption = createElement('option', '', 'Open to select user')
    userSelect.append(defaultOption)

    users.forEach(user => {
        const userOption = createElement('option', '', user.name)
        userOption.value = user.id

        if (Number(userId) === user.id) {
            userOption.selected = true
        }
        userSelect.append(userOption)
    });

    userWrapper.append(userLabel, userSelect)

    const paragraphWrapper = createElement('div', 'my-3')

    const paragraphLabel = createElement('label', 'form-label', 'Paragraph')
    paragraphLabel.for = 'paragraph'
    const paragraphElement = createElement('textarea', 'form-control', paragraph)
    paragraphElement.id = 'paragraph'
    paragraphElement.required = true

    paragraphWrapper.append(paragraphLabel, paragraphElement)


    return [titleWrapper, userWrapper, paragraphWrapper]
}