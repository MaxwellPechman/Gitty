SELECT types.typeId, types.type_name
FROM types WHERE types.type_classification = $1;