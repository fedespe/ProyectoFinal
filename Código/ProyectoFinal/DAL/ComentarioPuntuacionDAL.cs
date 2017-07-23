using ET;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ComentarioPuntuacionDAL
    {
        public void altaComentarioPuntuacion(ComentarioPuntuacion comentarioPuntuacion)
        {
            string cadenaInsertComentarioPuntuacion = @"INSERT INTO COMENTARIOPUNTUACION VALUES(@comentario, @fecha, @respuesta, @puntuacion,@idPublicacion,@idCliente, @tipo);";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaInsertComentarioPuntuacion, con))
                    {
                        cmd.Parameters.AddWithValue("@comentario", comentarioPuntuacion.Comentario);
                        cmd.Parameters.AddWithValue("@fecha", DateTime.Now);
                        cmd.Parameters.AddWithValue("@respuesta", DBNull.Value);
                        cmd.Parameters.AddWithValue("@puntuacion", comentarioPuntuacion.Puntuacion);
                        cmd.Parameters.AddWithValue("@idPublicacion", comentarioPuntuacion.Publicacion.Id);
                        cmd.Parameters.AddWithValue("@idCliente", comentarioPuntuacion.Cliente.Id);
                        cmd.Parameters.AddWithValue("@tipo", comentarioPuntuacion.Publicacion.Tipo);

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

        public double obtenerPromedioPuntajeClienteServicio(int idCliente, int idServicio)
        {
            //Oferta
            double promedio = 0;

            string cadenaSelectComentario = @"
                SELECT
                    AVG(CP.Puntuacion) 
                FROM
                    COMENTARIOPUNTUACION CP,
                    PUBLICACION P 
                WHERE
                    CP.ClienteId = @idCliente AND
                    CP.PublicacionId = P.Id AND
                    P.ServicioId = @idServicio AND
                    P.Tipo = 'OFERTA'
                ;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(cadenaSelectComentario, con))
                    {
                        cmd.Parameters.AddWithValue("@idCliente", idCliente);
                        cmd.Parameters.AddWithValue("@idServicio", idServicio);
                        promedio = Convert.ToDouble(cmd.ExecuteScalar());
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return promedio;
        }

        public void altaContacto(Contacto contacto)
        {
            string cadenaInsertContacto = @"INSERT INTO CONTACTO VALUES(@PublicacionId, @ClienteId, @ComentarioId, @Fecha);";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaInsertContacto, con))
                    {
                        cmd.Parameters.AddWithValue("@PublicacionId", contacto.Publicacion.Id);
                        cmd.Parameters.AddWithValue("@Fecha", DateTime.Now);
                        cmd.Parameters.AddWithValue("@ComentarioId", DBNull.Value);
                        cmd.Parameters.AddWithValue("@ClienteId", contacto.Cliente.Id);

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

        public double obtenerPromedioPuntajePublicacion(int idPublicacion)
        {
            double promedio = 0;

            string cadenaSelectComentario = "SELECT AVG(Puntuacion) FROM COMENTARIOPUNTUACION WHERE PublicacionId = @idPublicacion;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(cadenaSelectComentario, con))
                    {
                        cmd.Parameters.AddWithValue("@idPublicacion", idPublicacion);
                        promedio = Convert.ToDouble(cmd.ExecuteScalar());
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return promedio;
        }

        public void borrarComentarioPuntuacion(ComentarioPuntuacion comentarioPuntuacion)
        {
            string cadenaInsertPregunta = @"DELETE FROM COMENTARIOPUNTUACION WHERE id=@idComentario;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaInsertPregunta, con))
                    {
                        cmd.Parameters.AddWithValue("@idComentario", comentarioPuntuacion.Id);

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
        public List<ComentarioPuntuacion> obtenerPorPublicacion(int idPublicacion)
        {
            List<ComentarioPuntuacion> comentarios = null;
            string cadenaSelectComentario = "SELECT * FROM COMENTARIOPUNTUACION WHERE PublicacionId = @idPublicacion;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(cadenaSelectComentario, con))
                    {
                        cmd.Parameters.AddWithValue("@idPublicacion", idPublicacion);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                ComentarioPuntuacion comentarioPuntuacion = new ComentarioPuntuacion
                                {
                                    Id = Convert.ToInt32(dr["Id"]),
                                    Fecha = Convert.ToDateTime(dr["Fecha"]),
                                    Comentario = dr["Comentario"].ToString(),
                                    Puntuacion = Convert.ToInt32(dr["Puntuacion"]),
                                    Publicacion = new Publicacion
                                    {
                                        Id = Convert.ToInt32(dr["PublicacionId"])
                                    },
                                    Cliente = new Cliente
                                    {
                                        Id = Convert.ToInt32(dr["ClienteId"])
                                    }
                                };
                                comentarios.Add(comentarioPuntuacion);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return comentarios;
        }
    }
}
