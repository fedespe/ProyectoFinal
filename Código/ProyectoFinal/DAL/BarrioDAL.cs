using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ET;
using System.Data.SqlClient;

namespace DAL
{
    public class BarrioDAL
    {
        public void altaBarrio(Barrio barrio)
        {
            
        }
        public void actualizarBarrio(Barrio barrio)
        {
            
        }
        public void eliminarBarrio(Barrio barrio)
        {
            
        }
        public Barrio obtener(int id)
        {
            return null;
        }
        public List<Barrio> obtenerTodos()
        {
            List<Barrio> barrios = new List<Barrio>();
            string cadenaSelectBarrio = "SELECT * FROM Barrio ORDER BY Nombre ASC";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(cadenaSelectBarrio, con))
                    {
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                Barrio barrio = new Barrio
                                {
                                    Id = Convert.ToInt32(dr["Id"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Departamento = new Departamento { Id = Convert.ToInt32(dr["DepartamentoId"].ToString()) },
                                };
                                //Ver que si el Cliente tuviera datos en la tabla Cliente se debe hacer otra consulta mas y agregar los datos
                                barrios.Add(barrio);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ProyectoException("Error: " + ex.Message);
            }

            return barrios;
        }

    }
}
