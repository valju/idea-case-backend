/* Sample queries TEMPLATE - CREATE SOME OF THESE TO TEST THE DATABASE */
-- ------------------------- 80-character-line marker  ------------------------

-- CATEGORY QUERIES
DESCRIBE Category;
SELECT * FROM Category;

-- OTHER random query examples

-- Two SQL query examples that are easy to digest/read
-- Not perfect nor obligatory format, but look at the idea

-- Everything is under SELECT => indent one level to the right
--   JOIN is kind of child of FROM => indent one level more
--   AND is child of WHERE => indent one level
--    => easier to read

-- (Notice also how NULLs are handled _first_ in conditions)

-- ; at the end is not part of the SQL statement, but allows
-- the database to run several statements as a longer script

SELECT a.x, a.y, b.name AS "Beeee", c.name AS "Ceeee"
  FROM   Aaaaa a
    JOIN Beeee b   ON (a.id      = b.aaaaaId)
    JOIN Ceeee c   ON (b.ceeeeId = c.id)
  WHERE a.x IS NOT NULL
    AND	(b.name LIKE 'S%'   OR   a.x > 0)
  ORDER BY a.x DESC, b.name ASC
;

-- Similar, but the column list divided on mutiple lines. Sometimes this way

SELECT
    a.x    AS "Longish name",
    a.y    AS "Even longer name",
    b.name AS "Beeee",
    c.name AS "Ceeee"
  FROM   Aaaaa a
    JOIN Beeee b   ON (a.id      = b.aaaaaId)
    JOIN Ceeee c   ON (b.ceeeeId = c.id)
  WHERE a.x IS NOT NULL
    AND	(b.name LIKE 'S%'   OR   a.x > 0)
  ORDER BY a.x DESC, b.name ASC
;


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
