import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-white flex flex-col gap-4 items-center justify-center h-[90vh] px-5 md:px-0 text-xs md:text-base">
        <div className="text-neutral-300 font-bold text-3xl md:text-6xl flex gap-2 justify-center items-center">Get Me A Chai<span><img width={90} src="/coffee.gif" alt="" /></span></div>
        <p>
          A Crowdfunding platform for creaters. Get funded by your fans and followers. Start Now!
        </p>
        <div>
          <Link href={'/login'}>
            <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          </Link>
          <Link href={'/about'}>
          <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10">
      </div>

      <div className="text-white container mx-auto pb-16 pt-14 px-10">
        <h2 className="text-3xl font-bold text-center mb-14">Your fans can buy you a chai</h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-white rounded-full p-2 text-black" width={90} src="/man.gif" alt="" />
            <p className="font-bold text-center">Fund Yourself</p>
            <p className="text-center">your fans are available to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-white rounded-full p-2 text-black" width={90} src="/profit.gif" alt="" />
            <p className="font-bold text-center">Fund Yourself</p>
            <p className="text-center">your fans are available to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-white rounded-full p-2 text-black" width={90} src="/group.gif" alt="" />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">your fans are available to help you</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10">
      </div>

      <div className="text-white container mx-auto pb-16 pt-14 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-center mb-14">Learn more about us</h2>
        <iframe className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]" src="https://www.youtube.com/embed/5QwGXfz-h9o?si=BJavt1SkUhwcOV4E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>

    </>
  );
}
