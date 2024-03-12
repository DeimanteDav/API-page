export default function pagination(pageName, response, page, itemsPerPage, itemsWrap) {
    const total = response.headers.get('X-Total-Count')
    const pageNumber = total/itemsPerPage

    let div = document.createElement('div');
    div.classList.add('pagination-div')


    let firstPage = document.createElement('a');
    let lastPage = document.createElement('a');

    let previous = document.createElement('a');
    let next = document.createElement('a');
    if (page != 1) {
        firstPage.textContent = 'First page'
        firstPage.href = `./${pageName}.html?page=1&items-per-page=${itemsPerPage}`
        firstPage.classList.add('pagination')

        previous.textContent = 'Previous'
        previous.href = `./${pageName}.html?page=${Number(page)-1}&items-per-page=${itemsPerPage}`
        previous.classList.add('pagination')
    }

    if (page != pageNumber) {
        lastPage.textContent = 'Last page'
        lastPage.href = `./${pageName}.html?page=${pageNumber}&items-per-page=${itemsPerPage}`
        lastPage.classList.add('pagination')

        next.textContent = 'Next'
        next.href = `./${pageName}.html?page=${Number(page)+1}&items-per-page=${itemsPerPage}`
        next.classList.add('pagination')
    }
    
    div.append(firstPage, previous)
    

    for (let i = 1; i <= pageNumber; i++) {
        let pageNum = document.createElement('a');
        pageNum.textContent = i
        pageNum.href = `./${pageName}.html?page=${i}&items-per-page=${itemsPerPage}`
        pageNum.classList.add('pagination')

        if (page == i) {
            pageNum.classList.add('selected-page')
        }
        div.append(pageNum)
    }
   
    if (total > 10) {
        itemsWrap.before(paginationSelect(itemsPerPage, total))
        div.append(next, lastPage)
        
        return div
    } else {
        return ''
    }
}

function paginationSelect(itemsPerPage, total) {
    let itemsDiv = document.createElement('div');
    itemsDiv.classList.add('pagination-select-div')

    let text = document.createElement('p');
    text.textContent = 'per page'
    let selectItemsPerPage = document.createElement('select');


    function itemsPerP(numArr) {
        let itemsPerPageData = numArr
        itemsPerPageData.forEach(perPage => {
            let option = document.createElement('option');
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

    console.log(itemsDiv);
    return itemsDiv    
}