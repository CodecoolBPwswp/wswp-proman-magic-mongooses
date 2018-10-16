from flask import Flask, render_template
import data_manager
import json

app = Flask(__name__)


@app.route("/")
def boards():
    """ this is a one-pager which shows all the boards and cards """
    return render_template('boards.html')


@app.route("/api/<table_name>")
def table_api(table_name):
    table = data_manager.get_table(table_name)
    json_table = json.dumps(table)
    return json_table


@app.route("/api/<table_name>/<_id>")
def record_api(table_name, _id):
    record = data_manager.get_record(table_name, _id)
    json_record = json.dumps(record)
    return json_record


def main():
    app.run(debug=True,
            host="0.0.0.0",
            port=4000)


if __name__ == '__main__':
    main()
