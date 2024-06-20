WITH RECURSIVE directory_hierarchy AS (
    SELECT
        dirid AS id,
        dir_name AS name,
        true AS folder,
        dir_parentdir AS parent_id,
        dir_pid
    FROM directories
    WHERE dir_parentdir IS NULL

    UNION ALL

    SELECT
        d.dirid AS id,
        d.dir_name AS name,
        true AS folder,
        d.dir_parentdir AS parent_id,
        d.dir_pid
    FROM directories d
    INNER JOIN directory_hierarchy dh ON d.dir_parentdir = dh.id
)
SELECT
    id,
    name,
    folder,
    parent_id
FROM directory_hierarchy
WHERE dir_pid = $1;