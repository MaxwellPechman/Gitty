SELECT
    fid,
    file_name,
    file_parentdir,
    file_pid,
    file_content
FROM
    files
WHERE
    file_pid = $1;
