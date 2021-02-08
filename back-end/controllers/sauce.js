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
        res.status(201).json({ message: 'sauce successfully created' })
    } catch (e) {
        res.status(500).json({ message: 'unable to save sauce' })
    }

}

exports.sauce = async(req, res, next) => {
    try {
        const allSauces = await Sauce.find()
        console.log(allSauces)
        res.status(200).json(allSauces)
    } catch {
        res.status(401).json({ message: 'no sauces to display' })
    }

}