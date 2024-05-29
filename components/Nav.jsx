import Image from "next/image"
import Link from "next/link"

const Nav = () => {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-3 flex-center">
        <Image
          src="/assets/images/inanin_orange2.png"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">SysTracker</p>
      </Link>
    </nav>
  )
}

export default Nav
