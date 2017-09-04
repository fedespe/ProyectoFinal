using ET;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class OfertaDAL
    {
        public List<Oferta> obtenerPublicacionesOfertaServicio(int idServicio)
        {
            List<Oferta> publicaciones = new List<Oferta>();
            string cadenaSelectPublicacion = "SELECT p.Id as IdPublicacion, i.Imagen as Imagen, s.Nombre as ServicioNombre, u.Imagen as ImgUsuario, u.NombreUsuario as NombreUsuario, c.Id as IdContacto, c.ClienteId as IdClienteContacto, b.Nombre as NombreBarrio, dep.Nombre as NombreDepto, * from PUBLICACION p left join SERVICIO s on s.id=p.ServicioId left join PUBLICACIONIMAGEN i on i.PublicacionId=p.Id left join USUARIO u on u.Id=p.ClienteId left join BARRIO b on b.Id=u.BarrioId left join DEPARTAMENTO dep on dep.Id=b.DepartamentoId left join CONTACTO c on c.PublicacionId=p.Id Where p.ServicioId=@idServicio AND p.Tipo='OFERTA' ORDER BY p.Id;";
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
                                    Oferta publicacion = new Oferta
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
                                        Cliente = new Cliente() {
                                            Id = Convert.ToInt32(dr["ClienteId"]),
                                            Imagen = dr["ImgUsuario"].ToString(),
                                            NombreUsuario = dr["NombreUsuario"].ToString(),
                                            Barrio = new Barrio { Nombre = dr["NombreBarrio"].ToString(), Departamento = new Departamento { Nombre = dr["NombreDepto"].ToString() } }
                                        },
                                        Imagenes = new List<string>(),
                                        Finalizada = Convert.ToBoolean(dr["Finalizada"]),
                                        Habilitada = Convert.ToBoolean(dr["Habilitada"]),
                                    };
                                    publicacion.Imagenes.Add(dr["Imagen"].ToString());
                                    publicaciones.Add(publicacion);
                                    ultimoId = Convert.ToInt32(dr["IdPublicacion"]);
                                }
                            }
                        }
                    }
                    //Ver que el promedio se tendria que obtener en la consulta principal.
                    //PENSAR CONSULTA CON AVG().
                    string cadenaSelectPromedio = "SELECT AVG(Puntuacion) as Puntuacion, COUNT(*) as Cantidad FROM COMENTARIOPUNTUACION WHERE PublicacionId = @idPublicacion;";
                    foreach (Oferta p in publicaciones)
                    {
                        using (SqlCommand cmd = new SqlCommand(cadenaSelectPromedio, con))
                        {
                            cmd.Parameters.Clear();
                            cmd.Parameters.AddWithValue("@idPublicacion", p.Id);
                            using (SqlDataReader dr = cmd.ExecuteReader())
                            {
                                while (dr.Read())
                                {
                                    if (dr["Puntuacion"] != DBNull.Value && dr["Cantidad"] != DBNull.Value)
                                    {
                                        p.PuntajePromedio = Convert.ToDouble(dr["Puntuacion"]);
                                        p.CantidadComentarios = Convert.ToInt32(dr["Cantidad"]);
                                    }
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

            return publicaciones;
        }
    }
}
