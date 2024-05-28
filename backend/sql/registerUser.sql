INSERT INTO users (username, mail, password, date_created, date_changed, active)
VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_DATE, TRUE)