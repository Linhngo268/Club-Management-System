/* terminal $ mysql < db/db_insert_test_data.sql */

USE IanKnightAppreciationDB;

-- LYN: I use my personal email for Johndoe just for testing-will change it later

/* Inserting into Users */
INSERT INTO Users (first_name, last_name, username, email, password, phone_number, is_admin)
VALUES
    ('John',        'Doe',      'johndoe',  'cunlinh268@gmail.com',          'password123',      '1234567890', false),   -- 1
    ('Jane',        'Smith',    NULL,       'janesmith@example.com',        'userpass123',      '1234509876', false),   -- 2
    ('Ian',         'Knight',   NULL,       'ianknight@example.com',        'adminpassword',    '9876543210', true),    -- 3
    ('Sarah',       'Johnson',  'sarahj',   'sarahjohnson@example.com',     'pass123',          '9876543210', false),   -- 4
    ('Michael',     'Brown',    'mikeb',    'michaelbrown@example.com',     'userpass456',      '1234509876', false),   -- 5
    ('Emily',       'Davis',    NULL,       'emilydavis@example.com',       'password789',      '2345678901', false),   -- 6
    ('David',       'Wilson',   'davidw',   'davidwilson@example.com',      'userpass789',      '3456789012', false),   -- 7
    ('Olivia',      'Anderson', NULL,       'oliviaanderson@example.com',   'pass456',          '4567890123', false),   -- 8
    ('Oliver',      'Anderson', 'olivera',  'oliveranderson@example.com',   'userpass246',      '0987654321', true),    -- 9
    ('Matthew',     'Taylor',   'mattt',    'matthewtaylor@example.com',    'userpass012',      '5678901234', false),   -- 10
    ('Emma',        'Johnson',  'emmaj',    'emmajohnson@example.com',      'password789',      '6789012345', false),   -- 11
    ('Daniel',      'Clark',    NULL,       'danielclark@example.com',      'userpass345',      '7890123456', false),   -- 12
    ('Sophia',      'Martinez', 'sophiam',  'sophiamartinez@example.com',   'pass567',          '8901234567', false),   -- 13
    ('Ethan',       'Harris',   'ethanh',   'ethanharris@example.com',      'userpass678',      '9012345678', false),   -- 14
    ('Liam',        'Walker',   NULL,       'liamwalker@example.com',       'userpass789',      '0987654321', false),   -- 15
    ('Henry',       'Hall',     'henryh',   'henryhall@example.com',        'userpass690',      '3210987654', true),    -- 16
    ('Ava',         'Thompson', 'avat',     'avathompson@example.com',      'pass123',          '9876543210', false),   -- 17
    ('Noah',        'White',    'noahw',    'noahwhite@example.com',        'userpass456',      '0123456789', false),   -- 18
    ('Isabella',    'Lewis',    NULL,       'isabellalewis@example.com',    'password789',      '8765432109', false),   -- 19
    ('James',       'Martin',   'jamesm',   'jamesmartin@example.com',      'userpass012',      '7654321098', false),   -- 20
    ('Mia',         'Clark',    NULL,       'miaclark@example.com',         'pass456',          '6543210987', false),   -- 21
    ('Benjamin',    'Walker',   'benw',     'benjaminwalker@example.com',   'userpass345',      '5432109876', false),   -- 22
    ('Charlotte',   'Harris',   NULL,       'charlotteharris@example.com',  'pass567',          '4321098765', false),   -- 23
    ('Mason',       'Davis',    'masond',   'masondavis@example.com',       'userpass678',      '3210987654', false),   -- 24
    ('Sophia',      'Lee',      NULL,       'sophialee@example.com',        'password890',      '2109876543', false),   -- 25
    ('Emma',        'Jackson',  NULL,       'emmajackson@example.com',      'pass890',          '9876543210', false),   -- 26
    ('William',     'Wilson',   'willw',    'williamwilson@example.com',    'userpass357',      '0123456789', true),    -- 27
    ('Ava',         'Brown',     NULL,      'avabrown@example.com',         'password654',      '8765432109', false),   -- 28
    ('James',       'Miller',   'jamesm',   'jamesmiller@example.com',      'userpass468',      '7654321098', true),    -- 29
    ('Olivia',      'Taylor',   NULL,       'oliviataylor@example.com',     'pass012',          '6543210987', false),   -- 30
    ('Benjamin',    'Lewis',    'benl',     'benjaminlewis@example.com',    'userpass579',      '5432109876', true),    -- 31
    ('Sophia',      'Clark',    NULL,       'sophiaclark@example.com',      'pass567',          '4321098765', false),   -- 32
    ('Amelia',      'Green',    NULL,       'ameliagreen@example.com',      'password123',      '2109876543', false);   -- 33

