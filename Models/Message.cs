using System;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Message
    {
        [Key]
        public string Id { get; set; }

        public DateTime DateCreated { get; set; }

        public string Content { get; set; }


        public string UserId { get; set; }
        public User User { get; set; }
    }
}
