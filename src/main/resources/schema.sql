CREATE TABLE IF NOT EXISTS user2 (
    id   INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS hand_shape (
    id   INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL
);

INSERT INTO hand_shape (id, name) values ('1', 'Rock');
INSERT INTO hand_shape (id, name) values ('2', 'Paper');
INSERT INTO hand_shape (id, name) values ('3', 'Scissors');