using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace BusinessLayer.Interfaces
{
    public interface IUsersRepo
    {
        Task<User> CreateUser(string email, string password, DateTime birthDate, UserRoles role, string name);
        User GetUser(string userId);

        User UpdateUser(string userId, string email, string password, UserRoles role, string name);
        User DeleteUser(string userId);

    }
}
