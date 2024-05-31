INSERT INTO projects (project_name, project_type, date_created, date_changed, active)
VALUES ($1, $2, CURRENT_DATE, CURRENT_DATE, TRUE);