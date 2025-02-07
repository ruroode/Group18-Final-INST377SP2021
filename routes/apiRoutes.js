/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';

import db from '../database/initializeDB.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the UMD Dining API!');
});


/// /////////////////////////////////
/// ////////Nana's Endpoints /////////
/// /////////////////////////////////
router.route('/songs')
// .get(async (req, res) => {
//     try {
//         const songList = await db.song.findAll({})
//         console.log(songlist);
//         res.json({data: songList});
//     } catch (err) {
//         console.error('LINe 24');
//         res.send({message: 'Error!'});
//     }
// })

// .get(async (req, res) => {
//     try {
//         const songList = await db.songs.findAll()
//         res.json({data: songList});
//     } catch (err) {
//         console.error(err);
//         res.send({message: 'Error!'});
//     }
// })
.get(async (req, res) => {
  try {
      const playlistList = await db.sequelizeDB.query('select * from songs');
      res.json({data: playlistList[0]});
  } catch (err) {
      console.error(err);
      res.send({message: 'Error1!'});
  }
})
router.route('/songs/:id') 
.get(async (req, res) => {
    try {
      const {song_id} = req.params;
      const song = await db.songs.findAll({
        where: {
          id: id
        }
      });
      res.json({data: song})
    } catch (err) {
        console.error(err);
        res.json({message: 'Error!'});
    }
});

router.route('/songs').post( async (req, res) => {
  const songList = await db.songs.findAll();
  const currentId = (await songList.length) + 1;
  try {
    const newSong = await db.songs.create({
      song_id: currentId,
      song_name: req.body.song_name,
      duration: req.body.duration,
      genre_id: req.body.genre_id,
    });
    res.json({ data: newSong});
  } catch (err) {
    console.error(err);
    res.json({message: 'Server error'});
  }
});
/// /////////////////////////////////
/// ////////Maxim's Endpoints /////////
/// /////////////////////////////////

/////GET 
router.route('/playlist')
.get(async (req, res) => {
   try {
       const playlistList = await db.playlist.findAll()
       res.json({data: playlistList});
   } catch (err) {
       console.error(err);
       res.send({message: 'Error1!'});
   }
})
 
router.route('/playlist/:id')
.get(async (req, res) => {
   try {
     const {id} = req.params;
     const playlistList = await db.playlist.findAll()
     res.json({data: playlistList[id]});
   } catch (err) {
       console.error(err);
       res.json({message: 'Error2!'});
   }
})
//// POST 


router.route('/playlist')
.post(async (req, res) => {
    const playlistList = await db.playlist.findAll();
    const currentId = (await playlistList.length) + 1;
    try {
      const newPlaylist = await db.playlist.create({
        playlist_id: currentId,
        playlist_title: req.body.playlist_name,
        song_id: req.body.song_id,
      });
      res.json(newPlaylist);
    } catch (err) {
      console.error(err);
      res.error('Playlist Post Error!');
    }
  });
//PUT
router.route('/playlist/:id')
.put(async (req, res) => {
    try {
      const {id} = req.params;
      await db.playlist.update(
        {
          playlist_title: req.body.playlist_title
        },
        {
          song_id: req.body.song_id
        },
        {
          where: {
            playlist_id: id
          }
        }
      );
      res.send('Playlist Successfully Updated');
    } catch (err) {
      console.error(err);
      res.json({message: 'Playlist Put Error!'});
    }
});
//Delete
router.route('/playlist/:id')
.delete(async (req, res) => {
    try {
      await db.playlist.destroy({
        where: {
          playlist_id: req.params.playlist_id
        }
      });
      res.send('Successfully Deleted');
    } catch (err) {
      console.error(err);
      res.error('Playlist Delete Error!');
    }
  });



