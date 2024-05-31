INSERT INTO projectsusers (pid, uid, owner)
SELECT MAX(PID), $1, TRUE from projects