using ET;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ServicioDAL
    {
        public void altaServicio(Servicio servicio)
        {
            string cadenaInsertServicio = @"INSERT INTO Servicio VALUES(@nom, @img, @habilitado,@fechaCreacion); 
                                            SELECT CAST(Scope_Identity() AS INT);";
            string cadenaInsertPregunta = "INSERT INTO SERVICIOPREGUNTA VALUES(@idServicio,@idPregunta);";
            int idServicioGenerado = 0;

            SqlTransaction trn = null;
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaInsertServicio, con))
                    {
                        cmd.Parameters.AddWithValue("@nom", servicio.Nombre);
                        cmd.Parameters.AddWithValue("@img", servicio.Imagen);
                        cmd.Parameters.AddWithValue("@habilitado", servicio.Habilitado);
                        cmd.Parameters.AddWithValue("@fechaCreacion", DateTime.Now);                        

                        con.Open();
                        trn = con.BeginTransaction(System.Data.IsolationLevel.ReadCommitted);
                        cmd.Transaction = trn;

                        idServicioGenerado = (int)cmd.ExecuteScalar();

                        cmd.CommandText = cadenaInsertPregunta;
                        foreach (Pregunta p in servicio.Preguntas)
                        {
                            cmd.Parameters.Clear();                            
                            cmd.Parameters.AddWithValue("@idServicio", idServicioGenerado);
                            cmd.Parameters.AddWithValue("@idPregunta", p.Id);
                            cmd.ExecuteNonQuery();
                        }

                        trn.Commit();
                        trn.Dispose();
                        //trn = null;
                    }
                }
            }
            catch (Exception ex)
            {
                //if (trn != null)
                //{
                //    trn.Rollback();
                //}
                throw new ProyectoException("Error: " + ex.Message);
            }
        }
        public void actualizarServicio(Servicio servicio)
        {
            string cadenaUpdateServicio = @"UPDATE Servicio SET Nombre = @nom, Imagen = @img, 
                                            Habilitado = @hab, FechaCreacion = @fechaCre
                                            WHERE Id = @idServicio; ";
            string cadenaDeletePreguntas = "DELETE FROM SERVICIOPREGUNTA WHERE ServicioId = @idServicio;";
            string cadenaInsertPreguntas = "INSERT INTO SERVICIOPREGUNTA VALUES(@idServicio,@idPregunta);";

            SqlTransaction trn = null;
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaUpdateServicio, con))
                    {
                        cmd.Parameters.AddWithValue("@idServicio", servicio.Id);
                        cmd.Parameters.AddWithValue("@nom", servicio.Nombre);
                        cmd.Parameters.AddWithValue("@img", servicio.Imagen);
                        cmd.Parameters.AddWithValue("@hab", servicio.Habilitado);
                        cmd.Parameters.AddWithValue("@fechaCre", DateTime.Now);

                        con.Open();
                        trn = con.BeginTransaction();
                        cmd.Transaction = trn;

                        cmd.ExecuteNonQuery();

                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@idServicio", servicio.Id);
                        cmd.CommandText = cadenaDeletePreguntas;
                        cmd.ExecuteNonQuery();

                        cmd.CommandText = cadenaInsertPreguntas;
                        foreach (Pregunta p in servicio.Preguntas)
                        {
                            cmd.Parameters.Clear();
                            cmd.Parameters.AddWithValue("@idServicio", servicio.Id);
                            cmd.Parameters.AddWithValue("@idPregunta", p.Id);
                            cmd.ExecuteNonQuery();
                        }

                        trn.Commit();
                        trn.Dispose();
                        //trn = null;
                    }
                }
            }
            catch (Exception ex)
            {
                //if (trn != null)
                //{
                //    trn.Rollback();
                //}
                throw new ProyectoException("Error: " + ex.Message);
            }
        }
        public List<Servicio> obtenerTodos()
        {
            List<Servicio> servicios = new List<Servicio>();
            string cadenaSelectServicio = "SELECT * FROM Servicio;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(cadenaSelectServicio, con))
                    {
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                Servicio servicio = new Servicio
                                {
                                    Id = Convert.ToInt32(dr["Id"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Imagen = dr["Imagen"].ToString(),
                                    Habilitado = Convert.ToBoolean(dr["Habilitado"]),
                                    FechaCreacion= Convert.ToDateTime(dr["FechaCreacion"])
                                };
                                servicios.Add(servicio);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return servicios;
        }
        public Servicio obtener(int id)
        {
            Servicio servicio = null;
            string cadenaSelectServicio = "SELECT * FROM Servicio WHERE Id=@idServicio;";
            string cadenaSelectPreguntas = @"SELECT sp.PreguntaId as Id, p.Pregunta as Pregunta, p.CategoriaId as CatId, c.Categoria as CatNom 
                                            FROM SERVICIOPREGUNTA sp, Pregunta p, CATEGORIAPREGUNTA c WHERE sp.PreguntaId=p.id 
                                            AND c.Id=p.CategoriaId AND ServicioId=@idServicio;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(cadenaSelectServicio, con))
                    {
                        cmd.Parameters.AddWithValue("@idServicio", id);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                servicio = new Servicio
                                {
                                    Id = Convert.ToInt32(dr["Id"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Imagen = dr["Imagen"].ToString(),
                                    Habilitado = Convert.ToBoolean(dr["Habilitado"]),
                                    FechaCreacion = Convert.ToDateTime(dr["FechaCreacion"]),
                                    Preguntas = new List<Pregunta>()
                                };
                            }
                        }
                        cmd.CommandText = cadenaSelectPreguntas;
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@idServicio", id);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                Pregunta p = new Pregunta
                                {
                                    Id = Convert.ToInt32(dr["Id"]),
                                    unaPregunta = dr["Pregunta"].ToString(),
                                    Categoria = new CategoriaPregunta {
                                        Id = Convert.ToInt32(dr["CatId"]),
                                        Categoria = dr["CatNom"].ToString()
                                    }
                                };
                                servicio.Preguntas.Add(p);
                            }
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return servicio;
        }
        public void habilitarServicio(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    SqlCommand cmd = new SqlCommand("Update Servicio SET Habilitado = 1 WHERE id = @id", con);
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }
        }
        public void deshabilitarServicio(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    SqlCommand cmd = new SqlCommand("Update Servicio SET Habilitado = 0 WHERE id = @id", con);
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }
        }


    }
}
