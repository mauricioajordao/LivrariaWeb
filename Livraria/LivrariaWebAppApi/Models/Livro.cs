//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace LivrariaWebAppApi.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Livro
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Livro()
        {
            this.assuntoes = new HashSet<assunto>();
            this.autors = new HashSet<autor>();
        }
    
        public int codL { get; set; }
        public string titulo { get; set; }
        public string editora { get; set; }
        public Nullable<int> edicao { get; set; }
        public string anopublicao { get; set; }
        public Nullable<decimal> preco { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<assunto> assuntoes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<autor> autors { get; set; }
    }
}
