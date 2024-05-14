using SocketBasedChatApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using SocketBasedChatApp.Extensions;

namespace SocketBasedChatApp.Services;

public class MongoDBService
{
    private readonly IMongoCollection<Message> _messageCollection;

    public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
    {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _messageCollection = database.GetCollection<Message>(mongoDBSettings.Value.CollectionName);
    }

    public async Task<List<Message>> GetAsync()
    {
        List<Message> messageList = await _messageCollection.Find(new BsonDocument()).ToListAsync();
        foreach (var message in messageList)
        {
            message.message = StringCipher.Decrypt(message.message, "abdurrahmanalpturan");
        }
        return messageList;
    }
    public async Task<List<Message>> GetByRoomAsync(string room)
    {
        var filter = Builders<Message>.Filter.Eq(m => m.room, room);
        List<Message> messageList = await _messageCollection.Find(filter).ToListAsync();
        foreach (var message in messageList)
        {
            message.message = StringCipher.Decrypt(message.message, "abdurrahmanalpturan");
        }
        return messageList;
    }
    public async Task CreateAsync(Message message)
    {
        message.message = StringCipher.Encrypt(message.message, "abdurrahmanalpturan");
        await _messageCollection.InsertOneAsync(message);
        return;
    }

}
