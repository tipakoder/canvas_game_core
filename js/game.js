(function() {
    let viewport = {
        object: undefined,
        context: undefined,
        size: { width: 500, height: 500 },
        render: function() {
            viewport.context.clearRect(0, 0, viewport.size.width, viewport.size.height);
            viewport.context.fillStyle = "green";
            viewport.context.fillRect(0, 0, this.size.width, this.size.height);
        }
    };

    let renderList = [];

    let run = function() {
        window.game.onAwake();
        load();
    }

    let load = function() {
        // Log
        console.log('load();');
        // Process
        viewport.object = document.getElementById('viewport');
        viewport.context = viewport.object.getContext('2d');
        // Enable update
        window.game.onStart();
        window.requestAnimationFrame(update);
    }

    let update = function() {
        window.game.onUpdate();
        render();
        setTimeout(update, 100);
    }

    let render = function() {
        console.log('render();');
        // Render viewport
        viewport.render();
        // Render other objects
        if (renderList.length > 0) {
            for (renderList of renderFunc) {
                renderFunc();
            }
        }
    }

    window.game = {
        // Run function
        run: run,
        // After load function
        onAwake: function() { console.log('onAwake();'); },
        // Before load function
        onStart: function() { console.log('onStart();'); },
        // Every frame function
        onUpdate: function() { console.log('onUpdate();'); },
        // Add objects render
        render: function(func) { renderList.push(func); }
    };
})();