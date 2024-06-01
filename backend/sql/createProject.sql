INSERT INTO projects (project_name, project_type, project_description, date_created, date_changed, active)
VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_DATE, TRUE) RETURNING pid;