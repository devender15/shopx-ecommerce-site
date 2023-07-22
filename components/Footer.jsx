import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-[#f6f6f8] flex flex-col items-start md:flex-row md:flex-wrap justify-evenly md:items-center py-32 px-6 lg:px-28">
            <div className="flex flex-col gap-y-3">
                <h2 className="text-3xl font-bold">ShopX</h2>
                <p>© 2023 ShopX.</p>
                <p className="tracking-wide">All Rights Reserved</p>
            </div>

            <div className="flex flex-col items-start">
                <h3 className="uppercase font-semibold text-lg mb-2">About Us</h3>
                <ul className="space-y-4">
                    <li>
                        <Link href="/about" className="text-gray-500 text-sm font-semibold">
                            About us
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="text-gray-500 text-sm font-semibold">
                            Store location
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="text-gray-500 text-sm font-semibold">
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="text-gray-500 text-sm font-semibold">
                            Orders tracking
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="flex flex-col items-start">
                <h3 className="uppercase font-semibold text-lg mb-2">Useful Links</h3>
                <ul className="space-y-4">
                    <li>
                        <Link href="/" className="text-gray-500 text-sm font-semibold">
                            Returns
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="text-gray-500 text-sm font-semibold">
                            Support Policy
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="text-gray-500 text-sm font-semibold">
                            Size guide
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="text-gray-500 text-sm font-semibold">
                            FAQs
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="flex flex-col items-start">
                <h3 className="uppercase font-semibold text-lg mb-2">Follow Us</h3>
                <ul className="space-y-4">
                    <li>
                        <Link href="/" className="text-gray-500 text-sm font-semibold">
                            Facebook
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="text-gray-500 text-sm font-semibold">
                            Twitter
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="text-gray-500 text-sm font-semibold">
                            Instagram
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="text-gray-500 text-sm font-semibold">
                            Youtube
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="flex flex-col items-start justify-between w-72 h-full">
                <div className="flex flex-col items-start">
                    <h3 className="uppercase font-semibold text-lg mb-2">Subscribe</h3>
                    <p className="text-sm text-gray-400">Get E-mail updates about our latest shop and special offers.</p>    
                </div>

                <form className="w-full flex flex-col gap-y-3 items-start">
                    <input type="email" placeholder="Enter you email address..." className="w-full border-b-2 py-4 text-sm outline-none bg-transparent"/>
                    <button type="submit" className="uppercase text-sm underline-offset-2 underline decoration-gray-400 transition-colors hover:text-blue-700 hover:decoration-purple-700 duration-700">Subscribe</button>
                </form>
                
            </div>
        </footer>
    )
}