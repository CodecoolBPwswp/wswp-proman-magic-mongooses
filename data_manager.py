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
