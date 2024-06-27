UPDATE tasks
SET task_status = $1
WHERE tid = $2;