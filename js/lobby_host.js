let lobby;
let users = []
let lobby_dom = $("#player_list");
// let lobby_user_html = '<div class="player">    <h3 class="player_name">![name]!</h3>    <button class="player_kick">      <svg        xmlns:dc="http://purl.org/dc/elements/1.1/"        xmlns:cc="http://creativecommons.org/ns#"        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"        xmlns:svg="http://www.w3.org/2000/svg"        xmlns="http://www.w3.org/2000/svg"        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"        version="1.1"        id="Capa_1"        x="0px"        y="0px"        viewBox="0 0 470 470"        style="enable-background: new 0 0 470 470"        xml:space="preserve"        sodipodi:docname="wellington-boot-svgrepo-com.svg"        inkscape:version="1.0 (b51213c273, 2020-08-10)"      >        <metadata id="metadata41">          <rdf:RDF            ><cc:Work rdf:about=""              ><dc:format>image/svg+xml</dc:format              ><dc:type                rdf:resource="http://purl.org/dc/dcmitype/StillImage" /></cc:Work          ></rdf:RDF>        </metadata>        <defs id="defs39" />        <sodipodi:namedview          pagecolor="#ffffff"          bordercolor="#666666"          borderopacity="1"          objecttolerance="10"          gridtolerance="10"          guidetolerance="10"          inkscape:pageopacity="0"          inkscape:pageshadow="2"          inkscape:window-width="1920"          inkscape:window-height="1052"          id="namedview37"          showgrid="false"          inkscape:zoom="1.3831041"          inkscape:cx="286.40166"          inkscape:cy="234.44864"          inkscape:window-x="0"          inkscape:window-y="28"          inkscape:window-maximized="1"          inkscape:current-layer="Capa_1"        />        <g id="g4" transform="matrix(-1.0106766,0,0,1,472.5085,0)">          <path            d="m 460.018,403.363 h -2.026 v -14.754 c 0,-38.142 -30.655,-73.985 -68.336,-79.9 l -75.901,-11.915 c -30.692,-4.818 -55.662,-34.013 -55.662,-65.082 V 7.5 c 0,-4.142 -3.358,-7.5 -7.5,-7.5 H 22.906 c -4.142,0 -7.5,3.358 -7.5,7.5 V 46.733 H 9.982 c -4.142,0 -7.5,3.358 -7.5,7.5 v 45.534 c 0,4.142 3.358,7.5 7.5,7.5 h 5.424 v 275.094 c -3.889,0.278 -6.959,3.513 -6.959,7.473 v 50.798 c 0,16.194 13.174,29.368 29.368,29.368 8.677,0 16.487,-3.783 21.868,-9.785 5.381,6.002 13.191,9.785 21.868,9.785 8.677,0 16.487,-3.783 21.868,-9.785 5.381,6.002 13.191,9.785 21.869,9.785 16.194,0 29.368,-13.174 29.368,-29.368 v -11.669 l 79.83,17.824 c 2.836,13.25 14.636,23.213 28.719,23.213 8.677,0 16.487,-3.783 21.868,-9.785 5.381,6.002 13.191,9.785 21.868,9.785 8.677,0 16.487,-3.783 21.868,-9.785 5.381,6.002 13.191,9.785 21.868,9.785 8.677,0 16.487,-3.783 21.868,-9.785 5.381,6.002 13.191,9.785 21.868,9.785 8.677,0 16.487,-3.783 21.868,-9.785 5.381,6.002 13.191,9.785 21.868,9.785 16.194,0 29.368,-13.174 29.368,-29.368 v -29.769 c 10e-4,-4.142 -3.357,-7.5 -7.499,-7.5 z M 30.406,15 H 138.877 V 46.733 H 57.482 v -2.5 c 0,-4.142 -3.358,-7.5 -7.5,-7.5 -4.142,0 -7.5,3.358 -7.5,7.5 v 2.5 H 30.406 Z M 17.482,92.268 V 61.733 h 25 v 30.534 h -25 z m 40,-30.535 H 168.877 V 92.267 H 57.482 Z m -15,45.535 v 2.5 c 0,4.142 3.358,7.5 7.5,7.5 4.142,0 7.5,-3.358 7.5,-7.5 v -2.5 h 118.895 c 4.142,0 7.5,-3.358 7.5,-7.5 V 54.233 c 0,-4.142 -3.358,-7.5 -7.5,-7.5 h -22.5 V 15 h 89.216 v 216.712 c 0,38.143 30.655,73.985 68.336,79.9 l 75.901,11.915 c 30.692,4.818 55.662,34.014 55.662,65.082 v 14.754 H 242.164 L 148.79,382.514 c -0.537,-0.12 -1.084,-0.18 -1.634,-0.18 H 30.406 V 239.212 h 55.971 c 37.22,0 67.5,-30.28 67.5,-67.5 v -41.944 c 0,-4.142 -3.358,-7.5 -7.5,-7.5 -4.142,0 -7.5,3.358 -7.5,7.5 v 41.944 c 0,28.949 -23.551,52.5 -52.5,52.5 H 30.406 V 107.268 Z m 410.036,333.364 c 0,7.923 -6.446,14.368 -14.368,14.368 -7.923,0 -14.368,-6.445 -14.368,-14.368 0,-4.142 -3.358,-7.5 -7.5,-7.5 -4.142,0 -7.5,3.358 -7.5,7.5 0,7.923 -6.445,14.368 -14.368,14.368 -7.923,0 -14.368,-6.445 -14.368,-14.368 0,-4.142 -3.358,-7.5 -7.5,-7.5 -4.142,0 -7.5,3.358 -7.5,7.5 0,7.923 -6.445,14.368 -14.368,14.368 -7.922,0 -14.368,-6.445 -14.368,-14.368 0,-4.142 -3.358,-7.5 -7.5,-7.5 -4.142,0 -7.5,3.358 -7.5,7.5 0,7.923 -6.445,14.368 -14.368,14.368 -7.923,0 -14.368,-6.445 -14.368,-14.368 0,-4.142 -3.358,-7.5 -7.5,-7.5 -4.142,0 -7.5,3.358 -7.5,7.5 0,7.923 -6.446,14.368 -14.368,14.368 -7.923,0 -14.368,-6.445 -14.368,-14.368 0,-3.512 -2.438,-6.554 -5.866,-7.32 l -94.181,-21.029 c -2.221,-0.498 -4.548,0.043 -6.324,1.467 -1.776,1.423 -2.81,3.576 -2.81,5.853 v 21.029 c 0,7.923 -6.446,14.368 -14.368,14.368 -7.923,0 -14.368,-6.445 -14.368,-14.368 0,-4.142 -3.358,-7.5 -7.5,-7.5 -4.142,0 -7.5,3.358 -7.5,7.5 0,7.923 -6.445,14.368 -14.368,14.368 -7.923,0 -14.368,-6.445 -14.368,-14.368 0,-4.142 -3.358,-7.5 -7.5,-7.5 -4.142,0 -7.5,3.358 -7.5,7.5 0,7.923 -6.445,14.368 -14.368,14.368 -7.922,0 -14.368,-6.445 -14.368,-14.368 v -43.298 h 122.882 l 93.374,20.849 c 0.537,0.12 1.084,0.18 1.634,0.18 h 211.182 v 22.269 z"            id="path2"          />        </g>        <g id="g6" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g8" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g10" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g12" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g14" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g16" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g18" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g20" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g22" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g24" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g26" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g28" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g30" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g32" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>        <g id="g34" transform="matrix(-1.0106766,0,0,1,472.5085,0)"></g>      </svg>    </button>  </div>';

