-- INSERT TEST DATA 
-- ------------------------- 80-character-line marker  ------------------------
USE casedb;   -- Note! Is this same as your schema name? Change if not!

-- Delete would not reset the AUTOINCREMENT counters. This helps:
DELETE FROM Comment;
ALTER TABLE Comment AUTO_INCREMENT=10001;

DELETE FROM Idea_Member;
-- This is a pure join table, joinin Member to Idea member has worked towards,
-- with composite PK formed from two FKs. Thus no auto-increment.

DELETE FROM Idea;
ALTER TABLE Idea AUTO_INCREMENT=1001;

DELETE FROM Member;
ALTER TABLE Member AUTO_INCREMENT=101;

DELETE FROM Category;
ALTER TABLE Category AUTO_INCREMENT=1;

-- -------------------------------------------------

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
  ('Donnie', 'Schtrumph', 'mememememe@whitehut.com'),
  ('Jaska', 'Jokinen', 'jokisenjaska@hotmail.com')
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
    FALSE,  10,   '2020-03-24', '2020-03-24 16:24:29', 1),
  ('Le Tour',     'Follow Tour de France caravan.', 1000,
    TRUE,   3,    '2021-10-11', '2021-10-11 16:48:29', 3),
  ('Going to forest',     'Orienteering or hiking.', 15,
    TRUE,   1,    '2022-05-13', '2022-05-13 16:48:29', 3)
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