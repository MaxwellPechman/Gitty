SELECT
    tasks.tid AS "tid",
    tasks.task_name AS "Taskname",
    projects.project_name AS "Project",
    tasks.task_status as "Status",
    '...' AS "Action"
FROM tasks
JOIN projects ON tasks.pid = projects.pid
JOIN taskUser ON tasks.tid = taskUser.tid
JOIN sessions ON taskUser.uid = sessions.uid
WHERE sessions.sid = $1;