CREATE TABLE IF NOT EXISTS projects (
    pid SERIAL PRIMARY KEY,
    project_name VARCHAR(64) NOT NULL,
    description VARCHAR(1024) NOT NULL,
    date_created DATE NOT NULL,
    date_changed DATE NOT NULL,
    active BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    uid SERIAL PRIMARY KEY,
    username VARCHAR(16) NOT NULL,
    mail VARCHAR(128) NOT NULL,
    password VARCHAR(32) NOT NULL,
    date_created DATE NOT NULL,
    date_changed DATE NOT NULL,
    active BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS projectsUsers (
    pid INTEGER NOT NULL,
    uid INTEGER NOT NULL,
    owner BOOLEAN NOT NULL,
    CONSTRAINT fk_pid
    FOREIGN KEY (pid)
    REFERENCES projects (pid) ON DELETE CASCADE,
    CONSTRAINT fk_uid
    FOREIGN KEY (uid)
    REFERENCES users (uid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tasks (
    tid SERIAL PRIMARY KEY,
    taskname VARCHAR(16) NOT NULL,
    taskstatus INTEGER NOT NULL,
    pid INTEGER,
    CONSTRAINT fk_pid
        FOREIGN KEY (pid)
        REFERENCES projects (pid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS taskUser (
    tid INTEGER,
    uid INTEGER,
    CONSTRAINT fk_tid
        FOREIGN KEY (tid)
        REFERENCES tasks (tid) ON DELETE CASCADE,
    CONSTRAINT fk_uid
        FOREIGN KEY (uid)
            REFERENCES users (uid) ON DELETE CASCADE
);