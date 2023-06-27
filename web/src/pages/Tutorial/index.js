import SmoothScroll from 'smooth-scroll'
import Menu from './Menu'
import Information from './Information'

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
})

const Tutorial = () => {
  return (
    <div className="pt-6 pb-52">
      <div className="px-4 sm:px-16 lg:px-32 xl:px-48 2xl:px-60">
        <div className="max-w-7xl mx-auto py-5 px-1 lg:px-4 sm:py-10 space-y-4">
          <h1 className="text-gray-700 text-3xl md:text-4xl font-bold text-center">How to explore CoDNaS-Repeats</h1>
          <div className="pt-5">
            <Menu />
            <Information />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tutorial
