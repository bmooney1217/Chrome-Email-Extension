/* document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', onclick, false)

    function onclick() {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, 'heyeyeyye', setCount)
        })
    }

    function setCount(res) {
        const div = document.createElement('div')
        div.textContent = `${res.count} bears`
        document.body.appendChild(div)
    }
}, false) */

/* chrome.runtime.onMessage.addListener(function (response, send, sendResponse) {
    alert(response)
}) */






/* const re = new RegExp(' ', 'gi');
const matches = document.documentElement.innerHTML.match(re)
//alert(matches.length)

chrome.runtime.sendMessage(matches.length, function (response) {

    var yup = new RegExp(response.selectedWord, 'gi');
    var matching = document.documentElement.innerHTML.match(yup)


    chrome.runtime.sendMessage(matching.length, function () {


    })


}) */











