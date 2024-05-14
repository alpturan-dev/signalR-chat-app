using SocketBasedChatApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

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
        return await _messageCollection.Find(new BsonDocument()).ToListAsync();
    }
    public async Task<List<Message>> GetByRoomAsync(string room)
    {
        var filter = Builders<Message>.Filter.Eq(m => m.room, room);
        return await _messageCollection.Find(filter).ToListAsync();
    }
    public async Task CreateAsync(Message message)
    {
        await _messageCollection.InsertOneAsync(message);
        return;
    }

}
