/* DROP TABLES */
-- ------------------------- 80-character-line marker  ------------------------

USE casedb;

DROP TABLE IF EXISTS Idea_Member;
DROP TABLE IF EXISTS Comment;
DROP TABLE IF EXISTS Idea;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Member;

/* END */

/* CREATE TABLES */
-- ------------------------- 80-character-line marker  ------------------------
USE casedb;

CREATE TABLE Category (
	id				INTEGER			NOT NULL		AUTO_INCREMENT,
	name			VARCHAR(255)	NOT NULL 		UNIQUE,
	description 	VARCHAR(255) 	,
	budgetLimit 	DECIMAL(19,4) 	,
	isActive 		BOOLEAN			NOT NULL 		DEFAULT FALSE,

	CONSTRAINT PK_Category PRIMARY KEY (id)

) ENGINE=InnoDB;
ALTER TABLE Category AUTO_INCREMENT=1;

/* MEMBER */
CREATE TABLE Member (
	id 				INTEGER 		NOT NULL 		AUTO_INCREMENT,
	firstName 		VARCHAR(50) 	NOT NULL,
	lastName 		VARCHAR(50) 	NOT NULL,
	email 			VARCHAR(255) 	NOT NULL 		UNIQUE,
	
	CONSTRAINT PK_Member PRIMARY KEY (id)

) ENGINE=InnoDB;
ALTER TABLE Member AUTO_INCREMENT=101;

/* IDEA */
CREATE TABLE Idea (
	id 				INTEGER 		NOT NULL 		AUTO_INCREMENT,
	name 			VARCHAR(255) 	NOT NULL,
	description 	VARCHAR(16000) 	NOT NULL,
	budget 			DECIMAL(19,4),
	readyForComments BOOLEAN 		NOT NULL 		DEFAULT FALSE,
	peopleNeeded 	INTEGER,
	creationDate 	DATE 			NOT NULL,
	isModified 		DATETIME 		NOT NULL,
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
		ON DELETE RESTRICT
		ON UPDATE RESTRICT

) ENGINE=InnoDB;

/* COMMENT */
CREATE TABLE Comment (
	id 					INTEGER 		NOT NULL 		AUTO_INCREMENT,
	memberId 			INTEGER 		NOT NULL,
	ideaId 				INTEGER 		NOT NULL,
	commentTimeStamp 	TIMESTAMP(3) 	NOT NULL 		DEFAULT CURRENT_TIMESTAMP,
	commentText 		VARCHAR(16000) 	NOT NULL,

	CONSTRAINT PK_Comment PRIMARY KEY (id),
	
	INDEX Comment_Idea (id),
	CONSTRAINT FK_Comment_Member
		FOREIGN KEY (memberId) REFERENCES Member (id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT,
	CONSTRAINT FK_Comment_Idea
		FOREIGN KEY (ideaId) REFERENCES Idea (id)
		ON DELETE CASCADE
		ON UPDATE RESTRICT

) ENGINE=InnoDB;
ALTER TABLE Comment AUTO_INCREMENT=10001;

/* END */

/* INSERT TEST DATA */
-- ------------------------- 80-character-line marker  ------------------------
/* TEST DATA NOT FOLLING INSTRUCTIONS COMPLETELY,
E.G THERE was NO MEMBER WITHOUT COMMENTS _AND_
idea_member markings !!!!!!*/

/* Also more clever delete with ALTER TABLE resetting AUTOINCREMENT
would be could idea */

USE casedb;

INSERT INTO Category
  (name, description, budgetLimit, isActive)
VALUES
  ('Outdoors',
    'Outdoor activities, e.g. cycling through the hills.',
    1000,     TRUE),
  ('Exercises',
    'Physical, mental and spriritual exercises carried out in groups in the open lawn.',
    500,      TRUE),
  ('Recreation',
    'Recreational activities like movies, swimming, touring etc.',
    2000,     FALSE),
  ('Educational biggotry',
    'Jaa jaa jaa',
    999,      TRUE),
  ('Outdoor Training',
    'Training here',
    100,      FALSE),
  ('Indoor training',
    'No Training here',
    100,      TRUE),
  ('A2 Training',
    'Training for new technologies',
    2500,     TRUE),
  ('No Budget', 'Category without a budget.',
    NULL,     TRUE),
  ('No Description',
    NULL,
    100,      TRUE),
  ('Dummy',
    NULL,
    NULL,     FALSE)

;

INSERT INTO Member
  (firstName, lastName, email)
VALUES
  ('Sonja', 'Korhonen', 'sonja@mail.com'),
  ('Myy',   'Järvinen', 'pikku@mail.com'),
  ('Kukka-Maaria', 'Pyykkönen', 'kukkis@mail.com'),
  ('Matti', 'Neupane', 'matti@mail.com'),
  ('Annie', 'Johnson-Smith', 'annie@mail.com'),
  ('Donnie', 'Schtrumph', 'mememememe@whitehut.com')
;

INSERT INTO Idea
  (name, description, budget,
   readyForComments, peopleNeeded, creationDate, isModified, categoryId)
VALUES
  ('Football Tourney', 'An indoor football tournament.', 150,
    TRUE,   10,   '2019-04-03', '2019-04-03 16:20:22', 1),
  ('Lapland Extravaganza', 'Excursion to North Finland.', 500,
    TRUE,   5,    '2019-04-03', '2019-04-03 16:20:23', 3),
  ('Baltic Crossing', 'Beer trip to Estonia.', 250,
    TRUE,   5,    '2019-04-03', '2019-04-03 16:23:25', 3),
  ('Pikkujoulut', 'Team building  before Christmas.', 100,
    FALSE,  10,   '2019-04-03', '2019-04-03 16:24:29', 1),
  ('Le Tour',     'Follow Tour de France caravan.', 1000,
    TRUE,   3,    '2019-04-03', '2019-04-03 16:48:29', 3)
;

INSERT INTO Idea_Member
  (memberId, ideaId)
VALUES
  (103, 1001),
  (101, 1002),
  (102, 1003),
  (102, 1004),
  (101, 1005)
;

INSERT INTO Comment
  (memberId, ideaId, commentTimeStamp, commentText)
VALUES
  (101, 1001, '2019-04-24 20:46:25.640', 'Do you feel lucky, poo-tin?'),
  (101, 1002, '2019-04-24 21:46:25.640', 'No, i am your father'),
  (103, 1002, '2019-04-24 22:46:25.640', 'Where have all the flowers gone?'),
  (105, 1002, '2019-04-24 09:46:25.640', 'Oh, say can you see, by the dawn early light?'),
  (101, 1001, '2019-04-27 07:46:25.640', 'Ignorance is bliss'),
  (102, 1002, '2019-04-21 01:13:25.640', 'This is one longer comment to see what it looks like, oh boy, it is glorious, isnt it, just absolutely fabulous!'),
  (105, 1002, '2019-03-03 22:46:25.640', 'Another one bites the dust'),
  (102, 1002, '2019-05-06 09:20:25.640', 'Shrek is love, Shrek is life <3'),
  (104, 1001, '2019-02-21 10:46:25.640', 'Dearest creature in creation, study English pronunciation. I will teach you in my verse, I will keep you, Suzy, busy, make your head with heat grow dizzy. Tear in eye, your dress will tear. So shall I! Oh hear my prayer.'),
  (101, 1002, '2019-02-21 21:13:25.640', 'Im starting to run out of ideas'),
  (105, 1002, '2019-05-03 22:46:25.640', 'He is not the Messi, he is a very bad player!'),
  (102, 1002, '2019-05-03 09:20:25.640', 'Help!')
;

/* END */

