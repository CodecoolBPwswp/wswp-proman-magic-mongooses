from flask import Flask, render_template
app = Flask(__name__)


@app.route("/")
def boards():
    """ this is a one-pager which shows all the boards and cards """
    return render_template('boards.html')


def main():
    app.run(debug=True,
            host="0.0.0.0",
            port=4000)


if __name__ == '__main__':
    main()
