let me;


$("#join_lobby").click(() => {
    let lobby_id = replaceAll($("#join_code")[0].value, " ", "");
    let name =  $("#join_name")[0].value;
    me = new User(name,printData, () => {
        me.Connect(lobby_id);
        $("#join_lobby").unbind();

    });
});