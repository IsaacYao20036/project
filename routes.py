from flask import Flask, render_template
import sqlite3


app = Flask(__name__)


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/about_us")
def about_us():
    return render_template("about_us.html")


@app.route("/our_products")
def our_products():
    conn = sqlite3.connect("project.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM Flavour")
    flavours = cur.fetchall()
    cur.execute("SELECT * FROM Topping")
    toppings = cur.fetchall()
    cur.execute("SELECT * FROM Container")
    containers = cur.fetchall()
    cur.execute("SELECT Incompatible.fid, Topping.name, Incompatible.warning FROM Incompatible INNER JOIN Topping ON Incompatible.tid=Topping.id")
    incompatible_toppings = cur.fetchall()
    cur.execute("SELECT Incompatible.tid, Flavour.name, Incompatible.warning FROM Incompatible INNER JOIN Flavour ON Incompatible.fid=Flavour.id")
    incompatible_flavours = cur.fetchall()
    return render_template("our_products.html", flavours=flavours,
                           toppings=toppings, containers=containers,
                           incompatible_toppings=incompatible_toppings,
                           incompatible_flavours=incompatible_flavours)


@app.route("/order_&_delivery")
def order_and_delivery():
    conn = sqlite3.connect("project.db")
    cur = conn.cursor()
    cur.execute("SELECT name FROM Flavour")
    flavours = cur.fetchall()
    cur.execute("SELECT id, name FROM Container")
    containers = cur.fetchall()
    return render_template("order_&_delivery.html", flavours=flavours,
                           containers=containers)


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


if __name__ == "__main__":
    app.run(debug=True)
