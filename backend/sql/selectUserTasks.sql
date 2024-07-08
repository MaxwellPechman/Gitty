SELECT
    tasks.tid AS "tid",
    tasks.task_name AS "taskName",
    projects.project_name AS "projectName",
    tasks.task_status as "status",
    '...' AS "action"
FROM tasks
JOIN projects ON tasks.pid = projects.pid
JOIN taskUser ON tasks.tid = taskUser.tid
JOIN sessions ON taskUser.uid = sessions.uid
WHERE sessions.sid = $1;