using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using LivrariaDAL;

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
        public LivrariaDBEntities db = new LivrariaDBEntities();

        // GET: Autor
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


        // GET: Autor/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            autor autor = db.autors.Find(id);
            if (autor == null)
            {
                return HttpNotFound();
            }
            return View(autor);
        }

        // GET: Autor/Create
        public ActionResult Create()
        {
            
            return View();
        }

        // POST: Autor/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
       
        public ActionResult Create( string Nome)
        {
            try
            {
                db.autors.Add(new autor() { nome = Nome });
                db.SaveChanges();
               
            }
            catch(Exception e)
            {
                db.autors.Add(new autor() { nome = Nome });
                db.SaveChanges();
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

        // GET: Autor/Edit/5
        public ActionResult Edit(int Codigo,string Nome)
        {
           
            autor autor = db.autors.Find(Codigo);
            if (autor == null)
            {
                return HttpNotFound();
            }
            autor.nome = Nome;
            db.SaveChanges();
            return View();
        }

        // POST: Autor/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "codA,nome")] autor autor)
        {
            if (ModelState.IsValid)
            {
                db.Entry(autor).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
 
            return View(autor);
        }

        // GET: Autor/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            autor autor = db.autors.Find(id);
            if (autor == null)
            {
                return HttpNotFound();
            }
            return View(autor);
        }

        // POST: Autor/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            autor autor = db.autors.Find(id);
            db.autors.Remove(autor);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
