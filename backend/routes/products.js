const express = require('express')
const router = express.Router()
const db = require('../db')
const multer = require('multer')
const path = require('path')

// Storage config
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname)
    cb(null, uniqueName)
  }
})

const upload = multer({ storage })

// GET all products
router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json(err)
    res.json(results)
  })
})

// POST product with image
router.post('/', upload.single('image'), (req, res) => {
  const { type, color, quantity, price } = req.body

  const id = Date.now()
  const ref = `JB-${id}`
  const dateAjout = new Date().toISOString().split('T')[0]

  const imagePath = req.file ? `/uploads/${req.file.filename}` : null

  const sql = `
    INSERT INTO products (id, ref, type, color, quantity, price, dateAjout, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `

  db.query(
    sql,
    [id, ref, type, color, quantity, price, dateAjout, dateAjout || null, imagePath],
    (err) => {
      if (err) return res.status(500).json(err)

      res.json({
        id,
        ref,
        type,
        color,
        quantity,
        price,
        dateAjout,
        image: imagePath
      })
    }
  )
})

// UPDATE product
router.put('/:id', upload.single('image'), (req, res) => {
  const { type, color, quantity, price, dateAjout, ref } = req.body
  const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image

  const sql = `
    UPDATE products
    SET type=?, color=?, quantity=?, price=?, dateAjout=?, image=?
    WHERE id=?
  `

  db.query(
    sql,
    [type, color, quantity, price, dateAjout || null, imagePath, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err)

      // Include the ref in response
      res.json({
        id: Number(req.params.id),
        ref, // keep the existing ref
        type,
        color,
        quantity,
        price,
        dateAjout,
        image: imagePath
      })
    }
  )
})

// DELETE product
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM products WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err)
    res.json({ success: true })
  })
})

module.exports = router