/// /////////////////////////////////
/// ////////Tayo's Endpoints /////////
/// /////////////////////////////////
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
})
.delete(async (req, res) => {
  try {
    const {id} = req.params;
    await db.genre.destroy({
      where: {
        genre_id: id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.json({message: 'Server error'});
  }
});


router.route('/genre')
.post(async (req, res) => {
    const genreList = await db.genre.findAll();
    const currentId = (await genreList.length) + 1;
    try {
      const newGenre = await db.genre.create({
        genre_id: currentId,
        genre_name: req.body.type,
      });
      res.json(newGenre);
    } catch (err) {
      console.error(err);
      res.error('Server error');
    }
  });


/// /////////////////////////////////
/// //////\Daniel's Endpoints////////
/// /////////////////////////////////
router.route('/artist')
.get(async (req, res) => {
    try {
      const artistList = await db.artist.findAll()
      res.json({data: artistList});
    } catch (err) {
      console.error(err);
      res.send({message: 'Error!'})
    }
})

router.route('/artist/:id')
.get(async (req, res) => {
    try {
      const {id} = req.params;
      const artistList = await db.artist.findAll();
      res.json({data: artistList[id]});
    } catch (err) {
      console.error(err);
      res.json({message: 'Error!'})
    }
})

// artist POST/PUT/DELETE
// POST
router.route('/artist')
.post(async (req, res) => {
    const artistList = await db.artist.findAll();
    const currentId = (await artistList.length) + 1;
    try {
      const newArtist = await db.artist.create({
        artist_id: currentId,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      });
      res.json(newArtist);
    } catch (err) {
      console.error(err);
      res.error('Servor error')
    }
});

// PUT
router.route('/artist/:id')
.put(async (req, res) => {
    try {
      const {id} =  req.params;
      await db.aritst.update(
        {
          first_name: req.body.first_name
        },
        {
          last_name: req.body.last_name
        },
        {
          where: {
            artist_id: id
          }
        }
      );
      res.send('Artist Successfully Updated')
    } catch (err) {
      console.error(err);
      res.json({message: 'Servor error'})
    }
});

// DELETE
router.route('/artist/:id')
.delete(async (req, res) => {
    try {
      await db.artist.destroy({
        where: {
          artist_id: req.params.artist_id
        }
      });
      res.send("Sucessfully Deleted")
    } catch (err) {
      console.error(err);
      res.error('Server error');
    }
});

///********//
// RATINGS //
///********//

router.route('/ratings')
.get(async (req, res) => {
    try {
        const ratingsList = await db.ratings.findAll()
        res.json({data: ratingsList});
    } catch (err) {
        console.error(err);
        res.send({message: 'Error!'})
    }
})

router.route('/rating/:id')
.get(async (req, res) => {
    try {
        const {id} = req.params;
        const ratingsList = await db.ratings.findAll();
        res.json({data: ratings[id]});
    } catch (err) {
        console.error(err);
        res.json({message: 'Error!'})
    }
})
// ratings POST/PUT/DELETE
// POST
router.route('/ratings')
.post(async (req, res) => {
    const ratingsList = await db.ratings.findAll();
    const currentId = (await ratingsList.length) + 1;
    try {
      const newRating = await db.ratings.create({
        rating_id: currentId,
        ratings: req.body.ratings,
        description: req.body.description,
        song_id: req.body.song_id,
        chart_id: req.body.chart_id,
      });
      res.json(newRating);
    } catch (err) {
      console.error(err);
      res.error('Servor error')
    }
});

// PUT
router.route('/rating/:id')
.put(async (req, res) => {
    try {
      const {id} =  req.params;
      await db.ratings.update(
        {
          ratings: req.body.ratings
        },
        {
          description: req.body.description
        },
        {
          song_id: req.body.song_id
        },
        {
          chart_id: req.body.chart_id
        },
        {
          where: {
            rating_id: id
          }
        }
      );
      res.send('Rating Successfully Updated')
    } catch (err) {
      console.error(err);
      res.json({message: 'Servor error'})
    }
});

// DELETE
router.route('/ratings/:id')
.delete(async (req, res) => {
    try {
      await db.ratings.destroy({
        where: {
          rating_id: req.params.rating_id
        }
      });
      res.send("Sucessfully Deleted")
    } catch (err) {
      console.error(err);
      res.error('Server error');
    }
});

///////
router.route('/playlist')
.get(async (req, res) => {
   try {
       const playlistList = await db.playlist.findAll()
       res.json({data: playlistList});
   } catch (err) {
       console.error(err);
       res.send({message: 'Error!'});
   }
})
 
router.route('/playlist/:id')
.get(async (req, res) => {
   try {
     const {id} = req.params;
     const playlistList = await db.playlist.findAll()
     res.json({data: playlistList[id]});
   } catch (err) {
       console.error(err);
       res.json({message: 'Error!'});
   }
})























































/// /////////////////////////////////
/// ////Dining Hall Endpoints////////
/// /////////////////////////////////
router.get('/dining', async (req, res) => {
  try {
    const halls = await db.DiningHall.findAll();
    const reply = halls.length > 0 ? { data: halls } : { message: 'no results found' };
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/dining/:hall_id', async (req, res) => {
  try {
    const hall = await db.DiningHall.findAll({
      where: {
        hall_id: req.params.hall_id
      }
    });

    res.json(hall);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/dining', async (req, res) => {
  const halls = await db.DiningHall.findAll();
  const currentId = (await halls.length) + 1;
  try {
    const newDining = await db.DiningHall.create({
      hall_id: currentId,
      hall_name: req.body.hall_name,
      hall_address: req.body.hall_address,
      hall_lat: req.body.hall_lat,
      hall_long: req.body.hall_long
    });
    res.json(newDining);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.delete('/dining/:hall_id', async (req, res) => {
  try {
    await db.DiningHall.destroy({
      where: {
        hall_id: req.params.hall_id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/dining', async (req, res) => {
  try {
    await db.DiningHall.update(
      {
        hall_name: req.body.hall_name,
        hall_location: req.body.hall_location
      },
      {
        where: {
          hall_id: req.body.hall_id
        }
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// ////////Meals Endpoints//////////
/// /////////////////////////////////
router.get('/meals', async (req, res) => {
  try {
    const meals = await db.Meals.findAll();
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/meals/:meal_id', async (req, res) => {
  try {
    const meals = await db.Meals.findAll({
      where: {
        meal_id: req.params.meal_id
      }
    });
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/meals', async (req, res) => {
  try {
    await db.Meals.update(
      {
        meal_name: req.body.meal_name,
        meal_category: req.body.meal_category
      },
      {
        where: {
          meal_id: req.body.meal_id
        }
      }
    );
    res.send('Meal Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// ////////Macros Endpoints/////////
/// /////////////////////////////////
router.get('/macros', async (req, res) => {
  try {
    const macros = await db.Macros.findAll();
    res.send(macros);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/macros/:meal_id', async (req, res) => {
  try {
    const meals = await db.Macros.findAll({
      where: {
        meal_id: req.params.meal_id
      }
    });
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/macros', async (req, res) => {
  try {
    // N.B. - this is a good example of where to use code validation to confirm objects
    await db.Macros.update(
      {
        meal_name: req.body.meal_name,
        meal_category: req.body.meal_category,
        calories: req.body.calories,
        serving_size: req.body.serving_size,
        cholesterol: req.body.cholesterol,
        sodium: req.body.sodium,
        carbs: req.body.carbs,
        protein: req.body.protein,
        fat: req.body.fat
      },
      {
        where: {
          meal_id: req.body.meal_id
        }
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// Dietary Restrictions Endpoints///
/// /////////////////////////////////
router.get('/restrictions', async (req, res) => {
  try {
    const restrictions = await db.DietaryRestrictions.findAll();
    res.json(restrictions);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/restrictions/:restriction_id', async (req, res) => {
  try {
    const restrictions = await db.DietaryRestrictions.findAll({
      where: {
        restriction_id: req.params.restriction_id
      }
    });
    res.json(restrictions);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// //////////////////////////////////
/// ///////Custom SQL Endpoint////////
/// /////////////////////////////////
const macrosCustom = 'SELECT `Dining_Hall_Tracker`.`Meals`.`meal_id` AS `meal_id`,`Dining_Hall_Tracker`.`Meals`.`meal_name` AS `meal_name`,`Dining_Hall_Tracker`.`Macros`.`calories` AS `calories`,`Dining_Hall_Tracker`.`Macros`.`carbs` AS `carbs`,`Dining_Hall_Tracker`.`Macros`.`sodium` AS `sodium`,`Dining_Hall_Tracker`.`Macros`.`protein` AS `protein`,`Dining_Hall_Tracker`.`Macros`.`fat` AS `fat`,`Dining_Hall_Tracker`.`Macros`.`cholesterol` AS `cholesterol`FROM(`Dining_Hall_Tracker`.`Meals`JOIN `Dining_Hall_Tracker`.`Macros`)WHERE(`Dining_Hall_Tracker`.`Meals`.`meal_id` = `Dining_Hall_Tracker`.`Macros`.`meal_id`)';
router.get('/table/data', async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(macrosCustom, {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

const mealMapCustom = `SELECT hall_name,
  hall_address,
  hall_lat,
  hall_long,
  meal_name
FROM
  Meals m
INNER JOIN Meals_Locations ml 
  ON m.meal_id = ml.meal_id
INNER JOIN Dining_Hall d
ON d.hall_id = ml.hall_id;`;
router.get('/map/data', async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(mealMapCustom, {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});
router.get('/custom', async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(req.body.query, {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

export default router;
