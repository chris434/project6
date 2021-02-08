const Sauce = require('../models/sauce_models')

exports.createSauce = async(req, res, next) => {
    try {
        const { name, manufacturer, description, mainPepper, heat, userId } = JSON.parse(req.body.sauce)
        const url = req.protocol + '://' + req.get('host')
        const newSauce = new Sauce({
            userId: userId,
            name: name,
            manufacturer: manufacturer,
            description: description,
            mainPepper: mainPepper,
            imageUrl: url + '/images/' + req.file.filename,
            heat: heat
        })
        await newSauce.save()
        res.status(201).send({ message: 'sauce successfully created' })
    } catch (e) {
        res.status(500).send({ message: 'unable to save sauce' })
    }

}

exports.sauce = async(req, res, next) => {
    res.json({ message: 'p' })
}