-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.15-log - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para bd_cliente_proyecto
DROP DATABASE IF EXISTS `bd_cliente_proyecto`;
CREATE DATABASE IF NOT EXISTS `bd_cliente_proyecto` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bd_cliente_proyecto`;

-- Volcando estructura para tabla bd_cliente_proyecto.alumno
DROP TABLE IF EXISTS `alumno`;
CREATE TABLE IF NOT EXISTS `alumno` (
  `ID` varchar(10) NOT NULL,
  `Nombre` varchar(15) NOT NULL,
  `Apellidos` varchar(25) NOT NULL,
  `Direccion` varchar(25) NOT NULL,
  `Poblacion` varchar(10) NOT NULL,
  `ID_Grupo` varchar(10) NOT NULL,
  `ID_Familia` varchar(10) NOT NULL,
  `AlaProxima` set('si') DEFAULT NULL,
  KEY `ID` (`ID`),
  KEY `FK_alumno_grupo` (`ID_Grupo`),
  KEY `FK_alumno_familiar` (`ID_Familia`),
  CONSTRAINT `FK_alumno_familiar` FOREIGN KEY (`ID_Familia`) REFERENCES `familiar` (`ID`),
  CONSTRAINT `FK_alumno_grupo` FOREIGN KEY (`ID_Grupo`) REFERENCES `grupo` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_cliente_proyecto.alumno: ~7 rows (aproximadamente)
DELETE FROM `alumno`;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` (`ID`, `Nombre`, `Apellidos`, `Direccion`, `Poblacion`, `ID_Grupo`, `ID_Familia`, `AlaProxima`) VALUES
	('ALUM000', 'Alejandro', 'Martinez', 'C/ Tejera Nº4', 'San Pedro', 'GRUPO00', 'FAM01', NULL),
	('ALUM001', 'Victor', 'Morcillo', 'C/ Baños Nº 2', 'Albacete', 'GRUPO00', 'FAM00', NULL),
	('ALUM002', 'Eva', 'Pineda', 'C/ Gregorio Arcos Nº 7', 'Albacete', 'GRUPO00', 'FAM01', NULL),
	('ALUM003', 'Alfonso', 'Valero', 'C/ Moros Nº 2', 'Albacete', 'GRUPO00', 'FAM00', NULL),
	('ALUM004', 'Carlos', 'Romero', 'C/ Cura Nº 1', 'Albacete', 'GRUPO00', 'FAM01', NULL),
	('ALUM005', 'Rafael', 'Roca', 'C/ Octavio Cuartero nº 3', 'Albacete', 'GRUPO00', 'FAM01', NULL),
	('ALUM006', 'David ', 'Lozoya', 'C/ Tejera Nº3', 'Albacete', 'GRUPO01', 'FAM01', NULL);
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;

-- Volcando estructura para tabla bd_cliente_proyecto.amonestacion
DROP TABLE IF EXISTS `amonestacion`;
CREATE TABLE IF NOT EXISTS `amonestacion` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Alumno` varchar(10) NOT NULL,
  `Fecha` date NOT NULL,
  `Hora` time NOT NULL,
  `ID_Asignatura` varchar(10) NOT NULL,
  `FechaFirmaJEfatura` date DEFAULT NULL,
  `FechaFirmaFamiliar` date DEFAULT NULL,
  `ID_Profesor` varchar(10) NOT NULL,
  `Motivo` varchar(150) NOT NULL,
  `ID_Sancion` varchar(10) DEFAULT NULL,
  KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_cliente_proyecto.amonestacion: ~0 rows (aproximadamente)
DELETE FROM `amonestacion`;
/*!40000 ALTER TABLE `amonestacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `amonestacion` ENABLE KEYS */;

