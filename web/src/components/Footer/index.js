import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="bottom-0 min-w-full absolute">
      <footer className="bg-primary-dark py-8">
        <div className="px-4 sm:px-16 lg:px-32 xl:px-48 2xl:px-60 mx-auto">
          <div className="max-w-full px-1 mx-auto lg:px-4">
            <div className="flex flex-col sm:flex-row text-center justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-white font-medium block text-sm sm:text-base">Made by Ronaldo Romario Tunque Cahui</p>
              <ul className="flex items-center text-white space-x-4">
                <li>
                  <FaGithub />
                </li>
                <li>
                  <FaLinkedinIn />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
