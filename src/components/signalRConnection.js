import * as signalR from "@microsoft/signalr";
const URL = "https://identityqatest.azurewebsites.net/hub"

class Connector {
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();
        this.connection.start().then(res=>{console.log("connected Successfully")}).catch(err => console.error(err));
        this.events = (onMessageReceived) => {
            this.connection.on("ReceiveMessage", (message) => {
                onMessageReceived(message);
            });
        };
    }

    newMessage(messages) {
        this.connection.send("newMessage", "foo", messages).then(() => console.log("sent"));
    }

    static getInstance() {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    }
}

Connector.instance = null;

export default Connector.getInstance;
