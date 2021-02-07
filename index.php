<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game</title>
    <link rel="stylesheet" href="css/gameview.css">
</head>
<body>
    <canvas id="viewport"></canvas>
    <script src="js/primitive.js"></script>
    <script src="js/game.js"></script>
    <script src="js/component.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", window.game.run);
        // On start
        window.game.onStart = function() {
            let text = component.text({
                value: "LOREM NAXUI",
                fontStyle: "bold",
                position: {x: 10, y: 50},
                maxWidth: 500
            });
            game.addRender(text); 

            let button1 = null;
            let button1_int = null;
            document.addEventListener("keydown", function(e) {
                if(button1 != null)
                    button1.remove();
                    clearTimeout(button1_int);
                button1 = component.button({
                    text: e.code.replace("Key", ""),
                    padding: {h: 16, v: 16},
                    fontSize: 48,
                    fixedSize: true,
                    position: {x: game.viewport.size.width - 56, y: game.viewport.size.height - 90},
                    size: {w: 40, h: 40}
                });
                button1.data.position.x -= button1.data.size.w;
                game.addRender(button1);
                button1_int = setTimeout(() => {
                    button1.remove();
                }, 1500);

                if(e.code == 'KeyW')
                {
                    let button = component.button({
                        text: "Привет, кнопка",
                        position: {x: 10, y: 10},
                    });
                    button.setAction(function() {
                        button.remove();
                        text.remove();
                    });
                    game.addRender(button);
                }
            });
        }
    </script>
</body>
</html>