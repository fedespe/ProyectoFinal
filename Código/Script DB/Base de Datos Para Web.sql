USE SPODS;
GO

DROP TABLE dbo.PRESUPUESTA;
DROP TABLE dbo.PROVEE;
DROP TABLE dbo.DENUNCIA;
DROP TABLE dbo.PUBLICACIONRESPUESTA;
DROP TABLE dbo.SERVICIOPREGUNTA;
DROP TABLE dbo.PREGUNTA;
DROP TABLE dbo.CATEGORIAPREGUNTA;
DROP TABLE dbo.PUBLICACION_IMAGEN;
DROP TABLE dbo.PUBLICACION;
DROP TABLE dbo.SERVICIO;
DROP TABLE dbo.SUPERADMINISTRADOR;
DROP TABLE dbo.ADMINISTRADOR;
DROP TABLE dbo.CLIENTE;
DROP TABLE dbo.USUARIO;
DROP TABLE dbo.BARRIO;
DROP TABLE dbo.DEPARTAMENTO;

CREATE TABLE dbo.DEPARTAMENTO
(
	Id	INT  NOT NULL IDENTITY(1,1),
	Nombre NVARCHAR(50) NOT NULL

	CONSTRAINT PK_DEPARTAMENTO PRIMARY KEY(Id),
	CONSTRAINT UK_Nombre_DEPARTAMENTO UNIQUE(Nombre)
);
GO

CREATE TABLE dbo.BARRIO
(
	Id	INT  NOT NULL IDENTITY(1,1),
	Nombre NVARCHAR(50) NOT NULL,
	DepartamentoId INT NOT NULL,

	CONSTRAINT PK_BARRIO PRIMARY KEY(Id),
	CONSTRAINT UK_Nombre_DepartamentoId_BARRIO UNIQUE(Nombre, DepartamentoId),
	CONSTRAINT FK_DepartamentoId_BARRIO FOREIGN KEY (DepartamentoId) REFERENCES DEPARTAMENTO (Id)
);
GO

CREATE TABLE dbo.USUARIO
(
	Id	INT  NOT NULL IDENTITY(1,1),	
	Nombre NVARCHAR(30) NOT NULL,
	Apellido NVARCHAR(30) NOT NULL,
	NombreUsuario NVARCHAR(50) NOT NULL,
	Contrasenia NVARCHAR(MAX) NOT NULL,
	UltimaModificacionContrasenia DATETIME NOT NULL,
	Habilitado BIT NOT NULL,
	Email NVARCHAR(50) NOT NULL,
	Telefono NVARCHAR(20) NOT NULL,
	Direccion NVARCHAR (100) NOT NULL,
	FechaAlta DATETIME NOT NULL,
	Tipo NVARCHAR(20) NOT NULL,
	BarrioId INT NOT NULL,

	CONSTRAINT PK_USUARIO PRIMARY KEY(Id),
	CONSTRAINT UK_NombreUsuario_USUARIO UNIQUE(NombreUsuario),
	CONSTRAINT UK_Email_USUARIO UNIQUE(Email),
	CONSTRAINT FK_BarrioId_USUARIO FOREIGN KEY (BarrioId) REFERENCES BARRIO (Id),
	CONSTRAINT CK_COL_FechaAlta_MenorIgual_Hoy_TAB_USUARIO CHECK (FechaAlta <= GetDate()),
	CONSTRAINT CK_COL_Tipo_InValores_TAB_USUARIO CHECK (Tipo in('CLIENTE', 'ADMINISTRADOR', 'SUPERADMINISTRADOR'))
);
GO

CREATE TABLE dbo.CLIENTE
(
	UsuarioId INT  NOT NULL,	

	CONSTRAINT PK_CLIENTE PRIMARY KEY(UsuarioId),
	CONSTRAINT FK_UsuarioId_CLIENTE FOREIGN KEY (UsuarioId) REFERENCES USUARIO (Id)
);
GO

CREATE TABLE dbo.ADMINISTRADOR
(
	UsuarioId INT  NOT NULL,

	CONSTRAINT PK_ADMINISTRADOR PRIMARY KEY(UsuarioId),
	CONSTRAINT FK_UsuarioId_ADMINISTRADOR FOREIGN KEY (UsuarioId) REFERENCES USUARIO (Id)
);
GO

