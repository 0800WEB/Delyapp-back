import crypto from 'crypto';
import bcryptjs from 'bcryptjs'
import User from '../../models/User.js';
import sendEmail from '../../utils/mailing.util.js';
let signUp = async (req, res, next) => {
	req.body.is_online = false;
	req.body.role = 0;
	req.body.is_verified = false;
	req.body.verify_code = crypto.randomBytes(2).toString('hex');
	req.body.password = bcryptjs.hashSync(req.body.password, 10);
	try {
		await User.create(req.body);
        await sendEmail({to:req.body.email, first_name:req.body.name, code:req.body.verify_code })
		return res.status(201).json({
			success: true,
			message: "The user was created"
		})
	} catch (error) {
		console.log(error);
	}
}

export default signUp;