/* Inserting into Clubs */
INSERT INTO Clubs (name, description)
VALUES
    ('The Ian Knight Appreciation Club',               'The club in which we appericate our overlord Ian Knight.'),                                                           -- 1
    ('Photography Club',                               'A club for photography lovers to share their passion.'),                                   -- 2
    ('Music Club',                                     'A club for music enthusiasts to explore and create music together.'),                      -- 3
    ('Book Club',                                      'A club for book lovers to discuss and share their favorite books.'),                       -- 4
    ('Art Club',                                       'A club for artists to showcase their artwork and engage in creative activities.'),         -- 5
    ('Sports Club',                                    'A club for sports enthusiasts to participate in various sports and competitions.'),        -- 6
    ('Cooking Club',                                   'A club for cooking enthusiasts to learn and experiment with different recipes.'),          -- 7
    ('Dance Club',                                     'A club for dancers to practice and perform various dance styles.'),                        -- 8
    ('Film Club',                                      'A club for movie lovers to watch and discuss films from different genres.'),               -- 9
    ('Writing Club',                                   'A club for writers to improve their writing skills and share their works.'),               -- 10
    ('Gaming Club',                                    'A club for gamers to play and discuss video games.'),                                      -- 11
    ('Outdoor Adventure Club',                         'A club for outdoor enthusiasts to engage in adventurous activities and explore nature.');  -- 12

/* Inserting into ClubMembers */
INSERT INTO ClubMembers (user_id, club_id, is_manager)
VALUES
    (1,     1,  true),      -- John Doe         - Chess Club
    (26,    1,  false),     -- Emma Jackson     - Chess Club
    (27,    1,  false),     -- William Wilson   - Chess Club
    (2,     1,  false),     -- Jane Smith       - Chess Club
    (4,     1,  false),     -- Sarah Johnson    - Chess Club
    (1,     2,  false),     -- John Doe         - Photography Club
    (3,     2,  true),      -- Ian Knight       - Photography Club
    (5,     2,  false),     -- Michael Brown    - Photography Club
    (28,    2,  false),     -- Ava Brown        - Photography Club
    (29,    2,  false),     -- James Miller     - Photography Club
    (6,     3,  false),     -- Emily Davis      - Music Club
    (7,     3,  true),      -- David Wilson     - Music Club
    (30,    3,  false),     -- Olivia Taylor    - Music Club
    (31,    3,  false),     -- Benjamin Lewis   - Music Club
    (8,     4,  false),     -- Olivia Anderson  - Book Club
    (9,     4,  false),     -- Oliver Anderson  - Book Club
    (32,    4,  false),     -- Sophia Clark     - Book Club
    (33,    4,  true),      -- Amelia Green     - Book Club
    (10,    5,  false),     -- Matthew Taylor   - Art Club
    (11,    5,  true),      -- Emma Johnson     - Art Club
    (14,    5,  false),     -- Ethan Harris     - Art Club
    (15,    5,  false),     -- Liam Walker      - Art Club
    (12,    6,  true),      -- Daniel Clark     - Sports Club
    (13,    6,  false),     -- Sophia Martinez  - Sports Club
    (16,    6,  false),     -- Henry Hall       - Sports Club
    (17,    6,  false),     -- Ava Thompson     - Sports Club
    (14,    7,  false),     -- Ethan Harris     - Cooking Club
    (15,    7,  true),      -- Liam Walker      - Cooking Club
    (18,    7,  false),     -- Noah White       - Cooking Club
    (19,    7,  false),     -- Isabella Lewis   - Cooking Club
    (16,    8,  false),     -- Henry Hall       - Dance Club
    (17,    8,  false),     -- Ava Thompson     - Dance Club
    (20,    8,  true),      -- James Martin     - Dance Club
    (21,    8,  false),     -- Mia Clark        - Dance Club
    (18,    9,  true),      -- Noah White       - Film Club
    (19,    9,  false),     -- Isabella Lewis   - Film Club
    (20,    10, false),     -- James Martin     - Writing Club
    (21,    10, true),      -- Mia Clark        - Writing Club
    (22,    11, false),     -- Benjamin Walker  - Gaming Club
    (23,    11, true),      -- Charlotte Harris - Gaming Club
    (24,    12, true),      -- Mason Davis      - Outdoor Adventure Club
    (25,    12, false);     -- Sophia Lee       - Outdoor Adventure Club

