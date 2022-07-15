/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ninja.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/14 09:36:45 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/14 09:40:48 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ninjaShe = schema({
	nom:String,
	niveau:String,
	nb:Number
}, {
	timestamps: true
});


const ninja = mongoose.model('ninja', ninjaShe, 'ninja');

module.exports = {
	ninja:ninja,
	mongoose:mongoose
}