CREATE TABLE dbo.SUPERADMINISTRADOR
(
	UsuarioId INT  NOT NULL,

	CONSTRAINT PK_SUPERADMINISTRADOR PRIMARY KEY(UsuarioId),
	CONSTRAINT FK_UsuarioId_SUPERADMINISTRADOR FOREIGN KEY (UsuarioId) REFERENCES USUARIO (Id)
);
GO

--******************
--NUEVO REVISAR
--******************
CREATE TABLE dbo.SERVICIO
(
	Id	INT  NOT NULL IDENTITY(1,1),
	Nombre NVARCHAR(30) NOT NULL,
	Imagen NVARCHAR(300) NOT NULL,
	Habilitado BIT NOT NULL,
	FechaCreacion DATETIME NOT NULL,

	CONSTRAINT PK_SERVICIO PRIMARY KEY(Id),
	CONSTRAINT UK_Nombre_SERVICIO UNIQUE(Nombre),
	CONSTRAINT UK_Imagen_SERVICIO UNIQUE(Imagen),
	CONSTRAINT CK_COL_FechaCreacion_MenorIgual_Hoy_TAB_SERVICIO CHECK (FechaCreacion <= GetDate()),
);
GO

CREATE TABLE dbo.PUBLICACION
(
	Id	INT  NOT NULL IDENTITY(1,1),
	Titulo NVARCHAR(50) NOT NULL,
	Descripcion NVARCHAR(150) NOT NULL,
	Activa BIT NOT NULL,
	FechaAlta DATETIME NOT NULL,
	FechaVencimiento DATETIME,
	Tipo NVARCHAR(20) NOT NULL,
	ServicioId INT NOT NULL,
	ClienteId INT NOT NULL,

	CONSTRAINT PK_PUBLICACION PRIMARY KEY(Id),
	CONSTRAINT FK_ServicioId_PUBLICACION FOREIGN KEY (ServicioId) REFERENCES SERVICIO (Id),
	CONSTRAINT FK_ClienteId_PUBLICACION FOREIGN KEY (ClienteId) REFERENCES CLIENTE (UsuarioId),
	CONSTRAINT CK_COL_FechaAlta_MenorIgual_Hoy_TAB_PUBLICACION CHECK (FechaAlta <= GetDate()),
	CONSTRAINT CK_COL_FechaVencimiento_Mayor_FechaAlta_TAB_PUBLICACION CHECK (FechaVencimiento > FechaAlta),
	CONSTRAINT CK_COL_Tipo_InValores_TAB_PUBLICACION CHECK (Tipo in('OFERTA', 'SOLICITUD'))
);
GO

CREATE TABLE dbo.PUBLICACION_IMAGEN
(
	PublicacionId INT NOT NULL,
	Imagen NVARCHAR(300) NOT NULL,

	CONSTRAINT PK_PUBLICACION_IMAGEN PRIMARY KEY(PublicacionId, Imagen),
	CONSTRAINT FK_PublicacionId_PUBLICACION_IMAGEN FOREIGN KEY (PublicacionId) REFERENCES PUBLICACION (Id)
);
GO

CREATE TABLE dbo.CATEGORIAPREGUNTA
(
	Id INT NOT NULL IDENTITY(1,1),
	Categoria NVARCHAR(100) NOT NULL,

	CONSTRAINT PK_CATEGORIAPREGUNTA PRIMARY KEY(Id),
);
GO

CREATE TABLE dbo.PREGUNTA
(
	Id INT NOT NULL IDENTITY(1,1),
	Pregunta NVARCHAR(300) NOT NULL,
	CategoriaId INT NOT NULL,

	CONSTRAINT PK_PREGUNTA PRIMARY KEY(Id),
	CONSTRAINT FK_CategoriaId_CATEGORIAPREGUNTA FOREIGN KEY (CategoriaId) REFERENCES CATEGORIAPREGUNTA (Id),
);
GO

CREATE TABLE dbo.SERVICIOPREGUNTA
(
	Id INT NOT NULL IDENTITY(1,1),
	ServicioId INT NOT NULL,
	PreguntaId INT NOT NULL,

	CONSTRAINT PK_SERVICIOPREGUNTA PRIMARY KEY(Id),
	CONSTRAINT FK_ServicioId_SERVICIO FOREIGN KEY (ServicioId) REFERENCES SERVICIO (Id),
	CONSTRAINT FK_PreguntaId_PREGUNTA FOREIGN KEY (PreguntaId) REFERENCES PREGUNTA (Id),
	--VER QUE EL PAR SERVICIOID Y PREGUNTAID PODRIAN SER UNIC
);
GO

