using ET;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class AdministradorDAL : UsuarioDAL
    {
        public Administrador obtener(int id)
        {
            Administrador admin = null;
            string cadenaSelectUsuario = "SELECT * FROM Usuario WHERE Tipo='ADMINISTRADOR' AND Id = @id";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaSelectUsuario, con))
                    {
                        cmd.Parameters.AddWithValue("@id", id);
                        con.Open();
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            dr.Read();
                            if (dr.HasRows)
                            {
                                admin = new Administrador
                                {
                                    Id = Convert.ToInt32(dr["Id"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Apellido = dr["Apellido"].ToString(),
                                    NombreUsuario = dr["NombreUsuario"].ToString(),
                                    Contrasena = dr["Contrasenia"].ToString(),
                                    UltimaModificacionContrasena = Convert.ToDateTime(dr["UltimaModificacionContrasenia"]),
                                    Habilitado = Convert.ToBoolean(dr["Habilitado"]),
                                    CorreoElectronico = dr["Email"].ToString(),
                                    //Documento = dr["Documento"].ToString(),
                                    Telefono = dr["Telefono"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    FechaAlta = Convert.ToDateTime(dr["FechaAlta"]),
                                    Barrio = new Barrio { Id = Convert.ToInt32(dr["BarrioId"]) },
                                    Tipo = dr["Tipo"].ToString()
                                };
                            }
                        }
                        //Ver que si el cliente tuviera datos en la tabla cliente habria que hacer otra lectura
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return admin;
        }
        public List<Administrador> obtenerTodos()
        {
            List<Administrador> administradores = new List<Administrador>();
            string cadenaSelectUsuarios = "SELECT * FROM Usuario WHERE Tipo='ADMINISTRADOR' ORDER BY NombreUsuario ASC";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(cadenaSelectUsuarios, con))
                    {
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                Administrador admin = new Administrador
                                {
                                    Id = Convert.ToInt32(dr["Id"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Apellido = dr["Apellido"].ToString(),
                                    NombreUsuario = dr["NombreUsuario"].ToString(),
                                    Contrasena = dr["Contrasenia"].ToString(),
                                    UltimaModificacionContrasena = Convert.ToDateTime(dr["UltimaModificacionContrasenia"]),
                                    Habilitado = Convert.ToBoolean(dr["Habilitado"]),
                                    CorreoElectronico = dr["Email"].ToString(),
                                    //Documento = dr["Documento"].ToString(),
                                    Telefono = dr["Telefono"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    FechaAlta = Convert.ToDateTime(dr["FechaAlta"]),
                                    Barrio = new Barrio { Id = Convert.ToInt32(dr["BarrioId"]) },
                                    Tipo = dr["Tipo"].ToString()
                                };
                                //Ver que si el Cliente tuviera datos en la tabla Cliente se debe hacer otra consulta mas y agregar los datos
                                administradores.Add(admin);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return administradores;
        }
        public void altaAdministrador(Administrador admin)
        {
            string cadenaInsertUsuario = @"INSERT INTO Usuario VALUES(@nom, @ape, @nomUsu,@pass, @ultModif, @habilitado, @email, @tel, @dir, @fechaAlta, @tipo, @barrio, @img); 
                                            SELECT CAST(Scope_Identity() AS INT);";
            string cadenaInsertCliente = "INSERT INTO Administrador VALUES(@idUsu);";
            int idAdminGenerado = 0;

            SqlTransaction trn = null;
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaInsertUsuario, con))
                    {
                        cmd.Parameters.AddWithValue("@nom", admin.Nombre);
                        cmd.Parameters.AddWithValue("@ape", admin.Apellido);
                        cmd.Parameters.AddWithValue("@nomUsu", admin.NombreUsuario);
                        cmd.Parameters.AddWithValue("@pass", Utilidades.calcularMD5Hash(admin.Contrasena));
                        cmd.Parameters.AddWithValue("@ultModif", DateTime.Now);
                        cmd.Parameters.AddWithValue("@habilitado", admin.Habilitado);
                        cmd.Parameters.AddWithValue("@email", admin.CorreoElectronico);
                        //cmd.Parameters.AddWithValue("@documento", admin.Documento);
                        cmd.Parameters.AddWithValue("@tel", admin.Telefono);
                        cmd.Parameters.AddWithValue("@dir", admin.Direccion);
                        cmd.Parameters.AddWithValue("@fechaAlta", DateTime.Now);
                        cmd.Parameters.AddWithValue("@barrio", admin.Barrio.Id);
                        cmd.Parameters.AddWithValue("@tipo", "ADMINISTRADOR");

                        cmd.Parameters.AddWithValue("@img", "ADMINISTRADOR.jpg");

                        con.Open();
                        trn = con.BeginTransaction();
                        cmd.Transaction = trn;

                        idAdminGenerado = (int)cmd.ExecuteScalar();
                        cmd.Parameters.Clear();

                        cmd.CommandText = cadenaInsertCliente;

                        cmd.Parameters.AddWithValue("@idUsu", idAdminGenerado);

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
        public void actualizarAdministrador(Administrador admin)
        {
            string cadenaUpdateUsuario = @"UPDATE Usuario SET Nombre=@nom, Apellido=@ape, Telefono=@tel, Direccion=@dir, BarrioId=@barrio
                                            WHERE Id=@id;";
            //string cadenaUpdateAdmin = "UPDATE Administrador SET datos... WHERE UduarioId=@id;"; //PARA CUANDO HAYA MAS DATOS

            SqlTransaction trn = null;
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaUpdateUsuario, con))
                    {
                        cmd.Parameters.AddWithValue("@id", admin.Id);
                        cmd.Parameters.AddWithValue("@nom", admin.Nombre);
                        cmd.Parameters.AddWithValue("@ape", admin.Apellido);
                        //cmd.Parameters.AddWithValue("@documento", admin.Documento);
                        cmd.Parameters.AddWithValue("@tel", admin.Telefono);
                        cmd.Parameters.AddWithValue("@dir", admin.Direccion);
                        cmd.Parameters.AddWithValue("@barrio", admin.Barrio.Id);

                        con.Open();
                        trn = con.BeginTransaction();
                        cmd.Transaction = trn;

                        cmd.ExecuteNonQuery();

                        //cmd.Parameters.Clear(); //PARA CUANDO HAYA MAS DATOS

                        //cmd.CommandText = cadenaUpdateCliente;

                        //cmd.Parameters.AddWithValue("@id", admin.Id);
                        //mas datos...

                        //cmd.ExecuteNonQuery();

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
        public Administrador ingresarAdministrador(string NombreUsu, string pass)
        {
            Administrador admin = null;
            string cadenaSelectUsuario = "SELECT * FROM Usuario WHERE NombreUsuario=@nomUsu AND Contrasenia=@pass AND Habilitado=1 AND (Tipo='ADMINISTRADOR' OR Tipo='SUPERADMINISTRADOR')";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaSelectUsuario, con))
                    {
                        cmd.Parameters.AddWithValue("@nomUsu", NombreUsu);
                        cmd.Parameters.AddWithValue("@pass", Utilidades.calcularMD5Hash(pass));
                        con.Open();
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            dr.Read();
                            if (dr.HasRows)
                            {
                                admin = new Administrador
                                {
                                    Id = Convert.ToInt32(dr["Id"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Apellido = dr["Apellido"].ToString(),
                                    NombreUsuario = dr["NombreUsuario"].ToString(),
                                    Contrasena = dr["Contrasenia"].ToString(),
                                    UltimaModificacionContrasena = Convert.ToDateTime(dr["UltimaModificacionContrasenia"]),
                                    Habilitado = Convert.ToBoolean(dr["Habilitado"]),
                                    CorreoElectronico = dr["Email"].ToString(),
                                    //Documento = dr["Documento"].ToString(),
                                    Telefono = dr["Telefono"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    FechaAlta = Convert.ToDateTime(dr["FechaAlta"]),
                                    Barrio = new Barrio { Id = Convert.ToInt32(dr["BarrioId"]) },
                                    Tipo = dr["Tipo"].ToString()
                                };
                            }
                        }
                        //Ver que si el cliente tuviera datos en la tabla cliente habria que hacer otra lectura
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return admin;
        }
    }
}
