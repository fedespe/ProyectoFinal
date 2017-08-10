USE SPODS;
GO

DROP TABLE dbo.PRESUPUESTO;
DROP TABLE dbo.PROVEE;
DROP TABLE dbo.DENUNCIA;
DROP TABLE dbo.CONTACTO;
DROP TABLE dbo.COMENTARIOPUNTUACION;
DROP TABLE dbo.PUBLICACIONRESPUESTA;
DROP TABLE dbo.SERVICIOPREGUNTA;
DROP TABLE dbo.PREGUNTA;
DROP TABLE dbo.CATEGORIAPREGUNTA;
DROP TABLE dbo.PUBLICACIONIMAGEN;
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
	CONSTRAINT FK_DepartamentoId_BARRIO FOREIGN KEY (DepartamentoId) REFERENCES dbo.DEPARTAMENTO (Id)
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
	--Documento NVARCHAR(20) NOT NULL,
	Telefono NVARCHAR(20) NOT NULL,
	Direccion NVARCHAR (100) NOT NULL,
	FechaAlta DATETIME NOT NULL,
	Tipo NVARCHAR(20) NOT NULL,
	BarrioId INT NOT NULL,
	Imagen NVARCHAR(300) NOT NULL,

	CONSTRAINT PK_USUARIO PRIMARY KEY(Id),
	CONSTRAINT UK_NombreUsuario_USUARIO UNIQUE(NombreUsuario),
	CONSTRAINT UK_Email_USUARIO UNIQUE(Email),
	CONSTRAINT FK_BarrioId_USUARIO FOREIGN KEY (BarrioId) REFERENCES dbo.BARRIO (Id),
	CONSTRAINT CK_COL_FechaAlta_MenorIgual_Hoy_TAB_USUARIO CHECK (FechaAlta <= GetDate()),  --Ver: Ojo con la hora!!! SOLUCIONADO LA HORA
	CONSTRAINT CK_COL_Tipo_InValores_TAB_USUARIO CHECK (Tipo in('CLIENTE', 'ADMINISTRADOR', 'SUPERADMINISTRADOR'))
);
GO

CREATE TABLE dbo.CLIENTE
(
	UsuarioId INT  NOT NULL,	

	CONSTRAINT PK_CLIENTE PRIMARY KEY(UsuarioId),
	CONSTRAINT FK_UsuarioId_CLIENTE FOREIGN KEY (UsuarioId) REFERENCES dbo.USUARIO (Id)
);
GO

CREATE TABLE dbo.ADMINISTRADOR
(
	UsuarioId INT  NOT NULL,

	CONSTRAINT PK_ADMINISTRADOR PRIMARY KEY(UsuarioId),
	CONSTRAINT FK_UsuarioId_ADMINISTRADOR FOREIGN KEY (UsuarioId) REFERENCES dbo.USUARIO (Id)
);
GO

CREATE TABLE dbo.SUPERADMINISTRADOR
(
	UsuarioId INT  NOT NULL,

	CONSTRAINT PK_SUPERADMINISTRADOR PRIMARY KEY(UsuarioId),
	CONSTRAINT FK_UsuarioId_SUPERADMINISTRADOR FOREIGN KEY (UsuarioId) REFERENCES dbo.USUARIO (Id)
);
GO

CREATE TABLE dbo.SERVICIO
(
	Id	INT  NOT NULL IDENTITY(1,1),
	Nombre NVARCHAR(30) NOT NULL,
	Imagen NVARCHAR(300) NOT NULL,
	Habilitado BIT NOT NULL,
	FechaCreacion DATETIME NOT NULL,

	CONSTRAINT PK_SERVICIO PRIMARY KEY(Id),
	CONSTRAINT UK_Nombre_SERVICIO UNIQUE(Nombre),
	--CONSTRAINT UK_Imagen_SERVICIO UNIQUE(Imagen),
	CONSTRAINT CK_COL_FechaCreacion_MenorIgual_Hoy_TAB_SERVICIO CHECK (FechaCreacion <= GetDate()),  --Ver: Ojo con la hora!!!
);
GO

