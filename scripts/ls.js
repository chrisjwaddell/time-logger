const STORE_PREFIX = 'LS-';
let cachedStorage;
let cachedJSON

// ls converts the object to JSON before storing and converts
// it back to an object on fetching
// get, set, remove, clear, supported are the methods

function supportsStorage() {
    var key = '__LStest__';
    var value = key;

    if (cachedStorage !== undefined) {
        return cachedStorage;
    }

    try {
        if (!localStorage) {
            return false;
        }
    } catch (err) {
        return false;
    }

    try {
        setItem(key, value);
        removeItem(key);
        cachedStorage = true;
    } catch (err) {
        cachedStorage = false;
    }
    return cachedStorage;
}

function supportsJSON() {
    if (cachedJSON === undefined) {
        cachedJSON = (window.JSON != null);
    }
    return cachedJSON;
}

function getItem(key) {
    return localStorage.getItem(STORE_PREFIX + key);
}

function setItem(key, value) {
    localStorage.removeItem(STORE_PREFIX + key);
    localStorage.setItem(STORE_PREFIX + key, value);
}

function removeItem(key) {
    localStorage.removeItem(STORE_PREFIX + key);
}

function clear() {
    localStorage.clear();
}



const ls = {

    set: function (key, value) {
        if (!supportsStorage()) return false;

        if (!supportsJSON()) return false;
        try {
            value = JSON.stringify(value);
        } catch (err) {
            return false;
        }

        try {
            setItem(key, value);
        } catch (err) {
            return false;
        }
    },

    get: function (key) {
        if (!supportsStorage()) return null;

        let value = getItem(key);
        if (!value || !supportsJSON()) {
            return value;
        }

        try {
            return JSON.parse(value);
        } catch (err) {
            return value;
        }
    },

    remove: function (key) {
        if (!supportsStorage()) return;

        removeItem(key);
    },

    clear: function () {
        if (!supportsStorage()) return;
        clear()
    },

    supported: function () {
        return supportsStorage() && supportsJSON();
    }
}