-- Volcando estructura para tabla bd_cliente_proyecto.asignatura
DROP TABLE IF EXISTS `asignatura`;
CREATE TABLE IF NOT EXISTS `asignatura` (
  `ID` varchar(10) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  KEY `ID_Asignatura` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_cliente_proyecto.asignatura: ~5 rows (aproximadamente)
DELETE FROM `asignatura`;
/*!40000 ALTER TABLE `asignatura` DISABLE KEYS */;
INSERT INTO `asignatura` (`ID`, `Nombre`) VALUES
	('ASIG000', 'Entorno Cliente'),
	('ASIG001', 'Entorno Servidor'),
	('ASIG002', 'Despliegue Aplicaciones'),
	('ASIG003', 'Base de Datos'),
	('ASIG004', 'Sistemas');
/*!40000 ALTER TABLE `asignatura` ENABLE KEYS */;

-- Volcando estructura para tabla bd_cliente_proyecto.asigprof
DROP TABLE IF EXISTS `asigprof`;
CREATE TABLE IF NOT EXISTS `asigprof` (
  `ID` varchar(10) NOT NULL,
  `ID_Asignatura` varchar(10) NOT NULL,
  `ID_Profesor` varchar(10) NOT NULL,
  KEY `ID` (`ID`),
  KEY `FK__asignatura` (`ID_Asignatura`),
  KEY `FK__profesor` (`ID_Profesor`),
  CONSTRAINT `FK__asignatura` FOREIGN KEY (`ID_Asignatura`) REFERENCES `asignatura` (`ID`),
  CONSTRAINT `FK__profesor` FOREIGN KEY (`ID_Profesor`) REFERENCES `profesor` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_cliente_proyecto.asigprof: ~5 rows (aproximadamente)
DELETE FROM `asigprof`;
/*!40000 ALTER TABLE `asigprof` DISABLE KEYS */;
INSERT INTO `asigprof` (`ID`, `ID_Asignatura`, `ID_Profesor`) VALUES
	('ASIGPROF00', 'ASIG000', 'PROF01'),
	('ASIGPROF01', 'ASIG002', 'PROF02'),
	('ASIGPROF02', 'ASIG001', 'PROF02'),
	('ASIGPROF03', 'ASIG003', 'PROF04'),
	('ASIGPROF04', 'ASIG004', 'PROF01');
/*!40000 ALTER TABLE `asigprof` ENABLE KEYS */;

-- Volcando estructura para tabla bd_cliente_proyecto.expulsion
DROP TABLE IF EXISTS `expulsion`;
CREATE TABLE IF NOT EXISTS `expulsion` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Alumno` varchar(10) NOT NULL,
  `Fecha` date NOT NULL,
  `Hora` time NOT NULL,
  `ID_Asignatura` varchar(10) NOT NULL,
  `FechaFirmaJefatura` date DEFAULT NULL,
  `FechaFirmaFamiliar` date DEFAULT NULL,
  `ID_Profesor` varchar(10) NOT NULL,
  `Motivo` varchar(150) NOT NULL,
  `ID_Sancion` varchar(10) DEFAULT NULL,
  `Tarea` varchar(150) NOT NULL,
  KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_cliente_proyecto.expulsion: ~0 rows (aproximadamente)
DELETE FROM `expulsion`;
/*!40000 ALTER TABLE `expulsion` DISABLE KEYS */;
/*!40000 ALTER TABLE `expulsion` ENABLE KEYS */;

-- Volcando estructura para tabla bd_cliente_proyecto.familiar
DROP TABLE IF EXISTS `familiar`;
CREATE TABLE IF NOT EXISTS `familiar` (
  `ID` varchar(10) NOT NULL,
  `Nombre` varchar(15) NOT NULL,
  `Apellidos` varchar(25) NOT NULL,
  `Dirección` varchar(25) NOT NULL,
  `Población` varchar(10) NOT NULL,
  `Teléfono` int(9) NOT NULL,
  `Móvil` int(9) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_cliente_proyecto.familiar: ~2 rows (aproximadamente)
DELETE FROM `familiar`;
/*!40000 ALTER TABLE `familiar` DISABLE KEYS */;
INSERT INTO `familiar` (`ID`, `Nombre`, `Apellidos`, `Dirección`, `Población`, `Teléfono`, `Móvil`, `Correo`) VALUES
	('FAM00', 'Juan', 'Lopez', 'C/ Madrid Nº4 ', 'Albacete', 967878787, 622359876, 'pasi.95.sp@gmail.com'),
	('FAM01', 'David', 'Lozoya', 'C/ Toledo Nº5', 'Albacete', 967548263, 655879456, 'pasi.95.sp@gmail.com');
/*!40000 ALTER TABLE `familiar` ENABLE KEYS */;

-- Volcando estructura para tabla bd_cliente_proyecto.grupo
DROP TABLE IF EXISTS `grupo`;
CREATE TABLE IF NOT EXISTS `grupo` (
  `ID` varchar(10) NOT NULL,
  `Denominación` varchar(50) NOT NULL,
  `TutorGrupo` varchar(10) NOT NULL,
  KEY `ID` (`ID`),
  KEY `FK_grupo_profesor` (`TutorGrupo`),
  CONSTRAINT `FK_grupo_profesor` FOREIGN KEY (`TutorGrupo`) REFERENCES `profesor` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_cliente_proyecto.grupo: ~2 rows (aproximadamente)
DELETE FROM `grupo`;
/*!40000 ALTER TABLE `grupo` DISABLE KEYS */;
INSERT INTO `grupo` (`ID`, `Denominación`, `TutorGrupo`) VALUES
	('GRUPO00', '2º DAW', 'PROF03'),
	('GRUPO01', '1º DAW', 'PROF01');
/*!40000 ALTER TABLE `grupo` ENABLE KEYS */;

-- Volcando estructura para tabla bd_cliente_proyecto.grupoasig
DROP TABLE IF EXISTS `grupoasig`;
CREATE TABLE IF NOT EXISTS `grupoasig` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Grupo` varchar(10) NOT NULL,
  `ID_Asignatura` varchar(10) NOT NULL,
  UNIQUE KEY `ID_Grupo_ID_Asignatura` (`ID_Grupo`,`ID_Asignatura`),
  KEY `ID` (`ID`),
  KEY `FK_grupo-asig_asignatura` (`ID_Asignatura`),
  CONSTRAINT `FK_grupo-asig_asignatura` FOREIGN KEY (`ID_Asignatura`) REFERENCES `asignatura` (`ID`),
  CONSTRAINT `FK_grupo-asig_grupo` FOREIGN KEY (`ID_Grupo`) REFERENCES `grupo` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_cliente_proyecto.grupoasig: ~5 rows (aproximadamente)
DELETE FROM `grupoasig`;
/*!40000 ALTER TABLE `grupoasig` DISABLE KEYS */;
INSERT INTO `grupoasig` (`ID`, `ID_Grupo`, `ID_Asignatura`) VALUES
	(1, 'GRUPO00', 'ASIG002'),
	(3, 'GRUPO00', 'ASIG000'),
	(4, 'GRUPO00', 'ASIG001'),
	(5, 'GRUPO01', 'ASIG004'),
	(6, 'GRUPO01', 'ASIG003');
/*!40000 ALTER TABLE `grupoasig` ENABLE KEYS */;

-- Volcando estructura para tabla bd_cliente_proyecto.motivo
DROP TABLE IF EXISTS `motivo`;
CREATE TABLE IF NOT EXISTS `motivo` (
  `ID` varchar(10) NOT NULL,
  `Descripcion` varchar(50) NOT NULL,
  KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_cliente_proyecto.motivo: ~5 rows (aproximadamente)
DELETE FROM `motivo`;
/*!40000 ALTER TABLE `motivo` DISABLE KEYS */;
INSERT INTO `motivo` (`ID`, `Descripcion`) VALUES
	('MOT01', 'Molestar continuamente en clase'),
	('MOT02', 'No atiende a las explicaciones del profesor'),
	('MOT03', 'No traer el material reiteradamente'),
	('MOT04', 'Retrasos reiterados a clase'),
	('MOT05', 'No tener el cuaderno del alumno');
/*!40000 ALTER TABLE `motivo` ENABLE KEYS */;

-- Volcando estructura para tabla bd_cliente_proyecto.profesor
DROP TABLE IF EXISTS `profesor`;
CREATE TABLE IF NOT EXISTS `profesor` (
  `ID` varchar(10) NOT NULL,
  `Nombre` varchar(15) NOT NULL,
  `Apellidos` varchar(25) NOT NULL,
  `Usuario` varchar(10) NOT NULL,
  `Contraseña` varchar(10) NOT NULL,
  `EquipoDir` set('no','si') NOT NULL,
  `Tutor` set('no','si') NOT NULL,
  UNIQUE KEY `Usuario_Contraseña` (`Usuario`,`Contraseña`),
  KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_cliente_proyecto.profesor: ~4 rows (aproximadamente)
DELETE FROM `profesor`;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
INSERT INTO `profesor` (`ID`, `Nombre`, `Apellidos`, `Usuario`, `Contraseña`, `EquipoDir`, `Tutor`) VALUES
	('PROF02', 'Daniel', 'Garcia', 'daniel1', 'daniel', 'si', 'no'),
	('PROF04', 'Elvira', 'Garcia', 'elvira1', 'elvira', 'no', 'no'),
	('PROF03', 'Inma', 'Garcia', 'inma1', 'inma', 'si', 'si'),
	('PROF01', 'Rosa', 'Ropero', 'rosa1', 'rosa', 'no', 'si');
/*!40000 ALTER TABLE `profesor` ENABLE KEYS */;

-- Volcando estructura para tabla bd_cliente_proyecto.sancion
DROP TABLE IF EXISTS `sancion`;
CREATE TABLE IF NOT EXISTS `sancion` (
  `ID_Sancion` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Alumno` varchar(10) NOT NULL,
  `Fecha` date NOT NULL,
  `Hora` time NOT NULL,
  `ID_Profesor` varchar(11) NOT NULL,
  `Sancion` varchar(150) NOT NULL,
  KEY `ID_Sancion` (`ID_Sancion`),
  KEY `FK_sancion_alumno` (`ID_Alumno`),
  KEY `FK_sancion_profesor` (`ID_Profesor`),
  CONSTRAINT `FK_sancion_alumno` FOREIGN KEY (`ID_Alumno`) REFERENCES `alumno` (`ID`),
  CONSTRAINT `FK_sancion_profesor` FOREIGN KEY (`ID_Profesor`) REFERENCES `profesor` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_cliente_proyecto.sancion: ~0 rows (aproximadamente)
DELETE FROM `sancion`;
/*!40000 ALTER TABLE `sancion` DISABLE KEYS */;
/*!40000 ALTER TABLE `sancion` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
