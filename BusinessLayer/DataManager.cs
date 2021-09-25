using System;
using System.Collections.Generic;
using System.Text;
using BusinessLayer.Interfaces;

namespace BusinessLayer
{
    public class DataManager
    {

        IUsersRepo _usersRepo;
        IMessagesRepo _messagesRepo;
        IRoomsRepo _roomsRepo;

        public DataManager(IUsersRepo usersRepo, IMessagesRepo messagesRepo, IRoomsRepo roomsRepo)
        {
            _usersRepo = usersRepo;
            _messagesRepo = messagesRepo;
            _roomsRepo = roomsRepo;
        }

        public IUsersRepo Users => _usersRepo;
        public IMessagesRepo Messages =>_messagesRepo;
        public IRoomsRepo Rooms => _roomsRepo;
    }
}
