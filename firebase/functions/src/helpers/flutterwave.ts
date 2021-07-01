const Flutterwave = require('flutterwave-node-v3')

const flw = new Flutterwave(
	'FLWPUBK-*************-X',
	'FLWSECK-********************-X'
)

// checkout out https://developer.flutterwave.com/docs/card-payments for more information

// paymentData should be in this format

// const paymentData = {
//     "card_number": "5531886652142950",
//     "cvv": "564",
//     "expiry_month": "09",
//     "expiry_year": "21",
//     "currency": "NGN",
//     "amount": "100",
//     "redirect_url": "https://www.google.com",
//     "fullname": "Olufemi Obafunmiso",
//     "email": "olufemi@flw.com",
//     "phone_number": "0902620185",
//     "tx_ref": "MC-32444ee--4eerye4euee3rerds4423e43e" // This is a unique reference
// }

export const makePayment = async (paymentData: string) => {
	const payload = JSON.parse(paymentData)

	try {
		const response = await flw.Charge.card(payload)

		if (response.meta.authorization.mode === 'pin') {
			return 'pin required'
		}
		if (response.meta.authorization.mode === 'redirect') {
			const url = response.meta.authorization.redirect

			return url
		}

		return response
	} catch (error) {
		return error
	}
}

// this payment data will contain  authorization
// "authorization": {
//    "mode": "pin",
//    "pin": "3310" users pin
//    }

export const reCallChargeWithPin = async (paymentDataWithAuth: string) => {
	const payload = JSON.parse(paymentDataWithAuth)

	const response = await flw.Charge.card(payload)

	return response
}

//  flw_ref can be gotten form response form reCallChargeWithPin (response.data.flw_ref)

export const validatePaymentWithOTP = async (otp: string, flw_ref: string) => {
	const response = await flw.Charge.validate({
		otp,
		flw_ref
	})

	return response
}