function dataReceived(sender, data) {
    console.log(data);
    if (data === "start") {
        console.log("start the game!")
        setupGame();
    }
    if (data === "ready") {
        ready++;
        $("#readyAmnt")[0].innerHTML = `Ready: ${ready}/${playerAmnt}`
        if (ready == playerAmnt) {
            election();
        }
    }

    if (data.hasOwnProperty("nominee")) {
        nominee = data.nominee;
        startVote();
    }

    if (data.hasOwnProperty("vote")) {
        votesCast++;
        $($($("#votes").children()[users.indexOf(sender) + 1]).children()[0]).css("opacity", 1).attr("data-vote", data.vote);
        if (data.vote == "yes") {
            yes++;
        }
        if (data.vote == "no") {
            no++;
        }
        if (votesCast == playerAmnt) {
            voteOutcome();
        }
    }
    if (data.hasOwnProperty("keep")) {
        discard.push(data.discard);
        lobby.Connections[users.indexOf(chancellor)].Send({
            "chan_polices": data.keep
        })
    }
    if (data.hasOwnProperty("enact")) {
        discard.push(data.discard);
        if (data.enact == 1) {
            $($(".play_area.liberal").children()[liberalEnacted]).addClass("liberal_background")
            liberalEnacted++;
        } else {
            let square = $($(".play_area").children()[fascistEnacted])
            square.empty()
            square.addClass("fascist_background")
            fascistEnacted++;

        }
        console.log(data.enact);
        setTimeout(election, 5000);
    }
}



