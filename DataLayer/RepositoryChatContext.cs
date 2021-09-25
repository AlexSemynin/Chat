using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DataLayer
{
    public class RepositoryChatContext : DbContext
    {
        public RepositoryChatContext(DbContextOptions<RepositoryChatContext> options)
        : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Room> Rooms { get; set; }
    }
}
