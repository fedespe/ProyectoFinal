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
            string cadenaInsertPregunta = @"INSERT INTO COMENTARIOPUNTUACION VALUES(@comentario, @puntuacion,@idPublicacion,@idCliente);";
            try
            {
                using (SqlConnection con = new SqlConnection(Utilidades.conn))
                {
                    using (SqlCommand cmd = new SqlCommand(cadenaInsertPregunta, con))
                    {
                        cmd.Parameters.AddWithValue("@comentario", comentarioPuntuacion.Comentario);
                        cmd.Parameters.AddWithValue("@puntuacion", comentarioPuntuacion.Puntuacion);
                        cmd.Parameters.AddWithValue("@idPublicacion", comentarioPuntuacion.Publicacion.Id);
                        cmd.Parameters.AddWithValue("@idCliente", comentarioPuntuacion.Cliente.Id);

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
        public void borrarComentarioPuntuacion(ComentarioPuntuacion comentarioPuntuacion)
        {
            string cadenaInsertPregunta = @"DELETE FROM COMENTARIOPUNTUACION WHERE @idComentario;";
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
            return null;
        }
    }
}
