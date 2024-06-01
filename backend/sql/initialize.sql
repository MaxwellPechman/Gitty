CREATE TABLE IF NOT EXISTS types (
    typeId SERIAL PRIMARY KEY,
    type_name VARCHAR(32) NOT NULL,
    type_classification INTEGER NOT NULL
);

INSERT INTO types (typeId, type_name, type_classification)
VALUES (1, 'Code', 0), (2, 'Game', 0), (3, 'Website', 0), (4, 'Database', 0)
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS projects (
    pid SERIAL PRIMARY KEY,
    project_name VARCHAR(64) NOT NULL,
    project_description VARCHAR(256),
    project_type INTEGER,
    CONSTRAINT fk_types
        FOREIGN KEY (project_type)
            REFERENCES types (typeId) on DELETE CASCADE,
    date_created DATE NOT NULL,
    date_changed DATE NOT NULL,
    active BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    uid SERIAL PRIMARY KEY,
    username VARCHAR(16) NOT NULL,
    mail VARCHAR(128) NOT NULL,
    password VARCHAR(64) NOT NULL,
    date_created DATE NOT NULL,
    date_changed DATE NOT NULL,
    active BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
    sid VARCHAR(64) PRIMARY KEY NOT NULL,
    username VARCHAR(16) NOT NULL,
    date_created DATE NOT NULL,
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
    task_name VARCHAR(16) NOT NULL,
    task_status INTEGER NOT NULL,
    task_description VARCHAR(256),
    task_type INTEGER,
    CONSTRAINT fk_types
        FOREIGN KEY (task_type)
            REFERENCES types (typeId) ON DELETE CASCADE,
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