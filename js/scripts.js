function getScripts(callback) {

    chrome.storage.sync.get('scripts', function(dict) {

        callback(dict['scripts']);

    }); // END chrome.storage.sync.get('scripts', function(dict) {

} // END function getScripts(callback) {

function getScriptsFor(url, callback) {

    getScripts(function(allScripts) {

        callback(allScripts.filter(function(script) {

            try {

                return new RegExp(script['regex']).test(url);

            } catch(ignored) {

                return true;

            } // END try {

        })); // END callback(allScripts.filter(function(script) {

    }); // END getScripts(function(allScripts) {

} // END function getScriptsFor(url, callback) {

function updateScript(id, name, regex, code, callback) {

    getScripts(function(allScripts) {

        let scriptToChange = allScripts.find(function(script) {

            return script['id'] === parseInt(id);

        }); // END let scriptToChange = allScripts.find(function(script) {

        scriptToChange['name'] = name;
        scriptToChange['regex'] = regex;
        scriptToChange['code'] = code;

        chrome.storage.sync.set({ 'scripts': allScripts });

        callback();

    }); // END getScripts(function(allScripts) {

} // END function updateScript(id, name, regex, code, callback) {

function addScript(id, name, regex, code, callback) {

    getScripts(function(allScripts) {

        let newScript = {

            'id': id,
            'name': name,
            'regex': regex,
            'code': code

        }; // END let newScript = {

        allScripts.push(newScript);

        chrome.storage.sync.set({ 'scripts': allScripts }, function() {

            callback(newScript);

        }); // END chrome.storage.sync.set({ 'scripts': allScripts }, function() {

    }); // END getScripts(function(allScripts) {

} // END function addScript(id, name, regex, code, callback) {

function deleteScript(id, callback) {

    getScripts(function(allScripts) {

        chrome.storage.sync.set({ 'scripts': allScripts.filter(function (script) {

            return script['id'] !== parseInt(id);

        })}, function () {

            callback();

        }); // END chrome.storage.sync.set({ 'scripts': allScripts.filter(function (script) {

    }); // END getScripts(function(allScripts) {

}
