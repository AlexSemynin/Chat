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
    public class EFUserRepository : IUsersRepo
    {

        RepositoryChatContext _dbContext;
        DbSet<User> _users;
        public EFUserRepository(RepositoryChatContext dbContext)
        {
            _dbContext = dbContext;
            _users = dbContext.Users;
        }

        public async Task<User> CreateUser(string email, string password, DateTime birthDate, UserRoles role = UserRoles.User, string name = null)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user is null)
            {
                string guid = Guid.NewGuid().ToString().Replace("-", "_");
                string userName = string.IsNullOrEmpty(name) ? email.Split("@")[0] : name;
                user = new User
                {
                    Email = email,
                    Password = password,
                    Id = "user_" + guid,
                    ShortName = userName,
                    RegisterDate = DateTime.Now,
                    BirthDate = birthDate,
                    Role = role,
                };
                _dbContext.Users.Add(user);
                await _dbContext.SaveChangesAsync();
                return user;
            }
            return null;
        }

        public User GetUser(string userId)
        {
            return _users.FirstOrDefault(u => u.Id == userId);
        }

        public User UpdateUser(string userId, string email, string password, UserRoles role, string name)
        {
            var user = _users.FirstOrDefault(u => u.Id == userId);
            if (user is null)
                throw new NullReferenceException($"Пользователя не сущетсвует");
            var IsEmailExist = _users.FirstOrDefault(u => u.Email == email);
            if (IsEmailExist != null)
                throw new InvalidOperationException($"Вводимый Вами email-адресс уже зарегистрирован в системе");

            user.Email = email;
            user.Password = password;
            user.Role = role;
            user.ShortName = name;

            _dbContext.SaveChanges();

            return user;
        }

        public User DeleteUser(string userId)
        {
            var user = _users.FirstOrDefault(u => u.Id == userId);
            if (user is null)
                throw new NullReferenceException("Пользователя не существует");

            _users.Remove(user);
            _dbContext.SaveChanges();
            return user;
        }
    }
}
