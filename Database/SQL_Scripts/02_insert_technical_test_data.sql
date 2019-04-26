/* INSERT TEST DATA */
-- ------------------------- 80-character-line marker  ------------------------

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
  ('Training', 
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
  ('Myy',   'Korhonen', 'pikku@mail.com'),
  ('Pekka', 'Korhonen', 'pekka@mail.com'),
  ('Matti', 'Korhonen', 'matti@mail.com'),
  ('Annie', 'Korhonen', 'anna@mail.com')
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
  ('Pikku Joulu', 'Team building  before Christmas.', 100, 
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
  (101, 1001, '2019-04-24 20:46:25.6406', 'What a great idea!'),
  (101, 1002, '2019-04-24 21:46:25.6406', 'Dont think we can do this...'),
  (103, 1002, '2019-04-24 22:46:25.6406', 'Why not??!'),
  (102, 1002, '2019-04-24 23:46:25.6406', 'Because it is difficult!!')
;

INSERT INTO Comment
  (memberId, ideaId, commentText)
VALUES
  (101, 1002, 'What a great idea!'),
  (101, 1001, 'Dont think we can do this...'),
  (103, 1002, 'Why not again??!'),
  (102, 1002, 'TEST'),
  (104, 1002, 'TEST2'),
  (105, 1002, 'TEST3')
;

/* END */
