/* terminal $ mysql < db/db_frame.sql */

CREATE DATABASE IF NOT EXISTS IanKnightAppreciationDB;
USE IanKnightAppreciationDB;

/* Users table */
CREATE TABLE Users (
    id              BIGINT UNSIGNED AUTO_INCREMENT,
    first_name      VARCHAR(64),
    last_name       VARCHAR(64),
    username        VARCHAR(128) NULL,
    email           VARCHAR(255),
    password        VARCHAR(64),
    phone_number    VARCHAR(15),
    is_admin        BOOLEAN DEFAULT false,
    reset_token     VARCHAR(64) NULL,
    /* Constraints */
    PRIMARY KEY (id)
);

/* Clubs table */
CREATE TABLE Clubs (
    id          BIGINT UNSIGNED AUTO_INCREMENT,
    name        VARCHAR(255),
    description TEXT,
    /* Constraints */
    PRIMARY KEY (id)
);

/* Club Members table */
CREATE TABLE ClubMembers (
    id          BIGINT UNSIGNED AUTO_INCREMENT,
    user_id     BIGINT UNSIGNED,
    club_id     BIGINT UNSIGNED,
    is_manager  BOOLEAN DEFAULT false,
    /* Constraints */
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES Clubs(id) ON DELETE CASCADE,
    UNIQUE KEY unique_membership (user_id, club_id)
);

/* Club Events table */
CREATE TABLE ClubEvents (
    id          BIGINT UNSIGNED AUTO_INCREMENT,
    club_id     BIGINT UNSIGNED,
    name        VARCHAR(255),
    description TEXT,
    happening   DATETIME,
    /* Constraints */
    PRIMARY KEY(id),
    FOREIGN KEY (club_id) REFERENCES Clubs(id) ON DELETE CASCADE
);

/* Club Updates */
CREATE TABLE ClubUpdates (
    id          BIGINT UNSIGNED AUTO_INCREMENT,
    club_id     BIGINT UNSIGNED,
    name        VARCHAR(255),
    description VARCHAR(255),
    posted      DATETIME,
    /* Constraints */
    PRIMARY KEY (id),
    FOREIGN KEY (club_id) REFERENCES Clubs(id) ON DELETE CASCADE
);

/* Club Event RSVPs table */
CREATE TABLE EventRSVPs (
    id          BIGINT UNSIGNED AUTO_INCREMENT,
    user_id     BIGINT UNSIGNED,
    event_id    BIGINT UNSIGNED,
    /* Constraints */
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)   REFERENCES Users(id)        ON DELETE CASCADE,
    FOREIGN KEY (event_id)  REFERENCES ClubEvents(id)   ON DELETE CASCADE
);
