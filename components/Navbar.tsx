"use client";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus } from "@fortawesome/free-regular-svg-icons";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	return (
		<nav className="navbar navbar--main relative">
			<div className="border-b items-center justify-between gap-4 p-4 h-12 flex">
				<div className="flex items-center gap-4">
					<Link href="/">FPL-24</Link>
					<Link href="/fixtures">Fixtures</Link>
				</div>
				<button
					className={`header__toggle ${
						isMenuOpen ? "header__toggle--open" : ""
					}`}
					onClick={toggleMenu}
					aria-label="Toggle menu"
				>
					<FontAwesomeIcon icon={faSquareMinus} />
				</button>
			</div>
			{isMenuOpen ? (
				<div className="absolute -bottom- flex w-full justify-center h-full"></div>
			) : (
				""
			)}
		</nav>
	);
}
