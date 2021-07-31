const ap = require("array-pull")
const config = require("./config.js")
const { customAlphabet } = require("nanoid")
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 4)
const url = `${config.root}/api/items`

const master = {
  adult: ["XS", "S", "M", "L", "XL"],
  youth: ["S", "M", "L", "XL"],
  baby: ["3-6M", "6-12M", "12-18M", "18-24M"],
  toddler: ["2T", "3T", "4T", "5T"],
}

const allitems = {
  crewneck: {
    name: "Crew Neck",
    price: 8,
    sizes: {
      youth: master.youth,
      adult: master.adult.concat([, { size: "2XL", price: 2.25 }, { size: "3XL", price: 2.25 }, { size: "4XL", price: 2.25 }]),
    },
  },
  vneck: {
    name: "V-Neck - Adult",
    price: 11.25,
    sizes: {
      adult: master.adult.concat([{ size: "3XL", price: 2.25 }]),
    },
  },
  toddler: {
    name: "Crew Neck - Toddler",
    price: 8,
    sizes: {
      other: master.toddler,
    },
  },
  babycrew: {
    name: "Crew Neck - Baby",
    price: 8,
    sizes: { other: master.baby },
  },
  longsleeves: {
    name: "Long Sleeves",
    price: 11.25,
    sizes: {
      youth: ap(master.youth, "XL"),
      adult: master.adult,
    },
  },
  zippered: {
    name: "Zippered Hoodie",
    price: 24.5,
    sizes: {
      adult: master.adult,
      youth: ap(master.youth, "XL"),
    },
  },
  hoodie: {
    name: "Pullover Hoodie - Adult",
    price: 23.5,
    sizes: {
      adult: master.adult,
    },
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
      url,
      image: `${config.root}/images/${x}.png`,
    }
    if (itemsrc.sizes?.adult) {
      let pushitem = { ...item }
      pushitem.name += itemsrc.sizes.youth ? ` - Adult` : ""
      pushitem.id = `${x}-adult`
      pushitem.sizefield = sizelist(itemsrc.sizes.adult)
      module.exports.push(itemsrc)
    }
    if (itemsrc.sizes?.other) {
      let pushitem = { ...item }
      pushitem.id = `${x}`
      pushitem.sizefield = sizelist(itemsrc.sizes.other)
      module.exports.push(itemsrc)
    }
    if (itemsrc.sizes?.youth) {
      let pushitem = { ...item }
      pushitem.name += itemsrc.sizes.adult ? ` - Youth` : ""
      pushitem.id = `${x}-youth`
      pushitem.sizefield = sizelist(itemsrc.sizes.youth)
      module.exports.push(itemsrc)
    }
    if (!itemsrc.sizes) {
      let pushitem = {...item}
      pushitem.id = `${x}`
      module.exports.push(itemsrc)
    }
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
