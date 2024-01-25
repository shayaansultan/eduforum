CREATE DATABASE  IF NOT EXISTS `cvwo_mysql` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cvwo_mysql`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: cvwo-mysql.cjy064q046qq.ap-southeast-1.rds.amazonaws.com    Database: cvwo_mysql
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `unique_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `thread_id` int DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_edited` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`comment_id`),
  KEY `thread_id` (`thread_id`),
  KEY `Comments_ibfk_2` (`user_id`),
  CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`thread_id`) REFERENCES `Threads` (`thread_id`),
  CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `CommentsView`
--

DROP TABLE IF EXISTS `CommentsView`;
/*!50001 DROP VIEW IF EXISTS `CommentsView`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `CommentsView` AS SELECT 
 1 AS `comment_id`,
 1 AS `content`,
 1 AS `thread_id`,
 1 AS `thread_title`,
 1 AS `user_id`,
 1 AS `username`,
 1 AS `user_email`,
 1 AS `created_at`,
 1 AS `updated_at`,
 1 AS `is_edited`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Threads`
--

DROP TABLE IF EXISTS `Threads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Threads` (
  `thread_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `user_id` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_edited` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`thread_id`),
  KEY `category_id` (`category_id`),
  KEY `Threads_ibfk_1` (`user_id`),
  CONSTRAINT `Threads_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  CONSTRAINT `Threads_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `ThreadsView`
--

DROP TABLE IF EXISTS `ThreadsView`;
/*!50001 DROP VIEW IF EXISTS `ThreadsView`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `ThreadsView` AS SELECT 
 1 AS `thread_id`,
 1 AS `title`,
 1 AS `content`,
 1 AS `user_id`,
 1 AS `username`,
 1 AS `user_email`,
 1 AS `category_id`,
 1 AS `category_name`,
 1 AS `comment_count`,
 1 AS `created_at`,
 1 AS `updated_at`,
 1 AS `is_edited`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `user_id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `unique_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Final view structure for view `CommentsView`
--

/*!50001 DROP VIEW IF EXISTS `CommentsView`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`cvwo_admin`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `CommentsView` AS select `c`.`comment_id` AS `comment_id`,`c`.`content` AS `content`,`c`.`thread_id` AS `thread_id`,`t`.`title` AS `thread_title`,`c`.`user_id` AS `user_id`,`u`.`username` AS `username`,`u`.`email` AS `user_email`,`c`.`created_at` AS `created_at`,`c`.`updated_at` AS `updated_at`,`c`.`is_edited` AS `is_edited` from ((`Comments` `c` join `Users` `u` on((`c`.`user_id` = `u`.`user_id`))) join `Threads` `t` on((`c`.`thread_id` = `t`.`thread_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `ThreadsView`
--

/*!50001 DROP VIEW IF EXISTS `ThreadsView`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`cvwo_admin`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `ThreadsView` AS select `t`.`thread_id` AS `thread_id`,`t`.`title` AS `title`,`t`.`content` AS `content`,`t`.`user_id` AS `user_id`,`u`.`username` AS `username`,`u`.`email` AS `user_email`,`t`.`category_id` AS `category_id`,`c`.`name` AS `category_name`,(select count(0) from `Comments` where (`Comments`.`thread_id` = `t`.`thread_id`)) AS `comment_count`,`t`.`created_at` AS `created_at`,`t`.`updated_at` AS `updated_at`,`t`.`is_edited` AS `is_edited` from ((`Threads` `t` join `Users` `u` on((`t`.`user_id` = `u`.`user_id`))) join `Categories` `c` on((`t`.`category_id` = `c`.`category_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-25 19:09:56
