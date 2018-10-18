import connection
import utils
from psycopg2 import sql


@connection.connection_handler
def get_id_for_user(cursor, user_name):
    cursor.execute("""
                    SELECT id FROM users
                    WHERE user_name = %s
                    """, (user_name, ))
    user_id = cursor.fetchone()
    return user_id


@connection.connection_handler
def get_boards_for_user(cursor, user_id):
    cursor.execute(sql.SQL("SELECT * FROM boards WHERE user_id = {}").format(sql.Literal(user_id)))
    table = cursor.fetchall()
    return table


@connection.connection_handler
def get_cards_for_user(cursor, user_id):
    cursor.execute("""
                    SELECT cards.id, cards.title, status_id, board_id
                    FROM cards JOIN boards b on cards.board_id = b.id
                    WHERE b.user_id = %s
                    """, (user_id, ))
    list_of_cards = cursor.fetchall()
    return list_of_cards


@connection.connection_handler
def get_statuses(cursor):
    cursor.execute("SELECT * FROM statuses")
    list_of_statuses = cursor.fetchall()
    return list_of_statuses


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
    query_skeleton = "INSERT INTO {} (" + placeholders + ") VALUES (" + placeholders + ") RETURNING *;"

    column_identifiers = [sql.Identifier(column_name) for column_name in columns_to_insert_into]
    value_literals = [sql.Literal(value) for value in values_to_insert]
    query_string = sql.SQL(query_skeleton).format(sql.Identifier(table_name), *column_identifiers, *value_literals)

    cursor.execute(query_string)
    new_record = cursor.fetchone()
    return new_record


@connection.connection_handler
def update_record(cursor, table_name, _id, dict_of_record):
    sql_input = utils.create_sql_input(dict_of_record)

    number_of_columns = len(dict_of_record)
    placeholders = ",".join(["{} = {}"] * number_of_columns)

    query_string = "UPDATE {} SET " + placeholders + " WHERE id = {};"

    cursor.execute(sql.SQL(query_string).format(sql.Identifier(table_name), *sql_input, sql.Literal(_id)))


@connection.connection_handler
def delete_record(cursor, table_name, _id):
    cursor.execute(sql.SQL("DELETE FROM {} WHERE id = {};").format(sql.Identifier(table_name),
                                                                   sql.Literal(_id)))


@connection.connection_handler
def get_password_hash_for_user(cursor, user_name):
    cursor.execute("""
                    SELECT password_hash FROM users
                    WHERE user_name = %s;
                    """, (user_name, ))
    password_hash = cursor.fetchone()
    return password_hash
