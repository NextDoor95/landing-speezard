import { useState, useEffect } from 'react'

import Image from 'next/image'

import { Slant as Hamburger } from 'hamburger-react'
import { Link as ScrollLink } from 'react-scroll'

import { Size } from '../types'
import wordings from '../wordings'
const { navbar } = wordings

const Navbar = () => {
	const size: Size = useWindowSize()
	const [isMobileNavbarVisible, setIsMobileNavbarVisible] = useState(false)

	function useWindowSize(): Size {
		// Initialize state with undefined width/height so server and client renders match
		// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
		const [windowSize, setWindowSize] = useState<Size>({
			width: undefined,
			height: undefined,
		})
		useEffect(() => {
			// Handler to call on window resize
			function handleResize() {
				// Set window width/height to state
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
				})
			}
			// Add event listener
			window.addEventListener('resize', handleResize)
			// Call handler right away so state gets updated with initial window size
			handleResize()
			// Remove event listener on cleanup
			return () => window.removeEventListener('resize', handleResize)
		}, []) // Empty array ensures that effect is only run on mount
		return windowSize
	}

	return (
		<>
			<div className="navbar">
				<div className="navbar__logo">
					<ScrollLink smooth={true} offset={-50} duration={500} to="hero">
						<Image
							src="/logos/logo-speezard-verde.png"
							alt="logo speezard"
							layout="fill"
						/>
					</ScrollLink>
				</div>
				<div className="navbar__links--desktop">
					{size.width! <= 900 ? (
						<Hamburger
							toggled={isMobileNavbarVisible}
							toggle={setIsMobileNavbarVisible}
						/>
					) : (
						<div className="navbar__links--desktop">
							{navbar.map(link => (
								<ScrollLink
									smooth={true}
									offset={-50}
									duration={500}
									to={link.href}
									key={link.href}
								>
									{link.text}
								</ScrollLink>
							))}
							<ScrollLink
								smooth={true}
								offset={-50}
								duration={500}
								to="contact"
							>
								<button className="cta">Ser Parte</button>
							</ScrollLink>
						</div>
					)}
				</div>
			</div>
			{isMobileNavbarVisible && (
				<div className="navbar__links--mobile">
					{navbar.map(link => (
						<ScrollLink
							smooth={true}
							offset={-50}
							duration={500}
							to={link.href}
							key={link.href}
						>
							{link.text}
						</ScrollLink>
					))}
					<ScrollLink
						smooth={true}
						offset={-50}
						duration={500}
						to="contact"
						onClick={() => setIsMobileNavbarVisible(false)}
					>
						<button className="cta">Ser Parte</button>
					</ScrollLink>
				</div>
			)}
		</>
	)
}

export default Navbar
