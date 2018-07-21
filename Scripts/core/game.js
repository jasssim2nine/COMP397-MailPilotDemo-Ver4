/// <reference path = "_references.ts"/>
// IIFE - Immediately Invoked Function Expression
(function () {
    //Game variables
    var canvas = document.getElementById("canvas");
    var stage;
    var helloLabel;
    var clickMeButton;
    var assetManager;
    var assetManifest;
    var currentScene;
    var currentState;
    var keyBoardManager;
    var textureAtlasData;
    var textureAtlas;
    textureAtlasData = {
        "images": [
            ""
            // "./Assets/sprites/textureAtlas.png"
        ],
        "frames": [
            [1, 1, 226, 178, 0, 0, 0],
            [229, 1, 44, 40, 0, 0, 0],
            [275, 1, 44, 40, 0, 0, 0],
            [321, 1, 44, 40, 0, 0, 0],
            [367, 1, 44, 40, 0, 0, 0],
            [413, 1, 44, 40, 0, 0, 0],
            [459, 1, 44, 40, 0, 0, 0],
            [1, 181, 44, 40, 0, 0, 0],
            [47, 181, 44, 40, 0, 0, 0],
            [93, 181, 44, 40, 0, 0, 0],
            [139, 181, 44, 40, 0, 0, 0],
            [185, 181, 65, 65, 0, 0, 0],
            [252, 181, 65, 65, 0, 0, 0],
            [319, 181, 65, 65, 0, 0, 0],
            [386, 181, 65, 65, 0, 0, 0],
            [1, 248, 65, 65, 0, 0, 0],
            [68, 248, 65, 65, 0, 0, 0],
            [135, 248, 65, 65, 0, 0, 0],
            [202, 248, 62, 63, 0, 0, 0],
            [266, 248, 65, 65, 0, 0, 0],
            [333, 248, 65, 65, 0, 0, 0],
            [400, 248, 65, 65, 0, 0, 0],
            [1, 315, 65, 65, 0, 0, 0],
            [68, 315, 65, 65, 0, 0, 0],
            [135, 315, 200, 60, 0, 0, 0],
            [1, 382, 200, 60, 0, 0, 0]
        ],
        "animations": {
            "cloud": { "frames": [0] },
            "coin": { "frames": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                "speed": 0.33 },
            "explosion": { "frames": [11, 12, 13, 14, 15, 16, 17],
                "speed": 0.16 },
            "island": { "frames": [18] },
            "plane": { "frames": [19, 20, 21],
                "speed": 0.5
            },
            "planeflash": { "frames": [22, 23, 22, 23, 22, 23],
                "speed": 0.08 },
            "restartButton": { "frames": [24] },
            "startButton": { "frames": [25] },
        }
    };
    assetManifest = [
        { id: "textureAtlas", src: "./Assets/sprites/textureAtlas.png" },
        { id: "ocean", src: "./Assets/images/ocean.gif" },
        { id: "engine", src: "./Assets/audio/engine.ogg" },
        { id: "yay", src: "./Assets/audio/yay.ogg" },
        { id: "coin", src: "./Assets/audio/coin.wav" },
        { id: "life", src: "./Assets/audio/life.wav" },
        { id: "explosion", src: "./Assets/audio/explosion.wav" },
    ];
    //preloads assets
    function Init() {
        console.log("Initialization Started");
        assetManager = new createjs.LoadQueue(); //creates the asset manager object
        assetManager.installPlugin(createjs.Sound); //asset manager can also load sounds
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start, this);
    }
    function Start() {
        console.log("Starting Application....");
        textureAtlasData.images = [assetManager.getResult("textureAtlas")];
        textureAtlas = new createjs.SpriteSheet(textureAtlasData);
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20); // turn this on for buttons
        createjs.Ticker.framerate = 60; //60 FPS
        createjs.Ticker.on("tick", Update);
        managers.Game.stage = stage;
        managers.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;
        keyBoardManager = new managers.Keyboard();
        managers.Game.keyBoardManager = keyBoardManager;
        managers.Game.assetManager = assetManager;
        managers.Game.textureAtlas = textureAtlas;
        Main();
    }
    function Update() {
        //if the scene that is playing returns another scene 
        //then call main again
        if (currentState != managers.Game.currentScene) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    function Main() {
        stage.removeAllChildren();
        switch (managers.Game.currentScene) {
            case config.Scene.START:
                currentScene = new scenes.StartScene();
                break;
            case config.Scene.PLAY:
                //game play
                currentScene = new scenes.PlayScene();
                break;
            case config.Scene.OVER:
                //game over scene
                currentScene = new scenes.OverScene();
                break;
        }
        currentState = managers.Game.currentScene;
        managers.Game.currentSceneObject = currentScene;
        stage.addChild(currentScene);
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map