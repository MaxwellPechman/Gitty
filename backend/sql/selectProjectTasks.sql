SELECT
    tasks.task_name AS "Taskname",
    projects.project_name AS "Project",
    CASE task_status
        WHEN 0 THEN 'new'
        WHEN 1 THEN 'in progress'
        WHEN 2 THEN 'cancled'
        WHEN 3 THEN 'done'
    END as "Status",
    '...' AS "Action"
FROM tasks
JOIN projects ON tasks.pid = projects.pid
WHERE tasks.pid = $1;