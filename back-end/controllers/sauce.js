const fs = require('fs')
const Sauce = require('../models/sauce_models')

exports.createSauce = async(req, res, next) => {
    try {
        const { name, manufacturer, description, mainPepper, heat, userId } = JSON.parse(req.body.sauce)
        const url = req.protocol + '://' + req.get('host')
        const newSauce = new Sauce({
            name: name,
            manufacturer: manufacturer,
            description: description,
            mainPepper: mainPepper,
            imageUrl: url + '/images/' + req.file.filename,
            heat: heat,
            userId: userId,
        })
        await newSauce.save()
        return res.status(201).json({ message: 'sauce successfully created' })
    } catch (e) {
        return res.status(500).json({ message: 'unable to save sauce' })
    }

}

exports.sauce = async(req, res, next) => {
    try {
        const allSauces = await Sauce.find()
        console.log(allSauces)
        return res.status(200).json(allSauces)
    } catch {
        return res.status(401).json({ message: 'no sauces to display' })
    }

}
exports.sauceById = async(req, res, next) => {
    try {
        const sauce = await Sauce.findById(req.params.id)
        console.log(req.params.id)
        return res.status(200).json(sauce)
    } catch {
        return res.status(401).json({ message: 'no sauce with this id' })
    }
}


exports.modifySauce = async(req, res, next) => {

    try {
        const image = await Sauce.findById(req.params.id)
        let url = image.imageUrl

        if (req.file) {
            url = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename
            fs.unlink('images/' + image.imageUrl.split('/images/')[1], (error) => {
                if (error) throw error
            })
            req.body = JSON.parse(req.body.sauce)
        }
        const { name, manufacturer, description, mainPepper, heat } = req.body
        const sauce = {
            name: name,
            manufacturer: manufacturer,
            description: description,
            mainPepper: mainPepper,
            imageUrl: url,
            heat: heat
        }

        await Sauce.updateOne({ _id: req.params.id }, sauce)

        return res.status(200).json({ message: 'Sauce updated' })
    } catch {
        return res.status(400).json({ message: 'Could not update sauce' })
    }
}


exports.deleteSauce = async(req, res, next) => {
    try {
        const sauce = await Sauce.findById(req.params.id)
        fs.unlink('images/' + sauce.imageUrl.split('/images/')[1], (error) => {
            if (error) throw error
        })
        await Sauce.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: 'Sauce deleted' })
    } catch {
        return res.status(400).json({ message: 'Could not find sauce id' })
    }
}
exports.likeSauce = async(req, res, next) => {
    try {
        let likeStatus
        const { userId, like } = req.body
        const sauce = await Sauce.findById(req.params.id)

        let disLikeIds = sauce.usersDisLiked.filter(storedIds => {
            return storedIds != userId
        })
        let likeIds = sauce.usersLiked.filter(storedIds => {
            return storedIds != userId
        })

        if (like == -1) {
            likeStatus = 'disliked'
            disLikeIds.push(userId)
        } else if (like == 1) {
            likeStatus = 'liked'
            likeIds.push(userId)
        }

        const likeInfo = {
            dislikes: disLikeIds.length,
            likes: likeIds.length,
            usersDisLiked: disLikeIds,
            usersLiked: likeIds
        }

        await Sauce.findByIdAndUpdate(req.params.id, likeInfo)
        return res.status(200).json({ message: `Sauce has been ${likeStatus}` })

    } catch (error) {
        res.status(400).json({ error })
    }
}