using CodingExercise.Models;

namespace CodingExercise.Repository
{
    public interface IUserRepository
    {
        Users Login(LoginModel user);
        string Registration(Users user);       
        void Save();
    }

}
