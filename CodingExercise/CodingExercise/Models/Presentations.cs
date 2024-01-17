using System.ComponentModel.DataAnnotations;

namespace CodingExercise.Models
{
    public class Presentations
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(255)]
        public string Title { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(50)]        
        public string PresenterName { get; set; }

        [Required]
        [Range(1, 60)]
        public int Duration { get; set; }
    }
}
