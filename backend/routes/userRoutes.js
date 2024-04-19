import express from 'express'
const route = express.Router()
import { protect } from '../middleware/authMiddleware.js'

import {
     userAuth,
     registerUser,
     logoutUser,
     getUserProfile,
     updateUserProfile,
     imageUpload
     } from '../controllers/userController.js'

route.post('/',registerUser)
route.post('/auth',userAuth)
route.post('/logout',logoutUser)
route.get('/profile',protect,getUserProfile)
route.put('/profile',protect,updateUserProfile)
route.post('/upload',imageUpload)





export default route;