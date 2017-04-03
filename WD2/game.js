(function() {
	var canvas;
    var context;
    var width;
    var height;
    var score=0;
    var size=10;
    var speed=2;
    var x=195;
    var y=590;
    var interval_id;
    var moveLeft=false;
    var moveRight=false;
    var enemies=[   {x : 10, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 60, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 110, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 160, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 210, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 260, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 310, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 360, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size }
	];
	var missiles=[];
	
	document.addEventListener('DOMContentLoaded', init, false);

	function init() {    
        canvas = document.querySelector('canvas');
        context = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;
		window.addEventListener('keydown', activate, false);
		window.addEventListener('keyup', deactivate, false);
		window.addEventListener('keydown', fire, false);
		function activate(event) {
			var keyCode=event.keyCode;
			if (keyCode===37) {
				moveLeft=true;
			} else if (keyCode===39) {
					moveRight=true;
			}
		}
		function deactivate(event) {
			var keyCode=event.keyCode;
			if (keyCode===37) {
				moveLeft=false;
			} else if (keyCode===39) {
				moveRight=false;
			}
		}
		function fire() {
			var keyCode=event.keyCode;
			if (keyCode===32) {
				missiles.push({x : x, y : y, width : 2, height : 7});
			}
		}

		interval_id = window.setInterval(draw, 33);
	}

	function spawn_enemies() {
		for (var i=0; i<enemies.length; i+=1){
			var e=enemies[i];
			context.fillStyle='red';
			context.fillRect(e.x, e.y+=speed, e.width, e.height);
			if(e.y===570) {
				lose()
			}
		}
	}

	function render_missiles() {
		for (var i=0; i<missiles.length; i+=1) {
			var m=missiles[i];
			context.fillStyle='orange';
			context.fillRect(m.x+4, m.y-=5, m.width, m.height);
			collides(m, i)
			if (m.y<0) {
				missiles.splice(i, 1)
			}
		}
	}

	function collides(m, m_index) {
		for (var i=0; i<enemies.length; i+=1) {
			var e = enemies[i];
			if (m.x+m.width>=e.x && m.x<=e.x+e.width && m.y>=e.y && m.y<=e.y+e.height) {
				missiles.splice(m, 1)
				enemies.splice(i, 1)
				enemies.push({x : e.x, y : getRandomNumber(-30, -100), width : 3*size, height : 3*size})
				score+=1
			}
		}
	}

    function draw() {
    	context.clearRect(0, 0, width, height);
    	context.fillStyle='green';
    	context.fillRect(x, y, size, size);
    	if (moveRight) {
    		x+=5
    	} else if (moveLeft) {
    		x-=5
    	}
    	spawn_enemies();
    	render_missiles();
    }

    function lose(){
    	window.alert("You lost");
    	clearInterval(interval_id);
    }

    function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }
})();