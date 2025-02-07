DROP DATABASE if exists code_pills;

CREATE DATABASE IF NOT EXISTS code_pills DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
USE code_pills;
CREATE TABLE IF NOT EXISTS listado_clientes(
		id INT AUTO_INCREMENT,
		email VARCHAR(255) NOT NULL,
		name VARCHAR(255) NOT NULL,
		city VARCHAR(255) NOT NULL,
        telephone VARCHAR(255) NOT NULL,
		PRIMARY KEY (id)
)  ENGINE=INNODB;