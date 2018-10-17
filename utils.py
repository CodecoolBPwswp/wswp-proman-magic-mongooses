from psycopg2 import sql


def create_sql_input(dict_of_record):
    column_names = tuple(dict_of_record.keys())
    record_values = tuple(dict_of_record.values())

    sql_input = []
    for i in range(len(column_names)):
        column = sql.Identifier(column_names[i])
        value = sql.Literal(record_values[i])
        sql_input.append(column)
        sql_input.append(value)

    return sql_input
