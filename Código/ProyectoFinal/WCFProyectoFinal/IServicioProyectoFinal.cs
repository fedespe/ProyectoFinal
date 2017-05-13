using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace WCFProyectoFinal
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IService1" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface IServicioProyectoFinal
    {
        //**********************************************************
        //CLIENTE
        //**********************************************************
        [OperationContract]
        List<DtoCliente> getClientes();
        [OperationContract]
        string altaCliente(string nombre, string apellido, string contrasena, string nombreUsuario, string correoElectronico
            ,string telefono, bool habilitado, string documento);
        [OperationContract]
        string actualizarCliente(string nombre, string apellido, string telefono, string documento);
        [OperationContract]
        void actualizarContrasenaCliente(int id, string contrasenaAnterior, string contrasenaNueva);
        [OperationContract]
        void habilitarCliente(int id);
        [OperationContract]
        void deshabilitarCliente(int id);
        [OperationContract]
        DtoCliente ingresarCliente(string nombreUsuario, string pass);
        //**********************************************************
        //FIN CLIENTE
        //**********************************************************

        //**********************************************************
        //ADMINISTRADOR
        //**********************************************************
        [OperationContract]
        void altaAdministrador(string nombre, string apellido, string contrasena, string nombreUsuario, string correoElectronico
            , string telefono, bool habilitado);
        [OperationContract]
        void actualizarAdministrador(string nombre, string apellido, string telefono);
        [OperationContract]
        void actualizarContrasenaAdministrador(int id, string contrasenaAnterior, string contrasenaNueva);
        [OperationContract]
        List<DtoAdministrador> getAdministradores();
        [OperationContract]
        void habilitarAdminitrador(int id);
        [OperationContract]
        void deshabilitarAdministrador(int id);
        [OperationContract]
        DtoAdministrador ingresarAdministrador(string nombreUsuario, string pass);
        //**********************************************************
        //FIN ADMINISTRADOR
        //**********************************************************
    }

    [DataContract]
    public class DtoUsuario {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Nombre { get; set; }
        [DataMember]
        public string Apellido { get; set; }
        [DataMember]
        public string NombreUsuario { get; set; }
        [DataMember]
        public string CorreElectronico { get; set; }
        [DataMember]
        public string Contrasena { get; set; }
        [DataMember]
        public string Telefono { get; set; }
        [DataMember]
        public bool Habilitado { get; set; }
    }
    [DataContract]
    public class DtoCliente:DtoUsuario {
        [DataMember]
        public string Documento { get; set; }
    }
    [DataContract]
    public class DtoAdministrador : DtoUsuario
    {
    }

}
