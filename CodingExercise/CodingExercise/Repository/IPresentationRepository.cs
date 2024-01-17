using CodingExercise.Models;

namespace CodingExercise.Repository
{
    public interface IPresentationRepository
    {
        Presentations presentations(int presentationID);
        List<Presentations> listPresentation();
        void AddPresentation(Presentations presentation);
        void EditPresentation(Presentations presentation);
        void DeletePresentation(int presentationID);
        void Save();
    }
}
