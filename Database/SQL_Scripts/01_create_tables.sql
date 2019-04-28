/* CREATE TABLES */
-- ------------------------- 80-character-line marker  ------------------------

CREATE TABLE Category (
	id						INTEGER					NOT NULL		AUTO_INCREMENT,
	name					VARCHAR(255)		NOT NULL 		UNIQUE,
	description 	VARCHAR(255) 		NOT NULL,
	budgetLimit 	DECIMAL(19,4) 	NOT NULL,
	isActive 			BOOLEAN					NOT NULL 		DEFAULT FALSE,

	CONSTRAINT PK_Category PRIMARY KEY (id)

) ENGINE=InnoDB;
ALTER TABLE Category AUTO_INCREMENT=1;

/* MEMBER */
CREATE TABLE Member (
	id 						INTEGER 				NOT NULL 		AUTO_INCREMENT,
	firstName 		VARCHAR(50) 		NOT NULL,
	lastName 			VARCHAR(50) 		NOT NULL,
	email 				VARCHAR(255) 		NOT NULL 		UNIQUE,
	
	CONSTRAINT PK_Member PRIMARY KEY (id)

) ENGINE=InnoDB;
ALTER TABLE Member AUTO_INCREMENT=101;

/* IDEA */
CREATE TABLE Idea (
	id 						INTEGER 				NOT NULL 		AUTO_INCREMENT,
	name 					VARCHAR(255) 		NOT NULL,
	description 	VARCHAR(20000) 	NOT NULL,
	budget 				DECIMAL(19,4),
	readyForComments BOOLEAN 			NOT NULL 		DEFAULT FALSE,
	peopleNeeded 	INTEGER,
	creationDate 	DATE 						NOT NULL,
	isModified 		DATETIME 				NOT NULL,
	categoryId 		INTEGER,

	CONSTRAINT PK_Idea PRIMARY KEY (id),
	
	INDEX Idea_Category (categoryId),
	CONSTRAINT FK_Idea_Category
		FOREIGN KEY (categoryId) REFERENCES Category (id)
		ON DELETE SET NULL
		ON UPDATE RESTRICT

) ENGINE=InnoDB;
ALTER TABLE Idea AUTO_INCREMENT=1001;

/* IDEA_MEMBER */
CREATE TABLE Idea_Member (
	ideaId INTEGER NOT NULL,
	memberId INTEGER NOT NULL,

	CONSTRAINT PK_Idea_Member PRIMARY KEY (memberId, ideaId),
	
	INDEX IdeaMember_Idea (ideaId),
	CONSTRAINT FK_IdeaMember_Idea
		FOREIGN KEY (ideaId) REFERENCES Idea (id)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,
	CONSTRAINT FK_IdeaMember_Member
		FOREIGN KEY (memberId) REFERENCES Member (id)
		ON DELETE CASCADE
		ON UPDATE RESTRICT

) ENGINE=InnoDB;

/* COMMENT */
CREATE TABLE Comment (
	memberId INTEGER NOT NULL,
	ideaId INTEGER NOT NULL,
	commentTimeStamp DATETIME NOT NULL,
	commentText VARCHAR(20000) NOT NULL,

	CONSTRAINT PK_Comment PRIMARY KEY (memberId, ideaId, commentTimeStamp),
	
	INDEX Comment_Idea (ideaId),
	CONSTRAINT FK_Comment_Member
		FOREIGN KEY (memberId) REFERENCES Member (id)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,
	CONSTRAINT FK_Comment_Idea
		FOREIGN KEY (ideaId) REFERENCES Idea (id)
		ON DELETE CASCADE
		ON UPDATE RESTRICT

) ENGINE=InnoDB;

/* END */