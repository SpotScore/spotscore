CREATE TABLE deleteme (
     id    integer PRIMARY KEY,
     name   varchar(40) NOT NULL CHECK (name <> '')
);
