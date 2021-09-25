using System.Collections.Generic;
using Models;

namespace BusinessLayer.Interfaces
{
    public interface IRoomsRepo
    {
        public Room CreateRoom(User admin, string name);
        public Room CreateRoom(User admin, string name, User companion);
        public Room CreateRoom(User admin, string name, List<User> users);

        public Room GetRoom(string id);
        public ICollection<Room> GetUserRooms(string userId);
        public ICollection<Room> GetUserRooms(User user);

        public Room ChangeRoomName(string roomId, string name);
        public Room AddUsers(string roomId, List<User> users);
        public Room RemoveUsers(string roomId, string[] usersId);

        public Room DeleteRoom(string id);


    }
}
