using System;
using System.Collections.Generic;
using System.Text;
using Models;

namespace BusinessLayer.Interfaces
{
    public interface IMessagesRepo
    {
        Message CreateMessage(string content, string authorId);
        Message GetMessage(string id);
        List<Message> GetMessages(string[] ids);
        List<Message> GetRoomMessages(string roomId);

        Message UpdateMessage(string id, string content);
        Message DeleteMessage(string id);
    }
}
