using Draw.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Draw.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var model = new Shape()
            {
                ShapeName = Infrustracture.Enums.ShapeName.None
            };
            return View(model);
        }
        [HttpPost]
        public ActionResult Draw(Shape drawModel) { 
            string message = string.Empty;
            if (ModelState.IsValid && drawModel.ValidateData(out message)) {
                return new JsonResult {  Data=drawModel, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new HttpStatusCodeResult(HttpStatusCode.BadRequest, message);
        } 
    }
}