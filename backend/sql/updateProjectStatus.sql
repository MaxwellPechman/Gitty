UPDATE projects
SET active = $1, date_changed = now()
WHERE pid = $2;