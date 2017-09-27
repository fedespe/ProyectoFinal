USE SPODS;
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
/*1*/('Aguada',10),
/*2*/('Aires Puros',10),
/*3*/('Atahualpa',10),
/*4*/('Ba�ados de Carrasco',10),
/*5*/('Barrio Sur',10),
/*6*/('Belvedere',10),
/*7*/('Brazo Oriental',10),
/*8*/('Buceo',10),
/*9*/('Capurro',10),
/*10*/('Carrasco',10),
/*11*/('Carrasco Norte',10),
/*12*/('Casab�',10),
/*13*/('Casavalle',10),
/*14*/('Centro',10),
/*15*/('Cerrito de la Victoria',10),
/*16*/('Ciudad Vieja',10),
/*17*/('Col�n',10),
/*18*/('Conciliaci�n',10),
/*19*/('Cord�n',10),
/*20*/('Flor de Maro�as',10),
/*21*/('Goes',10),
/*22*/('Ituzaing�',10),
/*23*/('Jacinto Vera',10),
/*24*/('Jardines del Hip�dromo',10),
/*25*/('La Blanqueada',10),
/*26*/('La Comercial',10),
/*27*/('La Figurita',10),
/*28*/('La Paloma',10),
/*29*/('La Teja',10),
/*30*/('Larra�aga',10),
/*31*/('Las Acacias',10),
/*32*/('Las Canteras',10),
/*33*/('Lezica',10),
/*34*/('Malv�n',10),
/*35*/('Malv�n Norte',10),
/*36*/('Manga',10),
/*37*/('Maro�as',10),
/*38*/('Mercado Modelo',10),
/*39*/('Nuevo Par�s',10),
/*40*/('Palermo',10),
/*41*/('Parque Batlle',10),
/*42*/('Parque Rod�',10),
/*43*/('Paso de la Arena',10),
/*44*/('Paso de las Duranas',10),
/*45*/('Pe�arol',10),
/*46*/('Piedras Blancas',10),
/*47*/('Pocitos',10),
/*48*/('Prado',10),
/*49*/('Punta Carretas',10),
/*50*/('Punta de Rieles',10),
/*51*/('Punta Gorda',10),
/*52*/('Reducto',10),
/*53*/('Sayago',10),
/*54*/('Tres Cruces',10),
/*55*/('Tres Omb�es',10),
/*56*/('Uni�n',10),
/*57*/('Villa del Cerro',10),
/*58*/('Villa Espa�ola',10),
/*59*/('Villa Garc�a',10),
/*60*/('Otro',10);

