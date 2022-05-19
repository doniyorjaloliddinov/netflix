// SELECTOR FUNCTION
let $ = function (selector, node = document) {
    return node.querySelector(selector);
}

// CREATE ELEMENT FUNCTION 
let $$ = function(elementName, textCont, classNam, href, src) {
    let element =  document.createElement(elementName);
    element.textContent = textCont;
    element.className = classNam;
    element.href = href;
    element.src = src;
    return element;
}