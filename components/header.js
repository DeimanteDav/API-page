import { createElement, navigation } from '../functions.js'

export default function header() {
    let header = createElement('nav', 'navbar navbar-expand-lg border-bottom')
    // header.dataset.bsTheme = 'dark'
    let nav = navigation()

    // header.style.marginBottom = '30px'
    header.innerHTML = `
        <div class="container-fluid">
            <a class="navbar-brand" href="index.html">Home</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                ${nav}
            </div>
        </div>
    `
   document.body.prepend(header)
}