CREATE TABLE dbo.PUBLICACIONRESPUESTA
(
	PublicacionId INT NOT NULL,
	ServicioPreguntaId INT NOT NULL,
	Respuesta NVARCHAR(300) NOT NULL,

	CONSTRAINT PK_PUBLICACION_RESPUESTA PRIMARY KEY(PublicacionId, ServicioPreguntaId),
	CONSTRAINT FK_PublicacionId_PUBLICACION FOREIGN KEY (PublicacionId) REFERENCES PUBLICACION (Id),
	CONSTRAINT FK_ServicioPreguntaId_SERVICIOPREGUNTA FOREIGN KEY (ServicioPreguntaId) REFERENCES SERVICIOPREGUNTA (Id)	
);
GO

--******************
--FIN NUEVO REVISAR
--******************



CREATE TABLE dbo.DENUNCIA
(
	Id	INT  NOT NULL IDENTITY(1,1),
	FechaRealizacion DATETIME NOT NULL,
	FechaResolucion DATETIME,--Hacer mediante Trigger la restricci�n de que si FechaResolucion o Resolucion no son NULL, el otro tampoco puede serlo. Tambi�n hacer que no puede tener resolucion o fecharesolucion si AdministradorId es NULL
	Resolucion NVARCHAR(200),
	AdministradorId INT,
	ClienteId INT NOT NULL,
	ClienteDenunciadoId INT, --Hacer mediante Trigger la restricci�n de que si uno es NULL, el otro no puede serlo y que si uno tiene dato, el otro debe der NULL.
	PublicacionDenuinciadaId INT,

	CONSTRAINT PK_DENUNCIA PRIMARY KEY(Id),
	CONSTRAINT FK_AdministradorId_DENUNCIA FOREIGN KEY (AdministradorId) REFERENCES ADMINISTRADOR (UsuarioId),
	CONSTRAINT FK_ClienteId_DENUNCIA FOREIGN KEY (ClienteId) REFERENCES CLIENTE (UsuarioId),
	CONSTRAINT FK_ClienteDenunciadoId_DENUNCIA FOREIGN KEY (ClienteDenunciadoId) REFERENCES CLIENTE (UsuarioId),
	CONSTRAINT FK_PublicacionDenuinciadaId_DENUNCIA FOREIGN KEY (PublicacionDenuinciadaId) REFERENCES PUBLICACION (Id),
	CONSTRAINT CK_COL_FechaRealizacion_MenorIgual_Hoy_TAB_DENUNCIA CHECK (FechaRealizacion <= GetDate()), --Ver: Ojo con la hora!!!
	CONSTRAINT CK_COL_FechaResolucion_Mayor_FechaRealizacion_TAB_DENUNCIA CHECK (FechaResolucion > FechaRealizacion) --Ver: Ojo con el tema de los NULL!!!
);
GO

CREATE TABLE dbo.PROVEE
(
	ClienteId INT NOT NULL,
	ServicioId INT NOT NULL,
	Habilitado BIT NOT NULL,

	CONSTRAINT PK_PROVEE PRIMARY KEY(ClienteId, ServicioId),
	CONSTRAINT FK_ClienteId_PROVEE FOREIGN KEY (ClienteId) REFERENCES CLIENTE (UsuarioId),
	CONSTRAINT FK_ServicioId_PROVEE FOREIGN KEY (ServicioId) REFERENCES SERVICIO (Id)
);
GO

CREATE TABLE dbo.PRESUPUESTA
(
	ClienteId INT NOT NULL,
	--SolicitudId INT NOT NULL,
	Comentario NVARCHAR(150) NOT NULL,
	Horario NVARCHAR(20) NOT NULL, --Ver si lo dejamos ac� y como este tipo de dato
	Precio MONEY NOT NULL,
	Aceptado BIT NOT NULL,
	Descartado BIT NOT NULL,
	Destacado BIT NOT NULL,

	--CONSTRAINT PK_PRESUPUESTA PRIMARY KEY(ClienteId, SolicitudId), --Ver, porque de repente lo dejamos presupuestar m�s de una vez y en ese caso lo deber�amos cambiar...
	CONSTRAINT FK_ClienteId_PRESUPUESTA FOREIGN KEY (ClienteId) REFERENCES CLIENTE (UsuarioId),
	--CONSTRAINT FK_SolicitudId_PRESUPUESTA FOREIGN KEY (SolicitudId) REFERENCES SOLICITUD (PublicacionId)
);
GO

