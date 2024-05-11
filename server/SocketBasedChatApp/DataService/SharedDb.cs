using System.Collections.Concurrent;
using SocketBasedChatApp.Models;

namespace SocketBasedChatApp.DataService;

public class SharedDb
{
    private readonly ConcurrentDictionary<string, UserConnection> _connections = new();

    public ConcurrentDictionary<string, UserConnection> connections => _connections;
}
