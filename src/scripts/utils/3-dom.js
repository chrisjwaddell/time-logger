/* ******************************************************************************
 * DOM
 *******************************************************************************/


function appendChild(el, child) {
    return el.appendChild(child);
}

function createElementAtt(parent, element, cls, att, text) {
    var el = document.createElement(element)
    // debugger

    if (text) {
        el.textContent = text;
    }

    cls.forEach((item) => {
        el.classList.add(item)
    })

    att.forEach((i) => {
        el.setAttribute(i[0], i[1])
    })

    return (parent && appendChild(parent, el)) || el;
}


// Good for multi-select lists with an 'Unselect' button
// The class that is used to signify or highlight that an
// item is selected is 'selectclass'
function listUnselectAllItems(listelement, selectclass) {
    [].forEach.call(listelement.children, (cv) => {
        cv.classList.remove(selectclass)
    })
}


function listNothingSelected(parentUL, selectcase) {
    return [].every.call(parentUL.children, (cv) => cv.classList.contains(selectcase) === false)
}

// selectclass is the class that is used to show
// that the item is selected
function listFindSelected(parentUL, selectclass) {
    return [].findIndex.call(parentUL.children, (cv) => cv.classList.contains(selectclass))
}


function listIndexText(parentUL, index) {
    return parentUL.children[index] ? parentUL.children[index].textContent : ''
}


export {
    appendChild,
    createElementAtt,
    listUnselectAllItems,
    listNothingSelected,
    listFindSelected,
    listIndexText
}
