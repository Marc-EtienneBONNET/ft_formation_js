/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/14 16:36:04 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/14 16:36:05 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const express = require('express');
const path = require('path');
const router = require('./routes/index');
const app = express();
require('./database/server');

app.set('views', path.join(__dirname, "/views"));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(router);
app.listen(3000);