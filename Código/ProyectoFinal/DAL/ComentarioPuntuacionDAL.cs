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
            
            string cadenaInsertComentarioPuntuacion = @"INSERT INTO COMENTARIOPUNTUACION VALUES(@comentario, @fecha, @respuesta, @puntuacion,@idPublicacion,@idCliente);
                                                        SELECT CAST(Scope_Identity() AS INT);";
            string cadenaUpdateContacto = "UPDATE CONTACTO SET ComentarioPuntuacionId=@idComentarioGenerado WHERE Id=@idContacto;";
            int idComentarioGenerado = 0;

            SqlTransaction trn = null;
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

                        con.Open();
                        trn = con.BeginTransaction();
                        cmd.Transaction = trn;

                        idComentarioGenerado = (int)cmd.ExecuteScalar();
                        cmd.Parameters.Clear();

                        cmd.CommandText = cadenaUpdateContacto;

                        cmd.Parameters.AddWithValue("@idComentarioGenerado", idComentarioGenerado);
                        cmd.Parameters.AddWithValue("@idContacto", comentarioPuntuacion.Contacto.Id);

                        //Ver que podria estar dando de alta comentarios y que no tenga contacto en null... tema de seguridad
                        cmd.ExecuteNonQuery();

                        trn.Commit();
                        trn.Dispose();

                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }
        }

        public void altaRespuestaComentario(ComentarioPuntuacion comentarioPuntuacion)
        {
            string cadenaUpdateRespuesta = @"UPDATE COMENTARIOPUNTUACION SET Respuesta=@respuesta WHERE Id=@idComentario;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaUpdateRespuesta, con))
                    {
                        cmd.Parameters.AddWithValue("@respuesta", comentarioPuntuacion.Respuesta);
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

        public Contacto obtenerContactoConComentarioPendienteCliente(int idPublicacion, int idCliente)
        {
            Contacto contacto = null;
            string cadenaSelectContacto = "SELECT * FROM CONTACTO WHERE PublicacionId =@idPublicacion AND ClienteId=@idCliente AND ComentarioPuntuacionId IS NULL;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(cadenaSelectContacto, con))
                    {
                        cmd.Parameters.AddWithValue("@idPublicacion", idPublicacion);
                        cmd.Parameters.AddWithValue("@idCliente", idCliente);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            dr.Read();
                            if (dr.HasRows)
                            {
                                contacto = new Contacto
                                {
                                    Id = Convert.ToInt32(dr["Id"]),
                                    Publicacion = new Publicacion { Id= Convert.ToInt32(dr["PublicacionId"]), },
                                    Cliente = new Cliente { Id = Convert.ToInt32(dr["ClienteId"]), },
                                    Fecha = Convert.ToDateTime(dr["Fecha"])
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

            return contacto;
        }

        public List<Contacto> obtenerTodosContactosConComentariosPendientesOferta(int idCliente)
        {
            List<Contacto> contactos = new List<Contacto>();
            string cadenaSelectContacto = "SELECT c.Id as IdContacto, c.ClienteId as IdClienteContacto, p.ClienteId as IdClientePublicacion, * FROM CONTACTO c, PUBLICACION p WHERE p.Id=c.PublicacionId AND c.ClienteId=@idCliente AND c.ComentarioPuntuacionId IS NULL AND p.Tipo='OFERTA';";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(cadenaSelectContacto, con))
                    {
                        cmd.Parameters.AddWithValue("@idCliente", idCliente);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while(dr.Read())
                            {
                                Contacto contacto = new Contacto
                                {
                                    Id = Convert.ToInt32(dr["IdContacto"]),
                                    Publicacion = new Publicacion {
                                        Id = Convert.ToInt32(dr["PublicacionId"]),
                                        Cliente= new Cliente { Id = Convert.ToInt32(dr["IdClientePublicacion"]), },
                                        Titulo= Convert.ToString(dr["Titulo"]),
                                        Activa=Convert.ToBoolean(dr["Activa"]),
                                        Habilitada= Convert.ToBoolean(dr["Habilitada"]),
                                        Finalizada= Convert.ToBoolean(dr["Finalizada"]),
                                        Tipo= Convert.ToString(dr["Tipo"]),
                                    },
                                    Cliente = new Cliente { Id = Convert.ToInt32(dr["IdClienteContacto"]), },
                                    Fecha = Convert.ToDateTime(dr["Fecha"])
                                };
                                contactos.Add(contacto);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return contactos;
        }

        public List<Contacto> obtenerTodosContactosConComentariosPendientesSolicitud(int idCliente)
        {
            List<Contacto> contactos = new List<Contacto>();
            string cadenaSelectContacto = "SELECT c.Id as IdContacto, c.ClienteId as IdClienteContacto, p.ClienteId as IdClientePublicacion, * FROM CONTACTO c, PUBLICACION p WHERE p.Id=c.PublicacionId AND p.ClienteId=@idCliente AND c.ComentarioPuntuacionId IS NULL AND p.Tipo='SOLICITUD';";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(cadenaSelectContacto, con))
                    {
                        cmd.Parameters.AddWithValue("@idCliente", idCliente);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                Contacto contacto = new Contacto
                                {
                                    Id = Convert.ToInt32(dr["IdContacto"]),
                                    Publicacion = new Publicacion
                                    {
                                        Id = Convert.ToInt32(dr["PublicacionId"]),
                                        Cliente = new Cliente { Id = Convert.ToInt32(dr["IdClientePublicacion"]), },
                                        Titulo = Convert.ToString(dr["Titulo"]),
                                        Activa = Convert.ToBoolean(dr["Activa"]),
                                        Habilitada = Convert.ToBoolean(dr["Habilitada"]),
                                        Finalizada = Convert.ToBoolean(dr["Finalizada"]),
                                        Tipo = Convert.ToString(dr["Tipo"]),
                                    },
                                    Cliente = new Cliente { Id = Convert.ToInt32(dr["IdClienteContacto"]), },
                                    Fecha = Convert.ToDateTime(dr["Fecha"])
                                };
                                contactos.Add(contacto);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return contactos;
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
                    P.ClienteId = @idCliente AND
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
                        var q = cmd.ExecuteScalar();
                        if (q != DBNull.Value)
                        {
                            promedio = Convert.ToDouble(cmd.ExecuteScalar());
                        }
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
                        var q = cmd.ExecuteScalar();
                        if (q != DBNull.Value)
                        {
                            promedio = Convert.ToDouble(cmd.ExecuteScalar());
                        }
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
            List<ComentarioPuntuacion> comentarios = new List<ComentarioPuntuacion>();
            string cadenaSelectComentario = "SELECT * FROM COMENTARIOPUNTUACION c, USUARIO u WHERE c.PublicacionId = @idPublicacion AND c.ClienteId=u.Id;";
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
                                        Id = Convert.ToInt32(dr["ClienteId"]),
                                        NombreUsuario= dr["NombreUsuario"].ToString(),
                                    }
                                };
                                if (dr["Respuesta"] != DBNull.Value)
                                {
                                    comentarioPuntuacion.Respuesta = dr["Respuesta"].ToString();
                                }
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

        public List<ComentarioPuntuacion> obtenerComentariosOferta(int idCliente)
        {
            List<ComentarioPuntuacion> comentarios = new List<ComentarioPuntuacion>();
            string cadenaSelectComentario = "SELECT c.Id as ComentarioId, p.Id as PublicacionId, c.ClienteId as ClienteComentarioId, s.Nombre as NombreServicio, * FROM COMENTARIOPUNTUACION c, USUARIO u, PUBLICACION p, SERVICIO s WHERE p.Id=c.PublicacionId AND p.ClienteId = @idCliente AND c.ClienteId=u.Id AND p.Tipo='OFERTA' AND p.ServicioId=s.Id;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(cadenaSelectComentario, con))
                    {
                        cmd.Parameters.AddWithValue("@idCliente", idCliente);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                ComentarioPuntuacion comentarioPuntuacion = new ComentarioPuntuacion
                                {
                                    Id = Convert.ToInt32(dr["ComentarioId"]),
                                    Fecha = Convert.ToDateTime(dr["Fecha"]),
                                    Comentario = dr["Comentario"].ToString(),
                                    Puntuacion = Convert.ToInt32(dr["Puntuacion"]),
                                    Publicacion = new Publicacion
                                    {
                                        Id = Convert.ToInt32(dr["PublicacionId"]),
                                        Servicio = new Servicio {
                                            Id= Convert.ToInt32(dr["ServicioId"]),
                                            Nombre= dr["NombreServicio"].ToString(),
                                        }
                                    },
                                    Cliente = new Cliente
                                    {
                                        Id = Convert.ToInt32(dr["ClienteComentarioId"]),
                                        NombreUsuario = dr["NombreUsuario"].ToString(),
                                    }
                                };
                                if (dr["Respuesta"] != DBNull.Value)
                                {
                                    comentarioPuntuacion.Respuesta = dr["Respuesta"].ToString();
                                }
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


        public List<ComentarioPuntuacion> obtenerComentariosSolicitud(int idCliente)
        {
            List<ComentarioPuntuacion> comentarios = new List<ComentarioPuntuacion>();
            string cadenaSelectComentario = "SELECT c.Id as ComentarioId, p.Id as PublicacionId, p.ClienteId as ClienteComentarioId, s.Nombre as NombreServicio, * FROM COMENTARIOPUNTUACION c, USUARIO u, PUBLICACION p, SERVICIO s WHERE p.Id=c.PublicacionId AND c.ClienteId = @idCliente AND p.ClienteId=u.Id AND p.Tipo='SOLICITUD' AND p.ServicioId=s.Id;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(cadenaSelectComentario, con))
                    {
                        cmd.Parameters.AddWithValue("@idCliente", idCliente);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                ComentarioPuntuacion comentarioPuntuacion = new ComentarioPuntuacion
                                {
                                    Id = Convert.ToInt32(dr["ComentarioId"]),
                                    Fecha = Convert.ToDateTime(dr["Fecha"]),
                                    Comentario = dr["Comentario"].ToString(),
                                    Puntuacion = Convert.ToInt32(dr["Puntuacion"]),
                                    Publicacion = new Publicacion
                                    {
                                        Id = Convert.ToInt32(dr["PublicacionId"]),
                                        Servicio = new Servicio
                                        {
                                            Id = Convert.ToInt32(dr["ServicioId"]),
                                            Nombre = dr["NombreServicio"].ToString(),
                                        },
                                        Cliente = new Cliente
                                        {
                                            Id = Convert.ToInt32(dr["ClienteComentarioId"]),
                                            NombreUsuario = dr["NombreUsuario"].ToString(),
                                        }
                                    },                                    
                                };
                                if (dr["Respuesta"] != DBNull.Value)
                                {
                                    comentarioPuntuacion.Respuesta = dr["Respuesta"].ToString();
                                }
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
