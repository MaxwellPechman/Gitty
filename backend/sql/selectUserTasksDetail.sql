SELECT
    tasks.tid AS "tid",
    tasks.task_name AS "task_name",
    projects.project_name AS "project_name",
    CASE
        WHEN tasks.task_status = 0 THEN 'new'
        WHEN tasks.task_status = 1 THEN 'active'
        WHEN tasks.task_status = 2 THEN 'done'
        WHEN tasks.task_status = 3 THEN 'canceled'
    END AS "task_status",
    tasks.task_status AS "order",
    '...' AS "Action"
FROM tasks
JOIN projects ON tasks.pid = projects.pid
JOIN taskUser ON tasks.tid = taskUser.tid
JOIN sessions ON taskUser.uid = sessions.uid
WHERE sessions.sid = $1
ORDER BY "order" asc;