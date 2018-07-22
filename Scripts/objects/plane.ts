module objects{
    export class Plane extends objects.GameObject{
    
        //Private Instance Variables

        private _bulletSpawn:math.Vec2;
                
            //public properties


        public planeFlash : objects.PlaneFlash;



        // Constructor
        constructor(){
            super("plane");
            this.Start();
            
            }

            //Private Methods
            
            private _animationEnded():void{
                this.alpha = 1;
                this.planeFlash.alpha = 0;


            }

            //public Methods

            //Initializes variables and set speed
            public Start():void{
                this.planeFlash = new objects.PlaneFlash;
                this.planeFlash.alpha = 0;

                this.planeFlash.on("animationend", this._animationEnded.bind(this),false);
                managers.Game.currentSceneObject.addChild(this.planeFlash);


                this.x = 320;
                this.y = 430;

                this._bulletSpawn = new math.Vec2();
               
            }
            
            public Update():void{
                this.Move();
                this.CheckBounds();
                this.BulletFire();
            }
            public Reset():void{
                
            }

           public Move():void{
                //this.x = objects.Game.stage.mouseX;

                //keyboard control
                if(managers.Game.keyBoardManager.moveLeft){
                    this.x -= 5;
                }
                if(managers.Game.keyBoardManager.moveRight){
                    this.x += 5;
                }
                this.planeFlash.x = this.x;
                this.planeFlash.y = this.y;
                
            }

            public CheckBounds():void{
                //right boundary
                    if(this.x >=640 - this.halfWidth)
                    {
                        this.x = 640 - this.halfWidth;
                    }
                //left boundary
                if(this.x <= this.halfWidth){
                    this.x = this.halfWidth;
                }
              
            }
            public BulletFire():void{
                

                //check if plane is alive
                if(this.alpha = 1){
                    let ticker: number  = createjs.Ticker.getTicks();
                    if((managers.Game.keyBoardManager.fire) && (ticker % 10 == 0)){
                            console.log("bullet fired");
                        this._bulletSpawn = new math.Vec2(this.x, this.y - this.halfHeight - 2);
                        let currentBullet = managers.Game.bulletManager.CurrentBullet;
                        let bullet = managers.Game.bulletManager.Bullets[currentBullet];
                        bullet.x = this._bulletSpawn.x;
                        bullet.y = this._bulletSpawn.y;

                        managers.Game.bulletManager.CurrentBullet++;
                        if(managers.Game.bulletManager.CurrentBullet > 49){
                            managers.Game.bulletManager.CurrentBullet = 0;
                        }
                        createjs.Sound.play("bulletSound");
                    }
                }

            }
               
    }
}