import Link from "next/link";
import Image from "next/image";

const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex relative w-[28px] h-[28px]">
        <Image src="/logo.svg" alt="Logo" fill className="object-contain" />
      </div>
    </Link>
  );
};

export default HeaderLogo;
