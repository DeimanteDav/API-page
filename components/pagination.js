import { createElement } from "../functions.js";

export default function pagination(pageName, response, page, itemsPerPage, itemsWrap) {
    const total = response.headers.get('X-Total-Count')
    const pageNumber = total/itemsPerPage

    const paginationWrapper = createElement('nav')
    const paginationList = createElement('ul', 'pagination justify-content-center')

    paginationWrapper.append(paginationList)


    const firstPageItem = createElement('li', 'page-item')
    const firstPageLink = createElement('a', 'page-link');
    firstPageItem.append(firstPageLink)

    const lastPageItem = createElement('li', 'page-item')
    const lastPageLink = createElement('a', 'page-link');
    lastPageItem.append(lastPageLink)

    const previousPageItem = createElement('li', 'page-item')
    const previousPageLink = createElement('a', 'page-link');
    previousPageItem.append(previousPageLink)

    const nextPageItem = createElement('li', 'page-item')
    const nextPageLink = createElement('a', 'page-link');
    nextPageItem.append(nextPageLink)

    if (page != 1) {
        firstPageLink.textContent = 'First page'
        firstPageLink.href = `./${pageName}.html?page=1&items-per-page=${itemsPerPage}`
        // firstPageLink.classList.add('pagination')

        previousPageLink.textContent = 'Previous'
        previousPageLink.href = `./${pageName}.html?page=${Number(page)-1}&items-per-page=${itemsPerPage}`
        // previousPageLink.classList.add('pagination')
    paginationList.append(firstPageItem, previousPageItem)

    }

    if (page != pageNumber) {
        lastPageLink.textContent = 'Last page'
        lastPageLink.href = `./${pageName}.html?page=${pageNumber}&items-per-page=${itemsPerPage}`
        // lastPageLink.classList.add('pagination')
        nextPageLink.textContent = 'Next'
        nextPageLink.href = `./${pageName}.html?page=${Number(page)+1}&items-per-page=${itemsPerPage}`

        // nextPageLink.classList.add('pagination')
    }
    
    

    for (let i = 1; i <= pageNumber; i++) {
        const pageNumItem = createElement('li', 'page-item')
        const pageNumLink = createElement('a', 'page-link');
        pageNumLink.textContent = i
        pageNumLink.href = `./${pageName}.html?page=${i}&items-per-page=${itemsPerPage}`
        pageNumLink.classList.add('pagination')

        if (page == i) {
            // pageNumLink.classList.add('selected-page')
        }

        pageNumItem.append(pageNumLink)
        paginationList.append(pageNumItem)
    }
   
    if (total > 10) {
        itemsWrap.before(paginationSelect(itemsPerPage, total))
        paginationList.append(nextPageItem, lastPageItem)
        
        return paginationWrapper
    } else {
        return ''
    }
}

function paginationSelect(itemsPerPage, total) {
    const itemsDiv = createElement('div');
    // itemsDiv.classList.add('pagination-select-div')

    const text = createElement('p');
    text.textContent = 'Per page'
    const selectItemsPerPage = createElement('select', 'form-select form-select-sm w-25');


    function itemsPerP(numArr) {
        const itemsPerPageData = numArr
        itemsPerPageData.forEach(perPage => {
            const option = createElement('option');
            option.value = perPage
            option.textContent = perPage
            selectItemsPerPage.append(option)
        });
    }
    if (total >= 1000) {
        itemsPerP([10, 50, 100, 200])
    } else if (total >= 500) {
        itemsPerP([10, 25, 50, 100])
    } else if (total >=200) {
        itemsPerP([10, 20, 50])
    } else if (total >= 50) {
        itemsPerP([10, 20])
    } else {
        itemsPerP([10])
    }

    selectItemsPerPage.value = itemsPerPage
    selectItemsPerPage.addEventListener('change', function (e) {
        let urlParams = new URLSearchParams(document.location.search)
        urlParams.set('items-per-page', this.value)
        document.location.search = `?${urlParams.toString()}`
    })
    itemsDiv.append(text, selectItemsPerPage)

    return itemsDiv    
}