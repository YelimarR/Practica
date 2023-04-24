
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Base de datos: `proy`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id_estudiante` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  `Carrera` varchar(50) DEFAULT NULL,
  `Pais` varchar(50) DEFAULT NULL,
  `Departamento` varchar(50) DEFAULT NULL,
  `Ciudad` varchar(50) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `Celular` varchar(50) DEFAULT NULL,
  `Correo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id_estudiante`, `Nombre`, `Apellido`, `Carrera`, `Pais`, `Departamento`, `Ciudad`, `Direccion`, `Celular`, `Correo`) VALUES
(1, 'pepito', 'Pérez', 'Ingeniería de Sistemas', 'colombia', 'bolivar', 'cartagena', 'chiquinquira mz 44 lt 12', '3114177022', 'miabuelita@gmail.com'),
(3, 'felipe', 'mendrosa', 'ingenieria electrica', 'Colombia', 'Bolivar', 'Cartagena de indias', 'los alpes MZ 32 Lt 17', '3129175028', 'mari6@gmail.com'),
(4, 'Rodrigo', 'ortega', 'ingenieria electronica', 'Colombia', 'Bolivar', 'Cartagena de indias', 'Chiquinquira MZ 44 Lt 12', '3114177022', 'ls227206@gmail.com'),
(5, 'pablo', 'lopez', 'mecatronica', 'Colombia', 'Bolivar', 'Cartagena de indias', 'manga', '3129175028', 'JoOr227206@gmail.com');

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id_estudiante`);


-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id_estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;
