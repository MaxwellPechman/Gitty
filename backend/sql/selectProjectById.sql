SELECT pid, project_name, project_type, project_description, active
FROM projects
WHERE pid = $1;