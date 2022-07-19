/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/15 11:03:07 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/19 10:42:50 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const router = require('express').Router();
const  utile = require('util');
const  { addUser, seeUser } = require('./../controllers/user');

router.post('/', addUser);

router.get('/', seeUser);

module.exports = router;
 