from flask import Flask, render_template, request, session, redirect, url_for
import data_manager
import json
import password_handler

app = Flask(__name__)


@app.route("/")
def boards():
    """ this is a one-pager which shows all the boards and cards """
    return render_template('boards.html')


@app.route("/login")
def login_page():
    return render_template("login.html")


@app.route("/login", methods=["POST"])
def login_verification():
    user_name = request.form["user_name"]
    entered_password = request.form["password"]
    password_hash = data_manager.get_password_hash_for_user(user_name)["password_hash"]
    verified = password_handler.verify_password(entered_password, password_hash)

    if verified:
        user_id = data_manager.get_id_for_user(user_name)["id"]
        session["user"] = {"user_name": user_name, "user_id": user_id}
        return redirect(url_for("boards"))
    else:
        return redirect(url_for("login_page"))  # TODO: display error message


@app.route("/logout", methods=["POST"])
def logout():
    session.pop("user")
    return redirect(url_for("login_page"))


@app.route("/api/<table_name>")
def table_api(table_name):
    if "user" not in session:
        return "HTTP/1.1 401 Unauthorized"  # actually this will be the content of a 200 response
    user_id = session["user"]["user_id"]
    table = []
    if table_name == "boards":
        table = data_manager.get_boards_for_user(user_id)
    elif table_name == "cards":
        table = data_manager.get_cards_for_user(user_id)
    elif table_name == "statuses":
        table = data_manager.get_statuses()
    else:
        return "HTTP/1.1 403 Forbidden"
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


@app.route("/api/<table_name>/<_id>/delete", methods=["DELETE"])
def delete_record(table_name, _id):
    data_manager.delete_record(table_name, _id)
    return "HTTP/1.1 200 OK"


def main():
    app.secret_key = "The bar is where I go"
    app.run(debug=True,
            host="0.0.0.0",
            port=4000)


if __name__ == '__main__':
    main()
