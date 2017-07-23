using ET;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class PublicacionDAL
    {
        //FALTAN LAS RESPUESTAS A LAS PREGUNTAS
        public void altaPublicacion(Publicacion publicacion)
        {
            string cadenaInsertPublicacion = @"INSERT INTO Publicacion VALUES
                                            (@titulo, @descripcion, @activa,@fechaAlta,@fechaVencimiento,
                                             @tipo,@idServicio,@idCliente); 
                                            SELECT CAST(Scope_Identity() AS INT);";
            string cadenaInsertImagen = "INSERT INTO PublicacionImagen VALUES(@idPublicacion,@imagen);";
            string cadenaInsertRespuesta = "INSERT INTO PUBLICACIONRESPUESTA VALUES(@idPublicacion,@idServicio,@idPregunta,@respuesta);";
            int idPublicacionGenerado = 0;

            SqlTransaction trn = null;
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaInsertPublicacion, con))
                    {
                        cmd.Parameters.AddWithValue("@titulo", publicacion.Titulo);
                        cmd.Parameters.AddWithValue("@descripcion", publicacion.Descripcion);
                        cmd.Parameters.AddWithValue("@activa", publicacion.Activa);
                        cmd.Parameters.AddWithValue("@fechaAlta", DateTime.Now);
                        cmd.Parameters.AddWithValue("@fechaVencimiento", DBNull.Value);
                        cmd.Parameters.AddWithValue("@tipo", publicacion.Tipo);
                        cmd.Parameters.AddWithValue("@idServicio", publicacion.Servicio.Id);
                        cmd.Parameters.AddWithValue("@idCliente", publicacion.Cliente.Id);

                        con.Open();
                        trn = con.BeginTransaction(System.Data.IsolationLevel.ReadCommitted);
                        cmd.Transaction = trn;

                        idPublicacionGenerado = (int)cmd.ExecuteScalar();
                        //PUBLICACION.IMAGENES SIEMPRE VIENE EN NULL DEL FRONT, LAS IMAGENES SE GUARDAN DESDE EL IFRAME
                        if (publicacion.Imagenes != null) {
                            cmd.CommandText = cadenaInsertImagen;
                            foreach (string i in publicacion.Imagenes)
                            {
                                cmd.Parameters.Clear();
                                cmd.Parameters.AddWithValue("@idPublicacion", idPublicacionGenerado);
                                cmd.Parameters.AddWithValue("@imagen", i);
                                cmd.ExecuteNonQuery();
                            }
                        }
                        if (publicacion.Respuestas != null)
                        {
                            cmd.CommandText = cadenaInsertRespuesta;
                            foreach (Respuesta r in publicacion.Respuestas)
                            {
                                cmd.Parameters.Clear();
                                cmd.Parameters.AddWithValue("@idPublicacion", idPublicacionGenerado);
                                cmd.Parameters.AddWithValue("@idServicio", publicacion.Servicio.Id);
                                cmd.Parameters.AddWithValue("@idPregunta", r.Pregunta.Id);
                                cmd.Parameters.AddWithValue("@respuesta", r.UnaRespuesta);
                                cmd.ExecuteNonQuery();
                            }
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
        public void actualizarPublicacion(Publicacion publicacion)
        {
            string cadenaUpdatePublicacion = @"UPDATE Publicacion SET Titulo=@titulo, Descripcion=@descripcion 
                                            WHERE Id = @idPublicacion; ";
            //string cadenaDeleteImagen = "DELETE FROM PublicacionImagen WHERE PublicacionId = @idPublicacion;";
            //string cadenaInsertImagen = "INSERT INTO PublicacionImagen VALUES(@idPublicacion,@imagen);";
            string cadenaDeleteRespuestas = "DELETE FROM PUBLICACIONRESPUESTA WHERE PublicacionId = @idPublicacion;";
            string cadenaInsertRespuesta = "INSERT INTO PUBLICACIONRESPUESTA VALUES(@idPublicacion,@idServicio,@idPregunta,@respuesta);";
            SqlTransaction trn = null;
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaUpdatePublicacion, con))
                    {
                        cmd.Parameters.AddWithValue("@titulo", publicacion.Titulo);
                        cmd.Parameters.AddWithValue("@descripcion", publicacion.Descripcion);
                        cmd.Parameters.AddWithValue("@idPublicacion", publicacion.Id);
                        //cmd.Parameters.AddWithValue("@activa", publicacion.Activa);
                        //cmd.Parameters.AddWithValue("@fechaAlta", DateTime.Now);
                        //cmd.Parameters.AddWithValue("@fechaVencimiento", DBNull.Value);
                        //cmd.Parameters.AddWithValue("@tipo", publicacion.Tipo);
                        //cmd.Parameters.AddWithValue("@idServicio", publicacion.Servicio.Id);
                        //cmd.Parameters.AddWithValue("@idCliente", publicacion.Cliente.Id);

                        con.Open();
                        trn = con.BeginTransaction();
                        cmd.Transaction = trn;

                        cmd.ExecuteNonQuery();

                        //NO SE SECESITA ACTUALIZAR IMAGENES, SE ACTUALIZAN CON IFRAME
                        //cmd.Parameters.Clear();
                        //cmd.Parameters.AddWithValue("@idPublicacion", publicacion.Id);
                        //cmd.CommandText = cadenaDeleteImagen;
                        //cmd.ExecuteNonQuery();

                        //if (publicacion.Imagenes != null)
                        //{
                        //    cmd.CommandText = cadenaInsertImagen;
                        //    foreach (string i in publicacion.Imagenes)
                        //    {
                        //        cmd.Parameters.Clear();
                        //        cmd.Parameters.AddWithValue("@idPublicacion", publicacion.Id);
                        //        cmd.Parameters.AddWithValue("@imagen", i);
                        //        cmd.ExecuteNonQuery();
                        //    }
                        //}

                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@idPublicacion", publicacion.Id);
                        cmd.CommandText = cadenaDeleteRespuestas;
                        cmd.ExecuteNonQuery();

                        if (publicacion.Respuestas != null)
                        {
                            cmd.CommandText = cadenaInsertRespuesta;
                            foreach (Respuesta r in publicacion.Respuestas)
                            {
                                cmd.Parameters.Clear();
                                cmd.Parameters.AddWithValue("@idPublicacion", publicacion.Id);
                                cmd.Parameters.AddWithValue("@idServicio", publicacion.Servicio.Id);
                                cmd.Parameters.AddWithValue("@idPregunta", r.Pregunta.Id);
                                cmd.Parameters.AddWithValue("@respuesta", r.UnaRespuesta);
                                cmd.ExecuteNonQuery();
                            }
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
        public void guardarImagenePublicacion(Publicacion publicacion) {
            string cadenaDeleteImagen = "DELETE FROM PublicacionImagen WHERE PublicacionId = @idPublicacion;";
            string cadenaInsertImagen = "INSERT INTO PublicacionImagen VALUES(@idPublicacion,@imagen);";
            SqlTransaction trn = null;
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaDeleteImagen, con))
                    {
                        cmd.Parameters.AddWithValue("@idPublicacion", publicacion.Id);

                        con.Open();
                        trn = con.BeginTransaction();
                        cmd.Transaction = trn;

                        cmd.ExecuteNonQuery();
                        if (publicacion.Imagenes != null)
                        {
                            cmd.CommandText = cadenaInsertImagen;
                            foreach (string i in publicacion.Imagenes)
                            {
                                cmd.Parameters.Clear();
                                cmd.Parameters.AddWithValue("@idPublicacion", publicacion.Id);
                                cmd.Parameters.AddWithValue("@imagen", i);
                                cmd.ExecuteNonQuery();
                            }
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
        public List<Publicacion> obtenerTodos()
        {
            List<Publicacion> publicaciones = new List<Publicacion>();
            string cadenaSelectPublicacion = "Select p.Id as IdPublicacion, i.Imagen as Imagen, s.Nombre as ServicioNombre, * from PUBLICACION p left join SERVICIO s on s.id=p.ServicioId left join PUBLICACIONIMAGEN i on i.PublicacionId=p.Id ORDER BY p.Id;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(cadenaSelectPublicacion, con))
                    {
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            int ultimoId = 0;
                            while (dr.Read())
                            {
                                if (ultimoId != Convert.ToInt32(dr["IdPublicacion"]))
                                {
                                    //VER CUANDO CAMBIAR A UNA NUEVA PUBLICACION
                                    Publicacion publicacion = new Publicacion
                                    {
                                        Id = Convert.ToInt32(dr["IdPublicacion"]),
                                        Titulo = dr["Titulo"].ToString(),
                                        Descripcion = dr["Descripcion"].ToString(),
                                        Activa = Convert.ToBoolean(dr["Activa"]),
                                        Servicio = new Servicio() { Id = Convert.ToInt32(dr["ServicioId"]), Nombre = dr["ServicioNombre"].ToString() },
                                        FechaAlta = Convert.ToDateTime(dr["FechaAlta"]),
                                        //ver que es null por el momento la fecha de vencimiento
                                        //FechaVencimiento = Convert.ToDateTime(dr["FechaVencimiento"]),
                                        Tipo = dr["Tipo"].ToString(),
                                        Cliente = new Cliente() { Id = Convert.ToInt32(dr["ClienteId"]) },
                                        Imagenes = new List<string>()
                                    };
                                    if(dr["Imagen"]!= DBNull.Value)
                                        publicacion.Imagenes.Add(dr["Imagen"].ToString());
                                    publicaciones.Add(publicacion);
                                    ultimoId = Convert.ToInt32(dr["IdPublicacion"]);
                                }//EN UN ELSE SI QUISIERA TRAIGO EL RESTO DE LAS IMAGENES
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return publicaciones;
        }
        public List<Publicacion> obtenerPublicacionesCliente(int idCliente)
        {
            List<Publicacion> publicaciones = new List<Publicacion>();
            string cadenaSelectPublicacion = "Select p.Id as IdPublicacion, i.Imagen as Imagen, s.Nombre as ServicioNombre, * from PUBLICACION p left join SERVICIO s on s.id=p.ServicioId left join PUBLICACIONIMAGEN i on i.PublicacionId=p.Id Where p.ClienteId= @idCliente ORDER BY p.Id;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(cadenaSelectPublicacion, con))
                    {
                        cmd.Parameters.AddWithValue("@idCliente", idCliente);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            int ultimoId = 0;
                            while (dr.Read())
                            {
                                if (ultimoId != Convert.ToInt32(dr["IdPublicacion"]))
                                {
                                    //VER CUANDO CAMBIAR A UNA NUEVA PUBLICACION
                                    Publicacion publicacion = new Publicacion
                                    {
                                        Id = Convert.ToInt32(dr["IdPublicacion"]),
                                        Titulo = dr["Titulo"].ToString(),
                                        Descripcion = dr["Descripcion"].ToString(),
                                        Activa = Convert.ToBoolean(dr["Activa"]),
                                        Servicio = new Servicio() { Id = Convert.ToInt32(dr["ServicioId"]), Nombre= dr["ServicioNombre"].ToString() },
                                        FechaAlta = Convert.ToDateTime(dr["FechaAlta"]),
                                        //ver que es null por el momento la fecha de vencimiento
                                        //FechaVencimiento = Convert.ToDateTime(dr["FechaVencimiento"]),
                                        Tipo = dr["Tipo"].ToString(),
                                        Cliente = new Cliente() { Id = Convert.ToInt32(dr["ClienteId"]) },
                                        Imagenes = new List<string>()
                                    };
                                    if (dr["Imagen"] != DBNull.Value)
                                        publicacion.Imagenes.Add(dr["Imagen"].ToString());
                                    publicaciones.Add(publicacion);
                                    ultimoId = Convert.ToInt32(dr["IdPublicacion"]);
                                }//EN UN ELSE SI QUISIERA TRAIGO EL RESTO DE LAS IMAGENES
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return publicaciones;
        }
        public List<Publicacion> obtenerPublicacionesServicio(int idServicio)
        {
            List<Publicacion> publicaciones = new List<Publicacion>();
            string cadenaSelectPublicacion = "SELECT p.Id as IdPublicacion, i.Imagen as Imagen, s.Nombre as ServicioNombre, u.Imagen as ImgUsuario, u.NombreUsuario as NombreUsuario,* from PUBLICACION p left join SERVICIO s on s.id=p.ServicioId left join PUBLICACIONIMAGEN i on i.PublicacionId=p.Id left join USUARIO u on u.Id=p.ClienteId Where p.ServicioId=@idServicio AND p.Activa=1 ORDER BY p.Id;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(cadenaSelectPublicacion, con))
                    {
                        cmd.Parameters.AddWithValue("@idServicio", idServicio);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            int ultimoId = 0;
                            while (dr.Read())
                            {
                                if (ultimoId != Convert.ToInt32(dr["IdPublicacion"]))
                                {
                                    //VER CUANDO CAMBIAR A UNA NUEVA PUBLICACION
                                    Publicacion publicacion = new Publicacion
                                    {
                                        Id = Convert.ToInt32(dr["IdPublicacion"]),
                                        Titulo = dr["Titulo"].ToString(),
                                        Descripcion = dr["Descripcion"].ToString(),
                                        Activa = Convert.ToBoolean(dr["Activa"]),
                                        Servicio = new Servicio() { Id = Convert.ToInt32(dr["ServicioId"]), Nombre = dr["ServicioNombre"].ToString() },
                                        FechaAlta = Convert.ToDateTime(dr["FechaAlta"]),
                                        //ver que es null por el momento la fecha de vencimiento
                                        //FechaVencimiento = Convert.ToDateTime(dr["FechaVencimiento"]),
                                        Tipo = dr["Tipo"].ToString(),
                                        Cliente = new Cliente() { Id = Convert.ToInt32(dr["ClienteId"]), Imagen= dr["ImgUsuario"].ToString(), NombreUsuario = dr["NombreUsuario"].ToString() },
                                        Imagenes = new List<string>()
                                    };
                                    publicacion.Imagenes.Add(dr["Imagen"].ToString());
                                    publicaciones.Add(publicacion);
                                    ultimoId = Convert.ToInt32(dr["IdPublicacion"]);
                                }//EN UN ELSE SI QUISIERA TRAIGO EL RESTO DE LAS IMAGENES
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return publicaciones;
        }
        public Publicacion obtener(int id)
        {
            string cadenaSelectPublicacion = "SELECT p.Id as IdPublicacion, s.Nombre as ServicioNombre,* from PUBLICACION p, SERVICIO s WHERE s.id=p.ServicioId AND p.Id=@id;";
            Publicacion publicacion = new Publicacion();
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(cadenaSelectPublicacion, con))
                    {
                        cmd.Parameters.AddWithValue("@id", id);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            dr.Read();
                            if (dr.HasRows)
                            {
                                //VER CUANDO CAMBIAR A UNA NUEVA PUBLICACION
                                publicacion = new Publicacion
                                    {
                                        Id = Convert.ToInt32(dr["IdPublicacion"]),
                                        Titulo = dr["Titulo"].ToString(),
                                        Descripcion = dr["Descripcion"].ToString(),
                                        Activa = Convert.ToBoolean(dr["Activa"]),
                                        Servicio = new Servicio() { Id = Convert.ToInt32(dr["ServicioId"]), Nombre = dr["ServicioNombre"].ToString() },
                                        FechaAlta = Convert.ToDateTime(dr["FechaAlta"]),
                                        //ver que es null por el momento la fecha de vencimiento
                                        //FechaVencimiento = Convert.ToDateTime(dr["FechaVencimiento"]),
                                        Tipo = dr["Tipo"].ToString(),
                                        Cliente = new Cliente() { Id = Convert.ToInt32(dr["ClienteId"]) },
                                        Imagenes = new List<string>(),
                                        Respuestas = new List<Respuesta>()
                                    };                               
                            }
                        }
                        //AGREGO IMAGENES
                        cmd.Parameters.Clear();
                        cmd.CommandText = @"SELECT * FROM PUBLICACIONIMAGEN WHERE PublicacionId =@id";
                        cmd.Parameters.AddWithValue("@id", id);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                publicacion.Imagenes.Add(dr["Imagen"].ToString());
                            }
                        }
                        //AGREGO RESPUESTAS
                        cmd.Parameters.Clear();
                        cmd.CommandText = @"SELECT * FROM PUBLICACIONRESPUESTA WHERE PublicacionId =@id";
                        cmd.Parameters.AddWithValue("@id", id);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                publicacion.Respuestas.Add(new Respuesta() {
                                    Pregunta= new Pregunta() { Id=Convert.ToInt32(dr["PreguntaId"]) },
                                    UnaRespuesta= dr["Respuesta"].ToString()
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return publicacion;
        }
        public void habilitarPublicacion(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    SqlCommand cmd = new SqlCommand("Update Publicacion SET Activa = 1 WHERE id = @id", con);
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }
        }
        public void deshabilitarPublicacion(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    SqlCommand cmd = new SqlCommand("Update Publicacion SET Activa = 0 WHERE id = @id", con);
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }
        }

        public int obtenerUltimoIdPublicacionCliente(int idCliente) {
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    SqlCommand cmd = new SqlCommand("Select Max(p.Id) as ulitmaPub From Publicacion p WHERE ClienteId = @idCli;", con);
                    cmd.Parameters.AddWithValue("@idCli", idCliente);
                    int retorno = Convert.ToInt32(cmd.ExecuteScalar());
                    return retorno;
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }
        }
    }
}
