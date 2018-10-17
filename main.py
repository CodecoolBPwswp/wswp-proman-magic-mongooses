from flask import Flask, render_template, request
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
    return json_table  # TODO: should we give back anything else, like details of a http response?


@app.route("/api/<table_name>/<_id>")
def record_api(table_name, _id):
    record = data_manager.get_record(table_name, _id)
    json_record = json.dumps(record)
    return json_record


@app.route("/api/<table_name>/insert", methods=["POST"])
def save_record(table_name):
    record_to_save = request.form.to_dict()
    data_manager.insert_record(table_name, record_to_save)
    return "HTTP/1.1 200 OK"  # TODO: ask a mentor for a proper way to give http response


@app.route("/api/<table_name>/<_id>/update", methods=["PUT"])
def update_record(table_name, _id):
    record_to_update = request.form.to_dict()
    data_manager.update_record(table_name, _id, record_to_update)
    return "HTTP/1.1 200 OK"


def main():
    app.run(debug=True,
            host="0.0.0.0",
            port=4000)


if __name__ == '__main__':
    main()
