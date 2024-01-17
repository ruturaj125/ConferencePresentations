using Microsoft.AspNetCore.Mvc;
using CodingExercise.Models;
using CodingExercise.Repository;
using System.Transactions;
using System.Collections.Generic;

namespace CodingExercise.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PresentationController : ControllerBase
    {
        private readonly IPresentationRepository presentationRepository;
        public PresentationController(IPresentationRepository presentationRepository)
        {
            this.presentationRepository = presentationRepository;
        }

        [HttpPost]
        [Route("AddPresentation")]
        public IActionResult AddPresentation([FromBody] Presentations presentations)
        {
            using (var scope = new TransactionScope())
            {
                presentationRepository.AddPresentation(presentations);
                scope.Complete();
                return Ok();
            }
        }

        [HttpPut]
        [Route("EditPresentation")]
        public IActionResult EditPresentation([FromBody] Presentations presentations)
        {
            using (var scope = new TransactionScope())
            {
                presentationRepository.EditPresentation(presentations);
                scope.Complete();
                return Ok();
            }
        }

        [HttpDelete]
        [Route("DeletePresentation")]
        public IActionResult DeletePresentation(int presentationID)
        {
            using (var scope = new TransactionScope())
            {
                presentationRepository.DeletePresentation(presentationID);
                scope.Complete();
                return Ok();
            }
        }

        [HttpGet]
        [Route("GetProfile")]
        public IActionResult Get()
        {
            List<Presentations> list = presentationRepository.listPresentation();
            if (list != null && list.Count > 0)
            {
                return Ok(new { PresentationList = list});
            }
            else
                return new NoContentResult();
        }

        [HttpGet]
        [Route("Get")]
        public IActionResult Get(int presentationID)
        {
            if (presentationID > 0)
            {
                Presentations objPresentations = presentationRepository.presentations(presentationID);
                if (objPresentations != null)
                {
                    return Ok(new { Presentations = objPresentations });
                }
                else
                    return new NoContentResult();
            }
            return new NoContentResult();
        }

    }
}
