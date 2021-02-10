(function() {
    let loaded = {};

    let load = function(array) {
        for(let item of array) {
            let img = new Image();
            img.src = item.src;
            img.onload = function() {
                loaded[item.key] = img;
            };
        }
    }

    let get = function(key) {
        if(loaded[key] !== undefined)
            return loaded[key];
        return null;
    }

    window.resources = {
        load: load,
        get: get
    };
})();