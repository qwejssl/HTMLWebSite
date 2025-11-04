document.addEventListener('DOMContentLoaded', () => {
	const yearEl = document.getElementById('year')
	if (yearEl) {
		yearEl.textContent = new Date().getFullYear()
	}

	const form = document.querySelector('.mail_form')
	if (form) {
		const emailInput = form.querySelector('.mail_input')
		const checkbox = form.querySelector('.checkbox')

		let msg = form.querySelector('.form_msg')
		if (!msg) {
			msg = document.createElement('p')
			msg.className = 'form_msg'
			form.appendChild(msg)
		}

		form.addEventListener('submit', e => {
			e.preventDefault()

			const email = (emailInput?.value || '').trim()
			const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

			if (!validEmail) {
				msg.textContent = 'Please enter a valid email.'
				msg.classList.remove('success')
				msg.classList.add('error')
				emailInput?.focus()
				return
			}

			if (!checkbox?.checked) {
				msg.textContent =
					'Please agree to the privacy terms before subscribing.'
				msg.classList.remove('success')
				msg.classList.add('error')
				checkbox.focus()
				return
			}

			msg.textContent = 'Thank you! You have subscribed to the newsletter.'
			msg.classList.remove('error')
			msg.classList.add('success')
			form.reset()

			setTimeout(() => {
				msg.textContent = ''
			}, 3000)
		})
	}

	document.querySelectorAll('a[href^="#"]').forEach(link => {
		link.addEventListener('click', e => {
			const id = link.getAttribute('href')
			if (!id || id === '#') return

			const target = document.querySelector(id)
			if (!target) return

			e.preventDefault()
			target.scrollIntoView({ behavior: 'smooth', block: 'start' })
		})
	})

	const header = document.querySelector('.header')
	const toggleHeaderShadow = () => {
		if (!header) return
		if (window.scrollY > 8) {
			header.classList.add('is-scrolled')
		} else {
			header.classList.remove('is-scrolled')
		}
	}
	toggleHeaderShadow()
	window.addEventListener('scroll', toggleHeaderShadow, { passive: true })
})
