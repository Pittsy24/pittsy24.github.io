function handler(sender, data) {
    console.log(`${sender}: ${data}`);
}
function printData(data) {
    console.log(data);
}
class ServerUser {
    ID;
    Name;
    Conn;
    DataHandler;
    Server;

    constructor(dataHandler, conn, server) {
        this.DataHandler = dataHandler;
        this.Conn = conn;
        this.Server = server;
        this.ID = this.Conn.peer;
        this.Name = this.Conn.metadata.name;
        this.Conn.on("data", (data) => {
            this.DataHandler(this.Name, data, this.Server);
        });
    }

    Send(data) {
        this.Conn.send(data);
    }
}

class User {
    ID;
    Name;
    Conn;
    Peer;
    DataHandler;
    Server;

    constructor(name, dataHandler = printData, callback = ()=>{}) {
        // This is an existing connection
        this.DataHandler = dataHandler;
        this.Name = name;

        this.Peer = new Peer();
        
        this.Peer.on("open", (id) => {
            this.ID = id;
            callback();
        });
    }

    Receive(data) {
        this.DataHandler(data);
    }

    Connect(id) {
        this.Conn = this.Peer.connect(id, { metadata: { name: this.Name } });
        this.Conn.on("data", (data) => {
            this.Receive(data);
        });
    }

    Send(data) {
        this.Conn.send(data);
    }
}

class Lobby {
    Peer;
    ID;
    Connections = [];
    DataHandler;
    NewUser;
    DisconnectedUser;

    constructor(name, dataHandler = handler, newUserHandler = ()=>{}, disconnectedUser = () => {} ) {
        this.Peer = new Peer(name);
        this.Peer.on("open", (id) => {
            this.ID = id;
            console.log(this.ID);
        });
        this.Peer.on("connection", (data) => {
            let i = this.IncomingConnection.bind(this);
            i(data);
        });

    

        this.DataHandler = dataHandler;
        this.NewUser =  newUserHandler;
        this.DisconnectedUser =  disconnectedUser;

        this.Connections = [];
    }

    IncomingConnection(conn) {
        let u = new ServerUser(this.Receive, conn, this);

        u.Conn.on("close", (data) => {
            console.log(this)
        })

        let existingIndex = this.Connections.findIndex((connection) => {
            connection.ID === u.ID;
        });

        if (existingIndex != -1) {
            this.Connections.splice(existingIndex, 1);
        }
        this.Connections.push(u);
        setTimeout(this.NewConnectionUpdate.bind(this), 100)
    }

    NewConnectionUpdate() {
        let users = { users: [] };
        this.Connections.forEach((connection) => {
            users.users.push(connection.Name);
        });
        this.Broadcast(users);
        newUser(users.users[users.users.length - 1]);
    }

    DisconnectedUserUpdate(){

    }

    Receive(sender, data, context) {
        if (data.hasOwnProperty("server")) {
            if (data.server.hasOwnProperty("status")) {
                if (data.server.status === "ready") {
                    context.NewConnectionUpdate();
                }
            }
        } else {
            context.DataHandler(sender, data);
        }
    }

    Broadcast(data) {
        this.Connections.forEach((connection) => {
            connection.Send(data);
        });
    }
}
