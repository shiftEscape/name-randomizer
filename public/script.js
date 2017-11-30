// Author: Alvin James Bellero <ajames.bellero@gmail.com>
// NPM: https://www.npmjs.com/~shiftescape

window.onload = function() {

  // Source: http://jsfiddle.net/Javalsu/vxP5q/743/embedded/result/

  var canvas;
  var ctx;
  var W;
  var H;
  var mp = 150; //max particles
  var particles = [];
  var angle = 0;
  var tiltAngle = 0;
  var confettiActive = true;
  var animationComplete = true;
  var deactivationTimerHandler;
  var reactivationTimerHandler;
  var animationHandler;

  // objects

  var particleColors = {
      colorOptions: ["DodgerBlue", "OliveDrab", "Gold", "pink", "SlateBlue", "lightblue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"],
      colorIndex: 0,
      colorIncrementer: 0,
      colorThreshold: 10,
      getColor: function () {
          if (this.colorIncrementer >= 10) {
              this.colorIncrementer = 0;
              this.colorIndex++;
              if (this.colorIndex >= this.colorOptions.length) {
                  this.colorIndex = 0;
              }
          }
          this.colorIncrementer++;
          return this.colorOptions[this.colorIndex];
      }
  }

  window.requestAnimFrame = (function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
          return window.setTimeout(callback, 1000 / 60);
      };
  })();

  function confettiParticle(color) {
      this.x = Math.random() * W; // x-coordinate
      this.y = (Math.random() * H) - H; //y-coordinate
      this.r = RandomFromTo(10, 30); //radius;
      this.d = (Math.random() * mp) + 10; //density;
      this.color = color;
      this.tilt = Math.floor(Math.random() * 10) - 10;
      this.tiltAngleIncremental = (Math.random() * 0.07) + .05;
      this.tiltAngle = 0;

      this.draw = function () {
          ctx.beginPath();
          ctx.lineWidth = this.r / 2;
          ctx.strokeStyle = this.color;
          ctx.moveTo(this.x + this.tilt + (this.r / 4), this.y);
          ctx.lineTo(this.x + this.tilt, this.y + this.tilt + (this.r / 4));
          return ctx.stroke();
      }
  }

  SetGlobals();

  function SetGlobals() {
      canvas = document.getElementById("canvas");
      ctx = canvas.getContext("2d");
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
  }

  function InitializeConfetti() {
      particles = [];
      animationComplete = false;
      for (var i = 0; i < mp; i++) {
          var particleColor = particleColors.getColor();
          particles.push(new confettiParticle(particleColor));
      }
      StartConfetti();
  }

  function Draw() {
      ctx.clearRect(0, 0, W, H);
      var results = [];
      for (var i = 0; i < mp; i++) {
          (function (j) {
              results.push(particles[j].draw());
          })(i);
      }
      Update();

      return results;
  }

  function RandomFromTo(from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from);
  }


  function Update() {
      var remainingFlakes = 0;
      var particle;
      angle += 0.01;
      tiltAngle += 0.1;

      for (var i = 0; i < mp; i++) {
          particle = particles[i];
          if (animationComplete) return;

          if (!confettiActive && particle.y < -15) {
              particle.y = H + 100;
              continue;
          }

          stepParticle(particle, i);

          if (particle.y <= H) {
              remainingFlakes++;
          }
          CheckForReposition(particle, i);
      }

      if (remainingFlakes === 0) {
          StopConfetti();
      }
  }

  function CheckForReposition(particle, index) {
      if ((particle.x > W + 20 || particle.x < -20 || particle.y > H) && confettiActive) {
          if (index % 5 > 0 || index % 2 == 0) //66.67% of the flakes
          {
              repositionParticle(particle, Math.random() * W, -10, Math.floor(Math.random() * 10) - 10);
          } else {
              if (Math.sin(angle) > 0) {
                  //Enter from the left
                  repositionParticle(particle, -5, Math.random() * H, Math.floor(Math.random() * 10) - 10);
              } else {
                  //Enter from the right
                  repositionParticle(particle, W + 5, Math.random() * H, Math.floor(Math.random() * 10) - 10);
              }
          }
      }
  }
  function stepParticle(particle, particleIndex) {
      particle.tiltAngle += particle.tiltAngleIncremental;
      particle.y += (Math.cos(angle + particle.d) + 3 + particle.r / 2) / 2;
      particle.x += Math.sin(angle);
      particle.tilt = (Math.sin(particle.tiltAngle - (particleIndex / 3))) * 15;
  }

  function repositionParticle(particle, xCoordinate, yCoordinate, tilt) {
      particle.x = xCoordinate;
      particle.y = yCoordinate;
      particle.tilt = tilt;
  }

  function StartConfetti() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      (function animloop() {
          if (animationComplete) return null;
          animationHandler = requestAnimFrame(animloop);
          return Draw();
      })();
  }

  function ClearTimers() {
      clearTimeout(reactivationTimerHandler);
      clearTimeout(animationHandler);
  }

  function DeactivateConfetti() {
      confettiActive = false;
      ClearTimers();
  }

  function StopConfetti() {
      animationComplete = true;
      if (ctx == undefined) return;
      ctx.clearRect(0, 0, W, H);
  }

  function RestartConfetti() {
      ClearTimers();
      StopConfetti();
      reactivationTimerHandler = setTimeout(function () {
          confettiActive = true;
          animationComplete = false;
          InitializeConfetti();
      }, 100);

  }

