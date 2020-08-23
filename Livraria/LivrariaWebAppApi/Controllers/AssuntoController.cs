using CrystalDecisions.CrystalReports.Engine;
using LivrariaWebAppApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LivrariaWebAppApi.Controllers
{
    public class assuntoview
    {
        public int Codigo;
        public string Descricao;

    }

    public class assuntoController : Controller
    {
        public LivrariaDBEntities db { get; private set; }



        // GET: assunto

        public assuntoController() : this(new LivrariaDBEntities()) { }

        public assuntoController(LivrariaDBEntities Db)
        { db = Db; }

        [HttpGet, ActionName("Report")]
        public ActionResult Report()
        {
            ReportDocument rd = new ReportDocument();
            rd.Load(Path.Combine(Server.MapPath("~/Reports"), "assuntoReport.rpt"));
            Response.Buffer = false;
            Response.ClearContent();
            Response.ClearHeaders();

            List<assunto> Listaassuntos = db.assuntoes.ToList();

            rd.SetDataSource(Listaassuntos);


            Stream stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
            stream.Seek(0, SeekOrigin.Begin);
            return File(stream, "application/pdf", "assuntoReport.pdf");
        }
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult GetAll()
        {
            List<assuntoview> retorno = new List<assuntoview>();

            foreach (var item in db.assuntoes.ToList())
            {

                retorno.Add(new assuntoview() { Codigo = item.codAS, Descricao = item.descricao });

            }
            return Json(retorno, JsonRequestBehavior.AllowGet);
        }



        [HttpPost, ActionName("Create")]

        public ActionResult Create(int Codigo , string Descricao)
        {
            try
            {
                db.assuntoes.Add(new assunto() { descricao = Descricao });
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
                   { Status = 0, Mensagem = "assunto Incluido com Sucesso" }
                   , JsonRequestBehavior.AllowGet);

        }

        [HttpPost, ActionName("Update")]
        public ActionResult Update(int Codigo, string Descricao)
        {
            try
            {
                assunto vassunto = db.assuntoes.Find(Codigo);
                vassunto.descricao = Descricao;
                db.Entry(vassunto).State = EntityState.Modified;
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
                   { Status = 0, Mensagem = "assunto Alterado com Sucesso" }
                   , JsonRequestBehavior.AllowGet);
        }



        [HttpPost, ActionName("Delete")]
        public ActionResult Delete(int Codigo)
        {
            try
            {
                var vassunto = db.assuntoes.Find(Codigo);
                db.assuntoes.Remove(vassunto);
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
                   { Status = 0, Mensagem = "assunto Excluido com Sucesso" }
                   , JsonRequestBehavior.AllowGet);

        }


    }
}
