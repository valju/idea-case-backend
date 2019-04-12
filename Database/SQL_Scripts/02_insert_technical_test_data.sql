/* INSERT TEST DATA */

INSERT INTO `Category`
  (`name`, `description`, `budgetLimit`, `isActive`)
VALUES
  ('Outdoors', 'Outdoor activities, e.g. cycling through the hills.', 1000, 1),
  ('Exercises', 'Physical, mental and spriritual exercises carried out in groups in the open lawn.', 500, 1),
  ('Recreation', 'Recreational activities like movies, swimming, touring etc.', 2000, DEFAULT),
  ('Training', 'Training for new technologies', 2500, 1)
;

/*
INSERT INTO `Member`
  (`name`, `email`)
VALUES
  ('Sonja', 'sonja@mail.com'),
  ('Myy', 'pikku@mail.com'),
  ('Pekka', 'pekka@mail.com'),
  ('Matti', 'matti@mail.com'),
  ('Annie', 'anna@mail.com')
;

INSERT INTO `Idea`
  (`title`, `description`, `budget`, `isReadyForComments`, `peopleNeeded`, `creationDate`, `isModified`, `categoryId`)
VALUES
  ('Football Tourney', 'An indoor football tournament.', '150', b'1', '10', '2019-04-03', '2019-04-03 16:20:22', '101'),
  ('Lapland Extravaganza', 'Excursion to North Finland.', '500', b'1', '5', '2019-04-03', '2019-04-03 16:20:23', '103'),
  ('Baltic Crossing', 'Beer trip to Estonia.', '250', b'1', '5', '2019-04-03', '2019-04-03 16:23:25', '103'),
  ('Pikku Joulu', 'Team building  before Christmas.', '100', b'1', '10', '2019-04-03', '2019-04-03 16:24:29', '100'),
  ('Le Tour', 'Follow Tour de France caravan.', '1000', b'1', '3', '2019-04-03', '2019-04-03 16:48:29', '103')
;

INSERT INTO `Member_Idea`
  (`memberId`, `ideaId`)
VALUES
  ('1003', '1'),
  ('1001', '2'),
  ('1002', '3'),
  ('1002', '4'),
  ('1000', '5')
;

INSERT INTO `Comment`
  (`memberId`, `ideaId`, `commentTimeStamp`, `commentLine`)
VALUES
  ('1001', '1', '2019-04-03 16:59:10', 'What a great idea!'),
  ('1003', '2', '2019-04-03 17:23:16', 'Dont think we can do this...'),
  ('1001', '2', '2019-04-03 18:52:50', 'Why not??!')
;

/* END */