function newUser(user) {
    console.log(user + " Connected");
    let leader = "unset";
    if (users.length == 0) {
        lobby_dom.append(lobby_user_html.replace('<div class="player ">', '<div class="player host">').replace("![name]!", user).replace('<button class="player_kick">        <img            src="/resources/images/secret_hitler/boot.svg"        ></img>    </button>', ''));
        leader = true;

    } else {
        lobby_dom.append(lobby_user_html.replace("![name]!", user));
        leader = false;
    }
    users.push(user);
    $("#player_count")[0].innerHTML = " Players: " + users.length + "/10";
    setTimeout(() => {
        lobby.Connections[users.length - 1].Send({
            "leader": leader
        })

    }, 100)

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
    lobby_code = replaceAll(lobby_name, " ", "_") + Math.round(Math.random() * 10) + Math.round(Math.random() * 10) + Math.round(Math.random() * 10);
    lobby = new Lobby(lobby_code, dataReceived, newUser);

    $("#secret_join").animate({
            opacity: 0,
            left: "+=250",
        },
        100,
        () => {
            $("#secret_join").hide();
            $("#secret_create *").fadeOut()
            $("#secret_game").css("justify-content", "flex-start");
            $("#secret_create").css("max-width", "unset");
            $("#secret_create").animate({
                width: "100%"
            }, () => {
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

function mobileMenu() {
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "/mobileMenu.css"
    }).appendTo("head");
}

mobileMenu();

let coopz_users = [];

function create() {
    let coopz = ["Abby", "Beckham", "Pollard", "Henry", "James", "Bailey", "Patrick", "Lewis"];
    coopz.forEach(troop => {
        coopz_users.push(new User(troop));
    });
}

function readyTroopz() {
    coopz_users.forEach(troop => {
        troop.Send("ready");
    });

}



function voteYes() {
    coopz_users.forEach(troop => {
        troop.Send({
            "vote": "yes"
        });
    });

}

function voteNo() {
    coopz_users.forEach(troop => {
        troop.Send({
            "vote": "no"
        });
    });

}

function join() {
    for (let i = 0; i < coopz_users.length; i++) {
        const element = coopz_users[i];
        setTimeout(() => {
            element.Connect(lobby_code);
        }, 200 * i)

    }
}


let playerAmnt;
let liberalAmnt = 0;
let fascistsAmnt = 0;
let hitler;

let liberals = [];
let fascists = [];

let president;
let chancellor;

let lastPres = null;
let lastChan = null;

let ready = 0;

function election() {
    $("#game_boards").fadeOut(200, () => {
        $("#introduction_text").fadeOut(200, () => {
            $("#potential_government")[0].innerHTML = $("#potential_government")[0].innerHTML.replace("blank", users[president]);
            $("#votes").empty();
            $("#vote").append('<div class="voter_template"><img src="/resources/images/secret_hitler/vote_back.png" /><h4>Joe Pitts</h4></div>')
            users.forEach(user => {
                let temp = $(".voter_template").last().clone();
                temp.children()[1].innerHTML = user;
                $("#votes").append(temp);
            });

            $("#election_screen").fadeIn();

        });
    })




    president++;
    if (president + 1 > playerAmnt) {
        president = 0;
    }

    president = 0;

    console.log(users[president] + " is the president!");
    for (let i = 0; i < lobby.Connections.length; i++) {
        const player = lobby.Connections[i];
        if (i != president) {
            player.Send({
                "president": users[president]
            });
        } else {
            if (lastChan == null) {
                player.Send({
                    "president": users[president],
                    "chancellors": users.flatMap((nom) => {
                        if (nom != users[i]) {
                            return nom
                        }
                        return []
                    })
                })
            } else {
                player.Send({
                    "president": users[president],
                    "chancellors": users.flatMap((nom) => {
                        if (nom != users[lastPres] && nom != users[lastChan] && nom != users[i]) {
                            return nom
                        }
                        return []
                    })
                })
            }

        }

    }

}


let yes = 0;
let no = 0;
let votesCast = 0;
let nominee;
let electionTracker = 0;

let liberalEnacted = 0;
let fascistEnacted = 0;
let deck = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1
];

let discard = [];
for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
}

console.log(deck)

function startVote() {
    $("#potential_government")[0].innerHTML = $("#potential_government")[0].innerHTML.replace("undecided", nominee)

    lobby.Broadcast({
        "startVote": true,
        "pres": users[president],
        "nominee": nominee
    });
    ready = 0;
}

function voteOutcome() {
    let cards = $("#votes").children()
    for (let i = 1; i < cards.length; i++) {
        let v = $($(cards[i]).children()[0]).attr("data-vote");
        if (v == "yes") {
            $($(cards[i]).children()[0]).attr("src", "/resources/images/secret_hitler/ja.png")
        } else {
            $($(cards[i]).children()[0]).attr("src", "/resources/images/secret_hitler/nein.png")
        }
    }
    if (yes > no) {
        no = 0;
        yes = 0;
        votesCast = 0;
        $("#potential_government")[0].innerHTML = "The Vote was a Success! The Government has been formed.";
        lobby.Broadcast("success");
        chancellor = nominee


        lobby.Connections[president].Send({
            "policy_choices": [deck.pop(), deck.pop(), deck.pop()]
        });
        if (deck.length < 3) {
            deck = deck.concat(discard);
            discard = [];
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * i)
                const temp = deck[i]
                deck[i] = deck[j]
                deck[j] = temp
            }
        }

        setTimeout(() => {
            $("#election_screen").fadeOut(100, () => {
                $("#game_boards").fadeIn();
            })
        }, 5000)


    } else if (yes == no) {
        $("#potential_government")[0].innerHTML = "The Vote was a Tie. A Government has NOT been formed."
        no = 0;
        yes = 0;
        votesCast = 0;
        electionTracker++;
        lobby.Broadcast("tie");
        if (electionTracker < 3) {
            election();
        } else {
            electionTracker = 0;
            enactTopPolicy();
        }
    } else if (no > yes) {
        $("#potential_government")[0].innerHTML = "The Vote failed. A Government has NOT been formed."
        electionTracker++;
        lobby.Broadcast("vote failed");
        no = 0;
        yes = 0;
        votesCast = 0;
        if (electionTracker < 3) {
            election();
        } else {
            electionTracker = 0;
            enactTopPolicy();
        }
    }
}

