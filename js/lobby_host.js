let lobby;
let users = []
let lobby_dom = $("#player_list");
// let lobby_user_html = '<div class="player">    <h3 class="player_name">![name]!</h3>    <button class="player_kick">      <svg        xmlns:dc="http://purl.org/dc/elements/1.1/"        xmlns:cc="http://creativecommons.org/ns#"        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"        xmlns:svg="http://www.w3.org/2000/svg"        xmlns="http://www.w3.org/2000/svg"        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"        version="1.1"        id="Capa_1"        x="0px"        y="0px"        viewBox="0 0 470 470"        style="enable-background: new 0 0 470 470"        xml:space="preserve"        sodipodi:docname="wellington-boot-svgrepo-com.svg"        inkscape:version="1.0 (b51213c273, 2020-08-10)"      >        <metadata id="metadata41">          <rdf:RDF            ><cc:Work rdf:about=""              ><dc:format>image/svg+xml</dc:format              ><dc:type                rdf:resource="http://purl.org/dc/dcmitype/StillImage" /></cc:Work          ></rdf:RDF>        </metadata>        <defs id="defs39" />        <sodipodi:namedview          pagecolor="#ffffff"          bordercolor="#666666"          borderopacity="1"          objecttolerance="10"          gridtolerance="10"          guidetolerance="10"          inkscape:pageopacity="0"          inkscape:pageshadow="2"          inkscape:window-width="1920"          inkscape:window-height="1052"          id="namedview37"          showgrid="false"          inkscape:zoom="1.3831041"          inkscape:cx="286.40166"          inkscape:cy="234.44864"          inkscape:window-x="0"          inkscape:window-y="28"          inkscape:window-maximized="1"          inkscape:current-layer="Capa_1"        />        <g id="g4" transform="matrix(-1.0106766,0,0,1,472.5085,0)">          <path            d="m 460.018,403.363 h -2.026 v -14.754 c 0,-38.142 -30.655,-73.985 -68.336,-79.9 l -75.901,-11.915 c -30.692,-4.818 -55.662,-34.013 -55.662,-65.082 V 7.5 c 0,-4.142 -3.358,-7.5 -7.5,-7.5 H 22.906 c -4.142,0 -7.5,3.358 -7.5,7.5 V 46.733 H 9.982 c -4.142,0 -7.5,3.358 -7.5,7.5 v 45.534 c 0,4.142 3.358,7.5 7.5,7.5 h 5.424 v 275.094 c -3.889,0.278 -6.959,3.513 -6.959,7.473 v 50.798 c 0,16.194 13.174,29.368 29.368,29.368 8.677,0 16.487,-3.783 21.868,-9.785 5.381,6.002 13.191,9.785 21.868,9.785 8.677,0 16.487,-3.783 21.868,-9.785 5.381,6.002 13.191,9.785 21.869,9.785 16.194,0 29.368,-13.174 29.368,-29.368 v -11.669 l 79.83,17.824 c 2.836,13.25 14.636,23.213 28.719,23.213 8.677,0 16.487,-3.783 21.868,-9.785 5.381,6.002 13.191,9.785 21.868,9.785 8.677,0 16.487,-3.783 21.868,-9.785 5.381,6.002 13.191,9.785 21.868,9.785 8.677,0 16.487,-3.783 21.868,-9.785 5.381,6.002 13.191,9.785 21.868,9.785 8.677,0 16.487,-3.783 21.868,-9.785 5.381,6.002 13.191,9.785 21.868,9.785 16.194,0 29.368,-13.174 29.368,-29.368 v -29.769 c 10e-4,-4.142 -3.357,-7.5 -7.499,-7.5 z M 30.406,15 H 138.877 V 46.733 H 57.482 v -2.5 c 0,-4.142 -3.358,-7.5 -7.5,-7.5 -4.142,0 -7.5,3.358 -7.5,7.5 v 2.5 H 30.406 Z M 17.482,92.268 V 61.733 h 25 v 30.534 h -25 z m 40,-30.535 H 168.877 V 92.267 H 57.482 Z m -15,45.535 v 2.5 c 0,4.142 3.358,7.5 7.5,7.5 4.142,0 7.5,-3.358 7.5,-7.5 v -2.5 h 118.895 c 4.142,0 7.5,-3.358 7.5,-7.5 V 54.233 c 0,-4.142 -3.358,-7.5 -7.5,-7.5 h -22.5 V 15 h 89.216 v 216.712 c 0,38.143 30.655,73.985 68.336,79.9 l 75.901,11.915 c 30.692,4.818 55.662,34.014 55.662,65.082 v 14.754 H 242.164 L 148.79,382.514 c -0.537,-0.12 -1.084,-0.18 -1.634,-0.18 H 30.406 V 239.212 h 55.971 c 37.22,0 67.5,-30.28 67.5,-67.5 v -41.944 c 0,-4.142 -3.358,-7.5 -7.5,-7.5 -4.142,0 -7.5,3.358 -7.5,7.5 v 41.944 c 0,28.949 -23.551,52.5 -52.5,52.5 H 30.406 V 107.268 Z m 410.036,333.364 c 0,7.923 -6.446,14.368 -14.368,14.368 -7.923,0 -14.368,-6.445 -14.368,-14.368 0,-4.142 -3.358,-7.5 -7.5,-7.5 -4.142,0 -7.5,3.358 -7.5,7.5 0,7.923 -6.445,14.368 -14.368,14.368 -7.923,0 -14.368,-6.445 -14.368,-14.368 0,-4.142 -3.358,-7.5 -7.5,-7.5 -4.142,0 -7.5,3.358 -7.5,7.5 0,7.923 -6.445,14.368 -14.368,14.368 -7.922,0 -14.368,-6.445 -14.368,-14.368 0,-4.142 -3.358,-7.5 -7.5,-7.5 -4.142,0 -7.5,3.358 -7.5,7.5 0,7.923 -6.445,14.368 -14.368,14.368 -7.923,0 -14.368,-6.445 -14.368,-14.368 0,-4.142 -3.358,-7.5 -7.5,-7.5 -4.142,0 -7.5,3.358 -7.5,7.5 0,7.923 -6.446,14.368 -14.368,14.368 -7.923,0 -14.368,-6.445 -14.368,-14.368 0,-3.512 -2.438,-6.554 -5.866,-7.32 l -94.181,-21.029 c -2.221,-0.498 -4.548,0.043 -6.324,1.467 -1.776,1.423 -2.81,3.576 -2.81,5.853 v 21.029 c 0,7.923 -6.446,14.368 -14.368,14.368 -7.923,0 -14.368,-6.445 -14.368,-14.368 0,-4.142 -3.358,-7.5 -7.5,-7.5 -4.142,0 -7.5,3.358 -7.5,7.5 0,7.923 -6.445,14.368 -14.368,14.368 -7.923,0 -14.368,-6.445 -14.368,-14.368 0,-4.142 -3.358,-7.5 -7.5,-7.5 -4.142,0 -7.5,3.358 -7.5,7.5 0,7.923 -6.445,14.368 -14.368,14.368 -7.922,0 -14.368,-6.445 -14.368,-14.368 v -43.298 h 122.882 l 93.374,20.849 c 0.537,0.12 1.084,0.18 1.634,0.18 h 211.182 v 22.269 z"            id="path2"          />        </g>        <g id="g6" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g8" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g10" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g12" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g14" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g16" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g18" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g20" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g22" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g24" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g26" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g28" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g30" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g32" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g34" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>      </svg>    </button>  </div>';

