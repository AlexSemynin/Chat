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
    public class EFRoomsRepository : IRoomsRepo
    {
        RepositoryChatContext _dbContext;
        DbSet<Room> _rooms;
        public EFRoomsRepository(RepositoryChatContext dbContext)
        {
            _dbContext = dbContext;
            _rooms = dbContext.Rooms;
        }

        #region Create
        public Room CreateRoom(User admin, string name)
        {
            //if (IsExistRoomForUserByRoomName(admin, name))
            //    throw new InvalidOperationException("Данное имя уже используется");
            var room = new Room
            {
                Id = GenerateNewId(),
                AuthorId = admin.Id,
                Name = name,
            };
            _rooms.Add(room);
            _dbContext.SaveChanges();
            return room;
        }
        public Room CreateRoom(User admin, string name, User companion)
        {
            var room = new Room
            {
                Id = GenerateNewId(),
                AuthorId = admin.Id,
                Name = name,
                Users = new List<User> { companion }
            };
            _rooms.Add(room);
            _dbContext.SaveChanges();
            return room;
        }

        public Room CreateRoom(User admin, string name, List<User> companions)
        {
            var room = new Room
            {
                Id = GenerateNewId(),
                AuthorId = admin.Id,
                Name = name,
                Users = companions
            };
            _rooms.Add(room);
            _dbContext.SaveChanges();
            return room;
        }
        #endregion

        #region Read
        public Room GetRoom(string id)
        {
            return GetRoomById(id);
        }

        public ICollection<Room> GetUserRooms(User user)
        {
            return user.Rooms;
        }

        public ICollection<Room> GetUserRooms(string userId)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
            if (user is null)
                throw new NullReferenceException($"Пользователь {userId} не найден");
            return GetUserRooms(user);
        }

        #endregion

        #region Update

        public Room ChangeRoomName(string roomId, string name)
        {
            var room = GetRoomById(roomId);
            if (room is null)
                throw new NullReferenceException("room is not found");
            room.Name = name;
            _dbContext.SaveChanges();
            return room;
        }

        public Room AddUsers(string roomId, List<User> users)
        {
            var room = GetRoomById(roomId);
            if(room is null)
                throw new NullReferenceException("room is not found");
            users.ForEach(u => 
            { 
                if(_dbContext.Users.Contains(u))
                    room.Users.Add(u);
            });
            _dbContext.SaveChanges();
            return room;
        }

        public Room RemoveUsers(string roomId, string[] usersId)
        {
            var room = GetRoomById(roomId);
            if (room is null)
                throw new NullReferenceException("room is not found");

            foreach(var userId in usersId)
            {
                var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
                if (user != null)
                    room.Users.Add(user);
            }
            return room;
        }

        #endregion

        #region Delete
        public Room DeleteRoom(string roomId)
        {
            var room = GetRoomById(roomId);
            if (room is null)
                throw new NullReferenceException("Room is not exist");

            _rooms.Remove(room);
            return room;
        }
        #endregion

        private Room GetRoomById(string roomId)
        {
            return _rooms.FirstOrDefault(r => r.Id == roomId);
        }

        public bool IsExistRoomForUserByRoomName(User user, string roomName)
        {
            return
                user.Rooms.FirstOrDefault(r => r.Name == roomName) is Room;
        }

        private string GenerateNewId()
        {
            var guid = Guid.NewGuid().ToString().Replace("-", "_");
            return $"room_{guid}";
        }
    }
}