/* Inserting into ClubEvents */
INSERT INTO ClubEvents (club_id, name, description, happening)
VALUES
    (1,     'Chess Tournament',                             'Join us for an exciting chess tournament!',                                            '2023-05-21 14:00:00'),
    (1,     'Chess Strategy Workshop',                      'Learn advanced chess strategies from expert players.',                                 '2023-05-25 18:30:00'),
    (1,     'Chess Simultaneous Exhibition',                'Test your skills against a grandmaster in a simultaneous chess exhibition.',           '2023-07-05 16:00:00'),
    (2,     'Photography Exhibition',                       'Come and admire stunning photographs taken by our club members.',                      '2023-06-02 10:00:00'),
    (2,     'Portrait Photography Workshop',                'Learn techniques for capturing captivating portraits.',                                '2023-06-10 15:30:00'),
    (2,     'Photography Workshop: Landscape Photography',  'Learn the art of capturing breathtaking landscapes through photography.',              '2023-07-08 10:30:00'),
    (2,     'Photography Photowalk: City Exploration',      'Embark on a photowalk through the city streets to capture urban scenes.',              '2023-07-18 14:00:00'),
    (3,     'Music Jam Session',                            'Bring your instrument and jam with fellow music enthusiasts.',                         '2023-06-15 19:00:00'),
    (3,     'Music Composition Masterclass',                'Learn the art of composing music from industry professionals.',                        '2023-06-20 16:00:00'),
    (3,     'Music Open Mic Night',                         'Showcase your musical talents or enjoy performances by fellow club members.',          '2023-07-12 19:00:00'),
    (3,     'Music Collaboration Session',                  'Join forces with other musicians to create collaborative music pieces.',               '2023-07-30 15:00:00'),
    (4,     'Book Discussion: "The Great Gatsby"',          'Join us for an insightful discussion about this literary classic.',                    '2023-06-05 17:30:00'),
    (4,     'Book Club Meeting',                            'Share your thoughts on the latest book we read as a club.',                            '2023-06-12 19:00:00'),
    (4,     'Book Discussion: "To Kill a Mockingbird"',     'Engage in a thought-provoking discussion about this renowned novel.',                  '2023-07-15 17:30:00'),
    (4,     'Book Club Social Gathering',                   'Join us for a casual social gathering with book-themed games and activities.',         '2023-07-25 18:30:00'),
    (5,     'Art Exhibition: "Expressions"',                'Experience a collection of diverse artworks by our talented members.',                 '2023-06-18 11:00:00'),
    (5,     'Art Workshop: Abstract Painting',              'Learn the techniques of creating captivating abstract paintings.',                     '2023-06-24 14:30:00'),
    (5,     'Art Workshop: Watercolor Techniques',          'Learn various watercolor painting techniques from a skilled artist.',                  '2023-07-20 13:00:00'),
    (6,     'Sports Day',                                   'Participate in a fun-filled day of various sports activities.',                        '2023-06-08 09:00:00'),
    (6,     'Basketball Tournament',                        'Show off your basketball skills in our exciting tournament.',                          '2023-06-14 16:00:00'),
    (6,     'Sports Tournament: Badminton',                 'Compete against other club members in an exciting badminton tournament.',              '2023-07-09 11:00:00'),
    (7,     'Cooking Class: Italian Cuisine',               'Learn how to prepare delicious Italian dishes with our experienced chefs.',            '2023-06-19 18:30:00'),
    (7,     'Baking Workshop: Cake Decorating',             'Master the art of decorating cakes with intricate designs.',                           '2023-06-27 13:00:00'),
    (7,     'Cooking Class: Thai Cuisine',                  'Discover the flavors of Thai cuisine and learn to cook delicious Thai dishes.',        '2023-07-14 16:30:00'),
    (7,     'Culinary Demo: Molecular Gastronomy',          'Witness the fascinating world of molecular gastronomy with live demonstrations.',      '2023-07-22 15:30:00'),
    (8,     'Dance Performance: Salsa Night',               'Witness thrilling salsa performances by our talented dancers.',                        '2023-06-23 20:00:00'),
    (8,     'Dance Workshop: Hip Hop',                      'Learn cool hip hop moves and grooves from professional dancers.',                      '2023-06-29 17:30:00'),
    (8,     'Dance Workshop: Contemporary Dance',           'Explore the art of contemporary dance through expressive movements.',                  '2023-07-16 14:00:00'),
    (9,     'Film Screening: "Inception"',                  'Enjoy a screening of the mind-bending film "Inception" followed by a discussion.',     '2023-06-07 19:00:00'),
    (9,     'Film Club Meeting',                            'Discuss and recommend films to fellow movie enthusiasts.',                             '2023-06-16 18:00:00'),
    (9,     'Film Screening: "The Shawshank Redemption"',   'Experience the timeless classic "The Shawshank Redemption" on the big screen.',        '2023-07-11 20:00:00'),
    (10,    'Writing Workshop: Character Development',      'Enhance your storytelling skills by mastering character development.',                 '2023-06-11 15:00:00'),
    (10,    'Writing Contest Announcement',                 'Learn about our upcoming writing contest and its guidelines.',                         '2023-06-28 12:00:00'),
    (10,    'Writing Workshop: Plot Development',           'Learn techniques to create engaging and captivating plotlines in your writing.',       '2023-07-19 18:00:00'),
    (11,    'Gaming Tournament: FIFA 23',                   'Compete against other gamers in an intense FIFA 23 tournament.',                       '2023-07-13 16:30:00'),
    (11,    'Gaming Night: Retro Games',                    'Relive the nostalgia with a night of gaming featuring retro video games.',             '2023-07-23 19:00:00'),
    (12,    'Outdoor Adventure: Hiking Trip',               'Embark on an exhilarating hiking trip to explore scenic trails.',                      '2023-07-17 09:00:00'),
    (12,    'Outdoor Photography Workshop',                 'Learn techniques for capturing stunning outdoor photographs.',                         '2023-07-27 11:30:00');

