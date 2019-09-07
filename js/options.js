let scriptContainer = document.getElementById('scripts');
let header = document.getElementById('header');

let formID = document.getElementById('id');
let formName  = document.getElementById('name');
let formRegex = document.getElementById('regex');
let formCode = document.getElementById('code');

let saveButton = document.getElementById('save');
let removeButton = document.getElementById('remove');

function updateHeader() {

    getScripts(function(scripts) {

        if (scripts.length === 1)
            header.innerHTML = '1 script';
        else
            header.innerHTML = scripts.length + ' scripts';

    }); // END getScripts(function(scripts) {

} // END function updateHeader() {

function loadScripts() {

    getScripts(function(scripts) {

        updateHeader();

        scriptContainer.innerHTML = '';

        scripts.forEach(function(script) {

            scriptContainer.innerHTML += `<button id="${script['id']}">${script['name']}</button>`;

        }); // END scripts.forEach(function(script) {

        scripts.forEach(function(script) {

            buttonFrom(script).onclick = function() { loadScript(script); buttonFrom(script).blur(); };

        }); // END scripts.forEach(function(script) {

    }); // END getScripts(function(scripts) {

} // END function loadScripts() {

function loadScript(script) {

    storeScript(function() {

        document.getElementById('scriptEditor').classList.remove('inactive');

        formID.value = idFrom(script);
        formName.value = nameFrom(script);
        formRegex.value = regexFrom(script);
        formCode.value = codeFrom(script);

        saveButton.onclick = function() { storeScript(); saveButton.blur(); };
        removeButton.onclick = function() { removeScript(script); removeButton.blur(); };

    }); // END storeScript(function() {

} // END function loadScript(script) {

function buttonFrom(script) { return document.getElementById(script['id']); }
function buttonFromID(id) { return document.getElementById(id); }

function idFrom(script) { return script['id']; }
function nameFrom(script) { return script['name']; }
function regexFrom(script) { return script['regex']; }
function codeFrom(script) { return script['code']; }

function nothingLoaded() { return document.getElementById('scriptEditor').classList.contains('inactive'); }

function removeScript(script) {

    deleteScript(script['id'], function() {

        document.getElementById('scriptEditor').classList.add('inactive');

        scriptContainer.removeChild(buttonFrom(script));

        updateHeader();

    }); // END deleteScript(script['id'], function() {

} // END function removeScript(script) {

function storeScript(callback) {

    if(nothingLoaded()) {

        if(callback)
            callback();

        return;

    } // END if(nothingLoaded()) {

    updateScript(formID.value, formName.value === '' ? 'Unnamed Script' : formName.value, formRegex.value === '' ? '.*' : formRegex.value, formCode.value, function() {

        buttonFromID(formID.value).innerHTML = formName.value === '' ? 'Unnamed Script' : formName.value;
        formName.value = formName.value === '' ? 'Unnamed Script' : formName.value;
        formRegex.value = formRegex.value === '' ? '.*' : formRegex.value

        if(callback)
            callback();

    }); // END updateScript(formID.value, formName.value === '' ? 'Unnamed Script' : formName.value, formRegex.value, formCode.value, function() {

} // END function storeScript(callback) {

document.getElementById('addscript').onclick =  function() {

    addScript(Date.now(), 'New Script', '.*', '', function(newScript) {

        loadScripts();
        loadScript(newScript);
        updateHeader();

    }); // END addScript(Date.now(), 'New Script', '.*', '', function(newScript) {

    document.getElementById('addscript').blur();

}; // END document.getElementById('addscript').onclick =  function() {

loadScripts();
