SELECT
    projects.pid as pid,
    projects.project_name as "projectName",
    projects.project_type as "projectType",
    projects.active as "projectStatus"
FROM projectsusers
JOIN projects on projectsusers.pid = projects.pid
where uid = $1;