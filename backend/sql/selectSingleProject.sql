SELECT projects.pid FROM projects
JOIN projectsusers ON projects.pid = projectsusers.pid
WHERE project_name = $1 AND projectsusers.uid = $2;