/* Inserting into ClubUpdates */
INSERT INTO ClubUpdates (club_id, name, description, posted)
VALUES
    (
        1,
        'Important Chess Club Announcement',
        'All Chess Club members are requested to attend the meeting on Friday for an important announcement.',
        '2023-07-05 10:00:00'
    ),
    (
        1,
        'Chess Club Training Session Update',
        'Please note that the chess training session originally scheduled for Wednesday has been moved to Thursday this week.',
        '2023-07-21 16:30:00'
    ),
    (
        2,
        'Club Exhibition',
        'Showcasing our best photographs at the local gallery.',
        '2023-05-30 16:00:00'
    ),
    (
        2,
        'Photography Club Meeting Reminder',
        'A friendly reminder about our Photography Club meeting tomorrow. Please bring your cameras!',
        '2023-07-08 14:30:00'
    ),
    (
        2,
        'Photography Club Photo Contest Announcement',
        'We are excited to announce our annual Photography Club photo contest. Start capturing amazing shots and stay tuned for submission guidelines.',
        '2023-07-25 09:00:00'
    ),
    (
        3,
        'Music Club Collaboration Opportunity',
        'Calling all Music Club members! We have an exciting collaboration opportunity with a local band. Interested members can sign up at the club office.',
        '2023-07-12 18:45:00'
    ),
    (
        4,
        'Book Club Book Recommendation',
        'We highly recommend "The Great Gatsby" by F. Scott Fitzgerald for our next Book Club discussion. Get your copies ready!',
        '2023-07-15 16:15:00'
    ),
    (
        4,
        'Book Club Meeting Cancellation',
        'Due to unforeseen circumstances, this week\'s Book Club meeting is canceled. We apologize for any inconvenience caused.',
        '2023-07-30 17:30:00'
    ),
    (
        5,
        'Art Club Exhibition Extension',
        'Good news! The Art Club exhibition has been extended for one more week. Make sure to visit and support your fellow artists!',
        '2023-07-19 11:30:00'
    ),
    (
        6,
        'Sports Club Schedule Change',
        'Due to unforeseen circumstances, the Sports Club practice session on Sunday will be rescheduled to Monday. Please update your calendars accordingly.',
        '2023-07-09 13:00:00'
    ),
    (
        7,
        'Cooking Club Guest Chef Workshop',
        'We are delighted to announce a special guest chef workshop next month. Stay tuned for more details and registration information.',
        '2023-07-14 15:30:00'
    ),
    (
        8,
        'Dance Club Costume Measurement',
        'Attention Dance Club members! We will be taking measurements for costumes next week. Make sure to be present during the assigned time slots.',
        '2023-07-16 17:00:00'
    ),
    (
        10,
        'Writing Club Guest Speaker',
        'We are thrilled to have a guest speaker, renowned author John Smith, at our next Writing Club meeting. Don\'t miss this opportunity to gain valuable insights!',
        '2023-07-19 14:00:00'
    ),
    (
        12,
        'Outdoor Adventure Club Hiking Trip Reminder',
        'A friendly reminder about our upcoming hiking trip this weekend. Prepare necessary gear and meet at the club entrance.',
        '2023-07-17 09:30:00'
    );

