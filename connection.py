import os
import psycopg2
from psycopg2 import extras


def get_connection_string():
    PSQL_USER_NAME = os.environ.get("PSQL_USER_NAME")
    PSQL_PASSWORD = os.environ.get("PSQL_PASSWORD")
    PSQL_HOST = os.environ.get("PSQL_HOST")
    PSQL_DB_NAME = os.environ.get("PSQL_DB_NAME")

    environment_variables_defined = PSQL_USER_NAME and PSQL_PASSWORD and PSQL_HOST and PSQL_DB_NAME
    if not environment_variables_defined:
        raise KeyError("Missing environment variable(s).")

    connection_string = f"postgresql://{PSQL_USER_NAME}:{PSQL_PASSWORD}@{PSQL_HOST}/{PSQL_DB_NAME}"
    return connection_string


def open_connection():
    try:
        connection_string = get_connection_string()
        connection = psycopg2.connect(connection_string)
        connection.autocommit = True
    except psycopg2.DatabaseError as exception:
        print("Database connection error.")
        raise exception
    return connection


def connection_handler(func_to_wrap):
    def wrapper(*args, **kwargs):
        connection = open_connection()
        cursor = connection.cursor(cursor_factory=extras.RealDictCursor)
        return_value = func_to_wrap(cursor, *args, **kwargs)
        cursor.close()
        connection.close()
        return return_value
    return wrapper