--contrasena 123456789
INSERT INTO dbo.USUARIO VALUES
/*1 - SupAdmin*/('TutorSupAdmin', 'TutorSupAdmin', 'TutorSupAdmin','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'TutorSupAdmin@mailinator.com', '099999999', 'TutorSupAdmin dir', getdate(), 'SUPERADMINISTRADOR', 1,'TUTORSUPADMIN.jpg', 'TokenTutorSupAdmin', '1900-01-01'),
/*2 - SupAdmin*/('SupAdmin', 'SupAdmin', 'SupAdmin','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'SupAdmin@hotmail.com', '099845498', 'SupAdmin dir', getdate(), 'SUPERADMINISTRADOR', 1,'SUPADMIN.jpg', 'TokenSupAdmin', '1900-01-01'),

/*3 - Admin*/('TutorAdmin', 'TutorAdmin', 'TutorAdmin','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'TutorAdmin@mailinator.com', '099999999', 'TutorAdmin dir', getdate(), 'ADMINISTRADOR', 1, 'TUTORADMIN.jpg', 'TokenTutorAdmin', '1900-01-01'),
/*4 - Admin*/('Javier', 'Navarro', 'Admin1','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'jnavarro@hotmail.com', '099789456', '8 de Octubre 1515', getdate(), 'ADMINISTRADOR', 25, 'ADMIN1.jpg', 'TokenAdmin1', '1900-01-01'),
/*5 - Admin*/('Ricardo', 'Eguia', 'Admin2','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'reguia@hotmail.com', '099456111', 'Rambla Republica de Mexico 9845', getdate(), 'ADMINISTRADOR', 10, 'ADMIN2.jpg', 'TokenAdmin2', '1900-01-01'),
/*6 - Admin*/('Daniel', 'Arostegui', 'Admin3','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'darostegui@hotmail.com', '0997454412', 'Justicia 455', getdate(), 'ADMINISTRADOR', 13, 'ADMIN3.jpg', 'TokenAdmin3', '1900-01-01'),
/*7 - Admin*/('Daniel', 'Sosa', 'Admin4','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'dsosa@hotmail.com', '099545555', 'Rivera 613', getdate(), 'ADMINISTRADOR', 34, 'ADMIN4.jpg', 'TokenAdmin1', '1900-01-01'),


/*8  - Cliente*/('TutorCliente', 'TutorCliente', 'TutorCliente','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'TutorCliente@mailinator.com', '099999999', 'TutorCliente dir', getdate(), 'CLIENTE', 1,'TUTORCLIENTE.jpg', 'TokenTutorCliente', '1900-01-01'),
/*9  - Cliente*/('Federico', 'Speroni', 'fspe','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'fsperonip@hotmail.com', '099845498', 'Defensa 1991', getdate(), 'CLIENTE', 26,'FSPE.jpg', 'TokenFederico', '1900-01-01'),
/*10 - Cliente*/('Maria', 'Pelaz', 'majo','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'majopelaez@hotmail.com', '099165421', '18 de julio 1574', getdate(), 'CLIENTE', 14, 'MAJO.jpg', 'TokenMajo', '1900-01-01'),
/*11 - Cliente*/('Bruno', 'D�az', 'brunoediaz','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'brunoediaz@hotmail.com', '099552591', 'Luis Moro 4583 Bis', getdate(), 'CLIENTE', 53,'BRUNOEDIAZ.jpg', 'TokenBruno', '1900-01-01'),
/*12 - Cliente*/('Francis', 'Espindola', 'frane','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'fespindola@hotmail.com', '099123212', 'Av. Italia 1542', getdate(), 'CLIENTE', 51,'FRANE.jpg', 'TokenFrane', '1900-01-01'),
/*13 - Cliente*/('Matias', 'Sosa', 'matisosa','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'msosa@hotmail.com', '099456213', 'Misiones 1832', getdate(), 'CLIENTE', 51,'MATISOSA.jpg', 'TokenMatisosa', '1900-01-01'),
/*14 - Cliente*/('Valentina', 'Martinez', 'vale','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'vmartinez@hotmail.com', '099456789', 'Marcelino Sosa 810', getdate(), 'CLIENTE', 51,'VALE.jpg', 'TokenVale', '1900-01-01'),

/*15 - SupAdmin*/('SupAdminCorrector1', 'SupAdminCorrector1', 'SupAdminCorrector1','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'SupAdminCorrector1@hotmail.com', '099999999', 'SupAdminCorrector1 dir', getdate(), 'SUPERADMINISTRADOR', 1,'SUPADMIN.jpg', 'TokenSupAdminCorrector1', '1900-01-01'),
/*16 - SupAdmin*/('SupAdminCorrector2', 'SupAdminCorrector2', 'SupAdminCorrector2','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'SupAdminCorrector2@hotmail.com', '099999999', 'SupAdminCorrector2 dir', getdate(), 'SUPERADMINISTRADOR', 1,'SUPADMIN.jpg', 'TokenSupAdminCorrector2', '1900-01-01'),
/*17 - Admin*/('Corrector1Admin', 'Corrector1Admin', 'Corrector1Admin','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'Corrector1Admin@mailinator.com', '099999999', 'Corrector1Admin dir', getdate(), 'ADMINISTRADOR', 1, 'TUTORADMIN.jpg', 'TokenCorrector1Admin', '1900-01-01'),
/*18 - Admin*/('Corrector2Admin', 'Corrector2Admin', 'Corrector2Admin','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'Corrector2Admin@mailinator.com', '099999999', 'Corrector2Admin dir', getdate(), 'ADMINISTRADOR', 1, 'TUTORADMIN.jpg', 'TokenCorrector2Admin', '1900-01-01'),
/*19  - Cliente*/('Corrector1', 'Corrector1', 'Corrector1','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'Corrector1@mailinator.com', '099999999', 'Corrector1 dir', getdate(), 'CLIENTE', 1,'CORRECTORCLIENTE.jpg', 'TokenCorrector1', '1900-01-01'),
/*20  - Cliente*/('Corrector2', 'Corrector2', 'Corrector2','25f9e794323b453885f5181f1b624d0b', getdate(), 1, 'Corrector2@mailinator.com', '099999999', 'Corrector2 dir', getdate(), 'CLIENTE', 1,'CORRECTORCLIENTE.jpg', 'TokenCorrector1', '1900-01-01');


INSERT INTO dbo.SUPERADMINISTRADOR VALUES
(1),
(2);

INSERT INTO dbo.ADMINISTRADOR VALUES
(3),
(4),
(5),
(6),
(7);

INSERT INTO dbo.CLIENTE Values
(8),
(9),
(10),
(11),
(12),
(13),
(14);

INSERT INTO dbo.CATEGORIAPREGUNTA VALUES
/*1*/('Generales'),
/*2*/('Lavados'),
/*3*/('Cuidados'),
/*4*/('Profesorado'),
/*5*/('Otros'),
/*6*/('Limpieza'),
/*7*/('Jardiner�a'),
/*8*/('Fletes'),
/*9*/('Ejercicio');

INSERT INTO dbo.PREGUNTA VALUES
/*1*/('Precio por hora',1),
/*2*/('Precio por canasto',2),
/*3*/('Precio por hora por ni�o',3),
/*4*/('M�xima cantidad de ni�os',3),
/*5*/('Disponibilidad Horaria',1),
/*6*/('Materias dictadas',4),
/*7*/('Materias disponibles',4),
/*8*/('Colores disponibles',5),
/*9*/('Precio por kilo',2),
/*10*/('Zonas de trabajo',1),
/*11*/('Cuota mensual',1),
/*12*/('Promociones y descuentos',1),
/*13*/('Precio por kilometro',8),
/*14*/('Precio por persona para carga y descarga',8),
/*15*/('Capacidad del transporte',8),
/*16*/('Posibles trabajos a realizar',1);


INSERT INTO dbo.SERVICIO VALUES
/*1*/('Cuidado de Ni�os','CUIDADODENI�OS.jpg',1,getDate()),
/*2*/('Lavado de Ropa','LAVADODEROPA.jpg',1,getDate()),
/*3*/('Clases Particulares','CLASESPARTICULARES.jpg',1,getDate()),
/*4*/('Impresiones 3D','IMPRESIONES3D.jpg',1,getDate()),
/*5*/('Limpieza','LIMPIEZA.jpg',1,getDate()),
/*6*/('Ejercicio','EJERCICIO.jpg',1,getDate()),
/*7*/('Jardiner�a','JARDINERIA.jpg',1,getDate()),
/*8*/('Fletes','FLETES.jpg',1,getDate()),
/*9*/('Pintores','PINTORES.jpg',1,getDate());

INSERT INTO dbo.SERVICIOPREGUNTA VALUES
(1,1), --Cuidado de Ni�os - Precio por hora
(1,3), --Cuidado de Ni�os - Precio por hora por ni�o
(1,4), --Cuidado de Ni�os - M�xima cantidad de ni�os
(1,5), --Cuidado de Ni�os - Disponibilidad Horaria
(1,10),--Cuidado de Ni�os - Zona de trabajo
(1,11),--Cuidado de Ni�os - Cuota mensual
(1,12),--Cuidado de Ni�os - Promociones y descuentos
(1,16),--Cuidado de Ni�os - Posibles trabajos a realizar


(2,2), --Lavado de Ropa - Precio por canasto
(2,5), --Lavado de Ropa - Disponibilidad Horaria
(2,12),--Lavado de Ropa - Promociones y descuentos


(3,1), --Profesor Particular - Precio por hora
(3,5), --Profesor Particular - Disponibilidad Horaria
(3,6), --Profesor Particular - Materias que dicta
(3,10),--Profesor Particular - Zona de trabajo
(3,12),--Profesor Particular - Promociones y descuentos

(4,5), --Impresiones 3D - Disponibilidad Horaria
(4,7), --Impresiones 3D - Materias disponibles
(4,8), --Impresiones 3D - Colores disponibles
(4,9), --Impresiones 3D - Precio por kilo
(4,12),--Impresiones 3D - Promociones y descuentos
(4,16),--Impresiones 3D - Posibles trabajos a realizar

(5,1), --Limpieza - Precio por hora
(5,5), --Limpieza - Disponibilidad Horaria
(5,10),--Limpieza - Zona de trabajo
(5,11),--Limpieza - Cuota mensual
(5,12),--Limpieza - Promociones y descuentos
(5,16),--Limpieza - Posibles trabajos a realizar

(6,1), --Ejercicio - Precio por hora
(6,5), --Ejercicio - Disponibilidad Horaria
(6,10),--Ejercicio - Zona de trabajo
(6,11),--Ejercicio - Cuota mensual
(6,12),--Ejercicio - Promociones y descuentos

(7,1), --Jardiner�a - Precio por hora
(7,5), --Jardiner�a - Disponibilidad Horaria
(7,10),--Jardiner�a - Zona de trabajo
(7,11),--Jardiner�a - Cuota mensual
(7,12),--Jardiner�a - Promociones y descuentos
(7,16),--Jardiner�a - Posibles trabajos a realizar

(8,1), --Fletes - Precio por hora
(8,5), --Fletes - Disponibilidad Horaria
(8,10),--Fletes - Zona de trabajo
(8,12),--Fletes - Promociones y descuentos
(8,13),--Fletes - Precio por kilometro
(8,14),--Fletes - Precio por persona para carga y descarga
(8,15),--Fletes - Capacidad del transporte
(8,16),--Fletes - Posibles trabajos a realizar

(9,1), --Pintores - Precio por hora
(9,5), --Pintores - Disponibilidad Horaria
(9,10),--Pintores - Zona de trabajo
(9,12),--Pintores - Promociones y descuentos
(9,16);--Pintores - Posibles trabajos a realizar


--INSERT INTO dbo.PUBLICACION VALUES
--('Se cuidan ni�os','Se cuidan ni�os de hasta 12 a�os.',1,getDate(),null,'OFERTA',1,6,0,1),
--('Lavander�a Otelo','Lavamos su ropa. Tambi�n trabajamos con empresas!!!',1,getDate(),null,'OFERTA',2,7,0,1),
--('Prof. Particular - Varias Materias','Se dictan clases de Matem�ticas, F�sica, Qu�mica y Dibujo.',1,getDate(),null,'OFERTA',3,6,0,1),
--('Impresiones 3D','Ven� a imprimir tu modelo 3D!!! Si tenes las idea y no sabes dise�ar, contamos con personal capacitado que puede ayudarte.',1,getDate(),null,'OFERTA',4,6,0,1);

--INSERT INTO dbo.PUBLICACIONIMAGEN VALUES
--(1,'SECUIDANNI�OS_IMG1.jpg'),
--(1,'SECUIDANNI�OS_IMG2.jpg'),
--(1,'SECUIDANNI�OS_IMG3.jpg'),
--(2,'LAVANDERIAOTELO_IMG1.jpg'),
--(2,'LAVANDERIAOTELO_IMG2.jpg'),
--(3,'PROF.PARTICULAR-VARIASMATERIAS_IMG1.jpg'),
--(4,'IMPRESIONES3D_IMG1.jpg'),
--(4,'IMPRESIONES3D_IMG2.jpg');

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