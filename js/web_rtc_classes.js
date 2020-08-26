class User{
    ID;
    Name;
    Conn;
    Peer;
    DataHandler;

    constructor(dataHandler, conn){
        // This is an existing connection
        console.log(dataHandler)
        this.DataHandler = dataHandler;

        if (conn !== undefined){ 
            this.Conn = conn;
            this.ID = this.Conn.peer;
            this.Name = this.Conn.metadata.name;
            this.Conn.on('data', this.DataHandler);
        }
    

    }

    Connect(id, name){
        this.Peer = new Peer();
        this.Peer.on('open',() => {
            this.Conn = this.Peer.connect(id, options = {metadata: {"name": name}});
            this.Conn.on('data', this.DataHandler);

        });

    }

    Send(data){
        this.Conn.send(data);
    }

}

class Lobby{
    Peer;
    Name;
    ID;
    Connections = [];
    DataHandler;

    constructor(name, dataHandler){
        this.Peer = new Peer();
        this.Peer.on('open', (id) => {this.ID = id;});
        this.Peer.on('connection', this.IncomingConnection);        
        this.Name = name;
        this.DataHandler = dataHandler;

        console.log(this.ID)

    }

    IncomingConnection(conn){
        this.Connections.push(new User(this.DataHandler, conn));
    }


}