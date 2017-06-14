using ET;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class PreguntaDAL
    {
        public void altaPregunta(Pregunta pregunta)
        {
            string cadenaInsertPregunta = @"INSERT INTO Pregunta VALUES(@preg, @idCat);"; 
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaInsertPregunta, con))
                    {
                        cmd.Parameters.AddWithValue("@preg", pregunta.unaPregunta);                        
                        cmd.Parameters.AddWithValue("@idCat", pregunta.Categoria.Id);

                        con.Open();                       

                        cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }
        }
        public void actualizarPregunta(Pregunta pregunta)
        {
            string cadenaUpdatePregunta = @"UPDATE Pregunta SET Pregunta=@preg, CategoriaId=@idCat WHERE Id=@id;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaUpdatePregunta, con))
                    {
                        cmd.Parameters.AddWithValue("@id", pregunta.Id);
                        cmd.Parameters.AddWithValue("@preg", pregunta.unaPregunta);
                        cmd.Parameters.AddWithValue("@idCat", pregunta.Categoria.Id);

                        con.Open();

                        cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }
        }
        public List<Pregunta> obtenerTodos()
        {
            List<Pregunta> preguntas = new List<Pregunta>();
            string cadenaSelectPregunta = "SELECT p.Id as IdPregunta, p.Pregunta as Pregunta, p.CategoriaId as IdCategoria, c.Categoria as Categoria FROM PREGUNTA p, CATEGORIAPREGUNTA c WHERE p.CategoriaId=c.Id;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(cadenaSelectPregunta, con))
                    {
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                Pregunta pregunta = new Pregunta
                                {
                                    Id = Convert.ToInt32(dr["IdPregunta"]),
                                    unaPregunta = dr["Pregunta"].ToString(),
                                    Categoria = new CategoriaPregunta {
                                        Id = Convert.ToInt32(dr["IdCategoria"]),
                                        Categoria = dr["Categoria"].ToString(),
                                    },                                    
                                };
                                preguntas.Add(pregunta);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return preguntas;
        }
        public Pregunta obtener(int id)
        {
            Pregunta pregunta = null;
            string cadenaSelectPregunta = "SELECT p.Id as IdPregunta, p.Pregunta as Pregunta, p.CategoriaId as IdCategoria, c.Categoria as Categoria FROM PREGUNTA p, CATEGORIAPREGUNTA c WHERE p.CategoriaId=c.Id AND p.Id=@id;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {                   
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(cadenaSelectPregunta, con))
                    {
                        cmd.Parameters.AddWithValue("@id", id);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            dr.Read();
                            if (dr.HasRows)
                            {
                                pregunta = new Pregunta
                                {
                                    Id = Convert.ToInt32(dr["IdPregunta"]),
                                    unaPregunta = dr["Pregunta"].ToString(),
                                    Categoria = new CategoriaPregunta
                                    {
                                        Id = Convert.ToInt32(dr["IdCategoria"]),
                                        Categoria = dr["Categoria"].ToString(),
                                    },
                                };
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return pregunta;
        }
    }
}
