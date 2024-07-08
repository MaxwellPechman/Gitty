SELECT
    tasks.tid AS "tid",
    tasks.task_name AS "Taskname",
    projects.project_name AS "Project",
    tasks.task_status as "Status",
    '...' AS "Action"
FROM tasks
JOIN projects ON tasks.pid = projects.pid
WHERE tasks.pid = $1;