using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using BusinessLayer.Interfaces;
using Models;
using DataLayer;
using System.Threading.Tasks;
using System.Linq;

namespace BusinessLayer.Implements
{
    public class EFMessagesRepository : IMessagesRepo
    {
        RepositoryChatContext _dbContext;
        DbSet<Message> _messages;
        public EFMessagesRepository(RepositoryChatContext dbContext)
        {
            _dbContext = dbContext;
            _messages = _dbContext.Messages;
        }

        public Message CreateMessage(string content, string authorId)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == authorId);
            if (user is null)
                throw new InvalidOperationException("User is not exist. Operation is impossible");

            var mess = new Message
            {
                Id = GenerateNewMessageId(),
                Content = content,
                DateCreated = DateTime.Now,
                UserId = authorId,
                User = user,
            };

            _dbContext.Messages.Add(mess);
            _dbContext.SaveChanges();
            return mess;
        }

        public Message GetMessage(string messageId) => GetMessageById(messageId);

        public List<Message> GetMessages(string[] messagesId)
        {
            List<Message> messages = new List<Message>();
            foreach (var id in messagesId)
            {
                var message = _messages.FirstOrDefault(m => m.Id == id);
                if (message != null)
                    messages.Add(message);
            }

            return messages;
        }

        public List<Message> GetRoomMessages(string roomId)
        {
            var room = _dbContext.Rooms.FirstOrDefault(r => r.Id == roomId);
            if (room is null)
                throw new NullReferenceException();

            return room.Messages;
        }

        public Message UpdateMessage(string id, string content)
        {
            var message = GetMessageById(id);

            message.Content = content;

            _dbContext.SaveChanges();

            return message;
        }

        public Message DeleteMessage(string messageId)
        {
            var message = GetMessageById(messageId);

            _messages.Remove(message);
            _dbContext.SaveChanges();

            return message;
        }


        private string GenerateNewMessageId()
        {
            var guid = Guid.NewGuid().ToString().Replace("-", "_");
            return $"message_{guid}";
        }
        private Message GetMessageById(string id)
        {
            var message = _messages.FirstOrDefault(m => m.Id == id);
            if (message is null)
                throw new NullReferenceException("message is not found");
            return message;
        }


    }
}
