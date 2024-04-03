import { createElement } from "../functions.js";

export default function toast({text, confirmation}) {
    const toastContainer = createElement('div', 'toast-container position-fixed bottom-0 end-0 p-3')

    const toast = createElement('div', `toast align-items-center bg-light`)
    toast.id = 'liveToast'
    toast.role = 'alert'
    toast.ariaLive = 'assertive'
    toast.ariaAtomic = 'true'

    const toastBody = createElement('div', 'toast-body d-flex flex-column')
    const toastText1 = createElement('span', '', text)
    const toastText2 = createElement('span', 'text-danger', `This is a Mock up API. Changes won't be saved`)
    toastBody.append(toastText1, toastText2)

    if (confirmation) {
        const buttonsWrapper = createElement('div', 'mt-2 pt-2 border-top')

        const cancelBtn = createElement('button', 'btn btn-secondary btn-sm mx-2', 'Cancel')
        cancelBtn.type = 'button'
        cancelBtn.dataset.bsDismiss = 'toast'

        const yesBtn = createElement('button', 'btn btn-primary btn-sm mx-2', 'Yes')
        yesBtn.type = 'button'

        buttonsWrapper.append(cancelBtn, yesBtn)

        toastBody.append(buttonsWrapper)
        toast.append(toastBody)


        yesBtn.addEventListener('click', (e) => {
            e.preventDefault()
            confirmation.handler(confirmation.params && confirmation.params)
            toastContainer.remove()
        })
    } else {
        const toastFlex = createElement('div', 'd-flex')
        const cancelBtn = createElement('button', 'btn-close me-2 m-auto')
        cancelBtn.type = 'button'
        cancelBtn.dataset.bsDismiss = 'toast'
        cancelBtn.ariaLabel = 'Close'
        
        toastFlex.append(toastBody, cancelBtn)
        toast.append(toastFlex)
    }

    toastContainer.append(toast)

    document.body.append(toastContainer)

    const myToast = new bootstrap.Toast(toast);
    myToast.show()

}
