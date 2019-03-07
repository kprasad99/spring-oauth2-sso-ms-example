

CREATE TABLE TBL_USERS (
  						username VARCHAR(45) NOT NULL ,
  						password VARCHAR(60) NOT NULL ,
  						enabled TINYINT NOT NULL DEFAULT 1 ,
  						PRIMARY KEY (username)) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE TBL_USER_ROLES (
  							user_role_id int(11) NOT NULL AUTO_INCREMENT,
  							username varchar(45) NOT NULL,
  							role varchar(45) NOT NULL,
  							PRIMARY KEY (user_role_id),
  							UNIQUE KEY uni_username_role (role,username),
  							KEY fk_username_idx (username),
  							CONSTRAINT fk_username FOREIGN KEY (username) REFERENCES TBL_USERS (username)) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO TBL_USERS(username,password,enabled) VALUES ('user','$2a$04$J/btR/6ZFjvNL7pR6FYWWOkOceD6UylsiWLJ1pTj0sphrFGODlziC', true);
INSERT INTO TBL_USERS(username,password,enabled) VALUES ('admin','$2a$04$J/btR/6ZFjvNL7pR6FYWWOkOceD6UylsiWLJ1pTj0sphrFGODlziC', true);

INSERT INTO TBL_USER_ROLES (username, role) VALUES ('user', 'ROLE_USER');
INSERT INTO TBL_USER_ROLES (username, role) VALUES ('admin', 'ROLE_ADMIN');

