WITH RECURSIVE directory_hierarchy AS (
    SELECT
        dirid AS id,
        dir_name AS name,
        true AS isDir,
        dir_parentdir AS parentDir,
        dir_pid
    FROM directories
    WHERE dir_parentdir IS NULL

    UNION ALL

    SELECT
        d.dirid AS id,
        d.dir_name AS name,
        true AS isDir,
        d.dir_parentdir AS parentDir,
        d.dir_pid
    FROM directories d
    INNER JOIN directory_hierarchy dh ON d.dir_parentdir = dh.id
)
SELECT
    id,
    name,
    isDir,
    parentDir
FROM directory_hierarchy
WHERE dir_pid = $1;