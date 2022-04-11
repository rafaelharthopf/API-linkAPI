const { Router } = require('express');
const api = require('./api');

const routes = Router();


routes.get('/users', async (req, res) => {
    const { userId } = req.params
    const { page = 1, limit = 10, sortBy, order = 'desc'} = req.query
    if (limit > 10) {
        res.send({error: 'Limit cannot be greater than 10'})
        return;
    }
    try {
        const {data : usersInfo} = await api.get(`/`,{
            params: {
                page, 
                limit,
                sortBy,
                order
            }})

        if(!usersInfo.length){
            res.send({error: 'Page not found!'})
            return;
        }

       const result = [] 
       for await (let user of usersInfo) {
            const { id : userId, firstName, lastName, createdAt, avatar, email } = user

            const fullName = `${firstName} ${lastName}`
            const {data : addressInfo} = await api.get(`/${userId}/address`)
            const {data : contactInfo} = await api.get(`/${userId}/contacts`)

            const formattedUser = {
                userId, 
                createdAt,
                fullName,
                avatar,
                email,
                address: addressInfo,
                contacts: contactInfo
            }

            result.push(formattedUser)
        }

        res.send(result)

    } catch (error) {
        res.send({error: error.message})
    }

});



routes.get('/users/:userId', async (req, res) => {
    const {userId} = req.params
    try {
        const {data} = await api.get(`/${userId}`)
        console.log({data});
        return res.send(data)
    } catch (error) {
        res.send({error: error.message})
    }
});

routes.get('/users/:userId/address', async (req, res) => {
    const {userId} = req.params
    try {
        const {data} = await api.get(`/${userId}/address`)
        console.log({data});
        return res.send({data})
    } catch (error) {
        res.send({error: error.message})
    }
});

routes.get('/users/:userId/contacts', async (req, res) => {
    const {userId} = req.params
    try {
        const {data} = await api.get(`/${userId}/contacts`)
        console.log({data});
        return res.send({data})
    } catch (error) {
        res.send({error: error.message})
    }
});








module.exports = routes;