import * as signalR from "@microsoft/signalr";

export class SignalRService {
  private connections: Map<string, signalR.HubConnection> = new Map();

  createConnection(hubUrl: string): signalR.HubConnection {
    const token = localStorage.getItem("authToken");

    console.log("🔌 Creating SignalR connection to:", hubUrl);
    console.log("🔑 Token exists:", !!token);

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        skipNegotiation: false,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => {
          const currentToken = localStorage.getItem("authToken");
          console.log("🎫 Sending token to SignalR:", !!currentToken);
          return currentToken || "";
        },
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: () => {
          return 2000;
        },
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.onreconnecting((error) => {
      console.warn("🔄 SignalR reconnecting...", error);
    });

    connection.onreconnected((connectionId) => {
      console.log("✅ SignalR reconnected:", connectionId);
    });

    connection.onclose((error) => {
      console.error("❌ SignalR connection closed:", error);
    });

    return connection;
  }

  async startConnection(
    connection: signalR.HubConnection,
    hubName: string
  ): Promise<void> {
    try {
      if (connection.state === signalR.HubConnectionState.Disconnected) {
        await connection.start();
        console.log(`✅ SignalR connected to ${hubName}`);
      }
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("stopped during negotiation")
      ) {
        console.warn(
          `⚠️ Connection negotiation cancelled for ${hubName} (likely React Strict Mode)`
        );
        return;
      }

      console.error(`❌ Error connecting to ${hubName}:`, error);
    }
  }

  async stopConnection(connection: signalR.HubConnection): Promise<void> {
    try {
      if (connection.state !== signalR.HubConnectionState.Disconnected) {
        await connection.stop();
        console.log("⏹️ SignalR connection stopped");
      }
    } catch (error) {
      console.error("❌ Error stopping connection:", error);
    }
  }

  saveConnection(key: string, connection: signalR.HubConnection): void {
    this.connections.set(key, connection);
  }

  getConnection(key: string): signalR.HubConnection | undefined {
    return this.connections.get(key);
  }

  removeConnection(key: string): void {
    this.connections.delete(key);
  }
}

export const signalRService = new SignalRService();
