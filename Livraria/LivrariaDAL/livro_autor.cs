//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace LivrariaDAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class livro_autor
    {
        public Nullable<int> livro_codL { get; set; }
        public Nullable<int> autor_coda { get; set; }
        public int id { get; set; }
    
        public virtual autor autor { get; set; }
        public virtual Livro Livro { get; set; }
    }
}
