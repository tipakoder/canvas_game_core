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

            let textbox = component.textBox({
                placeholder: "Input your nickname",
                position: {x: 100, y: 10},
                size: {w: 250, h: 15}
            });
            game.addRender(textbox); 

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

                if(e.code == 'KeyT')
                {
                    let dialog = component.dialog({
                        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                    });
                    game.addRender(dialog);
                }

                if(e.code == 'KeyY')
                {
                    let dialog = component.dialog({
                        text: "Hello!"
                    });
                    game.addRender(dialog);
                }
            });
        }
    </script>
</body>
</html>