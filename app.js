var buzzBuzzers = require('buzz-buzzers');
const buzzers = buzzBuzzers();

var express = require('express');
var ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


app.use(express.static('public'));


var buzzerlock = false; //TRUE = DESACTIVE
// Chargement de la page index.html
app.get('/', function (req, res) {
    //  res.sendfile(__dirname + '/img/1.bmp');
    //  res.sendfile(__dirname + '/img/2.bmp');
    res.sendFile(__dirname + '/master.html');

});

app.get('/master', function (req, res) {
    res.sendFile(__dirname + '/master.html');
});




io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('reset', function (pseudo) { 
        buzzers.setLeds(true,true,true,true);
        buzzerlock=false;
    });

    socket.on('cligno3s', function (pseudo) { 
        clignoter();
    });

 socket.on('test', function (pseudo) { 
        console.log("le test");
        test();
    });



});
swag();


function test(){
    var i =0 ;
    while(i<5000) {
        setTimeout(allumer,i);
        setTimeout(eteindre, i+100);
        i+=200;
    }
}









function swag(){
    buzzers.setLeds(true, false, false, false);
    setTimeout(function() {
        buzzers.setLeds(true, true, false, false);
        setTimeout(function() {
            buzzers.setLeds(true, true, true, false);
            setTimeout(function() {
               buzzers.setLeds(true, true, true, true);
               setTimeout(function() {
                buzzers.setLeds(false, true, true, true);
                setTimeout(function() {
                    buzzers.setLeds(false, false, true, true);
                    setTimeout(function() {
                        buzzers.setLeds(false, false, false, true);
                        setTimeout(function() {
                            buzzers.setLeds(false, false, false, false);
                            setTimeout(function() {
                                buzzers.setLeds(true, true, true, true);
                                setTimeout(function() {
                                    buzzers.setLeds(false, false, false, false);
                                    setTimeout(function() {
                                        buzzers.setLeds(true, true, true, true);
                                        setTimeout(function() {
                                            buzzers.setLeds(false, false, false, false);
                                            setTimeout(function() {
                                                buzzers.setLeds(true, true, true, true);
                                                setTimeout(function() {
                                                    buzzers.setLeds(false, false, false, false);
                                                    setTimeout(function() {
                                                        buzzers.setLeds(true, true, true, true);

                                                    }, 250);
                                                }, 250);
                                            }, 250);
                                        }, 250);
                                    }, 250);
                                }, 250);
                            }, 250);
                        }, 250);
                    }, 250);
                }, 250);
            }, 250);
           },250);
        },250);
    },250);
}

function blinkBuzzerLeds() {

    setInterval(function() {

        buzzers.setLeds(true, true, true, true);

        setTimeout(function() {

            buzzers.setLeds(false, false, false, false);

        }, 500);

    }, 5000);

}


function allumer(){
    buzzers.setLeds(true,true,true,true);
}
function eteindre(){
    buzzers.setLeds(false,false,false,false);
}

function clignoter(){
    buzzerlock=true;
    setTimeout(function() {
       allumer()
       setTimeout(function() {
         eteindre();
         setTimeout(function() {
             allumer()
             setTimeout(function() {
               eteindre();
               setTimeout(function() {
                 allumer()
                 setTimeout(function() {
                   eteindre();
                   setTimeout(function() {
                     allumer()
                     setTimeout(function() {
                       eteindre();
                       setTimeout(function() {
                         allumer()
                         setTimeout(function() {
                           eteindre();
                           setTimeout(function() {
                             allumer()
                             setTimeout(function() {
                               eteindre();
                               setTimeout(function() {
                                 allumer()
                                 setTimeout(function() {
                                   eteindre();
                                   setTimeout(function() {
                                     allumer()
                                     setTimeout(function() {
                                       eteindre();
                                       setTimeout(function() {
                                         allumer()
                                         setTimeout(function() {
                                           eteindre();
                                           setTimeout(function() {
                                             allumer()
                                             buzzerlock=false;
                                         }, 125);
                                       }, 125);
                                     }, 125);
                                   }, 125);
                                 }, 125);
                               }, 125);
                             }, 125);
                           }, 125);
                         }, 125);
                       }, 125);
                     }, 125);
                   }, 125);
                 }, 125);
               }, 125);
             }, 125);
           }, 125);
         }, 125);
     }, 125);
   }, 125);
    console.log(buzzerlock);
}

//blinkBuzzerLeds();

buzzers.onError(function(err) {

    console.log('Error:', err);

});



buzzers.onPress(function(ev) {
    if(buzzerlock == false && ev.button==0){

        console.log(buzzerlock);
        console.log("[BUZZER] le buzzer " +ev.controller+ " a buzzé");
        io.sockets.emit("qui",ev.controller);
        buzzerlock=true;
        if(ev.controller == 1) {
            buzzers.setLeds(true,false,false,false);
        }
        if(ev.controller == 2) {
            buzzers.setLeds(false,true,false,false);
        }
        if(ev.controller == 3) {
            buzzers.setLeds(false,false,true,false);
        }
        if(ev.controller == 4) {
            buzzers.setLeds(false,false,false,true);
        }
    }
 /*   if(ev.button==4){
        buzzers.setLeds(false,false,false,false);
        buzzerlock=false;
    }
    */
});

/*

buzzers.onRelease(function(ev) {

   // console.log(

  //      `RELEASED: { "Controller": ${ev.controller}, "Button": ${ev.button} }`

//    );

});



buzzers.onChange(function(ev) {

    //console.log(`CHANGED: ${ev}`);

});*/
server.listen(8080);