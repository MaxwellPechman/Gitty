SELECT
    tasks.task_name AS "Taskname",
    projects.project_name AS "Project",
    CASE task_status
        WHEN 1 THEN 'new'
        WHEN 2 THEN 'in progress'
        WHEN 3 THEN 'cancled'
        WHEN 4 THEN 'done'
    END as "Status",
    '...' AS "Action"
FROM tasks
JOIN projects ON tasks.pid = projects.pid
JOIN taskUser ON tasks.tid = taskUser.tid
WHERE uid = $1;