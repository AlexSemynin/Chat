using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class User
    {
        [Key]
        public string Id { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }
        public string ShortName { get; set; }
        public UserRoles Role { get; set; }
        public DateTime? BirthDate { get; set; }
        public DateTime RegisterDate { get; set; }



        public ICollection<Room> Rooms { get; set; }

        //public User()
        //{
        //    Rooms = new HashSet<Room>();
        //}
    }

    public enum UserRoles
    {
        Admin = 0,
        User = 1
    }
}
