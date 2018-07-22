/// <reference path = "_references.ts"/>

// IIFE - Immediately Invoked Function Expression

(function(){
     

    //Game variables

    let canvas = document.getElementById("canvas");
    let stage:createjs.Stage;
    let helloLabel:objects.Label;
    let clickMeButton: objects.Button;
    let assetManager : createjs.LoadQueue;
    let assetManifest: any[];
    let currentScene : objects.Scene;
   let currentState : number;
   let keyBoardManager : managers.Keyboard;
   let textureAtlasData : any;
   let textureAtlas : createjs.SpriteSheet;
    
   textureAtlasData = {

    "images": [
        ""
       // "./Assets/sprites/textureAtlas.png"
    ],
    
    
   "frames": [
    [1, 1, 16, 16, 0, 0, 0],
    [19, 1, 226, 178, 0, 0, 0],
    [1, 181, 44, 40, 0, 0, 0],
    [47, 181, 44, 40, 0, 0, 0],
    [93, 181, 44, 40, 0, 0, 0],
    [139, 181, 44, 40, 0, 0, 0],
    [185, 181, 44, 40, 0, 0, 0],
    [1, 223, 44, 40, 0, 0, 0],
    [47, 223, 44, 40, 0, 0, 0],
    [93, 223, 44, 40, 0, 0, 0],
    [139, 223, 44, 40, 0, 0, 0],
    [185, 223, 44, 40, 0, 0, 0],
    [1, 265, 93, 74, 0, 0, 0],
    [96, 265, 93, 74, 0, 0, 0],
    [1, 341, 93, 74, 0, 0, 0],
    [96, 341, 65, 65, 0, 0, 0],
    [163, 341, 65, 65, 0, 0, 0],
    [1, 417, 65, 65, 0, 0, 0],
    [68, 417, 65, 65, 0, 0, 0],
    [135, 417, 65, 65, 0, 0, 0],
    [1, 484, 65, 65, 0, 0, 0],
    [68, 484, 65, 65, 0, 0, 0],
    [135, 484, 62, 63, 0, 0, 0],
    [1, 551, 65, 65, 0, 0, 0],
    [68, 551, 65, 65, 0, 0, 0],
    [135, 551, 65, 65, 0, 0, 0],
    [1, 618, 65, 65, 0, 0, 0],
    [68, 618, 65, 65, 0, 0, 0],
    [1, 685, 200, 60, 0, 0, 0],
    [203, 685, 32, 32, 0, 0, 0],
    [1, 747, 32, 32, 0, 0, 0],
    [35, 747, 32, 32, 0, 0, 0],
    [69, 747, 32, 32, 0, 0, 0],
    [103, 747, 32, 32, 0, 0, 0],
    [137, 747, 32, 32, 0, 0, 0],
    [1, 781, 200, 60, 0, 0, 0]
],
    
    "animations": {
        "bullet":{"frames": [0] },
        "cloud": { "frames": [1] },
        "coin": { "frames": [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            "speed" : 0.33 },

        "enemy": { "frames": [12, 13, 14],
            "speed" : 0.25 }, 
    
        
        "explosion": { "frames": [15, 16 ,17, 18 ,19, 20, 21],
            "speed": 0.16 },
        "island": { "frames": [22] },
        "plane": { "frames": [23, 24, 25],
            "speed": 0.5
        },
        
        "planeflash": { "frames": [26, 27, 26, 27, 26, 27],
        "speed": 0.08 },
    
    "restartButton": { "frames": [28] },
    "smallexplosion": { "frames": [29, 30, 31, 32, 33, 34],
        "speed": 0.16 },
    
    "startButton": { "frames": [35] }
    }
    
    
    };

   
    
    assetManifest = [
        {id: "textureAtlas", src:"./Assets/sprites/textureAtlas.png"},
        {id: "ocean", src:"./Assets/images/ocean.gif"},
      
        {id:"engine", src:"./Assets/audio/engine.ogg"},
        
        {id:"yay", src:"./Assets/audio/yay.ogg"},
        {id:"coin", src:"./Assets/audio/coin.wav"},
        {id:"life", src:"./Assets/audio/life.wav"},
        {id:"explosion", src:"./Assets/audio/explosion.wav"},
        {id:"bulletSound", src:"./Assets/audio/bullet.wav"},

        ];
        //preloads assets
    function Init():void{
        console.log("Initialization Started");
        
        assetManager = new createjs.LoadQueue();//creates the asset manager object
        assetManager.installPlugin(createjs.Sound);//asset manager can also load sounds
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete",Start, this);
            
    }

    function Start():void{
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
    
    function Update():void
    {
      
        //if the scene that is playing returns another scene 
        //then call main again
           if(currentState != managers.Game.currentScene){
               
               Main();     
           }
           currentScene.Update();
        stage.update();
    }
    


   

    
    function Main():void{

        stage.removeAllChildren();

        switch(managers.Game.currentScene){
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