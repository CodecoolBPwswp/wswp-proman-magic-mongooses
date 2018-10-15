CREATE TABLE users(
  id serial PRIMARY KEY NOT NULL,
  user_name varchar(100) UNIQUE NOT NULL,
  password_hash varchar(256) NOT NULL
);

CREATE TABLE statuses(
  id serial PRIMARY KEY NOT NULL,
  name varchar(50) NOT NULL
);

CREATE TABLE boards(
  id serial PRIMARY KEY NOT NULL,
  title varchar(100) NOT NULL,
  user_id int  NOT NULL
);

CREATE TABLE cards(
  id serial PRIMARY KEY NOT NULL,
  title varchar(100) NOT NULL,
  board_id int NOT NULL,
  status_id int NOT NULL
);

ALTER TABLE boards
    ADD CONSTRAINT fk_boards_user_id FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE cards
    ADD CONSTRAINT fk_cards_board_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE cards
    ADD CONSTRAINT fk_cards_status_id FOREIGN KEY (status_id) REFERENCES statuses(id);
