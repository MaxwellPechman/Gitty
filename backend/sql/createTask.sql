INSERT INTO tasks (task_name, task_status, task_description, pid)
VALUES ($1, $2, $3, $4) RETURNING tid;