CREATE TABLE dbo.PUBLICACION
(
	Id	INT  NOT NULL IDENTITY(1,1),
	Titulo NVARCHAR(50) NOT NULL,
	Descripcion NVARCHAR(300) NOT NULL,
	Activa BIT NOT NULL,
	FechaAlta DATETIME NOT NULL,
	FechaVencimiento DATETIME,
	Tipo NVARCHAR(20) NOT NULL,
	ServicioId INT NOT NULL,
	ClienteId INT NOT NULL,
	Finalizada BIT NOT NULL,
	Habilitada BIT NOT NULL,

	CONSTRAINT PK_PUBLICACION PRIMARY KEY(Id),
	CONSTRAINT FK_ServicioId_PUBLICACION FOREIGN KEY (ServicioId) REFERENCES dbo.SERVICIO (Id),
	CONSTRAINT FK_ClienteId_PUBLICACION FOREIGN KEY (ClienteId) REFERENCES dbo.CLIENTE (UsuarioId),
	CONSTRAINT CK_COL_FechaAlta_MenorIgual_Hoy_TAB_PUBLICACION CHECK (FechaAlta <= GetDate()), --Ver: Ojo con la hora!!!
	CONSTRAINT CK_COL_FechaVencimiento_Mayor_FechaAlta_TAB_PUBLICACION CHECK (FechaVencimiento > FechaAlta),
	CONSTRAINT CK_COL_Tipo_InValores_TAB_PUBLICACION CHECK (Tipo in('OFERTA', 'SOLICITUD'))
);
GO

CREATE TABLE dbo.PUBLICACIONIMAGEN
(
	PublicacionId INT NOT NULL,
	Imagen NVARCHAR(300) NOT NULL,

	CONSTRAINT PK_PUBLICACIONIMAGEN PRIMARY KEY(PublicacionId, Imagen),
	CONSTRAINT FK_PublicacionId_PUBLICACIONIMAGEN FOREIGN KEY (PublicacionId) REFERENCES dbo.PUBLICACION (Id)
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
	CONSTRAINT FK_CategoriaId_PREGUNTA FOREIGN KEY (CategoriaId) REFERENCES dbo.CATEGORIAPREGUNTA (Id),
);
GO

CREATE TABLE dbo.SERVICIOPREGUNTA
(
	Id INT NOT NULL IDENTITY(1,1),
	ServicioId INT NOT NULL,
	PreguntaId INT NOT NULL,

	CONSTRAINT PK_SERVICIOPREGUNTA PRIMARY KEY(Id),
	CONSTRAINT FK_ServicioId_SERVICIOPREGUNTA FOREIGN KEY (ServicioId) REFERENCES dbo.SERVICIO (Id),
	CONSTRAINT FK_PreguntaId_SERVICIOPREGUNTA FOREIGN KEY (PreguntaId) REFERENCES dbo.PREGUNTA (Id),
	--VER QUE EL PAR SERVICIOID Y PREGUNTAID PODRIAN SER UNIC
);
GO

CREATE TABLE dbo.PUBLICACIONRESPUESTA
(
	PublicacionId INT NOT NULL,
	ServicioId INT NOT NULL,
	PreguntaId INT NOT NULL,
	Respuesta NVARCHAR(300) NOT NULL,

	CONSTRAINT PK_PUBLICACION_RESPUESTA PRIMARY KEY(PublicacionId, ServicioId, PreguntaId),
	CONSTRAINT FK_PublicacionId_PUBLICACIONRESPUESTA FOREIGN KEY (PublicacionId) REFERENCES dbo.PUBLICACION (Id),
	CONSTRAINT FK_ServicioId_PUBLICACIONRESPUESTA FOREIGN KEY (ServicioId) REFERENCES dbo.SERVICIO (Id),
	CONSTRAINT FK_PreguntaId_PUBLICACIONRESPUESTA FOREIGN KEY (PreguntaId) REFERENCES dbo.PREGUNTA (Id)		
);
GO

CREATE TABLE dbo.COMENTARIOPUNTUACION
(
	Id INT NOT NULL IDENTITY(1,1),
	Comentario NVARCHAR(300) NOT NULL,
	Fecha DATETIME NOT NULL,
	Respuesta NVARCHAR(300),
	Puntuacion INT NOT NULL,
	PublicacionId INT NOT NULL,
	ClienteId INT NOT NULL

	CONSTRAINT PK_COMENTARIOPUNTUACION PRIMARY KEY(Id),
	CONSTRAINT FK_PublicacionId_COMENTARIOPUNTUACION FOREIGN KEY (PublicacionId) REFERENCES dbo.PUBLICACION (Id),
	CONSTRAINT FK_ClienteId_COMENTARIOPUNTUACION FOREIGN KEY (ClienteId) REFERENCES dbo.CLIENTE (UsuarioId)
);
GO

