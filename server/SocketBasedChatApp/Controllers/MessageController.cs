using System;
using Microsoft.AspNetCore.Mvc;
using SocketBasedChatApp.Services;
using SocketBasedChatApp.Models;

namespace SocketBasedChatApp.Controllers;

[Controller]
[Route("api/[controller]")]
public class MessageController : Controller
{

    private readonly MongoDBService _mongoDBService;

    public MessageController(MongoDBService mongoDBService)
    {
        _mongoDBService = mongoDBService;
    }

    [HttpGet]
    public async Task<List<Message>> Get()
    {
        return await _mongoDBService.GetAsync();
    }

    [HttpGet]
    [Route("{room}")]
    public async Task<IActionResult> GetByRoom(string room)
    {
        if (string.IsNullOrEmpty(room))
        {
            return BadRequest("Please provide a valid room name.");
        }

        var messages = await _mongoDBService.GetByRoomAsync(room);

        if (messages.Count == 0)
        {
            return NotFound($"No messages found for room: {room}");
        }

        return Ok(messages);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Message message)
    {
        await _mongoDBService.CreateAsync(message);
        return CreatedAtAction(nameof(Get), new { id = message.Id }, message);
    }

}