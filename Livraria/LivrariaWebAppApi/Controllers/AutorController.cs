using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using CrystalDecisions.CrystalReports.Engine;
using LivrariaWebAppApi.Models;

namespace LivrariaWebAppApi.Controllers
{
    public class Autorview
    {
        public int Codigo;
        public string Nome;

    }
    public class ObjetoRetorno
    {
        public int Status;
        public String Mensagem;
    }

    public class AutorController : Controller
    {
        public LivrariaDBEntities db { get; private set; }



        // GET: Autor

        public AutorController() : this(new LivrariaDBEntities()) { }
 
        public AutorController(LivrariaDBEntities Db)
        { }

        [HttpGet, ActionName("Report")]
        public ActionResult Report()
        {
            ReportDocument rd = new ReportDocument();
            rd.Load(Path.Combine(Server.MapPath("~/Reports"), "AutorReport.rpt"));
            Response.Buffer = false;
            Response.ClearContent();
            Response.ClearHeaders();

            List<autor> ListaAutores = db.autors.ToList();
            
            rd.SetDataSource(ListaAutores);


            Stream stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
            stream.Seek(0, SeekOrigin.Begin);
            return File(stream, "application/pdf", "AutorReport.pdf");
        }
        public ActionResult Index()
        {
            return View();
        }
        

        public ActionResult GetAll()
        {
            List<Autorview> retorno = new List<Autorview>();

            foreach (var item in db.autors.ToList()) {

                retorno.Add(new Autorview() { Codigo = item.codA, Nome = item.nome });
      
            }                               
            return Json( retorno,  JsonRequestBehavior.AllowGet);              
        }


 
        [HttpPost, ActionName("Create")]
       
        public ActionResult Create( string Nome)
        {
            try
            {
                db.autors.Add(new autor() { nome = Nome });
                db.SaveChanges();
               
            }
            catch(Exception e)
            {
                   return Json(
                    new ObjetoRetorno()
                    { Status = -1, Mensagem = e.Message }
                    , JsonRequestBehavior.AllowGet);
            }
            return Json(
                   new ObjetoRetorno()
                   { Status = 0, Mensagem = "Autor Incluido com Sucesso" }
                   , JsonRequestBehavior.AllowGet);

        }

        [HttpPost , ActionName("Update")]
        public ActionResult Update(int Codigo, string Nome)
        {
            try
            {
                autor vautor = db.autors.Find(Codigo);
                vautor.nome = Nome;
                db.Entry(vautor).State = EntityState.Modified;
                db.SaveChanges();

            }
            catch (Exception e)
            {
                return Json(
                    new ObjetoRetorno()
                    { Status = -1, Mensagem = e.Message }
                    , JsonRequestBehavior.AllowGet);
            }
            return Json(
                   new ObjetoRetorno()
                   { Status = 0, Mensagem = "Autor Alterado com Sucesso" }
                   , JsonRequestBehavior.AllowGet);
        }


        
        [HttpPost, ActionName("Delete")]
        public ActionResult Delete(int Codigo)
        {
            try
            {
                var vautor = db.autors.Find(Codigo);
                db.autors.Remove(vautor);
                db.SaveChanges();

            }
            catch (Exception e)
            {
                return Json(
                    new ObjetoRetorno()
                    { Status = -1, Mensagem = e.Message }
                    , JsonRequestBehavior.AllowGet);
            }
            return Json(
                   new ObjetoRetorno()
                   { Status = 0, Mensagem = "Autor Excluido com Sucesso" }
                   , JsonRequestBehavior.AllowGet);

        }


    }
}
