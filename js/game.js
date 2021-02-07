(function() {
    let viewport = {
        object: undefined,
        context: undefined,
        size: { width: 1500, height: 1500 },
        render: function() {
            viewport.context.clearRect(0, 0, viewport.size.width, viewport.size.height);
            viewport.context.fillStyle = "#222";
            viewport.context.fillRect(0, 0, this.size.width, this.size.height);
        },
        resize: function() {
            viewport.size.width = window.innerWidth; 
            viewport.size.height = window.innerHeight;
            viewport.object.width = viewport.size.width; 
            viewport.object.height = viewport.size.height;
        },
        click: function(event) {
            let mouse = getMousePosition(event);
            if(Object.keys(buttons).length > 0) {
                for(let button in buttons) {
                    if(buttons[button].path != undefined && buttons[button].function != undefined) {
                        if(viewport.context.isPointInPath(buttons[button].path, mouse.x, mouse.y)) buttons[button].function();
                    }
                }
            }
        }
    };

    let specialKey = function(length = 10) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return "k" + result;
    }

    let renderList = {};
    let buttons = {};

    let run = function() {
        window.game.onAwake();
        document.onreadystatechange = load;
    }

    let load = function() {
        // Log
        console.log('load();');
        // Process
        viewport.object = document.getElementById('viewport');
        viewport.resize();
        window.onresize = viewport.resize;
        viewport.object.addEventListener('click', viewport.click, false);
        viewport.context = viewport.object.getContext('2d');
        // Enable update
        window.requestAnimationFrame(update);
        window.game.onStart();
    }

    let update = function() {
        window.game.onUpdate();
        render();
        setTimeout(update, 100);
    }

    let render = function() {
        // Render viewport
        viewport.render();
        // Render other objects
        if (Object.keys(renderList).length > 0) {
            for (let object in renderList) {
                if(typeof renderList[object].render == 'function')
                    renderList[object].render();
            }
        }
    }

    let getMousePosition = function(event) {
        let rect = viewport.object.getBoundingClientRect();
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    window.game = {
        //Viewport
        viewport: viewport,
        // Run function
        run: run,
        // After load function
        onAwake: function() {  },
        // Before load function
        onStart: function() {  },
        // Every frame function
        onUpdate: function() {  },
        // Add objects render
        addRender: function(object) { renderList[object.data.key] = object; },
        //Remove render object
        removeRender: function(key) { if(renderList[key] != undefined) delete renderList[key]; }, 
        // Add action
        addAction: function(key, object) { buttons[key] = object; },
        // Remove action
        removeAction: function(key) { if(buttons[key] != undefined) delete buttons[key]; }, 
        // Generation special key
        specialKey: specialKey
    };
})();