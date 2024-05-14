using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SocketBasedChatApp.Models;

public class Message(string room, string message, string sender)
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string room { get; set; } = room;
    public string message { get; set; } = message;
    public string sender { get; set; } = sender;
}
