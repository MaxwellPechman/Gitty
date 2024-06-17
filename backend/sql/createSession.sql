INSERT INTO sessions (sid, uid, date_created, active)
VALUES ($1, $2, CURRENT_DATE, true);