using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Room
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string AuthorId { get; set; }



        public List<Message> Messages { get; set; }

        public ICollection<User> Users { get; set; }

        //public virtual ICollection<User> Users { get; set; }

        //public Room()
        //{

        //}
    }
}