CREATE TABLE dbo.CONTACTO
(
	Id INT NOT NULL IDENTITY(1,1),
	PublicacionId INT NOT NULL,
	ClienteId INT NOT NULL,
	ComentarioPuntuacionId INT,
	Fecha DATETIME NOT NULL
	
	CONSTRAINT PK_CONTACTO PRIMARY KEY(Id),
	CONSTRAINT FK_PublicacionId_CONTACTO FOREIGN KEY (PublicacionId) REFERENCES dbo.PUBLICACION (Id),
	CONSTRAINT FK_ClienteId_CONTACTO FOREIGN KEY (ClienteId) REFERENCES dbo.CLIENTE (UsuarioId),
	CONSTRAINT FK_ComentarioPuntuacionId_CONTACTO FOREIGN KEY (ComentarioPuntuacionId) REFERENCES dbo.COMENTARIOPUNTUACION (Id)
);
GO

CREATE TABLE dbo.DENUNCIA
(
	Id	INT  NOT NULL IDENTITY(1,1),
	FechaRealizacion DATETIME NOT NULL,
	FechaResolucion DATETIME,--Hacer mediante Trigger la restricción de que si FechaResolucion o Resolucion no son NULL, el otro tampoco puede serlo. También hacer que no puede tener resolucion o fecharesolucion si AdministradorId es NULL
	Resolucion NVARCHAR(200),
	AdministradorId INT,
	ClienteId INT NOT NULL,
	ClienteDenunciadoId INT, --Hacer mediante Trigger la restricción de que si uno es NULL, el otro no puede serlo y que si uno tiene dato, el otro debe der NULL.
	PublicacionDenuinciadaId INT,

	CONSTRAINT PK_DENUNCIA PRIMARY KEY(Id),
	CONSTRAINT FK_AdministradorId_DENUNCIA FOREIGN KEY (AdministradorId) REFERENCES dbo.ADMINISTRADOR (UsuarioId),
	CONSTRAINT FK_ClienteId_DENUNCIA FOREIGN KEY (ClienteId) REFERENCES dbo.CLIENTE (UsuarioId),
	CONSTRAINT FK_ClienteDenunciadoId_DENUNCIA FOREIGN KEY (ClienteDenunciadoId) REFERENCES dbo.CLIENTE (UsuarioId),
	CONSTRAINT FK_PublicacionDenuinciadaId_DENUNCIA FOREIGN KEY (PublicacionDenuinciadaId) REFERENCES dbo.PUBLICACION (Id),
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
	CONSTRAINT FK_ClienteId_PROVEE FOREIGN KEY (ClienteId) REFERENCES dbo.CLIENTE (UsuarioId),
	CONSTRAINT FK_ServicioId_PROVEE FOREIGN KEY (ServicioId) REFERENCES dbo.SERVICIO (Id)
);
GO

