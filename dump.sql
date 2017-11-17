-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: engenhariadesoftware
-- ------------------------------------------------------
-- Server version	5.7.18-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `boletos`
--

DROP TABLE IF EXISTS `boletos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boletos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `numero_documento` varchar(45) NOT NULL,
  `valor` double NOT NULL,
  `vencimento` date NOT NULL,
  `juros` double NOT NULL DEFAULT '0',
  `id_contas_receber_parcela` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_contas_receber_parcela_idx` (`id_contas_receber_parcela`),
  CONSTRAINT `fk_boletos_id_contas_receber_parcela` FOREIGN KEY (`id_contas_receber_parcela`) REFERENCES `contas_receber_parcela` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boletos`
--

LOCK TABLES `boletos` WRITE;
/*!40000 ALTER TABLE `boletos` DISABLE KEYS */;
/*!40000 ALTER TABLE `boletos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boletos_recebimento`
--

DROP TABLE IF EXISTS `boletos_recebimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boletos_recebimento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor_recebido` double NOT NULL,
  `data_recebimento` date NOT NULL,
  `id_contas_receber_recebimento_parcela` int(11) NOT NULL,
  `id_boletos` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_contas_receber_recebimento_parcela_idx` (`id_contas_receber_recebimento_parcela`),
  KEY `fk_boletos_recebimento_id_boletos` (`id_boletos`),
  CONSTRAINT `fk_boletos_recebimento_id_boletos` FOREIGN KEY (`id_boletos`) REFERENCES `boletos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_boletos_recebimento_id_contas_receber_recebimento_parcela` FOREIGN KEY (`id_contas_receber_recebimento_parcela`) REFERENCES `contas_receber_recebimento_parcela` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boletos_recebimento`
--

LOCK TABLES `boletos_recebimento` WRITE;
/*!40000 ALTER TABLE `boletos_recebimento` DISABLE KEYS */;
/*!40000 ALTER TABLE `boletos_recebimento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `documento` varchar(14) DEFAULT NULL,
  `tipo` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Cliente Padrão','99999999999',0),(26,'David','33030303003',0),(27,'Gabriel','3030330303030',0);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contas_financeiras`
--

DROP TABLE IF EXISTS `contas_financeiras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contas_financeiras` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `saldo` double NOT NULL DEFAULT '0',
  `saldoInicial` double NOT NULL DEFAULT '0',
  `descricao` varchar(100) NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contas_financeiras`
--

LOCK TABLES `contas_financeiras` WRITE;
/*!40000 ALTER TABLE `contas_financeiras` DISABLE KEYS */;
INSERT INTO `contas_financeiras` VALUES (1,180,10,'Conta Padrão','2017-11-05 23:41:01');
/*!40000 ALTER TABLE `contas_financeiras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contas_receber`
--

DROP TABLE IF EXISTS `contas_receber`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contas_receber` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_cadastro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `valor` double NOT NULL,
  `quantidade_parcelas` int(11) NOT NULL DEFAULT '1',
  `id_contas_financeiras` int(10) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `vencimento` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_contas_financeiras_idx` (`id_contas_financeiras`),
  KEY `fk_contas_receber_id_cliente` (`id_cliente`),
  KEY `fk_contas_receber_id_pedido` (`id_pedido`),
  CONSTRAINT `fk_contas_receber_id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_contas_receber_id_contas_financeiras` FOREIGN KEY (`id_contas_financeiras`) REFERENCES `contas_financeiras` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_contas_receber_id_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contas_receber`
--

