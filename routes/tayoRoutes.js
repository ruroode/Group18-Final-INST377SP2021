import express from 'express';
import sequelize from 'sequelize';
import chalk from 'chalk';
import fetch from 'node-fetch';

import tayoRoutes from './tayoRoutes.js';
import db from '../database/initializeDB.js';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('Touched tayoRoutes')
  res.json({message:'Welcome to the Group 18 API!'});
});

// GET Controllers: Assignment 1
router.route('/genre')
.get(async (req, res) => {
    try {
        const genreList = await db.genre.findAll()
        res.json({data: genreList});
    } catch (err) {
        console.error(err);
        res.send({message: 'Error!'});
    }
})

router.route('/genre/:id')
.get(async (req, res) => {
    try {
      const {id} = req.params;
      const genreList = await db.genre.findAll()
      res.json({data: genreList[id]});
    } catch (err) {
        console.error(err);
        res.json({message: 'Error!'});
    }
})
.put(async )

// POST, PUT, Delete: Assignment 2
router.route('/genre')
.post(async (req, res) => {
    const genreList = await db.genre.findAll();
    const currentId = (await genreList.length) + 1;
    try {
      const newGenre = await db.genre.create({
        genre_id: currentId,
        genre_name: req.body.genre_name,
      });
      res.json(newGenre);
    } catch (err) {
      console.error(err);
      res.error('Server error');
    }
  });

router.route('/genre/:id')
.put(async (req, res) => {
    try {
      const {id} = req.params;
      await db.genre.update(
        {
          genre_name: req.body.genre_name
        },
        {
          where: {
            genre_id: id
          }
        }
      );
      res.send('Genre Successfully Updated');
    } catch (err) {
      console.error(err);
      res.json({message: 'Server error'});
    }
});

router.route('/genre/:id')
.delete(async (req, res) => {
    try {
      await db.genre.destroy({
        where: {
          genre_id: req.params.genre_id
        }
      });
      res.send('Successfully Deleted');
    } catch (err) {
      console.error(err);
      res.error('Server error');
    }
  });

export default router;