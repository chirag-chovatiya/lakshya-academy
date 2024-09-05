
export default function HeroSection() {

  return (
    <div
      id="hero-section"
      className="h-[100vh] w-full bg-primary-500 bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/assets/HeroSection.png')" }}
    >
      <div className="container mx-auto p-3 h-full  flex flex-col justify-center items-center">
        <h1 className="text-white text-center uppercase font-semibold mt-10 max-w-[500px] text-[2.50rem] xl:text-[2rem] tracking-widest py-5">
        welcome to LakshyaAcadamy
        </h1>
        <p className="text-white uppercase  max-w-[650px] text-[20px] py-3 md:mb-5 tracking-widest text-center">
        Welcome to MedLine, a platform that connects you with experienced and qualified doctors in India for online consultations at affordable prices.
        </p>
        <button
          type="button"
          className="px-4 py-2 md:ms-3 rounded-full text-custom-blue cursor-pointer font-semibold text-sm bg-custom-bg"
        >
          Know More
        </button>
      </div>
    </div>
  );
}
