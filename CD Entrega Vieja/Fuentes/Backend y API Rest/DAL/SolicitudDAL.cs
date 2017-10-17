using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ET;
using System.Data.SqlClient;

namespace DAL
{
    public class SolicitudDAL
    {
        public void altaPresupuesto(Presupuesto presupuesto)
        {
            string cadenaInsertPresupuesto = @"INSERT INTO PRESUPUESTO VALUES(@clienteId, @publicacionId,@comentario,@aceptado, @fecha);";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaInsertPresupuesto, con))
                    {
                        cmd.Parameters.AddWithValue("@clienteId", presupuesto.Cliente.Id);
                        cmd.Parameters.AddWithValue("@publicacionId", presupuesto.Solicitud.Id);
                        cmd.Parameters.AddWithValue("@comentario", presupuesto.Comentario);
                        cmd.Parameters.AddWithValue("@aceptado", presupuesto.Aceptado);
                        cmd.Parameters.AddWithValue("@fecha", DateTime.Now);

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

        public List<Solicitud> obtenerSolicitudesAceptadas(int idClienteAceptado)
        {
            List<Solicitud> solicitudes = new List<Solicitud>();
            string cadenaSelectSolicitudesAceptadas = "Select p.Id as IdPublicacion, i.Imagen as Imagen, s.Nombre as ServicioNombre, u.Id as IdClientePublicacion, u.NombreUsuario as NombreClientePublicacion, * from PRESUPUESTO pr left join PUBLICACION p on p.Id=pr.PublicacionId left join PUBLICACIONIMAGEN i on i.PublicacionId=p.Id left join USUARIO u on u.Id=p.ClienteId left join SERVICIO s on s.Id=p.ServicioId Where pr.ClienteId= @idClienteAceptado AND pr.Aceptado=1 ORDER BY p.Id;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(cadenaSelectSolicitudesAceptadas, con))
                    {
                        cmd.Parameters.AddWithValue("@idClienteAceptado", idClienteAceptado);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            int ultimoIdPublicacion = 0;
                            while (dr.Read())
                            {
                                if (ultimoIdPublicacion != Convert.ToInt32(dr["IdPublicacion"]))
                                {
                                    //VER CUANDO CAMBIAR A UNA NUEVA PUBLICACION
                                    Solicitud solicitud = new Solicitud
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
                                        Cliente = new Cliente() { Id = Convert.ToInt32(dr["IdClientePublicacion"]), NombreUsuario= Convert.ToString(dr["NombreClientePublicacion"]) },
                                        Imagenes = new List<string>(),
                                        Finalizada = Convert.ToBoolean(dr["Finalizada"]),
                                        Habilitada = Convert.ToBoolean(dr["Habilitada"]),
                                    };
                                    if (dr["Imagen"] != DBNull.Value)
                                        solicitud.Imagenes.Add(dr["Imagen"].ToString());
                                    //if (!publicaciones.Contains(publicacion))
                                    solicitudes.Add(solicitud);
                                    ultimoIdPublicacion = Convert.ToInt32(dr["IdPublicacion"]);
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return solicitudes;
        }

        public List<Presupuesto> obtenerPresupuestos(int idPublicacion)
        {
            List<Presupuesto> presupuestos = new List<Presupuesto>();
            string cadenaSelectPresupuesto = "SELECT p.Id as IdPresupuesto, * FROM PRESUPUESTO p, USUARIO u WHERE p.PublicacionId=@idPub AND p.ClienteId=u.Id;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(cadenaSelectPresupuesto, con))
                    {
                        cmd.Parameters.AddWithValue("@idPub", idPublicacion);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                Presupuesto unPresupuesto = new Presupuesto
                                {
                                    Id = Convert.ToInt32(dr["IdPresupuesto"]),
                                    Cliente = new Cliente { Id= Convert.ToInt32(dr["ClienteId"]), NombreUsuario= dr["NombreUsuario"].ToString(), Imagen= dr["Imagen"].ToString() },
                                    Solicitud= new Solicitud { Id= Convert.ToInt32(dr["PublicacionId"]) },
                                    Comentario= dr["Comentario"].ToString(),
                                    Aceptado=Convert.ToBoolean(dr["Aceptado"]),
                                    Fecha=Convert.ToDateTime(dr["Fecha"])
                                };
                                presupuestos.Add(unPresupuesto);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return presupuestos;
        }

        public void aceptarPresupuesto(Presupuesto presupuesto)
        {
            string cadenaUpdatePresupuesto = "Update PRESUPUESTO SET Aceptado = 1 WHERE id = @idPresupuesto;";
            string cadenaUpdatePublicacion = "Update PUBLICACION SET Activa = 0, Finalizada = 1 WHERE id = @idPublicacion;";
            string cadenaInsertContacto = @"INSERT INTO CONTACTO VALUES(@PublicacionId, @ClienteId, @ComentarioId, @Fecha);";
            //falta crear contacto!!! para poder publicar y puntuar
            SqlTransaction trn = null;
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaUpdatePresupuesto, con))
                    {
                        cmd.Parameters.AddWithValue("@idPresupuesto", presupuesto.Id);
                        
                        con.Open();
                        trn = con.BeginTransaction(System.Data.IsolationLevel.ReadCommitted);
                        cmd.Transaction = trn;

                        cmd.ExecuteNonQuery();

                        cmd.CommandText = cadenaUpdatePublicacion;
                        cmd.Parameters.AddWithValue("@idPublicacion", presupuesto.Solicitud.Id);

                        cmd.ExecuteNonQuery();

                        cmd.CommandText = cadenaInsertContacto;
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@PublicacionId", presupuesto.Solicitud.Id);
                        cmd.Parameters.AddWithValue("@Fecha", DateTime.Now);
                        cmd.Parameters.AddWithValue("@ComentarioId", DBNull.Value);
                        cmd.Parameters.AddWithValue("@ClienteId", presupuesto.Cliente.Id);

                        cmd.ExecuteNonQuery();


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



        

        public List<Solicitud> obtenerSolicitudesCliente(int idCliente)
        {
            List<Solicitud> solicitudes = new List<Solicitud>();
            string cadenaSelectSolicitudesAceptadas = "Select p.Id as IdPublicacion, i.Imagen as Imagen, s.Nombre as ServicioNombre, u.Id as IdClienteContacto, u.NombreUsuario as NombreClienteContacto, p.ClienteId as ClienteIdPublicacion,* from PUBLICACION p left join PRESUPUESTO pr on p.Id=pr.PublicacionId left join PUBLICACIONIMAGEN i on i.PublicacionId=p.Id left join USUARIO u on u.Id=pr.ClienteId left join SERVICIO s on s.Id=p.ServicioId Where p.ClienteId= @idCliente AND p.Tipo='SOLICITUD' ORDER BY p.Id desc;";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(cadenaSelectSolicitudesAceptadas, con))
                    {
                        cmd.Parameters.AddWithValue("@idCliente", idCliente);
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            int ultimoIdPublicacion = 0;
                            while (dr.Read())
                            {
                                if (ultimoIdPublicacion != Convert.ToInt32(dr["IdPublicacion"]))
                                {
                                    //VER CUANDO CAMBIAR A UNA NUEVA PUBLICACION
                                    Solicitud solicitud = new Solicitud
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
                                        Cliente = new Cliente() { Id = Convert.ToInt32(dr["ClienteIdPublicacion"])},
                                        Imagenes = new List<string>(),
                                        Finalizada = Convert.ToBoolean(dr["Finalizada"]),
                                        Habilitada = Convert.ToBoolean(dr["Habilitada"]),
                                        Presupuestos= new List<Presupuesto>()
                                    };
                                    if (dr["Imagen"] != DBNull.Value)
                                        solicitud.Imagenes.Add(dr["Imagen"].ToString());
                                    //Solamente cargo el presupuesto aceptado.
                                    if(solicitud.Finalizada && dr["IdClienteContacto"] != DBNull.Value)
                                    {
                                        Presupuesto presupuesto = new Presupuesto
                                        { 
                                            Cliente = new Cliente { Id = Convert.ToInt32(dr["IdClienteContacto"]), NombreUsuario = Convert.ToString(dr["NombreClienteContacto"]) },
                                            Aceptado= Convert.ToBoolean(dr["Aceptado"])
                                        };
                                        solicitud.Presupuestos.Add(presupuesto);
                                    }
                                    solicitudes.Add(solicitud);
                                    ultimoIdPublicacion = Convert.ToInt32(dr["IdPublicacion"]);
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return solicitudes;
        }

        

        

        
    }
}
