let me;
let leader = false;
function myFunction(x) {
    if (x.matches) {
        // If media query matches
        $("#title p")[0].innerHTML = "SECRET HITLER";

    } else {
        $("#title p")[0].innerHTML = "Joe Pitts";

    }
}

var x = window.matchMedia("(max-width: 660px)");
myFunction(x); // Call listener function at run time
x.addListener(myFunction); // Attach listener function on state changes


$("#join_lobby").click(() => {
    let lobby_id = replaceAll($("#join_code")[0].value, " ", "");
    let name = $("#join_name")[0].value;
    me = new User(name, data_receive, () => {
        game_loop(lobby_id)
        
    });
});

function data_receive(data){
    console.log(data)
    if(data.hasOwnProperty("leader")){
        leader = data.leader;
        if(leader){
            $("#secret_join h2").after('<p id = "lobby_message" style = "width: 100%" class = "center">You\'re the lobby leader, press play when everyone has connected!</p>')
            $("#lobby_message").after("<button class = 'center liberal_button'>PLAY</button>")
        }else{
            $("#secret_join h2").after('<p id = "lobby_message" style = "width: 100%" class = "center">Sit back and relax. The game will start soon!</p>')
        }
    }
}


function game_loop(lobby_id){
    $("#join_lobby").unbind();

    me.Peer.on("error", err => {
        alert("ERROR, tell joe to fix this");
        console.log(err);
    })

    me.Connect(lobby_id);
    me.Conn.on("open", () => {{
        $("#secret_join img").slideUp();
        $("#secret_join h2")[0].innerHTML = "Connected";
        $("#join_lobby").css({"position": "absolute", "bottom": "24px", "right": "5px"})
        $("#join_lobby").text("Quit")
        $("#secret_join h2 ~ :not(button)").fadeOut()

        $("#join_lobby").before('<p id = "player_count" style = "position: absolute; bottom: 5px; left: 8px;" >1/10</p>')
    }})





}