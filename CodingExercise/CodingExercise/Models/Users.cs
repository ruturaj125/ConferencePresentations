using System.ComponentModel.DataAnnotations;

namespace CodingExercise.Models
{
    public class Users
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}
