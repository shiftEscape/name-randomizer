// Code goes here

window.onload = function() {
  
  var snd = new Audio("beeptrim.wav");
  var origList = ['ABAD, NIKKI NOREEN',
                  'ABAO, EMMANUEL',
                  'ABELLA, RYAN',
                  'ABUDA, EDMONDO',
                  'ACEBU, PONCE ANTHONY',
                  'AGAD, GRUIL',
                  'AGUILAR, LYRA MAY',
                  'ALBOR, RHESHELLE MAE',
                  'ALEGRIA, CHERYL MARIE',
                  'ALINSUG, NIÑA',
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
                  'ASCAÑO, CHRISTIAN VER',
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
                  'CUÑA, ANNA DOMINIQUE',
                  'DAÑO, JASMIN',
                  'DATANAGAN, JONATHAN',
                  'DE GUZMAN, RHEA MAY',
                  'DE JESUS, ARNIEL',
                  'DE LA CRUZ, CHRISTINE JOY',
                  'DE LA PEÑA, HENDRIX',
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
                  'LASPIÑAS, RAFFY',
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
  
  function updateEntriesCount() {
    numEntries.innerHTML = entriesList.length;
  }
  
  function isValidForRandomize() {
    return entriesList.length > 1;
  }

  function isValidForClaim() {
    return entriesList.length > 0;
  }
  
  function playSound() { // buffers automatically when created  
    snd.currentTime = 0;
    snd.play();
  }
  
  function startOver() {
    entriesList = ['Alvin James', 'Franceley', 'Herbert', 'Jovit', 'Chino', 'Vince'];
    updateEntriesCount();
    outName.innerHTML = defaultText;
    btnRandom.style.display = 'inline-block';
    btnRandom.disabled = false;
    btnStartOver.style.display = 'none';
  }

  function randomizer() {
    var tOutRand = setTimeout(function () {
      rand = Math.floor(Math.random() * entriesList.length);
      playSound();
      pickedEntry = entriesList[rand];
      outName.innerHTML = pickedEntry;
      if(!isStopOut) {
        randomizer();
      } else {
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
    btnClaimed.style.display = 'none';
    if(isValidForRandomize()) theLoop(3);
  });
  
  btnClaimed.addEventListener("click", function() {
    entriesList.splice(rand, 1);
    updateEntriesCount();
    console.log(entriesList);
    console.log(rand);
    console.log(entriesList.length);
    if(entriesList.length == 1) {
      outName.innerHTML = entriesList[0];
    } else {
      outName.innerHTML = entriesList.length === 0 ? 'No entries left' : defaultText;
      if(entriesList.length === 0) {
        btnRandom.style.display = 'none';
        btnStartOver.style.display = 'inline-block';
      } else {
        btnRandom.disabled = false;
      }
      btnClaimed.style.display = 'none';
    }

  });
  
  btnStartOver.addEventListener("click", startOver);

};