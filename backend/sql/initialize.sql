CREATE TABLE IF NOT EXISTS types (
    typeId SERIAL PRIMARY KEY,
    type_name VARCHAR(32) NOT NULL
);

INSERT INTO types (typeId, type_name)
VALUES (0, 'Other'), (1, 'Code'), (2, 'Game'), (3, 'Website'), (4, 'Database')
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
    active BOOLEAN NOT NULL,
    img TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
    sid VARCHAR(64) PRIMARY KEY NOT NULL,
    uid INTEGER NOT NULL,
    date_created DATE NOT NULL,
    active BOOLEAN NOT NULL,
    FOREIGN KEY (uid) REFERENCES users(uid)
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
    task_name VARCHAR(64) NOT NULL,
    task_status INTEGER NOT NULL,
    task_description VARCHAR(256),
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

CREATE TABLE IF NOT EXISTS directories (
    dirid SERIAL PRIMARY KEY,
    dir_name VARCHAR(256) NOT NULL,
    dir_parentdir INTEGER,
    dir_pid integer NOT NULL,
    CONSTRAINT fk_parentdir
        FOREIGN KEY (dir_parentdir)
            REFERENCES directories (dirid) ON DELETE CASCADE,
    CONSTRAINT fk_pid
        FOREIGN KEY (dir_pid)
            REFERENCES projects (pid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS files(
    fid SERIAL PRIMARY KEY,
    file_name VARCHAR(256),
    file_content TEXT,
    file_parentdir INTEGER,
    CONSTRAINT fk_dirid
        FOREIGN KEY (file_parentdir)
            REFERENCES directories (dirid) ON DELETE CASCADE,
    file_pid INTEGER,
    CONSTRAINT fk_pid
        FOREIGN KEY (file_pid)
            REFERENCES projects (pid) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS files_idx_file_pid ON "files" ("file_pid");
CREATE INDEX IF NOT EXISTS users_idx_username ON "users" ("username");
CREATE INDEX IF NOT EXISTS users_idx_date_changed ON "public"."users" ("date_changed");
CREATE INDEX IF NOT EXISTS projectsusers_idx_uid ON "projectsusers" ("uid");
CREATE INDEX IF NOT EXISTS directories_idx_dir_parentdir ON "directories" ("dir_parentdir");
CREATE INDEX IF NOT EXISTS taskuser_idx_uid ON "taskuser" ("uid");
CREATE INDEX IF NOT EXISTS projectsusers_idx_owner ON "projectsusers" ("owner");
CREATE INDEX IF NOT EXISTS sessions_idx_sid_uid ON "sessions" ("sid","uid");