/* Inserting into EventRSVPs */
INSERT INTO EventRSVPs (user_id, event_id)
VALUES
    (1,     1),     -- John Doe         RSVPs for Chess Tournament
    (2,     1),     -- Jane Smith       RSVPs for Chess Tournament
    (3,     2),     -- Ian Knight       RSVPs for Photography Exhibition
    (4,     2),     -- Sarah Johnson    RSVPs for Photography Exhibition
    (25,    2),     -- Sophia Lee       RSVPs for Photography Photowalk: City Exploration
    (26,    2),     -- Emma Jackson     RSVPs for Photography Photowalk: City Exploration
    (5,     3),     -- Michael Brown    RSVPs for Music Jam Session
    (6,     3),     -- Emily Davis      RSVPs for Music Jam Session
    (27,    3),     -- William Wilson   RSVPs for Music Composition Masterclass
    (28,    3),     -- Ava Brown        RSVPs for Music Composition Masterclass
    (7,     4),     -- David Wilson     RSVPs for Book Discussion: "The Great Gatsby"
    (8,     4),     -- Olivia Anderson  RSVPs for Book Discussion: "The Great Gatsby"
    (29,    4),     -- James Miller     RSVPs for Book Club Meeting
    (30,    4),     -- Olivia Taylor    RSVPs for Book Club Meeting
    (9,     5),     -- Oliver Anderson  RSVPs for Art Exhibition: "Expressions"
    (10,    5),     -- Matthew Taylor   RSVPs for Art Exhibition: "Expressions"
    (31,    5),     -- Benjamin Lewis   RSVPs for Art Workshop: Abstract Painting
    (32,    5),     -- Sophia Clark     RSVPs for Art Workshop: Abstract Painting
    (11,    6),     -- Emma Johnson     RSVPs for Sports Day
    (12,    6),     -- Daniel Clark     RSVPs for Sports Day
    (33,    6),     -- Amelia Green     RSVPs for Sports Tournament: Badminton
    (10,    6),     -- Matthew Taylor   RSVPs for Sports Tournament: Badminton
    (13,    7),     -- Sophia Martinez  RSVPs for Cooking Class: Italian Cuisine
    (14,    7),     -- Ethan Harris     RSVPs for Cooking Class: Italian Cuisine
    (11,    7),     -- Emma Johnson     RSVPs for Cooking Class: Thai Cuisine
    (12,    7),     -- Daniel Clark     RSVPs for Cooking Class: Thai Cuisine
    (15,    8),     -- Liam Walker      RSVPs for Dance Performance: Salsa Night
    (16,    8),     -- Henry Hall       RSVPs for Dance Performance: Salsa Night
    (13,    8),     -- Sophia Martinez  RSVPs for Dance Workshop: Hip Hop
    (14,    8),     -- Ethan Harris     RSVPs for Dance Workshop: Hip Hop
    (17,    9),     -- Ava Thompson     RSVPs for Film Screening: "Inception"
    (18,    9),     -- Noah White       RSVPs for Film Screening: "Inception"
    (15,    9),     -- Liam Walker      RSVPs for Film Club Meeting
    (16,    9),     -- Henry Hall       RSVPs for Film Club Meeting
    (19,    10),    -- Isabella Lewis   RSVPs for Writing Workshop: Character Development
    (20,    10),    -- James Martin     RSVPs for Writing Workshop: Character Development
    (21,    11),    -- Mia Clark        RSVPs for Gaming Tournament: FIFA 23
    (22,    11),    -- Benjamin Walker  RSVPs for Gaming Tournament: FIFA 23
    (23,    12),    -- Charlotte Harris RSVPs for Outdoor Adventure: Hiking Trip
    (24,    12);    -- Mason Davis      RSVPs for Outdoor Adventure: Hiking Trip
