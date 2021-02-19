const express = require("express")
const app = express()
const ejs = require("ejs")

app.use(express.static(__dirname + "/public"))
app.use(require("cookie-parser")())
app.use(require("body-parser").urlencoded({ extended: true }))
app.set("view engine", "ejs")

const run = async () => {
  const items = await require("./items.js")
  app.get("/", (req, res) => {
    let pass = {items}
    res.render(__dirname + "/views/index.ejs", pass)
  })

  app.get("/coffee", async (req, res) =>
    res
      .status(418)
      .send(
        "418. I’m a teapot.\n\nThe requested entity body is short and stout.\nTip me over and pour me out."
      )
  )

  app.get("/store", async (req, res) => {
    res.render(__dirname + "/views/store.ejs", { items, title: "All Items" })
  })

  app.get("/api/items", async (req, res) => {
    res.json(items)
  })

  app.listen(43888, () => console.log("Online"))
}

run()
