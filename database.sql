-- CREATE DATABASE "saga_movies_weekend"


CREATE TABLE "movies" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(120) NOT NULL,
  "poster"  VARCHAR(120) NOT NULL,
  "description" TEXT NOT NULL
);


CREATE TABLE "genres" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(80) NOT NULL
);


-- JUNCTION TABLE
-- Movies can have multiple genres and each genre can be applied to multiple movies
-- This is many-to-many!
CREATE TABLE "movies_genres" (
  "id" SERIAL PRIMARY KEY,
  "movie_id" INT REFERENCES "movies" NOT NULL,
  "genre_id" INT REFERENCES "genres" NOT NULL
);

--------[ DATA! ]---------

-- starter movies
INSERT INTO "movies" ("title", "poster", "description")
VALUES 
('Everything Everywhere All at Once', 'https://image.tmdb.org/t/p/original//w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg', 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what''s important to her by connecting with the lives she could have led in other universes.'),
('Her', 'https://image.tmdb.org/t/p/original//yk4J4aewWYNiBhD49WD7UaBBn37.jpg', 'In the not so distant future, Theodore, a lonely writer purchases a newly developed operating system designed to meet the user's every needs. To Theodore's surprise, a romantic relationship develops between him and his operating system. This unconventional love story blends science fiction and romance in a sweet tale that explores the nature of love and the ways that technology isolates and connects us all.'),
('Nope', 'https://image.tmdb.org/t/p/original//AcKVlWaNVVVFQwro3nLXqPljcYA.jpg', 'Residents in a lonely gulch of inland California bear witness to an uncanny, chilling discovery.'),
('Spirited Away', 'https://image.tmdb.org/t/p/original//39wmItIWsg5sZMyRUHLkWBcuVCM.jpg', 'A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.'),
('Lady Bird', 'https://image.tmdb.org/t/p/original//iySFtKLrWvVzXzlFj7x1zalxi5G.jpg', 'Lady Bird McPherson, a strong willed, deeply opinionated, artistic 17 year old comes of age in Sacramento. Her relationship with her mother and her upbringing are questioned and tested as she plans to head off to college.'),
('Inception', 'https://image.tmdb.org/t/p/original//8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg', 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: "inception", the implantation of another person''s idea into a target''s subconscious.'),
('Get Out', 'https://image.tmdb.org/t/p/original//tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg', 'Chris and his girlfriend Rose go upstate to visit her parents for the weekend. At first, Chris reads the family's overly accommodating behavior as nervous attempts to deal with their daughter's interracial relationship, but as the weekend progresses, a series of increasingly disturbing discoveries lead him to a truth that he never could have imagined.'),
('Parasite', 'https://image.tmdb.org/t/p/original//7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', 'All unemployed, Ki-taek''s family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.' ),
('The Shining', 'https://image.tmdb.org/t/p/original//nRj5511mZdTl4saWEPoj9QroTIu.jpg', 'Jack Torrance accepts a caretaker job at the Overlook Hotel, where he, along with his wife Wendy and their son Danny, must live isolated from the rest of the world for the winter. But they aren''t prepared for the madness that lurks within.');


-- starter genres
INSERT INTO "genres" ("name")
VALUES 
('Adventure'), --1
('Animated'), --2
('Superhero'), --3
('Comedy'), --4
('Drama'), --5
('Romance'), --6
('Fantasy'),  --7
('Horror'),   --8      
('Science Fiction'),  --9
('LGBTQIA+'), --10
('Thriller'),      --11
('Unspecified') --12;        


-- starter movies and genres data
INSERT INTO "movies_genres" ("movie_id", "genre_id")
VALUES 
(1,9),(1,5),(1,10), --EEAAW
(2,5), (2,6), (2,9), --HER
(3,9), (3,11), --NOPE
(4,1), (4,7), (4,2), --SPIRITEDAWAY
(5,5), (5,4), --LADYBIRD
(6,11), (6,9), (6,7), --INCEPTION
(7,8), (7,11), (7,5), --GETOUT
(8,11), (8,4), 	--PARASITE
(9,8), (9,11),(9,7);   --THESHINING   


-- SQL QUERY SERVERSIDE
SELECT 
      movies.id,
      title,
      description,
      poster,
      ARRAY_AGG (genres.name) genres
    FROM "movies"
      JOIN movies_genres
        ON movies.id=movies_genres.movie_id
      JOIN genres
      	ON movies_genres.genre_id = genres.id
      WHERE movies.id=1
      GROUP BY movies.id, title, description, poster
;