function enactTopPolicy(){
    $("#election_screen").fadeOut(200, ()=>{
        $("#game_boards").fadeIn();
        let cardToEnact = deck.pop(); 
        if (deck.length < 3) {
            deck = deck.concat(discard);
            discard = [];
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * i)
                const temp = deck[i]
                deck[i] = deck[j]
                deck[j] = temp
            }
        }

        if (cardToEnact == 1) {
            $($(".play_area.liberal").children()[liberalEnacted]).addClass("liberal_background")
            liberalEnacted++;
        } else {
            let square = $($(".play_area").children()[fascistEnacted])
            square.empty()
            square.addClass("fascist_background")
            fascistEnacted++;

        }


    });
}

function setupGame() {
    $("#secret_create").fadeOut(200, () => {
        $("#content").css("max-width", "unset");
        $("header").css({
            "margin-left": "auto",
            "margin-right": "auto",
            "max-width": "640px"
        });
        $("hr").css({
            "margin-left": "auto",
            "margin-right": "auto",
            "max-width": "640px"
        });

        $("#secret_hitler_title").fadeOut();
        $("#introduction_text").fadeIn();
    })



    playerAmnt = users.length;
    switch (playerAmnt) {
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
    while (liberals.length < liberalAmnt) {
        let pick = getRandomInt(playerAmnt);
        if (pick != hitler && !liberals.includes(pick)) {
            liberals.push(pick);
            lobby.Connections[pick].Send({
                "role": "Liberal"
            })

        }
    }
    while (fascists.length < fascistsAmnt) {
        let pick = getRandomInt(playerAmnt);
        if (pick != hitler && !liberals.includes(pick) && !fascists.includes(pick)) {
            fascists.push(pick);
        }
    }
    fascists.forEach(player => {
        lobby.Connections[player].Send({
            "role": "Fascist",
            "hitler": users[hitler],
            "fascists": fascists.flatMap((i) => {
                if (i != player) {
                    return users[i]
                }
                return []
            })
        })
    })
    lobby.Connections[hitler].Send({
        "role": "Hitler"
    })

    president = getRandomInt(playerAmnt);



}