LOCK TABLES `contas_receber` WRITE;
/*!40000 ALTER TABLE `contas_receber` DISABLE KEYS */;
INSERT INTO `contas_receber` VALUES (37,'2017-11-16 21:32:02',340,2,1,1,17,'2017-11-16');
/*!40000 ALTER TABLE `contas_receber` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contas_receber_parcela`
--

DROP TABLE IF EXISTS `contas_receber_parcela`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contas_receber_parcela` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero_parcela` int(11) NOT NULL DEFAULT '1',
  `valor` double NOT NULL,
  `valor_recebido` double NOT NULL,
  `vencimento` date NOT NULL,
  `juros` double NOT NULL,
  `id_contas_receber` int(11) NOT NULL,
  `data_recebimento` date DEFAULT NULL,
  `pago` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`pago`),
  KEY `fk_contas_receber_parcela_id_contas_receber` (`id_contas_receber`),
  CONSTRAINT `fk_contas_receber_parcela_id_contas_receber` FOREIGN KEY (`id_contas_receber`) REFERENCES `contas_receber` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contas_receber_parcela`
--

LOCK TABLES `contas_receber_parcela` WRITE;
/*!40000 ALTER TABLE `contas_receber_parcela` DISABLE KEYS */;
INSERT INTO `contas_receber_parcela` VALUES (101,1,170,170,'2017-11-05',0.08500000000000796,37,'2017-11-06',1),(102,2,170,0,'2018-12-05',0,37,NULL,0);
/*!40000 ALTER TABLE `contas_receber_parcela` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contas_receber_recebimento_parcela`
--

DROP TABLE IF EXISTS `contas_receber_recebimento_parcela`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contas_receber_recebimento_parcela` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor_recebido` double NOT NULL,
  `data_recebimento` date NOT NULL,
  `id_contas_receber_parcela` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_contas_receber_parcela_idx` (`id_contas_receber_parcela`),
  CONSTRAINT `fk_contas_receber_recebimento_parcela_id_contas_receber_parcela` FOREIGN KEY (`id_contas_receber_parcela`) REFERENCES `contas_receber_parcela` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contas_receber_recebimento_parcela`
--

LOCK TABLES `contas_receber_recebimento_parcela` WRITE;
/*!40000 ALTER TABLE `contas_receber_recebimento_parcela` DISABLE KEYS */;
/*!40000 ALTER TABLE `contas_receber_recebimento_parcela` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nota_fiscal`
--

DROP TABLE IF EXISTS `nota_fiscal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nota_fiscal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor` double NOT NULL DEFAULT '0',
  `numero_documento` varchar(45) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `cancelada` tinyint(4) NOT NULL DEFAULT '0',
  `id_pedido` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_cliente_idx` (`id_cliente`),
  KEY `fk_nota_fiscal_id_cliente_idx` (`id_cliente`),
  KEY `fk_nota_fiscal_id_pedido_idx` (`id_pedido`),
  CONSTRAINT `fk_nota_fiscal_id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_nota_fiscal_id_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nota_fiscal`
--

LOCK TABLES `nota_fiscal` WRITE;
/*!40000 ALTER TABLE `nota_fiscal` DISABLE KEYS */;
/*!40000 ALTER TABLE `nota_fiscal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nota_item`
--

DROP TABLE IF EXISTS `nota_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nota_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor` double DEFAULT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `id_produto` int(11) NOT NULL,
  `id_nota_fiscal` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_nota_item_id_produto_idx` (`id_produto`),
  KEY `fk_id_nota_fiscal_idx` (`id_nota_fiscal`),
  CONSTRAINT `fk_nota_item_id_nota_fiscal` FOREIGN KEY (`id_nota_fiscal`) REFERENCES `nota_fiscal` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_nota_item_id_produto` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nota_item`
--

LOCK TABLES `nota_item` WRITE;
/*!40000 ALTER TABLE `nota_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `nota_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedido` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor` double NOT NULL,
  `id_cliente` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pedido_id_cliente_idx` (`id_cliente`),
  CONSTRAINT `fk_pedido_id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (17,680,1);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_item`
--

DROP TABLE IF EXISTS `pedido_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedido_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor` double NOT NULL,
  `quantidade` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pedido_item_id_produto_idx` (`id_produto`),
  KEY `fk_pedido_item_id_pedido_idx` (`id_pedido`),
  CONSTRAINT `fk_pedido_item_id_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_item_id_produto` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_item`
--

LOCK TABLES `pedido_item` WRITE;
/*!40000 ALTER TABLE `pedido_item` DISABLE KEYS */;
INSERT INTO `pedido_item` VALUES (6,1,0,0,0),(7,1,0,0,0),(8,0,3,5,6),(9,0,4,0,5),(12,0,1,5,6),(13,0,4,5,7),(14,0,3,5,8),(16,1020,3,5,9),(20,1360,4,5,9),(21,340,1,5,9),(38,680,2,5,17);
/*!40000 ALTER TABLE `pedido_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `valor_unitario` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='		';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES (1,'Produto Padrão',1),(5,'Produto2',340),(6,'Produto do Famuel',300),(7,'Produto2',350);
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-17 12:10:16
