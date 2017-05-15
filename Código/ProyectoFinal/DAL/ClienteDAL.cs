﻿using ET;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ClienteDAL
    {
        public void altaCliente(Cliente cli) {
            string cadenaInsertUsuario = @"INSERT INTO Usuario VALUES(@nom, @ape, @nomUsu,@pass, @ultModif, @habilitado, @email, @documento, @tel, @dir, @fechaAlta, @tipo, @barrio); 
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
                        cmd.Parameters.AddWithValue("@email", cli.CorreElectronico);
                        cmd.Parameters.AddWithValue("@documento", cli.Documento);
                        cmd.Parameters.AddWithValue("@tel", cli.Telefono);
                        cmd.Parameters.AddWithValue("@dir", "18 de julio 1591"); //FALTA INGRESO DE DIRECCION
                        cmd.Parameters.AddWithValue("@fechaAlta", DateTime.Now);
                        cmd.Parameters.AddWithValue("@tipo", "CLIENTE");
                        cmd.Parameters.AddWithValue("@barrio", 1); //FALTA SELECCIONAR EL BARRIO

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

        }
        public void actualizarContrasena(int id, string contrasenaAnterior, string contrasenaNueva)
        {

        }
        public List<Cliente> getClientes() {
            List<Cliente> clientes = new List<Cliente>();
            clientes.Add(new Cliente
            {
                Id = 1,
                Nombre = "Federico"
            });
            clientes.Add(new Cliente
            {
                Id = 2,
                Nombre = "Carlos"
            });
            return clientes;
        }
        public void habilitarCliente(int id) {

        }
        public void deshabilitarCliente(int id)
        {

        }
        public Cliente ingresarCliente(string nombre, string pass) {
            return null;
        }
    }
}
