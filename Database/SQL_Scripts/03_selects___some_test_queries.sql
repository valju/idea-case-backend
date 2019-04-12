/* Sample queries TEMPLATE - CREATE SOME OF THESE TO TEST THE DATABASE */
-- ------------------------- 80-character-line marker  ------------------------

-- CATEGORY QUERIES
DESCRIBE Category;
SELECT * FROM Category;

-- OTHER random query examples

SELECT 
    a.x, 
    a.y,
    b.name AS "Beeee",
    c.name AS "Ceeee"  
  FROM Aaaaa a 
    JOIN Beeee b  ON (a.id = b.aaaaaId)
    JOIN Ceeee c  ON (b.ceeeeId = c.id)
  WHERE b.name LIKE 'S%';
  

-- Some random query examples

SELECT 
    CONCAT(e.name, ' ', p.name) AS "asdfasdf",
    p.name AS "afdsdfsdsfdf",
    c.name AS "asdf"  
  FROM Eeeee e 
    JOIN Peeee p  ON (e.id = p.peeeeId)
    JOIN Ceeee c   ON (p.ceeeeId = c.id)
  WHERE e.name LIKE 'S%'
      AND
        p.id IN (SELECT DISTINCT 
                     peeeeId 
                   FROM Deeee);