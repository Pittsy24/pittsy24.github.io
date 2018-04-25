
        var canvasWidths = document.getElementById("containter").clientWidth

        document.getElementById("meter").width =  canvasWidths

        var myGamePiece;
        var myObstacles = [];
        var myScore;

        function startGame() {
            myGamePiece = new component(15, 15, "red", 10, 120);
            myGamePiece.gravity = 0.05;
            myScore = new component("30px", "Consolas", "black", 380, 40, "text");
            myGameArea.start();
            console.log(myGameArea)
        }

        var myGameArea = {
            canvas : document.createElement("canvas"),
            start : function() {
                this.canvas.width = canvasWidths;
                this.canvas.height = 270;
                this.context = this.canvas.getContext("2d");
                document.getElementById("main").appendChild(this.canvas);
                // document.body.insertBefore((this.canvas);, document.body.childNodes[0]);
                this.frameNo = 0;
                this.interval = setInterval(updateGameArea, 20);
                },
            clear : function() {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }

        function component(width, height, color, x, y, type) {
            this.type = type;
            this.score = 0;
            this.width = width;
            this.height = height;
            this.speedX = 0;
            this.speedY = 0;    
            this.x = x;
            this.y = y;
            this.gravity = 0;
            this.gravitySpeed = 0;
            this.update = function() {
                ctx = myGameArea.context;
                if (this.type == "text") {
                    ctx.font = this.width + " " + this.height;
                    ctx.fillStyle = color;
                    ctx.fillText(this.text, this.x, this.y);
                } else {
                    ctx.fillStyle = color;
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
            }
            this.newPos = function() {
                this.gravitySpeed += this.gravity;
                this.x += this.speedX;
                this.y += this.speedY + this.gravitySpeed;
                this.hitBottom();
            }
            this.hitBottom = function() {
                var rockbottom = myGameArea.canvas.height - this.height;
                if (this.y > rockbottom) {
                    this.y = rockbottom;
                    this.gravitySpeed = 0;
                }
            }
            this.crashWith = function(otherobj) {
                var myleft = this.x;
                var myright = this.x + (this.width);
                var mytop = this.y;
                var mybottom = this.y + (this.height);
                var otherleft = otherobj.x;
                var otherright = otherobj.x + (otherobj.width);
                var othertop = otherobj.y;
                var otherbottom = otherobj.y + (otherobj.height);
                var crash = true;
                if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                    crash = false;
                }
                return crash;
            }
        }

        function updateGameArea() {
            var x, height, gap, minHeight, maxHeight, minGap, maxGap;
            for (i = 0; i < myObstacles.length; i += 1) {
                if (myGamePiece.crashWith(myObstacles[i])) {
                    return;
                } 
            }
            myGameArea.clear();
            myGameArea.frameNo += 1;
            if (myGameArea.frameNo == 1 || everyinterval(150)) {
                x = myGameArea.canvas.width;
                minHeight = 20;
                maxHeight = 200;
                height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
                minGap = 75;
                maxGap = 125;
                gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
                myObstacles.push(new component(10, height, "green", x, 0));
                myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
            }
            for (i = 0; i < myObstacles.length; i += 1) {
                myObstacles[i].x += -1;
                myObstacles[i].update();
            }
            myScore.text="SCORE: " + myGameArea.frameNo;
            myScore.update();
            myGamePiece.newPos();
            myGamePiece.update();
        }

        function everyinterval(n) {
            if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
            return false;
        }

        function accelerate(n) {
            myGamePiece.gravity = n;
        }

        function createAudioMeter(audioContext,clipLevel,averaging,clipLag) {
            var processor = audioContext.createScriptProcessor(512);
            processor.onaudioprocess = volumeAudioProcess;
            processor.clipping = false;
            processor.lastClip = 0;
            processor.volume = 0;
            processor.clipLevel = clipLevel || 0.98;
            processor.averaging = averaging || 0.95;
            processor.clipLag = clipLag || 750;

            // this will have no effect, since we don't copy the input to the output,
            // but works around a current Chrome bug.
            processor.connect(audioContext.destination);

            processor.checkClipping =
                function(){
                    if (!this.clipping)
                        return false;
                    if ((this.lastClip + this.clipLag) < window.performance.now())
                        this.clipping = false;
                    return this.clipping;
                };

            processor.shutdown =
                function(){
                    this.disconnect();
                    this.onaudioprocess = null;
                };

            return processor;
        }

        function volumeAudioProcess( event ) {
            var buf = event.inputBuffer.getChannelData(0);
            var bufLength = buf.length;
            var sum = 0;
            var x;

            // Do a root-mean-square on the samples: sum up the squares...
            for (var i=0; i<bufLength; i++) {
                x = buf[i];
                if (Math.abs(x)>=this.clipLevel) {
                    this.clipping = true;
                    this.lastClip = window.performance.now();
                }
                sum += x * x;
            }

            // ... then take the square root of the sum.
            var rms =  Math.sqrt(sum / bufLength);

            // Now smooth this out with the averaging factor applied
            // to the previous sample - take the max here because we
            // want "fast attack, slow release."
            this.volume = Math.max(rms, this.volume*this.averaging);
        }


        var audioContext = null;
        var meter = null;
        var canvasContext = null;
        var WIDTH=canvasWidths;
        var HEIGHT=50;
        var rafID = null;

        window.onload = function() {
            startGame()

            // grab our canvas
            canvasContext = document.getElementById( "meter" ).getContext("2d");
            
            // monkeypatch Web Audio
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            
            // grab an audio context
            audioContext = new AudioContext();

            // Attempt to get audio input
            try {
                // monkeypatch getUserMedia
                navigator.getUserMedia = 
                    navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia;

                // ask for an audio input
                navigator.getUserMedia(
                {
                    "audio": {
                        "mandatory": {
                            "googEchoCancellation": "false",
                            "googAutoGainControl": "false",
                            "googNoiseSuppression": "false",
                            "googHighpassFilter": "false"
                        },
                        "optional": []
                    },
                }, onMicrophoneGranted, onMicrophoneDenied);
            } catch (e) {
                alert('getUserMedia threw exception :' + e);
            }

        }

        function onMicrophoneDenied() {
            alert('Stream generation failed.');
        }

        var mediaStreamSource = null;

        function onMicrophoneGranted(stream) {
            // Create an AudioNode from the stream.
            mediaStreamSource = audioContext.createMediaStreamSource(stream);

            // Create a new volume meter and connect it.
            meter = createAudioMeter(audioContext);
            mediaStreamSource.connect(meter);

            // kick off the visual updating
            onLevelChange();
        }

        function onLevelChange( time ) {
            // clear the background
            canvasContext.clearRect(0,0,WIDTH,HEIGHT);

            // check if we're currently clipping
            if (meter.checkClipping())
                canvasContext.fillStyle = "red";
            else
                canvasContext.fillStyle = "green";

            myGamePiece.speedY = -meter.volume*100

            // draw a bar based on the current volume
            canvasContext.fillRect(0, 0,meter.volume *  WIDTH *1.4, HEIGHT);

            // set up the next visual callback
            rafID = window.requestAnimationFrame( onLevelChange );
        }
        window.onresize = function(event) {
            canvasWidths = document.getElementById("containter").clientWidth

            document.getElementById("meter").width =  canvasWidths
            myGameArea.canvas.width = canvasWidths
            WIDTH = canvasWidths
            
        };