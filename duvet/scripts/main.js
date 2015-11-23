(function() {

    // You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
    // which will try to choose the best renderer for the environment you are in.

    // The renderer will create a canvas element for you that you can then insert into the DOM.

    var container = document.getElementById('container');
    var renderer = new PIXI.CanvasRenderer(640, 640, container);
    container.appendChild(renderer.view);
    container.onclick = saveCanvas;

    //document.body.appendChild(renderer.view);

    // You need to create a root container that will hold the scene you want to draw.
    var stage = new PIXI.Container();

    // This creates a texture from a 'bubble.png' image.
    var bubbleTexture = PIXI.Texture.fromImage('../images/bubble.png');
    var bubble = new PIXI.Sprite(bubbleTexture);

    //var colors = [0xffffff, 0xffffff, 0x9D04DF, 0xEE0079, 0x9CF800, 0xF4FE00];
    var colors = [0x0d171d, 0x0f7e7c, 0xfe9000, 0xe2c500, 0xe5ae6c, 0xfa5600, 0xf2ebda, 0xf2ebda, 0xf2ebda, 0xf2ebda, 0xf2ebda, ];
    var whiteColor = 0xf2ebda;
    var graphics = new PIXI.Graphics();
    drawSegments(20, colors, graphics);
    stage.addChild(graphics);

    // kick off the animation loop (defined below)
    animate();

    function rndInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function animate() {
        // start the timer for the next animation loop
        requestAnimationFrame(animate);

        // this is the main render call that makes pixi draw your container and its children.
        renderer.render(stage);
    }

    function drawSegments(segments, colors, graphics) {

        var lastColor = colors[rndInt(0, colors.length - 1)];

        var segHeight = 640 / segments;
        var segWidth = 640;
        var x = 0;
        var y = 0;

        var segWidths = [
            [1],
            [0.5, 0.5],
            [0.1, 0.9],
            [0.2, 0.8],
            [0.2, 0.4, 0.4],
            [0.2, 0.1, 0.8],
            [0.1, 0.1, 0.8],
            [0.25, 0.25, 0.25, 0.25],
        ];


        graphics.lineStyle(1, 0x000000);
        for (var i = 0; i < segments; i++) {
            var rndSegs = rndInt(1, segWidths.length - 1);
            var segSizes = shuffle(segWidths[rndSegs]);
            console.log(segSizes);
            var remaingSegWidth = 640;
            console.log('draw seg');

            for (var j = 0; j < segSizes.length; j++) {

                /*segWidth = rndInt((640 / rndSegs) / 2, 640 / rndSegs);

                if (j === rndSegs - 1) {
                    segWidth = remaingSegWidth;
                    console.log('last seg ' + rndSegs);
                } else {
                    remaingSegWidth -= segWidth;
                }*/

                segWidth = Math.round(640 * segSizes[j]);
                console.log('segWidth ' + segWidth);
                var color
                if (color === whiteColor) {
                    color = colors[rndInt(0, colors.length - 1)];

                } else {
                    color = anyColorBut(lastColor);

                }
                lastColor = color;
                graphics.beginFill(color);
                graphics.drawRect(x, y, segWidth, segHeight);
                graphics.endFill();
                x += segWidth;

            };

            // end the fill
            x = 0;
            y += segHeight;
        };




    }

    function anyColorBut(color) {
        var rndColor = colors[rndInt(0, colors.length - 1)];
        while (rndColor === color) {
            rndColor = colors[rndInt(0, colors.length - 1)];
        }
        return rndColor;
    }



    function shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function saveCanvas() {
        console.log('tes');
        var c = document.getElementsByTagName('canvas')[0];
        var d = c.toDataURL('image/png');
        var w = window.open('about:blank', 'image from canvas');
        w.document.write('<img src=' + d + ' alt=from canvas/>');
    }


})();
