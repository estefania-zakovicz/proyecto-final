-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 16-06-2023 a las 05:22:49
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mipaginaweb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consejos`
--

DROP TABLE IF EXISTS `consejos`;
CREATE TABLE IF NOT EXISTS `consejos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `subtitulo` text COLLATE utf8mb4_general_ci NOT NULL,
  `cuerpo` text COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `consejos`
--

INSERT INTO `consejos` (`id`, `titulo`, `subtitulo`, `cuerpo`) VALUES
(1, 'Reemplazos del huevo', 'Opciones:', '1- Linaza o chía: Mezclar una cucharada de semillas de linaza o chía molidas con 3 cucharadas de agua y dejar reposar durante unos 10-15 minutos hasta que se forme un gel. Esta mezcla se puede utilizar para reemplazar un huevo en recetas de horneado.\r\n\r\n2-Puré de banana o de manzana: Utilizar 1/4 de taza de puré de banana madura (aproximadamente lancantidad de un huevo) como sustituto en recetas de panqueques, muffins, pasteles y panes.'),
(3, 'Reemplazos de la carne animal', 'Opciones:', 'Podés reemplazar una porción de carne animal por legumbres como garbanzos, lentejas, porotos o una combinación de las mismas.\r\nTambién, podés optar por tofu.\r\n>Tip: Te recomiendo remojar las legumbres\r\nal menos por 12 horas y luego cocinarlas el mismo día. Después de enfriadas, congelalas por separado. Cuando quieras usarlas, con sólo tirar un poco de agua caliente sobre la porción que vas a consumir, ya estarían listas para saborearlas y combinarlas en tu plato con los demás alimentos.'),
(4, 'Reemplazos de queso animal', 'Opciones:', '1- El queso puede prepararse a base de anacardos; legumbres; papa, entre otros alimentos.\r\n2-También existe la levadura nutricional, que es similar al queso rallado.\r\n\r\n>Tip: en internet podés encontrar muchísimas recetas de quesos veganos con distintos alimentos y son muy fáciles de prepararlos. Te animo a que te desafíes a hacerlas y así probar opciones más nutritivas para tu salud.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'Estefi', '81dc9bdb52d04dc20036dbd8313ed055');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
