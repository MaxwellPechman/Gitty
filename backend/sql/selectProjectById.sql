SELECT pid, project_name, project_type, project_description
FROM projects
WHERE pid = $1;