CREATE TABLE dbo.PRESUPUESTO
(
	Id	INT  NOT NULL IDENTITY(1,1),
	ClienteId INT NOT NULL,
	PublicacionId INT NOT NULL,
	Comentario NVARCHAR(500) NOT NULL,
	Aceptado BIT NOT NULL,
	Fecha DATETIME NOT NULL,

	CONSTRAINT PK_PRESUPUESTO PRIMARY KEY(Id), 
	CONSTRAINT FK_ClienteId_PRESUPUESTO FOREIGN KEY (ClienteId) REFERENCES dbo.CLIENTE (UsuarioId),
	CONSTRAINT FK_PublicacionId_PRESUPUESTO FOREIGN KEY (PublicacionId) REFERENCES dbo.PUBLICACION (Id),
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
('Bañados de Carrasco',10),
('Barrio Sur',10),
('Belvedere',10),
('Brazo Oriental',10),
('Buceo',10),
('Capurro',10),
('Carrasco',10),
('Carrasco Norte',10),
('Casabó',10),
('Casavalle',10),
('Centro',10),
('Cerrito de la Victoria',10),
('Ciudad Vieja',10),
('Colón',10),
('Conciliación',10),
('Cordón',10),
('Flor de Maroñas',10),
('Goes',10),
('Ituzaingó',10),
('Jacinto Vera',10),
('Jardines del Hipódromo',10),
('La Blanqueada',10),
('La Comercial',10),
('La Figurita',10),
('La Paloma',10),
('La Teja',10),
('Larrañaga',10),
('Las Acacias',10),
('Las Canteras',10),
('Lezica',10),
('Malvín',10),
('Malvín Norte',10),
('Manga',10),
('Maroñas',10),
('Mercado Modelo',10),
('Nuevo París',10),
('Palermo',10),
('Parque Batlle',10),
('Parque Rodó',10),
('Paso de la Arena',10),
('Paso de las Duranas',10),
('Peñarol',10),
('Piedras Blancas',10),
('Pocitos',10),
('Prado',10),
('Punta Carretas',10),
('Punta de Rieles',10),
('Punta Gorda',10),
('Reducto',10),
('Sayago',10),
('Tres Cruces',10),
('Tres Ombúes',10),
('Unión',10),
('Villa del Cerro',10),
('Villa Española',10),
('Villa García',10),
('Otro',10);

--contrasena 123456789
INSERT INTO dbo.USUARIO VALUES
/*1 - SupAdmin*/('TutorSupAdmin', 'TutorSupAdmin', 'TutorSupAdmin','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'TutorSupAdmin@mailinator.com', '099999999', 'TutorSupAdmin dir', getdate(), 'SUPERADMINISTRADOR', 1,'TUTORSUPADMIN.jpg'),
/*2 - SupAdmin*/('SupAdmin', 'SupAdmin', 'SupAdmin','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'SupAdmin@hotmail.com', '099845498', 'SupAdmin dir', getdate(), 'SUPERADMINISTRADOR', 1,'SUPADMIN.jpg'),
/*3 - Admin*/('TutorAdmin', 'TutorAdmin', 'TutorAdmin','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'TutorAdmin@mailinator.com', '099999999', 'TutorAdmin dir', getdate(), 'ADMINISTRADOR', 1, 'TUTORADMIN.jpg'),
/*4 - Admin*/('Admin', 'Admin', 'Admin','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'Admin@hotmail.com', '099845498', 'Admin dir', getdate(), 'ADMINISTRADOR', 1, 'ADMIN.jpg'),
/*5 - Cliente*/('TutorCliente', 'TutorCliente', 'TutorCliente','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'TutorCliente@mailinator.com', '099999999', 'TutorCliente dir', getdate(), 'CLIENTE', 1,'TUTORCLIENTE.jpg'),
/*6 - Cliente*/('Cliente1', 'Cliente1', 'Cliente1','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'Cliente1@hotmail.com', '099845498', 'Cliente1 dir', getdate(), 'CLIENTE', 1,'CLIENTE1.jpg'),
/*7 - Cliente*/('Cliente2', 'Cliente2', 'Cliente2','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'Cliente2@hotmail.com', '099845498', 'Cliente2 dir', getdate(), 'CLIENTE', 1, 'CLIENTE2.jpg');

INSERT INTO dbo.SUPERADMINISTRADOR VALUES
(1),
(2);

INSERT INTO dbo.ADMINISTRADOR VALUES
(3),
(4);

INSERT INTO dbo.CLIENTE Values
(5),
(6),
(7);

INSERT INTO dbo.CATEGORIAPREGUNTA VALUES
('Generales'),
('Lavados'),
('Cuidados'),
('Profesorado'),
('Otros');

INSERT INTO dbo.PREGUNTA VALUES
/*1*/('Precio por hora',1),
/*2*/('Precio por canasto',2),
/*3*/('Precio por hora por niño',3),
/*4*/('Máxima cantidad de niños',3),
/*5*/('Disponibilidad Horaria',1),
/*6*/('Materias que dicta',4),
/*7*/('Materias disponibles',4),
/*8*/('Colores disponibles',5),
/*9*/('Precio por kilo',2);

INSERT INTO dbo.SERVICIO VALUES
/*1*/('Cuidado de Niños','CUIDADODENIÑOS.jpg',1,getDate()),
/*2*/('Lavado de Ropa','LAVADODEROPA.jpg',1,getDate()),
/*3*/('Profesor Particular','PROFESORPARTICULAR.jpg',1,getDate()),
/*4*/('Impresiones 3D','IMPRESIONES3D.jpg',1,getDate());

INSERT INTO dbo.SERVICIOPREGUNTA VALUES
(1,3), --Cuidado de Niños - Precio por hora por niño
(1,4), --Cuidado de Niños - Máxima cantidad de niños
(1,5), --Cuidado de Niños - Disponibilidad Horaria

(2,2), --Lavado de Ropa - Precio por canasto
(2,5), --Lavado de Ropa - Disponibilidad Horaria

(3,1), --Profesor Particular - Precio por hora
(3,5), --Profesor Particular - Disponibilidad Horaria
(3,6), --Profesor Particular - Materias que dicta

(4,5), --Impresiones 3D - Disponibilidad Horaria
(4,7), --Impresiones 3D - Materias disponibles
(4,8), --Impresiones 3D - Colores disponibles
(4,9); --Impresiones 3D - Precio por kilo

INSERT INTO dbo.PUBLICACION VALUES
('Se cuidan niños','Se cuidan niños de hasta 12 años.',1,getDate(),null,'OFERTA',1,6,0,1),
('Lavandería Otelo','Lavamos su ropa. También trabajamos con empresas!!!',1,getDate(),null,'OFERTA',2,7,0,1),
('Prof. Particular - Varias Materias','Se dictan clases de Matemáticas, Física, Química y Dibujo.',1,getDate(),null,'OFERTA',3,6,0,1),
('Impresiones 3D','Vení a imprimir tu modelo 3D!!! Si tenes las idea y no sabes diseñar, contamos con personal capacitado que puede ayudarte.',1,getDate(),null,'OFERTA',4,6,0,1);

INSERT INTO dbo.PUBLICACIONIMAGEN VALUES
(1,'SECUIDANNIÑOS_IMG1.jpg'),
(1,'SECUIDANNIÑOS_IMG2.jpg'),
(1,'SECUIDANNIÑOS_IMG3.jpg'),
(2,'LAVANDERIAOTELO_IMG1.jpg'),
(2,'LAVANDERIAOTELO_IMG2.jpg'),
(3,'PROF.PARTICULAR-VARIASMATERIAS_IMG1.jpg'),
(4,'IMPRESIONES3D_IMG1.jpg'),
(4,'IMPRESIONES3D_IMG2.jpg');

/*
SELECT * FROM dbo.USUARIO;
SELECT * FROM dbo.CLIENTE;
SELECT * FROM dbo.ADMINISTRADOR;
SELECT * FROM dbo.BARRIO;
SELECT * FROM dbo.DEPARTAMENTO;
SELECT * FROM dbo.CATEGORIAPREGUNTA;
SELECT * FROM dbo.PREGUNTA;
SELECT * FROM dbo.SERVICIO;
SELECT * FROM dbo.SERVICIOPREGUNTA;
SELECT * FROM dbo.PUBLICACION;
SELECT * FROM dbo.PUBLICACIONIMAGEN;
SELECT * FROM dbo.PUBLICACIONRESPUESTA;
SELECT * FROM dbo.CONTACTO;
SELECT * FROM dbo.COMENTARIOPUNTUACION;
SELECT * FROM dbo.PRESUPUESTO;

SELECT p.Id as IdPublicacion, i.Imagen as Imagen, s.Nombre as ServicioNombre, * from dbo.PUBLICACION p, dbo.PUBLICACIONIMAGEN i, dbo.SERVICIO s WHERE i.PublicacionId=p.Id AND s.id=p.ServicioId ORDER BY p.Id;

SELECT p.Id as IdPublicacion, i.Imagen as Imagen, s.Nombre as ServicioNombre, * from dbo.PUBLICACION p left join dbo.SERVICIO s on s.id=p.ServicioId left join dbo.PUBLICACIONIMAGEN i on i.PublicacionId=p.Id Where p.ClienteId=6 ORDER BY p.Id;

SELECT p.Id as IdPublicacion, i.Imagen as Imagen, s.Nombre as ServicioNombre, u.Imagen as ImgUsuario, u.NombreUsuario as NombreUsuario,* from dbo.PUBLICACION p, dbo.PUBLICACIONIMAGEN i, dbo.SERVICIO s, dbo.USUARIO u WHERE i.PublicacionId=p.Id AND p.ServicioId=1 AND s.id=p.ServicioId AND p.Activa=1 AND u.Id=p.ClienteId

SELECT p.Id as IdPublicacion, i.Imagen as Imagen, s.Nombre as ServicioNombre, u.Imagen as ImgUsuario, u.NombreUsuario as NombreUsuario,* from dbo.PUBLICACION p left join dbo.SERVICIO s on s.id=p.ServicioId left join dbo.PUBLICACIONIMAGEN i on i.PublicacionId=p.Id left join dbo.USUARIO u on u.Id=p.ClienteId Where p.ServicioId=1 AND p.Activa=1 ORDER BY p.Id;
*/
