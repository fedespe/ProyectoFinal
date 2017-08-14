using ET;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class UsuarioDAL
    {
        public void actualizarContrasena(int id, string contrasenaNueva)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    SqlCommand cmd = new SqlCommand("UPDATE Usuario SET Contrasenia = @pass WHERE id = @id", con);

                    cmd.Parameters.AddWithValue("@pass", Utilidades.calcularMD5Hash(contrasenaNueva));
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }
        }

        public void habilitarUsuario(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    SqlCommand cmd = new SqlCommand("Update Usuario SET Habilitado = 1 WHERE id = @id", con);
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }
        }
        public void deshabilitarUsuario(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    SqlCommand cmd = new SqlCommand("Update Usuario SET Habilitado = 0 WHERE id = @id", con);
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }
        }
        public bool existeNombreUsuario(string nombreUsuario)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("SELECT * FROM Usuario WHERE NombreUsuario = @nomUsu", con);
                    cmd.Parameters.AddWithValue("@nomUsu", nombreUsuario);
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        dr.Read();
                        return dr.HasRows;
                    }               
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }
        }
        public bool existeCorreoElectronico(string correo)
        {            
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("SELECT * FROM Usuario WHERE Email = @correo", con);
                    cmd.Parameters.AddWithValue("@correo", correo);
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        dr.Read();
                        return dr.HasRows;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }
        }

        public Usuario obtenerPorToken(string token)
        {
            try
            {
                Usuario usuario = null;

                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("SELECT * FROM Usuario WHERE Token = @token AND Habilitado = 1", con);
                    cmd.Parameters.AddWithValue("@token", token);
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        if (dr.Read()){
                            usuario = new Usuario
                            {
                                Id = Convert.ToInt32(dr["Id"]),
                                Nombre = dr["Nombre"].ToString(),
                                Apellido = dr["Apellido"].ToString(),
                                NombreUsuario = dr["NombreUsuario"].ToString(),
                                UltimaModificacionContrasena = Convert.ToDateTime(dr["UltimaModificacionContrasenia"]),
                                Habilitado = Convert.ToBoolean(dr["Habilitado"]),
                                CorreoElectronico = dr["Email"].ToString(),
                                Telefono = dr["Telefono"].ToString(),
                                Direccion = dr["Direccion"].ToString(),
                                FechaAlta = Convert.ToDateTime(dr["FechaAlta"]),
                                Tipo = dr["Tipo"].ToString(),
                                Barrio = new Barrio { Id = Convert.ToInt32(dr["BarrioId"]) },
                                Imagen = dr["Imagen"].ToString(),
                                Token = dr["Token"].ToString(),
                                TokenExpiration = Convert.ToDateTime(dr["TokenExpiration"]),
                            };
                        }
                    }
                }
                return usuario;
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }
        }
    }
}
