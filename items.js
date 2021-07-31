const ap = require("array-pull")
const config = require("./config.js")
const { customAlphabet } = require("nanoid")
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 4)
const url = `${config.root}/api/items`
const Price = require("format-price")

const master = {
  adult: ["XS", "S", "M", "L", "XL"],
  youth: ["S", "M", "L", "XL"],
  baby: ["3-6M", "6-12M", "12-18M", "18-24M"],
  toddler: ["2T", "3T", "4T", "5T"],
}

const allitems = {
  crewadult: {
    name: "Crew Neck - Adult",
    price: 10.05,
    sizes: master.adult.concat([, { size: "2XL", price: 2 }, { size: "3XL", price: 2 }, { size: "4XL", price: 2 }]),
    extra: { name: "Warning", value: "2XL is not available for this shirt selection" },
  },
  crewyouth: {
    name: "Crew Neck - Youth",
    price: 10.2,
    sizes: master.youth,
  },
  crewtoddler: {
    name: "Crew Neck - Toddler",
    price: 8,
    sizes: master.toddler,
  },
  crewbaby: {
    name: "Crew Neck - Baby",
    price: 9.1,
    sizes: master.baby,
  },
  vneck: {
    name: "V-Neck - Adult",
    price: 10.8,
    sizes: master.adult.concat([{ size: "3XL", price: 2.25 }]),
  },
  longsleeveadult: {
    name: "Long Sleeves - Adult",
    price: 12.25,
    sizes: master.adult,
  },
  longsleeveyouth: {
    name: "Long Sleeves - Youth",
    price: 12.25,
    sizes: ap(master.youth, "XL"),
  },
  zipperedadult: {
    name: "Zippered Jacket - Adult",
    price: 22.75,
    sizes: master.adult,
  },
  zipperedyouth: {
    name: "Zippered Jacket - Youth",
    price: 18.75,
    sizes: ap(master.youth, "XL"),
  },
  hoodie: {
    name: "Pullover Hoodie - Adult",
    price: 22.0,
    sizes: master.adult,
  },
  hat: {
    name: "Hat",
    price: 20,
  },
}

let generate = async function () {
  module.exports = []
  for (let x in allitems) {
    let itemsrc = allitems[x]
    let item = {
      name: itemsrc.name,
      price: itemsrc.price,
      extra: itemsrc.extra,
      description: Price.format("en-US", "USD", itemsrc.price),
      url,
      image: `${config.root}/images/${x}.png`,
      id: x,
    }
    if (itemsrc.sizes) item.sizefield = sizelist(itemsrc.sizes)
    module.exports.push(item)
  }
}

const sizelist = (list) => {
  let z = []
  list.forEach((x) => {
    if (typeof x == "string") z.push(x)
    if (typeof x == "object") z.push(`${x.size}[+${x.price}]`)
  })
  return z.join("|")
}

generate()
