const Op = require('sequelize').Op

module.exports = {
  get_all: async (req, res) => {
    try {
      const VenuesModel = req.app.get('models').Venues
      const venues = await VenuesModel.findAll()

      res.send(venues)
    } catch (err) {
      console.error('get_all failed in venues_controller.js:', err)
      res.status(500).send(err)
    }
  },
  get_one_by_id: async (req, res) => {
    try {
      const VenuesModel = req.app.get('models').Venues
      const { id } = req.params
      const venue = await VenuesModel.findById(id)

      res.send(venue)
    } catch (err) {
      console.error('get_one_by_id failed in venues_controller.js:', err)
      res.status(500).send(err)
    }
  },
  get_one_by_name: async (req, res) => {
    try {
      const { name } = req.params
      const VenuesModel = req.app.get('models').Venues
      const venue = await VenuesModel.findOne({ where: { name } })
      res.status(200).send(venue)
    } catch (err) {
      console.log('Get_one_by_name failed in venues_controller.js:', err)
      res.status(500).send(err)
    }
  },
  get_all_sound_types: async (req, res) => {
    try {
      const { id } = req.params
      const VenuesModel = req.app.get('models').Venues
      const soundTypes = await VenuesModel.findOne({
        where: { id },
        attributes: ['stype1', 'stype2', 'stype3']
      })
      res.status(200).send(soundTypes)
    } catch (err) {
      console.log('get_all_sound_types failed in venues_controller.js:', err)
      res.status(500).send(err)
    }
  },
  get_by_location: async (req, res) => {
    try {
      const Venues = req.app.get('models').Venues
      const { state, city } = req.params
      const venues = await Venues.findAll({
        where: {
          [Op.and]: [{ state }, { city }]
        }
      })
      res.send(venues)
    } catch (err) {
      console.error('get_by_location failed in venues_controller.js', err)
      res.status(500).send(err)
    }
  },
  get_all_count: async (req, res) => {
    try {
      const VenuesModel = req.app.get('models').Venues
      const count = await VenuesModel.count()
      res.send({ count })
    } catch (err) {
      console.error('get_all_count failed in venues_controller.js:', err)
      res.status(500).send(err)
    }
  },
  get_one_soundtype1: async (req, res) => {
    // Get all Venues where "stype1" is equal to "stype1" on req.params
    try {
      const VenuesModel = req.app.get('models').Venues
      const { stype1 } = req.params
      console.log(stype1)
      let venues = await VenuesModel.findAll({
        where: {
          stype1: stype1
        }
      })
      console.log(venues)
      res.send(venues)
    } catch (err) {
      console.log('get_one_soundtype1 failed in venues_controller:', err)
    }
  },
  get_venues_by_capacity: async (req, res) => {
    try {
      const VenuesModel = req.app.get('models').Venues
      const { capacity } = req.params
      const venues = await VenuesModel.findAll({
        where: {
          capacity: {
            [Op.gt]: [capacity]
          }
        }
      })
      res.send(venues)
    } catch (err) {
      console.log(
        'get_venues_bby_capcity has failed in venues_contreoller:',
        err
      )
    }
  },
  update_venue_name: async (req, res) => {
    try {
      const VenuesModel = req.app.get('models').Venues
      const { id } = req.params
      const { name } = req.body

      const [rows_updated, [updated_venue]] = await VenuesModel.update(
        { name },
        { returning: true, where: { id } }
      )

      // throw new Error('send this to the client')

      res.send({ rows_updated, updated_venue })
    } catch (err) {
      console.error('update_venue_name failed in venues_controller.js:', err)
      res
        .status(500)
        .send(`update_venue_name failed in venues_controller.js: ${err}`)
    }
  }
}
