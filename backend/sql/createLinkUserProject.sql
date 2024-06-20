INSERT INTO projectsusers (pid, uid, owner)
SELECT $1, s.uid, TRUE FROM sessions s where s.sid = $2;