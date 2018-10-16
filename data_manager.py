import connection
from psycopg2 import sql


@connection.connection_handler
def get_table(cursor, table_name):
    cursor.execute(sql.SQL("SELECT * FROM {}").format(sql.Identifier(table_name)))
    table = cursor.fetchall()
    return table


@connection.connection_handler
def get_record(cursor, table_name, _id):
    cursor.execute(sql.SQL("""
                SELECT * FROM {} WHERE id = {}
                """).format(sql.Identifier(table_name), sql.Literal(_id)))
    row = cursor.fetchone()
    return row


@connection.connection_handler
def insert_record(cursor, table_name, dict_of_record):
    columns_to_insert_into = tuple(dict_of_record.keys())
    values_to_insert = tuple(dict_of_record.values())

    number_of_columns = len(columns_to_insert_into)
    placeholders = ",".join(["{}"] * number_of_columns)
    query_string = "INSERT INTO {} (" + placeholders + ") VALUES (" + placeholders + ");"

    column_identifiers = [sql.Identifier(column_name) for column_name in columns_to_insert_into]
    value_literals = [sql.Literal(value) for value in values_to_insert]

    cursor.execute(sql.SQL(query_string).format(sql.Identifier(table_name),
                                                *column_identifiers,
                                                *value_literals))
