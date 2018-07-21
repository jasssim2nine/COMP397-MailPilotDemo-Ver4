var managers;
(function (managers) {
    var Bullet = /** @class */ (function () {
        //constructors
        function Bullet() {
            this.Start();
        }
        //private methods
        Bullet.prototype._buildBulletPool = function () {
            for (var count = 0; count < this._bulletCount; count++) {
                this.Bullets[count] = new objects.Bullet();
                //   this.Bullets[count].Reset();
            }
        };
        //public methods
        Bullet.prototype.Start = function () {
            //set the bullet count
            this._bulletCount = 50;
            //create the bullet container
            this.Bullets = new Array();
            this._buildBulletPool();
            //set the current bullet to 0
            this.CurrentBullet = 0;
        };
        Bullet.prototype.Update = function () {
            this.Bullets.forEach(function (bullet) {
                bullet.Update();
            });
        };
        return Bullet;
    }());
    managers.Bullet = Bullet;
})(managers || (managers = {}));
//# sourceMappingURL=bullet.js.map