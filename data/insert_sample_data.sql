INSERT INTO users (user_name, password_hash) VALUES ('Zsofi', '$2b$12$XnvScTRMrylOqjNgbNlg.u8qlfQR1nHb7H1GFdP/FweOtLjX/mvHy');
INSERT INTO users (user_name, password_hash) VALUES ('Thao', '$2b$12$w7bGXrpO.9kyGAgelY7bzerNopMRwtVOArf6SP8QQKmdJv4ycb0E6');
INSERT INTO users (user_name, password_hash) VALUES ('Szaffi', '$2b$12$6GRkSEwN9UJ8pYz8aKZxUeOdfEH1ab2ScK.q3Kc.xSMJpf955dB0u');
INSERT INTO users (user_name, password_hash) VALUES ('Bence', '$2b$12$RDaZHYRgYZIHBdN8CaMDIuGPnhDrLRsxnuFN.f1jN/FQK0y.NeBrW');

INSERT INTO statuses (name) VALUES ('For yesterday');
INSERT INTO statuses (name) VALUES ('Todo');
INSERT INTO statuses (name) VALUES ('Being reviewed');
INSERT INTO statuses (name) VALUES ('Done');

INSERT INTO boards (title, user_id) VALUES ('Math test', 1);
INSERT INTO boards (title, user_id) VALUES ('Star Wars', 3);
INSERT INTO boards (title, user_id) VALUES ('Cleaning up', 2);
INSERT INTO boards (title, user_id) VALUES ('Coding', 4);
INSERT INTO boards (title, user_id) VALUES ('JavaScript', 1);
INSERT INTO boards (title, user_id) VALUES ('I love Python <3', 3);
INSERT INTO boards (title, user_id) VALUES ('Pho', 2);
INSERT INTO boards (title, user_id) VALUES ('PET project', 4);

INSERT INTO cards (title, board_id, status_id) VALUES ('2 + 2 equals what', 1, 2);
INSERT INTO cards (title, board_id, status_id) VALUES ('getting some cilantro', 7, 3);
INSERT INTO cards (title, board_id, status_id) VALUES ('CALLBACKS', 5, 1);
INSERT INTO cards (title, board_id, status_id) VALUES ('Menta is my pet', 8, 4);
