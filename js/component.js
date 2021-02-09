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
            getWidth: function() {
                // Prepare font
                if(data.fixedSize == false && data.text.length) {
                    viewport.context.setFont({fontSize: data.fontSize, fontFamily: data.fontFamily});
                    let symbolWidth = Math.ceil(viewport.context.measureText("a").width);
                    return symbolWidth * data.text.length;
                }
                return data.size.w;
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
                data.symbolWidth = viewport.context.getSymbolWidth({
                    fontFamily: data.fontFamily,
                    fontSize: data.fontSize,
                    fontStyle: data.fontStyle,
                    value: data.value[0]
                });
                data.lineSize = data.maxWidth*1.4 / data.symbolWidth;
                data.lineCount = Math.ceil( data.value.length / data.lineSize );
                for(let i = 0, o = 0; i < data.lineCount; i++, o += data.lineSize) {
                    // Render text
                    viewport.context.text({
                        x: data.position.x,
                        y: data.position.y + (i * (data.fontSize+4)),
                        w: data.maxWidth*1.4,
                        align: "left",
                        color: data.color,
                        fontStyle: data.fontStyle,
                        fontSize: data.fontSize,
                        fontFamily: data.fontFamily,
                        text: data.value.substr(o, data.lineSize)
                    });
                }
            },
            getHeight: function() {
                data.symbolWidth = viewport.context.getSymbolWidth({
                    fontFamily: data.fontFamily,
                    fontSize: data.fontSize,
                    fontStyle: data.fontStyle,
                    value: data.value[0]
                });
                data.lineSize = data.maxWidth*1.4 / data.symbolWidth;
                data.lineCount = Math.ceil( data.value.length / data.lineSize );
                return data.lineCount * (data.fontSize+4);
            },
            remove: function() {
                game.removeRender(data.key);
                game.removeAction(data.key+"_action");
            }
        };
    }

    let dialog = function(data) {
        setDefault({
            color: "#F1F1F1",
            colorTitle: "#FFF",
            background: "#333",
            fontSize: 16,
            fontSizeTitle: 20,
            fontFamily: defaultFont,
            freePosition: false,
            positionType: "center",
            position: {x: 0, y: 0},
            size: {w: 400, h: 250},
            fixedSize: false,
            padding: {v: 8, h: 16},
            round: 16,
            text: "dialog text..",
            title: "Dialog title",
            button: [{
                text: "Ок",
                function: function() {
                    game.removeRender(data.key);
                    game.removeAction(data.key+"_action");
                }
            }]
        }, data);
        return {
            name: "dialog",
            data: data,
            render: function() {
                // Prepare components
                let multitext = multiText({
                    position: {
                        x: data.position.x + data.padding.h,
                        y: data.position.y + (data.padding.v*2) + data.fontSizeTitle
                    },
                    maxWidth: data.size.w - (data.padding.h*2),
                    value: data.text,
                    fontFamily: data.fontFamily,
                    fontSize: data.fontSize
                });

                // New position
                if(data.freePosition == false) {
                    if(data.positionType == "center")
                    {
                        data.position = {
                            x: (viewport.size.width/2) - (data.size.w/2),
                            y: (viewport.size.height/2) - (data.size.h/2)
                        };
                    }
                }
                // New size
                if(data.fixedSize == false) {
                    data.size.h = (data.padding.v*4) + data.fontSizeTitle + multitext.getHeight() + 40;
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
                    x: data.position.x + data.padding.h,
                    y: data.position.y + data.padding.v,
                    w: data.size.w - (data.padding.h*2),
                    align: "left",
                    color: data.colorTitle,
                    fontStyle: "bold",
                    fontSize: data.fontSizeTitle,
                    fontFamily: data.fontFamily,
                    text: data.title
                });
                // Render multiline text
                multitext.render();
                // Render buttons
                for(let bdata of data.button) {
                    bdata.size = {w: 0, h: 40};
                    bdata.background = "#555";
                    let buttonObject = button(bdata);
                    buttonObject.data.position = {
                        x: ((viewport.size.width/2) + (data.size.w/2)) - (data.padding.h + buttonObject.getWidth()),
                        y: ((viewport.size.height/2) + (data.size.h/2)) - (data.padding.v + 25)
                    };
                    buttonObject.setAction(bdata.function);
                    buttonObject.render();
                }
            },
            remove: function() {
                game.removeRender(data.key);
                game.removeAction(data.key+"_action");
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
        multiText: multiText,
        dialog: dialog
    };
})();