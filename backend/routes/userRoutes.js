import express from 'express'
const route = express.Router()

import {
     userAuth,
     registerUser,
     logoutUser,
     getUserProfile,
     updateUserProfile
     } from '../controllers/userController.js'

route.post('/',registerUser)
route.post('/auth',userAuth)
route.post('/logout',logoutUser)
route.get('/profile',getUserProfile)
route.put('/profile',updateUserProfile)





export default route;