function dataReceived(sender, data){
    console.log(`${sender}: ${data}`);
}

function newUser(user){
    console.log(user + " Connected");
    if(users.length == 0){
        lobby_dom.append(lobby_user_html.replace('<div class="player ">', '<div class="player host">').replace("![name]!", user).replace('<button class="player_kick">        <img            src="/resources/images/secret_hitler/boot.svg"        ></img>    </button>', ''));
        lobby.Connections[users.length].Send({"leader": true});
  
    }else{
        lobby_dom.append(lobby_user_html.replace("![name]!", user));
        lobby.Connections[users.length].Send({"leader": false});

    }
    users.push(user);
    $("#player_count")[0].innerHTML = " Players: "+users.length+"/10";

}

// $("#create_lobby").click(() => {
//     lobby = new Lobby("My Lobby",);
// });
function replaceAll(string, selector, value) {
    let rString = string;
    let pString;
    do {
      pString = rString;
      rString = rString.replace(selector, value);
    } while (pString != rString);
    return rString;
  }

let lobby_user_html = '<div class="player ">    <h3 class="player_name">![name]!</h3>    <button class="player_kick">        <img            src="/resources/images/secret_hitler/boot.svg"        ></img>    </button></div>'
let lobby_name = "Player One";
let lobby_code;


