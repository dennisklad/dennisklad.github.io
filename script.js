
        var canvas;
        var canvasContext;
        var ballX = 50;
        var ballSpeedX = 4;
        var ballY = 50;
        var ballSpeedY = 1;

        var mainMenu = true;
        var coop = false;

        var paddle1Y = 250;
        var paddle2Y = 250;
        const PADDLE_HEIGHT = 100;
        const PADDLE_WIDTH = 10;
        var fps = 100;
        var over1 = false;
        var over2 = false;
        var winScreen = false;

        var p1Score =0;
        var p2Score =0;
        const WIN_SCORE = 3;

        //when window finishes loading then run the code;
        window.onload = function() {
            console.log("Hello House!   Java Script code started.");

            canvas = document.getElementById("GameCanvas");
            canvasContext = canvas.getContext("2d");

            //Call funktion every time interval  (with inline Function)
            setInterval(function () { drawEverything(); moveEverything(); }, 1000/fps);

            //Event listener for Player1 paddle with mouse
            canvas.addEventListener('mousemove', function (evt){
                var mousePos = calcMousePosition(evt);
                //what to controll
                paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);})

            canvas.addEventListener("mousedown", handleMouseClick);

            //KEYBOARD LISTENER FOR COOP MODE
            window.addEventListener("keydown", function (e) {

                if(mainMenu){
                    if (e.keyCode == 67) {
                        mainMenu = false;
                        coop =true;
                    }
                    else if (e.keyCode == 83) {
                        mainMenu = false;
                        coop =false;
                    }
                }
                if (coop == true) {
                    if (e.keyCode == "38") {
                        console.log("Up.")
                        if (paddle2Y > 0)
                        paddle2Y -= 10;
                    } else if (e.keyCode == "40") {
                        console.log("Down.")
                        if (paddle2Y + PADDLE_HEIGHT < canvas.height )
                        paddle2Y += 10;}
                    }

                //Enter to continue
                if (e.keyCode == 32) {
               if (over1 || over2) {
                   reset();
                   over1 = false;
                   over2 = false;
               }
               else if(winScreen){
                   p1Score = 0;
                   p2Score = 0;
                   winScreen =false;
               }
           }

                //Backspace to go to main Menu
                else if (e.keyCode == 8) {
                if (winScreen) {
                mainMenu = true;}
           }

            }, false)


        }

        function handleMouseClick(evt){
            if(winScreen){
                p1Score = 0;
                p2Score = 0;
                winScreen =false;
            }
            if (over1 || over2){
                reset();
                over1 = false;
                over2 = false;
            }
        }

        function calcMousePosition(evt) {
            var rect = canvas.getBoundingClientRect();
            var root = document.documentElement;
            var mouseX = evt.clientX - rect.left - root.scrollLeft;
            var mouseY = evt.clientY - rect.top  //- root.scrollTop;
            return{
                x:mouseX,
                y:mouseY
            };
        }

        function drawEverything() {
            //Background
            colorRect(0, 0, canvas.width, canvas.height, "black");
            canvasContext.fillStyle = 'red';
            canvasContext.textAlign = "center";
            canvasContext.font = "15px Courier New"
            canvasContext.fillText("Nosni Game Studios ©", 125, canvas.height-20);

            if (mainMenu){
                drawMainMenu();
                return;
            }

            if (winScreen){
                canvasContext.fillStyle = 'white';
                canvasContext.textAlign = "center";
                if (p1Score >= WIN_SCORE){
                    canvasContext.fillText("Player 1 Won!", canvas.width/2, 200);
                }
                else if (p2Score >= WIN_SCORE){
                    canvasContext.fillText("Player 2 Won!", canvas.width/2, 200);

                }
                canvasContext.fillText("Click to continue", canvas.width/2, 300);

                return;
            }

            if (over1) {
                canvasContext.fillStyle = 'white';
                canvasContext.textAlign = "center";
                canvasContext.fillText("Game Reset. Player 1 Scored!", canvas.width/2, 200);
                canvasContext.fillText("Click to continue", canvas.width/2, 300);
                canvasContext.fillText(p1Score, 100, 100);
                canvasContext.fillText(p2Score, canvas.width-100, 100);
                return;
            }

            if (over2) {
                canvasContext.fillStyle = 'white';
                canvasContext.textAlign = "center";
                canvasContext.fillText("Game Reset. Player 2 Scored!", canvas.width/2, 200);
                canvasContext.fillText("Click to continue", canvas.width/2, 300);
                canvasContext.fillText(p1Score, 100, 100);
                canvasContext.fillText(p2Score, canvas.width-100, 100);
                return;
            }

            drawNet();
            //Ball
            colorCircle(ballX, ballY, 10, "red");
            //Player 1
            colorRect(20, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, "white");
            //Player 2
            colorRect(canvas.width-PADDLE_WIDTH-20, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, "white");
            //Score
            canvasContext.fillText(p1Score, 100, 100);
            canvasContext.fillText(p2Score, canvas.width-100, 100);

        }

        function drawMainMenu() {
            canvasContext.fillStyle = 'white';
            canvasContext.textAlign = "center";
            canvasContext.font = "50px Courier New";
            canvasContext.fillText("P l a y  P o n g", canvas.width/2, canvas.height/3-40);

            canvasContext.font = "25px Courier New";
            canvasContext.fillText("brought to you with Love <3", canvas.width/2, canvas.height/3);

            canvasContext.font = "20px Courier New";
            canvasContext.fillText("I want to play with my friend!", canvas.width/2, canvas.height/3 + 80);
            canvasContext.fillText("Press \"c\" to enter Co-op Mode.", canvas.width/2, canvas.height/3+ 110);

            canvasContext.fillStyle = 'red';
            canvasContext.font = "15px Courier New";
            canvasContext.fillText("ATTENTION: You need at least 1 Friend(s) to enter Co-op Mode!", canvas.width/2, canvas.height/3+ 135);

            canvasContext.fillStyle = 'white';
            canvasContext.font = "20px Courier New";
            canvasContext.fillText("NEW FEATURE: Targeted for people with 0 Friend(s).", canvas.width/2, canvas.height/3 + 200);
            canvasContext.fillText("Enjoy this classic retro Game alone. Press \"s\" to start.", canvas.width/2, canvas.height/3 + 230);
            canvasContext.font = "15px Courier New";
            canvasContext.fillStyle = 'gray';
            canvasContext.fillText("Do not worry! Someday you are going to find 1 Friend(s).", canvas.width/2, canvas.height/3+ 255);
        }

        function drawNet(){
            for (var i=0; i< canvas.height; i+=40){
                colorRect(canvas.width/2-1, i, 2, 20,'gray');
            }
        }

        function moveEverything() {

            if (mainMenu) return;

            if (winScreen || over1 || over2 ){
                return;
            }

            if (!coop) computerMovement();

            //X Movement
            ballX += ballSpeedX;
            if (ballX < 40){
                if (ballX >25 && ballY > paddle1Y-10 && ballY < paddle1Y+10 + PADDLE_HEIGHT){
                    ballSpeedX = -ballSpeedX;
                    //how far from the center does the ball hit the paddle
                    var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
                    ballSpeedY = deltaY * 0.1;
                }
                if (ballX < -100) {
                    p2Score ++;
                    over2 = true;
                }
            }

            if (ballX > canvas.width - 40) {
                if (ballX <canvas.width-25 && ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT){
                    ballSpeedX = -ballSpeedX;
                    //how far from the center does the ball hit the paddle
                    var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
                    ballSpeedY = deltaY * 0.1;
                }
                if (ballX > canvas.width+100){
                    p1Score ++ ;
                    over1 = true;
                }
            }

            //Y Position
            ballY += ballSpeedY;
            if (ballY < 10) {
                ballSpeedY = -ballSpeedY;
            }
            if (ballY > canvas.height - 10) {
                ballSpeedY = -ballSpeedY;
            }
        }
        
        function computerMovement(){
            var paddle2Center = paddle2Y + PADDLE_HEIGHT/2;
            if ( paddle2Center < ballY -35 )  paddle2Y += 3;
            else if ( paddle2Center > ballY + 35 )  paddle2Y -= 3;
        }

        function colorRect(X, Y, width, height, drawColor) {
            canvasContext.fillStyle = drawColor;
            canvasContext.fillRect(X, Y, width, height);
        }

        function colorCircle(X, Y, radius, color) {
            canvasContext.fillStyle = color;
            canvasContext.beginPath();
            canvasContext.arc(X, Y, radius, 0, Math.PI*2, true);
            canvasContext.fill();
        }

        function reset(){
            if (p1Score >= WIN_SCORE || p2Score >= WIN_SCORE){
                winScreen = true;
            }
            ballSpeedX = -ballSpeedX;
            ballSpeedY = 2;
            ballX = canvas.width/2;
            ballY = canvas.height/2;
        }






