from flask import Flask, render_template
import sqlite3


app = Flask(__name__)


def query_db(statement, id, fetch):

    conn = sqlite3.connect("project.db")
    cur = conn.cursor()

    if id is None:
        cur.execute(statement)
    else:
        cur.execute(statement, id)

    if fetch == "one":
        results = cur.fetchone()
    elif fetch == "all":
        results = cur.fetchall()
    else:
        pass

    return results


# connects home.html to / route
@app.route("/")
def home():
    return render_template("home.html")


# connects about_us.html to /about_us route
@app.route("/about_us")
def about_us():
    return render_template("about_us.html")


# connects our_product.html to /our_products route
@app.route("/our_products")
def our_products():
    flavours = query_db("SELECT * FROM Flavour", None, "all")
    toppings = query_db("SELECT * FROM Topping", None, "all")
    containers = query_db("SELECT * FROM Container", None, "all")
    # queries toppings incompatible to each flavour
    incompatible_toppings = query_db("SELECT Incompatible.fid, Topping.name, \
                                     Incompatible.warning FROM Incompatible \
                                     INNER JOIN Topping ON Incompatible.tid=\
                                     Topping.id", None, "all")
    # queries flavours incompatible to each topping
    incompatible_flavours = query_db("SELECT Incompatible.tid, Flavour.name, \
                                     Incompatible.warning FROM Incompatible \
                                     INNER JOIN Flavour ON Incompatible.fid=\
                                     Flavour.id", None, "all")
    return render_template("our_products.html", flavours=flavours,
                           toppings=toppings, containers=containers,
                           incompatible_toppings=incompatible_toppings,
                           incompatible_flavours=incompatible_flavours)


# connects flavours.html to /flavours route
@app.route("/flavours")
def flavours():
    flavours = query_db("SELECT id, name, picture FROM Flavour", None, "all")
    return render_template("flavours.html", flavours=flavours)


# connects flavours_item.html to /flavour/<int:id> route
# where <int:id> is the id of a certain flavour
# (a different individual webpage per flavour)
@app.route("/flavours/<int:id>")
def flavours_item(id):
    flavour = query_db("SELECT * FROM Flavour WHERE id=?", (id,), "one")
    # queries toppings incompatible to a certain flavour
    incompatible_toppings = query_db("SELECT Incompatible.fid, Topping.name, \
                                     Incompatible.warning FROM Incompatible \
                                     INNER JOIN Topping ON Incompatible.tid=\
                                     Topping.id WHERE Incompatible.fid=?",
                                     (id,), "all")
    return render_template("flavours_item.html", flavour=flavour,
                           incompatible_toppings=incompatible_toppings)


# connects toppings.html to /toppings route
@app.route("/toppings")
def toppings():
    toppings = query_db("SELECT id, name FROM Topping", None, "all")
    return render_template("toppings.html", toppings=toppings)


# connects toppings_item.html to /toppings/<int:id> route
# where <int:id> is the id of a certain topping
# (a different individual webpage per topping)
@app.route("/toppings/<int:id>")
def toppings_item(id):
    topping = query_db("SELECT * FROM Topping WHERE id=?", (id,), "one")
    # queries flavours incompatible to a certain topping
    incompatible_flavours = query_db("SELECT Incompatible.tid, Flavour.name, \
                                     Incompatible.warning FROM Incompatible \
                                     INNER JOIN Flavour ON Incompatible.fid=\
                                     Flavour.id WHERE Incompatible.tid=?",
                                     (id,), "all")
    return render_template("toppings_item.html", topping=topping,
                           incompatible_flavours=incompatible_flavours)


# connects order_&_delivery.html to /order_&_delivery route
@app.route("/order_&_delivery")
def order_and_delivery():
    flavours = query_db("SELECT name FROM Flavour", None, "all")
    containers = query_db("SELECT name, deliverable FROM Container", None,
                          "all")
    return render_template("order_&_delivery.html", flavours=flavours,
                           containers=containers)


# handles 404 error by taking user to 404.html
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


if __name__ == "__main__":
    app.run(debug=True)
