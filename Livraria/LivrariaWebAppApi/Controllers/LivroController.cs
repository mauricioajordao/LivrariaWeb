using CrystalDecisions.CrystalReports.Engine;
using LivrariaWebAppApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LivrariaWebAppApi.Controllers
{
    public class Livroview
    {
        public int codL;
        public string titulo;
        public string editora;
        public int edicao;
        public int anopublicao;
        public string preco;
        public List<assuntoview> assuntos;
        public List<Autorview> autores;
        public string autoresTXT;
        public string assuntosTXT;

    }

    public class LivroController : Controller
    {
        public LivrariaDBEntities db { get; private set; }



        // GET: Livro

        public LivroController() : this(new LivrariaDBEntities()) { }

        public LivroController(LivrariaDBEntities Db)
        { db = Db; }

        [HttpGet, ActionName("Report")]
        public ActionResult Report()
        {
            ReportDocument rd = new ReportDocument();
            rd.Load(Path.Combine(Server.MapPath("~/Reports"), "LivroReport.rpt"));
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
            List<Livroview> retorno = new List<Livroview>();

            foreach (var item in db.Livroes.ToList())
            {
                var vautoresTXT = "";
                foreach (var itema in item.autors)
                {
                    vautoresTXT += "[" + itema.nome + "] ";
                }
                var vassuntosTXT = "";
                foreach (var itemb in item.assuntoes)
                {
                    vassuntosTXT += "[" + itemb.descricao.ToUpper() + "] ";
                }
                var cultureInfo = System.Threading.Thread.CurrentThread.CurrentCulture;
                // faz uma cópia das informações de formatação de número da cultura local
                var numberFormatInfo = (NumberFormatInfo)cultureInfo.NumberFormat.Clone();
                // fixa o símbolo da moeda estrangeira
                numberFormatInfo.CurrencySymbol = "R$";
                // obtém o valor em moeda estrangeira formatado conforme a cultura local
              

                retorno.Add(
                    new Livroview()
                    {
                        codL = item.codL,
                        anopublicao = item.anopublicao,
                        edicao = item.edicao,
                        editora = item.editora,
                        preco = string.Format(numberFormatInfo, "{0:C}", item.preco.ToString()),
                        titulo = item.titulo,
                        assuntos = new List<assuntoview>(),
                        autores = new List<Autorview>(),
                        autoresTXT = vautoresTXT,
                        assuntosTXT = vassuntosTXT
                    }



                );

            }
            return Json(retorno, JsonRequestBehavior.AllowGet);
        }



        [HttpPost, ActionName("Create")]

        public ActionResult Create(int Codigo, string Descricao)
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
