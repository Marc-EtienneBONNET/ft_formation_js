/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pong.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 15:03:10 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/24 09:43:00 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const router = require('express').Router();
const {newGame} = require('./../controllers/controllers');


router.post('/', newGame);

module.exports = router;