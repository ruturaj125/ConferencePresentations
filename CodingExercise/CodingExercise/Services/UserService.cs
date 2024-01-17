using CodingExercise.Models;
using CodingExercise.Repository;

namespace CodingExercise.Services
{
    public class UserService : IUserRepository
    {
        private readonly MyDbContext dbContext;
        public UserService(MyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }       
        public Users Login(LoginModel user)
        {
            return dbContext.users.Where(x => x.Email == user.Email && x.Password == user.Password).FirstOrDefault();
        }
        public string Registration(Users user)
        {
            try
            {
                Users objUser = dbContext.users.Where(x => x.Email == user.Email).FirstOrDefault();
                if (objUser == null)
                {
                    dbContext.users.Add(user);
                    Save();
                    return "success";
                }
                else
                {
                    return "User Exists";
                }
            }
            catch(Exception ex)
            {
                return ex.Message;
            }          
        }
        public void Save()
        {
            dbContext.SaveChanges();
        }
    }
}
