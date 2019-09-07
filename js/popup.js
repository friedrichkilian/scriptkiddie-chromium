document.getElementById('header').innerHTML = 'Loading...';

document.getElementById('managescripts').addEventListener('click', function() {

    document.getElementById('managescripts').blur();

    chrome.runtime.openOptionsPage();

}); // END document.getElementById('managescripts').addEventListener('click', function() {

chrome.tabs.query({ 'active': true }, function(url) {

    getScriptsFor(url, function(availableScripts) {

        if(availableScripts.length === 1)
            document.getElementById('header').innerHTML = '1 script';
        else
            document.getElementById('header').innerHTML = availableScripts.length + ' scripts';

        if(availableScripts.length === 0)
            document.getElementById('scripts').outerHTML = '';
        else {

            availableScripts.forEach(function(script) {

                let button = document.createElement('button');
                button.innerHTML = script['name'];
                button.addEventListener('click', function() {

                    button.blur();

                    chrome.tabs.executeScript({

                        'code': script['code']

                    }); // END chrome.tabs.executeScript({

                }); // END button.addEventListener('click', function() {

                document.getElementById('scripts').appendChild(button);

            }); // END availableScripts.foreach(function(script) {

        } // END else

    }); // END getScriptsFor(url, function(availableScripts) {

}); // END chrome.tabs.query({ 'active': true }, function(url) {
