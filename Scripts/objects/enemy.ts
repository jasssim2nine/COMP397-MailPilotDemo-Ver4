module objects{
    export class Enemy extends objects.GameObject{
    
        //Private Instance Variables
            



        // Constructor
        constructor(){
            super("enemy");
            this.Start();
            
            }

            //Private Methods
            

            //public Methods

            //Initializes variables and set speed
            public Start():void{
                
               this._dy = 8;
               this.Reset();
            }
            
            public Update():void{
                this.Move();
                this.CheckBounds();
            }
            public Reset():void{
                this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
                this.y = -480;
                this.alpha = 0;
            }

           public Move():void{
               this.y += this._dy;
                
            }

            public CheckBounds():void{

                if((this.y >= 0) && (this.alpha == 0)){
                    this.alpha = 1;
                }
               //check lower bounds
               if(this.y >= 480 + this.height)
               {
                   this.Reset();
               }
              
            }
               
    }
}