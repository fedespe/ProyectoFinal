﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código fue generado por una herramienta.
//     Versión de runtime:4.0.30319.42000
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ConsolaPruebasWCF.ServicioProyectFinal {
    using System.Runtime.Serialization;
    using System;
    
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="DtoCliente", Namespace="http://schemas.datacontract.org/2004/07/WCFProyectoFinal")]
    [System.SerializableAttribute()]
    public partial class DtoCliente : ConsolaPruebasWCF.ServicioProyectFinal.DtoUsuario {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="DtoUsuario", Namespace="http://schemas.datacontract.org/2004/07/WCFProyectoFinal")]
    [System.SerializableAttribute()]
    [System.Runtime.Serialization.KnownTypeAttribute(typeof(ConsolaPruebasWCF.ServicioProyectFinal.DtoAdministrador))]
    [System.Runtime.Serialization.KnownTypeAttribute(typeof(ConsolaPruebasWCF.ServicioProyectFinal.DtoCliente))]
    public partial class DtoUsuario : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string ApellidoField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private ConsolaPruebasWCF.ServicioProyectFinal.DtoBarrio BarrioField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string ContrasenaField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string CorreElectronicoField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string DireccionField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string DocumentoField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private System.DateTime FechaAltaField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private bool HabilitadoField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int IdField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int IdBarrioField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string NombreField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string NombreUsuarioField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string TelefonoField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private System.DateTime UltimaModificacionContrasenaField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Apellido {
            get {
                return this.ApellidoField;
            }
            set {
                if ((object.ReferenceEquals(this.ApellidoField, value) != true)) {
                    this.ApellidoField = value;
                    this.RaisePropertyChanged("Apellido");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public ConsolaPruebasWCF.ServicioProyectFinal.DtoBarrio Barrio {
            get {
                return this.BarrioField;
            }
            set {
                if ((object.ReferenceEquals(this.BarrioField, value) != true)) {
                    this.BarrioField = value;
                    this.RaisePropertyChanged("Barrio");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Contrasena {
            get {
                return this.ContrasenaField;
            }
            set {
                if ((object.ReferenceEquals(this.ContrasenaField, value) != true)) {
                    this.ContrasenaField = value;
                    this.RaisePropertyChanged("Contrasena");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string CorreElectronico {
            get {
                return this.CorreElectronicoField;
            }
            set {
                if ((object.ReferenceEquals(this.CorreElectronicoField, value) != true)) {
                    this.CorreElectronicoField = value;
                    this.RaisePropertyChanged("CorreElectronico");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Direccion {
            get {
                return this.DireccionField;
            }
            set {
                if ((object.ReferenceEquals(this.DireccionField, value) != true)) {
                    this.DireccionField = value;
                    this.RaisePropertyChanged("Direccion");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Documento {
            get {
                return this.DocumentoField;
            }
            set {
                if ((object.ReferenceEquals(this.DocumentoField, value) != true)) {
                    this.DocumentoField = value;
                    this.RaisePropertyChanged("Documento");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public System.DateTime FechaAlta {
            get {
                return this.FechaAltaField;
            }
            set {
                if ((this.FechaAltaField.Equals(value) != true)) {
                    this.FechaAltaField = value;
                    this.RaisePropertyChanged("FechaAlta");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public bool Habilitado {
            get {
                return this.HabilitadoField;
            }
            set {
                if ((this.HabilitadoField.Equals(value) != true)) {
                    this.HabilitadoField = value;
                    this.RaisePropertyChanged("Habilitado");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int Id {
            get {
                return this.IdField;
            }
            set {
                if ((this.IdField.Equals(value) != true)) {
                    this.IdField = value;
                    this.RaisePropertyChanged("Id");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int IdBarrio {
            get {
                return this.IdBarrioField;
            }
            set {
                if ((this.IdBarrioField.Equals(value) != true)) {
                    this.IdBarrioField = value;
                    this.RaisePropertyChanged("IdBarrio");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Nombre {
            get {
                return this.NombreField;
            }
            set {
                if ((object.ReferenceEquals(this.NombreField, value) != true)) {
                    this.NombreField = value;
                    this.RaisePropertyChanged("Nombre");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string NombreUsuario {
            get {
                return this.NombreUsuarioField;
            }
            set {
                if ((object.ReferenceEquals(this.NombreUsuarioField, value) != true)) {
                    this.NombreUsuarioField = value;
                    this.RaisePropertyChanged("NombreUsuario");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Telefono {
            get {
                return this.TelefonoField;
            }
            set {
                if ((object.ReferenceEquals(this.TelefonoField, value) != true)) {
                    this.TelefonoField = value;
                    this.RaisePropertyChanged("Telefono");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public System.DateTime UltimaModificacionContrasena {
            get {
                return this.UltimaModificacionContrasenaField;
            }
            set {
                if ((this.UltimaModificacionContrasenaField.Equals(value) != true)) {
                    this.UltimaModificacionContrasenaField = value;
                    this.RaisePropertyChanged("UltimaModificacionContrasena");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="DtoBarrio", Namespace="http://schemas.datacontract.org/2004/07/WCFProyectoFinal")]
    [System.SerializableAttribute()]
    public partial class DtoBarrio : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private ConsolaPruebasWCF.ServicioProyectFinal.DtoDepartamento DepartamentoField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int IdField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string NombreField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public ConsolaPruebasWCF.ServicioProyectFinal.DtoDepartamento Departamento {
            get {
                return this.DepartamentoField;
            }
            set {
                if ((object.ReferenceEquals(this.DepartamentoField, value) != true)) {
                    this.DepartamentoField = value;
                    this.RaisePropertyChanged("Departamento");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int Id {
            get {
                return this.IdField;
            }
            set {
                if ((this.IdField.Equals(value) != true)) {
                    this.IdField = value;
                    this.RaisePropertyChanged("Id");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Nombre {
            get {
                return this.NombreField;
            }
            set {
                if ((object.ReferenceEquals(this.NombreField, value) != true)) {
                    this.NombreField = value;
                    this.RaisePropertyChanged("Nombre");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="DtoAdministrador", Namespace="http://schemas.datacontract.org/2004/07/WCFProyectoFinal")]
    [System.SerializableAttribute()]
    public partial class DtoAdministrador : ConsolaPruebasWCF.ServicioProyectFinal.DtoUsuario {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="DtoDepartamento", Namespace="http://schemas.datacontract.org/2004/07/WCFProyectoFinal")]
    [System.SerializableAttribute()]
    public partial class DtoDepartamento : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int IdField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string NombreField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int Id {
            get {
                return this.IdField;
            }
            set {
                if ((this.IdField.Equals(value) != true)) {
                    this.IdField = value;
                    this.RaisePropertyChanged("Id");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Nombre {
            get {
                return this.NombreField;
            }
            set {
                if ((object.ReferenceEquals(this.NombreField, value) != true)) {
                    this.NombreField = value;
                    this.RaisePropertyChanged("Nombre");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="ServicioProyectFinal.IServicioProyectoFinal")]
    public interface IServicioProyectoFinal {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/obtenerTodos", ReplyAction="http://tempuri.org/IServicioProyectoFinal/obtenerTodosResponse")]
        ConsolaPruebasWCF.ServicioProyectFinal.DtoCliente[] obtenerTodos();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/obtenerTodos", ReplyAction="http://tempuri.org/IServicioProyectoFinal/obtenerTodosResponse")]
        System.Threading.Tasks.Task<ConsolaPruebasWCF.ServicioProyectFinal.DtoCliente[]> obtenerTodosAsync();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/altaCliente", ReplyAction="http://tempuri.org/IServicioProyectoFinal/altaClienteResponse")]
        string altaCliente(ConsolaPruebasWCF.ServicioProyectFinal.DtoCliente dtoCliente);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/altaCliente", ReplyAction="http://tempuri.org/IServicioProyectoFinal/altaClienteResponse")]
        System.Threading.Tasks.Task<string> altaClienteAsync(ConsolaPruebasWCF.ServicioProyectFinal.DtoCliente dtoCliente);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/actualizarCliente", ReplyAction="http://tempuri.org/IServicioProyectoFinal/actualizarClienteResponse")]
        string actualizarCliente(ConsolaPruebasWCF.ServicioProyectFinal.DtoCliente DtoCliente);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/actualizarCliente", ReplyAction="http://tempuri.org/IServicioProyectoFinal/actualizarClienteResponse")]
        System.Threading.Tasks.Task<string> actualizarClienteAsync(ConsolaPruebasWCF.ServicioProyectFinal.DtoCliente DtoCliente);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/actualizarContrasenaCliente", ReplyAction="http://tempuri.org/IServicioProyectoFinal/actualizarContrasenaClienteResponse")]
        string actualizarContrasenaCliente(int id, string contrasenaAnterior, string contrasenaNueva);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/actualizarContrasenaCliente", ReplyAction="http://tempuri.org/IServicioProyectoFinal/actualizarContrasenaClienteResponse")]
        System.Threading.Tasks.Task<string> actualizarContrasenaClienteAsync(int id, string contrasenaAnterior, string contrasenaNueva);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/habilitarCliente", ReplyAction="http://tempuri.org/IServicioProyectoFinal/habilitarClienteResponse")]
        string habilitarCliente(int id);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/habilitarCliente", ReplyAction="http://tempuri.org/IServicioProyectoFinal/habilitarClienteResponse")]
        System.Threading.Tasks.Task<string> habilitarClienteAsync(int id);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/deshabilitarCliente", ReplyAction="http://tempuri.org/IServicioProyectoFinal/deshabilitarClienteResponse")]
        string deshabilitarCliente(int id);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/deshabilitarCliente", ReplyAction="http://tempuri.org/IServicioProyectoFinal/deshabilitarClienteResponse")]
        System.Threading.Tasks.Task<string> deshabilitarClienteAsync(int id);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/ingresarCliente", ReplyAction="http://tempuri.org/IServicioProyectoFinal/ingresarClienteResponse")]
        ConsolaPruebasWCF.ServicioProyectFinal.DtoCliente ingresarCliente(string nombreUsuario, string pass);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/ingresarCliente", ReplyAction="http://tempuri.org/IServicioProyectoFinal/ingresarClienteResponse")]
        System.Threading.Tasks.Task<ConsolaPruebasWCF.ServicioProyectFinal.DtoCliente> ingresarClienteAsync(string nombreUsuario, string pass);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/altaAdministrador", ReplyAction="http://tempuri.org/IServicioProyectoFinal/altaAdministradorResponse")]
        void altaAdministrador(string nombre, string apellido, string contrasena, string nombreUsuario, string correoElectronico, string telefono, bool habilitado);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/altaAdministrador", ReplyAction="http://tempuri.org/IServicioProyectoFinal/altaAdministradorResponse")]
        System.Threading.Tasks.Task altaAdministradorAsync(string nombre, string apellido, string contrasena, string nombreUsuario, string correoElectronico, string telefono, bool habilitado);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/actualizarAdministrador", ReplyAction="http://tempuri.org/IServicioProyectoFinal/actualizarAdministradorResponse")]
        void actualizarAdministrador(string nombre, string apellido, string telefono);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/actualizarAdministrador", ReplyAction="http://tempuri.org/IServicioProyectoFinal/actualizarAdministradorResponse")]
        System.Threading.Tasks.Task actualizarAdministradorAsync(string nombre, string apellido, string telefono);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/actualizarContrasenaAdministrador", ReplyAction="http://tempuri.org/IServicioProyectoFinal/actualizarContrasenaAdministradorRespon" +
            "se")]
        void actualizarContrasenaAdministrador(int id, string contrasenaAnterior, string contrasenaNueva);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/actualizarContrasenaAdministrador", ReplyAction="http://tempuri.org/IServicioProyectoFinal/actualizarContrasenaAdministradorRespon" +
            "se")]
        System.Threading.Tasks.Task actualizarContrasenaAdministradorAsync(int id, string contrasenaAnterior, string contrasenaNueva);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/getAdministradores", ReplyAction="http://tempuri.org/IServicioProyectoFinal/getAdministradoresResponse")]
        ConsolaPruebasWCF.ServicioProyectFinal.DtoAdministrador[] getAdministradores();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/getAdministradores", ReplyAction="http://tempuri.org/IServicioProyectoFinal/getAdministradoresResponse")]
        System.Threading.Tasks.Task<ConsolaPruebasWCF.ServicioProyectFinal.DtoAdministrador[]> getAdministradoresAsync();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/habilitarAdminitrador", ReplyAction="http://tempuri.org/IServicioProyectoFinal/habilitarAdminitradorResponse")]
        void habilitarAdminitrador(int id);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/habilitarAdminitrador", ReplyAction="http://tempuri.org/IServicioProyectoFinal/habilitarAdminitradorResponse")]
        System.Threading.Tasks.Task habilitarAdminitradorAsync(int id);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/deshabilitarAdministrador", ReplyAction="http://tempuri.org/IServicioProyectoFinal/deshabilitarAdministradorResponse")]
        void deshabilitarAdministrador(int id);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/deshabilitarAdministrador", ReplyAction="http://tempuri.org/IServicioProyectoFinal/deshabilitarAdministradorResponse")]
        System.Threading.Tasks.Task deshabilitarAdministradorAsync(int id);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/ingresarAdministrador", ReplyAction="http://tempuri.org/IServicioProyectoFinal/ingresarAdministradorResponse")]
        ConsolaPruebasWCF.ServicioProyectFinal.DtoAdministrador ingresarAdministrador(string nombreUsuario, string pass);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioProyectoFinal/ingresarAdministrador", ReplyAction="http://tempuri.org/IServicioProyectoFinal/ingresarAdministradorResponse")]
        System.Threading.Tasks.Task<ConsolaPruebasWCF.ServicioProyectFinal.DtoAdministrador> ingresarAdministradorAsync(string nombreUsuario, string pass);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IServicioProyectoFinalChannel : ConsolaPruebasWCF.ServicioProyectFinal.IServicioProyectoFinal, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class ServicioProyectoFinalClient : System.ServiceModel.ClientBase<ConsolaPruebasWCF.ServicioProyectFinal.IServicioProyectoFinal>, ConsolaPruebasWCF.ServicioProyectFinal.IServicioProyectoFinal {
        
        public ServicioProyectoFinalClient() {
        }
        
        public ServicioProyectoFinalClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public ServicioProyectoFinalClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public ServicioProyectoFinalClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public ServicioProyectoFinalClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public ConsolaPruebasWCF.ServicioProyectFinal.DtoCliente[] obtenerTodos() {
            return base.Channel.obtenerTodos();
        }
        
        public System.Threading.Tasks.Task<ConsolaPruebasWCF.ServicioProyectFinal.DtoCliente[]> obtenerTodosAsync() {
            return base.Channel.obtenerTodosAsync();
        }
        
        public string altaCliente(ConsolaPruebasWCF.ServicioProyectFinal.DtoCliente dtoCliente) {
            return base.Channel.altaCliente(dtoCliente);
        }
        
        public System.Threading.Tasks.Task<string> altaClienteAsync(ConsolaPruebasWCF.ServicioProyectFinal.DtoCliente dtoCliente) {
            return base.Channel.altaClienteAsync(dtoCliente);
        }
        
        public string actualizarCliente(ConsolaPruebasWCF.ServicioProyectFinal.DtoCliente DtoCliente) {
            return base.Channel.actualizarCliente(DtoCliente);
        }
        
        public System.Threading.Tasks.Task<string> actualizarClienteAsync(ConsolaPruebasWCF.ServicioProyectFinal.DtoCliente DtoCliente) {
            return base.Channel.actualizarClienteAsync(DtoCliente);
        }
        
        public string actualizarContrasenaCliente(int id, string contrasenaAnterior, string contrasenaNueva) {
            return base.Channel.actualizarContrasenaCliente(id, contrasenaAnterior, contrasenaNueva);
        }
        
        public System.Threading.Tasks.Task<string> actualizarContrasenaClienteAsync(int id, string contrasenaAnterior, string contrasenaNueva) {
            return base.Channel.actualizarContrasenaClienteAsync(id, contrasenaAnterior, contrasenaNueva);
        }
        
        public string habilitarCliente(int id) {
            return base.Channel.habilitarCliente(id);
        }
        
        public System.Threading.Tasks.Task<string> habilitarClienteAsync(int id) {
            return base.Channel.habilitarClienteAsync(id);
        }
        
        public string deshabilitarCliente(int id) {
            return base.Channel.deshabilitarCliente(id);
        }
        
        public System.Threading.Tasks.Task<string> deshabilitarClienteAsync(int id) {
            return base.Channel.deshabilitarClienteAsync(id);
        }
        
        public ConsolaPruebasWCF.ServicioProyectFinal.DtoCliente ingresarCliente(string nombreUsuario, string pass) {
            return base.Channel.ingresarCliente(nombreUsuario, pass);
        }
        
        public System.Threading.Tasks.Task<ConsolaPruebasWCF.ServicioProyectFinal.DtoCliente> ingresarClienteAsync(string nombreUsuario, string pass) {
            return base.Channel.ingresarClienteAsync(nombreUsuario, pass);
        }
        
        public void altaAdministrador(string nombre, string apellido, string contrasena, string nombreUsuario, string correoElectronico, string telefono, bool habilitado) {
            base.Channel.altaAdministrador(nombre, apellido, contrasena, nombreUsuario, correoElectronico, telefono, habilitado);
        }
        
        public System.Threading.Tasks.Task altaAdministradorAsync(string nombre, string apellido, string contrasena, string nombreUsuario, string correoElectronico, string telefono, bool habilitado) {
            return base.Channel.altaAdministradorAsync(nombre, apellido, contrasena, nombreUsuario, correoElectronico, telefono, habilitado);
        }
        
        public void actualizarAdministrador(string nombre, string apellido, string telefono) {
            base.Channel.actualizarAdministrador(nombre, apellido, telefono);
        }
        
        public System.Threading.Tasks.Task actualizarAdministradorAsync(string nombre, string apellido, string telefono) {
            return base.Channel.actualizarAdministradorAsync(nombre, apellido, telefono);
        }
        
        public void actualizarContrasenaAdministrador(int id, string contrasenaAnterior, string contrasenaNueva) {
            base.Channel.actualizarContrasenaAdministrador(id, contrasenaAnterior, contrasenaNueva);
        }
        
        public System.Threading.Tasks.Task actualizarContrasenaAdministradorAsync(int id, string contrasenaAnterior, string contrasenaNueva) {
            return base.Channel.actualizarContrasenaAdministradorAsync(id, contrasenaAnterior, contrasenaNueva);
        }
        
        public ConsolaPruebasWCF.ServicioProyectFinal.DtoAdministrador[] getAdministradores() {
            return base.Channel.getAdministradores();
        }
        
        public System.Threading.Tasks.Task<ConsolaPruebasWCF.ServicioProyectFinal.DtoAdministrador[]> getAdministradoresAsync() {
            return base.Channel.getAdministradoresAsync();
        }
        
        public void habilitarAdminitrador(int id) {
            base.Channel.habilitarAdminitrador(id);
        }
        
        public System.Threading.Tasks.Task habilitarAdminitradorAsync(int id) {
            return base.Channel.habilitarAdminitradorAsync(id);
        }
        
        public void deshabilitarAdministrador(int id) {
            base.Channel.deshabilitarAdministrador(id);
        }
        
        public System.Threading.Tasks.Task deshabilitarAdministradorAsync(int id) {
            return base.Channel.deshabilitarAdministradorAsync(id);
        }
        
        public ConsolaPruebasWCF.ServicioProyectFinal.DtoAdministrador ingresarAdministrador(string nombreUsuario, string pass) {
            return base.Channel.ingresarAdministrador(nombreUsuario, pass);
        }
        
        public System.Threading.Tasks.Task<ConsolaPruebasWCF.ServicioProyectFinal.DtoAdministrador> ingresarAdministradorAsync(string nombreUsuario, string pass) {
            return base.Channel.ingresarAdministradorAsync(nombreUsuario, pass);
        }
    }
}
