SELECT tid,
    task_name as "Taskname",
    task_status as "Status",
    task_description as "Description"
FROM tasks
WHERE tid = $1;