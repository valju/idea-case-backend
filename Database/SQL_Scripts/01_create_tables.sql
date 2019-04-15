/* CREATE TABLES */
-- ------------------------- 80-character-line marker  ------------------------

CREATE TABLE Category (
	id						INTEGER				NOT NULL		AUTO_INCREMENT,
	name					VARCHAR(255)	NOT NULL 		UNIQUE,
	description 	VARCHAR(255) 	NOT NULL,
	budgetLimit 	DECIMAL(19,4) NOT NULL,
	isActive 			BOOLEAN				NOT NULL 		DEFAULT FALSE,

	CONSTRAINT PK_Category PRIMARY KEY (id)
) ENGINE=InnoDB;
ALTER TABLE Category AUTO_INCREMENT=1;

/* TODO: Other tables following the model above */

/*
CREATE TABLE Member (
	id INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR(200) NOT NULL,
	email VARCHAR(400) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB;
ALTER TABLE Member AUTO_INCREMENT=101;

CREATE TABLE Idea (
	id INTEGER NOT NULL AUTO_INCREMENT,
	title VARCHAR(200) NOT NULL,
	description VARCHAR(1500) NOT NULL,
	budget DECIMAL(19,4) NOT NULL,
	isReadyForComments BIT(1) NOT NULL DEFAULT 0,
	peopleNeeded INTEGER NOT NULL DEFAULT 1,
	creationDate DATE NOT NULL,
	isModified DATETIME NOT NULL,
	categoryId INTEGER,
	PRIMARY KEY (id),
	INDEX Idea_Category (categoryId),
	CONSTRAINT Idea_Category
		FOREIGN KEY (categoryId) REFERENCES Category (id)
		ON DELETE SET NULL
		ON UPDATE RESTRICT
) ENGINE=InnoDB;
ALTER TABLE Idea AUTO_INCREMENT=1001;

CREATE TABLE Idea_Member (
	ideaId INTEGER NOT NULL,
	memberId INTEGER NOT NULL,
	PRIMARY KEY (memberId, ideaId),
	INDEX MemberIdea_Idea (ideaId),
	CONSTRAINT MemberIdea_Idea
		FOREIGN KEY (ideaId)
		REFERENCES Idea (id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT,
	CONSTRAINT MemberIdea_Member
		FOREIGN KEY (memberId)
		REFERENCES Member (id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE Comment (
	memberId INTEGER NOT NULL,
	ideaId INTEGER NOT NULL,
	commentTimeStamp DATETIME NOT NULL,
	commentLine VARCHAR(200) NOT NULL,
	PRIMARY KEY (memberId, ideaId, commentTimeStamp),
	INDEX Comment_Idea (ideaId),
	CONSTRAINT Comment_Member
		FOREIGN KEY (memberId)
		REFERENCES Member (id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT,
	CONSTRAINT Comment_Idea
		FOREIGN KEY (ideaId)
		REFERENCES Idea (id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
) ENGINE=InnoDB;
*/

/* CREATE TABLES  Notes */
-- ------------------------- 80-character-line marker  ------------------------

/* TODO: 
 - Foreign key policies for each table. Based on the business case of course!
 Options e.g.
 DCA = ON DELETE CASCADE = On the Deletion of mother row, 
                           cascade delete to child rows too.
 DNA = ON DELETE NO ACTION 
	 = ON DELETE RESTRICT = Forbid deletion of mother row, if children exist
 DSN = ON DELETE SET NULL = On the Deletion of mother row, 
                            set child rows' foreign keys to NULL
 
 - Natural lengths of columns in this version of MariaDB?
 255 still? or 256?
 - Email address standard max length?
 
 - VARCHAR(20000) still instead of MAX? 
  
 - an example of working  bool:  
     isUsed BOOLEAN         NOT NULL,   TRUE,FALSE,(NULL if allowed)
     ((((or BIT(1)     with values 0 or 1, (NULL if allowed?))))
 - date and time:
    Does this work, documentation says only after 10.1.xxxx,
     arrivalTime DATETIME,     value '2019-12-31 15:48:59' 
    Documentation says that DATE should work fine, if only need date:
    '2019-12-31'
 - What is the international money datatype?
   DECIMAL(19,4) seems to be close to the truth!!! If no other reasons,
   use that!!!
*/

/* END */