// =============================================================================================

  var loopDuration = 5;
  var sndTick = new Audio("beeptrim.wav");
  var sndWin = new Audio("win.mp3");

  var origList = [
    'LUGOD, JAYVEE',
    'BACALSO, FAYE SHARLAINE',
    'DIANGO, ERLINDA',
    'FLORES, VINCENT',
    'Vincent Aycardo',
    'LAPESIGUE, RICHARD',
    'AVES, CHINO JOSEPH',
    'MALINAO, MARY JOY',
    'TOMADA, JOELLYN',
    'Mark Amoin',
    'PADILLO, FRANCELEY',
    'CALAMOHOY, AILYN',
    'ZAMORA, HERBERT',
    'Mindy Sy',
    'BUCOG II, EMERITO',
    'EBRADO, RICHARD',
    'PEPITO, PETER PAUL',
    'ROMEO, BEETHOVEN',
    'Glenn Rible',
  ];
                  
  var entriesList = origList;
  var rand = -1, pickedEntry = '',
      defaultText = 'Click to Randomize!',
      isStopOut = false;
  var outName = document.getElementById('name'),
      btnRandom = document.getElementById('btn-random'),
      btnClaimed = document.getElementById('btn-claimed'),
      numEntries = document.getElementById('num-entries'),
      btnStartOver = document.getElementById('btn-startover');
      imgCongrats = document.getElementById('congrats');
  
  generateListBox();
  
  function generateListBox () {
      var lb = document.getElementById('names');
      for (var i in entriesList) {
          var opt = document.createElement("option");
          opt.text = opt.value = entriesList[i];
          lb.options.add(opt)
      } lb.size = entriesList.length;
  }

  function updateEntriesCount() {
    numEntries.innerHTML = entriesList.length;
  }
  
  function isValidForRandomize() {
    return entriesList.length > 1;
  }

  function isValidForClaim() {
    return entriesList.length > 0;
  }
  
  function playSound(type) {
    var player = type == 'tick' ? sndTick : sndWin;
    player.currentTime = 0;
    player.play();
  }

  function labelWinName(isWin) {
    if(isWin) {
      imgCongrats.style.display = 'block';
      imgCongrats.classList.add('win');
    } else {
      imgCongrats.style.display = 'none';
      imgCongrats.classList.remove('win');
    }
  }

  function randomizer() {
    var list = document.getElementById('names');

    var tOutRand = setTimeout(function () {
      rand = Math.floor(Math.random() * entriesList.length);
      playSound('tick');
      pickedEntry = entriesList[rand];
      outName.innerHTML = pickedEntry;
      list.value = pickedEntry;
      if(!isStopOut) {
        randomizer();
      } else {
        labelWinName(true);
        RestartConfetti();
        playSound('win');
        clearTimeout(tOutRand);
      }
    }, 100);
  }
  
  function theLoop (i) {
    var tOutLoop = setTimeout(function () {
      if (--i) {
        randomizer();
        isStopOut = false;
        theLoop(i);
      } else {
        isStopOut = true;
        clearTimeout(tOutLoop);
        btnClaimed.style.display = 'inline-block';
      }
    }, 1000);
  }
  
  updateEntriesCount();

  // ================================================================
  
    // if (!annyang) {
    //     console.log("Speech Recognition is not supported");
    // } else {
    //     console.info("Annyang supported!")
    // }

    // var commands = {
    //     ':start': function () {
    //         btnRandom.click();
    //     },
    //     ':next': function () {
    //         btnClaimed.click();
    //     },
    // };

    // // Add our commands to annyang
    // annyang.addCommands(commands);

    // annyang.addCallback('resultNoMatch', function (phrases) {
    //     console.log("I think the user said: ", phrases[0]);
    //     console.log("But then again, it could be any of the following: ", phrases);
    // });

    // annyang.addCallback('resultMatch', function (phrases) {
    //     console.log("I think the user said: ", phrases[0]);
    //     console.log("But then again, it could be any of the following: ", phrases);
    // });

    document.body.onkeydown = function (e) {
        var btnRand = document.getElementById('btn-random')
        var btnNext = document.getElementById('btn-claimed')
        console.log(btnNext.attributes.style.value)
        var isVisibleNext = btnNext.attributes.style.value !== 'display: none;';
        console.log(isVisibleNext)
        if (e.key == 'o' && (!btnRand.disabled && !isVisibleNext)) {
            btnRandom.click();
        }
        if (e.key == 'p' && isVisibleNext) {
            btnClaimed.click();
        }
    }


  btnRandom.addEventListener("click", function() {
    this.disabled = true;
    outName.style.display = 'block';
    btnClaimed.style.display = 'none';
    if(isValidForRandomize()) theLoop(loopDuration);
    
  });
  
  btnClaimed.addEventListener("click", function() {
    entriesList.splice(rand, 1);
    updateEntriesCount();
    labelWinName(false);
    StopConfetti();

    if(entriesList.length == 1) {
      outName.innerHTML = entriesList[0];
    } else {
      outName.innerHTML = entriesList.length === 0 ? 'No entries left' : '';
      if(entriesList.length === 0) {
        btnRandom.style.display = 'none';
        btnStartOver.style.display = 'inline-block';
      } else {
        btnRandom.disabled = false;
      }
      btnClaimed.style.display = 'none';
    }

    outName.style.display = 'none';
    document.getElementById('names').innerHTML = "";
    generateListBox();
  });
  
  btnStartOver.addEventListener("click", function startOver() {
    entriesList = origList;
    updateEntriesCount();
    btnRandom.style.display = 'inline-block';
    btnRandom.disabled = false;
    btnStartOver.style.display = 'none';
  });

};

window.onresize = function () {
  canvas.left = 0;
  canvas.right = 0;
  canvas.top = 0;
  canvas.bottom = 0;
};