INSERT INTO dbo.DEPARTAMENTO VALUES
('ARTIGAS'),
('CANELONES'),
('CERRO LARGO'),
('COLONIA'),
('DURAZNO'),
('FLORES'),
('FLORIDA'),
('LAVALLEJA'),
('MALDONADO'),
('MONTEVIDEO'),
('PAYSANDU'),
('RIO NEGRO'),
('RIVERA'),
('ROCHA'),
('SALTO'),
('SAN JOSE'),
('SORIANO'),
('TACUAREMBO'),
('REINTA Y TRES');

INSERT INTO dbo.BARRIO VALUES
('Aguada',10),
('Aires Puros',10),
('Atahualpa',10),
('Ba�ados de Carrasco',10),
('Barrio Sur',10),
('Belvedere',10),
('Brazo Oriental',10),
('Buceo',10),
('Capurro',10),
('Carrasco',10),
('Carrasco Norte',10),
('Casab�',10),
('Casavalle',10),
('Centro',10),
('Cerrito de la Victoria',10),
('Ciudad Vieja',10),
('Col�n',10),
('Conciliaci�n',10),
('Cord�n',10),
('Flor de Maro�as',10),
('Goes',10),
('Ituzaing�',10),
('Jacinto Vera',10),
('Jardines del Hip�dromo',10),
('La Blanqueada',10),
('La Comercial',10),
('La Figurita',10),
('La Paloma',10),
('La Teja',10),
('Larra�aga',10),
('Las Acacias',10),
('Las Canteras',10),
('Lezica',10),
('Malv�n',10),
('Malv�n Norte',10),
('Manga',10),
('Maro�as',10),
('Mercado Modelo',10),
('Nuevo Par�s',10),
('Palermo',10),
('Parque Batlle',10),
('Parque Rod�',10),
('Paso de la Arena',10),
('Paso de las Duranas',10),
('Pe�arol',10),
('Piedras Blancas',10),
('Pocitos',10),
('Prado',10),
('Punta Carretas',10),
('Punta de Rieles',10),
('Punta Gorda',10),
('Reducto',10),
('Sayago',10),
('Tres Cruces',10),
('Tres Omb�es',10),
('Uni�n',10),
('Villa del Cerro',10),
('Villa Espa�ola',10),
('Villa Garc�a',10),
('Otro',10);

--contrasena 123456789
INSERT INTO dbo.Usuario VALUES('SupAdmin', 'SupAdmin', 'SupAdmin','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'SupAdmin@hotmail.com', '099845498', 'SupAdmin dir', getdate(), 'SUPERADMINISTRADOR', 1);
INSERT INTO dbo.SUPERADMINISTRADOR VALUES(1);

--contrasena 123456789
INSERT INTO dbo.Usuario VALUES('Admin', 'Admin', 'Admin','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'Admin@hotmail.com', '099845498', 'Admin dir', getdate(), 'ADMINISTRADOR', 1);
INSERT INTO dbo.ADMINISTRADOR VALUES(2);

--contrasena 123456789
INSERT INTO dbo.Usuario VALUES('Cliente1', 'Cliente1', 'Cliente1','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'Cliente1@hotmail.com', '099845498', 'Cliente1 dir', getdate(), 'CLIENTE', 1);
INSERT INTO dbo.CLIENTE VALUES(3);

--contrasena 123456789
INSERT INTO dbo.Usuario VALUES('Cliente2', 'Cliente2', 'Cliente2','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'Cliente2@hotmail.com', '099845498', 'Cliente2 dir', getdate(), 'CLIENTE', 1);
INSERT INTO dbo.CLIENTE VALUES(4);

INSERT INTO dbo.CATEGORIAPREGUNTA VALUES
('Categor�a 1'),
('Categor�a 2'),
('Categor�a 3');

INSERT INTO dbo.PREGUNTA VALUES
('Pregunta 1',1),
('Pregunta 2',1),
('Pregunta 3',2),
('Pregunta 4',1),
('Pregunta 5',3),
('Pregunta 6',2),
('Pregunta 7',1);

INSERT INTO dbo.SERVICIO VALUES
('Servicio 1','ImgServicio1.jpg',1,getDate()),
('Servicio 2','ImgServicio2.jpg',1,getDate()),
('Servicio 3','ImgServicio3.jpg',1,getDate()),
('Servicio 4','ImgServicio4.jpg',1,getDate());

INSERT INTO dbo.SERVICIOPREGUNTA VALUES
(1,1),
(1,2),
(1,3),
(2,1),
(3,4),
(3,5),
(4,6);

