/* CREATE TABLES */

CREATE TABLE `Category` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(320) NOT NULL,
	`description` VARCHAR(320) NOT NULL,
	`budgetLimit` DECIMAL(19,4) NOT NULL,
	`isActive` TINYINT NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;

/*
CREATE TABLE `Member` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(200) NOT NULL,
	`email` VARCHAR(400) NOT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1000
;

CREATE TABLE `Idea` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(200) NOT NULL,
	`description` VARCHAR(1500) NOT NULL,
	`budget` DECIMAL(19,4) NOT NULL,
	`isReadyForComments` BIT(1) NOT NULL DEFAULT 0,
	`peopleNeeded` INT(11) NOT NULL DEFAULT 1,
	`creationDate` DATE NOT NULL,
	`isModified` DATETIME NOT NULL,
	`categoryId` INT(11),
	PRIMARY KEY (`id`),
	INDEX `Idea_Category` (`categoryId`),
	CONSTRAINT `Idea_Category`
		FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`)
		ON DELETE SET NULL
		ON UPDATE RESTRICT
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;

CREATE TABLE `Member_Idea` (
	`memberId` INT(11) NOT NULL,
	`ideaId` INT(11) NOT NULL,
	PRIMARY KEY (`memberId`, `ideaId`),
	INDEX `MemberIdea_Idea` (`ideaId`),
	CONSTRAINT `MemberIdea_Idea`
		FOREIGN KEY (`ideaId`)
		REFERENCES `Idea` (`id`)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT,
	CONSTRAINT `MemberIdea_Member`
		FOREIGN KEY (`memberId`)
		REFERENCES `Member` (`id`)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `Comment` (
	`memberId` INT(11) NOT NULL,
	`ideaId` INT(11) NOT NULL,
	`commentTimeStamp` DATETIME NOT NULL,
	`commentLine` VARCHAR(200) NOT NULL,
	PRIMARY KEY (`memberId`, `ideaId`, `commentTimeStamp`),
	INDEX `Comment_Idea` (`ideaId`),
	CONSTRAINT `Comment_Member`
		FOREIGN KEY (`memberId`)
		REFERENCES `Member` (`id`)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT,
	CONSTRAINT `Comment_Idea`
		FOREIGN KEY (`ideaId`)
		REFERENCES `Idea` (`id`)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
*/

/* END */