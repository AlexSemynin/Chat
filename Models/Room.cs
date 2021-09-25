using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Room
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public User Admin { get; set; }



        public List<Message> Messages { get; set; }
        public List<User> Users { get; set; }
    }
}
