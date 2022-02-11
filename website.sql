-- MySQL Script generated by MySQL Workbench
-- ven. 28 janv. 2022 12:03:17
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema site_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema site_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `site_db` ;
USE `site_db` ;

-- -----------------------------------------------------
-- Table `site_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_db`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `imguser` VARCHAR(255) NOT NULL,
  `pseudo` VARCHAR(100) NOT NULL,
  `firstname` VARCHAR(100) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `isAdmin` TINYINT(1) NOT NULL DEFAULT 0,
  `isBan` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `pseudo_UNIQUE` (`pseudo` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `site_db`.`pics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_db`.`pics` (
  `idphotos` INT NOT NULL AUTO_INCREMENT,
  `photo` VARCHAR(255) NOT NULL,
  `authorname` VARCHAR(100) NOT NULL,
  `datephoto` timestamp not null default current_timestamp on update current_timestamp,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`idphotos`),
  INDEX `fk_pics_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_pics_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `site_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `site_db`.`articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_db`.`articles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `imgarticle` VARCHAR(255) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `dateart` timestamp not null default current_timestamp,
  `dateedit` timestamp not null default current_timestamp on update current_timestamp,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_articles_user1_idx` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `site_db`.`commentaires`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_db`.`commentaires` (
  `idcommentaire` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NOT NULL,
  `pseudouser` VARCHAR(255) NOT NULL,
  `imguser` VARCHAR(255) NOT NULL,
  `datecom` timestamp not null default current_timestamp on update current_timestamp,
  `user_id` INT NOT NULL,
  `articles_id` INT NOT NULL,
  PRIMARY KEY (`idcommentaire`),
  INDEX `fk_commentaires_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_commentaires_articles1_idx` (`articles_id` ASC) VISIBLE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `site_db`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_db`.`messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NOT NULL,
  `author` VARCHAR(255) NOT NULL,
  `datemess` timestamp not null default current_timestamp on update current_timestamp,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;




SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
