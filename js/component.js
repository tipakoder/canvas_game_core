(function() {
    let viewport = game.viewport;

    let button = function(data) {
        setDefault({
            color: "#FFF",
            background: "#333",
            fontStyle: "",
            fontSize: 16,
            fontFamily: defaultFont,
            position: {x: 0, y: 0},
            size: {w: 100, h: 24},
            fixedSize: false,
            padding: {v: 8, h: 16},
            round: 16,
            text: "button",
            function: function(){ console.log('Click'); }
        }, data);
        // Return button object
        return {
            name: "button",
            data: data,
            setAction: function(func) {
                data.action = viewport.context.setAction({
                    position: data.position,
                    size: {
                        w: data.size.w + (data.padding.h*2.8),
                        h: data.size.h + (data.padding.v*1)
                    },
                    function: func
                });
                game.addAction(data.key+"_action", data.action);
            },
            render: function() {
                // Prepare font
                if(data.fixedSize == false && data.text.length) {
                    viewport.context.setFont({fontSize: data.fontSize, fontFamily: data.fontFamily});
                    let symbolWidth = Math.ceil(viewport.context.measureText("a").width);
                    data.size.w = symbolWidth * data.text.length;
                    data.size.h = data.fontSize;
                }
                // Render background
                viewport.context.rectangle({
                    x: data.position.x, 
                    y: data.position.y, 
                    w: data.size.w + (data.padding.h*2), 
                    h: data.size.h + (data.padding.v*2), 
                    color: data.background,
                    round: data.round
                });
                // Render text
                viewport.context.text({
                    x: data.position.x + (data.size.w/2) + data.padding.h,
                    y: data.position.y,
                    w: data.size.w,
                    align: "center",
                    color: data.color,
                    fontStyle: data.fontStyle,
                    fontSize: data.fontSize,
                    fontFamily: data.fontFamily,
                    text: data.text
                });
            },
            remove: function() {
                game.removeRender(data.key);
                game.removeAction(data.key+"_action");
            }
        };
    }

    let text = function(data) {
        setDefault({
            color: "#FFF",
            fontSize: 16,
            fontFamily: defaultFont,
            fontStyle: "",
            position: {x: 0, y: 0},
            maxWidth: 100,
            value: "text"
        }, data);
        return {
            name: "text",
            data: data,
            setAction: function(func) {
                data.action = viewport.context.setAction({
                    position: data.position,
                    size: data.size,
                    function: func
                });
                game.addAction(data.key+"_action", data.action);
            },
            render: function() {
                // Render text
                viewport.context.text({
                    x: data.position.x,
                    y: data.position.y,
                    w: data.maxWidth,
                    align: "left",
                    color: data.color,
                    fontStyle: data.fontStyle,
                    fontSize: data.fontSize,
                    fontFamily: data.fontFamily,
                    text: data.value
                });
            },
            remove: function() {
                game.removeRender(data.key);
                game.removeAction(data.key+"_action");
            }
        };
    }

    let multiText = function(data) {
        setDefault({
            color: "#FFF",
            fontSize: 16,
            fontFamily: defaultFont,
            fontStyle: "",
            position: {x: 0, y: 0},
            maxWidth: 100,
            value: "multiText"
        }, data);
        return {
            name: "multiText",
            data: data,
            render: function() {
                data.lineSize = data.maxWidth / Math.ceil(viewport.context.measureText("a").width);
                data.lineCount = Math.ceil( data.maxWidth / data.lineSize );
                for(let i = 0, o = 0; i < data.lineCount; i++, o += data.lineSize) {
                    // Render text
                    viewport.context.text({
                        x: data.position.x,
                        y: data.position.y + (i * (data.fontSize+4)),
                        w: data.maxWidth,
                        align: "left",
                        color: data.color,
                        fontStyle: data.fontStyle,
                        fontSize: data.fontSize,
                        fontFamily: data.fontFamily,
                        text: data.value.substr(o, data.lineSize)
                    });
                }
            }
        };
    }

    let dialog = function(data) {
        setDefault({
            color: "#FFF",
            background: "#333",
            fontSize: 16,
            fontFamily: defaultFont,
            position: {x: 0, y: 0},
            size: {w: 100, h: 24},
            fixedSize: false,
            padding: {v: 8, h: 16},
            round: 16,
            text: "button"
        }, data);
        return {
            name: "button",
            data: data,
            render: function() {
                
            }
        };
    }

    let setDefault = function(def, data) {
        data.key = game.specialKey();
        for(let key in def) {
            if(data[key] == undefined) data[key] = def[key];
        }
    }

    window.component = {
        button: button,
        text: text,
        multiText: multiText
    };
})();