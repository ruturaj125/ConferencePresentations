using Microsoft.AspNetCore.Mvc;
using CodingExercise.Models;
using CodingExercise.Repository;
using System.Transactions;

namespace CodingExercise.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        public UsersController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] LoginModel user)
        {
            if (user != null)
            {
                Users objuser = userRepository.Login(user);
                if (objuser != null)
                {
                    return Ok(new { User = objuser });
                }
                else
                    return new NoContentResult();
            }
            return new NoContentResult();
        }

        [HttpPost]
        [Route("Registration")]
        public IActionResult Registration([FromBody] Users user)
        {
            using (var scope = new TransactionScope())
            {
               string response = userRepository.Registration(user);
                scope.Complete();
                return Ok(new { response = response });
            }
        }
        
    }
}
