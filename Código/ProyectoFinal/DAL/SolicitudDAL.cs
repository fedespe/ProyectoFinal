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
            string cadenaUpdatePublicacion = "Update PUBLICACION SET Activa = 0 WHERE id = @idPublicacion;";

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



        public void altaSolicitud(Solicitud solicitud)
        {
            throw new NotImplementedException();
        }

        public void actualizarSolicitud(Solicitud solicitud)
        {
            throw new NotImplementedException();
        }

        public List<Solicitud> obtenerTodos()
        {
            throw new NotImplementedException();
        }

        public Solicitud obtener(int id)
        {
            throw new NotImplementedException();
        }

        public List<Solicitud> obtenerSolicitudesCliente(int idCliente)
        {
            throw new NotImplementedException();
        }

        

        public List<Solicitud> obtenerSolicitudesContratadasPorCliente(int idCliente)
        {
            throw new NotImplementedException();
        }

        public List<Solicitud> obtenerSolicitudesServicio(int idServicio)
        {
            throw new NotImplementedException();
        }

        
    }
}
