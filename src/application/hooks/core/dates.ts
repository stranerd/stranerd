import { ref, watch, computed } from '@nuxtjs/composition-api'

enum TIMES {
	minute = 60,
	hour = 60 * 60,
	day = 60 * 60 * 24,
	month = 60 * 60 * 24 * 30,
	year = 60 * 60 * 24 * 30 * 12
}

const startInterval = (dif: number, caller: (time: number) => void) => {
	if (dif < TIMES.minute) return window.setInterval(() => caller(1), 1000)
	else if (dif < TIMES.hour) return window.setInterval(() => caller(TIMES.minute), 1000 * TIMES.minute)
	else if (dif < TIMES.day) return window.setInterval(() => caller(TIMES.hour), 1000 * TIMES.hour)
	else return undefined
}

export const useTimeDifference = (dateString: string) => {
	const date = new Date(dateString)
	const diffInSec = ref(Math.floor((Date.now() - date.getTime()) / 1000))
	let interval = undefined as number | undefined

	watch(() => diffInSec.value, () => {
		if ([TIMES.minute, TIMES.hour, TIMES.day].includes(diffInSec.value)) {
			clearInterval(interval)
			interval = startInterval(diffInSec.value, (time: number) => {
				diffInSec.value += time
			})
		}
	})

	const time = computed({
		get: () => {
			if (diffInSec.value < TIMES.minute) {
				return `${diffInSec.value} ${diffInSec.value === 1 ? 'second' : 'seconds'} ago`
			} else if (diffInSec.value < TIMES.hour) {
				const minutes = Math.floor(diffInSec.value / TIMES.minute)
				return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
			} else if (diffInSec.value < TIMES.day) {
				const hours = Math.floor(diffInSec.value / TIMES.hour)
				return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
			} else if (diffInSec.value < TIMES.month) {
				const days = Math.floor(diffInSec.value / TIMES.day)
				return `${days} ${days === 1 ? 'day' : 'days'} ago`
			} else if (diffInSec.value < TIMES.year) { // Less than a year
				const months = Math.floor(diffInSec.value / TIMES.month)
				return `${months} ${months === 1 ? 'month' : 'months'} ago`
			} else {
				const year = date.getFullYear()
				const month = [
					'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
					'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
				][date.getMonth()]
				return `${month} ${year}`
			}
		}, set: () => {}
	})

	const startTimer = () => {
		interval = startInterval(diffInSec.value, (time: number) => {
			diffInSec.value += time
		})
	}
	const stopTimer = () => clearInterval(interval)

	return { time, startTimer, stopTimer }
}

export const useTimeString = (timeInHrs: number) => {
	if (timeInHrs < 1) {
		const mins = Math.round(timeInHrs * 60)
		return `${mins} min${mins > 1 ? 's' : ''}`
	} else if (timeInHrs < 24) return `${timeInHrs} hr${timeInHrs > 1 ? 's' : ''}`
	else {
		const days = Math.round(timeInHrs / 24)
		return `${days} day${days > 1 ? 's' : ''}`
	}
}
