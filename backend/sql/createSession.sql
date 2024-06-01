INSERT INTO sessions (sid, username, date_created, active)
VALUES ($1, $2, CURRENT_DATE, true);