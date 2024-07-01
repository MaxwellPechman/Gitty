SELECT
    projects.pid AS pid,
    projects.project_name AS "projectName",
    CASE
        WHEN projects.project_type = 0 THEN 'Other'
        WHEN projects.project_type = 1 THEN 'Code'
        WHEN projects.project_type = 2 THEN 'Game'
        WHEN projects.project_type = 3 THEN 'Website'
        WHEN projects.project_type = 4 THEN 'Database'
    END AS "projectType",
    projects.active AS "projectStatus",
    TO_CHAR(projects.date_created, 'DD.MM.YYYY hh:mm') as "created",
    TO_CHAR(projects.date_changed, 'DD.MM.YYYY hh:mm') as "lastUpdated"
FROM projectsusers
JOIN projects ON projectsusers.pid = projects.pid
JOIN sessions ON sessions.uid = projectsusers.uid
WHERE sessions.sid = $1 AND projectsusers.owner = true;