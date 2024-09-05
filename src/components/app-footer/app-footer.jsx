

export default function AppFooter() {
  
  return (
    <footer className="bg-custom-blue text-white py-10">
      <div className="container mx-auto px-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div>
          <h2 className="uppercase text-2xl font-bold mb-5">LakshyaAcadamy</h2>
          <p>Leading the Way in Medical Excellence, Trusted Care.</p>
        </div>
        <div>
          <h3 className="font-bold mb-5">Important Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline">
                Appointment
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Doctors
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-5">Contact Us</h3>
          <p>Call: +91 18254552586</p>
          <p>Email: Lakshya@gmail.com</p>
          <p>
            Address: Junagadh
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-5">Newsletter</h3>
          <div className="relative flex-grow mb-5">
            <input
              type="email"
              className="w-full px-4 py-2 bg-what-bg text-black rounded border"
              placeholder="Enter your email address"
            />
            <button
              type="submit"
              className="text-custom-blue rounded px-2 py-1"
            >
              <i className="lab la-telegram text-[30px] absolute top-2 right-4 fill-current"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-10 flex justify-between items-center border-t border-white-700 pt-6 mt-6 w-auto text-left">
        <p className="capitalize">© 2021 LakshyaAcadamy. All Rights Reserved by PNTEC-LTD</p>
        <div className="flex space-x-4 text-3xl">
          <a href="#" className="text-white">
            <i className="lab la-linkedin-in"></i>
          </a>
          <a href="#" className="text-white">
            <i className="lab la-facebook"></i>
          </a>
          <a href="#" className="text-white">
            <i className="lab la-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
