import Link from "next/link";

export default function HeroSection() {
  <div
    id="hero-section"
    className="h-[100vh] w-full bg-primary-500 bg-cover bg-no-repeat"
  >
    <div className="container mx-auto p-3 h-full flex flex-col justify-center items-center">
      <h1 className="text-black text-center uppercase font-semibold mt-10 max-w-[500px] text-[2.50rem] xl:text-[2rem] tracking-widest py-5">
        Testing
      </h1>
      <p className="text-black uppercase max-w-[650px] text-[20px] py-3 md:mb-5 tracking-widest text-center">
        This is testing
      </p>
      <Link
        href={"/about"}
        type="button"
        className="px-4 py-2 md:ms-3 rounded-full text-custom-blue cursor-pointer font-semibold text-sm bg-custom-bg"
      >
        Know More
      </Link>
    </div>
  </div>;
}
