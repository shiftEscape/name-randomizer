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

  var origList = ['ABAD, NIKKI NOREEN',
                  'ABAO, EMMANUEL',
                  'ABELLA, RYAN',
                  'ABUDA, EDMONDO',
                  'ACEBU, PONCE ANTHONY',
                  'AGAD, GRUIL',
                  'AGUILAR, LYRA MAY',
                  'ALBOR, RHESHELLE MAE',
                  'ALEGRIA, CHERYL MARIE',
                  'ALINSUG, NINA',
                  'ALLEGO, KEEFER LLOYD',
                  'ALMIA, CELSO LANCE',
                  'ALONSO, CYD',
                  'ALTERADO, KIMBERLY',
                  'ALVAREZ, DAVE',
                  'ALVERO, KIM',
                  'AMANTE, EARL EVAN',
                  'AMARILLE, ED HAROLD',
                  'AMOIN, MARK',
                  'ANTIGUA, ARVIN DWIGHT',
                  'ANTIPUESTO, ARIEL',
                  'APEPE, ROLEX',
                  'ARDINA, JEZRIEL',
                  'ARELLANO, JUDE ACE CHRISTIAN',
                  'ARRIBA, RACHEL',
                  'ASCANO, CHRISTIAN VER',
                  'ATIS, REYMOND',
                  'AVES, CHINO JOSEPH',
                  'AYCARDO, VINCENT',
                  'AZCARRAGA, DENNIS',
                  'BACOSA, JULIUS',
                  'BALAZO, NILS ARNE',
                  'BALTAZAR, JOHN DAVID',
                  'BANTECIL, ALJON',
                  'BAYON-ON, GIO REY',
                  'BEDRIJO, EVELYN',
                  'BELLERO, ALVIN JAMES',
                  'BERMUDEZ, JEAN PIERE ANGELO',
                  'BERNADOS, SHANTANA MICHELLE',
                  'BOYLES, JUNDELLE',
                  'BRAZIL, MELODIO',
                  'BUCOG, EMERITO',
                  'BUENAVIAJE, REYMOND',
                  'BULANON, JANNET',
                  'CABALUNA, LORY',
                  'CABANAG, ARIEL DOMINIC',
                  'CABANG, EDESA',
                  'CABUQUIT, PETER ANDREW',
                  'CALARA, HAZEL',
                  'CALBONERO, JUNNIE',
                  'CAMPOS, CARLOS',
                  'CANENCIA, GUILELESS',
                  'CANENCIA, CHRISTINE JANIS MARIE',
                  'CANLAS, FRISLEY',
                  'CAPAROSO, ANGELI',
                  'CARILLO, FATIMA GRACE',
                  'CASTELLANO, DANNAH',
                  'CENIZA, ROLAND',
                  'COLLADOS, KYAM ERZON',
                  'COMAJIG, DIXON',
                  'CREDO, RENANTE',
                  'CRISTAL JR., ISMAEL',
                  'CUIZON, PAULINE',
                  'CULABAN, EDMON',
                  'CUNA, ANNA DOMINIQUE',
                  'DANO, JASMIN',
                  'DATANAGAN, JONATHAN',
                  'DE GUZMAN, RHEA MAY',
                  'DE JESUS, ARNIEL',
                  'DE LA CRUZ, CHRISTINE JOY',
                  'DE LA PENA, HENDRIX',
                  'DE LEON, TRYLLE GOODIE',
                  'DEL CORRO, NOEL',
                  'DEL ROSARIO, MA. JESCELYN',
                  'DELOS REYES, ROWE REY',
                  'DEOCARES, JASON',
                  'DESQUITADO, JUDE THADDEU',
                  'DIALA, MARCO PAULO',
                  'DIANGO, ERLINDA',
                  'DILAO, OLIVER',
                  'DIVINAGRACIA, IAN ROSS',
                  'DIZON, SHERWEN SOL',
                  'DONGALLO, BERNARD',
                  'DOROON, MARIA JANESSA',
                  'EBRADO, RICHARD',
                  'ELLOS, JEROME',
                  'EMPLEO, WILSON',
                  'ENTERA, RENANTE',
                  'ESCALANTE, ION MAE',
                  'ESPELITA, UARY JAN',
                  'ESTAREJA, KRISTELLE LYN',
                  'ESTRADA, ANN JORELIE',
                  'ESTRELLA, JAN-JAN',
                  'FAJARDO, JOSE MARIE',
                  'FLORES, VINCENT',
                  'FORMENTERA, JOHANNA',
                  'FREJOLES, ELMER',
                  'GADIANO, JHONEDEE',
                  'GILOS, MICHAEL',
                  'GLORIA, JANINE KATE',
                  'GOMEZ, JENNIFER MARIE',
                  'GULTIANO, LOU',
                  'HAMTO, RON',
                  'HERRADURA, SAMUEL',
                  'HERRADURA, ANN MARGRET',
                  'HIMAYA, MERLINDA',
                  'HUBAHIB, HONEY JILL',
                  'JIMENEZ, MARIANNE',
                  'JOMUAD, JAMES',
                  'JOPIA, ALFREDO',
                  'JUCDONG, ANJIE',
                  'JUMAO-AS, ALDWIN',
                  'KARAAN, RANDY',
                  'KHAN, MA. SIEEKA',
                  'LABRA, LEXTER',
                  'LANADA, CHARLES',
                  'LAPESIGUE, RICHARD',
                  'LAPIZ, KEVIN JAY',
                  'LARISMA, JOSE III',
                  'LASPINAS, RAFFY',
                  'LEDESMA, RANDOLPH',
                  'LEWIS, CHARLENE GAYLE',
                  'LIMPANGOG, ZENICA JOY',
                  'LIMPIO, JAN FLOYED',
                  'LOPEZ, TETCHIE ANN',
                  'LUCAS, FARLYN',
                  'LUGOD, RICO',
                  'LUGOD, JAYVEE',
                  'MABALE, JENNIE MAE',
                  'MACAPOBRE, ARNEL',
                  'MAGLINTE, JOSEPH',
                  'MAHINAY, KLAUS ANDREW',
                  'MAHUSAY, CEDIE',
                  'MALINAO, MARY JOY',
                  'MANGUBAT, REUBEN JAMES',
                  'MATULAC, PHERGIE MAY',
                  'MAUNES, JOANNE MARIE PIA',
                  'MEDILLO, REY MARK',
                  'MOODY, KEVIN',
                  'MORASTIL, ROSE ANN',
                  'NACUA , LOVELY',
                  'NAJARRO, CHRYS BHRENT',
                  'NAVAL, ARNOLD GEROME',
                  'NEIS, MICHAEL VINCENT',
                  'NERI, CIELITO JOY',
                  'NOEL, VICTOR PAUL',
                  'NOVO, LILIBETH',
                  'OCAMPO, ABIGAIL',
                  'PADERNAL, BRIAN',
                  'PADILLA, MARK EDWARD',
                  'PADILLO, FRANCELEY',
                  'PADOR, DARLENE GRACE',
                  'PALDO, JOSHUA',
                  'PALOMAR, ROEL-JED ADAM',
                  'PAMILAR, REX',
                  'PANER, ARIEL',
                  'PANUGALING, VINCENT',
                  'PASCUA, CRIS SAM',
                  'PEPITO, PETER PAUL',
                  'PEPITO, JOHN REY',
                  'PEREZ, DANIEL',
                  'PINGGOY, DANTE',
                  'PIQUERO, MARY MICHELLE',
                  'PO , JONATHAN MANUEL',
                  'PONFERRADA, VILLY',
                  'PONTALBA, ELVER JENITA',
                  'PORMINAL, JONNAS TRISTAN',
                  'PREJOLES, JULIESA MARIE',
                  'PRINCESA, RHEANNE MAE',
                  'PUNZAL, MARIAN THERESE',
                  'QUILES, FLORECE ANN',
                  'RAMIREZ, ALLAN',
                  'RAMOS, JOHANNA FE',
                  'RECOSOSA, JOFRE',
                  'RENACIA, MELBA',
                  'RIBLE, GLENN',
                  'RICARDO, DAN MICHAEL',
                  'ROBLES, CHRISTINA ISABEL',
                  'ROBLES, ERWIN',
                  'ROMEO, BEETHOVEN',
                  'RONQUILLO, BRYAN',
                  'RUBIA, RUCHIE',
                  'SABELLON, FREEGIE NIEL',
                  'SACAYAN, CHRISTIAN',
                  'SACEDON, JOHN LESTER',
                  'SAMSON, SAMANTHA ARIANNE',
                  'SANCHEZ, LLOYD',
                  'SARZATA, ANNA LOU',
                  'SENTIS, CARLO',
                  'SEPADA, MARK LAURENCE',
                  'SILORIO, KATHERINE',
                  'SIPALAY, JOHN PAUL',
                  'SON, RICHYLL',
                  'SUICO, ERWIN',
                  'SULTAN, JOSHUA EARL',
                  'SY, MINDY ALYSA',
                  'TABAL, HENLEY',
                  'TALMADGE, SYDNEY MORGAN ELOISE',
                  'TAMPOS, LOUIE JAKE',
                  'TIBON, JEROME',
                  'TIEMPO, MARIEL ROSE',
                  'TOMADA, JOELLYN',
                  'TOMBOC, ROGIE',
                  'TOMCO, JOE',
                  'TOMOL, MARLOU REY',
                  'TUMULAK, KEVIN PAUL',
                  'UY, JOAN NADENE',
                  'UY, JEREMIAH',
                  'UYENGHUA, CLYDE',
                  'VALDEZ, REGGIE',
                  'VELASCO, JERALD',
                  'VIDAL, ALVIN',
                  'VILLARIASA, JOANNA',
                  'VILLENA, REY',
                  'VILLETA, JONALIE',
                  'YCONG JR., FEROLINO',
                  'YLANAN, GEMARY',
                  'YORDAN, JOSEPH DON',
                  'YOUNG, KRISTIAN ANTHONY',
                  'YSLA, CARLO',
                  'ZAMORA, HERBERT',
                  'ZAMORA JR., EDWIN'];
                  
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
    var tOutRand = setTimeout(function () {
      rand = Math.floor(Math.random() * entriesList.length);
      playSound('tick');
      pickedEntry = entriesList[rand];
      outName.innerHTML = pickedEntry;
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