/* INSERT TEST DATA */
-- ------------------------- 80-character-line marker  ------------------------
/* TEST DATA NOT FOLLING INSTRUCTIONS COMPLETELY,
E.G THERE was NO MEMBER WITHOUT COMMENTS _AND_
idea_member markings !!!!!!*/

/* Also more clever delete with ALTER TABLE resetting AUTOINCREMENT
would be could idea */

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
  ('Treining E',
    'Training here',
    100,      TRUE),
  ('Training A1',
    'No Treining here',
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
  (101, 1001, '2019-04-24 20:46:25.640', 'Do you feel lucky, punk?'),
  (101, 1002, '2019-04-24 21:46:25.640', 'No, i am your father'),
  (103, 1002, '2019-04-24 22:46:25.640', 'Where have all the flowers gone?'),
  (105, 1002, '2019-04-24 09:46:25.640', 'Oh, say can you see, by the dawn early light?'),
  (101, 1001, '2019-04-27 07:46:25.640', 'Ignorance is bliss'),
  (102, 1002, '2019-04-21 01:13:25.640', 'This is one longer comment to see what it looks like, oh boy, it is glorious, isnt it, just absolutely fabulous!'),
  (105, 1002, '2019-03-03 22:46:25.640', 'Another one bites the dust'),
  (102, 1002, '2019-05-06 09:20:25.640', 'Shrek is love, Shrek is life <3'),
  (104, 1001, '2019-02-21 10:46:25.640', 'Dearest creature in creation, study English pronunciation. I will teach you in my verse, sounds like corpse, corps, horse, and worse. I will keep you, Suzy, busy, make your head with heat grow dizzy. Tear in eye, your dress will tear. So shall I! Oh hear my prayer.'),
  (101, 1002, '2019-02-21 21:13:25.640', 'Im starting to run out of ideas'),
  (105, 1002, '2019-05-03 22:46:25.640', 'He is not the Messiah, he is a very naughty boy!'),
  (102, 1002, '2019-05-03 09:20:25.640', 'Help!')
;

INSERT INTO Comment
  (memberId, ideaId, commentText)
VALUES
  (101, 1002, 'What a great idea!'),
  (101, 1001, 'Dont think we can do this...'),
  (103, 1002, 'Why not again??!'),
  (102, 1002, 'We need to go deeper!'),
  (104, 1002, 'Its over 9000!'),
  (105, 1002, 'Everything is terrible'),
  (101, 1002, 'Memes!'),
  (101, 1002, 'Love is all around us...'),
  (103, 1002, 'Or so the feeling goes.'),
  (102, 1002, 'Im just a poor boy nobody loves me...'),
  (104, 1001, 'Mamma mia!'),
  (105, 1001, 'Nepal is a beautiful country.'),
  (101, 1003, 'No kitty! Its my pot-pie!'),
  (101, 1001, 'Ni!'),
  (103, 1001, 'Your mother was a hamster and your father smelt of elderberries!'),
  (102, 1005, 'Soapy chicken wheel.'),
  (104, 1005, 'You know nothing, Jon Snow...'),
  (105, 1002, 'Me gusta.')
;

/* END */
