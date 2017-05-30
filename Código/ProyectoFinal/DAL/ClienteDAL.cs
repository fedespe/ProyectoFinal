using ET;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ClienteDAL : UsuarioDAL
    {
        public Cliente obtener(int id)
        {
            Cliente cli = null;
            string cadenaSelectUsuario= "SELECT * FROM Usuario WHERE Tipo='CLIENTE' AND Id = @id";
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
                                cli = new Cliente
                                {
                                    Id = Convert.ToInt32(dr["Id"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Apellido = dr["Apellido"].ToString(),
                                    NombreUsuario = dr["NombreUsuario"].ToString(),
                                    Contrasena = dr["Contrasenia"].ToString(),
                                    UltimaModificacionContrasena = Convert.ToDateTime(dr["UltimaModificacionContrasenia"]),
                                    Habilitado = Convert.ToBoolean(dr["Habilitado"]),
                                    CorreoElectronico = dr["Email"].ToString(),
                                    Telefono = dr["Telefono"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    FechaAlta = Convert.ToDateTime(dr["FechaAlta"]),
                                    Barrio= new Barrio { Id= Convert.ToInt32(dr["BarrioId"])}
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

            return cli;
        }
        public List<Cliente> obtenerTodos()
        {
            List<Cliente> clientes = new List<Cliente>();
            string cadenaSelectUsuarios = "SELECT * FROM Usuario WHERE Tipo='CLIENTE' ORDER BY NombreUsuario ASC";
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
                                Cliente cli = new Cliente
                                {
                                    Id = Convert.ToInt32(dr["Id"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Apellido = dr["Apellido"].ToString(),
                                    NombreUsuario = dr["NombreUsuario"].ToString(),
                                    Contrasena = dr["Contrasenia"].ToString(),
                                    UltimaModificacionContrasena = Convert.ToDateTime(dr["UltimaModificacionContrasenia"]),
                                    Habilitado = Convert.ToBoolean(dr["Habilitado"]),
                                    CorreoElectronico = dr["Email"].ToString(),
                                    Telefono = dr["Telefono"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    FechaAlta = Convert.ToDateTime(dr["FechaAlta"]),
                                    Barrio = new Barrio { Id = Convert.ToInt32(dr["BarrioId"]) }
                                };
                                //Ver que si el Cliente tuviera datos en la tabla Cliente se debe hacer otra consulta mas y agregar los datos
                                clientes.Add(cli);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return clientes;
        }
        public void altaCliente(Cliente cli) {
            string cadenaInsertUsuario = @"INSERT INTO Usuario VALUES(@nom, @ape, @nomUsu,@pass, @ultModif, @habilitado, @email, @tel, @dir, @fechaAlta, @tipo, @barrio); 
                                            SELECT CAST(Scope_Identity() AS INT);";
            string cadenaInsertCliente = "INSERT INTO Cliente VALUES(@idUsu);";
            int idClienteGenerado = 0;

            SqlTransaction trn = null;
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaInsertUsuario, con))
                    {
                        cmd.Parameters.AddWithValue("@nom", cli.Nombre);
                        cmd.Parameters.AddWithValue("@ape", cli.Apellido);
                        cmd.Parameters.AddWithValue("@nomUsu", cli.NombreUsuario);
                        cmd.Parameters.AddWithValue("@pass", Utilidades.calcularMD5Hash(cli.Contrasena));
                        cmd.Parameters.AddWithValue("@ultModif", DateTime.Now);
                        cmd.Parameters.AddWithValue("@habilitado", cli.Habilitado);
                        cmd.Parameters.AddWithValue("@email", cli.CorreoElectronico);
                        cmd.Parameters.AddWithValue("@tel", cli.Telefono);
                        cmd.Parameters.AddWithValue("@dir", cli.Direccion); 
                        cmd.Parameters.AddWithValue("@fechaAlta", DateTime.Now);
                        cmd.Parameters.AddWithValue("@barrio", cli.Barrio.Id);
                        cmd.Parameters.AddWithValue("@tipo", "CLIENTE");

                        con.Open();
                        trn = con.BeginTransaction();
                        cmd.Transaction = trn;

                        idClienteGenerado = (int)cmd.ExecuteScalar();
                        cmd.Parameters.Clear();

                        cmd.CommandText = cadenaInsertCliente;

                        cmd.Parameters.AddWithValue("@idUsu", idClienteGenerado);                       

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
        public void actualizarCliente(Cliente cli)
        {
            string cadenaUpdateUsuario = @"UPDATE Usuario SET Nombre=@nom, Apellido=@ape, Telefono=@tel, Direccion=@dir, BarrioId=@barrio
                                            WHERE Id=@id;";
            //string cadenaUpdateCliente = "UPDATE Cliente SET datos... WHERE UduarioId=@id;"; //PARA CUANDO HAYA MAS DATOS

            SqlTransaction trn = null;
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaUpdateUsuario, con))
                    {
                        cmd.Parameters.AddWithValue("@id", cli.Id);
                        cmd.Parameters.AddWithValue("@nom", cli.Nombre);
                        cmd.Parameters.AddWithValue("@ape", cli.Apellido);
                        cmd.Parameters.AddWithValue("@tel", cli.Telefono);
                        cmd.Parameters.AddWithValue("@dir", cli.Direccion);
                        cmd.Parameters.AddWithValue("@barrio", cli.Barrio.Id);

                        con.Open();
                        trn = con.BeginTransaction();
                        cmd.Transaction = trn;

                        cmd.ExecuteNonQuery();
                       
                        //cmd.Parameters.Clear(); //PARA CUANDO HAYA MAS DATOS

                        //cmd.CommandText = cadenaUpdateCliente;

                        //cmd.Parameters.AddWithValue("@id", cli.Id);
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
        //Por el momento se repite codigo... ver si interesa diferenciar el ingreso de administrador de cliente
        public Cliente ingresarCliente(string NombreUsu, string pass) {
            Cliente cli = null;
            string cadenaSelectUsuario = "SELECT * FROM Usuario WHERE NombreUsuario=@nomUsu AND Contrasenia=@pass AND Habilitado=1";
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
                                cli = new Cliente
                                {
                                    Id = Convert.ToInt32(dr["Id"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Apellido = dr["Apellido"].ToString(),
                                    NombreUsuario = dr["NombreUsuario"].ToString(),
                                    Contrasena = dr["Contrasenia"].ToString(),
                                    UltimaModificacionContrasena = Convert.ToDateTime(dr["UltimaModificacionContrasenia"]),
                                    Habilitado = Convert.ToBoolean(dr["Habilitado"]),
                                    CorreoElectronico = dr["Email"].ToString(),
                                    Telefono = dr["Telefono"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    FechaAlta = Convert.ToDateTime(dr["FechaAlta"]),
                                    Barrio = new Barrio { Id = Convert.ToInt32(dr["BarrioId"]) }
                                };
                            }
                        }
                        //Ver que si el cliente tuviera datos en la tabla cliente habria que hacer otra lectura
                        //Cargar demás datos del barrio sería lo mejor también
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return cli;
        }
    }
}
