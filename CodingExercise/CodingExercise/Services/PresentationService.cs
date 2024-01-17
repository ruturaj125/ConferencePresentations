
using CodingExercise.Models;
using CodingExercise.Repository;

namespace CodingExercise.Services
{
    public class PresentationService : IPresentationRepository
    {
        private readonly MyDbContext dbContext;
        public PresentationService(MyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void AddPresentation(Presentations presentation)
        {
            dbContext.presentations.Add(presentation);
            Save();
        }

        public void DeletePresentation(int presentationID)
        {
            Presentations presentation = dbContext.presentations.Where(x => x.ID == presentationID).FirstOrDefault();
            if(presentation != null)
            {
                dbContext.presentations.Remove(presentation);
                Save();
            }
        }

        public void EditPresentation(Presentations presentation)
        {
            Presentations objPresentation = dbContext.presentations.Where(x => x.ID == presentation.ID).FirstOrDefault();
            if (presentation != null)
            {
                objPresentation.ID = presentation.ID;
                objPresentation.Title = presentation.Title;
                objPresentation.PresenterName = presentation.PresenterName;
                objPresentation.Duration = presentation.Duration;
                dbContext.Entry(objPresentation).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                Save();
            }
        }

        public List<Presentations> listPresentation()
        {
            return dbContext.presentations.ToList();
        }

        public Presentations presentations(int presentationID)
        {
            return dbContext.presentations.Where(x => x.ID == presentationID).FirstOrDefault();
        }

        public void Save()
        {
            dbContext.SaveChanges();
        }
    }
}
