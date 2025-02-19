/* eslint-disable react/prop-types */
const Footer = ({ data }) => {
  return (
    <>
      <div className="min-h-[200px] mt-10 m-1 p-2 flex flex-col justify-between bg-black text-white  bottom-0 left-0 w-full">
        <div className="text-center">
          <h2 className="text-5xl font-serif">
            {data ? data.name : "No Property Selected"}
          </h2>
          <p className="text-base text-slate-300">Your #1 Destination</p>
        </div>
        <div className="text-center">
          <p className="text-sm">
            &copy; 2024 All rights reserved | Developed by Dancah Technology
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
