/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/15 11:03:07 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/16 18:08:48 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const router = require('express').Router();
const  utile = require('util');
const  { addUser, seeUser } = require('./../controllers/user');

router.post('/', addUser);

router.get('/', seeUser);

module.exports = router;
