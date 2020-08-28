let me;


$("#join_lobby").click(() => {
    let lobby_id = $("#lobby_id")[0].value;
    let name =  $("#user_name")[0].value;
    me = new User(name,printData, () => {
        me.Connect(lobby_id);

    });


});