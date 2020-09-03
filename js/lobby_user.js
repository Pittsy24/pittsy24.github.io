let me;
let leader = "unset";
let name;

function myFunction(x) {
    if (x.matches) {
        // If media query matches
        $("#title p")[0].innerHTML = "SECRET HITLER";

    } else {
        $("#title p")[0].innerHTML = "Joe Pitts";

    }
}
$("#packet").on("click", cxt => {
    $("#secret_dossier").addClass("open")

    $("#lid").addClass("open")
})

var x = window.matchMedia("(max-width: 660px)");
myFunction(x); // Call listener function at run time
x.addListener(myFunction); // Attach listener function on state changes
$("#secret_game").height($("body").height() - $("header").height());


$("#join_lobby").click(() => {
    let lobby_id = replaceAll($("#join_code")[0].value, " ", "");
    name = $("#join_name")[0].value;
    me = new User(name, data_receive, () => {
        game_loop(lobby_id)

    });
});

function data_receive(data) {
    console.log(data)
    if (data.hasOwnProperty("leader")) {
        leader = data.leader;
        if (leader) {
            $("#secret_join h2").after('<p id = "lobby_message" style = "width: 100%" class = "center">You\'re the lobby leader, press play when everyone has connected!</p>')
            $("#lobby_message").after("<button onclick='start_game()' class = 'center liberal_button'>PLAY</button>")
        } else {
            $("#secret_join h2").after('<p id = "lobby_message" style = "width: 100%" class = "center">Sit back and relax. The game will start soon!</p>')
        }
        // $("#secret_join h2").after('<input type="file" accept="image/*" capture="user">')
    } else if (data.hasOwnProperty("users")) {
        console.log(data.users);
        $("#player_count_small")[0].innerHTML = `${data.users.length}/10`;
    } else if (data.hasOwnProperty("role")) {
        console.log(data.role)

        switch (data.role) {
            case "Liberal":
                $(".secret_role").attr("src", "/resources/images/secret_hitler/liberal.png");
                $(".party_membership").attr("src", "/resources/images/secret_hitler/liberal_member.png");
                $("#game_text").prepend("<h2> You're Liberal, pass 5 Liberal polices or assassinate Hitler to win!</h2>");
                break;

            case "Fascist":
                $(".secret_role").attr("src", "/resources/images/secret_hitler/fascist.png");
                $(".party_membership").attr("src", "/resources/images/secret_hitler/fascist_member.png");

                let fHtml = "<h2> You're Fascist, pass 6 Fascist polices or elect Hitler chancellor after 3 Fascist polices have been passed to win!</h2> <h3>Your fellow Fascists are:</h3>"
                data.fascists.forEach(fascist => {
                    fHtml += "<h4>" + fascist + "</h4>";
                })

                fHtml += "<h4>HITLER:" + data.hitler + "</h4>";

                $("#game_text").prepend(fHtml);

                break;

            case "Hitler":
                $(".secret_role").attr("src", "/resources/images/secret_hitler/hitler.png");
                $(".party_membership").attr("src", "/resources/images/secret_hitler/fascist_member.png");
                $("#game_text").prepend("<h2> You're Hitler! Pass 6 Fascist polices or get elected chancellor after 3 Fascist polices have been passed to win!</h2>");

                break;


            default:
                $(".secret_role").attr("src", "/resources/images/secret_hitler/nein.png")
                $(".party_membership").attr("src", "/resources/images/secret_hitler/ja.png");
                break;

        }
        //The game is afoot!
        $("#secret_join").fadeOut(200, () => {
            $("#secret_hand").fadeIn();
            $(".secret_card.selected").click(() => {
                $(".secret_card.selected").removeClass("selected")
                $(".secret_card.hidden").addClass("selected").removeClass("hidden").click(() => {
                    $(".secret_card.selected").removeClass("selected");
                    $("#game_text").fadeIn();

                    $("#readyUp").click(() => {
                        me.Send("ready");
                    })

                })
            });

        })
    } else if (data.hasOwnProperty("president")) {
        $("#game_text").empty();
        if (data.president == name) {
            $("#game_text").append(`<h2>You're the President elect!</h2><h3>Nominate your chancellor.</h3><ul id = "chancellor_list"></ul>`);
            data.chancellors.forEach(potential => {
                $("#chancellor_list").append(`<li>${potential}</li>`);
            })
            $("#chancellor_list li").click(function () {
                $("#chancellor_list li").removeClass("selectedItem");
                $(this).addClass("selectedItem");
            })

            $("#chancellor_list").after("<button id = 'chanChose'>Nominate</button> ")

            $("#chanChose").click(() => {
                me.Send({
                    "nominee": $("#chancellor_list li.selectedItem")[0].innerHTML
                })
            })


        } else {
            $("#game_text").append(`<h2>${data.president} is the President elect!</h2><h3>They will now nominate their chancellor.</h3>`);

        }
    } else if (data.hasOwnProperty("startVote")) {

        $("#general").fadeOut(100, () => {
            $("#vote").fadeIn();
            $("#game_text").empty();
            $("#game_text").append(`<h2>President elect ${data.pres} is running with Chancellor elect ${data.nominee}.</h2><h3>Vote Ja or Nein on this proposed government.</h3><button id = "castVote">Cast Vote</button>`);

            $("#vote .secret_card img").click(function () {
                $("#vote .secret_card img").removeClass("selected_vote")
                $(this).addClass("selected_vote");
            })

            $("#castVote").click(() => {
                if ($("#vote .secret_card img.selected_vote").length != 0) {
                    let yes = $("#vote .secret_card img.selected_vote").hasClass("ja");
                    me.Send({
                        "vote": yes ? "yes" : "no"
                    });
            
                }
            })


        })

    } else if (data.hasOwnProperty("policy_choices")) {
        $("#vote").fadeOut(100, () => {
            $("#president_selection").fadeIn();
            $("#game_text").empty();
            $("#game_text").append(`<h2>You must discard one card and send the rest to your chancellor.</h2><button id = "discard">Discard</button>`);
            let cards = $("#president_selection").children()

            for (let i = 0; i < data.policy_choices.length; i++) {
                const element = data.policy_choices[i];
                if (element == 0) {
                    $($(cards[i]).children()[0]).attr("src", "/resources/images/secret_hitler/fascist_policy.png").attr("data-id", i);
                } else {
                    $($(cards[i]).children()[0]).attr("src", "/resources/images/secret_hitler/liberal_policy.png").attr("data-id", i);

                }

            }
            $("#president_selection .secret_card img").click(function () {
                $("#president_selection .secret_card img").removeClass("selected_vote")
                $(this).addClass("selected_vote");
            })

            $("#discard").click(() => {
                if ($("#president_selection .secret_card img.selected_vote").length != 0) {
                    let discard = $("#president_selection .secret_card img.selected_vote").attr("data-id");
                    me.Send({
                        "discard": data.policy_choices[discard],
                        "keep": data.policy_choices.flatMap((card, index) => {
                            if(index != discard) { return card}  return []
                        })
                    });
                    $("#president_selection").fadeOut(100, () => {
                        $("#general").fadeIn();
                    });

                }
            })
        });

    }else if (data.hasOwnProperty("chan_polices")) {
        $("#vote").fadeOut(100, () => {
            $("#chan_selection").fadeIn();
            $("#game_text").empty();
            $("#game_text").append(`<h2>You must choose a policy to enact.</h2><button id = "enact">Enact</button>`);
            let cards = $("#chan_selection").children()

            for (let i = 0; i < data.chan_polices.length; i++) {
                const element = data.chan_polices[i];
                if (element == 0) {
                    $($(cards[i]).children()[0]).attr("src", "/resources/images/secret_hitler/fascist_policy.png").attr("data-id", i);
                } else {
                    $($(cards[i]).children()[0]).attr("src", "/resources/images/secret_hitler/liberal_policy.png").attr("data-id", i);

                }

            }
            $("#chan_selection .secret_card img").click(function () {
                $("#chan_selection .secret_card img").removeClass("selected_vote")
                $(this).addClass("selected_vote");
            })

            $("#enact").click(() => {
                if ($("#chan_selection .secret_card img.selected_vote").length != 0) {
                    let enact = $("#chan_selection .secret_card img.selected_vote").attr("data-id");
                    me.Send({
                        "enact": data.chan_polices[enact],
                        "discard": data.chan_polices.flatMap((card, index) => {
                            if(index != discard) { return card}  return []
                        })[0]
                    });
                    $("#chan_selection").fadeOut(100, () => {
                        $("#general").fadeIn();
                    });

                }
            })
        });

    }
}



function start_game() {
    if (leader) {
        me.Send("start");
    }
}


function game_loop(lobby_id) {
    $("#join_lobby").unbind();

    me.Peer.on("error", err => {
        alert("ERROR, tell joe to fix this");
        console.log(err);
    })

    me.Connect(lobby_id);
    me.Conn.on("open", () => {
        {
            $("#secret_join img").slideUp();
            $("#secret_join h2")[0].innerHTML = "Connected";
            $("#join_lobby").css({
                "position": "absolute",
                "bottom": "24px",
                "right": "5px"
            })
            $("#join_lobby").text("Quit").css("margin-bottom", "0px");

            $("#secret_join h2 ~ :not(#secret_join .one_line:last-child)").fadeOut();
            $("#secret_join .one_line:last-child .blue_filler").fadeOut()
            $("#join_lobby").before('<p id = "player_count_small" style = "position: absolute; bottom: 5px; left: 8px;" >1/10</p>')
        }
    })

}