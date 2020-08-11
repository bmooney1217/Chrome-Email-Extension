//import swal from 'sweetalert';


var query = ''
var emailArray = []
let link = ''
var hostname = ''


//Searches each possible email combination in new tab
searchGoogle = function (word) {
    chrome.tabs.query({ windowType: 'normal' }, function (tabs) {
        chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
            function (tabs) {
                query = word.selectionText;
                emailArray = setEmailFormats(word)
                link = document.createElement('a');
                link.href = tabs[0].url;
                hostname = link.hostname;
                hostname = setHostNameFormat(hostname)

                for (let i = 0; i < emailArray.length; ++i) {
                    fullEmail = emailArray[i] + '@' + hostname
                    chrome.tabs.create({ url: "https://www.google.com/search?q=" + '"' + fullEmail + '"' + "&rlz=1C1SQJL_enUS858US864&oq=hey&aqs=chrome.0.69i59l2j0j46j0j46l2j0.402j1j9&sourceid=chrome&ie=UTF-8" });

                    /* chrome.runtime.onMessage.addListener(function (response, send, sendResponse) {
                        //alert(response)
                        sendResponse({ selectedWord: fullEmail });
                        chrome.runtime.onMessage.addListener(function (message, send, sendResponse) {

                            alert(message + " " + emailArray[i])
                        })
                        return true

                    }) */


                    /* chrome.tabs.query({}, function (tabs) {
                        chrome.tabs.remove(tabs[tabs.length - 1].id);

                    }); */
                    //alert("Searched for:  " + fullEmail)

                    var proceed = confirm(
                        "Searched for:  " + fullEmail + " \n" +
                        ' - Press OK to Search a diferent email combinaion' + "\n" +
                        ' - Press Cancel if you found the email address'
                    );
                    if (!proceed) {

                        break

                    }
                    else {
                        chrome.tabs.query({}, function (tabs) {
                            chrome.tabs.remove(tabs[tabs.length - 1].id);

                        });


                    }


                }
            }
        );

    });

};

//Takes query and lists possible email combinations
setEmailFormats = function (word) {
    var query = word.selectionText;
    var array = []
    nameLength = query.split(" ").length;

    if (nameLength === 2) {
        query = query.toLowerCase()

        var firstNameLastName = query.split(" ").join("")
        var firstName = query.split(' ')[0];
        var lastName = query.split(' ')[1];
        var firstNameDotLastName = firstName + '.' + lastName;
        var firstLetterLastName = query.split(' ')[0].charAt(0) + lastName
        var firstNameLastLetter = firstName + query.split(' ')[1].charAt(0)
        var firstLetterDotLastName = query.split(' ')[0].charAt(0) + '.' + lastName
        var firstNameDotLastLetter = firstName + '.' + query.split(' ')[1].charAt(0)
        var lastNameFistName = lastName + firstName;
        var lastNameDotFirstName = lastName + '.' + firstName
        var lastNameFistLetter = lastName + query.split(' ')[0].charAt(0)
        var lastNameDotFistLetter = lastName + '.' + query.split(' ')[0].charAt(0)
        var lastLetterFirstName = query.split(' ')[1].charAt(0) + firstName;
        var lastLetterDotFirstName = query.split(' ')[1].charAt(0) + '.' + firstName
        var firstLetterLastLetter = query.split(' ')[0].charAt(0) + query.split(' ')[1].charAt(0)
        var firstLetterDotLastLetter = query.split(' ')[0].charAt(0) + '.' + query.split(' ')[1].charAt(0)
        var lastLetterFirstLetter = query.split(' ')[1].charAt(0) + query.split(' ')[0].charAt(0);
        var lastLetterDotFirstLetter = query.split(' ')[1].charAt(0) + '.' + query.split(' ')[0].charAt(0)

        array.push(firstNameLastName);
        array.push(firstLetterLastName);
        array.push(firstNameLastLetter);
        array.push(lastLetterDotFirstLetter)


        array.push(lastNameFistName);
        array.push(lastLetterFirstName);
        array.push(lastLetterDotFirstName);
        array.push(firstLetterLastLetter);
        array.push(firstLetterDotLastLetter);
        array.push(lastLetterFirstLetter);
        array.push(firstName);
        array.push(lastName);
        array.push(lastNameFistLetter);
        array.push(firstLetterDotLastName);
        array.push(lastNameDotFistLetter);
        array.push(firstNameDotLastLetter);
        array.push(firstNameDotLastName);
        array.push(lastNameDotFirstName);

        return array
    }

    // Alerts user when first and last name has not been selected
    else {
        alert("Error: Highlight the First and Last name")
    }
}

// Modifies hostname of website
setHostNameFormat = function (hostname) {
    if (hostname.includes("www.")) {
        hostname = hostname.substring(hostname.indexOf(".") + 1);
    }
    if (hostname.includes("google.com")) {
        hostname = "gmail.com"
    }
    if (hostname.includes("en.")) {
        hostname = hostname.substring(hostname.indexOf(".") + 1);
    }
    return hostname


}

function show() {
    notification = new Notification("Test", {
        body: 'click the notification to open example.com, or click to the x to close'
    });
    notification.onclick = function () {
        window.open('http://example.com');
        window.focus();
    };
};



// Creates Context Menu
chrome.contextMenus.create({
    title: "Search in Google",
    contexts: ["selection"],  // ContextType
    onclick: searchGoogle // A callback function
});
