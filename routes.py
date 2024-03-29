from flask import Flask, render_template
import sqlite3


app = Flask(__name__)


# this function queries the database
def query_db(statement, id, fetch):

    conn = sqlite3.connect("project.db")
    cur = conn.cursor()

    # if the query does not take an id
    if id is None:
        cur.execute(statement)
    else:
        cur.execute(statement, id)

    # determines whether to fetchone or fetchall
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
    # if flavour id exists then render flavours_item.html
    if flavour:
        # queries toppings incompatible to a certain flavour
        incompatible_toppings = query_db("SELECT Incompatible.fid,\
                                         Topping.name, Incompatible.warning\
                                         FROM Incompatible INNER JOIN Topping\
                                         ON Incompatible.tid=Topping.id WHERE\
                                         Incompatible.fid=?", (id,), "all")
        return render_template("flavours_item.html", flavour=flavour,
                               incompatible_toppings=incompatible_toppings)
    # return 404 error if id does not exist
    else:
        return render_template("404.html")


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
    # if topping id exists then render toppings_item.html
    if topping:
        # queries flavours incompatible to a certain topping
        incompatible_flavours = query_db("SELECT Incompatible.tid,\
                                         Flavour.name, Incompatible.warning\
                                         FROM Incompatible INNER JOIN Flavour\
                                         ON Incompatible.fid=Flavour.id WHERE\
                                         Incompatible.tid=?", (id,), "all")
        return render_template("toppings_item.html", topping=topping,
                               incompatible_flavours=incompatible_flavours)
    else:
        return render_template("404.html")


# connects containers.html to /containers route
@app.route("/containers")
def containers():
    containers = query_db("SELECT id, name FROM Container", None, "all")
    return render_template("containers.html", containers=containers)


# connects containers_item.html to /containers/<int:id> route
# where <int:id> is the id of a certain containers
# (a different individual webpage per container)
@app.route("/containers/<int:id>")
def containers_item(id):
    container = query_db("SELECT * FROM Container WHERE id=?", (id,), "one")
    # if container id exists then render containers_items.html
    if container:
        return render_template("containers_item.html", container=container)
    else:
        return render_template("404.html")


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