$("#create_lobby").click(() => {
    lobby_name = $("#create_name")[0].value;
    $("#secret_join").css("height", $("#secret_join").height());
    $("#secret_join").css("overflow", "hidden");
    lobby_code= replaceAll(lobby_name, " ", "_")+Math.round(Math.random()*10)+Math.round(Math.random()*10)+Math.round(Math.random()*10);
    lobby = new Lobby(lobby_code);

    $("#secret_join").animate(
        {
            opacity: 0,
            left: "+=250",
        },
        100,
        () => {
            $("#secret_join").hide();
            $("#secret_create *").fadeOut()
            $("#secret_game").css("justify-content", "flex-start");
            $("#secret_create").animate({ width: "100%" }, () => {
                $("#lobby").fadeIn();

                $("#lobby *").fadeIn();

                // lobby_dom.append(lobby_user_html.replace('<div class="player ">', '<div class="player host">').replace("![name]!", hosts_name).replace('<button class="player_kick">        <img            src="/resources/images/secret_hitler/boot.svg"        ></img>    </button>', ''));

                $("#lobby_code")[0].innerHTML += " " + lobby_code + " |";


            });
        },
    );
});

function getRandomInt(max) {
return Math.floor(Math.random() * Math.floor(max));
}

function mobileMenu(){
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "/mobileMenu.css"
     }).appendTo("head");
}

mobileMenu();

let coopz_users = [];

function create(){
    let coopz = ["Abby", "Beckham", "Pollard", "Henry", "James", "Bailey", "Patrick", "Lewis", "Ellie"];
    coopz.forEach(troop => {
        coopz_users.push(new User(troop));
    });
}

function join(){
    for (let i = 0; i < coopz_users.length; i++) {
        const element = coopz_users[i];
        setTimeout(() => {
            element.Connect(lobby_code);
        }, 200*i)
        
    }
}
  

let playerAmnt;
let liberalAmnt = 0;
let fascistsAmnt = 0;
let hitler;

let liberals = [];
let fascists = [];

function setupGame(){
    playerAmnt = users.length;
    switch(playerAmnt){
        case 5:
            liberalAmnt = 3;
            fascistsAmnt = 1;
            break;
        case 6:
            liberalAmnt = 4;
            fascistsAmnt = 1;
            break;
        case 7:
            liberalAmnt = 4;
            fascistsAmnt = 2;
            break;
        case 8:
            liberalAmnt = 5;
            fascistsAmnt = 2;
            break;
        case 9:
            liberalAmnt = 5;
            fascistsAmnt = 3;
            break;
        case 10:
            liberalAmnt = 6;
            fascistsAmnt = 3;
            break;
        default:
            break;

    }

    hitler = getRandomInt(playerAmnt);
    while(liberals.length < liberalAmnt){
        let pick = getRandomInt(playerAmnt);
        if(pick != hitler && !liberals.includes(pick)){
            liberals.push(pick);
            lobby.Connections[pick].Send({"role": "Liberal"})

        }
    }
    while(fascists.length < fascistsAmnt){
        let pick = getRandomInt(playerAmnt);
        if(pick != hitler && !liberals.includes(pick) && !fascists.includes(pick)){
            fascists.push(pick);
            lobby.Connections[pick].Send({"role": "Fascist"})

        }
    }

    lobby.Connections[hitler].Send({"role": "Hitler"})
    


    


    
}